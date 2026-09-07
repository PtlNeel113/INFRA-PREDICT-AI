import React from 'react';
import { motion } from 'motion/react';
import { X, TrendingUp, Building2, AlertTriangle, ArrowRight } from 'lucide-react';
import { StateGeoSummary, ProjectGeoData } from '../../types/map';
import { PROJECT_GEO_DATA } from '../../data/mapData';

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
  const stateProjects = PROJECT_GEO_DATA.filter(p => p.state === state.name);
  
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-700 bg-red-50 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900';
      case 'HIGH': return 'text-orange-700 bg-orange-50 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-900';
      case 'WATCH': return 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-900';
      default: return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900';
    }
  };
  
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-white dark:bg-[#0F1D2E] border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-[#0F1D2E] border-b border-slate-200 dark:border-slate-800 p-6 z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-mono font-black px-2 py-1 bg-[#155EEF] text-white rounded">
                {state.shortCode}
              </span>
              <h2 className="text-xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
                {state.name}
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Infrastructure Risk Intelligence
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Portfolio Health */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40 border border-indigo-100 dark:border-indigo-900">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
            Portfolio Health
          </div>
          <div className="flex items-end gap-2">
            <div className="text-4xl font-black text-[#0B1F3A] dark:text-white font-mono">
              {state.portfolioHealth}
            </div>
            <div className="text-lg text-indigo-600 dark:text-indigo-400 font-bold mb-1">
              / 100
            </div>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
              Total Projects
            </div>
            <div className="text-2xl font-black text-[#0B1F3A] dark:text-white font-mono">
              {state.projectCount}
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900">
            <div className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase mb-1">
              Critical
            </div>
            <div className="text-2xl font-black text-red-700 dark:text-red-400 font-mono">
              {state.criticalCount}
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900">
            <div className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase mb-1">
              High
            </div>
            <div className="text-2xl font-black text-orange-700 dark:text-orange-400 font-mono">
              {state.highCount}
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
            <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase mb-1">
              Watch
            </div>
            <div className="text-2xl font-black text-amber-700 dark:text-amber-400 font-mono">
              {state.watchCount}
            </div>
          </div>
        </div>
        
        {/* Risk Trend */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Risk Trend
            </span>
            <div className={`flex items-center gap-2 ${state.riskTrend > 0 ? 'text-red-600' : state.riskTrend < 0 ? 'text-emerald-600' : 'text-slate-600'}`}>
              <TrendingUp className={`w-4 h-4 ${state.riskTrend < 0 ? 'rotate-180' : ''}`} />
              <span className="text-xl font-black font-mono">
                {state.riskTrend > 0 ? '+' : ''}{state.riskTrend}%
              </span>
            </div>
          </div>
        </div>
        
        {/* Top Projects Requiring Attention */}
        <div>
          <h3 className="text-sm font-black text-[#0B1F3A] dark:text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Top Projects Requiring Attention
          </h3>
          
          <div className="space-y-2">
            {state.topProjects.length > 0 ? (
              state.topProjects.map((project, index) => {
                const fullProject = stateProjects.find(p => p.code === project.code);
                return (
                  <motion.div
                    key={project.code}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#155EEF] dark:hover:border-indigo-600 transition-all cursor-pointer group"
                    onClick={() => fullProject && onProjectSelect(fullProject)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-[#0B1F3A] dark:bg-indigo-900 text-white flex items-center justify-center text-xs font-black">
                        {index + 1}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-[#155EEF] dark:text-indigo-400">
                            {project.code}
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${getRiskColor(project.riskLevel)}`}>
                            {project.riskLevel}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2">
                          {project.name}
                        </p>
                      </div>
                      
                      <div className="flex-shrink-0 text-right">
                        <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-0.5">
                          Health
                        </div>
                        <div className={`text-sm font-black font-mono ${
                          project.healthScore < 40 ? 'text-red-600' :
                          project.healthScore < 60 ? 'text-orange-600' :
                          project.healthScore < 75 ? 'text-amber-600' :
                          'text-emerald-600'
                        }`}>
                          {project.healthScore}
                        </div>
                      </div>
                      
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#155EEF] dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
                No projects in this state
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
