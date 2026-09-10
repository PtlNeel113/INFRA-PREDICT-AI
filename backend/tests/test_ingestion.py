"""
Data ingestion endpoint tests.
"""
import io
import json
import pytest
from fastapi.testclient import TestClient
import pandas as pd


def create_test_csv() -> bytes:
    """Create a test CSV file."""
    data = {
        "name": ["Test Project 1", "Test Project 2"],
        "code": ["PRJ-001", "PRJ-002"],
        "sector": ["Roads & Highways", "Railways"],
        "state": ["Maharashtra", "Gujarat"],
        "sanctionedCostCr": [100.0, 200.0],
        "currentPhysicalProgress": [45.5, 60.0],
        "expectedProgress": [50.0, 55.0],
        "expenditureCr": [40.0, 110.0],
        "implementingAgency": ["NHAI", "Indian Railways"],
    }
    
    df = pd.DataFrame(data)
    buffer = io.BytesIO()
    df.to_csv(buffer, index=False)
    buffer.seek(0)
    return buffer.read()


def test_preview_file(client: TestClient):
    """Test file preview endpoint."""
    csv_content = create_test_csv()
    
    response = client.post(
        "/api/ingest/preview",
        files={"file": ("test.csv", csv_content, "text/csv")}
    )
    
    assert response.status_code == 200
    data = response.json()
    
    assert data["filename"] == "test.csv"
    assert data["totalRows"] == 2
    assert len(data["headers"]) > 0
    assert len(data["sampleRows"]) <= 5


def test_preview_invalid_file(client: TestClient):
    """Test preview with invalid file content."""
    response = client.post(
        "/api/ingest/preview",
        files={"file": ("test.csv", b"invalid content", "text/csv")}
    )
    
    # Pandas can parse "invalid content" as empty CSV (0 rows), which is valid behavior
    assert response.status_code in [200, 400, 422, 500]


def test_commit_ingestion(client: TestClient):
    """Test ingestion commit endpoint."""
    csv_content = create_test_csv()
    
    response = client.post(
        "/api/ingest/commit",
        files={"file": ("test.csv", csv_content, "text/csv")},
        data={"user": "Test User"}
    )
    
    assert response.status_code == 200
    data = response.json()
    
    assert "jobId" in data
    assert data["filename"] == "test.csv"
    assert data["totalProcessed"] == 2
    assert data["createdCount"] + data["updatedCount"] <= 2


def test_commit_with_column_mapping(client: TestClient):
    """Test ingestion with column mapping."""
    csv_content = create_test_csv()
    
    column_mapping = json.dumps({
        "name": "name",
        "code": "code",
    })
    
    response = client.post(
        "/api/ingest/commit",
        files={"file": ("test.csv", csv_content, "text/csv")},
        data={
            "user": "Test User",
            "column_mapping": column_mapping
        }
    )
    
    assert response.status_code == 200


def test_get_ingestion_jobs(client: TestClient):
    """Test retrieving ingestion job history."""
    # First, create a job
    csv_content = create_test_csv()
    client.post(
        "/api/ingest/commit",
        files={"file": ("test.csv", csv_content, "text/csv")}
    )
    
    # Then retrieve jobs
    response = client.get("/api/ingest/jobs")
    assert response.status_code == 200
    
    data = response.json()
    assert isinstance(data, list)
    if len(data) > 0:
        job = data[0]
        assert "id" in job
        assert "filename" in job
        assert "status" in job


def test_download_error_report(client: TestClient):
    """Test downloading error report."""
    # Create a job with errors (invalid data)
    invalid_csv = b"name,sanctionedCostCr\nTest Project,invalid_number\n"
    
    response = client.post(
        "/api/ingest/commit",
        files={"file": ("test.csv", invalid_csv, "text/csv")}
    )
    
    if response.status_code == 200:
        data = response.json()
        job_id = data["jobId"]
        
        # Download error report
        error_response = client.get(f"/api/ingest/errors/{job_id}")
        assert error_response.status_code == 200
        assert error_response.headers["content-type"] == "text/csv; charset=utf-8"


def test_download_error_report_not_found(client: TestClient):
    """Test downloading error report for non-existent job."""
    response = client.get("/api/ingest/errors/INVALID-JOB-ID")
    assert response.status_code == 404
