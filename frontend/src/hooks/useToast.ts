import { useToastStore } from '../store/toastStore';

export const useToast = () => {
  const { showToast } = useToastStore();
  return {
    toast: showToast,
    success: (title: string, description?: string) => showToast({ title, description, type: 'success' }),
    error: (title: string, description?: string) => showToast({ title, description, type: 'error' }),
    warning: (title: string, description?: string) => showToast({ title, description, type: 'warning' }),
    info: (title: string, description?: string) => showToast({ title, description, type: 'info' }),
  };
};
