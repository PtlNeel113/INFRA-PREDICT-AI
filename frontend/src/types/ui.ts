export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'STABLE' | 'WATCH';

export type HealthScoreGrade = 'OPTIMAL' | 'MODERATE' | 'NEEDS_ATTENTION' | 'CRITICAL_RISK';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
}
