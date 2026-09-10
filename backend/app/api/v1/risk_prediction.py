"""
Risk prediction API endpoints.
"""
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from ...core.dependencies import get_db
from ...core.logging import get_logger
from ...core.exceptions import NotFoundException
from ...services.risk_prediction_service import RiskPredictionService

logger = get_logger(__name__)
router = APIRouter()


@router.get("/project/{project_code}", summary="Predict risks for single project")
def predict_project_risks(
    project_code: str,
    save_to_db: bool = Query(default=True, description="Save predictions to database"),
    db: Session = Depends(get_db),
):
    """
    Predict all risk types for a single project.
    
    Returns:
    - Cost risk assessment
    - Time risk assessment
    - Execution risk assessment
    - Overall health score
    - Model versions and confidence scores
    """
    try:
        service = RiskPredictionService(db)
        prediction = service.predict_project_risks(project_code, save_to_db)
        
        return {
            "status": "success",
            "project_code": project_code,
            "prediction": prediction,
        }
        
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=e.message)
    except Exception as e:
        logger.error(f"Risk prediction failed: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@router.post("/batch", summary="Predict risks for multiple projects")
def predict_batch_risks(
    project_codes: Optional[List[str]] = None,
    save_to_db: bool = True,
    limit: int = Query(default=100, le=500, description="Maximum projects to process"),
    db: Session = Depends(get_db),
):
    """
    Predict risks for multiple projects in batch.
    
    Args:
    - project_codes: Optional list of project codes (null for all active projects)
    - save_to_db: Whether to save predictions to database
    - limit: Maximum number of projects to process
    
    Returns batch predictions with statistics.
    """
    try:
        service = RiskPredictionService(db)
        results = service.predict_multiple_projects(project_codes, save_to_db, limit)
        
        return results
        
    except Exception as e:
        logger.error(f"Batch prediction failed: {e}")
        raise HTTPException(status_code=500, detail=f"Batch prediction failed: {str(e)}")


@router.get("/engine/status", summary="Get risk engine status")
def get_engine_status(db: Session = Depends(get_db)):
    """
    Get status of risk prediction engine.
    
    Returns information about:
    - Model training status
    - Whether fallback engine is being used
    - Model versions
    - Recommendations
    """
    try:
        service = RiskPredictionService(db)
        status = service.get_engine_status()
        
        return status
        
    except Exception as e:
        logger.error(f"Failed to get engine status: {e}")
        raise HTTPException(status_code=500, detail="Failed to get engine status")
