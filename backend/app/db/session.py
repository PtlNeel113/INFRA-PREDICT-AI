"""
Database session management.
"""
from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import Pool

from ..core.config import settings
from ..core.logging import get_logger

logger = get_logger(__name__)

# Create database engine with configuration
engine_kwargs = {
    "echo": settings.DB_ECHO,
    "connect_args": settings.database_connect_args,
}

# Add connection pooling for non-SQLite databases
if not settings.DATABASE_URL.startswith("sqlite"):
    engine_kwargs.update({
        "pool_size": settings.DB_POOL_SIZE,
        "max_overflow": settings.DB_MAX_OVERFLOW,
        "pool_pre_ping": True,  # Verify connections before using
    })

engine = create_engine(settings.DATABASE_URL, **engine_kwargs)


# Connection event listeners for logging
@event.listens_for(Pool, "connect")
def receive_connect(dbapi_conn, connection_record):
    """Log when database connection is established."""
    logger.debug("Database connection established")


@event.listens_for(Pool, "checkout")
def receive_checkout(dbapi_conn, connection_record, connection_proxy):
    """Log when connection is checked out from pool."""
    logger.debug("Database connection checked out from pool")


# Create session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


def get_session():
    """Get a database session."""
    return SessionLocal()
