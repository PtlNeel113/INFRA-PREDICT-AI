"""
Role-Based Access Control (RBAC) System for INFRA-PREDICT-AI Backend.
Defines authoritative enterprise roles, granular permissions, and authorization dependencies.

Note: Official PAIMANA historical records (April–July 2026) are strictly read-only.
"""

from enum import Enum
from typing import List, Optional
from fastapi import Header, HTTPException, status, Depends


class UserRole(str, Enum):
    SENIOR_DECISION_MAKER = "Senior Decision Maker"
    PROJECT_MANAGER = "Project Manager"
    MONITORING_OFFICER = "Monitoring Officer"
    MINISTRY_DEPARTMENT = "Ministry / Department"
    AUDITOR_VIEWER = "Auditor / Viewer"
    ADMINISTRATOR = "Administrator"


class Permission(str, Enum):
    VIEW_DASHBOARD = "view:dashboard"
    VIEW_PROJECTS = "view:projects"
    VIEW_ALERTS = "view:alerts"
    VIEW_PREDICTIONS = "view:predictions"
    VIEW_EXPLAINABILITY = "view:explainability"
    VIEW_AUDIT_TRAIL = "view:audit_trail"
    VIEW_SETTINGS = "view:settings"
    EDIT_PROJECT_NOTES = "edit:project_notes"
    EDIT_MILESTONES = "edit:milestones"
    INGEST_DATA = "ingest:data"
    MANAGE_USERS = "manage:users"
    EXPORT_AUDIT_PACK = "export:audit_pack"


ROLE_PERMISSIONS: dict[str, List[Permission]] = {
    UserRole.SENIOR_DECISION_MAKER.value: [
        Permission.VIEW_DASHBOARD,
        Permission.VIEW_PROJECTS,
        Permission.VIEW_ALERTS,
        Permission.VIEW_PREDICTIONS,
        Permission.VIEW_EXPLAINABILITY,
        Permission.VIEW_SETTINGS,
    ],
    UserRole.PROJECT_MANAGER.value: [
        Permission.VIEW_DASHBOARD,
        Permission.VIEW_PROJECTS,
        Permission.VIEW_ALERTS,
        Permission.VIEW_PREDICTIONS,
        Permission.VIEW_EXPLAINABILITY,
        Permission.VIEW_SETTINGS,
        Permission.EDIT_PROJECT_NOTES,
        Permission.EDIT_MILESTONES,
    ],
    UserRole.MONITORING_OFFICER.value: [
        Permission.VIEW_DASHBOARD,
        Permission.VIEW_PROJECTS,
        Permission.VIEW_ALERTS,
        Permission.VIEW_PREDICTIONS,
        Permission.VIEW_EXPLAINABILITY,
        Permission.VIEW_AUDIT_TRAIL,
        Permission.VIEW_SETTINGS,
    ],
    UserRole.MINISTRY_DEPARTMENT.value: [
        Permission.VIEW_DASHBOARD,
        Permission.VIEW_PROJECTS,
        Permission.VIEW_ALERTS,
        Permission.VIEW_PREDICTIONS,
        Permission.VIEW_EXPLAINABILITY,
        Permission.VIEW_SETTINGS,
    ],
    UserRole.AUDITOR_VIEWER.value: [
        Permission.VIEW_DASHBOARD,
        Permission.VIEW_PROJECTS,
        Permission.VIEW_ALERTS,
        Permission.VIEW_EXPLAINABILITY,
        Permission.VIEW_AUDIT_TRAIL,
        Permission.EXPORT_AUDIT_PACK,
    ],
    UserRole.ADMINISTRATOR.value: [
        Permission.VIEW_DASHBOARD,
        Permission.VIEW_PROJECTS,
        Permission.VIEW_ALERTS,
        Permission.VIEW_PREDICTIONS,
        Permission.VIEW_EXPLAINABILITY,
        Permission.VIEW_AUDIT_TRAIL,
        Permission.VIEW_SETTINGS,
        Permission.INGEST_DATA,
        Permission.MANAGE_USERS,
        Permission.EXPORT_AUDIT_PACK,
        Permission.EDIT_PROJECT_NOTES,
        Permission.EDIT_MILESTONES,
    ],
}


def get_current_role(x_user_role: Optional[str] = Header(None, alias="X-User-Role")) -> str:
    """Extract and validate the active user role from request header."""
    if not x_user_role:
        return UserRole.SENIOR_DECISION_MAKER.value

    valid_roles = [r.value for r in UserRole]
    if x_user_role not in valid_roles:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid X-User-Role '{x_user_role}'. Must be one of: {valid_roles}",
        )
    return x_user_role


def require_permission(required_permission: Permission):
    """FastAPI dependency to enforce granular RBAC permissions."""
    def dependency(role: str = Depends(get_current_role)):
        # Check if role has the requested permission
        role_perms = ROLE_PERMISSIONS.get(role, [])
        if required_permission not in role_perms:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=(
                    f"Access Denied: Role '{role}' lacks permission '{required_permission.value}'. "
                    "Operation prohibited by Government RBAC policy."
                ),
            )
        return role
    return dependency


def require_role(allowed_roles: List[UserRole]):
    """FastAPI dependency to enforce role whitelist."""
    allowed_values = [r.value for r in allowed_roles]

    def dependency(role: str = Depends(get_current_role)):
        if role not in allowed_values:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access Denied: Active role '{role}' is not in allowed roles: {allowed_values}",
            )
        return role
    return dependency
