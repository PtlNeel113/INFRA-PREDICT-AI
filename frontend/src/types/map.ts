import { RiskLevel } from './ui';

export type MapMode = 'PORTFOLIO' | 'RISK' | 'COST_RISK' | 'TIME_RISK' | 'EXECUTION_RISK';

export interface MapFilter {
  state?: string;
  sector?: string[];
  ministry?: string;
  riskLevel?: RiskLevel[];
  projectStage?: string[];
}

export interface ProjectGeoData {
  id: string;
  code: string;
  name: string;
  lat: number;
  lng: number;
  state: string;
  sector: string;
  ministry?: string;
  healthScore: number;
  riskLevel: RiskLevel;
  costRiskScore: number;
  timeRiskScore: number;
  executionRiskScore: number;
  riskTrend: number;
  primaryRiskDriver: string;
  sanctionedCostCr: number;
  currentPhysicalProgress: number;
}

export interface StateGeoSummary {
  name: string;
  shortCode: string;
  projectCount: number;
  criticalCount: number;
  highCount: number;
  watchCount: number;
  stableCount: number;
  portfolioHealth: number;
  riskTrend: number;
  topProjects: {
    code: string;
    name: string;
    healthScore: number;
    riskLevel: RiskLevel;
  }[];
}

export interface RiskCluster {
  id: string;
  lat: number;
  lng: number;
  projectIds: string[];
  count: number;
  avgHealthScore: number;
  dominantRiskLevel: RiskLevel;
  topDriver: string;
}

export interface RiskIntelligenceSummary {
  critical: number;
  high: number;
  watch: number;
  stable: number;
  topRiskStates: {
    state: string;
    score: number;
  }[];
  fastestDeteriorating: {
    code: string;
    name: string;
    trend: number;
  }[];
  portfolioHealth: number;
  riskTrend: number;
}

// Simplified India state boundaries (lat/lng coordinates for state centers)
export interface IndiaStateCoordinates {
  name: string;
  shortCode: string;
  lat: number;
  lng: number;
  projects?: ProjectGeoData[];
}
