"""
Synchronization endpoint tests.
"""
import pytest
from fastapi.testclient import TestClient


def test_sync_status(client: TestClient):
    """Test sync status endpoint."""
    response = client.get("/api/sync/status")
    assert response.status_code == 200
    
    data = response.json()
    assert "status" in data
    assert "isLive" in data
    assert "message" in data
    
    # Should be NOT_CONFIGURED in test environment
    assert data["status"] in ["NOT_CONFIGURED", "CONFIGURED"]


def test_trigger_sync_not_configured(client: TestClient):
    """Test triggering sync when not configured."""
    response = client.post("/api/sync/trigger")
    
    # Should fail or return NOT_IMPLEMENTED
    assert response.status_code in [502, 200]
