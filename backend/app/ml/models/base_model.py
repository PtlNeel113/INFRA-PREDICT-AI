"""
Base model class for risk prediction models.
"""
from typing import Dict, Any, Optional, List
from datetime import datetime
from pathlib import Path
import pickle
import json

import pandas as pd
import numpy as np

from ..features import FeatureEngineering


class RiskModel:
    """
    Base class for risk prediction models.
    
    Handles model loading, inference, and result formatting.
    """
    
    def __init__(
        self,
        model_name: str,
        model_path: Optional[Path] = None,
        feature_engineering: Optional[FeatureEngineering] = None,
    ):
        """
        Initialize risk model.
        
        Args:
            model_name: Name of the model (e.g., "cost_risk", "time_risk")
            model_path: Path to saved model file
            feature_engineering: Fitted feature engineering pipeline
        """
        self.model_name = model_name
        self.model_path = model_path
        self.feature_engineering = feature_engineering
        
        self.model = None
        self.model_metadata: Dict[str, Any] = {}
        self.is_trained = False
        
        if model_path and model_path.exists():
            self.load()
    
    def load(self):
        """Load trained model from disk."""
        if not self.model_path or not self.model_path.exists():
            raise FileNotFoundError(f"Model file not found: {self.model_path}")
        
        try:
            with open(self.model_path, 'rb') as f:
                saved_data = pickle.load(f)
            
            self.model = saved_data['model']
            self.model_metadata = saved_data.get('metadata', {})
            self.is_trained = True
            
            # Load feature engineering if included
            if 'feature_engineering' in saved_data:
                self.feature_engineering = saved_data['feature_engineering']
            
        except Exception as e:
            raise RuntimeError(f"Failed to load model: {e}")
    
    def predict(
        self,
        projects_df: pd.DataFrame,
        return_probabilities: bool = True,
    ) -> Dict[str, Any]:
        """
        Make predictions for projects.
        
        Args:
            projects_df: Raw project data
            return_probabilities: Whether to return probability distributions
        
        Returns:
            Dictionary with predictions and metadata
        """
        if not self.is_trained:
            return self._return_not_trained_response(len(projects_df))
        
        try:
            # Extract and preprocess features
            if self.feature_engineering is None:
                raise ValueError("Feature engineering pipeline not loaded")
            
            features = self.feature_engineering.extract_features(projects_df)
            processed_features = self.feature_engineering.transform(features)
            
            # Remove non-feature columns
            feature_cols = self.feature_engineering.get_feature_names()
            X = processed_features[feature_cols]
            
            # Calculate data quality score
            data_quality = self._calculate_data_quality(projects_df)
            
            # Make predictions
            predictions = self.model.predict(X)
            
            # Get probabilities if available and requested
            probabilities = None
            if return_probabilities and hasattr(self.model, 'predict_proba'):
                probabilities = self.model.predict_proba(X)
            
            # Format results
            results = self._format_predictions(
                project_codes=projects_df['code'].tolist(),
                predictions=predictions,
                probabilities=probabilities,
                data_quality=data_quality,
            )
            
            return results
            
        except Exception as e:
            return self._return_error_response(str(e), len(projects_df))
    
    def predict_single(self, project_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Make prediction for a single project.
        
        Args:
            project_data: Single project data as dictionary
        
        Returns:
            Prediction result
        """
        df = pd.DataFrame([project_data])
        results = self.predict(df)
        
        if results['status'] == 'success' and results['predictions']:
            return results['predictions'][0]
        
        return results
    
    def _format_predictions(
        self,
        project_codes: List[str],
        predictions: np.ndarray,
        probabilities: Optional[np.ndarray],
        data_quality: float,
    ) -> Dict[str, Any]:
        """Format predictions into standard response structure."""
        results = []
        
        for i, code in enumerate(project_codes):
            pred_value = float(predictions[i])
            
            # Get probability distribution if available
            prob_dist = None
            confidence = None
            if probabilities is not None:
                prob_dist = {
                    f"class_{j}": float(probabilities[i, j])
                    for j in range(probabilities.shape[1])
                }
                confidence = float(np.max(probabilities[i]))
            
            # Classify risk level
            risk_class = self._classify_risk(pred_value)
            
            results.append({
                "project_code": code,
                "risk_score": round(pred_value, 2),
                "risk_class": risk_class,
                "risk_probability": prob_dist,
                "confidence": round(confidence, 3) if confidence else None,
                "model_version": self.model_metadata.get('version', 'unknown'),
                "prediction_timestamp": datetime.utcnow().isoformat() + "Z",
                "data_quality_score": round(data_quality, 2),
            })
        
        return {
            "status": "success",
            "model_name": self.model_name,
            "model_version": self.model_metadata.get('version', 'unknown'),
            "predictions": results,
            "metadata": {
                "total_predictions": len(results),
                "average_confidence": round(np.mean([r["confidence"] for r in results if r["confidence"]]), 3) if any(r["confidence"] for r in results) else None,
                "data_quality_score": round(data_quality, 2),
            }
        }
    
    def _classify_risk(self, risk_score: float) -> str:
        """
        Classify risk score into risk class.
        
        Args:
            risk_score: Predicted risk score (0-100)
        
        Returns:
            Risk class: LOW, MEDIUM, HIGH, or CRITICAL
        """
        if risk_score < 25:
            return "LOW"
        elif risk_score < 50:
            return "MEDIUM"
        elif risk_score < 75:
            return "HIGH"
        else:
            return "CRITICAL"
    
    def _calculate_data_quality(self, df: pd.DataFrame) -> float:
        """
        Calculate data quality score based on completeness and validity.
        
        Args:
            df: Input dataframe
        
        Returns:
            Quality score (0-100)
        """
        required_cols = [
            'sanctioned_cost_cr',
            'expenditure_cr',
            'physical_progress',
            'expected_progress',
        ]
        
        total_score = 0
        weights = []
        
        for col in required_cols:
            if col in df.columns:
                # Check missing values
                completeness = 1 - (df[col].isna().sum() / len(df))
                
                # Check valid range
                if col in ['physical_progress', 'expected_progress']:
                    validity = ((df[col] >= 0) & (df[col] <= 100)).sum() / len(df)
                elif col in ['sanctioned_cost_cr', 'expenditure_cr']:
                    validity = (df[col] > 0).sum() / len(df)
                else:
                    validity = 1.0
                
                score = (completeness + validity) / 2
                total_score += score
                weights.append(1)
        
        if sum(weights) == 0:
            return 0.0
        
        return (total_score / sum(weights)) * 100
    
    def _return_not_trained_response(self, num_projects: int) -> Dict[str, Any]:
        """Return response when model is not trained."""
        return {
            "status": "MODEL_NOT_TRAINED",
            "model_name": self.model_name,
            "message": f"{self.model_name} model has not been trained yet. Using fallback predictions.",
            "predictions": [],
            "metadata": {
                "total_predictions": 0,
                "requires_training": True,
            }
        }
    
    def _return_error_response(self, error_message: str, num_projects: int) -> Dict[str, Any]:
        """Return response when prediction fails."""
        return {
            "status": "ERROR",
            "model_name": self.model_name,
            "message": f"Prediction failed: {error_message}",
            "predictions": [],
            "metadata": {
                "total_predictions": 0,
                "error": error_message,
            }
        }
    
    def get_model_info(self) -> Dict[str, Any]:
        """Get model information and metadata."""
        return {
            "model_name": self.model_name,
            "is_trained": self.is_trained,
            "model_path": str(self.model_path) if self.model_path else None,
            "metadata": self.model_metadata,
        }
