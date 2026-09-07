export type NotificationType =
  | 'CRITICAL_RISK'
  | 'PREDICTION_CHANGED'
  | 'MILESTONE_DELAY'
  | 'REPORT_READY'
  | 'DATA_UPDATE';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  projectCode?: string;
  projectId?: string;
  isRead: boolean;
  link?: string;
  badgeLabel?: string;
}
