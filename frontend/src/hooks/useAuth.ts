import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const store = useAuthStore();
  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    rememberMe: store.rememberMe,
    login: store.login,
    loginAsDemo: store.loginAsDemo,
    updateProfile: store.updateProfile,
    logout: store.logout,
  };
};
