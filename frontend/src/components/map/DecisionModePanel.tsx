import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { X, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import { ProjectGeoData } from '../../types/map';

interface DecisionModePanelProps {
  projects: ProjectGeoData[];
  onClose: () => void;
  onProjectSelect: (project: ProjectGeoData) => void;
}

export const DecisionModePanel: React.FC<DecisionModePanelProps> = ({
  projects,
  onClose,
  onProjectSelect,
}) => {
  // Calculate composite urgency score
  const prioritizedProjects = useMemo(() => {
    return projects
      .map(p => {
        // Composite score: Risk + Severity + Deterioration
        const riskScore = 100 - p.healthScore;
        const severityMultiplier = 
          p.riskLevel === 'CRITICAL' ? 1.5 :
          p.riskLevel === 'HIGH' ? 1.3 :
          p.riskLevel === 'WATCH' ? 1.1 : 1.0;
        const trendPenalty = Math.max(0, p.riskTrend);
        
        const compositeScore = (riskScore * severityMultiplier) + (trendPenalty * 2);
        
        return {
          project: p,
          compositeScore: Math.round(compositeScore),
          reason: p.riskLevel === 'CRITICAL' ? 'Critical severity with acute risk' :
                  p.riskTrend > 10 ? 'Rapidly deteriorating trajectory' :
                  p.healthScore < 40 ? 'Severe execution challenges' :
                  'High composite risk factors',
        };
      })
      .sort((a, b) => b.compositeScore - a.compositeScore)
      .slice(0, 10);
  }, [projects]);
  
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="neo-floating w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[rgba(200,212,226,0.45)] neo-surface">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl neo-raised text-rose-600">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-[var(--neo-text-primary)]">
                  DECISION MODE
                </h2>
              </div>
              <p className="text-sm text-[var(--neo-text-secondary)] ml-14">
                WHERE SHOULD WE ACT FIRST? — Ranked by composite urgency score
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
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {prioritizedProjects.map((item, index) => (
              <motion.div
                key={`${item.project.id}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-[#155EEF] dark:hover:border-indigo-600 transition-all cursor-pointer group"
                onClick={() => onProjectSelect(item.project)}
              >
                {/* Rank */}
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg ${
                    index === 0 ? 'bg-gradient-to-br from-rose-600 to-red-700' :
                    index === 1 ? 'bg-gradient-to-br from-orange-600 to-orange-700' :
                    index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700' :
                    'bg-[#0B1F3A] dark:bg-indigo-900'
                  }`}>
                    #{index + 1}
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-mono font-bold text-[#155EEF] dark:text-indigo-400">
                      {item.project.code}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getRiskColor(item.project.riskLevel)}`}>
                      {item.project.riskLevel}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0B1F3A] dark:text-white line-clamp-1 mb-1">
                    {item.project.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <AlertTriangle className="w-3 h-3" />
                    <span>{item.reason}</span>
                  </div>
                </div>
                
                {/* Scores */}
                <div className="flex-shrink-0 text-right space-y-2">
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-0.5">
                      Urgency Score
                    </div>
                    <div className="text-2xl font-black text-red-600 dark:text-red-400 font-mono">
                      {item.compositeScore}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 justify-end">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Health:</span>
                    <span className={`text-sm font-black font-mono ${
                      item.project.healthScore < 40 ? 'text-red-600' :
                      item.project.healthScore < 60 ? 'text-orange-600' :
                      'text-amber-600'
                    }`}>
                      {item.project.healthScore}
                    </span>
                  </div>
                  
                  {item.project.riskTrend > 0 && (
                    <div className="flex items-center gap-1 justify-end text-red-600 dark:text-red-400">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs font-black font-mono">
                        +{item.project.riskTrend}%
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Action Arrow */}
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-[#155EEF] text-white group-hover:bg-[#1048B5] transition-colors">
                    <span className="text-xs font-bold">Investigate →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
