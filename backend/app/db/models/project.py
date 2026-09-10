"""
Core project models with normalized structure.
"""
from datetime import datetime
from sqlalchemy import (
    Column, String, Integer, Float, DateTime, Text, ForeignKey,
    Boolean, Index, UniqueConstraint, CheckConstraint
)
from sqlalchemy.orm import relationship

from ..base import Base


class Project(Base):
    """Core project entity with master data."""
    
    __tablename__ = "projects"
    
    # Primary Key
    id = Column(Integer, primary_key=True, autoincrement=True)
    
    # Unique business identifier
    code = Column(String(64), unique=True, nullable=False, index=True)
    
    # Basic Information
    name = Column(String(500), nullable=False, index=True)
    sector = Column(String(128), nullable=False, index=True)
    state = Column(String(128), nullable=False, index=True)
    district = Column(String(128), nullable=True)
    
    # Organizational
    implementing_agency = Column(String(255), nullable=False)
    ministry = Column(String(255), nullable=True)
    
    # Financial
    sanctioned_cost_cr = Column(Float, nullable=False)
    
    # Status
    is_active = Column(Boolean, default=True, nullable=False)
    completion_percentage = Column(Float, default=0.0)
    
    # Timestamps
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    updates = relationship("ProjectUpdate", back_populates="project", cascade="all, delete-orphan")
    milestones = relationship("ProjectMilestone", back_populates="project", cascade="all, delete-orphan")
    risk_scores = relationship("RiskScore", back_populates="project", cascade="all, delete-orphan")
    predictions = relationship("Prediction", back_populates="project", cascade="all, delete-orphan")
    risk_drivers = relationship("RiskDriver", back_populates="project", cascade="all, delete-orphan")
    early_warnings = relationship("EarlyWarning", back_populates="project", cascade="all, delete-orphan")
    benchmarks = relationship("PeerBenchmark", back_populates="project", cascade="all, delete-orphan")
    
    # Indexes
    __table_args__ = (
        Index('idx_project_sector_state', 'sector', 'state'),
        Index('idx_project_active', 'is_active'),
        CheckConstraint('sanctioned_cost_cr > 0', name='check_sanctioned_cost_positive'),
        CheckConstraint('completion_percentage >= 0 AND completion_percentage <= 100', name='check_completion_range'),
    )
    
    def __repr__(self):
        return f"<Project(code={self.code}, name={self.name})>"


