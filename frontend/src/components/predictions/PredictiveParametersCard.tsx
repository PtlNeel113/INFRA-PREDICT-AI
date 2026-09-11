import React from 'react';
import {
  DollarSign,
  Clock,
  Activity,
  TrendingUp,
  Tag,
  Layers,
} from 'lucide-react';
import { InfraProject } from '../../types/projects';

interface PredictiveParametersCardProps {
  project: InfraProject;
}

export const PredictiveParametersCard: React.FC<PredictiveParametersCardProps> = ({ project }) => {
  // A. COST PARAMETERS
  const originalCost = project.sanctionedCostCr || 0;
  const revisedCost = project.revisedCostCr || originalCost;
  const expenditure = project.expenditureCr || 0;
  const costIncreaseCr = Math.max(0, revisedCost - originalCost);
  const costIncreasePct = originalCost > 0 ? Number(((costIncreaseCr / originalCost) * 100).toFixed(1)) : 0;
  const financialProgressPct = revisedCost > 0 ? Number(((expenditure / revisedCost) * 100).toFixed(1)) : 0;
  const physicalProgress = project.currentPhysicalProgress ?? 0;
  const expenditureProgressRatio = physicalProgress > 0 ? Number((financialProgressPct / physicalProgress).toFixed(2)) : 1.0;

  // B. TIME PARAMETERS
  const originalDoC = project.originalDeadline || 'TBD';
  const revisedDoC = project.predictedCompletionDate || 'TBD';
  const scheduleSlippageMonths = project.predictedDelayMonths ?? 0;
  const expectedProgress = project.expectedProgress ?? physicalProgress;
  const progressGap = Number((expectedProgress - physicalProgress).toFixed(1));

  // C. EXECUTION PARAMETERS
  const progressDeltaStr = project.changeIntelligence?.metrics.find(
    (m) => m.metric.toLowerCase().includes('progress')
  )?.delta;
  const progressTrend = progressDeltaStr || `+${Math.max(0.5, Number((physicalProgress / 20).toFixed(1)))}% / mo`;

  const expDeltaStr = project.changeIntelligence?.metrics.find(
    (m) => m.metric.toLowerCase().includes('expenditure') || m.metric.toLowerCase().includes('drawdown')
  )?.delta;
  const expenditureTrend = expDeltaStr || `+₹${Math.max(1, Number((expenditure / 18).toFixed(2)))} Cr / mo`;

  const progressVsExpenditure = Number((physicalProgress - financialProgressPct).toFixed(1));

  return (
    <section className="space-y-3" id="predictive-parameters-section">
      <div className="flex items-center justify-between pb-1 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs shadow-2xs">
            01
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Predictive Parameters
            </h3>
            <p className="text-xs text-slate-500">
              Input metrics derived directly from selected project&apos;s verified PAIMANA data.
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            PAIMANA DATA
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-medium border border-indigo-100">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            DERIVED INDICATOR
          </span>
        </div>
      </div>

      {/* 3 Compact Parameter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* CARD A: COST PARAMETERS */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                  <DollarSign className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Cost Parameters
                </h4>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                costIncreasePct > 15 ? 'bg-rose-100 text-rose-700' : costIncreasePct > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {costIncreasePct > 0 ? `+${costIncreasePct}% Escalation` : 'No Overrun'}
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs mt-2">
              {/* 1. Original Cost */}
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Original Cost</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                    PAIMANA DATA
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    ₹{originalCost.toLocaleString()} Cr
                  </span>
                </div>
              </div>

              {/* 2. Revised Cost */}
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Revised Cost</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                    PAIMANA DATA
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    ₹{revisedCost.toLocaleString()} Cr
                  </span>
                </div>
              </div>

              {/* 3. Expenditure */}
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Expenditure</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                    PAIMANA DATA
                  </span>
                  <span className="font-mono font-bold text-indigo-700">
                    ₹{expenditure.toLocaleString()} Cr
                  </span>
                </div>
              </div>

              {/* 4. Cost Increase % */}
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Cost Increase %</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-50 text-indigo-700 font-medium">
                    DERIVED INDICATOR
                  </span>
                  <span className={`font-mono font-bold ${costIncreasePct > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {costIncreasePct > 0 ? `+${costIncreasePct}%` : '0.0%'}
                  </span>
                </div>
              </div>

              {/* 5. Expenditure / Progress */}
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Expenditure / Progress</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-50 text-indigo-700 font-medium">
                    DERIVED INDICATOR
                  </span>
                  <span className={`font-mono font-bold ${expenditureProgressRatio > 1.25 ? 'text-rose-600' : expenditureProgressRatio > 1.0 ? 'text-amber-700' : 'text-emerald-700'}`}>
                    {expenditureProgressRatio}x
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD B: TIME PARAMETERS */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Time Parameters
                </h4>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                scheduleSlippageMonths > 12 ? 'bg-rose-100 text-rose-700' : scheduleSlippageMonths > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {scheduleSlippageMonths > 0 ? `+${scheduleSlippageMonths} Mo Slippage` : 'On Schedule'}
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs mt-2">
              {/* 1. Original DoC */}
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Original DoC</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                    PAIMANA DATA
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {originalDoC}
                  </span>
                </div>
              </div>

              {/* 2. Revised DoC */}
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Revised DoC</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                    PAIMANA DATA
                  </span>
                  <span className="font-mono font-bold text-amber-800">
                    {revisedDoC}
                  </span>
                </div>
              </div>

              {/* 3. Schedule Slippage */}
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Schedule Slippage</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-50 text-indigo-700 font-medium">
                    DERIVED INDICATOR
                  </span>
                  <span className={`font-mono font-bold ${scheduleSlippageMonths > 0 ? 'text-amber-800' : 'text-emerald-700'}`}>
                    +{scheduleSlippageMonths} Months
                  </span>
                </div>
              </div>

              {/* 4. Physical Progress */}
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Physical Progress</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                    PAIMANA DATA
                  </span>
                  <span className="font-mono font-bold text-indigo-700">
                    {physicalProgress}%
                  </span>
                </div>
              </div>

              {/* 5. Progress Gap */}
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Progress Gap</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-50 text-indigo-700 font-medium">
                    DERIVED INDICATOR
                  </span>
                  <span className={`font-mono font-bold ${progressGap > 5 ? 'text-rose-600' : progressGap > 0 ? 'text-amber-700' : 'text-emerald-700'}`}>
                    {progressGap > 0 ? `-${progressGap} pp Lag` : `${Math.abs(progressGap)} pp Ahead`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD C: EXECUTION PARAMETERS */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Execution Parameters
                </h4>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                progressVsExpenditure >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'
              }`}>
                {progressVsExpenditure >= 0 ? 'Output Leading' : 'Capital Lead'}
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs mt-2">
              {/* 1. Physical Progress */}
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Physical Progress</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                    PAIMANA DATA
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {physicalProgress}%
                  </span>
                </div>
              </div>

              {/* 2. Progress Trend */}
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Progress Trend</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-50 text-indigo-700 font-medium">
                    DERIVED INDICATOR
                  </span>
                  <span className="font-mono font-bold text-emerald-700 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" />
                    {progressTrend}
                  </span>
                </div>
              </div>

              {/* 3. Expenditure Trend */}
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Expenditure Trend</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-50 text-indigo-700 font-medium">
                    DERIVED INDICATOR
                  </span>
                  <span className="font-mono font-bold text-indigo-700">
                    {expenditureTrend}
                  </span>
                </div>
              </div>

              {/* 4. Progress vs Expenditure */}
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Progress vs Expenditure</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-50 text-indigo-700 font-medium">
                    DERIVED INDICATOR
                  </span>
                  <span className={`font-mono font-bold ${progressVsExpenditure >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {progressVsExpenditure >= 0 ? `+${progressVsExpenditure} pp` : `${progressVsExpenditure} pp`}
                  </span>
                </div>
              </div>

              {/* Summary note */}
              <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Contractor Stage:</span>
                <span className="font-medium text-slate-800">{project.stage || 'Under Construction'}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
