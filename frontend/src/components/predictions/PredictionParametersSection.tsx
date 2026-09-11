import React from 'react';
import {
  DollarSign,
  Clock,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Gauge,
  Percent,
  Layers,
  ArrowRight,
  Info,
} from 'lucide-react';
import { InfraProject } from '../../types/projects';

interface PredictionParametersSectionProps {
  project: InfraProject;
}

export const PredictionParametersSection: React.FC<PredictionParametersSectionProps> = ({ project }) => {
  // 1. Cost Parameter Calculations
  const originalCost = project.sanctionedCostCr || 0;
  const revisedCost = project.revisedCostCr || originalCost;
  const expenditure = project.expenditureCr || 0;
  const forecastCost = project.forecastCostCr || revisedCost;
  
  const costIncreaseCr = Math.max(0, revisedCost - originalCost);
  const costIncreasePct = originalCost > 0 ? Number(((costIncreaseCr / originalCost) * 100).toFixed(1)) : 0;
  
  const forecastEscalationCr = Math.max(0, forecastCost - originalCost);
  const forecastEscalationPct = originalCost > 0 ? Number(((forecastEscalationCr / originalCost) * 100).toFixed(1)) : 0;

  const financialProgressPct = revisedCost > 0 ? Number(((expenditure / revisedCost) * 100).toFixed(1)) : 0;
  const physicalProgress = project.currentPhysicalProgress || 0;
  const burnToProgressRatio = physicalProgress > 0 ? Number((financialProgressPct / physicalProgress).toFixed(2)) : 1.0;
  const costPerOnePctProgress = physicalProgress > 0 ? Number((expenditure / physicalProgress).toFixed(2)) : 0;

  // 2. Time Parameter Calculations
  const originalDoC = project.originalDeadline || 'TBD';
  const revisedDoC = project.predictedCompletionDate || 'TBD';
  const delayMonths = project.predictedDelayMonths || 0;
  const delayDays = Math.round(delayMonths * 30.4);
  const expectedProgress = project.expectedProgress ?? physicalProgress;
  const progressGap = Number((expectedProgress - physicalProgress).toFixed(1));

  // 3. Execution Parameter Calculations
  // Get monthly deltas from changeIntelligence if available, or compute realistic velocity
  const progressDeltaStr = project.changeIntelligence?.metrics.find(
    (m) => m.metric.toLowerCase().includes('progress')
  )?.delta;
  const monthlyProgressTrend = progressDeltaStr ? progressDeltaStr : `+${Math.max(0.5, Number((physicalProgress / 24).toFixed(1)))}% / mo`;

  const expDeltaStr = project.changeIntelligence?.metrics.find(
    (m) => m.metric.toLowerCase().includes('expenditure') || m.metric.toLowerCase().includes('drawdown')
  )?.delta;
  const monthlyExpTrend = expDeltaStr ? expDeltaStr : `+₹${Math.max(1, Number((expenditure / 18).toFixed(2)))} Cr / mo`;

  const progressVsExpenditureGap = Number((physicalProgress - financialProgressPct).toFixed(1));

  return (
    <section className="space-y-4" id="prediction-parameters-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs shadow-2xs">
            02
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Prediction Parameters</span>
              <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                Multi-Factor Baseline Matrix
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Quantitative parameters mined from MoSPI DPRs, financial disbursements, and site progress audits.
            </p>
          </div>
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-1.5 self-start sm:self-auto bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
          <Info className="w-3.5 h-3.5 text-indigo-600" />
          <span>Feeds into Tri-Axis Risk Engine</span>
        </div>
      </div>

      {/* 3 Major Parameter Columns (Cost, Time, Execution) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* =========================================================
            PANEL 1: COST PARAMETERS
            ========================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Cost Parameters</h3>
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Financial Baseline</span>
                </div>
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                costIncreasePct > 15
                  ? 'bg-rose-100 text-rose-700 border border-rose-200'
                  : costIncreasePct > 0
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}>
                {costIncreasePct > 0 ? `+${costIncreasePct}% Escalation` : 'Within Budget'}
              </span>
            </div>

            {/* Parameters List */}
            <div className="divide-y divide-slate-100 text-xs mt-3">
              {/* 1. Original Cost */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Original Cost</span>
                  <span className="text-[10px] text-slate-400">CCEA / Cabinet approved outlay</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    ₹{originalCost.toLocaleString()} Cr
                  </span>
                </div>
              </div>

              {/* 2. Revised Cost */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Revised Cost</span>
                  <span className="text-[10px] text-slate-400">Current approved estimate</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    ₹{revisedCost.toLocaleString()} Cr
                  </span>
                  {costIncreaseCr > 0 && (
                    <span className="text-[10px] font-mono text-rose-600 block">
                      (+₹{costIncreaseCr.toLocaleString()} Cr)
                    </span>
                  )}
                </div>
              </div>

              {/* 3. Expenditure */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Expenditure</span>
                  <span className="text-[10px] text-slate-400">Cumulative actual drawdown to date</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-indigo-700 text-sm">
                    ₹{expenditure.toLocaleString()} Cr
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 block">
                    {financialProgressPct}% of revised
                  </span>
                </div>
              </div>

              {/* 4. Cost Increase % */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Cost Increase %</span>
                  <span className="text-[10px] text-slate-400">Approved revision vs baseline</span>
                </div>
                <div className="text-right">
                  <span className={`font-mono font-bold text-sm ${costIncreasePct > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {costIncreasePct > 0 ? `+${costIncreasePct}%` : '0.0%'}
                  </span>
                  {forecastEscalationPct > costIncreasePct && (
                    <span className="text-[10px] font-mono text-slate-400 block">
                      Proj: +{forecastEscalationPct}%
                    </span>
                  )}
                </div>
              </div>

              {/* 5. Expenditure / Progress */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Expenditure / Progress</span>
                  <span className="text-[10px] text-slate-400">Burn rate to physical output ratio</span>
                </div>
                <div className="text-right">
                  <span className={`font-mono font-bold text-sm ${
                    burnToProgressRatio > 1.15
                      ? 'text-rose-600'
                      : burnToProgressRatio < 0.85
                      ? 'text-emerald-700'
                      : 'text-slate-800'
                  }`}>
                    {burnToProgressRatio}x
                  </span>
                  <span className="text-[10px] text-slate-500 block font-mono">
                    ₹{costPerOnePctProgress} Cr / 1%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Direct Feed Link */}
          <div className="pt-3 border-t border-slate-100 bg-rose-50/40 -mx-5 -mb-5 p-3 rounded-b-2xl flex items-center justify-between text-xs">
            <span className="text-[11px] font-semibold text-rose-900 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              Direct Driver of Cost Risk:
            </span>
            <span className="font-mono font-bold text-rose-700">
              Score: {project.costRiskScore}/100
            </span>
          </div>
        </div>

        {/* =========================================================
            PANEL 2: TIME PARAMETERS
            ========================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Time Parameters</h3>
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Milestone & Commissioning</span>
                </div>
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                delayMonths > 12
                  ? 'bg-rose-100 text-rose-700 border border-rose-200'
                  : delayMonths > 0
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}>
                {delayMonths > 0 ? `+${delayMonths} Mo Slippage` : 'On Schedule'}
              </span>
            </div>

            {/* Parameters List */}
            <div className="divide-y divide-slate-100 text-xs mt-3">
              {/* 1. Original DoC */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Original DoC</span>
                  <span className="text-[10px] text-slate-400">Approved Date of Commissioning</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {originalDoC}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Initial deadline</span>
                </div>
              </div>

              {/* 2. Revised DoC */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Revised DoC</span>
                  <span className="text-[10px] text-slate-400">Anticipated commissioning target</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-amber-800 text-sm">
                    {revisedDoC}
                  </span>
                  <span className="text-[10px] text-amber-600 block">Current projection</span>
                </div>
              </div>

              {/* 3. Schedule Slippage */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Schedule Slippage</span>
                  <span className="text-[10px] text-slate-400">Cumulative delay against original</span>
                </div>
                <div className="text-right">
                  <span className={`font-mono font-bold text-sm ${delayMonths > 0 ? 'text-amber-700' : 'text-emerald-700'}`}>
                    +{delayMonths} Months
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 block">
                    (~{delayDays} calendar days)
                  </span>
                </div>
              </div>

              {/* 4. Physical Progress */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Physical Progress</span>
                  <span className="text-[10px] text-slate-400">Site civil works completed</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-indigo-700 text-sm">
                    {physicalProgress}%
                  </span>
                  <span className="text-[10px] text-slate-400 block">Audited MoSPI figure</span>
                </div>
              </div>

              {/* 5. Progress Gap */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Progress Gap</span>
                  <span className="text-[10px] text-slate-400">Expected ({expectedProgress}%) vs Actual ({physicalProgress}%)</span>
                </div>
                <div className="text-right">
                  <span className={`font-mono font-bold text-sm ${
                    progressGap > 5
                      ? 'text-rose-600'
                      : progressGap > 0
                      ? 'text-amber-700'
                      : 'text-emerald-700'
                  }`}>
                    {progressGap > 0 ? `-${progressGap}% Lag` : progressGap < 0 ? `+${Math.abs(progressGap)}% Ahead` : '0.0% Exact'}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Variance from plan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Direct Feed Link */}
          <div className="pt-3 border-t border-slate-100 bg-amber-50/40 -mx-5 -mb-5 p-3 rounded-b-2xl flex items-center justify-between text-xs">
            <span className="text-[11px] font-semibold text-amber-900 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Direct Driver of Time Risk:
            </span>
            <span className="font-mono font-bold text-amber-800">
              Score: {project.timeRiskScore}/100
            </span>
          </div>
        </div>

        {/* =========================================================
            PANEL 3: EXECUTION PARAMETERS
            ========================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Execution Parameters</h3>
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Field Velocity & Burn</span>
                </div>
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                progressVsExpenditureGap >= 0
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-100 text-rose-700 border border-rose-200'
              }`}>
                {progressVsExpenditureGap >= 0 ? 'Capital Efficient' : 'Cost Pressure'}
              </span>
            </div>

            {/* Parameters List */}
            <div className="divide-y divide-slate-100 text-xs mt-3">
              {/* 1. Physical Progress */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Physical Progress</span>
                  <span className="text-[10px] text-slate-400">Current construction stage</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {physicalProgress}%
                  </span>
                  <div className="w-20 bg-slate-100 rounded-full h-1.5 mt-1 ml-auto overflow-hidden">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{ width: `${Math.min(100, physicalProgress)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Progress Trend */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Progress Trend</span>
                  <span className="text-[10px] text-slate-400">Monthly construction velocity</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-700 text-sm flex items-center justify-end gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    {monthlyProgressTrend}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Velocity momentum</span>
                </div>
              </div>

              {/* 3. Expenditure Trend */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Expenditure Trend</span>
                  <span className="text-[10px] text-slate-400">Monthly disbursement rate</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-indigo-700 text-sm">
                    {monthlyExpTrend}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Financial cadence</span>
                </div>
              </div>

              {/* 4. Progress vs Expenditure */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Progress vs Expenditure</span>
                  <span className="text-[10px] text-slate-400">
                    Physical ({physicalProgress}%) vs Financial ({financialProgressPct}%)
                  </span>
                </div>
                <div className="text-right">
                  <span className={`font-mono font-bold text-sm ${
                    progressVsExpenditureGap >= 0 ? 'text-emerald-700' : 'text-rose-600'
                  }`}>
                    {progressVsExpenditureGap >= 0 ? `+${progressVsExpenditureGap}%` : `${progressVsExpenditureGap}%`}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {progressVsExpenditureGap >= 0 ? 'Progress leads burn' : 'Burn leads progress'}
                  </span>
                </div>
              </div>

              {/* 5. Execution Health Composite */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Contractor Stage</span>
                  <span className="text-[10px] text-slate-400">Agency: {project.implementingAgency || 'Nodal Agency'}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-slate-800 text-xs">
                    {project.stage || 'Under Construction'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 block">
                    Priority: {project.priorityScore || 45} / 100
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Direct Feed Link */}
          <div className="pt-3 border-t border-slate-100 bg-blue-50/40 -mx-5 -mb-5 p-3 rounded-b-2xl flex items-center justify-between text-xs">
            <span className="text-[11px] font-semibold text-blue-900 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Direct Driver of Execution Risk:
            </span>
            <span className="font-mono font-bold text-blue-800">
              Score: {project.executionRiskScore}/100
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
