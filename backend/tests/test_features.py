"""
Tests for ML feature engineering.
"""
import pytest
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

from app.ml.features import (
    FeatureEngineering,
    extract_cost_features,
    extract_progress_features,
    extract_temporal_features,
    extract_categorical_features,
)
from app.ml.features.validator import FeatureValidator


@pytest.fixture
def sample_project_data():
    """Create sample project data for testing."""
    return pd.DataFrame({
        'code': ['PRJ-001', 'PRJ-002', 'PRJ-003'],
        'sanctioned_cost_cr': [100.0, 200.0, 150.0],
        'expenditure_cr': [45.0, 110.0, 60.0],
        'physical_progress': [40.0, 50.0, 35.0],
        'expected_progress': [45.0, 48.0, 40.0],
        'sector': ['Roads', 'Railways', 'Power'],
        'state': ['Maharashtra', 'Gujarat', 'Karnataka'],
        'implementing_agency': ['NHAI', 'Indian Railways', 'NTPC'],
        'ministry': ['MoRTH', 'Railways', 'Power'],
        'created_at': [
            datetime.utcnow() - timedelta(days=365),
            datetime.utcnow() - timedelta(days=730),
            datetime.utcnow() - timedelta(days=180),
        ],
    })


def test_extract_cost_features(sample_project_data):
    """Test cost feature extraction."""
    features = extract_cost_features(sample_project_data)
    
    assert 'cost_overrun_pct' in features.columns
    assert 'expenditure_ratio' in features.columns
    assert 'sanctioned_cost_cr' in features.columns
    
    # Check expenditure ratio calculation
    expected_ratio = sample_project_data['expenditure_cr'] / sample_project_data['sanctioned_cost_cr']
    pd.testing.assert_series_equal(
        features['expenditure_ratio'],
        expected_ratio,
        check_names=False
    )
    
    # Check no NaN or inf values
    assert not features['cost_overrun_pct'].isna().any()
    assert not np.isinf(features['cost_overrun_pct']).any()


def test_extract_progress_features(sample_project_data):
    """Test progress feature extraction."""
    features = extract_progress_features(sample_project_data)
    
    assert 'progress_gap' in features.columns
    assert 'physical_progress' in features.columns
    assert 'expected_progress' in features.columns
    assert 'expenditure_velocity' in features.columns
    
    # Check progress gap calculation
    expected_gap = sample_project_data['expected_progress'] - sample_project_data['physical_progress']
    pd.testing.assert_series_equal(
        features['progress_gap'],
        expected_gap,
        check_names=False
    )
    
    # Check velocity is non-negative
    assert (features['expenditure_velocity'] >= 0).all()


def test_extract_temporal_features(sample_project_data):
    """Test temporal feature extraction."""
    reference_date = datetime.utcnow()
    features = extract_temporal_features(sample_project_data, reference_date)
    
    assert 'project_age_days' in features.columns
    
    # Check age is reasonable
    assert (features['project_age_days'] >= 0).all()
    assert (features['project_age_days'] <= 10000).all()  # Max ~27 years


def test_extract_categorical_features(sample_project_data):
    """Test categorical feature extraction."""
    features = extract_categorical_features(sample_project_data)
    
    assert 'sector' in features.columns
    assert 'state' in features.columns
    assert 'implementing_agency' in features.columns
    assert 'ministry' in features.columns
    
    # Check no missing values
    assert not features['sector'].isna().any()
    assert not features['state'].isna().any()


def test_feature_engineering_extract(sample_project_data):
    """Test complete feature extraction pipeline."""
    fe = FeatureEngineering()
    
    features = fe.extract_features(sample_project_data)
    
    # Check all expected features are present
    expected_features = [
        'code',
        'cost_overrun_pct',
        'expenditure_ratio',
        'progress_gap',
        'expenditure_velocity',
        'physical_progress',
        'expected_progress',
        'project_age_days',
        'sanctioned_cost_cr',
        'sector',
        'state',
        'implementing_agency',
        'ministry',
    ]
    
    for feature in expected_features:
        assert feature in features.columns, f"Missing feature: {feature}"
    
    # Check same number of rows
    assert len(features) == len(sample_project_data)


def test_feature_engineering_fit_transform(sample_project_data):
    """Test feature engineering fit_transform for training."""
    fe = FeatureEngineering()
    
    # Extract features
    features = fe.extract_features(sample_project_data)
    
    # Fit and transform
    processed = fe.fit_transform(features)
    
    # Check categorical features are encoded as numbers
    for cat_feature in fe.CATEGORICAL_FEATURES:
        assert processed[cat_feature].dtype in [np.int32, np.int64, np.float64]
    
    # Check no missing values
    assert not processed.isna().any().any()
    
    # Preprocessor should be fitted
    assert fe.is_fitted


def test_feature_engineering_transform_inference(sample_project_data):
    """Test feature engineering transform for inference."""
    fe = FeatureEngineering()
    
    # Extract and fit on training data
    features_train = fe.extract_features(sample_project_data)
    processed_train = fe.fit_transform(features_train)
    
    # Create new data for inference
    new_data = sample_project_data.iloc[[0]].copy()
    new_data['code'] = 'PRJ-NEW'
    
    # Extract and transform (not fit_transform!)
    features_new = fe.extract_features(new_data)
    processed_new = fe.transform(features_new)
    
    # Check same columns
    assert set(processed_new.columns) == set(processed_train.columns)
    
    # Check no missing values
    assert not processed_new.isna().any().any()


