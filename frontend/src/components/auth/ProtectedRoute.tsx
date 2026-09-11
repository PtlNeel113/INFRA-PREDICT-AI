import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Skeleton } from '../ui/Skeleton';
import { Permission, UserRole, roleHasPermission, ROLE_DEFINITIONS } from '../../config/roles';
import { ShieldAlert, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: Permission;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  allowedRoles,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--neo-bg,#EEF2F6)] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[var(--neo-surface,#F1F5F9)] p-8 rounded-[20px] shadow-[6px_6px_16px_rgba(166,180,200,0.35),-6px_-6px_16px_rgba(255,255,255,0.9)] border border-white/80 space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Force profile setup completion if user hasn't completed it
  if (user && !user.isProfileComplete && location.pathname !== '/profile-setup') {
    return <Navigate to="/profile-setup" replace />;
  }

  // Operational role is locked for this session. Prevent returning to profile-setup once completed
  if (user && user.isProfileComplete && location.pathname === '/profile-setup') {
    return <Navigate to="/dashboard" replace />;
  }

  // Check RBAC permission if required
  if (user && requiredPermission) {
    const hasPerm = roleHasPermission(user.role, requiredPermission);
    if (!hasPerm) {
      return (
        <AccessDeniedView
          currentRole={user.role}
          requiredPermission={requiredPermission}
          onReturn={() => navigate(user.roleDetails?.defaultRoute || '/dashboard')}
        />
      );
    }
  }

  // Check role whitelist if specified
  if (user && allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      return (
        <AccessDeniedView
          currentRole={user.role}
          allowedRoles={allowedRoles}
          onReturn={() => navigate(user.roleDetails?.defaultRoute || '/dashboard')}
        />
      );
    }
  }

  return <>{children}</>;
};

interface AccessDeniedProps {
  currentRole: UserRole;
  requiredPermission?: Permission;
  allowedRoles?: UserRole[];
  onReturn: () => void;
}

const AccessDeniedView: React.FC<AccessDeniedProps> = ({
  currentRole,
  requiredPermission,
  allowedRoles,
  onReturn,
}) => {
  const roleDef = ROLE_DEFINITIONS[currentRole];

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-[var(--neo-bg,#EEF2F6)]">
      <div className="max-w-lg w-full bg-[var(--neo-surface,#F1F5F9)] p-8 rounded-[24px] border border-red-200/80 shadow-[8px_8px_20px_rgba(166,180,200,0.35),-8px_-8px_20px_rgba(255,255,255,0.95)] text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 text-red-600 flex items-center justify-center mx-auto shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-800 border border-red-200 mb-2">
            HTTP 403 • Access Denied
          </span>
          <h2 className="text-2xl font-black text-[var(--neo-text-primary,#0F172A)] tracking-tight">
            Unauthorized View Access
          </h2>
          <p className="text-sm text-[var(--neo-text-secondary,#475569)] mt-2">
            In accordance with Government RBAC policy, this view is restricted.
          </p>
        </div>

        <div className="bg-[var(--neo-surface-inset,#E5EBF2)] p-4 rounded-xl text-xs text-left space-y-1.5 border border-[rgba(200,212,226,0.6)] font-mono">
          <div className="flex justify-between">
            <span className="text-[var(--neo-text-secondary,#475569)]">Active Role:</span>
            <span className="font-bold text-[#1557D6]">{currentRole}</span>
          </div>
          {requiredPermission && (
            <div className="flex justify-between">
              <span className="text-[var(--neo-text-secondary,#475569)]">Required Permission:</span>
              <span className="font-bold text-red-600">{requiredPermission}</span>
            </div>
          )}
          {allowedRoles && (
            <div className="flex justify-between">
              <span className="text-[var(--neo-text-secondary,#475569)]">Allowed Roles:</span>
              <span className="font-bold text-slate-800">{allowedRoles.join(', ')}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-[var(--neo-text-secondary,#475569)]">Authorized Scope:</span>
            <span className="font-bold text-slate-700">{roleDef.scope}</span>
          </div>
        </div>

        <div className="pt-2">
          <Button
            variant="primary"
            onClick={onReturn}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="w-full py-2.5 rounded-xl"
          >
            Return to Authorized Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};
