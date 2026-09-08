import { RiskLevel } from './ui';

export type ProjectStage =
  | 'Planning'
  | 'Pre-Construction'
  | 'Under Construction'
  | 'Testing & Commissioning'
  | 'Near Completion';

export interface Milestone {
  id?: string;
  title: string;
  targetDate: string;
  actualDate?: string;
  revisedDate?: string;
  status: 'COMPLETED' | 'ON_TRACK' | 'DELAYED' | 'CRITICAL';
  delayDays?: number;
  criticalPath?: boolean;
}

export interface ChangeMetric {
  metric: string;
  previous: string | number;
  current: string | number;
  delta: string | number;
  unit?: string;
  isSignificant?: boolean;
  type: 'increase' | 'decrease' | 'neutral';
  impact: 'adverse' | 'favorable' | 'neutral';
}

export interface ChangeIntelligenceCycle {
  previousCycleDate: string;
  currentCycleDate: string;
  summary: string;
  metrics: ChangeMetric[];
  highlightNotes: string[];
}

export interface InfraProject {
  id: string;
  name: string;
  code: string;
  sector: string;
  state: string;
  stage: ProjectStage;
  implementingAgency: string;
  ministry?: string;
  sanctionedCostCr: number; // Approved cost
  revisedCostCr: number; // Current revised cost
  expenditureCr: number; // Actual expenditure to date
  forecastCostCr: number; // AI Forecast final cost
  originalDeadline: string; // Planned completion
  predictedCompletionDate: string; // Forecast completion
  expectedProgress: number; // Expected/Scheduled physical progress %
  currentPhysicalProgress: number; // Actual physical progress %
  progressGap: number; // Expected - Actual
  financialProgress: number; // 0-100%
  healthScore: number; // 0-100
  riskLevel: RiskLevel;
  riskTrend: number; // e.g. +12 (deteriorated) or -4 (improved)
  
  // Specific Core Risk Scores (0-100)
  costRiskScore: number;
  timeRiskScore: number;
  executionRiskScore: number;
  
  predictedDelayMonths: number;
  predictedCostOverrunCr: number;
  primaryRiskDriver: string;
  secondaryRiskDriver?: string;
  priorityScore?: number; // composite formula
  impactScore: number; // 1-100 (for Risk Priority Matrix)
  escalationStatus: 'UNRESOLVED' | 'UNDER_REVIEW' | 'MITIGATION_IN_PROGRESS' | 'RESOLVED';
  
  keyMilestones: Milestone[];
  aiSummary: string;
  changeIntelligence?: ChangeIntelligenceCycle;
  
  // Trajectory history
  riskTrajectory?: {
    date: string;
    score: number;
    forecast?: boolean;
  }[];
  
  // Cost escalation history
  costTrend?: {
    period: string;
    sanctioned: number;
    revised: number;
    expenditure: number;
    forecast: number;
  }[];

  // Additional form inputs & prototype metadata
  startDate?: string;
  district?: string;
  latitude?: number;
  longitude?: number;
  currentIssues?: string;
  delays?: string;
  constraints?: string;
  recommendedActions?: string[];
  isUserCreated?: boolean;
  calculationMethodology?: string;
}

export interface CreateProjectInput {
  name: string;
  code: string;
  ministry: string;
  sector: string;
  state: string;
  district: string;
  latitude?: string | number;
  longitude?: string | number;
  sanctionedCostCr: number;
  expenditureCr: number;
  revisedCostCr?: number;
  physicalProgress: number;
  startDate: string;
  targetDate: string;
  milestones: Array<{ name: string; planned: string; actual?: string }>;
  currentIssues?: string;
  delays?: string;
  constraints?: string;
}


export interface MetricCardData {
  id: string;
  title: string;
  value: string;
  trend: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  sub: string;
  risk?: boolean;
  warning?: boolean;
  success?: boolean;
  info?: boolean;
  filterKey?: string;
}

export interface StateRiskData {
  id: string;
  name: string;
  shortCode: string;
  projectCount: number;
  totalOutlayCr: number;
  avgHealthScore: number;
  riskSeverity: 'STABLE' | 'WATCH' | 'HIGH' | 'CRITICAL';
  criticalProjectsCount: number;
  highRiskProjectsCount: number;
  topRiskDriver: string;
  x: number;
  y: number;
  svgPath?: string;
}

