"""
Main API router configuration.
"""
from fastapi import APIRouter

from .v1 import health, ingestion, sync, risk_prediction

# Create main API router
api_router = APIRouter()

# Include versioned routers
api_router.include_router(health.router, tags=["Health"])
api_router.include_router(ingestion.router, prefix="/ingest", tags=["Ingestion"])
api_router.include_router(sync.router, prefix="/sync", tags=["Synchronization"])
api_router.include_router(risk_prediction.router, prefix="/risk", tags=["Risk Prediction"])
