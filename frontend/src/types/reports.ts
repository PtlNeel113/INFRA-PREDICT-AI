export type ReportType =
  | 'EXECUTIVE_RISK_BRIEF'
  | 'COST_RISK_REPORT'
  | 'SCHEDULE_RISK_REPORT'
  | 'PORTFOLIO_RISK_REPORT';

export interface ReportConfig {
  projectId: string;
  reportType: ReportType;
  dateRange: string;
  includeSHAP: boolean;
  includePeerBenchmarking: boolean;
  includeMitigationRoadmap: boolean;
  securityClassification: 'CONFIDENTIAL' | 'RESTRICTED' | 'INTERNAL_USE_ONLY';
}
