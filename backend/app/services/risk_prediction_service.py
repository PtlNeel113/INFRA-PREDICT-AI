"""
Risk prediction service integrating ML models with database.
"""
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
import pandas as pd

from ..db.models import Project, ProjectUpdate, RiskScore, Prediction
from ..ml.models import RiskEngine, FallbackRiskEngine
from ..core.logging import get_logger
from ..core.exceptions import NotFoundException

logger = get_logger(__name__)


class RiskPredictionService:
    """Service for generating risk predictions."""
    
    def __init__(self, db: Session):
        """
        Initialize risk prediction service.
        
        Args:
            db: Database session
        """
        self.db = db
        self.risk_engine = RiskEngine()
        
        # Check if models are trained
        engine_status = self.risk_engine.get_engine_status()
        self.use_fallback = not engine_status['all_models_trained']
        
        if self.use_fallback:
            logger.warning("ML models not trained. Using fallback risk engine.")
    
    def predict_project_risks(
        self,
        project_code: str,
        save_to_db: bool = True,
    ) -> Dict[str, Any]:
        """
        Predict risks for a single project.
        
        Args:
            project_code: Project code
            save_to_db: Whether to save predictions to database
        
        Returns:
            Risk prediction results
        """
        # Fetch project data
        project = self.db.query(Project).filter(Project.code == project_code).first()
        if not project:
            raise NotFoundException(f"Project not found: {project_code}", "Project")
        
        # Get latest update
        latest_update = self.db.query(ProjectUpdate).filter(
            ProjectUpdate.project_id == project.id
        ).order_by(ProjectUpdate.reported_date.desc()).first()
        
        if not latest_update:
            raise NotFoundException(f"No updates found for project: {project_code}", "ProjectUpdate")
        
        # Prepare data for prediction
        project_data = {
            'code': project.code,
            'sanctioned_cost_cr': project.sanctioned_cost_cr,
            'expenditure_cr': latest_update.expenditure_cr,
            'physical_progress': latest_update.physical_progress,
            'expected_progress': latest_update.expected_progress,
            'sector': project.sector,
            'state': project.state,
            'implementing_agency': project.implementing_agency,
            'ministry': project.ministry,
            'created_at': project.created_at,
        }
        
        # Make prediction
        if self.use_fallback:
            df = pd.DataFrame([project_data])
            result = FallbackRiskEngine.predict_all_risks(df)
            prediction = result['predictions'][0]
        else:
            prediction = self.risk_engine.predict_single_project(project_data)
        
        # Save to database if requested
        if save_to_db:
            self._save_predictions_to_db(project.id, prediction)
        
        return prediction
    
    def predict_multiple_projects(
        self,
        project_codes: Optional[List[str]] = None,
        save_to_db: bool = True,
        limit: int = 100,
    ) -> Dict[str, Any]:
        """
        Predict risks for multiple projects.
        
        Args:
            project_codes: List of project codes (None for all active projects)
            save_to_db: Whether to save predictions to database
            limit: Maximum number of projects to process
        
        Returns:
            Batch risk prediction results
        """
        # Build query
        query = self.db.query(Project).filter(Project.is_active == True)
        
        if project_codes:
            query = query.filter(Project.code.in_(project_codes))
        
        projects = query.limit(limit).all()
        
        if not projects:
            return {
                'status': 'success',
                'predictions': [],
                'metadata': {'total_predictions': 0}
            }
        
        # Prepare data
        projects_data = []
        for project in projects:
            latest_update = self.db.query(ProjectUpdate).filter(
                ProjectUpdate.project_id == project.id
            ).order_by(ProjectUpdate.reported_date.desc()).first()
            
            if latest_update:
                projects_data.append({
                    'code': project.code,
                    'sanctioned_cost_cr': project.sanctioned_cost_cr,
                    'expenditure_cr': latest_update.expenditure_cr,
                    'physical_progress': latest_update.physical_progress,
                    'expected_progress': latest_update.expected_progress,
                    'sector': project.sector,
                    'state': project.state,
                    'implementing_agency': project.implementing_agency,
                    'ministry': project.ministry,
                    'created_at': project.created_at,
                })
        
        df = pd.DataFrame(projects_data)
        
        # Make predictions
        if self.use_fallback:
            results = FallbackRiskEngine.predict_all_risks(df)
        else:
            results = self.risk_engine.predict_all_risks(df)
        
        # Save to database if requested
        if save_to_db:
            for prediction in results['predictions']:
                project = next(
                    (p for p in projects if p.code == prediction['project_code']),
                    None
                )
                if project:
                    self._save_predictions_to_db(project.id, prediction)
        
        logger.info(
            f"Generated predictions for {len(results['predictions'])} projects",
            extra={'use_fallback': self.use_fallback}
        )
        
        return results
    
    def _save_predictions_to_db(self, project_id: int, prediction: Dict[str, Any]):
        """Save risk predictions to database."""
        try:
            # Save risk scores
            risk_score = RiskScore(
                project_id=project_id,
                health_score=prediction.get('health_score', 50),
                risk_level=prediction.get('overall_risk_level', 'MEDIUM'),
                cost_risk_score=int(prediction['cost_risk'].get('risk_score', 50)),
                time_risk_score=int(prediction['time_risk'].get('risk_score', 50)),
                execution_risk_score=int(prediction['execution_risk'].get('risk_score', 50)),
                calculation_method='ML_MODEL' if not self.use_fallback else 'FALLBACK',
                model_version=prediction['cost_risk'].get('model_version', 'fallback_1.0.0'),
            )
            self.db.add(risk_score)
            
            # Note: Actual delay/cost overrun predictions would require separate models
            # For now, we focus on risk classification
            
            self.db.commit()
            
        except Exception as e:
            logger.error(f"Failed to save predictions: {e}")
            self.db.rollback()
    
    def get_engine_status(self) -> Dict[str, Any]:
        """Get current status of risk prediction engine."""
        engine_status = self.risk_engine.get_engine_status()
        
        return {
            **engine_status,
            'using_fallback': self.use_fallback,
            'recommendation': 'Train ML models for improved predictions' if self.use_fallback else 'ML models active',
        }
