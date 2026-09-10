"""
Feature preprocessing with consistent train/inference pipeline.
"""
from typing import List, Dict, Any, Optional
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
import pickle
import json


class FeaturePreprocessor:
    """
    Handles all feature preprocessing including:
    - Missing value imputation
    - Numerical scaling (only where needed)
    - Categorical encoding
    - Feature validation
    
    Ensures same preprocessing applied during training and inference.
    """
    
    def __init__(
        self,
        numerical_features: List[str],
        categorical_features: List[str],
        scale_numerical: bool = False,  # Scaling optional for tree-based models
    ):
        """
        Initialize preprocessor.
        
        Args:
            numerical_features: List of numerical feature names
            categorical_features: List of categorical feature names
            scale_numerical: Whether to scale numerical features (False for tree models)
        """
        self.numerical_features = numerical_features
        self.categorical_features = categorical_features
        self.scale_numerical = scale_numerical
        
        # Preprocessing artifacts (fitted during training)
        self.scaler: Optional[StandardScaler] = None
        self.label_encoders: Dict[str, LabelEncoder] = {}
        self.categorical_mappings: Dict[str, Dict[str, int]] = {}
        
        # Statistics for validation
        self.numerical_stats: Dict[str, Dict[str, float]] = {}
        
        self.is_fitted = False
    
    def fit_transform(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Fit preprocessor and transform features (TRAINING).
        
        Args:
            df: Features dataframe
        
        Returns:
            Preprocessed features
        """
        result_df = df.copy()
        
        # Handle numerical features
        result_df = self._fit_transform_numerical(result_df)
        
        # Handle categorical features
        result_df = self._fit_transform_categorical(result_df)
        
        self.is_fitted = True
        return result_df
    
    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Transform features using fitted preprocessor (INFERENCE).
        
        Args:
            df: Features dataframe
        
        Returns:
            Preprocessed features
        """
        if not self.is_fitted:
            raise ValueError("Preprocessor must be fitted before transform")
        
        result_df = df.copy()
        
        # Apply same transformations
        result_df = self._transform_numerical(result_df)
        result_df = self._transform_categorical(result_df)
        
        return result_df
    
    def _fit_transform_numerical(self, df: pd.DataFrame) -> pd.DataFrame:
        """Fit and transform numerical features."""
        for feature in self.numerical_features:
            if feature not in df.columns:
                continue
            
            # Calculate statistics
            self.numerical_stats[feature] = {
                'mean': df[feature].mean(),
                'std': df[feature].std(),
                'min': df[feature].min(),
                'max': df[feature].max(),
                'median': df[feature].median(),
            }
            
            # Fill missing values with median
            df[feature] = df[feature].fillna(self.numerical_stats[feature]['median'])
        
        # Optional scaling (not needed for tree-based models)
        if self.scale_numerical:
            features_to_scale = [f for f in self.numerical_features if f in df.columns]
            self.scaler = StandardScaler()
            df[features_to_scale] = self.scaler.fit_transform(df[features_to_scale])
        
        return df
    
    def _transform_numerical(self, df: pd.DataFrame) -> pd.DataFrame:
        """Transform numerical features using fitted parameters."""
        for feature in self.numerical_features:
            if feature not in df.columns:
                continue
            
            # Use same median for missing values
            if feature in self.numerical_stats:
                df[feature] = df[feature].fillna(self.numerical_stats[feature]['median'])
            else:
                df[feature] = df[feature].fillna(0)
        
        # Apply scaling if fitted
        if self.scale_numerical and self.scaler is not None:
            features_to_scale = [f for f in self.numerical_features if f in df.columns]
            df[features_to_scale] = self.scaler.transform(df[features_to_scale])
        
        return df
    
    def _fit_transform_categorical(self, df: pd.DataFrame) -> pd.DataFrame:
        """Fit and transform categorical features."""
        for feature in self.categorical_features:
            if feature not in df.columns:
                continue
            
            # Fill missing with 'Unknown'
            df[feature] = df[feature].fillna('Unknown').astype(str)
            
            # Fit label encoder
            encoder = LabelEncoder()
            df[feature] = encoder.fit_transform(df[feature])
            
            # Store encoder and mapping
            self.label_encoders[feature] = encoder
            self.categorical_mappings[feature] = {
                label: idx for idx, label in enumerate(encoder.classes_)
            }
        
        return df
    
    def _transform_categorical(self, df: pd.DataFrame) -> pd.DataFrame:
        """Transform categorical features using fitted encoders."""
        for feature in self.categorical_features:
            if feature not in df.columns:
                continue
            
            # Fill missing with 'Unknown'
            df[feature] = df[feature].fillna('Unknown').astype(str)
            
            # Handle unseen categories
            if feature in self.categorical_mappings:
                mapping = self.categorical_mappings[feature]
                unknown_idx = mapping.get('Unknown', 0)
                
                # Map known categories, use 'Unknown' for unseen
                df[feature] = df[feature].apply(
                    lambda x: mapping.get(x, unknown_idx)
                )
            else:
                df[feature] = 0
        
        return df
    
    def get_feature_names(self) -> List[str]:
        """Get list of all feature names after preprocessing."""
        return self.numerical_features + self.categorical_features
    
    def save(self, filepath: str):
        """Save fitted preprocessor to disk."""
        if not self.is_fitted:
            raise ValueError("Cannot save unfitted preprocessor")
        
        state = {
            'numerical_features': self.numerical_features,
            'categorical_features': self.categorical_features,
            'scale_numerical': self.scale_numerical,
            'numerical_stats': self.numerical_stats,
            'categorical_mappings': self.categorical_mappings,
            'scaler': self.scaler,
            'is_fitted': self.is_fitted,
        }
        
        with open(filepath, 'wb') as f:
            pickle.dump(state, f)
    
    @classmethod
    def load(cls, filepath: str) -> 'FeaturePreprocessor':
        """Load fitted preprocessor from disk."""
        with open(filepath, 'rb') as f:
            state = pickle.load(f)
        
        preprocessor = cls(
            numerical_features=state['numerical_features'],
            categorical_features=state['categorical_features'],
            scale_numerical=state['scale_numerical'],
        )
        
        preprocessor.numerical_stats = state['numerical_stats']
        preprocessor.categorical_mappings = state['categorical_mappings']
        preprocessor.scaler = state.get('scaler')
        preprocessor.is_fitted = state['is_fitted']
        
        return preprocessor
