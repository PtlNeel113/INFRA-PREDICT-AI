"""
Base feature engineering class with versioning and validation.
"""
from typing import Dict, List, Any, Optional
from datetime import datetime
import pandas as pd

from .extractors import (
    extract_cost_features,
    extract_progress_features,
    extract_temporal_features,
    extract_categorical_features,
)
from .preprocessor import FeaturePreprocessor
from .validator import FeatureValidator


class FeatureEngineering:
    """
    Main feature engineering class.
    
    Ensures consistent preprocessing for both training and inference.
    Prevents data leakage through proper train/test separation.
    """
    
    # Feature version for tracking
    VERSION = "1.0.0"
    
    # Feature groups
    NUMERICAL_FEATURES = [
        "cost_overrun_pct",
        "expenditure_ratio",
        "progress_gap",
        "expenditure_velocity",
        "physical_progress",
        "expected_progress",
        "project_age_days",
        "sanctioned_cost_cr",
    ]
    
    CATEGORICAL_FEATURES = [
        "sector",
        "state",
        "implementing_agency",
        "ministry",
    ]
    
    def __init__(self, preprocessor: Optional[FeaturePreprocessor] = None):
        """
        Initialize feature engineering.
        
        Args:
            preprocessor: Pre-fitted preprocessor for inference, None for training
        """
        self.preprocessor = preprocessor
        self.validator = FeatureValidator()
        self.is_fitted = preprocessor is not None
    
    def extract_features(
        self,
        projects_df: pd.DataFrame,
        reference_date: Optional[datetime] = None,
    ) -> pd.DataFrame:
        """
        Extract all features from raw project data.
        
        This function is used for BOTH training and inference.
        
        Args:
            projects_df: Raw project data
            reference_date: Reference date for temporal features (default: now)
        
        Returns:
            DataFrame with engineered features
        """
        if reference_date is None:
            reference_date = datetime.utcnow()
        
        # Validate input data
        self.validator.validate_input_data(projects_df)
        
        df = projects_df.copy()
        
        # Extract feature groups
        cost_features = extract_cost_features(df)
        progress_features = extract_progress_features(df)
        temporal_features = extract_temporal_features(df, reference_date)
        categorical_features = extract_categorical_features(df)
        
        # Combine all features
        features_df = pd.concat([
            df[['code']],  # Keep identifier
            cost_features,
            progress_features,
            temporal_features,
            categorical_features,
        ], axis=1)
        
        # Validate extracted features
        self.validator.validate_extracted_features(features_df)
        
        return features_df
    
    def fit_transform(self, features_df: pd.DataFrame) -> pd.DataFrame:
        """
        Fit preprocessor and transform features (TRAINING ONLY).
        
        Args:
            features_df: Extracted features
        
        Returns:
            Preprocessed features ready for training
        """
        if self.is_fitted:
            raise ValueError("Preprocessor already fitted. Use transform() for inference.")
        
        # Initialize and fit preprocessor
        self.preprocessor = FeaturePreprocessor(
            numerical_features=self.NUMERICAL_FEATURES,
            categorical_features=self.CATEGORICAL_FEATURES,
        )
        
        processed_df = self.preprocessor.fit_transform(features_df)
        self.is_fitted = True
        
        # Validate processed features
        self.validator.validate_processed_features(processed_df)
        
        return processed_df
    
    def transform(self, features_df: pd.DataFrame) -> pd.DataFrame:
        """
        Transform features using fitted preprocessor (INFERENCE ONLY).
        
        Args:
            features_df: Extracted features
        
        Returns:
            Preprocessed features ready for prediction
        """
        if not self.is_fitted:
            raise ValueError("Preprocessor not fitted. Use fit_transform() first.")
        
        processed_df = self.preprocessor.transform(features_df)
        
        # Validate processed features
        self.validator.validate_processed_features(processed_df)
        
        return processed_df
    
    def get_feature_names(self) -> List[str]:
        """Get list of all feature names after preprocessing."""
        if not self.is_fitted:
            raise ValueError("Preprocessor not fitted yet.")
        
        return self.preprocessor.get_feature_names()
    
    def get_metadata(self) -> Dict[str, Any]:
        """Get feature engineering metadata for model versioning."""
        return {
            "version": self.VERSION,
            "numerical_features": self.NUMERICAL_FEATURES,
            "categorical_features": self.CATEGORICAL_FEATURES,
            "total_features": len(self.get_feature_names()) if self.is_fitted else None,
            "is_fitted": self.is_fitted,
            "created_at": datetime.utcnow().isoformat(),
        }
