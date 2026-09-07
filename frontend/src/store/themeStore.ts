import { create } from 'zustand';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  // Initialize theme from localStorage or system preference
  const savedTheme = localStorage.getItem('infra_predict_theme');
  const initialDark = savedTheme === 'dark';

  if (initialDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return {
    isDarkMode: initialDark,
    toggleTheme: () => {
      set((state) => {
        const newDark = !state.isDarkMode;
        if (newDark) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('infra_predict_theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('infra_predict_theme', 'light');
        }
        return { isDarkMode: newDark };
      });
    },
    setTheme: (isDark: boolean) => {
      if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('infra_predict_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('infra_predict_theme', 'light');
      }
      set({ isDarkMode: isDark });
    },
  };
});
