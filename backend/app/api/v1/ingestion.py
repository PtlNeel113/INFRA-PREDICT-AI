"""
Data ingestion API endpoints.
"""
import json
from typing import Optional, List
from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, status
from fastapi.responses import Response
from sqlalchemy.orm import Session

from ...core.dependencies import get_db
from ...core.logging import get_logger
from ...core.exceptions import FileProcessingException, ValidationException, DatabaseException
from ...db.models import IngestionJob
from ...services.ingestion_service import process_ingestion_pipeline, parse_file_to_records
from ...schemas.ingestion import (
    FilePreviewResponse,
    IngestionSummaryResponse,
    IngestionJobResponse,
)
from ...core.rbac import require_permission, Permission

logger = get_logger(__name__)
router = APIRouter()


@router.post("/preview", response_model=FilePreviewResponse, summary="Preview uploaded file")
async def preview_file(
    file: UploadFile = File(...),
    _role: str = Depends(require_permission(Permission.INGEST_DATA)),
):
    """
    Validate uploaded file and return preview with row count and sample data.
    
    This endpoint parses the file but does not persist any data.
    Used for validation before commit.
    """
    try:
        contents = await file.read()
        
        logger.info(
            f"File preview requested",
            extra={"file_name": file.filename, "file_size": len(contents)}
        )
        
        records = parse_file_to_records(contents, file.filename)
        headers = list(records[0].keys()) if records else []
        
        return FilePreviewResponse(
            filename=file.filename,
            totalRows=len(records),
            headers=headers,
            sampleRows=records[:5],
        )
        
    except FileProcessingException as e:
        logger.warning(f"File preview failed: {e.message}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.message
        )
    except Exception as e:
        logger.error(f"Unexpected error in file preview: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"File parse error: {str(e)}"
        )


@router.post("/commit", response_model=IngestionSummaryResponse, summary="Commit ingestion")
async def commit_ingestion(
    file: UploadFile = File(...),
    user: Optional[str] = Form("Monitoring Officer"),
    column_mapping: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    _role: str = Depends(require_permission(Permission.INGEST_DATA)),
):
    """
    Execute production ingestion pipeline.
    
    Pipeline stages:
    1. Parse and validate file
    2. Normalize data fields
    3. Calculate risk scores
    4. Deduplicate by project code
    5. Upsert to database
    6. Create audit log
    
    Returns detailed summary with metrics and validation errors.
    """
    try:
        contents = await file.read()
        
        logger.info(
            f"Ingestion commit started",
            extra={"file_name": file.filename, "user_name": user, "file_size": len(contents)}
        )
        
        mapping_dict = json.loads(column_mapping) if column_mapping else None
        
        summary = process_ingestion_pipeline(
            db=db,
            file_bytes=contents,
            filename=file.filename,
            user=user,
            column_mapping=mapping_dict,
        )
        
        return IngestionSummaryResponse(**summary)
        
    except FileProcessingException as e:
        logger.error(f"File processing failed: {e.message}")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=e.message
        )
    except ValidationException as e:
        logger.error(f"Validation failed: {e.message}")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=e.message
        )
    except DatabaseException as e:
        logger.error(f"Database operation failed: {e.message}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=e.message
        )
    except Exception as e:
        logger.exception("Unexpected error in ingestion commit")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ingestion failed: {str(e)}"
        )


@router.get("/jobs", response_model=List[IngestionJobResponse], summary="Get ingestion history")
def get_ingestion_jobs(
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """
    Retrieve historical ingestion audit logs.
    
    Returns list of ingestion jobs with metrics and status.
    """
    try:
        jobs = db.query(IngestionJob).order_by(
            IngestionJob.created_at.desc()
        ).limit(limit).all()
        
        result = []
        for j in jobs:
            errors = json.loads(j.errors_json or "[]")
            result.append(
                IngestionJobResponse(
                    id=j.id,
                    filename=j.filename,
                    fileSize=j.file_size,
                    totalRows=j.total_rows,
                    processedRows=j.processed_rows,
                    updatedRows=j.updated_rows,
                    newRows=j.new_rows,
                    rejectedRows=j.rejected_rows,
                    qualityScore=j.quality_score,
                    status=j.status,
                    user=j.user,
                    timestamp=j.created_at.strftime("%Y-%m-%d %I:%M %p"),
                    errors=errors,
                )
            )
        
        logger.info(f"Retrieved {len(result)} ingestion jobs")
        return result
        
    except Exception as e:
        logger.error(f"Failed to retrieve ingestion jobs: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve ingestion jobs"
        )


@router.get("/errors/{job_id}", summary="Download error report")
def download_error_report(
    job_id: str,
    db: Session = Depends(get_db)
):
    """
    Export CSV error report for rejected rows in an ingestion job.
    
    Returns CSV file with detailed error information.
    """
    try:
        job = db.query(IngestionJob).filter(IngestionJob.id == job_id).first()
        
        if not job:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Ingestion job not found"
            )
        
        errors = json.loads(job.errors_json or "[]")
        
        # Build CSV content
        csv_lines = ["Row Number,Project Code,Field,Raw Value,Failure Reason"]
        for err in errors:
            raw_val = str(err.get("rawValue", "")).replace('"', '""')
            reason = str(err.get("reason", "")).replace('"', '""')
            csv_lines.append(
                f'{err.get("rowNumber")},"{err.get("projectCode", "N/A")}",'
                f'"{err.get("field")}","{raw_val}","{reason}"'
            )
        
        csv_content = "\n".join(csv_lines)
        
        logger.info(f"Error report downloaded", extra={"job_id": job_id})
        
        return Response(
            content=csv_content,
            media_type="text/csv",
            headers={
                "Content-Disposition": f"attachment; filename=errors_{job_id}.csv"
            },
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to generate error report: {e}", extra={"job_id": job_id})
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate error report"
        )
