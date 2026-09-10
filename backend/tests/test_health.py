"""
Health check endpoint tests.
"""
import pytest
from fastapi.testclient import TestClient


def test_root_endpoint(client: TestClient):
    """Test root endpoint returns service information."""
    response = client.get("/api/")
    assert response.status_code == 200
    
    data = response.json()
    assert "service" in data
    assert "status" in data
    assert "version" in data
    assert data["status"] == "HEALTHY"


def test_health_check(client: TestClient):
    """Test health check endpoint."""
    response = client.get("/api/health")
    assert response.status_code == 200
    
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data
    assert "timestamp" in data


def test_readiness_check(client: TestClient):
    """Test readiness probe endpoint."""
    response = client.get("/api/ready")
    assert response.status_code == 200
    
    data = response.json()
    assert "ready" in data
    assert "checks" in data
    assert "timestamp" in data
    assert "database" in data["checks"]


def test_ping(client: TestClient):
    """Test ping endpoint."""
    response = client.get("/api/ping")
    assert response.status_code == 200
    
    data = response.json()
    assert data["ping"] == "pong"
    assert "timestamp" in data


def test_request_id_header(client: TestClient):
    """Test that request ID is added to response headers."""
    response = client.get("/api/health")
    assert "X-Request-ID" in response.headers


def test_security_headers(client: TestClient):
    """Test that security headers are present."""
    response = client.get("/api/health")
    
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert response.headers["X-Frame-Options"] == "DENY"
    assert response.headers["X-XSS-Protection"] == "1; mode=block"
    assert "Strict-Transport-Security" in response.headers


def test_process_time_header(client: TestClient):
    """Test that process time header is added."""
    response = client.get("/api/health")
    assert "X-Process-Time" in response.headers