export interface WhatChangedEvent {
  id: string;
  type: 'COST_REVISION' | 'SCHEDULE_SLIPPAGE' | 'MILESTONE_MISSED' | 'PHYSICAL_PROGRESS_LAG' | 'RISK_SCORE_CHANGED';
  title: string;
  projectCode: string;
  projectName: string;
  state: string;
  timestamp: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
  deltaText: string;
  details: string;
}

export interface TrajectoryPoint {
  cycle: string;
  label: string;
  historicalRisk?: number;
  currentRisk?: number;
  projectedRisk?: number;
  p10Lower?: number;
  p90Upper?: number;
  isCurrent?: boolean;
}

export interface PriorityQueueItem {
  rank: number;
  project: InfraProject;
  compositeScore: number;
  severityRank: 'CRITICAL' | 'HIGH' | 'WATCH';
  urgencyReason: string;
}

export interface RiskFactor {
  id: string;
  name: string;
  category: 'Schedule' | 'Cost' | 'Procurement' | 'Geotechnical' | 'Regulatory' | 'Contractor';
  contributionScore: number; // SHAP value (positive increases risk, negative decreases)
  importancePercent: number;
  impactType: 'POSITIVE_RISK' | 'STABILIZING';
  description: string;
  evidence: string;
  mitigationSuggestion: string;
}

export interface PredictionData {
  projectId: string;
  projectCode: string;
  projectName: string;
  costOverrun: {
    sanctionedCostCr: number;
    currentEstimateCr: number;
    forecastEstimateCr: number;
    potentialEscalationCr: number;
    escalationPercentage: number;
    modelConfidencePercent: number;
    confidenceInterval: { lower: number; upper: number };
    historicalSeries: { period: string; sanctioned: number; actualExp: number; forecast: number }[];
  };
  timeOverrun: {
    plannedCompletion: string;
    forecastCompletion: string;
    expectedDelayMonths: number;
    delayDays: number;
    modelConfidencePercent: number;
    confidenceIntervalMonths: { lower: number; upper: number };
    historicalSeries: { period: string; plannedProgress: number; actualProgress: number; projectedProgress: number }[];
  };
  implementationRisk: {
    currentRiskScore: number; // 0-100
    projectedRiskScore: number; // 0-100
    riskVelocityTrend: 'ACCELERATING' | 'STABLE' | 'DECELERATING';
    compositeIndex: number;
    historicalSeries: { period: string; historicalRisk?: number; forecastRisk?: number; p10?: number; p90?: number }[];
  };
}

export interface EarlyWarningAlert {
  id: string;
  projectId: string;
  projectCode: string;
  projectName: string;
  sector: string;
  state: string;
  ministry?: string;
  severity: 'CRITICAL' | 'HIGH' | 'WATCH';
  riskScore: number; // 0-100
  impactScore: number; // 0-100 (for matrix placement)
  changeType: string;
  changeSummary: string;
  primaryDriver: string;
  detectedAt: string;
  recommendedReviewDate: string;
  recommendedAction: string;
  nodalOfficer: string;
  status: 'OPEN' | 'IN_REVIEW' | 'ESCALATED' | 'RESOLVED';
}

export interface PeerBenchmark {
  projectId: string;
  projectCode: string;
  projectName: string;
  sector: string;
  metrics: {
    costRisk: { project: number; peerMedian: number; sectorAverage: number; unit: '/100' };
    timeRisk: { project: number; peerMedian: number; sectorAverage: number; unit: '/100' };
    progress: { project: number; peerMedian: number; sectorAverage: number; unit: '%' };
    healthScore: { project: number; peerMedian: number; sectorAverage: number; unit: '/100' };
    durationMonths: { project: number; peerMedian: number; sectorAverage: number; unit: 'mo' };
    expenditureVelocityCrPerMonth: { project: number; peerMedian: number; sectorAverage: number; unit: '₹Cr/mo' };
  };
  keyDifferences: {
    metric: string;
    difference: string;
    explanation: string;
    impact: 'FAVORABLE' | 'UNFAVORABLE' | 'NEUTRAL';
  }[];
  aiComparisonSummary: string;
}