def test_feature_validator_input(sample_project_data):
    """Test input data validation."""
    validator = FeatureValidator()
    
    # Valid data should pass
    validator.validate_input_data(sample_project_data)
    
    # Invalid: missing column
    invalid_df = sample_project_data.drop('sector', axis=1)
    with pytest.raises(ValueError, match="Missing required columns"):
        validator.validate_input_data(invalid_df)
    
    # Invalid: negative cost
    invalid_df = sample_project_data.copy()
    invalid_df.loc[0, 'sanctioned_cost_cr'] = -10
    with pytest.raises(ValueError, match="non-positive sanctioned cost"):
        validator.validate_input_data(invalid_df)
    
    # Invalid: progress out of range
    invalid_df = sample_project_data.copy()
    invalid_df.loc[0, 'physical_progress'] = 150
    with pytest.raises(ValueError, match="between 0 and 100"):
        validator.validate_input_data(invalid_df)


def test_prevent_data_leakage(sample_project_data):
    """Test that no future/target data leaks into features."""
    fe = FeatureEngineering()
    
    features = fe.extract_features(sample_project_data)
    
    # These columns should NOT be in features (they would cause leakage)
    leakage_features = [
        'predicted_delay_months',  # This is the target!
        'predicted_cost_overrun_cr',  # This is the target!
        'health_score',  # Derived from target
        'risk_level',  # Derived from target
    ]
    
    for feature in leakage_features:
        assert feature not in features.columns, f"Data leakage: {feature} found in features"


def test_feature_consistency_train_test(sample_project_data):
    """Test that train and test preprocessing produces consistent results."""
    fe = FeatureEngineering()
    
    # Split data
    train_data = sample_project_data.iloc[:2]
    test_data = sample_project_data.iloc[2:]
    
    # Training pipeline
    train_features = fe.extract_features(train_data)
    train_processed = fe.fit_transform(train_features)
    
    # Test pipeline (using same fitted preprocessor)
    test_features = fe.extract_features(test_data)
    test_processed = fe.transform(test_features)
    
    # Check same columns in same order
    assert list(train_processed.columns) == list(test_processed.columns)
    
    # Check same dtypes
    for col in train_processed.columns:
        if col != 'code':
            assert train_processed[col].dtype == test_processed[col].dtype


def test_handle_missing_values():
    """Test handling of missing values in input data."""
    data = pd.DataFrame({
        'code': ['PRJ-001', 'PRJ-002'],
        'sanctioned_cost_cr': [100.0, 200.0],
        'expenditure_cr': [50.0, None],  # Missing value
        'physical_progress': [45.0, 50.0],
        'expected_progress': [50.0, 52.0],
        'sector': ['Roads', None],  # Missing category
        'state': ['Maharashtra', 'Gujarat'],
        'implementing_agency': ['NHAI', 'NHAI'],
        'ministry': ['MoRTH', 'MoRTH'],
    })
    
    fe = FeatureEngineering()
    
    # Should handle missing values gracefully
    features = fe.extract_features(data)
    processed = fe.fit_transform(features)
    
    # No NaN should remain after preprocessing
    assert not processed.isna().any().any()


def test_handle_unseen_categories():
    """Test handling of unseen categories in inference."""
    train_data = pd.DataFrame({
        'code': ['PRJ-001', 'PRJ-002'],
        'sanctioned_cost_cr': [100.0, 200.0],
        'expenditure_cr': [50.0, 110.0],
        'physical_progress': [45.0, 50.0],
        'expected_progress': [50.0, 48.0],
        'sector': ['Roads', 'Railways'],
        'state': ['Maharashtra', 'Gujarat'],
        'implementing_agency': ['NHAI', 'Indian Railways'],
        'ministry': ['MoRTH', 'Railways'],
    })
    
    test_data = pd.DataFrame({
        'code': ['PRJ-003'],
        'sanctioned_cost_cr': [150.0],
        'expenditure_cr': [60.0],
        'physical_progress': [35.0],
        'expected_progress': [40.0],
        'sector': ['Aviation'],  # Unseen category!
        'state': ['Karnataka'],
        'implementing_agency': ['AAI'],  # Unseen category!
        'ministry': ['Aviation'],  # Unseen category!
    })
    
    fe = FeatureEngineering()
    
    # Train on train data
    train_features = fe.extract_features(train_data)
    train_processed = fe.fit_transform(train_features)
    
    # Test with unseen categories
    test_features = fe.extract_features(test_data)
    test_processed = fe.transform(test_features)  # Should not crash
    
    # Check processing succeeded
    assert len(test_processed) == 1
    assert not test_processed.isna().any().any()


def test_feature_versioning():
    """Test feature engineering version tracking."""
    fe = FeatureEngineering()
    
    metadata = fe.get_metadata()
    
    assert 'version' in metadata
    assert metadata['version'] == FeatureEngineering.VERSION
    assert 'numerical_features' in metadata
    assert 'categorical_features' in metadata
