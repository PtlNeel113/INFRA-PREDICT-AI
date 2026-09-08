import React from 'react';
import { MapMode } from '../../types/map';
import { Flame, AlertOctagon, Eye, CheckCircle2 } from 'lucide-react';

interface MapLegendProps {
  mode: MapMode;
  projectCount: number;
}

export const MapLegend: React.FC<MapLegendProps> = ({ mode, projectCount }) => {
  return (
    <div className="bg-white/95 dark:bg-[#0B1F3A]/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4">
      <div className="mb-3">
        <h4 className="text-xs font-black text-[#0B1F3A] dark:text-white uppercase tracking-wider mb-2">
          {mode === 'PORTFOLIO' ? 'Project Risk' : 
           mode === 'COST_RISK' ? 'Cost Risk' :
           mode === 'TIME_RISK' ? 'Time Risk' :
           mode === 'EXECUTION_RISK' ? 'Execution Risk' : 'Risk Level'}
        </h4>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Critical
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-600" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              High
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-600" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Watch
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-600" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Stable
            </span>
          </div>
        </div>
      </div>
      
      <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
        <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
          Projects Shown
        </div>
        <div className="text-lg font-black text-[#155EEF] dark:text-indigo-400 font-mono">
          {projectCount}
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
          Demo Dataset
        </div>
      </div>
    </div>
  );
};
