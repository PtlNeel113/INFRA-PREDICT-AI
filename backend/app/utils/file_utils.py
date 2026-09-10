"""
File handling utilities.
"""
import os
from pathlib import Path
from typing import List

from ..core.config import settings
from ..core.logging import get_logger

logger = get_logger(__name__)


def validate_file_extension(filename: str, allowed_extensions: List[str] = None) -> bool:
    """
    Validate file extension against allowed list.
    
    Args:
        filename: File name to validate
        allowed_extensions: List of allowed extensions (without dot)
    
    Returns:
        True if extension is allowed
    """
    if allowed_extensions is None:
        allowed_extensions = settings.ALLOWED_EXTENSIONS
    
    ext = filename.split(".")[-1].lower() if "." in filename else ""
    return ext in allowed_extensions


def get_file_size_mb(file_bytes: bytes) -> float:
    """
    Get file size in megabytes.
    
    Args:
        file_bytes: File content as bytes
    
    Returns:
        File size in MB
    """
    return len(file_bytes) / (1024 * 1024)


def validate_file_size(file_bytes: bytes, max_size: int = None) -> bool:
    """
    Validate file size against maximum.
    
    Args:
        file_bytes: File content
        max_size: Maximum size in bytes
    
    Returns:
        True if size is within limit
    """
    if max_size is None:
        max_size = settings.MAX_UPLOAD_SIZE
    
    return len(file_bytes) <= max_size


def ensure_upload_dir() -> Path:
    """
    Ensure upload directory exists.
    
    Returns:
        Path to upload directory
    """
    upload_dir = Path(settings.UPLOAD_DIR)
    upload_dir.mkdir(parents=True, exist_ok=True)
    return upload_dir


def sanitize_filename(filename: str) -> str:
    """
    Sanitize filename to prevent directory traversal attacks.
    
    Args:
        filename: Original filename
    
    Returns:
        Sanitized filename
    """
    # Remove path components
    filename = os.path.basename(filename)
    
    # Remove any remaining path separators
    filename = filename.replace("/", "_").replace("\\", "_")
    
    # Remove potentially dangerous characters
    dangerous_chars = ["<", ">", ":", '"', "|", "?", "*"]
    for char in dangerous_chars:
        filename = filename.replace(char, "_")
    
    return filename
