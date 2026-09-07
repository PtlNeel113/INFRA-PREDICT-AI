import { create } from 'zustand';
import { AuthState, UserProfile } from '../types/auth';
import { DEMO_USER_PROFILE } from '../data/constants';

interface AuthActions {
  login: (email: string, remember: boolean) => Promise<UserProfile>;
  loginAsDemo: () => Promise<UserProfile>;
  updateProfile: (data: Partial<UserProfile>) => void;
  logout: () => void;
  initialize: () => void;
}

const STORAGE_KEY_AUTH = 'infra_predict_auth_user';
const STORAGE_KEY_REMEMBER = 'infra_predict_remember_me';

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
        set({
          user: JSON.parse(savedUser),
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

  login: async (email: string, remember: boolean) => {
    const savedUser = localStorage.getItem(STORAGE_KEY_AUTH);
    let profile: UserProfile;

    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      profile = {
        ...parsed,
        email,
        lastLoginAt: new Date().toISOString(),
      };
    } else {
      const formattedName = email
        .split('@')[0]
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

      profile = {
        id: `usr_${Math.random().toString(36).substring(2, 8)}`,
        fullName: formattedName || 'Monitoring Officer',
        email,
        organization: 'Infrastructure Monitoring',
        role: 'Monitoring Officer',
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

    return profile;
  },

  loginAsDemo: async () => {
    const profile: UserProfile = {
      ...DEMO_USER_PROFILE,
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

    return profile;
  },

  updateProfile: (data: Partial<UserProfile>) => {
    const current = get().user;
    if (!current) return;

    const updated: UserProfile = {
      ...current,
      ...data,
      isProfileComplete: true,
    };

    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(updated));
    set({ user: updated });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY_AUTH);
    localStorage.removeItem(STORAGE_KEY_REMEMBER);
    set({ user: null, isAuthenticated: false });
  },
}));
