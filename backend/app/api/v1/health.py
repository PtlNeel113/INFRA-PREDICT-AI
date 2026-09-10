"""
Health check and readiness endpoints.
"""
from datetime import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from ...core.config import settings
from ...core.dependencies import get_db
from ...core.logging import get_logger
from ...schemas.health import HealthResponse, ReadinessResponse, SystemStatusResponse

logger = get_logger(__name__)
router = APIRouter()


@router.get("/", response_model=SystemStatusResponse, summary="Root endpoint")
async def root():
    """
    Root endpoint returning service information.
    """
    return SystemStatusResponse(
        service=settings.APP_NAME,
        status="HEALTHY",
        version=settings.APP_VERSION,
        database=settings.DATABASE_URL.split("@")[-1] if "@" in settings.DATABASE_URL else settings.DATABASE_URL,
        environment=settings.ENVIRONMENT,
    )


@router.get("/health", response_model=HealthResponse, summary="Health check")
async def health_check():
    """
    Health check endpoint for monitoring.
    
    Returns basic service status without checking dependencies.
    Used by load balancers and monitoring tools.
    """
    return HealthResponse(
        status="healthy",
        version=settings.APP_VERSION,
        environment=settings.ENVIRONMENT,
        timestamp=datetime.utcnow().isoformat() + "Z",
    )


@router.get("/ready", response_model=ReadinessResponse, summary="Readiness check")
async def readiness_check(db: Session = Depends(get_db)):
    """
    Readiness probe with dependency checks.
    
    Checks if the service is ready to accept traffic by verifying:
    - Database connectivity
    - Critical dependencies
    
    Used by orchestrators (Kubernetes, etc.) to determine if the service is ready.
    """
    checks = {}
    ready = True
    
    # Check database connection
    try:
        db.execute(text("SELECT 1"))
        checks["database"] = {"status": "healthy", "message": "Connected"}
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        checks["database"] = {"status": "unhealthy", "message": str(e)}
        ready = False
    
    # Check Redis if enabled
    if settings.REDIS_ENABLED and settings.REDIS_URL:
        checks["redis"] = {"status": "not_checked", "message": "Redis check not implemented"}
    
    # Check external APIs if configured
    if settings.PAIMANA_API_ENDPOINT:
        checks["paimana_api"] = {"status": "configured", "message": "API endpoint configured"}
    
    return ReadinessResponse(
        ready=ready,
        checks=checks,
        timestamp=datetime.utcnow().isoformat() + "Z",
    )


@router.get("/ping", summary="Simple ping")
async def ping():
    """
    Simple ping endpoint for network connectivity checks.
    """
    return {"ping": "pong", "timestamp": datetime.utcnow().isoformat() + "Z"}
