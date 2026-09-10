"""
Health check and status schemas.
"""
from typing import Dict, Any, Optional
from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    """Health check response."""
    
    status: str = Field(..., description="Service health status")
    version: str = Field(..., description="Application version")
    environment: str = Field(..., description="Current environment")
    timestamp: str = Field(..., description="Response timestamp")


class ReadinessResponse(BaseModel):
    """Readiness probe response with dependency checks."""
    
    ready: bool = Field(..., description="Overall readiness status")
    checks: Dict[str, Any] = Field(..., description="Individual dependency checks")
    timestamp: str = Field(..., description="Response timestamp")


class SystemStatusResponse(BaseModel):
    """System status with service details."""
    
    service: str = Field(..., description="Service name")
    status: str = Field(..., description="Service status")
    version: str = Field(..., description="Service version")
    database: str = Field(..., description="Database connection info")
    environment: str = Field(..., description="Environment name")