class ProjectUpdate(Base):
    """Time-series updates for project progress and expenditure."""
    
    __tablename__ = "project_updates"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # Progress metrics
    physical_progress = Column(Float, nullable=False)
    expected_progress = Column(Float, nullable=False)
    expenditure_cr = Column(Float, nullable=False)
    
    # Status
    current_issues = Column(Text, nullable=True)
    remarks = Column(Text, nullable=True)
    
    # Metadata
    reported_date = Column(DateTime, nullable=False, index=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    project = relationship("Project", back_populates="updates")
    
    __table_args__ = (
        Index('idx_project_update_date', 'project_id', 'reported_date'),
        CheckConstraint('physical_progress >= 0 AND physical_progress <= 100', name='check_physical_progress_range'),
        CheckConstraint('expected_progress >= 0 AND expected_progress <= 100', name='check_expected_progress_range'),
        CheckConstraint('expenditure_cr >= 0', name='check_expenditure_positive'),
    )
    
    def __repr__(self):
        return f"<ProjectUpdate(project_id={self.project_id}, progress={self.physical_progress}%)>"


class ProjectMilestone(Base):
    """Project milestones and key deliverables."""
    
    __tablename__ = "project_milestones"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # Milestone details
    name = Column(String(500), nullable=False)
    description = Column(Text, nullable=True)
    milestone_type = Column(String(64), nullable=False)  # CONTRACT_AWARD, LAND_ACQUISITION, COMPLETION, etc.
    
    # Dates
    planned_date = Column(DateTime, nullable=False)
    actual_date = Column(DateTime, nullable=True)
    
    # Status
    status = Column(String(32), nullable=False, default="PENDING")  # PENDING, COMPLETED, DELAYED, CANCELLED
    is_critical = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    project = relationship("Project", back_populates="milestones")
    
    __table_args__ = (
        Index('idx_milestone_project_date', 'project_id', 'planned_date'),
        Index('idx_milestone_status', 'status'),
    )
    
    def __repr__(self):
        return f"<ProjectMilestone(project_id={self.project_id}, name={self.name})>"


class RiskScore(Base):
    """Historical risk scores and assessments."""
    
    __tablename__ = "risk_scores"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # Risk metrics
    health_score = Column(Integer, nullable=False)
    risk_level = Column(String(32), nullable=False, index=True)  # LOW, MEDIUM, HIGH, CRITICAL
    
    # Component scores
    cost_risk_score = Column(Integer, nullable=False)
    time_risk_score = Column(Integer, nullable=False)
    execution_risk_score = Column(Integer, nullable=False)
    
    # Calculated at
    calculated_at = Column(DateTime, nullable=False, default=datetime.utcnow, index=True)
    
    # Metadata
    calculation_method = Column(String(64), default="DETERMINISTIC")  # DETERMINISTIC, ML_MODEL, HYBRID
    model_version = Column(String(32), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    # Relationships
    project = relationship("Project", back_populates="risk_scores")
    
    __table_args__ = (
        Index('idx_risk_project_date', 'project_id', 'calculated_at'),
        Index('idx_risk_level', 'risk_level'),
        CheckConstraint('health_score >= 0 AND health_score <= 100', name='check_health_score_range'),
        CheckConstraint('cost_risk_score >= 0 AND cost_risk_score <= 100', name='check_cost_risk_range'),
        CheckConstraint('time_risk_score >= 0 AND time_risk_score <= 100', name='check_time_risk_range'),
        CheckConstraint('execution_risk_score >= 0 AND execution_risk_score <= 100', name='check_execution_risk_range'),
    )
    
    def __repr__(self):
        return f"<RiskScore(project_id={self.project_id}, risk_level={self.risk_level})>"


class Prediction(Base):
    """Predictive analytics for cost overruns and delays."""
    
    __tablename__ = "predictions"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # Predictions
    predicted_delay_months = Column(Float, nullable=False)
    predicted_cost_overrun_cr = Column(Float, nullable=False)
    predicted_completion_date = Column(DateTime, nullable=True)
    
    # Confidence
    confidence_score = Column(Float, nullable=True)  # 0-1 scale
    
    # Model info
    model_name = Column(String(128), nullable=False)
    model_version = Column(String(32), nullable=False)
    
    # Timestamps
    predicted_at = Column(DateTime, nullable=False, default=datetime.utcnow, index=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    # Relationships
    project = relationship("Project", back_populates="predictions")
    
    __table_args__ = (
        Index('idx_prediction_project_date', 'project_id', 'predicted_at'),
        CheckConstraint('predicted_delay_months >= 0', name='check_delay_positive'),
        CheckConstraint('predicted_cost_overrun_cr >= 0', name='check_overrun_positive'),
        CheckConstraint('confidence_score IS NULL OR (confidence_score >= 0 AND confidence_score <= 1)', name='check_confidence_range'),
    )
    
    def __repr__(self):
        return f"<Prediction(project_id={self.project_id}, delay={self.predicted_delay_months}mo)>"


class RiskDriver(Base):
    """Risk drivers and contributing factors."""
    
    __tablename__ = "risk_drivers"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # Driver details
    driver_type = Column(String(128), nullable=False, index=True)  # RIGHT_OF_WAY, CLEARANCES, FUNDING, etc.
    driver_name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    
    # Impact
    impact_level = Column(String(32), nullable=False)  # LOW, MEDIUM, HIGH, CRITICAL
    impact_score = Column(Integer, nullable=True)  # 0-100
    
    # Status
    is_active = Column(Boolean, default=True, nullable=False)
    is_primary = Column(Boolean, default=False)
    
    # Mitigation
    mitigation_plan = Column(Text, nullable=True)
    mitigation_status = Column(String(32), nullable=True)
    
    # Timestamps
    identified_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    project = relationship("Project", back_populates="risk_drivers")
    
    __table_args__ = (
        Index('idx_driver_project_type', 'project_id', 'driver_type'),
        Index('idx_driver_active', 'is_active'),
        CheckConstraint('impact_score IS NULL OR (impact_score >= 0 AND impact_score <= 100)', name='check_impact_score_range'),
    )
    
    def __repr__(self):
        return f"<RiskDriver(project_id={self.project_id}, type={self.driver_type})>"


class EarlyWarning(Base):
    """Early warning system alerts."""
    
    __tablename__ = "early_warnings"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # Alert details
    warning_type = Column(String(64), nullable=False, index=True)  # DELAY, COST_OVERRUN, QUALITY, SAFETY
    severity = Column(String(32), nullable=False, index=True)  # LOW, MEDIUM, HIGH, CRITICAL
    title = Column(String(500), nullable=False)
    description = Column(Text, nullable=False)
    
    # Triggers
    trigger_condition = Column(Text, nullable=True)
    threshold_value = Column(Float, nullable=True)
    actual_value = Column(Float, nullable=True)
    
    # Status
    status = Column(String(32), nullable=False, default="ACTIVE")  # ACTIVE, ACKNOWLEDGED, RESOLVED, DISMISSED
    acknowledged_by = Column(String(255), nullable=True)
    acknowledged_at = Column(DateTime, nullable=True)
    
    # Resolution
    resolution_notes = Column(Text, nullable=True)
    resolved_by = Column(String(255), nullable=True)
    resolved_at = Column(DateTime, nullable=True)
    
    # Timestamps
    triggered_at = Column(DateTime, nullable=False, default=datetime.utcnow, index=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    project = relationship("Project", back_populates="early_warnings")
    
    __table_args__ = (
        Index('idx_warning_project_date', 'project_id', 'triggered_at'),
        Index('idx_warning_status', 'status'),
        Index('idx_warning_severity', 'severity'),
    )
    
    def __repr__(self):
        return f"<EarlyWarning(project_id={self.project_id}, type={self.warning_type})>"


class PeerBenchmark(Base):
    """Peer benchmarking comparisons."""
    
    __tablename__ = "peer_benchmarks"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # Benchmark metrics
    metric_name = Column(String(128), nullable=False, index=True)
    project_value = Column(Float, nullable=False)
    peer_average = Column(Float, nullable=False)
    peer_median = Column(Float, nullable=False)
    peer_percentile = Column(Integer, nullable=True)  # 0-100
    
    # Peer group
    peer_group_criteria = Column(Text, nullable=True)  # JSON of filter criteria
    peer_group_size = Column(Integer, nullable=True)
    
    # Timestamps
    calculated_at = Column(DateTime, nullable=False, default=datetime.utcnow, index=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    # Relationships
    project = relationship("Project", back_populates="benchmarks")
    
    __table_args__ = (
        Index('idx_benchmark_project_metric', 'project_id', 'metric_name'),
        CheckConstraint('peer_percentile IS NULL OR (peer_percentile >= 0 AND peer_percentile <= 100)', name='check_percentile_range'),
    )
    
    def __repr__(self):
        return f"<PeerBenchmark(project_id={self.project_id}, metric={self.metric_name})>"
