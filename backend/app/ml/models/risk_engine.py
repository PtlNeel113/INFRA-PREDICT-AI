"""
Multi-model risk engine for comprehensive risk assessment.
"""
from typing import Dict, Any, Optional, List
from pathlib import Path
import pandas as pd

from .base_model import RiskModel
from ..features import FeatureEngineering
from ...core.config import settings
from ...core.logging import get_logger

logger = get_logger(__name__)


class RiskEngine:
    """
    Comprehensive risk assessment engine with three independent models:
    1. Cost Risk Model
    2. Time Risk Model  
    3. Execution Risk Model
    """
    
    def __init__(self, models_dir: Optional[Path] = None):
        """
        Initialize risk engine with three models.
        
        Args:
            models_dir: Directory containing trained models
        """
        if models_dir is None:
            models_dir = Path(settings.ML_MODEL_DIR)
        
        self.models_dir = models_dir
        
        # Initialize three risk models
        self.cost_risk_model = RiskModel(
            model_name="cost_risk",
            model_path=models_dir / "cost_risk_model.pkl",
        )
        
        self.time_risk_model = RiskModel(
            model_name="time_risk",
            model_path=models_dir / "time_risk_model.pkl",
        )
        
        self.execution_risk_model = RiskModel(
            model_name="execution_risk",
            model_path=models_dir / "execution_risk_model.pkl",
        )
        
        logger.info(
            f"Risk engine initialized",
            extra={
                "cost_model_trained": self.cost_risk_model.is_trained,
                "time_model_trained": self.time_risk_model.is_trained,
                "execution_model_trained": self.execution_risk_model.is_trained,
            }
        )
    
    def predict_all_risks(
        self,
        projects_df: pd.DataFrame,
        include_probabilities: bool = True,
    ) -> Dict[str, Any]:
        """
        Predict all three risk types for projects.
        
        Args:
            projects_df: Raw project data
            include_probabilities: Whether to include probability distributions
        
        Returns:
            Dictionary with all risk predictions
        """
        logger.info(f"Predicting risks for {len(projects_df)} projects")
        
        # Get predictions from each model
        cost_results = self.cost_risk_model.predict(projects_df, include_probabilities)
        time_results = self.time_risk_model.predict(projects_df, include_probabilities)
        execution_results = self.execution_risk_model.predict(projects_df, include_probabilities)
        
        # Combine results
        combined_results = self._combine_predictions(
            projects_df['code'].tolist(),
            cost_results,
            time_results,
            execution_results,
        )
        
        return combined_results
    
    def predict_single_project(
        self,
        project_data: Dict[str, Any],
        include_probabilities: bool = True,
    ) -> Dict[str, Any]:
        """
        Predict all risks for a single project.
        
        Args:
            project_data: Single project data
            include_probabilities: Whether to include probability distributions
        
        Returns:
            Risk predictions for the project
        """
        df = pd.DataFrame([project_data])
        results = self.predict_all_risks(df, include_probabilities)
        
        if results['status'] == 'success' and results['predictions']:
            return results['predictions'][0]
        
        return results
    
    def _combine_predictions(
        self,
        project_codes: List[str],
        cost_results: Dict[str, Any],
        time_results: Dict[str, Any],
        execution_results: Dict[str, Any],
    ) -> Dict[str, Any]:
        """Combine predictions from all three models."""
        predictions = []
        
        for code in project_codes:
            # Find predictions for this project from each model
            cost_pred = self._find_prediction(cost_results, code)
            time_pred = self._find_prediction(time_results, code)
            execution_pred = self._find_prediction(execution_results, code)
            
            # Calculate composite health score
            health_score = self._calculate_health_score(
                cost_pred.get('risk_score'),
                time_pred.get('risk_score'),
                execution_pred.get('risk_score'),
            )
            
            # Determine overall risk level
            overall_risk = self._determine_overall_risk(
                cost_pred.get('risk_class'),
                time_pred.get('risk_class'),
                execution_pred.get('risk_class'),
            )
            
            combined = {
                "project_code": code,
                "health_score": health_score,
                "overall_risk_level": overall_risk,
                "cost_risk": cost_pred,
                "time_risk": time_pred,
                "execution_risk": execution_pred,
                "models_status": {
                    "cost_model": cost_results['status'],
                    "time_model": time_results['status'],
                    "execution_model": execution_results['status'],
                }
            }
            
            predictions.append(combined)
        
        return {
            "status": "success",
            "predictions": predictions,
            "metadata": {
                "total_predictions": len(predictions),
                "models_used": {
                    "cost_risk": cost_results.get('model_version', 'not_trained'),
                    "time_risk": time_results.get('model_version', 'not_trained'),
                    "execution_risk": execution_results.get('model_version', 'not_trained'),
                }
            }
        }
    
    def _find_prediction(self, results: Dict[str, Any], code: str) -> Dict[str, Any]:
        """Find prediction for specific project code."""
        if results['status'] != 'success':
            return {
                "risk_score": None,
                "risk_class": "UNKNOWN",
                "confidence": None,
                "status": results['status'],
            }
        
        for pred in results.get('predictions', []):
            if pred['project_code'] == code:
                return pred
        
        return {
            "risk_score": None,
            "risk_class": "UNKNOWN",
            "confidence": None,
            "status": "NOT_FOUND",
        }
    
    def _calculate_health_score(
        self,
        cost_score: Optional[float],
        time_score: Optional[float],
        execution_score: Optional[float],
    ) -> Optional[int]:
        """
        Calculate composite health score from individual risk scores.
        
        Health score = 100 - weighted_average(risk_scores)
        Higher health score = lower risk
        """
        scores = []
        weights = []
        
        if cost_score is not None:
            scores.append(cost_score)
            weights.append(0.35)  # 35% weight
        
        if time_score is not None:
            scores.append(time_score)
            weights.append(0.40)  # 40% weight
        
        if execution_score is not None:
            scores.append(execution_score)
            weights.append(0.25)  # 25% weight
        
        if not scores:
            return None
        
        # Normalize weights
        total_weight = sum(weights)
        weights = [w / total_weight for w in weights]
        
        # Calculate weighted average risk
        weighted_risk = sum(s * w for s, w in zip(scores, weights))
        
        # Convert to health score (inverse of risk)
        health_score = int(100 - weighted_risk)
        
        return max(0, min(100, health_score))
    
    def _determine_overall_risk(
        self,
        cost_risk: Optional[str],
        time_risk: Optional[str],
        execution_risk: Optional[str],
    ) -> str:
        """Determine overall risk level from individual risks."""
        risk_levels = [r for r in [cost_risk, time_risk, execution_risk] if r and r != 'UNKNOWN']
        
        if not risk_levels:
            return "UNKNOWN"
        
        # Use highest risk level
        risk_priority = {'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1}
        max_risk = max(risk_levels, key=lambda x: risk_priority.get(x, 0))
        
        return max_risk
    
    def get_engine_status(self) -> Dict[str, Any]:
        """Get status of all models in the engine."""
        return {
            "engine_version": "1.0.0",
            "models": {
                "cost_risk": self.cost_risk_model.get_model_info(),
                "time_risk": self.time_risk_model.get_model_info(),
                "execution_risk": self.execution_risk_model.get_model_info(),
            },
            "all_models_trained": all([
                self.cost_risk_model.is_trained,
                self.time_risk_model.is_trained,
                self.execution_risk_model.is_trained,
            ]),
        }
