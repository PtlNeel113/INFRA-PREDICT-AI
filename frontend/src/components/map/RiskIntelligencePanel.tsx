import React from 'react';
import { StateGeoSummary, ReportingPeriod } from '../../types/map';
import { StateRiskRanking, NationalKPISummary } from '../../data/paimanaDataService';
import {
  Flame,
  AlertOctagon,
  Eye,
  CheckCircle2,
  MapPin,
  TrendingUp,
  X,
  ChevronRight,
  ShieldAlert,
  SlidersHorizontal,
} from 'lucide-react';

interface RiskIntelligencePanelProps {
  kpiSummary: NationalKPISummary;
  topRiskStates: StateRiskRanking[];
  selectedStateSummary: StateGeoSummary | null;
  onSelectState: (state: StateGeoSummary | null) => void;
  reportingPeriod: ReportingPeriod;
  activeRiskFilter?: string;
  onSelectRiskFilter?: (filter: string) => void;
}

export const RiskIntelligencePanel: React.FC<RiskIntelligencePanelProps> = ({
  kpiSummary,
  topRiskStates,
  selectedStateSummary,
  onSelectState,
  reportingPeriod,
  activeRiskFilter = 'ALL',
  onSelectRiskFilter,
}) => {
  return (
    <div className="space-y-4">
      {/* If a state is selected: Focused State Intelligence Card */}
      {selectedStateSummary && (
        <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1E3A8A] text-white rounded-2xl p-4 shadow-lg border border-blue-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between gap-2 pb-3 border-b border-blue-400/20">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-300">
                State Focus
              </span>
              <h3 className="text-base font-black tracking-tight text-white flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{selectedStateSummary.name}</span>
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onSelectState(null)}
              className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Deselect state"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-white/5 rounded-lg p-2 border border-white/10">
              <span className="text-blue-200 block text-[10px]">Monitored Projects</span>
              <span className="text-base font-black text-white font-mono">
                {selectedStateSummary.projectCount}
              </span>
            </div>
            <div className="bg-white/5 rounded-lg p-2 border border-white/10">
              <span className="text-blue-200 block text-[10px]">High Priority / Critical</span>
              <span className="text-base font-black text-rose-300 font-mono">
                {selectedStateSummary.criticalCount + selectedStateSummary.highCount}
              </span>
            </div>
            <div className="bg-white/5 rounded-lg p-2 border border-white/10">
              <span className="text-blue-200 block text-[10px]">Original Outlay</span>
              <span className="font-bold text-white font-mono">
                {selectedStateSummary.totalOriginalCostCr
                  ? `₹${(selectedStateSummary.totalOriginalCostCr / 1000).toFixed(1)}K Cr`
                  : 'N/A'}
              </span>
            </div>
            <div className="bg-white/5 rounded-lg p-2 border border-white/10">
              <span className="text-blue-200 block text-[10px]">Avg Progress</span>
              <span className="font-bold text-emerald-300 font-mono">
                {selectedStateSummary.averagePhysicalProgress
                  ? `${selectedStateSummary.averagePhysicalProgress}%`
                  : 'N/A'}
              </span>
            </div>
          </div>

          {selectedStateSummary.topRiskDriver && (
            <div className="mt-3 pt-2.5 border-t border-blue-400/20 text-[11px]">
              <span className="text-blue-300 text-[10px] block font-bold uppercase tracking-wider">
                Critical Risk Driver
              </span>
              <p className="text-blue-100 text-[11px] leading-relaxed mt-0.5 italic">
                "{selectedStateSummary.topRiskDriver}"
              </p>
            </div>
          )}
        </div>
      )}

      {/* Risk Distribution Breakdown */}
      <div className="neo-panel p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-black text-[var(--neo-text-primary)] uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#1557D6]" />
            <span>Risk Intelligence</span>
          </h3>
          <span className="text-[10px] font-mono font-bold text-[var(--neo-text-tertiary)]">
            {reportingPeriod}
          </span>
        </div>

        <div className="space-y-2">
          {/* Critical */}
          <button
            type="button"
            onClick={() => onSelectRiskFilter && onSelectRiskFilter('CRITICAL')}
            className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
              activeRiskFilter === 'CRITICAL'
                ? 'neo-inset border-red-400/80 bg-red-50/50'
                : 'neo-card hover:translate-y-[-1px] border-l-4 border-l-red-600'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs">
                <Flame className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-red-950 dark:text-red-200 block uppercase">
                  Critical
                </span>
                <span className="text-[10px] text-red-700 dark:text-red-400">
                  Immediate cabinet review
                </span>
              </div>
            </div>
            <span className="text-lg font-black text-red-600 dark:text-red-400 font-mono">
              {kpiSummary.criticalCount}
            </span>
          </button>

          {/* High */}
          <button
            type="button"
            onClick={() => onSelectRiskFilter && onSelectRiskFilter('HIGH')}
            className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
              activeRiskFilter === 'HIGH'
                ? 'neo-inset border-orange-400/80 bg-orange-50/50'
                : 'neo-card hover:translate-y-[-1px] border-l-4 border-l-orange-500'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center shadow-xs">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-orange-950 dark:text-orange-200 block uppercase">
                  High
                </span>
                <span className="text-[10px] text-orange-700 dark:text-orange-400">
                  Substantial slippage / delay
                </span>
              </div>
            </div>
            <span className="text-lg font-black text-orange-600 dark:text-orange-400 font-mono">
              {kpiSummary.highCount}
            </span>
          </button>

          {/* Watch */}
          <button
            type="button"
            onClick={() => onSelectRiskFilter && onSelectRiskFilter('WATCH')}
            className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
              activeRiskFilter === 'WATCH'
                ? 'neo-inset border-amber-400/80 bg-amber-50/50'
                : 'neo-card hover:translate-y-[-1px] border-l-4 border-l-amber-500'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center shadow-xs">
                <Eye className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-amber-950 dark:text-amber-200 block uppercase">
                  Watch
                </span>
                <span className="text-[10px] text-amber-700 dark:text-amber-400">
                  Critical path monitoring
                </span>
              </div>
            </div>
            <span className="text-lg font-black text-amber-600 dark:text-amber-400 font-mono">
              {kpiSummary.watchCount}
            </span>
          </button>

          {/* Stable */}
          <button
            type="button"
            onClick={() => onSelectRiskFilter && onSelectRiskFilter('STABLE')}
            className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
              activeRiskFilter === 'STABLE'
                ? 'neo-inset border-emerald-400/80 bg-emerald-50/50'
                : 'neo-card hover:translate-y-[-1px] border-l-4 border-l-emerald-500'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200 block uppercase">
                  Stable
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400">
                  Executing to baseline
                </span>
              </div>
            </div>
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {kpiSummary.stableCount}
            </span>
          </button>
        </div>
      </div>

      {/* Dynamically Calculated Top Risk States (Step 15) */}
      <div className="neo-panel p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-black text-[var(--neo-text-primary)] uppercase tracking-wider">
            Top Risk States
          </h4>
          <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)]">
            By High Priority
          </span>
        </div>

        <div className="space-y-2">
          {topRiskStates.map((state, index) => {
            const isSelected = selectedStateSummary?.name === state.stateName;

            return (
              <button
                key={state.mapId || state.stateName}
                type="button"
                onClick={() => {
                  if (isSelected) {
                    onSelectState(null);
                  } else {
                    onSelectState({
                      name: state.stateName,
                      shortCode: state.shortCode,
                      mapId: state.mapId,
                      projectCount: state.totalProjects,
                      criticalCount: Math.round(state.highPriorityCount * 0.35),
                      highCount: Math.round(state.highPriorityCount * 0.65),
                      watchCount: Math.round(state.totalProjects * 0.4),
                      stableCount: Math.max(0, state.totalProjects - state.highPriorityCount - Math.round(state.totalProjects * 0.4)),
                      portfolioHealth: 100 - state.riskIndex,
                      riskTrend: 5,
                      riskSeverity: state.riskSeverity,
                      riskIndex: state.riskIndex,
                      averagePhysicalProgress: state.avgPhysicalProgress,
                      topRiskDriver: state.topRiskDriver,
                      topProjects: [],
                    });
                  }
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'neo-inset text-[#1557D6]'
                    : 'neo-card hover:translate-y-[-1px]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                      index === 0
                        ? 'bg-red-600 text-white'
                        : index === 1
                        ? 'bg-orange-600 text-white'
                        : index === 2
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-700 text-white'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                      {state.stateName}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      {state.totalProjects} total projects
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="text-right">
                    <span className="text-xs font-black text-red-600 dark:text-red-400 font-mono block">
                      {state.highPriorityCount}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">
                      High Priority
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
