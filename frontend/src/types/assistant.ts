export type MessageSender = 'user' | 'assistant' | 'system';

export interface AssistantMetric {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}

export interface AssistantAction {
  label: string;
  actionType: 'NAVIGATE' | 'GENERATE_REPORT' | 'FILTER' | 'SET_PROJECT';
  target: string;
}

export interface AssistantRecommendation {
  priority: 'P1 - Immediate' | 'P2 - High' | 'P3 - Medium';
  urgency: string;
  action: string;
  expectedImpact: string;
  responsibleEntity: string;
}

export interface AssistantShapFactor {
  factor: string;
  contribution: number; // e.g. +24.2 or -8.4
  impactType: 'POSITIVE_RISK' | 'STABILIZING';
  category: string;
  evidence: string;
}

export interface AssistantDataQuality {
  score: number; // 0-100
  freshness: string;
  status: 'Verified' | 'Pending Field Audit' | 'Partial';
}

export interface AssistantRiskTrajectory {
  trend: 'DETERIORATING' | 'STABLE' | 'IMPROVING';
  delta: number;
  explanation: string;
}

export interface AssistantMessage {
  id: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  metrics?: AssistantMetric[];
  actions?: AssistantAction[];
  recommendations?: AssistantRecommendation[];
  shapBreakdown?: AssistantShapFactor[];
  dataQuality?: AssistantDataQuality;
  riskTrajectory?: AssistantRiskTrajectory;
  confidencePercent?: number;
  sourceCitations?: string[];
  projectId?: string;
  isError?: boolean;
}

export interface PromptChip {
  id: string;
  label: string;
  prompt: string;
  category: 'RISK' | 'COST' | 'SCHEDULE' | 'PORTFOLIO';
}
