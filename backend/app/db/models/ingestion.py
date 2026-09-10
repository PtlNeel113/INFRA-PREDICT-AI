"""
Data ingestion models for tracking upload jobs and raw data.
"""
from datetime import datetime
from sqlalchemy import (
    Column, String, Integer, Float, DateTime, Text, ForeignKey,
    Index, CheckConstraint
)
from sqlalchemy.orm import relationship

from ..base import Base


class IngestionJob(Base):
    """Tracks data ingestion job status and metrics."""
    
    __tablename__ = "ingestion_jobs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    job_code = Column(String(64), unique=True, nullable=False, index=True)
    
    # File details
    filename = Column(String(255), nullable=False)
    file_size = Column(Integer, default=0)
    file_hash = Column(String(64), nullable=True)  # SHA256 hash for duplicate detection
    
    # Processing metrics
    total_rows = Column(Integer, default=0)
    processed_rows = Column(Integer, default=0)
    updated_rows = Column(Integer, default=0)
    new_rows = Column(Integer, default=0)
    rejected_rows = Column(Integer, default=0)
    
    # Quality
    quality_score = Column(Float, default=100.0)
    
    # Status
    status = Column(String(32), default="COMPLETED", nullable=False, index=True)  # PENDING, PROCESSING, COMPLETED, FAILED, PARTIAL
    
    # User tracking
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    user_name = Column(String(255), default="Monitoring Officer")
    
    # Error tracking
    errors_json = Column(Text, default="[]")  # JSON list of row errors
    error_message = Column(Text, nullable=True)
    
    # Processing time
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="ingestion_jobs")
    records = relationship("IngestionRecord", back_populates="job", cascade="all, delete-orphan")
    raw_data = relationship("RawUploadedData", back_populates="job", cascade="all, delete-orphan")
    
    __table_args__ = (
        Index('idx_job_status_date', 'status', 'created_at'),
        CheckConstraint('quality_score >= 0 AND quality_score <= 100', name='check_quality_score_range'),
        CheckConstraint('file_size >= 0', name='check_file_size_positive'),
    )

    def __repr__(self):
        return f"<IngestionJob(job_code={self.job_code}, filename={self.filename}, status={self.status})>"


class IngestionRecord(Base):
    """Individual records processed during ingestion."""
    
    __tablename__ = "ingestion_records"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    job_id = Column(Integer, ForeignKey("ingestion_jobs.id", ondelete="CASCADE"), nullable=False, index=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="SET NULL"), nullable=True, index=True)
    
    # Record details
    row_number = Column(Integer, nullable=False)
    project_code = Column(String(64), nullable=False, index=True)
    
    # Status
    status = Column(String(32), nullable=False, index=True)  # SUCCESS, REJECTED, UPDATED, CREATED
    error_message = Column(Text, nullable=True)
    
    # Data snapshot
    data_snapshot = Column(Text, nullable=True)  # JSON of processed data
    
    # Timestamps
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    # Relationships
    job = relationship("IngestionJob", back_populates="records")
    
    __table_args__ = (
        Index('idx_record_job_status', 'job_id', 'status'),
    )
    
    def __repr__(self):
        return f"<IngestionRecord(job_id={self.job_id}, project_code={self.project_code}, status={self.status})>"


class RawUploadedData(Base):
    """Stores raw uploaded data for audit trail and reprocessing."""
    
    __tablename__ = "raw_uploaded_data"

    id = Column(Integer, primary_key=True, autoincrement=True)
    job_id = Column(Integer, ForeignKey("ingestion_jobs.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # File details
    filename = Column(String(255), nullable=False)
    file_format = Column(String(32))
    
    # Raw data (compressed/chunked for large files)
    raw_payload = Column(Text)  # JSON serialized raw input for auditability
    payload_size = Column(Integer, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    # Relationships
    job = relationship("IngestionJob", back_populates="raw_data")

    def __repr__(self):
        return f"<RawUploadedData(id={self.id}, job_id={self.job_id}, filename={self.filename})>"
