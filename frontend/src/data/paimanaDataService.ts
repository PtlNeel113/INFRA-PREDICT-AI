import { ReportingPeriod, StateGeoSummary } from '../types/map';
import {
  PAIMANA_STATE_METADATA,
  PAIMANA_STATE_MONTHLY_DATA,
  PAIMANA_PRIORITY_PROJECTS,
  PAIMANA_SECTOR_RISK_METRICS,
  PAIMANA_RISK_TRAJECTORY,
  PaimanaPriorityProject,
  PaimanaTrajectoryPoint,
  PaimanaStateMetadata,
} from './paimanaData';
import { InfraProject } from '../types/projects';

export interface PaimanaFilterOptions {
  state?: string | null;
  sector?: string;
  ministry?: string;
  riskLevel?: string;
  search?: string;
}

export interface NationalKPISummary {
  totalProjects: number;
  criticalCount: number;
  highCount: number;
  highPriorityCount: number;
  watchCount: number;
  stableCount: number;
  totalOriginalCostCr: number;
  totalRevisedCostCr: number;
  totalExpenditureCr: number;
  costOverrunCr: number;
  averagePhysicalProgress: number;
  reportingPeriod: ReportingPeriod;
}

export interface StateRiskRanking {
  mapId: string;
  stateName: string;
  shortCode: string;
  riskSeverity: 'CRITICAL' | 'HIGH' | 'WATCH' | 'STABLE' | 'NO_DATA';
  riskIndex: number;
  highPriorityCount: number;
  totalProjects: number;
  avgPhysicalProgress: number;
  topRiskDriver: string;
}

export class PaimanaDataService {
  /**
   * Find state metadata by either SVG ID (e.g. 'gj'), state name (e.g. 'Gujarat'), or alias
   */
  static findStateMetadata(identifier: string): PaimanaStateMetadata | undefined {
    const clean = identifier.trim().toLowerCase();
    return PAIMANA_STATE_METADATA.find(
      (s) =>
        s.id.toLowerCase() === clean ||
        s.name.toLowerCase() === clean ||
        s.shortCode.toLowerCase() === clean ||
        s.aliases.some((a) => a.toLowerCase() === clean)
    );
  }

