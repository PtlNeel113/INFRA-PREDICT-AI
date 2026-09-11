import React, { useMemo } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Clock,
  DollarSign,
  Activity,
  Layers,
} from 'lucide-react';
import { InfraProject } from '../../types/projects';

interface UnifiedRiskDriversSectionProps {
  project: InfraProject;
}

interface RankedRiskDriver {
  rank: number;
  category: 'Cost' | 'Time' | 'Execution';
  title: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  actualValue: string;
  impactDescription: string;
}

export const UnifiedRiskDriversSection: React.FC<UnifiedRiskDriversSectionProps> = ({ project }) => {
  const rankedDrivers: RankedRiskDriver[] = useMemo(() => {
    const drivers: RankedRiskDriver[] = [];

    // 1. Time Drivers
    const slippageMo = project.predictedDelayMonths ?? 0;
    if (slippageMo > 0) {
      drivers.push({
        rank: 0,
        category: 'Time',
        title: 'Contractual Schedule Slippage',
        severity: slippageMo > 12 ? 'HIGH' : 'MEDIUM',
        actualValue: `+${slippageMo} Months`,
        impactDescription: `Revised commissioning target has slipped by +${slippageMo} months beyond the approved original baseline date (${project.originalDeadline || 'TBD'}).`,
      });
    }

    const expected = project.expectedProgress ?? project.currentPhysicalProgress;
    const progressGap = Number((expected - project.currentPhysicalProgress).toFixed(1));
    if (progressGap > 2) {
      drivers.push({
        rank: 0,
        category: 'Time',
        title: 'Milestone Progress Gap',
        severity: progressGap > 7 ? 'HIGH' : 'MEDIUM',
        actualValue: `${progressGap} pp Lag`,
        impactDescription: `Physical site progress (${project.currentPhysicalProgress}%) is trailing derived expected progress (${expected}%) by ${progressGap} percentage points.`,
      });
    }

    // 2. Cost Drivers
    const origCost = project.sanctionedCostCr || 100;
    const revCost = project.revisedCostCr || origCost;
    const costIncCr = Math.max(0, revCost - origCost);
    const costIncPct = Number(((costIncCr / origCost) * 100).toFixed(1));
    if (costIncPct > 0) {
      drivers.push({
        rank: 0,
        category: 'Cost',
        title: 'Approved Cost Escalation',
        severity: costIncPct > 20 ? 'HIGH' : 'MEDIUM',
        actualValue: `+${costIncPct}% (+₹${costIncCr.toLocaleString()} Cr)`,
        impactDescription: `Revised financial sanction exceeds original Cabinet approval by +₹${costIncCr.toLocaleString()} Cr due to approved scope expansions.`,
      });
    }

    const exp = project.expenditureCr || 0;
    const finPct = revCost > 0 ? Number(((exp / revCost) * 100).toFixed(1)) : 0;
    const physPct = project.currentPhysicalProgress || 0;
    const ratio = physPct > 0 ? Number((finPct / physPct).toFixed(2)) : 1.0;
    if (ratio > 1.1) {
      drivers.push({
        rank: 0,
        category: 'Cost',
        title: 'Expenditure vs Progress Elasticity',
        severity: ratio > 1.25 ? 'HIGH' : 'MEDIUM',
        actualValue: `${ratio}x Burn Ratio`,
        impactDescription: `Financial drawdown (${finPct}%) is depleting budget faster than physical delivery (${physPct}%), indicating front-loaded capital deployment.`,
      });
    }

    // 3. Execution Driver
    const progressVsExpGap = Number((physPct - finPct).toFixed(1));
    if (progressVsExpGap < -5) {
      drivers.push({
        rank: 0,
        category: 'Execution',
        title: 'Capital Output Disparity',
        severity: progressVsExpGap < -15 ? 'HIGH' : 'MEDIUM',
        actualValue: `${progressVsExpGap} pp Variance`,
        impactDescription: `Site progress is trailing cumulative disbursements by ${Math.abs(progressVsExpGap)} percentage points.`,
      });
    }

    // Secondary Risk Driver from PAIMANA record if available
    if (project.primaryRiskDriver && drivers.length < 4) {
      drivers.push({
        rank: 0,
        category: 'Execution',
        title: 'Key Operational Barrier',
        severity: 'MEDIUM',
        actualValue: 'Monitored',
        impactDescription: project.primaryRiskDriver,
      });
    }

    // If no strong adverse drivers exist
    if (drivers.length === 0) {
      drivers.push({
        rank: 1,
        category: 'Execution',
        title: 'Progress Tracking on Schedule',
        severity: 'LOW',
        actualValue: 'Aligned',
        impactDescription: 'All three risk pillars (Cost, Time, Execution) are tracking within approved parameters.',
      });
    }

    // Sort by severity (HIGH first, then MEDIUM, then LOW)
    const severityWeight = { HIGH: 3, MEDIUM: 2, LOW: 1 };
    drivers.sort((a, b) => severityWeight[b.severity] - severityWeight[a.severity]);

    // Assign sequential ranks 1, 2, 3...
    return drivers.slice(0, 4).map((d, index) => ({
      ...d,
      rank: index + 1,
    }));
  }, [project]);

  const getCategoryIcon = (cat: 'Cost' | 'Time' | 'Execution') => {
    switch (cat) {
      case 'Cost':
        return <DollarSign className="w-3.5 h-3.5 text-rose-600" />;
      case 'Time':
        return <Clock className="w-3.5 h-3.5 text-amber-600" />;
      case 'Execution':
        return <Activity className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  return (
    <section className="space-y-4" id="risk-drivers-section">
      <div className="flex items-center justify-between pb-2 border-b border-[rgba(200,212,226,0.45)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl neo-inset flex items-center justify-center text-[#1557D6] font-black text-xs">
            03
          </div>
          <div>
            <h3 className="text-base font-black text-[var(--neo-text-primary)] tracking-tight">
              Why Is This Project At Risk?
            </h3>
            <p className="text-xs text-[var(--neo-text-secondary)]">
              Strongest quantified risk drivers synthesized across Cost, Time, and Execution dimensions.
            </p>
          </div>
        </div>
        <span className="text-[11px] px-2.5 py-1 rounded-lg neo-raised text-[var(--neo-text-secondary)] font-mono font-bold">
          Deterministic Risk Drivers
        </span>
      </div>

      {/* Unified Driver Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {rankedDrivers.map((driver) => {
          const isHigh = driver.severity === 'HIGH';
          const isMed = driver.severity === 'MEDIUM';

          return (
            <div
              key={driver.rank}
              className={`neo-card p-4 flex flex-col justify-between space-y-3 transition-all hover:translate-y-[-1px] ${
                isHigh
                  ? 'border-l-4 border-l-rose-600'
                  : isMed
                  ? 'border-l-4 border-l-amber-500'
                  : 'border-l-4 border-l-emerald-600'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-md neo-raised flex items-center justify-center text-[10px] font-black text-[var(--neo-text-primary)]">
                      #{driver.rank}
                    </span>
                    <span className="text-[11px] font-bold text-[var(--neo-text-secondary)] flex items-center gap-1">
                      {getCategoryIcon(driver.category)}
                      {driver.category} Pillar
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-lg neo-raised ${
                      isHigh
                        ? 'text-rose-600'
                        : isMed
                        ? 'text-amber-600'
                        : 'text-emerald-600'
                    }`}
                  >
                    {driver.severity}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[var(--neo-text-primary)] leading-snug">
                    {driver.title}
                  </h4>
                  <p className="text-[11px] text-[var(--neo-text-secondary)] mt-1 leading-relaxed">
                    {driver.impactDescription}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[rgba(200,212,226,0.3)] flex items-center justify-between text-xs">
                <span className="text-[10px] uppercase font-bold text-[var(--neo-text-tertiary)] tracking-wider">
                  Observed Variance
                </span>
                <span
                  className={`font-mono font-bold ${
                    isHigh ? 'text-rose-600' : isMed ? 'text-amber-600' : 'text-emerald-600'
                  }`}
                >
                  {driver.actualValue}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
