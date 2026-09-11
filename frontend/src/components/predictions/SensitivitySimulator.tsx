import React, { useState } from 'react';
import { Sliders, RefreshCw, AlertTriangle, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { InfraProject } from '../../types/projects';

interface SensitivitySimulatorProps {
  project: InfraProject;
}

export const SensitivitySimulator: React.FC<SensitivitySimulatorProps> = ({ project }) => {
  const [commodityInflation, setCommodityInflation] = useState<number>(0);
  const [monsoonDelayMonths, setMonsoonDelayMonths] = useState<number>(0);
  const [contractorSpeed, setContractorSpeed] = useState<number>(0); // -20 to +20%

  // Simulated calculations
  const baseCost = project.revisedCostCr || project.sanctionedCostCr || 100;
  const simulatedCostImpact = Math.round(baseCost * (commodityInflation / 100));
  const newForecastCost = (project.forecastCostCr || baseCost) + simulatedCostImpact;
  
  const baseDelay = project.predictedDelayMonths || 0;
  const speedOffset = Math.round((contractorSpeed / 20) * -2); // +20% speed reduces 2 months
  const newDelay = Math.max(0, baseDelay + monsoonDelayMonths + speedOffset);

  const baseCostRisk = project.costRiskScore || 50;
  const simulatedCostRisk = Math.min(99, Math.max(10, Math.round(baseCostRisk + (commodityInflation * 2.5))));

  const baseTimeRisk = project.timeRiskScore || 50;
  const simulatedTimeRisk = Math.min(99, Math.max(10, Math.round(baseTimeRisk + (monsoonDelayMonths * 4) - (contractorSpeed * 0.4))));

  const resetSim = () => {
    setCommodityInflation(0);
    setMonsoonDelayMonths(0);
    setContractorSpeed(0);
  };

  const hasModifications = commodityInflation !== 0 || monsoonDelayMonths !== 0 || contractorSpeed !== 0;

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-5" id="sensitivity-simulator">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <span>Interactive Prediction Sensitivity Simulator</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 font-mono">
                Real-Time Recalculation
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Stress-test project parameters against economic volatility and site execution constraints.
            </p>
          </div>
        </div>

        {hasModifications && (
          <button
            onClick={resetSim}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        )}
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Slider 1: Commodity Inflation */}
        <div className="space-y-2 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-200">Raw Material Inflation</span>
            <span className="font-mono text-indigo-300 font-bold">
              {commodityInflation > 0 ? `+${commodityInflation}%` : '0% (Baseline)'}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="12"
            step="1"
            value={commodityInflation}
            onChange={(e) => setCommodityInflation(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400">
            Simulates cement, structural steel & diesel price escalations.
          </p>
        </div>

        {/* Slider 2: Monsoon / Environmental Delays */}
        <div className="space-y-2 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-200">Monsoon / Clearance Drag</span>
            <span className="font-mono text-amber-300 font-bold">
              {monsoonDelayMonths > 0 ? `+${monsoonDelayMonths} Months` : '0 Mo (Nominal)'}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="8"
            step="1"
            value={monsoonDelayMonths}
            onChange={(e) => setMonsoonDelayMonths(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400">
            Simulates regulatory stay, flood inundation, or utility relocation lag.
          </p>
        </div>

        {/* Slider 3: Contractor Mobilization Speed */}
        <div className="space-y-2 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-200">Contractor Velocity Delta</span>
            <span className="font-mono text-emerald-300 font-bold">
              {contractorSpeed > 0 ? `+${contractorSpeed}% Fast-track` : contractorSpeed < 0 ? `${contractorSpeed}% Slowdown` : 'Baseline'}
            </span>
          </div>
          <input
            type="range"
            min="-20"
            max="20"
            step="5"
            value={contractorSpeed}
            onChange={(e) => setContractorSpeed(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400">
            Dual-shift works, extra batching plants, or workforce mobilization.
          </p>
        </div>
      </div>

      {/* Real-time Dynamic Result Strip */}
      <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div>
          <span className="text-[10px] uppercase font-mono text-slate-400 block">Simulated Final Outlay</span>
          <strong className="text-base font-bold text-rose-400 font-mono">
            ₹{newForecastCost.toLocaleString()} Cr
          </strong>
          <span className="text-[10px] text-slate-500 block">
            {simulatedCostImpact > 0 ? `+₹${simulatedCostImpact} Cr impact` : 'No additional cost'}
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase font-mono text-slate-400 block">Simulated Slippage</span>
          <strong className="text-base font-bold text-amber-400 font-mono">
            +{newDelay} Months
          </strong>
          <span className="text-[10px] text-slate-500 block">
            vs {baseDelay} Mo baseline
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase font-mono text-slate-400 block">Simulated Cost Risk</span>
          <strong className="text-base font-bold text-slate-100 font-mono">
            {simulatedCostRisk} / 100
          </strong>
          <span className="text-[10px] text-slate-500 block">
            {simulatedCostRisk > baseCostRisk ? `+${simulatedCostRisk - baseCostRisk} pts` : 'No change'}
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase font-mono text-slate-400 block">Simulated Time Risk</span>
          <strong className="text-base font-bold text-slate-100 font-mono">
            {simulatedTimeRisk} / 100
          </strong>
          <span className="text-[10px] text-slate-500 block">
            {simulatedTimeRisk > baseTimeRisk ? `+${simulatedTimeRisk - baseTimeRisk} pts` : simulatedTimeRisk < baseTimeRisk ? `${simulatedTimeRisk - baseTimeRisk} pts` : 'No change'}
          </span>
        </div>
      </div>
    </div>
  );
};
