"""
Data ingestion request/response schemas.
"""
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field, validator


class FilePreviewResponse(BaseModel):
    """Response for file preview endpoint."""
    
    filename: str = Field(..., description="Uploaded filename")
    total_rows: int = Field(..., description="Total number of rows", alias="totalRows")
    headers: List[str] = Field(..., description="Column headers")
    sample_rows: List[Dict[str, Any]] = Field(..., description="Sample data rows", alias="sampleRows")
    
    class Config:
        populate_by_name = True


class IngestionCommitRequest(BaseModel):
    """Request payload for ingestion commit."""
    
    user: str = Field(default="Monitoring Officer", description="User performing the ingestion")
    column_mapping: Optional[Dict[str, str]] = Field(default=None, description="Column name mapping")


class IngestionErrorDetail(BaseModel):
    """Individual ingestion error."""
    
    row_number: int = Field(..., description="Row number with error", alias="rowNumber")
    field: str = Field(..., description="Field with validation error")
    raw_value: Any = Field(..., description="Raw value that failed validation", alias="rawValue")
    reason: str = Field(..., description="Error reason")
    project_code: Optional[str] = Field(None, description="Project code if available", alias="projectCode")
    
    class Config:
        populate_by_name = True


class IngestionSummaryResponse(BaseModel):
    """Summary response after ingestion commit."""
    
    job_id: str = Field(..., description="Ingestion job ID", alias="jobId")
    filename: str = Field(..., description="Processed filename")
    total_processed: int = Field(..., description="Total rows processed", alias="totalProcessed")
    updated_count: int = Field(..., description="Number of updated records", alias="updatedCount")
    created_count: int = Field(..., description="Number of new records", alias="createdCount")
    rejected_count: int = Field(..., description="Number of rejected rows", alias="rejectedCount")
    quality_score: float = Field(..., description="Data quality score (0-100)", alias="qualityScore")
    recalculated_risk_count: int = Field(..., description="Number of records with recalculated risks", alias="recalculatedRiskCount")
    errors: List[IngestionErrorDetail] = Field(default=[], description="List of validation errors")
    
    class Config:
        populate_by_name = True


class IngestionJobResponse(BaseModel):
    """Historical ingestion job record."""
    
    id: str = Field(..., description="Job ID")
    filename: str = Field(..., description="Filename")
    file_size: int = Field(..., description="File size in bytes", alias="fileSize")
    total_rows: int = Field(..., description="Total rows", alias="totalRows")
    processed_rows: int = Field(..., description="Processed rows", alias="processedRows")
    updated_rows: int = Field(..., description="Updated rows", alias="updatedRows")
    new_rows: int = Field(..., description="New rows", alias="newRows")
    rejected_rows: int = Field(..., description="Rejected rows", alias="rejectedRows")
    quality_score: float = Field(..., description="Quality score", alias="qualityScore")
    status: str = Field(..., description="Job status")
    user: str = Field(..., description="User who initiated the job")
    timestamp: str = Field(..., description="Job timestamp")
    errors: List[IngestionErrorDetail] = Field(default=[], description="Validation errors")
    
    class Config:
        populate_by_name = True


class IngestionErrorResponse(BaseModel):
    """Error export response."""
    
    job_id: str = Field(..., description="Job ID", alias="jobId")
    filename: str = Field(..., description="Original filename")
    error_count: int = Field(..., description="Number of errors", alias="errorCount")
    
    class Config:
        populate_by_name = True
