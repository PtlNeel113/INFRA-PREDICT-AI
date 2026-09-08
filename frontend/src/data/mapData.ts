import { ProjectGeoData, StateGeoSummary, RiskIntelligenceSummary } from '../types/map';
import { MOCK_INFRA_PROJECTS } from './mockData';
import { INDIA_STATE_COORDINATES } from './indiaGeoData';

// Generate geographic coordinates for projects based on their state
const stateCoordMap = new Map(
  INDIA_STATE_COORDINATES.map(s => [s.name, { lat: s.lat, lng: s.lng }])
);

// Add some randomness to project locations within state boundaries
function getProjectCoordinates(stateName: string, index: number): { lat: number; lng: number } {
  const stateCoord = stateCoordMap.get(stateName) || { lat: 20, lng: 78 };
  
  // Spread projects around state center (±0.5 degrees)
  const offsetLat = (Math.sin(index * 2.5) * 0.5);
  const offsetLng = (Math.cos(index * 1.8) * 0.5);
  
  return {
    lat: stateCoord.lat + offsetLat,
    lng: stateCoord.lng + offsetLng,
  };
}

// Convert mock projects to geo data
export const PROJECT_GEO_DATA: ProjectGeoData[] = MOCK_INFRA_PROJECTS.map((project, index) => {
  const coords = getProjectCoordinates(project.state, index);
  
  return {
    id: project.id,
    code: project.code,
    name: project.name,
    lat: coords.lat,
    lng: coords.lng,
    state: project.state,
    sector: project.sector,
    ministry: project.ministry,
    healthScore: project.healthScore,
    riskLevel: project.riskLevel,
    costRiskScore: project.costRiskScore,
    timeRiskScore: project.timeRiskScore,
    executionRiskScore: project.executionRiskScore,
    riskTrend: project.riskTrend,
    primaryRiskDriver: project.primaryRiskDriver,
    sanctionedCostCr: project.sanctionedCostCr,
    currentPhysicalProgress: project.currentPhysicalProgress,
  };
});

// Generate state summaries
export const STATE_GEO_SUMMARIES: StateGeoSummary[] = INDIA_STATE_COORDINATES.map(state => {
  const stateProjects = PROJECT_GEO_DATA.filter(p => p.state === state.name);
  
  const criticalCount = stateProjects.filter(p => p.riskLevel === 'CRITICAL').length;
  const highCount = stateProjects.filter(p => p.riskLevel === 'HIGH').length;
  const watchCount = stateProjects.filter(p => p.riskLevel === 'WATCH').length;
  const stableCount = stateProjects.filter(p => p.riskLevel === 'STABLE').length;
  
  const avgHealth = stateProjects.length > 0
    ? Math.round(stateProjects.reduce((sum, p) => sum + p.healthScore, 0) / stateProjects.length)
    : 100;
  
  const avgTrend = stateProjects.length > 0
    ? Math.round(stateProjects.reduce((sum, p) => sum + p.riskTrend, 0) / stateProjects.length)
    : 0;
  
  const topProjects = stateProjects
    .sort((a, b) => a.healthScore - b.healthScore)
    .slice(0, 5)
    .map(p => ({
      code: p.code,
      name: p.name.length > 50 ? p.name.substring(0, 50) + '...' : p.name,
      healthScore: p.healthScore,
      riskLevel: p.riskLevel,
    }));
  
  return {
    name: state.name,
    shortCode: state.shortCode,
    projectCount: stateProjects.length,
    criticalCount,
    highCount,
    watchCount,
    stableCount,
    portfolioHealth: avgHealth,
    riskTrend: avgTrend,
    topProjects,
  };
}).filter(s => s.projectCount > 0);

// Calculate risk intelligence summary
export function calculateRiskIntelligence(projects: ProjectGeoData[]): RiskIntelligenceSummary {
  const critical = projects.filter(p => p.riskLevel === 'CRITICAL').length;
  const high = projects.filter(p => p.riskLevel === 'HIGH').length;
  const watch = projects.filter(p => p.riskLevel === 'WATCH').length;
  const stable = projects.filter(p => p.riskLevel === 'STABLE').length;
  
  const portfolioHealth = Math.round(
    projects.reduce((sum, p) => sum + p.healthScore, 0) / projects.length
  );
  
  const riskTrend = Number((
    projects.reduce((sum, p) => sum + p.riskTrend, 0) / projects.length
  ).toFixed(1));
  
  // Top risk states
  const stateRiskMap = new Map<string, number>();
  projects.forEach(p => {
    const current = stateRiskMap.get(p.state) || 0;
    const riskScore = 100 - p.healthScore;
    stateRiskMap.set(p.state, current + riskScore);
  });
  
  const topRiskStates = Array.from(stateRiskMap.entries())
    .map(([state, totalRisk]) => {
      const stateProjects = projects.filter(p => p.state === state);
      return {
        state,
        score: Math.round(totalRisk / stateProjects.length),
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  
  // Fastest deteriorating
  const fastestDeteriorating = projects
    .filter(p => p.riskTrend > 0)
    .sort((a, b) => b.riskTrend - a.riskTrend)
    .slice(0, 5)
    .map(p => ({
      code: p.code,
      name: p.name.length > 40 ? p.name.substring(0, 40) + '...' : p.name,
      trend: p.riskTrend,
    }));
  
  return {
    critical,
    high,
    watch,
    stable,
    topRiskStates,
    fastestDeteriorating,
    portfolioHealth,
    riskTrend,
  };
}

export const RISK_INTELLIGENCE_SUMMARY = calculateRiskIntelligence(PROJECT_GEO_DATA);

// Sector and ministry options for filters
export const SECTOR_OPTIONS = [
  'All Sectors',
  'Roads & Highways (MoRTH)',
  'Railways (MoR)',
  'Renewable Energy & Power',
  'Ports, Shipping & Waterways',
  'Civil Aviation',
  'Urban Mass Transit (Metro)',
  'Water Resources & Irrigation',
  'Digital & Telecom Infra',
];

export const MINISTRY_OPTIONS = [
  'All Ministries',
  'Infrastructure',
  'Transport',
  'Power',
  'Railways',
  'Urban Development',
];
