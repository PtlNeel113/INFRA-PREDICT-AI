import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, Text
from .database import Base

class IngestionJob(Base):
    __tablename__ = "ingestion_jobs"

    id = Column(String(64), primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    file_size = Column(Integer, default=0)
    total_rows = Column(Integer, default=0)
    processed_rows = Column(Integer, default=0)
    updated_rows = Column(Integer, default=0)
    new_rows = Column(Integer, default=0)
    rejected_rows = Column(Integer, default=0)
    quality_score = Column(Float, default=100.0)
    status = Column(String(32), default="COMPLETED") # COMPLETED, FAILED, PARTIAL
    user = Column(String(128), default="Monitoring Officer")
    errors_json = Column(Text, default="[]") # JSON list of row errors
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class RawUploadedData(Base):
    __tablename__ = "raw_uploaded_data"

    id = Column(String(64), primary_key=True, index=True)
    job_id = Column(String(64), index=True)
    filename = Column(String(255), nullable=False)
    file_format = Column(String(32))
    raw_payload = Column(Text) # JSON serialized raw input for auditability
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ProjectTelemetryRecord(Base):
    __tablename__ = "project_telemetry_records"

    id = Column(String(64), primary_key=True, index=True)
    code = Column(String(64), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    sector = Column(String(128), nullable=False)
    state = Column(String(128), nullable=False)
    district = Column(String(128), nullable=True)
    implementing_agency = Column(String(128), nullable=False)
    ministry = Column(String(128), nullable=True)
    sanctioned_cost_cr = Column(Float, nullable=False)
    expenditure_cr = Column(Float, default=0.0)
    physical_progress = Column(Float, default=0.0)
    expected_progress = Column(Float, default=0.0)
    health_score = Column(Integer, default=70)
    risk_level = Column(String(32), default="MEDIUM")
    cost_risk_score = Column(Integer, default=40)
    time_risk_score = Column(Integer, default=40)
    execution_risk_score = Column(Integer, default=40)
    predicted_delay_months = Column(Float, default=0.0)
    predicted_cost_overrun_cr = Column(Float, default=0.0)
    primary_risk_driver = Column(String(255), default="Right of Way & Clearances")
    current_issues = Column(Text, nullable=True)
    last_updated = Column(DateTime, default=datetime.datetime.utcnow)
