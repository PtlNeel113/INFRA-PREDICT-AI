"""
FastAPI dependency injection utilities.
"""
from typing import Generator
from sqlalchemy.orm import Session

from ..db.session import SessionLocal


def get_db() -> Generator[Session, None, None]:
    """
    Database session dependency.
    
    Yields:
        Database session that is automatically closed after use.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
