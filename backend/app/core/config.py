"""
Application configuration management with environment variable support.
"""
import os
from typing import Optional, List
from pydantic_settings import BaseSettings
from pydantic import Field, validator


class Settings(BaseSettings):
    """Application settings with environment variable loading."""
    
    # Application
    APP_NAME: str = "INFRA-PREDICT-AI"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = Field(default="development", env="ENVIRONMENT")
    DEBUG: bool = Field(default=False, env="DEBUG")
    
    # API Configuration
    API_V1_PREFIX: str = "/api"
    API_TITLE: str = "INFRA-PREDICT-AI API"
    API_DESCRIPTION: str = "Government-grade infrastructure telemetry and predictive analytics platform"
    
    # Security
    SECRET_KEY: str = Field(default="change-this-in-production-use-strong-secret-key", env="SECRET_KEY")
    CORS_ORIGINS: List[str] = Field(default=["*"], env="CORS_ORIGINS")
    ALLOWED_HOSTS: List[str] = Field(default=["*"], env="ALLOWED_HOSTS")
    
    # Database
    DATABASE_URL: str = Field(default="sqlite:///./database/infra_telemetry.db", env="DATABASE_URL")
    DB_ECHO: bool = Field(default=False, env="DB_ECHO")
    DB_POOL_SIZE: int = Field(default=5, env="DB_POOL_SIZE")
    DB_MAX_OVERFLOW: int = Field(default=10, env="DB_MAX_OVERFLOW")
    
    # Redis (for caching and task queue)
    REDIS_URL: Optional[str] = Field(default=None, env="REDIS_URL")
    REDIS_ENABLED: bool = Field(default=False, env="REDIS_ENABLED")
    
    # External API Integration
    PAIMANA_API_ENDPOINT: Optional[str] = Field(default=None, env="PAIMANA_API_ENDPOINT")
    PAIMANA_API_KEY: Optional[str] = Field(default=None, env="PAIMANA_API_KEY")
    PAIMANA_SYNC_ENABLED: bool = Field(default=False, env="PAIMANA_SYNC_ENABLED")
    
    # File Upload
    MAX_UPLOAD_SIZE: int = Field(default=50 * 1024 * 1024, env="MAX_UPLOAD_SIZE")  # 50MB
    ALLOWED_EXTENSIONS: List[str] = Field(default=["csv", "xlsx", "xls", "json"], env="ALLOWED_EXTENSIONS")
    UPLOAD_DIR: str = Field(default="./data/uploads", env="UPLOAD_DIR")
    
    # Logging
    LOG_LEVEL: str = Field(default="INFO", env="LOG_LEVEL")
    LOG_FORMAT: str = Field(default="json", env="LOG_FORMAT")  # json or text
    LOG_FILE: Optional[str] = Field(default=None, env="LOG_FILE")
    
    # Machine Learning
    ML_MODEL_DIR: str = Field(default="./models", env="ML_MODEL_DIR")
    ML_CACHE_PREDICTIONS: bool = Field(default=True, env="ML_CACHE_PREDICTIONS")
    
    # Workers
    CELERY_BROKER_URL: Optional[str] = Field(default=None, env="CELERY_BROKER_URL")
    CELERY_RESULT_BACKEND: Optional[str] = Field(default=None, env="CELERY_RESULT_BACKEND")
    
    # Request Handling
    REQUEST_TIMEOUT: int = Field(default=30, env="REQUEST_TIMEOUT")
    RATE_LIMIT_ENABLED: bool = Field(default=True, env="RATE_LIMIT_ENABLED")
    RATE_LIMIT_PER_MINUTE: int = Field(default=60, env="RATE_LIMIT_PER_MINUTE")
    
    # Monitoring
    ENABLE_METRICS: bool = Field(default=True, env="ENABLE_METRICS")
    SENTRY_DSN: Optional[str] = Field(default=None, env="SENTRY_DSN")
    
    @validator("CORS_ORIGINS", pre=True)
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",")]
        return v
    
    @validator("ALLOWED_EXTENSIONS", pre=True)
    def parse_allowed_extensions(cls, v):
        if isinstance(v, str):
            return [ext.strip() for ext in v.split(",")]
        return v
    
    @property
    def is_production(self) -> bool:
        """Check if running in production environment."""
        return self.ENVIRONMENT.lower() in ["production", "prod"]
    
    @property
    def is_development(self) -> bool:
        """Check if running in development environment."""
        return self.ENVIRONMENT.lower() in ["development", "dev"]
    
    @property
    def database_connect_args(self) -> dict:
        """Get database connection arguments based on DB type."""
        if self.DATABASE_URL.startswith("sqlite"):
            return {"check_same_thread": False}
        return {}
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


# Global settings instance
settings = Settings()
