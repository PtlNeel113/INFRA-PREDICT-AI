import { UserRole, Permission, RoleDefinition } from '../config/roles';

export type { UserRole, Permission, RoleDefinition };

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  organization: string;
  role: UserRole;
  stateRegion: string;
  preferredSectors: string[];
  isProfileComplete: boolean;
  avatarUrl?: string;
  lastLoginAt: string;
  permissions?: Permission[];
  roleDetails?: RoleDefinition;
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  rememberMe: boolean;
}