  /**
   * Aggregate all 36 Indian states and union territories for a given reporting period
   */
  static getStateSummaries(
    period: ReportingPeriod = 'July 2026',
    filters?: PaimanaFilterOptions,
    customProjects: InfraProject[] = []
  ): Map<string, StateGeoSummary> {
    const periodData = PAIMANA_STATE_MONTHLY_DATA[period] || PAIMANA_STATE_MONTHLY_DATA['July 2026'];
    const summaryMap = new Map<string, StateGeoSummary>();

    PAIMANA_STATE_METADATA.forEach((meta) => {
      const snap = periodData[meta.id];

      if (!snap) {
        // No data recorded for this union territory or state in this period
        summaryMap.set(meta.id, {
          name: meta.name,
          shortCode: meta.shortCode,
          mapId: meta.id,
          projectCount: 0,
          criticalCount: 0,
          highCount: 0,
          watchCount: 0,
          stableCount: 0,
          portfolioHealth: 100,
          riskTrend: 0,
          totalOriginalCostCr: 0,
          totalRevisedCostCr: 0,
          totalExpenditureCr: 0,
          averagePhysicalProgress: 0,
          costRevisionCount: 0,
          scheduleRevisionCount: 0,
          riskSeverity: 'NO_DATA',
          riskIndex: 0,
          priorityReviewsCount: 0,
          topRiskDriver: 'No monitored active central projects in current cycle',
          topProjects: [],
        });
        return;
      }

      // Check if newly created custom projects in store belong to this state and adjust counts
      const baselineIds = new Set(PAIMANA_PRIORITY_PROJECTS.map((p) => p.id));
      const matchingCustom = customProjects.filter((p) => {
        if (baselineIds.has(p.id)) return false; // Prevent double-counting baseline mock seed projects
        const pMeta = this.findStateMetadata(p.state);
        return pMeta && pMeta.id === meta.id;
      });

      let criticalCount = snap.criticalCount;
      let highCount = snap.highCount;
      let watchCount = snap.watchCount;
      let stableCount = snap.stableCount;
      let projectCount = snap.projectCount;
      let totalOriginal = snap.totalOriginalCostCr;
      let totalRevised = snap.totalRevisedCostCr;
      let totalExp = snap.totalExpenditureCr;

      matchingCustom.forEach((cp) => {
        projectCount += 1;
        totalOriginal += cp.sanctionedCostCr || 0;
        totalRevised += cp.revisedCostCr || cp.sanctionedCostCr || 0;
        totalExp += cp.expenditureCr || 0;
        if (cp.riskLevel === 'CRITICAL') criticalCount++;
        else if (cp.riskLevel === 'HIGH') highCount++;
        else if (cp.riskLevel === 'WATCH') watchCount++;
        else if (cp.riskLevel === 'STABLE') stableCount++;
      });

      // Find top projects for this state
      const topProjects = PAIMANA_PRIORITY_PROJECTS.filter((p) => {
        const pMeta = this.findStateMetadata(p.state);
        return pMeta && pMeta.id === meta.id;
      }).map((p) => ({
        code: p.code,
        name: p.name,
        healthScore: p.riskLevel === 'CRITICAL' ? 45 : p.riskLevel === 'HIGH' ? 62 : 78,
        riskLevel: p.riskLevel,
      }));

      // Apply filter check if user filtered by riskLevel or ministry
      let isVisible = true;
      if (filters?.riskLevel && filters.riskLevel !== 'ALL') {
        if (snap.riskSeverity !== filters.riskLevel) {
          isVisible = false;
        }
      }

      if (isVisible) {
        summaryMap.set(meta.id, {
          name: meta.name,
          shortCode: meta.shortCode,
          mapId: meta.id,
          projectCount,
          criticalCount,
          highCount,
          watchCount,
          stableCount,
          portfolioHealth: 100 - snap.riskIndex,
          riskTrend: snap.costRevisionCount,
          totalOriginalCostCr: totalOriginal,
          totalRevisedCostCr: totalRevised,
          totalExpenditureCr: totalExp,
          averagePhysicalProgress: snap.averagePhysicalProgress,
          costRevisionCount: snap.costRevisionCount,
          scheduleRevisionCount: snap.scheduleRevisionCount,
          riskSeverity: snap.riskSeverity,
          riskIndex: snap.riskIndex,
          priorityReviewsCount: criticalCount + highCount,
          topRiskDriver: snap.topRiskDriver,
          topProjects,
        });
      }
    });

    return summaryMap;
  }

  /**
   * Calculate top-level national portfolio KPI summary
   */
  static getNationalKPIs(
    period: ReportingPeriod = 'July 2026',
    filters?: PaimanaFilterOptions,
    customProjects: InfraProject[] = []
  ): NationalKPISummary {
    const summaries = this.getStateSummaries(period, filters, customProjects);

    let totalProjects = 0;
    let criticalCount = 0;
    let highCount = 0;
    let watchCount = 0;
    let stableCount = 0;
    let totalOriginalCostCr = 0;
    let totalRevisedCostCr = 0;
    let totalExpenditureCr = 0;
    let totalProgressSum = 0;
    let statesWithProgress = 0;

    summaries.forEach((summary) => {
      // If a specific state filter is active, only aggregate that state
      if (filters?.state) {
        const filterMeta = this.findStateMetadata(filters.state);
        if (filterMeta && summary.mapId !== filterMeta.id) {
          return;
        }
      }

      totalProjects += summary.projectCount;
      criticalCount += summary.criticalCount;
      highCount += summary.highCount;
      watchCount += summary.watchCount;
      stableCount += summary.stableCount;
      totalOriginalCostCr += summary.totalOriginalCostCr || 0;
      totalRevisedCostCr += summary.totalRevisedCostCr || 0;
      totalExpenditureCr += summary.totalExpenditureCr || 0;

      if ((summary.averagePhysicalProgress || 0) > 0) {
        totalProgressSum += summary.averagePhysicalProgress || 0;
        statesWithProgress++;
      }
    });

    return {
      totalProjects,
      criticalCount,
      highCount,
      highPriorityCount: criticalCount + highCount,
      watchCount,
      stableCount,
      totalOriginalCostCr,
      totalRevisedCostCr,
      totalExpenditureCr,
      costOverrunCr: Math.max(0, totalRevisedCostCr - totalOriginalCostCr),
      averagePhysicalProgress:
        statesWithProgress > 0 ? Number((totalProgressSum / statesWithProgress).toFixed(1)) : 0,
      reportingPeriod: period,
    };
  }

