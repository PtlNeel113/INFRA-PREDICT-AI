import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { X, ArrowRight, TrendingUp } from 'lucide-react';
import { ProjectGeoData, MapMode } from '../../types/map';

interface ProjectTooltipProps {
  project: ProjectGeoData;
  position: { x: number; y: number };
  mode: MapMode;
  onClose: () => void;
}

export const ProjectTooltip: React.FC<ProjectTooltipProps> = ({
  project,
  position,
  mode,
  onClose,
}) => {
  const navigate = useNavigate();
  
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-700 bg-red-50 border-red-200';
      case 'HIGH': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'WATCH': return 'text-amber-700 bg-amber-50 border-amber-200';
      default: return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      className="fixed z-50 pointer-events-auto"
      style={{
        left: position.x,
        top: position.y - 10,
        transform: 'translate(-50%, -100%)',
        maxWidth: '320px',
      }}
    >
      <div className="bg-white dark:bg-[#0B1F3A] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-[#155EEF] dark:text-indigo-400">
                  {project.code}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getRiskColor(project.riskLevel)}`}>
                  {project.riskLevel}
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#0B1F3A] dark:text-white line-clamp-2">
                {project.name}
              </h4>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Health Score */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Health Score
            </span>
            <span className={`text-lg font-black font-mono ${
              project.healthScore < 40 ? 'text-red-600' :
              project.healthScore < 60 ? 'text-orange-600' :
              project.healthScore < 75 ? 'text-amber-600' :
              'text-emerald-600'
            }`}>
              {project.healthScore} / 100
            </span>
          </div>
          
          {/* Risk Scores Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                Cost Risk
              </div>
              <div className="text-sm font-black text-[#0B1F3A] dark:text-white font-mono">
                {project.costRiskScore}
              </div>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                Time Risk
              </div>
              <div className="text-sm font-black text-[#0B1F3A] dark:text-white font-mono">
                {project.timeRiskScore}
              </div>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                Exec Risk
              </div>
              <div className="text-sm font-black text-[#0B1F3A] dark:text-white font-mono">
                {project.executionRiskScore}
              </div>
            </div>
          </div>
          
          {/* Risk Trend */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Risk Trend
            </span>
            <div className={`flex items-center gap-1 ${project.riskTrend > 0 ? 'text-red-600' : project.riskTrend < 0 ? 'text-emerald-600' : 'text-slate-600'}`}>
              <TrendingUp className={`w-3.5 h-3.5 ${project.riskTrend < 0 ? 'rotate-180' : ''}`} />
              <span className="text-sm font-bold font-mono">
                {project.riskTrend > 0 ? '+' : ''}{project.riskTrend}%
              </span>
            </div>
          </div>
          
          {/* Top Driver */}
          <div>
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
              Top Risk Driver
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2">
              {project.primaryRiskDriver}
            </p>
          </div>
          
          {/* Action Button */}
          <button
            type="button"
            onClick={() => navigate(`/projects/${project.id}`)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#155EEF] hover:bg-[#1048B5] text-white text-sm font-bold shadow-md transition-all group"
          >
            <span>View Project Intelligence</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      
      {/* Pointer arrow */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full">
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-[#0B1F3A]" />
      </div>
    </motion.div>
  );
};
