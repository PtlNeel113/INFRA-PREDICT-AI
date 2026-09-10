"""
Feature validation to ensure data quality and prevent errors.
"""
from typing import List, Dict, Any
import pandas as pd
import numpy as np


class FeatureValidator:
    """Validates features at different stages of the pipeline."""
    
    REQUIRED_INPUT_COLUMNS = [
        'code',
        'sanctioned_cost_cr',
        'expenditure_cr',
        'physical_progress',
        'expected_progress',
        'sector',
        'state',
        'implementing_agency',
    ]
    
    def validate_input_data(self, df: pd.DataFrame):
        """
        Validate raw input data has required columns and valid values.
        
        Args:
            df: Raw project data
        
        Raises:
            ValueError: If validation fails
        """
        # Check required columns exist
        missing_cols = set(self.REQUIRED_INPUT_COLUMNS) - set(df.columns)
        if missing_cols:
            raise ValueError(f"Missing required columns: {missing_cols}")
        
        # Check for empty dataframe
        if len(df) == 0:
            raise ValueError("Input dataframe is empty")
        
        # Validate sanctioned_cost_cr is positive
        if (df['sanctioned_cost_cr'] <= 0).any():
            invalid_count = (df['sanctioned_cost_cr'] <= 0).sum()
            raise ValueError(f"Found {invalid_count} projects with non-positive sanctioned cost")
        
        # Validate progress values are in valid range
        if (df['physical_progress'] < 0).any() or (df['physical_progress'] > 100).any():
            raise ValueError("Physical progress must be between 0 and 100")
        
        if (df['expected_progress'] < 0).any() or (df['expected_progress'] > 100).any():
            raise ValueError("Expected progress must be between 0 and 100")
        
        # Validate expenditure is non-negative
        if (df['expenditure_cr'] < 0).any():
            raise ValueError("Expenditure cannot be negative")
    
    def validate_extracted_features(self, df: pd.DataFrame):
        """
        Validate extracted features before preprocessing.
        
        Args:
            df: Extracted features dataframe
        
        Raises:
            ValueError: If validation fails
        """
        # Check for NaN or inf values
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        
        for col in numeric_cols:
            if col == 'code':
                continue
            
            nan_count = df[col].isna().sum()
            inf_count = np.isinf(df[col]).sum()
            
            if nan_count > 0:
                raise ValueError(f"Feature '{col}' has {nan_count} NaN values")
            
            if inf_count > 0:
                raise ValueError(f"Feature '{col}' has {inf_count} infinite values")
    
    def validate_processed_features(self, df: pd.DataFrame):
        """
        Validate processed features ready for model.
        
        Args:
            df: Processed features dataframe
        
        Raises:
            ValueError: If validation fails
        """
        # All features should be numeric after preprocessing
        non_numeric = df.select_dtypes(exclude=[np.number]).columns.tolist()
        if 'code' in non_numeric:
            non_numeric.remove('code')
        
        if non_numeric:
            raise ValueError(f"Non-numeric columns found after preprocessing: {non_numeric}")
        
        # Check for any remaining NaN or inf
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        
        for col in numeric_cols:
            if col == 'code':
                continue
            
            if df[col].isna().any():
                raise ValueError(f"Processed feature '{col}' still has NaN values")
            
            if np.isinf(df[col]).any():
                raise ValueError(f"Processed feature '{col}' still has infinite values")
    
    def validate_feature_names(self, feature_names: List[str], expected_features: List[str]):
        """
        Validate feature names match expected features.
        
        Args:
            feature_names: Actual feature names
            expected_features: Expected feature names
        
        Raises:
            ValueError: If features don't match
        """
        missing = set(expected_features) - set(feature_names)
        extra = set(feature_names) - set(expected_features)
        
        if missing:
            raise ValueError(f"Missing expected features: {missing}")
        
        if extra:
            raise ValueError(f"Unexpected extra features: {extra}")
