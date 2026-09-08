import io
import json
from typing import Optional, Dict
from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, JSONResponse
from sqlalchemy.orm import Session

from .database import engine, get_db, Base
from .models import IngestionJob
from .services.ingest_service import process_ingestion_pipeline, parse_file_to_records
from .services.sync_service import get_paimana_sync_status

# Initialize DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="INFRA-PREDICT-AI Telemetry Ingestion Service",
    description="Government-grade project telemetry ingestion, deduplication & risk engine API",
    version="1.0.0",
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "service": "INFRA-PREDICT-AI Ingestion Service",
        "status": "HEALTHY",
        "version": "1.0.0",
        "database": str(engine.url),
    }

@app.get("/api/sync/status")
def sync_status():
    """
    Returns authentic PAIMANA API connector status.
    """
    return get_paimana_sync_status()

@app.post("/api/ingest/preview")
async def preview_file(file: UploadFile = File(...)):
    """
    Validates uploaded file and returns row count and sample rows.
    """
    try:
        contents = await file.read()
        records = parse_file_to_records(contents, file.filename)
        headers = list(records[0].keys()) if records else []
        return {
            "filename": file.filename,
            "totalRows": len(records),
            "headers": headers,
            "sampleRows": records[:5],
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"File parse error: {str(e)}")

@app.post("/api/ingest/commit")
async def commit_ingestion(
    file: UploadFile = File(...),
    user: Optional[str] = Form("Dr. Vikram Malhotra"),
    column_mapping: Optional[str] = Form(None),
    db: Session = Depends(get_db),
):
    """
    Executes production ingestion pipeline:
    Validates, normalizes, deduplicates, executes risk models, logs audit job.
    """
    try:
        contents = await file.read()
        mapping_dict = json.loads(column_mapping) if column_mapping else None
        summary = process_ingestion_pipeline(
            db=db,
            file_bytes=contents,
            filename=file.filename,
            user=user,
            column_mapping=mapping_dict,
        )
        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {str(e)}")

@app.get("/api/ingest/jobs")
def get_jobs(db: Session = Depends(get_db)):
    """
    Returns historical ingestion audit logs.
    """
    jobs = db.query(IngestionJob).order_by(IngestionJob.created_at.desc()).limit(20).all()
    return [
        {
            "id": j.id,
            "filename": j.filename,
            "fileSize": j.file_size,
            "totalRows": j.total_rows,
            "processedRows": j.processed_rows,
            "updatedRows": j.updated_rows,
            "newRows": j.new_rows,
            "rejectedRows": j.rejected_rows,
            "qualityScore": j.quality_score,
            "status": j.status,
            "user": j.user,
            "timestamp": j.created_at.strftime("%Y-%m-%d %I:%M %p"),
            "errors": json.loads(j.errors_json or "[]"),
        }
        for j in jobs
    ]

@app.get("/api/ingest/errors/{job_id}")
def download_errors(job_id: str, db: Session = Depends(get_db)):
    """
    Exports CSV error report for rejected rows.
    """
    job = db.query(IngestionJob).filter(IngestionJob.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Ingestion job not found.")

    errors = json.loads(job.errors_json or "[]")
    csv_lines = ["Row Number,Project Code,Field,Raw Value,Failure Reason"]
    for err in errors:
        raw_val = str(err.get("rawValue", "")).replace('"', '""')
        reason = str(err.get("reason", "")).replace('"', '""')
        csv_lines.append(f'{err.get("rowNumber")},"{err.get("projectCode", "N/A")}","{err.get("field")}","{raw_val}","{reason}"')

    csv_content = "\n".join(csv_lines)
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename=errors_{job_id}.csv"},
    )
