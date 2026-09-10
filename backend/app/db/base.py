"""
Database base class and model imports.
"""
from sqlalchemy.orm import declarative_base

# Create declarative base for SQLAlchemy models
Base = declarative_base()

# Import all models here for Alembic migrations discovery
# from app.db.models import ingestion, telemetry  # Will be populated as we create models
