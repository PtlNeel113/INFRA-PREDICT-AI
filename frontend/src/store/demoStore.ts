import { create } from 'zustand';

interface DemoState {
  isDemoMode: boolean;
  isDecisionMode: boolean;
  demoCycle: string;
  toggleDemoMode: () => void;
  toggleDecisionMode: () => void;
  setDecisionMode: (active: boolean) => void;
  resetDemoData: () => void;
}

export const useDemoStore = create<DemoState>((set) => ({
  isDemoMode: true,
  isDecisionMode: false,
  demoCycle: 'FY2026-27 Q1 (Demo Baseline)',
  toggleDemoMode: () => set((state) => ({ isDemoMode: !state.isDemoMode })),
  toggleDecisionMode: () => set((state) => ({ isDecisionMode: !state.isDecisionMode })),
  setDecisionMode: (active: boolean) => set({ isDecisionMode: active }),
  resetDemoData: () => {
    localStorage.removeItem('paimana_custom_filters');
    localStorage.removeItem('paimana_data_uploads');
    set({ isDecisionMode: false });
  },
}));
