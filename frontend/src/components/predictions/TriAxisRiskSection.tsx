import React from 'react';
import {
  DollarSign,
  Clock,
  Activity,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ArrowDown,
  Info,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { InfraProject } from '../../types/projects';

interface TriAxisRiskSectionProps {
  project: InfraProject;
}

export const TriAxisRiskSection: React.FC<TriAxisRiskSectionProps> = ({ project }) => {
  const getRiskColor = (score: number) => {
    if (score >= 75) return { text: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200', bar: 'bg-rose-600', badge: 'bg-rose-100 text-rose-700', label: 'CRITICAL RISK' };
    if (score >= 50) return { text: 'text-amber-800', bg: 'bg-amber-50', border: 'border-amber-200', bar: 'bg-amber-600', badge: 'bg-amber-100 text-amber-800', label: 'HIGH RISK' };
    if (score >= 30) return { text: 'text-blue-800', bg: 'bg-blue-50', border: 'border-blue-200', bar: 'bg-blue-600', badge: 'bg-blue-100 text-blue-800', label: 'MODERATE RISK' };
    return { text: 'text-emerald-800', bg: 'bg-emerald-50', border: 'border-emerald-200', bar: 'bg-emerald-600', badge: 'bg-emerald-100 text-emerald-800', label: 'LOW / STABLE' };
  };

  const costStyle = getRiskColor(project.costRiskScore);
  const timeStyle = getRiskColor(project.timeRiskScore);
  const execStyle = getRiskColor(project.executionRiskScore);

  const originalCost = project.sanctionedCostCr || 1;
  const revisedCost = project.revisedCostCr || originalCost;
  const costIncreasePct = Number((((revisedCost - originalCost) / originalCost) * 100).toFixed(1));
  const delayMonths = project.predictedDelayMonths || 0;
  const progressGap = Number(((project.expectedProgress ?? project.currentPhysicalProgress) - project.currentPhysicalProgress).toFixed(1));

  return (
    <section className="space-y-4" id="tri-axis-risk-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-bold text-xs shadow-2xs">
            03
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Tri-Axis Risk Computation</span>
              <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                Weighted Parameter Synthesis
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Each predictive risk score is derived directly from the underlying quantitative parameters above.
            </p>
          </div>
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-1 self-start sm:self-auto">
          <span className="font-mono text-[11px] bg-slate-100 px-2 py-1 rounded text-slate-700">
            Formula: R_comp = 0.35(Cost) + 0.40(Time) + 0.25(Exec)
          </span>
        </div>
      </div>

      {/* 3 Risk Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* PILLAR 1: COST RISK */}
        <div className={`rounded-2xl border ${costStyle.border} ${costStyle.bg} p-5 shadow-sm space-y-4 flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white border border-rose-200 flex items-center justify-center text-rose-600 shadow-2xs">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Cost Risk Score</h3>
                  <span className="text-[10px] text-slate-500 font-mono">Financial Escalation Pillar</span>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${costStyle.badge}`}>
                {costStyle.label}
              </span>
            </div>

            {/* Score Display */}
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">
                {project.costRiskScore}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ 100</span>
            </div>

            {/* Meter Bar */}
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${costStyle.bar}`}
                style={{ width: `${project.costRiskScore}%` }}
              />
            </div>

            {/* Derivation breakdown from parameters */}
            <div className="mt-4 pt-3 border-t border-slate-200/70 text-xs space-y-2">
              <span className="font-bold text-slate-800 text-[11px] block uppercase tracking-wider">
                Parameter Contributions:
              </span>
              <div className="flex justify-between text-slate-600">
                <span>&bull; Cost Increase Factor:</span>
                <strong className="font-mono text-slate-900">+{costIncreasePct}%</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>&bull; Forecast Escalation:</span>
                <strong className="font-mono text-rose-700">+₹{project.predictedCostOverrunCr || 0} Cr</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>&bull; Primary Cost Driver:</span>
                <span className="text-slate-800 text-right truncate max-w-[140px]" title={project.primaryRiskDriver}>
                  {project.primaryRiskDriver || 'Scope Alteration'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('traceable-cost-risk-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="w-full mt-2 py-1.5 px-2.5 rounded-lg bg-white/90 hover:bg-white text-rose-700 hover:text-rose-800 border border-rose-200 text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <span>Audit Deterministic Cost Formulas &amp; Drivers</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/70 text-[11px] text-slate-600 bg-white/70 -mx-5 -mb-5 p-3 rounded-b-2xl">
            <strong>Prescription:</strong> Freeze discretionary variation orders; lock long-lead material tenders.
          </div>
        </div>

        {/* PILLAR 2: TIME RISK */}
        <div className={`rounded-2xl border ${timeStyle.border} ${timeStyle.bg} p-5 shadow-sm space-y-4 flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white border border-amber-200 flex items-center justify-center text-amber-600 shadow-2xs">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Time Risk Score</h3>
                  <span className="text-[10px] text-slate-500 font-mono">Commissioning Delay Pillar</span>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${timeStyle.badge}`}>
                {timeStyle.label}
              </span>
            </div>

            {/* Score Display */}
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">
                {project.timeRiskScore}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ 100</span>
            </div>

            {/* Meter Bar */}
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${timeStyle.bar}`}
                style={{ width: `${project.timeRiskScore}%` }}
              />
            </div>

            {/* Derivation breakdown from parameters */}
            <div className="mt-4 pt-3 border-t border-slate-200/70 text-xs space-y-2">
              <span className="font-bold text-slate-800 text-[11px] block uppercase tracking-wider">
                Parameter Contributions:
              </span>
              <div className="flex justify-between text-slate-600">
                <span>&bull; Schedule Slippage:</span>
                <strong className="font-mono text-amber-800">+{delayMonths} Months</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>&bull; Progress Gap Lag:</span>
                <strong className="font-mono text-slate-900">
                  {progressGap > 0 ? `-${progressGap}%` : 'On Track'}
                </strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>&bull; Critical Path Driver:</span>
                <span className="text-slate-800 text-right truncate max-w-[140px]" title={project.secondaryRiskDriver || project.primaryRiskDriver}>
                  {project.secondaryRiskDriver || 'Statutory Approvals'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('traceable-time-risk-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="w-full mt-2 py-1.5 px-2.5 rounded-lg bg-white/90 hover:bg-white text-amber-800 hover:text-amber-900 border border-amber-200 text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <span>Audit Deterministic Time Formulas &amp; Drivers</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/70 text-[11px] text-slate-600 bg-white/70 -mx-5 -mb-5 p-3 rounded-b-2xl">
            <strong>Prescription:</strong> Escalate state right-of-way and environmental clearance to Ministry PMG cell.
          </div>
        </div>

        {/* PILLAR 3: EXECUTION RISK */}
        <div className={`rounded-2xl border ${execStyle.border} ${execStyle.bg} p-5 shadow-sm space-y-4 flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white border border-blue-200 flex items-center justify-center text-blue-600 shadow-2xs">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Execution Risk Score</h3>
                  <span className="text-[10px] text-slate-500 font-mono">Field Velocity & Contractor Pillar</span>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${execStyle.badge}`}>
                {execStyle.label}
              </span>
            </div>

            {/* Score Display */}
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">
                {project.executionRiskScore}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ 100</span>
            </div>

            {/* Meter Bar */}
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${execStyle.bar}`}
                style={{ width: `${project.executionRiskScore}%` }}
              />
            </div>

            {/* Derivation breakdown from parameters */}
            <div className="mt-4 pt-3 border-t border-slate-200/70 text-xs space-y-2">
              <span className="font-bold text-slate-800 text-[11px] block uppercase tracking-wider">
                Parameter Contributions:
              </span>
              <div className="flex justify-between text-slate-600">
                <span>&bull; Physical Completion:</span>
                <strong className="font-mono text-indigo-700">{project.currentPhysicalProgress}%</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>&bull; Risk Momentum Trend:</span>
                <strong className={`font-mono ${project.riskTrend > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {project.riskTrend > 0 ? `+${project.riskTrend} pts` : `${project.riskTrend} pts`}
                </strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>&bull; Implementing Agency:</span>
                <span className="text-slate-800 text-right truncate max-w-[140px]" title={project.implementingAgency}>
                  {project.implementingAgency || 'Nodal Agency'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/70 text-[11px] text-slate-600 bg-white/70 -mx-5 -mb-5 p-3 rounded-b-2xl">
            <strong>Prescription:</strong> Audit contractor machinery mobilization and manpower strength at work front.
          </div>
        </div>

      </div>

      {/* Downward Transition Indicator to Final Prediction */}
      <div className="flex items-center justify-center pt-2">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold shadow-2xs">
          <span>Tri-Axis Risk Matrix Synthesized</span>
          <ArrowDown className="w-3.5 h-3.5 text-indigo-600 animate-bounce" />
          <span>Generates Forward AI Predictions Below</span>
        </div>
      </div>
    </section>
  );
};
