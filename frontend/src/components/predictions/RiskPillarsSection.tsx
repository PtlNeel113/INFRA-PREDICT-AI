import React, { useMemo } from 'react';
import {
  DollarSign,
  Clock,
  Activity,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { InfraProject } from '../../types/projects';
import { CostRiskService } from '../../server/services/costRiskService';
import { TimeRiskService } from '../../server/services/timeRiskService';
import { ExecutionRiskService } from '../../server/services/executionRiskService';

interface RiskPillarsSectionProps {
  project: InfraProject;
}

export const RiskPillarsSection: React.FC<RiskPillarsSectionProps> = ({ project }) => {
  // 1. Evaluate Cost Risk deterministically from verified PAIMANA data
  const costRiskData = useMemo(() => {
    return CostRiskService.calculateCostRisk(project);
  }, [project]);

  // 2. Evaluate Time Risk deterministically from verified PAIMANA data
  const timeRiskData = useMemo(() => {
    return TimeRiskService.calculateTimeRisk(project);
  }, [project]);

  // 3. Evaluate Execution Risk deterministically from verified PAIMANA data
  const execRiskData = useMemo(() => {
    return ExecutionRiskService.calculateExecutionRisk(project);
  }, [project]);

  // Helpers for badge styles
  const getBadge = (level: 'LOW' | 'MEDIUM' | 'HIGH' | 'INSUFFICIENT_DATA') => {
    switch (level) {
      case 'HIGH':
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-700',
          badge: 'bg-rose-100 text-rose-700 border-rose-200',
          dot: 'bg-rose-500',
        };
      case 'MEDIUM':
        return {
          bg: 'bg-amber-50/70 border-amber-200 text-amber-800',
          badge: 'bg-amber-100 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
        };
      case 'LOW':
        return {
          bg: 'bg-emerald-50/70 border-emerald-200 text-emerald-800',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
        };
      default:
        return {
          bg: 'bg-slate-50 border-slate-200 text-slate-700',
          badge: 'bg-slate-100 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
        };
    }
  };

  const costBadge = getBadge(costRiskData.cost_risk);
  const timeBadge = getBadge(timeRiskData.time_risk);
  const execBadge = getBadge(execRiskData.execution_risk);
  const delayRiskBadge = getBadge(timeRiskData.delay_risk);

  return (
    <section className="space-y-4" id="risk-pillars-section">
      <div className="flex items-center justify-between pb-2 border-b border-[rgba(200,212,226,0.45)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl neo-inset flex items-center justify-center text-[#1557D6] font-black text-xs">
            02
          </div>
          <div>
            <h3 className="text-base font-black text-[var(--neo-text-primary)] tracking-tight">
              Deterministic Risk Assessment
            </h3>
            <p className="text-xs text-[var(--neo-text-secondary)]">
              Evaluated across Cost Risk, Time Risk, and Execution Risk using official MoSPI baseline rules.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Pillars: Cost Risk, Time Risk, Execution Risk */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* =========================================================
            PILLAR 1: COST RISK (Section 3)
            ========================================================= */}
        <div className="neo-panel p-5 flex flex-col justify-between space-y-4 border-l-4 border-l-rose-600">
          <div className="space-y-3.5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(200,212,226,0.45)]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg neo-raised flex items-center justify-center text-rose-600">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[var(--neo-text-primary)]">Cost Risk</h4>
                  <span className="text-[10px] text-[var(--neo-text-tertiary)] uppercase tracking-wider block">Financial Risk Axis</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg neo-raised flex items-center gap-1.5 ${costBadge.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${costBadge.dot}`} />
                  {costRiskData.cost_risk}
                </span>
              </div>
            </div>

            {/* Required Actual Project Values */}
            <div className="neo-card p-3 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[var(--neo-text-secondary)]">Cost Increase %</span>
                <span className={`font-mono font-bold ${costRiskData.cost_increase_pct > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {costRiskData.cost_increase_pct > 0 ? `+${costRiskData.cost_increase_pct}%` : '0.0%'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--neo-text-secondary)]">Cumulative Expenditure</span>
                <span className="font-mono font-bold text-[#1557D6]">
                  ₹{costRiskData.expenditure.toLocaleString()} Cr
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--neo-text-secondary)]">Physical Progress</span>
                <span className="font-mono font-bold text-emerald-600">
                  {costRiskData.physical_progress}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--neo-text-secondary)]">Remaining Cost Exposure</span>
                <span className="font-mono font-bold text-[var(--neo-text-primary)]">
                  ₹{costRiskData.remaining_cost.toLocaleString()} Cr
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Expenditure / Progress Ratio</span>
                <span className={`font-mono font-bold ${
                  costRiskData.expenditure_progress_ratio && costRiskData.expenditure_progress_ratio > 1.25
                    ? 'text-rose-600'
                    : 'text-slate-800'
                }`}>
                  {costRiskData.expenditure_progress_ratio ? `${costRiskData.expenditure_progress_ratio}x` : 'N/A'}
                </span>
              </div>
            </div>

            {/* Why is Cost Risk at this level? */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Why is Cost Risk at this level?
              </span>
              <div className="space-y-1.5 text-xs text-slate-600">
                {costRiskData.risk_drivers && costRiskData.risk_drivers.length > 0 ? (
                  costRiskData.risk_drivers.map((driver, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold mt-0.5">•</span>
                      <span className="leading-snug">{driver.description}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold mt-0.5">•</span>
                    <span>Expenditure remains disciplined and within approved revised cost envelope.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2.5 border-t border-slate-100 text-[11px] text-slate-500 italic">
            * Evaluated deterministically; zero synthetic ML figures or fabricated probabilities.
          </div>
        </div>

        {/* =========================================================
            PILLAR 2: TIME RISK (Section 4)
            ========================================================= */}
        <div className="neo-panel p-5 flex flex-col justify-between space-y-4 border-l-4 border-l-amber-500">
          <div className="space-y-3.5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(200,212,226,0.45)]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg neo-raised flex items-center justify-center text-amber-600">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[var(--neo-text-primary)]">Time Risk</h4>
                  <span className="text-[10px] text-[var(--neo-text-tertiary)] uppercase tracking-wider block">Schedule Risk Axis</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg neo-raised flex items-center gap-1.5 ${timeBadge.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${timeBadge.dot}`} />
                  {timeRiskData.time_risk}
                </span>
              </div>
            </div>

            {/* Required Actual Project Values */}
            <div className="neo-card p-3 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[var(--neo-text-secondary)]">Original DoC</span>
                <span className="font-mono font-bold text-[var(--neo-text-primary)]">
                  {timeRiskData.original_completion_date}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--neo-text-secondary)]">Revised DoC</span>
                <span className="font-mono font-bold text-amber-600">
                  {timeRiskData.revised_completion_date}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--neo-text-secondary)]">Schedule Slippage</span>
                <span className={`font-mono font-bold ${timeRiskData.schedule_slippage_months > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {timeRiskData.slippage_label}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--neo-text-secondary)]">Physical Progress</span>
                <span className="font-mono font-bold text-emerald-600">
                  {timeRiskData.physical_progress}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--neo-text-secondary)]">Progress Gap</span>
                <span className={`font-mono font-bold ${timeRiskData.progress_gap > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {timeRiskData.progress_gap_label}
                </span>
              </div>
            </div>

            {/* Predicted Delay Risk with Honest Labeling */}
            <div className="p-2.5 rounded-xl neo-inset flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-[var(--neo-text-primary)] block">Predicted Delay Risk</span>
                <span className="text-[10px] text-[var(--neo-text-tertiary)] font-mono">Prototype Delay Risk Assessment</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-lg neo-raised ${delayRiskBadge.badge}`}>
                {timeRiskData.delay_risk}
              </span>
            </div>

            {/* Why is Time Risk at this level? */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold text-[var(--neo-text-primary)] uppercase tracking-wider block">
                Why is Time Risk at this level?
              </span>
              <div className="space-y-1.5 text-xs text-[var(--neo-text-secondary)]">
                {timeRiskData.risk_drivers && timeRiskData.risk_drivers.length > 0 ? (
                  timeRiskData.risk_drivers.map((driver, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold mt-0.5">•</span>
                      <span className="leading-snug">{driver.description}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold mt-0.5">•</span>
                    <span>Milestone run-rate tracks original commissioning deadline.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2.5 border-t border-[rgba(200,212,226,0.45)] text-[11px] text-[var(--neo-text-tertiary)] italic">
            * Deterministic schedule assessment without speculative completion month forecasts.
          </div>
        </div>

        {/* =========================================================
            PILLAR 3: EXECUTION RISK (Section 5)
            ========================================================= */}
        <div className="neo-panel p-5 flex flex-col justify-between space-y-4 border-l-4 border-l-[#1557D6]">
          <div className="space-y-3.5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(200,212,226,0.45)]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg neo-raised flex items-center justify-center text-[#1557D6]">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[var(--neo-text-primary)]">Execution Risk</h4>
                  <span className="text-[10px] text-[var(--neo-text-tertiary)] uppercase tracking-wider block">Site Momentum Axis</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg neo-raised flex items-center gap-1.5 ${execBadge.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${execBadge.dot}`} />
                  {execRiskData.execution_risk}
                </span>
              </div>
            </div>

            {/* Required Actual Project Values */}
            <div className="neo-card p-3 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[var(--neo-text-secondary)]">Physical Progress</span>
                <span className="font-mono font-bold text-emerald-600">
                  {execRiskData.physical_progress}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--neo-text-secondary)]">Progress Trend</span>
                <span className="font-mono font-bold text-emerald-600">
                  {execRiskData.progress_trend}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--neo-text-secondary)]">Expenditure Trend</span>
                <span className="font-mono font-bold text-[#1557D6]">
                  {execRiskData.expenditure_trend}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--neo-text-secondary)]">Progress vs Expenditure</span>
                <span className={`font-mono font-bold ${
                  execRiskData.progress_vs_expenditure_gap >= 0 ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {execRiskData.progress_vs_expenditure_gap >= 0 ? `+${execRiskData.progress_vs_expenditure_gap} pp` : `${execRiskData.progress_vs_expenditure_gap} pp`}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--neo-text-secondary)]">Execution Momentum</span>
                <span className="font-bold text-[var(--neo-text-primary)]">
                  {execRiskData.momentum}
                </span>
              </div>
            </div>

            {/* Why is Execution Risk at this level? */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold text-[var(--neo-text-primary)] uppercase tracking-wider block">
                Why is Execution Risk at this level?
              </span>
              <div className="space-y-1.5 text-xs text-[var(--neo-text-secondary)]">
                {execRiskData.risk_drivers && execRiskData.risk_drivers.length > 0 ? (
                  execRiskData.risk_drivers.map((driver, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#1557D6] font-bold mt-0.5">•</span>
                      <span className="leading-snug">{driver.description}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold mt-0.5">•</span>
                    <span>Site execution is advancing on pace with milestone commitments.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2.5 border-t border-[rgba(200,212,226,0.45)] text-[11px] text-[var(--neo-text-tertiary)] italic">
            * Derived from physical velocity and monthly financial disbursement cadence.
          </div>
        </div>

      </div>
    </section>
  );
};
