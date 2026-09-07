export type UserRole =
  | 'Monitoring Officer'
  | 'Ministry / Department'
  | 'Project Manager'
  | 'Senior Decision Maker'
  | 'Auditor / Viewer'
  | 'Administrator';

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
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  rememberMe: boolean;
}
