import React from 'react';
import { motion } from 'motion/react';
import { X, TrendingUp, Building2, AlertTriangle, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { StateGeoSummary, ProjectGeoData } from '../../types/map';
import { PROJECT_GEO_DATA } from '../../data/mapData';
import { PAIMANA_PRIORITY_PROJECTS } from '../../data/paimanaData';

interface StateDrawerProps {
  state: StateGeoSummary;
  onClose: () => void;
  onProjectSelect: (project: ProjectGeoData) => void;
}

export const StateDrawer: React.FC<StateDrawerProps> = ({
  state,
  onClose,
  onProjectSelect,
}) => {
  // Find projects matching this state
  const stateProjects = PROJECT_GEO_DATA.filter(
    (p) => p.state.toLowerCase() === state.name.toLowerCase()
  );

  const priorityMatches = PAIMANA_PRIORITY_PROJECTS.filter(
    (p) => p.state.toLowerCase() === state.name.toLowerCase()
  );

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'text-red-700 bg-red-50 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900';
      case 'HIGH':
        return 'text-orange-700 bg-orange-50 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-900';
      case 'WATCH':
        return 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-900';
      default:
        return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900';
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-[var(--neo-surface)] border-l border-[rgba(200,212,226,0.5)] shadow-[-8px_0_24px_rgba(166,180,200,0.35)] z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-[var(--neo-surface)] border-b border-[rgba(200,212,226,0.45)] p-6 z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-mono font-black px-2.5 py-1 neo-raised text-[#1557D6] rounded-lg">
                {state.shortCode}
              </span>
              <h2 className="text-xl font-black text-[var(--neo-text-primary)] tracking-tight">
                {state.name}
              </h2>
            </div>
            <p className="text-xs text-[var(--neo-text-secondary)]">
              National Infrastructure Risk Intelligence Dossier
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 neo-raised rounded-xl transition-all cursor-pointer hover:translate-y-[-1px]"
          >
            <X className="w-5 h-5 text-[var(--neo-text-tertiary)]" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Severity Banner */}
        <div
          className={`p-4 rounded-xl border ${
            state.riskSeverity === 'CRITICAL'
              ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 text-red-900 dark:text-red-200'
              : state.riskSeverity === 'HIGH'
              ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900 text-orange-900 dark:text-orange-200'
              : state.riskSeverity === 'WATCH'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200'
              : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider">
              Composite State Risk Status
            </span>
            <span className="text-xs font-black px-2 py-0.5 rounded uppercase">
              {state.riskSeverity || 'STABLE'}
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono">{state.riskIndex || 0}</span>
            <span className="text-xs font-bold opacity-80">/ 100 Risk Index</span>
          </div>
        </div>

        {/* Financial & Physical Outlays */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">
              Monitored Projects
            </div>
            <div className="text-2xl font-black text-[#0B1F3A] dark:text-white font-mono">
              {state.projectCount}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">
              Avg Physical Progress
            </div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {state.averagePhysicalProgress ? `${state.averagePhysicalProgress}%` : 'N/A'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">
              Sanctioned Outlay
            </div>
            <div className="text-base font-black text-slate-800 dark:text-slate-200 font-mono">
              {state.totalOriginalCostCr
                ? `₹${(state.totalOriginalCostCr / 1000).toFixed(1)}K Cr`
                : 'N/A'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">
              Revised Outlay
            </div>
            <div className="text-base font-black text-amber-600 dark:text-amber-400 font-mono">
              {state.totalRevisedCostCr
                ? `₹${(state.totalRevisedCostCr / 1000).toFixed(1)}K Cr`
                : 'N/A'}
            </div>
          </div>
        </div>

        {/* Risk Breakdown Counts */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900">
            <div className="text-[9px] font-bold text-red-600 uppercase">Critical</div>
            <div className="text-lg font-black text-red-700 dark:text-red-400 font-mono">
              {state.criticalCount}
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900">
            <div className="text-[9px] font-bold text-orange-600 uppercase">High</div>
            <div className="text-lg font-black text-orange-700 dark:text-orange-400 font-mono">
              {state.highCount}
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
            <div className="text-[9px] font-bold text-amber-600 uppercase">Watch</div>
            <div className="text-lg font-black text-amber-700 dark:text-amber-400 font-mono">
              {state.watchCount}
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
            <div className="text-[9px] font-bold text-emerald-600 uppercase">Stable</div>
            <div className="text-lg font-black text-emerald-700 dark:text-emerald-400 font-mono">
              {state.stableCount}
            </div>
          </div>
        </div>

        {/* Primary State Risk Driver */}
        {state.topRiskDriver && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Primary Systemic Bottleneck
            </span>
            <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              "{state.topRiskDriver}"
            </p>
          </div>
        )}

        {/* Top Projects Requiring Attention */}
        <div>
          <h3 className="text-xs font-black text-[#0B1F3A] dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span>Priority Projects in {state.name}</span>
          </h3>

          <div className="space-y-2.5">
            {priorityMatches.length > 0 ? (
              priorityMatches.map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  onClick={() => {
                    const full = stateProjects.find((p) => p.code === project.code);
                    if (full) onProjectSelect(full);
                  }}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#155EEF] transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#155EEF]">
                          {project.code}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase ${getRiskColor(
                            project.riskLevel
                          )}`}
                        >
                          {project.riskLevel}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-1 line-clamp-1">
                        {project.name}
                      </h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#155EEF] group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 italic">
                    "{project.keySignal}"
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-slate-500 text-xs">
                No high-risk priority projects flagged for {state.name} in this reporting period.
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
