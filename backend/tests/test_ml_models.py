"""
Tests for ML risk models.
"""
import pytest
import pandas as pd
from datetime import datetime, timedelta

from app.ml.models import RiskEngine, FallbackRiskEngine


@pytest.fixture
def sample_projects():
    """Create sample project data."""
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


def test_fallback_cost_risk(sample_projects):
    """Test fallback cost risk calculation."""
    risk_scores = FallbackRiskEngine.calculate_cost_risk(sample_projects)
    
    assert len(risk_scores) == len(sample_projects)
    assert (risk_scores >= 0).all()
    assert (risk_scores <= 100).all()


def test_fallback_time_risk(sample_projects):
    """Test fallback time risk calculation."""
    risk_scores = FallbackRiskEngine.calculate_time_risk(sample_projects)
    
    assert len(risk_scores) == len(sample_projects)
    assert (risk_scores >= 0).all()
    assert (risk_scores <= 100).all()


def test_fallback_execution_risk(sample_projects):
    """Test fallback execution risk calculation."""
    risk_scores = FallbackRiskEngine.calculate_execution_risk(sample_projects)
    
    assert len(risk_scores) == len(sample_projects)
    assert (risk_scores >= 0).all()
    assert (risk_scores <= 100).all()


def test_fallback_risk_classification():
    """Test risk classification logic."""
    assert FallbackRiskEngine.classify_risk(10) == "LOW"
    assert FallbackRiskEngine.classify_risk(35) == "MEDIUM"
    assert FallbackRiskEngine.classify_risk(60) == "HIGH"
    assert FallbackRiskEngine.classify_risk(85) == "CRITICAL"


def test_fallback_predict_all(sample_projects):
    """Test fallback prediction for all risks."""
    results = FallbackRiskEngine.predict_all_risks(sample_projects)
    
    assert results['status'] == 'success'
    assert results['engine_mode'] == 'FALLBACK'
    assert len(results['predictions']) == len(sample_projects)
    
    for pred in results['predictions']:
        assert 'project_code' in pred
        assert 'health_score' in pred
        assert 'cost_risk' in pred
        assert 'time_risk' in pred
        assert 'execution_risk' in pred
        
        # Check cost risk structure
        assert 'risk_score' in pred['cost_risk']
        assert 'risk_class' in pred['cost_risk']
        assert pred['cost_risk']['risk_class'] in ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
        assert pred['cost_risk']['status'] == 'FALLBACK'


def test_risk_engine_initialization():
    """Test risk engine initialization."""
    engine = RiskEngine()
    
    assert engine.cost_risk_model is not None
    assert engine.time_risk_model is not None
    assert engine.execution_risk_model is not None
    
    status = engine.get_engine_status()
    assert 'engine_version' in status
    assert 'models' in status
    assert len(status['models']) == 3


def test_risk_engine_untrained_models(sample_projects):
    """Test risk engine behavior when models are not trained."""
    engine = RiskEngine()
    
    # With no trained models, should handle gracefully
    results = engine.predict_all_risks(sample_projects)
    
    assert results['status'] == 'success'
    assert len(results['predictions']) == len(sample_projects)
    
    # Check that models report not trained status
    for pred in results['predictions']:
        models_status = pred['models_status']
        # Should either be MODEL_NOT_TRAINED or success (if models exist)
        assert all(
            status in ['success', 'MODEL_NOT_TRAINED']
            for status in models_status.values()
        )


def test_risk_engine_health_score_calculation():
    """Test health score calculation logic."""
    engine = RiskEngine()
    
    # Test with all scores
    health = engine._calculate_health_score(30.0, 40.0, 35.0)
    assert health is not None
    assert 0 <= health <= 100
    
    # Test with missing scores
    health = engine._calculate_health_score(None, 40.0, None)
    assert health is not None
    
    # Test with all None
    health = engine._calculate_health_score(None, None, None)
    assert health is None


def test_risk_engine_overall_risk_determination():
    """Test overall risk level determination."""
    engine = RiskEngine()
    
    # Test various combinations
    assert engine._determine_overall_risk('LOW', 'LOW', 'LOW') == 'LOW'
    assert engine._determine_overall_risk('LOW', 'MEDIUM', 'LOW') == 'MEDIUM'
    assert engine._determine_overall_risk('HIGH', 'MEDIUM', 'LOW') == 'HIGH'
    assert engine._determine_overall_risk('CRITICAL', 'MEDIUM', 'LOW') == 'CRITICAL'
    
    # Test with None values
    assert engine._determine_overall_risk(None, 'MEDIUM', None) == 'MEDIUM'
    assert engine._determine_overall_risk(None, None, None) == 'UNKNOWN'


def test_risk_engine_single_project(sample_projects):
    """Test prediction for single project."""
    engine = RiskEngine()
    
    project_data = sample_projects.iloc[0].to_dict()
    result = engine.predict_single_project(project_data)
    
    # Should return prediction data (even if models not trained)
    assert isinstance(result, dict)


def test_fallback_engine_data_quality():
    """Test that fallback engine produces consistent results."""
    # Create project with perfect progress
    perfect_project = pd.DataFrame({
        'code': ['PRJ-PERFECT'],
        'sanctioned_cost_cr': [100.0],
        'expenditure_cr': [40.0],
        'physical_progress': [40.0],
        'expected_progress': [40.0],
        'sector': ['Roads'],
        'state': ['Maharashtra'],
        'implementing_agency': ['NHAI'],
        'ministry': ['MoRTH'],
    })
    
    results = FallbackRiskEngine.predict_all_risks(perfect_project)
    pred = results['predictions'][0]
    
    # Perfect progress should have low risk
    assert pred['time_risk']['risk_class'] in ['LOW', 'MEDIUM']
    
    # Create delayed project
    delayed_project = pd.DataFrame({
        'code': ['PRJ-DELAYED'],
        'sanctioned_cost_cr': [100.0],
        'expenditure_cr': [60.0],
        'physical_progress': [30.0],
        'expected_progress': [50.0],
        'sector': ['Roads'],
        'state': ['Maharashtra'],
        'implementing_agency': ['NHAI'],
        'ministry': ['MoRTH'],
    })
    
    results = FallbackRiskEngine.predict_all_risks(delayed_project)
    pred = results['predictions'][0]
    
    # Delayed project should have high risk
    assert pred['time_risk']['risk_class'] in ['HIGH', 'CRITICAL']


def test_risk_prediction_structure():
    """Test that predictions have correct structure."""
    sample = pd.DataFrame({
        'code': ['TEST-001'],
        'sanctioned_cost_cr': [100.0],
        'expenditure_cr': [45.0],
        'physical_progress': [40.0],
        'expected_progress': [45.0],
        'sector': ['Roads'],
        'state': ['Test State'],
        'implementing_agency': ['Test Agency'],
        'ministry': ['Test Ministry'],
    })
    
    results = FallbackRiskEngine.predict_all_risks(sample)
    pred = results['predictions'][0]
    
    # Verify required fields
    required_fields = [
        'project_code',
        'health_score',
        'overall_risk_level',
        'cost_risk',
        'time_risk',
        'execution_risk',
        'models_status',
    ]
    
    for field in required_fields:
        assert field in pred, f"Missing field: {field}"
    
    # Verify risk detail structure
    for risk_type in ['cost_risk', 'time_risk', 'execution_risk']:
        risk_detail = pred[risk_type]
        assert 'risk_score' in risk_detail
        assert 'risk_class' in risk_detail
        assert 'model_version' in risk_detail
        assert 'status' in risk_detail
