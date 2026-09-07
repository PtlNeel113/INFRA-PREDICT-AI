import { create } from 'zustand';
import { ToastMessage, ToastType } from '../types/ui';

interface ToastState {
  toasts: ToastMessage[];
  showToast: (toast: { title: string; description?: string; type: ToastType; duration?: number }) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: ({ title, description, type, duration = 4000 }) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, title, description, type, duration }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
