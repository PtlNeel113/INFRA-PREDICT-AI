import React from 'react';
import {
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Activity,
  Award,
  Sparkles,
} from 'lucide-react';
import { InfraProject } from '../../types/projects';

interface OverallRiskSummaryCardProps {
  project: InfraProject;
  onViewForwardOutlook: () => void;
}

export const OverallRiskSummaryCard: React.FC<OverallRiskSummaryCardProps> = ({
  project,
  onViewForwardOutlook,
}) => {
  // Determine composite overall risk level
  const riskLevel = project.riskLevel || 'HIGH';
  const healthScore = project.healthScore || 80;
  const riskTrend = project.riskTrend || 0;
  const topRiskDriver = project.primaryRiskDriver || 'Contractual schedule slippage and commissioning milestones';

  const getRiskStyle = (level: string) => {
    switch (level.toUpperCase()) {
      case 'CRITICAL':
      case 'HIGH':
        return {
          bg: 'bg-rose-50/50 border-rose-200',
          badge: 'bg-rose-100 text-rose-700 border-rose-200',
          dot: 'bg-rose-500',
          text: 'text-rose-700',
        };
      case 'MEDIUM':
      case 'WATCH':
        return {
          bg: 'bg-amber-50/50 border-amber-200',
          badge: 'bg-amber-100 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          text: 'text-amber-800',
        };
      default:
        return {
          bg: 'bg-emerald-50/50 border-emerald-200',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
          text: 'text-emerald-800',
        };
    }
  };

  const style = getRiskStyle(riskLevel);

  return (
    <div className={`neo-panel p-5 space-y-4 ${style.bg}`} id="overall-risk-summary">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-300/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl neo-raised flex items-center justify-center text-slate-800">
            <ShieldAlert className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#1557D6] tracking-wider block">
              Predictive Risk Assessment — Prototype
            </span>
            <h3 className="text-lg font-black text-[var(--neo-text-primary)] tracking-tight">
              Overall Project Risk
            </h3>
            <p className="text-[11px] text-[var(--neo-text-secondary)] mt-0.5">
              Derived from historical PAIMANA project indicators.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start lg:self-auto">
          <span className={`text-sm font-extrabold px-3 py-1.5 rounded-xl border neo-raised flex items-center gap-2 ${style.badge}`}>
            <span className={`w-2 h-2 rounded-full ${style.dot}`} />
            <span>OVERALL RISK: {riskLevel}</span>
          </span>
        </div>
      </div>

      {/* Grid of Key Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* Health Score */}
        <div className="p-3.5 neo-card rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
            Health Score
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 font-mono">
              {healthScore}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ 100</span>
          </div>
          <div className="w-full neo-inset rounded-full h-2 overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full ${
                healthScore >= 75 ? 'bg-emerald-500' : healthScore >= 50 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, healthScore)}%` }}
            />
          </div>
        </div>

        {/* Risk Trend */}
        <div className="p-3.5 neo-card rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
            Risk Trend
          </span>
          <div className="flex items-baseline gap-1">
            <span className={`text-xl font-bold font-mono ${riskTrend > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
              {riskTrend > 0 ? `+${riskTrend}%` : `${riskTrend}%`}
            </span>
            <span className="text-[11px] text-slate-500">
              {riskTrend > 0 ? '(Pressure increasing)' : '(Stable/Improving)'}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block">
            MoSPI cyclical change velocity
          </span>
        </div>

        {/* Top Risk Driver */}
        <div className="p-3.5 neo-card rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
            Top Risk Driver
          </span>
          <div className="text-xs font-semibold text-slate-900 line-clamp-2" title={topRiskDriver}>
            {topRiskDriver}
          </div>
          <span className="text-[10px] text-slate-400 block">
            Primary causal factor
          </span>
        </div>
      </div>

      {/* Short Explanation & Bottom CTA Button to switch to PART 2 */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 neo-inset p-3.5 rounded-xl">
        <p className="text-xs text-slate-700 leading-relaxed max-w-2xl">
          <strong className="text-slate-900 font-semibold">Summary:</strong> Project risk is primarily driven by schedule pressure and execution momentum across civil works and milestone dependencies.
        </p>

        <button
          type="button"
          onClick={onViewForwardOutlook}
          className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold neo-button-primary shrink-0 cursor-pointer"
        >
          <span>View Forward Risk Outlook</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
