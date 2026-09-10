"""
External API synchronization endpoints.
"""
from fastapi import APIRouter, HTTPException, status

from ...core.logging import get_logger
from ...services.sync_service import get_paimana_sync_status, sync_with_paimana
from ...core.exceptions import ExternalServiceException

logger = get_logger(__name__)
router = APIRouter()


@router.get("/status", summary="Get PAIMANA sync status")
def sync_status():
    """
    Get PAIMANA API connector status and configuration.
    
    Returns honest status without pretending to be live if not configured.
    """
    try:
        status_data = get_paimana_sync_status()
        logger.info("Sync status retrieved", extra={"status": status_data["status"]})
        return status_data
    except Exception as e:
        logger.error(f"Failed to get sync status: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve sync status"
        )


@router.post("/trigger", summary="Trigger PAIMANA sync")
async def trigger_sync(force: bool = False):
    """
    Trigger synchronization with PAIMANA central API.
    
    Args:
        force: Force immediate sync even if not scheduled
    
    Returns:
        Sync result summary
    """
    try:
        result = await sync_with_paimana(force=force)
        logger.info("Sync triggered", extra={"force": force})
        return result
    except ExternalServiceException as e:
        logger.error(f"Sync failed: {e.message}", extra=e.details)
        raise HTTPException(
            status_code=e.status_code,
            detail=e.message
        )
    except Exception as e:
        logger.exception("Unexpected error during sync")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Sync failed: {str(e)}"
        )
