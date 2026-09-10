"""
Feature extraction functions.

All functions operate on raw project data and extract meaningful features
without any data leakage.
"""
from typing import Optional
from datetime import datetime
import pandas as pd
import numpy as np


def extract_cost_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Extract cost-related features.
    
    Features:
    - cost_overrun_pct: Percentage of cost overrun based on expenditure vs progress
    - expenditure_ratio: Actual expenditure / sanctioned cost
    """
    features = pd.DataFrame(index=df.index)
    
    # Expenditure ratio (what % of budget has been spent)
    features['expenditure_ratio'] = (
        df['expenditure_cr'] / df['sanctioned_cost_cr']
    ).fillna(0).clip(0, 2)  # Cap at 200% for outliers
    
    # Cost overrun percentage
    # If we spent more than progress justifies, we have cost overrun
    # Expected spending = sanctioned_cost * (physical_progress / 100)
    # Overrun = (actual - expected) / expected * 100
    expected_expenditure = df['sanctioned_cost_cr'] * (df['physical_progress'] / 100)
    cost_overrun = df['expenditure_cr'] - expected_expenditure
    
    features['cost_overrun_pct'] = (
        (cost_overrun / expected_expenditure * 100)
        .fillna(0)
        .replace([np.inf, -np.inf], 0)
        .clip(-100, 200)  # Cap at reasonable bounds
    )
    
    # Sanctioned cost (log scale for better distribution)
    features['sanctioned_cost_cr'] = df['sanctioned_cost_cr']
    
    return features


def extract_progress_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Extract progress-related features.
    
    Features:
    - progress_gap: Expected progress - actual progress
    - physical_progress: Current physical progress %
    - expected_progress: Expected progress at this point
    - expenditure_velocity: How fast money is being spent relative to progress
    """
    features = pd.DataFrame(index=df.index)
    
    # Progress gap (negative means behind schedule)
    features['progress_gap'] = (
        df['expected_progress'] - df['physical_progress']
    ).fillna(0).clip(-100, 100)
    
    # Physical and expected progress
    features['physical_progress'] = df['physical_progress'].fillna(0).clip(0, 100)
    features['expected_progress'] = df['expected_progress'].fillna(0).clip(0, 100)
    
    # Expenditure velocity
    # How much money spent per % of physical progress
    # Higher values indicate inefficient spending
    features['expenditure_velocity'] = (
        df['expenditure_cr'] / (df['physical_progress'] + 1)  # +1 to avoid division by zero
    ).fillna(0).clip(0, df['sanctioned_cost_cr'].max() * 2)
    
    return features


def extract_temporal_features(
    df: pd.DataFrame,
    reference_date: datetime,
) -> pd.DataFrame:
    """
    Extract time-related features.
    
    Features:
    - project_age_days: Days since project creation
    
    Note: We don't extract future dates or completion dates as they would cause data leakage.
    """
    features = pd.DataFrame(index=df.index)
    
    # Project age in days
    if 'created_at' in df.columns:
        created_dates = pd.to_datetime(df['created_at'], errors='coerce')
        features['project_age_days'] = (
            (reference_date - created_dates).dt.days
        ).fillna(0).clip(0, 10000)  # Max ~27 years
    else:
        # If no creation date, assume 365 days
        features['project_age_days'] = 365
    
    return features


def extract_categorical_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Extract and clean categorical features.
    
    Features:
    - sector: Infrastructure sector
    - state: Geographic location
    - implementing_agency: Executing organization
    - ministry: Responsible ministry
    """
    features = pd.DataFrame(index=df.index)
    
    # Clean and normalize categorical variables
    features['sector'] = df['sector'].fillna('Unknown').astype(str).str.strip()
    features['state'] = df['state'].fillna('Unknown').astype(str).str.strip()
    features['implementing_agency'] = df['implementing_agency'].fillna('Unknown').astype(str).str.strip()
    
    # Ministry might be optional
    if 'ministry' in df.columns:
        features['ministry'] = df['ministry'].fillna('Unknown').astype(str).str.strip()
    else:
        features['ministry'] = 'Unknown'
    
    return features


def extract_risk_driver_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Extract features from risk drivers (if available).
    
    This is an optional feature set that can be added if risk driver data is provided.
    """
    features = pd.DataFrame(index=df.index)
    
    if 'primary_risk_driver' in df.columns:
        features['primary_risk_driver'] = df['primary_risk_driver'].fillna('Unknown').astype(str)
    
    return features
