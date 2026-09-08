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

export interface AssistantMessage {
  id: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  metrics?: AssistantMetric[];
  actions?: AssistantAction[];
  sourceCitations?: string[];
  projectId?: string;
}

export interface PromptChip {
  id: string;
  label: string;
  prompt: string;
  category: 'RISK' | 'COST' | 'SCHEDULE' | 'PORTFOLIO';
}
