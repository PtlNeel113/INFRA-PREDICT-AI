import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectGeoData } from '../../types/map';
import { calculateRiskIntelligence } from '../../data/mapData';
import { Flame, AlertOctagon, Eye, CheckCircle2, TrendingUp, ArrowRight, MapPin } from 'lucide-react';

interface RiskIntelligencePanelProps {
  projects: ProjectGeoData[];
  onProjectSelect: (project: ProjectGeoData) => void;
}

export const RiskIntelligencePanel: React.FC<RiskIntelligencePanelProps> = ({
  projects,
  onProjectSelect,
}) => {
  const navigate = useNavigate();
  const intelligence = calculateRiskIntelligence(projects);
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white dark:bg-[#0F1D2E] rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        <h3 className="text-sm font-black text-[#0B1F3A] dark:text-white uppercase tracking-wider mb-3">
          Risk Intelligence
        </h3>
        
        {/* Risk Counts */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-xs font-bold text-red-700 dark:text-red-400 uppercase">Critical</span>
            </div>
            <span className="text-lg font-black text-red-700 dark:text-red-400 font-mono">
              {intelligence.critical}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-2 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase">High</span>
            </div>
            <span className="text-lg font-black text-orange-700 dark:text-orange-400 font-mono">
              {intelligence.high}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase">Watch</span>
            </div>
            <span className="text-lg font-black text-amber-700 dark:text-amber-400 font-mono">
              {intelligence.watch}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">Stable</span>
            </div>
            <span className="text-lg font-black text-emerald-700 dark:text-emerald-400 font-mono">
              {intelligence.stable}
            </span>
          </div>
        </div>
      </div>
      
      {/* Top Risk States */}
      <div className="bg-white dark:bg-[#0F1D2E] rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        <h4 className="text-xs font-black text-[#0B1F3A] dark:text-white uppercase tracking-wider mb-3">
          Top Risk States
        </h4>
        
        <div className="space-y-2">
          {intelligence.topRiskStates.slice(0, 5).map((state, index) => (
            <div
              key={state.state}
              className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded bg-[#0B1F3A] dark:bg-indigo-900 text-white flex items-center justify-center text-xs font-black">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
                  {state.state}
                </div>
              </div>
              <div className="text-sm font-black text-red-600 dark:text-red-400 font-mono">
                {state.score}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Fastest Deteriorating */}
      <div className="bg-white dark:bg-[#0F1D2E] rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        <h4 className="text-xs font-black text-[#0B1F3A] dark:text-white uppercase tracking-wider mb-3">
          Fastest Deteriorating
        </h4>
        
        <div className="space-y-2">
          {intelligence.fastestDeteriorating.slice(0, 3).map((project) => {
            const fullProject = projects.find(p => p.code === project.code);
            return (
              <div
                key={project.code}
                className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                onClick={() => fullProject && onProjectSelect(fullProject)}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-[#155EEF] dark:text-indigo-400">
                    {project.code}
                  </span>
                  <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs font-black font-mono">
                      +{project.trend}%
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1">
                  {project.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Action Button */}
      <button
        type="button"
        onClick={() => navigate('/alerts')}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#155EEF] to-[#0E7490] hover:from-[#1048B5] hover:to-[#0C5F75] text-white text-sm font-bold shadow-lg transition-all group"
      >
        <span>Open Early Warning Center</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
