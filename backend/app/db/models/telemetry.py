"""
Project telemetry and monitoring data models.
"""
import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, Text

from ..base import Base


class ProjectTelemetryRecord(Base):
    """Stores project telemetry data with risk assessments."""
    
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

    def __repr__(self):
        return f"<ProjectTelemetryRecord(code={self.code}, name={self.name}, risk_level={self.risk_level})>"
