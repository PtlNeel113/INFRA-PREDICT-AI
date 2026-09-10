"""
Fallback risk engine when ML models are not trained.

Uses deterministic rules based on project metrics.
"""
from typing import Dict, Any
import pandas as pd
import numpy as np

from ...core.logging import get_logger

logger = get_logger(__name__)


class FallbackRiskEngine:
    """
    Deterministic fallback risk engine.
    
    Used when ML models are not available. Provides transparent,
    rule-based risk assessment.
    """
    
    VERSION = "1.0.0"
    
    @staticmethod
    def calculate_cost_risk(df: pd.DataFrame) -> pd.DataFrame:
        """Calculate cost risk using deterministic rules."""
        # Cost overrun indicator
        expected_expenditure = df['sanctioned_cost_cr'] * (df['physical_progress'] / 100)
        cost_overrun = df['expenditure_cr'] - expected_expenditure
        cost_overrun_pct = (cost_overrun / expected_expenditure * 100).fillna(0).replace([np.inf, -np.inf], 0)
        
        # Calculate risk score (0-100)
        # Base score from overrun percentage
        risk_score = (cost_overrun_pct.clip(-50, 100) + 50) / 1.5
        risk_score = risk_score.clip(0, 100)
        
        return risk_score
    
    @staticmethod
    def calculate_time_risk(df: pd.DataFrame) -> pd.DataFrame:
        """Calculate time risk using deterministic rules."""
        # Progress gap
        progress_gap = df['expected_progress'] - df['physical_progress']
        
        # Calculate risk score (0-100)
        # Larger gap = higher risk
        risk_score = (progress_gap.clip(-20, 50) + 20) * 1.25
        risk_score = risk_score.clip(0, 100)
        
        return risk_score
    
    @staticmethod
    def calculate_execution_risk(df: pd.DataFrame) -> pd.DataFrame:
        """Calculate execution risk using deterministic rules."""
        # Combination of progress and spending efficiency
        progress_gap = df['expected_progress'] - df['physical_progress']
        
        # Spending efficiency
        efficiency = (df['physical_progress'] + 1) / (df['expenditure_cr'] / df['sanctioned_cost_cr'] * 100 + 1)
        efficiency_score = (2 - efficiency.clip(0.5, 2)) * 50
        
        # Combine factors
        risk_score = (progress_gap.clip(0, 50) * 0.6 + efficiency_score * 0.4).clip(0, 100)
        
        return risk_score
    
    @classmethod
    def classify_risk(cls, risk_score: float) -> str:
        """Classify risk score into risk class."""
        if risk_score < 25:
            return "LOW"
        elif risk_score < 50:
            return "MEDIUM"
        elif risk_score < 75:
            return "HIGH"
        else:
            return "CRITICAL"
    
    @classmethod
    def predict_all_risks(cls, projects_df: pd.DataFrame) -> Dict[str, Any]:
        """Predict all risks using fallback rules."""
        logger.info(f"Using fallback risk engine for {len(projects_df)} projects")
        
        df = projects_df.copy()
        
        # Calculate risk scores
        df['cost_risk_score'] = cls.calculate_cost_risk(df)
        df['time_risk_score'] = cls.calculate_time_risk(df)
        df['execution_risk_score'] = cls.calculate_execution_risk(df)
        
        # Classify risks
        df['cost_risk_class'] = df['cost_risk_score'].apply(cls.classify_risk)
        df['time_risk_class'] = df['time_risk_score'].apply(cls.classify_risk)
        df['execution_risk_class'] = df['execution_risk_score'].apply(cls.classify_risk)
        
        # Calculate health score
        weighted_risk = (
            df['cost_risk_score'] * 0.35 +
            df['time_risk_score'] * 0.40 +
            df['execution_risk_score'] * 0.25
        )
        df['health_score'] = (100 - weighted_risk).clip(0, 100).astype(int)
        
        # Format results
        predictions = []
        for _, row in df.iterrows():
            predictions.append({
                "project_code": row['code'],
                "health_score": int(row['health_score']),
                "overall_risk_level": cls.classify_risk(weighted_risk[row.name]),
                "cost_risk": {
                    "risk_score": round(float(row['cost_risk_score']), 2),
                    "risk_class": row['cost_risk_class'],
                    "confidence": None,
                    "model_version": f"fallback_{cls.VERSION}",
                    "status": "FALLBACK",
                },
                "time_risk": {
                    "risk_score": round(float(row['time_risk_score']), 2),
                    "risk_class": row['time_risk_class'],
                    "confidence": None,
                    "model_version": f"fallback_{cls.VERSION}",
                    "status": "FALLBACK",
                },
                "execution_risk": {
                    "risk_score": round(float(row['execution_risk_score']), 2),
                    "risk_class": row['execution_risk_class'],
                    "confidence": None,
                    "model_version": f"fallback_{cls.VERSION}",
                    "status": "FALLBACK",
                },
                "models_status": {
                    "cost_model": "FALLBACK",
                    "time_model": "FALLBACK",
                    "execution_model": "FALLBACK",
                }
            })
        
        return {
            "status": "success",
            "engine_mode": "FALLBACK",
            "message": "Using deterministic fallback engine. Train ML models for improved predictions.",
            "predictions": predictions,
            "metadata": {
                "total_predictions": len(predictions),
                "engine_version": f"fallback_{cls.VERSION}",
            }
        }
