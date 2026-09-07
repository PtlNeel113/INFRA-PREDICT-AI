import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowRight } from 'lucide-react';

interface ProjectNodeTooltipProps {
  node: {
    id: string;
    name: string;
    health: number;
    costRisk: number;
    timeRisk: number;
    executionRisk: number;
    riskLevel: 'STABLE' | 'WATCH' | 'HIGH' | 'CRITICAL';
  };
  position: { x: number; y: number };
}

export const ProjectNodeTooltip: React.FC<ProjectNodeTooltipProps> = ({ node, position }) => {
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
        left: position.x + 20,
        top: position.y - 100,
        maxWidth: '280px',
      }}
    >
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Project Intelligence
                </span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase ${getRiskColor(node.riskLevel)}`}>
                  {node.riskLevel}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                {node.name}
              </h4>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-3 space-y-2">
          {/* Health Score */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Health Score
            </span>
            <span className={`text-base font-black font-mono ${
              node.health < 40 ? 'text-red-600' :
              node.health < 60 ? 'text-orange-600' :
              node.health < 75 ? 'text-amber-600' :
              'text-emerald-600'
            }`}>
              {node.health} / 100
            </span>
          </div>
          
          {/* Risk Scores */}
          <div className="grid grid-cols-3 gap-1.5">
            <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-800 text-center">
              <div className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-0.5">
                Cost Risk
              </div>
              <div className="text-xs font-black text-slate-900 dark:text-white font-mono">
                {node.costRisk}
              </div>
            </div>
            <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-800 text-center">
              <div className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-0.5">
                Time Risk
              </div>
              <div className="text-xs font-black text-slate-900 dark:text-white font-mono">
                {node.timeRisk}
              </div>
            </div>
            <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-800 text-center">
              <div className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-0.5">
                Exec Risk
              </div>
              <div className="text-xs font-black text-slate-900 dark:text-white font-mono">
                {node.executionRisk}
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <button
            type="button"
            onClick={() => navigate('/projects/demo-project')}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow transition-all group"
          >
            <span>Explore Project</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
      
      {/* Pointer arrow */}
      <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2">
        <div className="w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-white dark:border-r-slate-900" />
      </div>
    </motion.div>
  );
};