  /**
   * Calculate ranked top risk states dynamically from state summaries
   */
  static getTopRiskStates(
    period: ReportingPeriod = 'July 2026',
    limit = 5,
    customProjects: InfraProject[] = []
  ): StateRiskRanking[] {
    const summaries = this.getStateSummaries(period, undefined, customProjects);
    const rankings: StateRiskRanking[] = [];

    summaries.forEach((summary) => {
      if (summary.projectCount > 0 && summary.riskSeverity !== 'NO_DATA') {
        rankings.push({
          mapId: summary.mapId || '',
          stateName: summary.name,
          shortCode: summary.shortCode,
          riskSeverity: summary.riskSeverity || 'STABLE',
          riskIndex: summary.riskIndex || 0,
          highPriorityCount: summary.criticalCount + summary.highCount,
          totalProjects: summary.projectCount,
          avgPhysicalProgress: summary.averagePhysicalProgress || 0,
          topRiskDriver: summary.topRiskDriver || 'Pending milestone review',
        });
      }
    });

    // Sort by highPriorityCount descending, then by riskIndex descending
    rankings.sort((a, b) => {
      if (b.highPriorityCount !== a.highPriorityCount) {
        return b.highPriorityCount - a.highPriorityCount;
      }
      return b.riskIndex - a.riskIndex;
    });

    return rankings.slice(0, limit);
  }

  /**
   * Get priority projects matching filters and active state
   */
  static getPriorityProjects(
    filters?: PaimanaFilterOptions,
    customProjects: InfraProject[] = []
  ): PaimanaPriorityProject[] {
    const existingIds = new Set<string>();
    let list: PaimanaPriorityProject[] = [];

    // Add baseline PAIMANA_PRIORITY_PROJECTS first
    PAIMANA_PRIORITY_PROJECTS.forEach((p) => {
      if (!existingIds.has(p.id)) {
        existingIds.add(p.id);
        list.push({ ...p });
      }
    });

    // Merge in custom projects if they are critical or high risk and not already included
    customProjects.forEach((cp) => {
      if (existingIds.has(cp.id)) {
        return; // Prevent duplicate keys and duplicate project cards
      }
      if (cp.riskLevel === 'CRITICAL' || cp.riskLevel === 'HIGH') {
        existingIds.add(cp.id);
        list.push({
          id: cp.id,
          name: cp.name,
          code: cp.code,
          state: cp.state,
          sector: cp.sector,
          ministry: cp.ministry,
          sanctionedCostCr: cp.sanctionedCostCr,
          revisedCostCr: cp.revisedCostCr,
          expenditureCr: cp.expenditureCr,
          costOverrunCr: cp.predictedCostOverrunCr || 0,
          delayMonths: cp.predictedDelayMonths || 0,
          currentProgress: cp.currentPhysicalProgress,
          riskLevel: cp.riskLevel,
          keySignal: cp.primaryRiskDriver || 'Physical progress delay detected',
          suggestedAction:
            cp.riskLevel === 'CRITICAL'
              ? 'Convene inter-ministerial review and unblock statutory clearances'
              : 'Review milestone progress gap with nodal executing agency',
        });
      }
    });

    // Apply state filter
    if (filters?.state) {
      const meta = this.findStateMetadata(filters.state);
      list = list.filter((p) => {
        const pMeta = this.findStateMetadata(p.state);
        return pMeta && meta && pMeta.id === meta.id;
      });
    }

    // Apply sector filter
    if (filters?.sector && filters.sector !== 'ALL') {
      list = list.filter((p) => p.sector.toLowerCase().includes(filters.sector!.toLowerCase()));
    }

    // Apply ministry filter
    if (filters?.ministry && filters.ministry !== 'ALL') {
      list = list.filter((p) => p.ministry.toLowerCase() === filters.ministry!.toLowerCase());
    }

    // Apply risk level filter
    if (filters?.riskLevel && filters.riskLevel !== 'ALL') {
      list = list.filter((p) => p.riskLevel === filters.riskLevel);
    }

    // Apply search filter
    if (filters?.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.keySignal.toLowerCase().includes(q)
      );
    }

    return list;
  }

  /**
   * Get sector metrics for lower analytics chart
   */
  static getSectorMetrics() {
    return PAIMANA_SECTOR_RISK_METRICS;
  }

  /**
   * Get canonical risk trajectory with observed vs predicted distinction
   */
  static getRiskTrajectory(): PaimanaTrajectoryPoint[] {
    return PAIMANA_RISK_TRAJECTORY;
  }
}
