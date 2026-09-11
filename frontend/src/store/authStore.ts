import { create } from 'zustand';
import { AuthState, UserProfile } from '../types/auth';
import { DEMO_USER_PROFILE } from '../data/constants';
import { UserRole, Permission, ROLE_DEFINITIONS, roleHasPermission } from '../config/roles';

interface AuthActions {
  login: (email: string, remember: boolean) => Promise<UserProfile>;
  loginAsDemo: () => Promise<UserProfile>;
  updateProfile: (data: Partial<UserProfile>) => void;
  setRole: (role: UserRole) => void;
  hasPermission: (permission: Permission) => boolean;
  logout: () => void;
  initialize: () => void;
}

const STORAGE_KEY_AUTH = 'infra_predict_auth_user';
const STORAGE_KEY_REMEMBER = 'infra_predict_remember_me';
const STORAGE_KEY_AUDIT = 'infra_predict_local_audit_logs';

/**
 * Helper to record audit events into isolated store
 */
export const recordAuditEvent = (event: {
  action: string;
  category: 'AUTH' | 'ROLE_CHANGE' | 'INGEST' | 'MUTATION' | 'EXPORT' | 'SECURITY';
  details: string;
  userId?: string;
  role?: string;
}) => {
  try {
    const timestamp = new Date().toISOString();
    const entry = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp,
      ...event,
    };

    // Save to local isolated audit store
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_AUDIT) || '[]');
    existing.unshift(entry);
    if (existing.length > 500) existing.length = 500;
    localStorage.setItem(STORAGE_KEY_AUDIT, JSON.stringify(existing));

    // Also fire background telemetry to server if available
    fetch('/api/audit-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    }).catch(() => {
      // Ignore background fetch failure in offline/standalone mode
    });
  } catch {
    // Ignore storage issues
  }
};

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  rememberMe: false,

  initialize: () => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_AUTH);
      const remember = localStorage.getItem(STORAGE_KEY_REMEMBER) === 'true';

      if (savedUser) {
        const parsed = JSON.parse(savedUser) as UserProfile;
        const role = parsed.role || 'Senior Decision Maker';
        const roleDef = ROLE_DEFINITIONS[role] || ROLE_DEFINITIONS['Senior Decision Maker'];
        
        const enriched: UserProfile = {
          ...parsed,
          role,
          roleDetails: roleDef,
          permissions: roleDef.permissions,
        };

        set({
          user: enriched,
          isAuthenticated: true,
          rememberMe: remember,
          isLoading: false,
        });
      } else {
        set({ isLoading: false, isAuthenticated: false, user: null });
      }
    } catch {
      set({ isLoading: false, isAuthenticated: false, user: null });
    }
  },

  hasPermission: (permission: Permission): boolean => {
    const user = get().user;
    if (!user || !user.role) return false;
    return roleHasPermission(user.role, permission);
  },

  setRole: (role: UserRole) => {
    const current = get().user;
    if (current && current.isProfileComplete) {
      console.warn(
        `[Security] Operational role is locked as '${current.role}' for this session. Role switching from inside the dashboard is prohibited. To switch role, please log out.`
      );
      return;
    }

    const base = current || {
      ...DEMO_USER_PROFILE,
      id: `usr_${Math.random().toString(36).substring(2, 8)}`,
      lastLoginAt: new Date().toISOString(),
    };

    const roleDef = ROLE_DEFINITIONS[role] || ROLE_DEFINITIONS['Senior Decision Maker'];
    const updated: UserProfile = {
      ...base,
      role,
      roleDetails: roleDef,
      permissions: roleDef.permissions,
      isProfileComplete: false,
    };

    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(updated));
    set({ user: updated, isAuthenticated: true });
  },

  login: async (email: string, remember: boolean) => {
    const savedUser = localStorage.getItem(STORAGE_KEY_AUTH);
    let profile: UserProfile;

    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      const role = parsed.role || 'Senior Decision Maker';
      const roleDef = ROLE_DEFINITIONS[role] || ROLE_DEFINITIONS['Senior Decision Maker'];
      profile = {
        ...parsed,
        email,
        role,
        roleDetails: roleDef,
        permissions: roleDef.permissions,
        lastLoginAt: new Date().toISOString(),
      };
    } else {
      const formattedName = email
        .split('@')[0]
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

      const defaultRole: UserRole = 'Senior Decision Maker';
      const roleDef = ROLE_DEFINITIONS[defaultRole];

      profile = {
        id: `usr_${Math.random().toString(36).substring(2, 8)}`,
        fullName: formattedName || 'Infrastructure Officer',
        email,
        organization: 'National Infrastructure Pipeline / MoSPI',
        role: defaultRole,
        roleDetails: roleDef,
        permissions: roleDef.permissions,
        stateRegion: 'National / All India',
        preferredSectors: ['Roads & Highways (MoRTH)'],
        isProfileComplete: false,
        lastLoginAt: new Date().toISOString(),
      };
    }

    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(profile));
    localStorage.setItem(STORAGE_KEY_REMEMBER, String(remember));

    set({
      user: profile,
      isAuthenticated: true,
      rememberMe: remember,
      isLoading: false,
    });

    recordAuditEvent({
      action: 'USER_LOGIN',
      category: 'AUTH',
      details: `User ${email} signed in successfully with role ${profile.role}`,
      userId: profile.id,
      role: profile.role,
    });

    return profile;
  },

  loginAsDemo: async () => {
    const defaultRole: UserRole = 'Senior Decision Maker';
    const roleDef = ROLE_DEFINITIONS[defaultRole];
    
    const profile: UserProfile = {
      ...DEMO_USER_PROFILE,
      role: defaultRole,
      roleDetails: roleDef,
      permissions: roleDef.permissions,
      isProfileComplete: false, // Fresh session requires selecting an operational role
      lastLoginAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(profile));
    localStorage.setItem(STORAGE_KEY_REMEMBER, 'true');

    set({
      user: profile,
      isAuthenticated: true,
      rememberMe: true,
      isLoading: false,
    });

    recordAuditEvent({
      action: 'DEMO_LOGIN',
      category: 'AUTH',
      details: 'Demo session initiated. Pending operational role selection.',
      userId: profile.id,
      role: profile.role,
    });

    return profile;
  },

  updateProfile: (data: Partial<UserProfile>) => {
    const current = get().user || {
      ...DEMO_USER_PROFILE,
      id: `usr_${Math.random().toString(36).substring(2, 8)}`,
      lastLoginAt: new Date().toISOString(),
    };

    // If profile was already complete, role is locked and cannot be changed from within the dashboard
    const isAlreadyLocked = Boolean(current.isProfileComplete);
    const resolvedRole = isAlreadyLocked
      ? current.role
      : (data.role || current.role || 'Senior Decision Maker');

    const roleDef = ROLE_DEFINITIONS[resolvedRole] || ROLE_DEFINITIONS['Senior Decision Maker'];

    const updated: UserProfile = {
      ...current,
      ...data,
      role: resolvedRole,
      roleDetails: roleDef,
      permissions: roleDef.permissions,
      isProfileComplete: true, // Locked for the remainder of this session
    };

    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(updated));
    set({ user: updated, isAuthenticated: true });

    recordAuditEvent({
      action: isAlreadyLocked ? 'PROFILE_UPDATED' : 'ROLE_LOCKED_FOR_SESSION',
      category: 'ROLE_CHANGE',
      details: isAlreadyLocked
        ? `Profile metadata updated for session-locked role: ${resolvedRole}`
        : `Operational role selected and locked as '${resolvedRole}' for this session`,
      userId: updated.id,
      role: resolvedRole,
    });
  },

  logout: () => {
    const user = get().user;
    if (user) {
      recordAuditEvent({
        action: 'USER_LOGOUT',
        category: 'AUTH',
        details: `User ${user.email} signed out`,
        userId: user.id,
        role: user.role,
      });
    }
    localStorage.removeItem(STORAGE_KEY_AUTH);
    localStorage.removeItem(STORAGE_KEY_REMEMBER);
    set({ user: null, isAuthenticated: false });
  },
}));
