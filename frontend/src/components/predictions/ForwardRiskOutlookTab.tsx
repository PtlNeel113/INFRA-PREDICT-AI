import React, { useMemo } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Clock,
  DollarSign,
  Activity,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { InfraProject } from '../../types/projects';
import { CostRiskService } from '../../server/services/costRiskService';
import { TimeRiskService } from '../../server/services/timeRiskService';
import { ExecutionRiskService } from '../../server/services/executionRiskService';

interface ForwardRiskOutlookTabProps {
  project: InfraProject;
  onBackToRiskIntelligence: () => void;
}

export const ForwardRiskOutlookTab: React.FC<ForwardRiskOutlookTabProps> = ({
  project,
  onBackToRiskIntelligence,
}) => {
  const costData = useMemo(() => CostRiskService.calculateCostRisk(project), [project]);
  const timeData = useMemo(() => TimeRiskService.calculateTimeRisk(project), [project]);
  const execData = useMemo(() => ExecutionRiskService.calculateExecutionRisk(project), [project]);

  // Derived Outlooks (Zero fake forecast values)
  // A. Cost Pressure Outlook
  const costPressureOutlook: 'LOW' | 'MEDIUM' | 'HIGH' = costData.cost_risk === 'HIGH' ? 'HIGH' : costData.cost_risk === 'MEDIUM' ? 'MEDIUM' : 'LOW';

  // B. Schedule Pressure & Delay Risk Outlook
  const schedulePressure: 'LOW' | 'MEDIUM' | 'HIGH' =
    timeData.schedule_slippage_months > 6 || timeData.progress_gap > 10 ? 'HIGH' : timeData.schedule_slippage_months > 0 || timeData.progress_gap > 4 ? 'MEDIUM' : 'LOW';
  const delayRiskOutlook: 'LOW' | 'MEDIUM' | 'HIGH' = timeData.delay_risk === 'HIGH' ? 'HIGH' : timeData.delay_risk === 'MEDIUM' ? 'MEDIUM' : 'LOW';

  // C. Execution Outlook
  const executionMomentum = execData.momentum;
  const riskDirection = execData.risk_direction;

  // 10. Forward Early Warnings (Top 3 generated from actual indicators)
  const earlyWarnings = useMemo(() => {
    const warnings: { title: string; detail: string; severity: 'HIGH' | 'MEDIUM' | 'LOW' }[] = [];

    // 1. Schedule warning
    if (timeData.schedule_slippage_months > 0) {
      warnings.push({
        title: 'Schedule pressure increasing',
        detail: `Commissioning target has extended to ${timeData.revised_completion_date} (+${timeData.schedule_slippage_months} mo delay). Site completion stands at ${timeData.physical_progress}%.`,
        severity: timeData.schedule_slippage_months > 10 ? 'HIGH' : 'MEDIUM',
      });
    }

    // 2. Progress gap / velocity warning
    if (timeData.progress_gap > 3) {
      warnings.push({
        title: 'Physical progress lag requires velocity acceleration',
        detail: `Site progress is lagging derived target by ${timeData.progress_gap} pp. Current velocity of ${execData.progress_trend} must accelerate to meet handover.`,
        severity: timeData.progress_gap > 8 ? 'HIGH' : 'MEDIUM',
      });
    } else if (execData.progress_trend_value < 2.0 && project.currentPhysicalProgress < 90) {
      warnings.push({
        title: 'Progress momentum slowing',
        detail: `Monthly physical advancement is subdued at ${execData.progress_trend}, indicating potential site bottlenecks.`,
        severity: 'MEDIUM',
      });
    }

    // 3. Expenditure vs progress warning
    if (costData.expenditure_progress_ratio && costData.expenditure_progress_ratio > 1.1) {
      warnings.push({
        title: 'Expenditure rising faster than physical progress',
        detail: `Burn ratio is ${costData.expenditure_progress_ratio}x (disbursement ${costData.expenditure_pct}% vs physical ${costData.physical_progress}%), elevating risk of cost pressure.`,
        severity: costData.expenditure_progress_ratio > 1.25 ? 'HIGH' : 'MEDIUM',
      });
    } else if (costData.cost_increase_pct > 0) {
      warnings.push({
        title: 'Cost increase already committed',
        detail: `Revised outlay of ₹${costData.revised_cost.toLocaleString()} Cr reflects +${costData.cost_increase_pct}% escalation over baseline sanction.`,
        severity: 'MEDIUM',
      });
    }

    // Fallback if low risk
    if (warnings.length === 0) {
      warnings.push({
        title: 'Milestone parameters currently stable',
        detail: `Financial disbursements (₹${costData.expenditure} Cr) and physical delivery (${costData.physical_progress}%) are aligned with schedule.`,
        severity: 'LOW',
      });
    }

    return warnings.slice(0, 3);
  }, [costData, timeData, execData, project]);

  // 11. Recommended Decision Action (Connected directly to identified risk driver)
  const recommendedAction = useMemo(() => {
    let priority: 'HIGH' | 'MEDIUM' | 'LOW' = 'MEDIUM';
    let action = '';
    let rationale = '';

    if (timeData.time_risk === 'HIGH' || timeData.schedule_slippage_months > 8) {
      priority = 'HIGH';
      action = `Convene joint commissioning review with ${project.implementingAgency || 'implementing agency'}. Freeze non-critical variation orders and expedite statutory clearances.`;
      rationale = `Schedule has slipped by +${timeData.schedule_slippage_months} months with ${100 - timeData.physical_progress}% physical scope remaining before ${timeData.revised_completion_date}.`;
    } else if (costData.cost_risk === 'HIGH' || (costData.expenditure_progress_ratio && costData.expenditure_progress_ratio > 1.25)) {
      priority = 'HIGH';
      action = `Audit contractor monthly invoice drawdowns against certified on-site measurements. Impose milestone-linked release gates.`;
      rationale = `Expenditure pace (${costData.expenditure_pct}%) is outpacing certified physical progress (${costData.physical_progress}%) with ₹${costData.remaining_cost.toLocaleString()} Cr remaining exposure.`;
    } else if (execData.execution_risk === 'HIGH' || execData.progress_trend_value < 1.5) {
      priority = 'MEDIUM';
      action = `Review site labor deployment and sub-vendor supply chains with ${project.implementingAgency || 'nodal department'}. Address interface blockages.`;
      rationale = `Current progress run-rate is ${execData.progress_trend}, which is below required milestone throughput.`;
    } else {
      priority = 'LOW';
      action = `Maintain current monitoring cadence through MoSPI flash report cycles. Track final testing & commissioning sign-offs.`;
      rationale = `Project parameters reflect stable execution with balanced financial and physical milestones.`;
    }

    return { priority, action, rationale };
  }, [costData, timeData, execData, project]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto" id="forward-risk-outlook-tab">
      
      {/* Current Project Risk Summary Header */}
      <div className="neo-panel p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            <span>Part 2: Forward Decision Support</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Forward Risk Outlook
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            What could happen next and what should decision-makers watch? Grounded in current indicators.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-slate-400 font-mono block">{project.code}</span>
            <span className="text-xs font-bold text-slate-900 truncate max-w-[200px] block">{project.name}</span>
          </div>
          <button
            type="button"
            onClick={onBackToRiskIntelligence}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold neo-button-secondary cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Risk Intelligence</span>
          </button>
        </div>
      </div>

      {/* 9. FORWARD RISK OUTLOOK (3 Compact Cards: Cost Outlook | Time Outlook | Execution Outlook) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* CARD A: COST OUTLOOK */}
        <div className="neo-panel p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-300/60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg neo-inset flex items-center justify-center text-rose-600">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Cost Outlook</h3>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Financial Trajectory</span>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border neo-raised ${
                costPressureOutlook === 'HIGH' ? 'bg-rose-100 text-rose-700 border-rose-200' : costPressureOutlook === 'MEDIUM' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
              }`}>
                {costPressureOutlook} PRESSURE
              </span>
            </div>

            <div className="neo-inset rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Current Cost Position</span>
                <span className="font-mono font-bold text-slate-900">
                  ₹{costData.revised_cost.toLocaleString()} Cr
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Cost Pressure Outlook</span>
                <span className={`font-bold ${
                  costPressureOutlook === 'HIGH' ? 'text-rose-600' : costPressureOutlook === 'MEDIUM' ? 'text-amber-700' : 'text-emerald-700'
                }`}>
                  {costPressureOutlook}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Remaining Cost Exposure</span>
                <span className="font-mono font-bold text-indigo-700">
                  ₹{costData.remaining_cost.toLocaleString()} Cr
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              Based on current cost and expenditure indicators. Financial drawdown stands at {costData.expenditure_pct}% against physical completion of {costData.physical_progress}%.
            </p>
          </div>

          <div className="pt-2 text-[10px] text-slate-400 italic">
            * Deterministic indicator without synthetic cost projections.
          </div>
        </div>

        {/* CARD B: TIME OUTLOOK */}
        <div className="neo-panel p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-300/60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg neo-inset flex items-center justify-center text-amber-700">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Time Outlook</h3>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Commissioning Horizon</span>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border neo-raised ${
                delayRiskOutlook === 'HIGH' ? 'bg-rose-100 text-rose-700 border-rose-200' : delayRiskOutlook === 'MEDIUM' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
              }`}>
                {delayRiskOutlook} DELAY RISK
              </span>
            </div>

            <div className="neo-inset rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Current Revised DoC</span>
                <span className="font-mono font-bold text-amber-800">
                  {timeData.revised_completion_date}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Schedule Pressure</span>
                <span className={`font-bold ${
                  schedulePressure === 'HIGH' ? 'text-rose-600' : schedulePressure === 'MEDIUM' ? 'text-amber-700' : 'text-emerald-700'
                }`}>
                  {schedulePressure}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Delay Risk Outlook</span>
                <span className="font-bold text-slate-900">
                  {delayRiskOutlook}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              Schedule slippage stands at {timeData.slippage_label}. Contractual milestone adherence is evaluated against audited MoSPI target of {timeData.revised_completion_date}.
            </p>
          </div>

          <div className="pt-2 text-[10px] text-slate-400 italic">
            * Evaluated as Prototype Delay Risk Assessment.
          </div>
        </div>

        {/* CARD C: EXECUTION OUTLOOK */}
        <div className="neo-panel p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-300/60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg neo-inset flex items-center justify-center text-blue-700">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Execution Outlook</h3>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Field Momentum</span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg border neo-raised bg-blue-50 text-blue-800 border-blue-200">
                {executionMomentum}
              </span>
            </div>

            <div className="neo-inset rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Current Progress Trend</span>
                <span className="font-mono font-bold text-emerald-700">
                  {execData.progress_trend}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Execution Momentum</span>
                <span className="font-bold text-slate-900">
                  {executionMomentum}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Risk Direction</span>
                <span className={`font-bold ${
                  riskDirection === 'Deteriorating' || riskDirection === 'Increasing Pressure'
                    ? 'text-rose-600'
                    : riskDirection === 'Improving'
                    ? 'text-emerald-700'
                    : 'text-slate-800'
                }`}>
                  {riskDirection}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              Physical completion stands at {execData.physical_progress}%. Monthly disbursement is running at {execData.expenditure_trend}.
            </p>
          </div>

          <div className="pt-2 text-[10px] text-slate-400 italic">
            * Derived from audited 4-cycle flash report deltas.
          </div>
        </div>

      </div>

      {/* 10. FORWARD EARLY WARNINGS */}
      <div className="neo-panel p-5 space-y-3.5" id="forward-early-warnings">
        <div className="flex items-center justify-between pb-3 border-b border-slate-300/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg neo-raised flex items-center justify-center text-amber-700 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Forward Early Warnings
              </h3>
              <p className="text-xs text-slate-500">
                Key watch items synthesized directly from verifiable baseline parameters.
              </p>
            </div>
          </div>
          <span className="text-[11px] px-2.5 py-1 rounded-lg neo-inset text-slate-700 font-mono font-bold">
            {earlyWarnings.length} Active Triggers
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {earlyWarnings.map((warning, idx) => (
            <div
              key={idx}
              className={`p-4 neo-card rounded-xl space-y-1.5 ${
                warning.severity === 'HIGH'
                  ? 'border-l-4 border-l-rose-500'
                  : warning.severity === 'MEDIUM'
                  ? 'border-l-4 border-l-amber-500'
                  : 'border-l-4 border-l-slate-400'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <span className={warning.severity === 'HIGH' ? 'text-rose-600' : 'text-amber-600'}>
                  ⚠
                </span>
                <span>{warning.title}</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {warning.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 11. RECOMMENDED DECISION ACTION */}
      <div className="neo-panel p-5 space-y-4" id="recommended-decision-action">
        <div className="flex items-center justify-between pb-3 border-b border-slate-300/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg neo-raised flex items-center justify-center text-indigo-700 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Recommended Decision Action
              </h3>
              <span className="text-xs text-slate-500">
                Actionable intervention tied directly to identified risk drivers.
              </span>
            </div>
          </div>

          <span
            className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border neo-raised ${
              recommendedAction.priority === 'HIGH'
                ? 'bg-rose-100 text-rose-700 border-rose-200'
                : recommendedAction.priority === 'MEDIUM'
                ? 'bg-amber-100 text-amber-800 border-amber-200'
                : 'bg-emerald-100 text-emerald-800 border-emerald-200'
            }`}
          >
            PRIORITY: {recommendedAction.priority}
          </span>
        </div>

        <div className="p-4 rounded-xl neo-inset space-y-2 border border-indigo-200/50">
          <div className="flex items-start gap-2">
            <span className="text-indigo-700 font-bold mt-0.5 text-sm">→</span>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {recommendedAction.action}
              </h4>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                <strong className="text-slate-900 font-semibold">Causal Rationale:</strong>{' '}
                {recommendedAction.rationale}
              </p>
            </div>
          </div>
        </div>

        {/* Agency accountability tag */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1">
          <div>
            <span>Implementing Department: </span>
            <strong className="text-slate-800 font-medium">{project.implementingAgency || 'Nodal Ministry'}</strong>
          </div>
          <div>
            <span>State Jurisdiction: </span>
            <strong className="text-slate-800 font-medium">{project.state}</strong>
          </div>
        </div>
      </div>

    </div>
  );
};
