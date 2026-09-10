"""
User and authentication models.
"""
from datetime import datetime
from sqlalchemy import (
    Column, String, Integer, DateTime, Boolean, Text, ForeignKey,
    Index, UniqueConstraint
)
from sqlalchemy.orm import relationship

from ..base import Base


class User(Base):
    """User accounts and authentication."""
    
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    
    # Authentication
    username = Column(String(255), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=True)  # Nullable for SSO users
    
    # Profile
    full_name = Column(String(255), nullable=False)
    department = Column(String(255), nullable=True)
    designation = Column(String(255), nullable=True)
    organization = Column(String(255), nullable=True)
    
    # Authorization
    role = Column(String(64), nullable=False, default="VIEWER")  # ADMIN, MANAGER, ANALYST, VIEWER
    permissions = Column(Text, nullable=True)  # JSON array of permissions
    
    # Status
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False)
    
    # Audit
    last_login_at = Column(DateTime, nullable=True)
    failed_login_attempts = Column(Integer, default=0)
    locked_until = Column(DateTime, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    ingestion_jobs = relationship("IngestionJob", back_populates="user")
    audit_logs = relationship("AuditLog", back_populates="user")
    
    __table_args__ = (
        Index('idx_user_active', 'is_active'),
        Index('idx_user_role', 'role'),
    )
    
    def __repr__(self):
        return f"<User(username={self.username}, role={self.role})>"


class AuditLog(Base):
    """Audit trail for all system actions."""
    
    __tablename__ = "audit_logs"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    
    # Actor
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    user_name = Column(String(255), nullable=True)  # Cached for performance
    ip_address = Column(String(45), nullable=True)  # IPv6 support
    user_agent = Column(String(500), nullable=True)
    
    # Action
    action = Column(String(128), nullable=False, index=True)  # CREATE, UPDATE, DELETE, VIEW, EXPORT, etc.
    resource_type = Column(String(128), nullable=False, index=True)  # PROJECT, USER, INGESTION_JOB, etc.
    resource_id = Column(String(255), nullable=True, index=True)
    
    # Details
    description = Column(Text, nullable=True)
    changes = Column(Text, nullable=True)  # JSON of before/after values
    
    # Context
    request_id = Column(String(64), nullable=True, index=True)
    session_id = Column(String(64), nullable=True)
    
    # Status
    status = Column(String(32), nullable=False, default="SUCCESS")  # SUCCESS, FAILURE, PARTIAL
    error_message = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow, index=True)
    
    # Relationships
    user = relationship("User", back_populates="audit_logs")
    
    __table_args__ = (
        Index('idx_audit_user_action', 'user_id', 'action'),
        Index('idx_audit_resource', 'resource_type', 'resource_id'),
        Index('idx_audit_date', 'created_at'),
    )
    
    def __repr__(self):
        return f"<AuditLog(action={self.action}, resource={self.resource_type})>"
