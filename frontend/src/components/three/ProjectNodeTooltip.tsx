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
      <div className="neo-panel rounded-2xl shadow-[8px_8px_20px_rgba(150,168,192,0.5),-8px_-8px_20px_rgba(255,255,255,0.98)] border border-[rgba(255,255,255,0.9)] overflow-hidden">
        {/* Header */}
        <div className="p-3 bg-[rgba(240,244,249,0.7)] border-b border-[rgba(190,205,222,0.4)]">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black text-[#1557D6] uppercase tracking-wider">
                  Project Intelligence
                </span>
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md border uppercase ${getRiskColor(node.riskLevel)}`}>
                  {node.riskLevel}
                </span>
              </div>
              <h4 className="text-xs font-black text-[var(--neo-text-primary)] line-clamp-2">
                {node.name}
              </h4>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-3 space-y-2.5">
          {/* Health Score */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--neo-text-secondary)]">
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
            <div className="p-1.5 rounded-xl neo-inset text-center">
              <div className="text-[9px] font-black text-[var(--neo-text-tertiary)] uppercase mb-0.5">
                Cost Risk
              </div>
              <div className="text-xs font-black text-[var(--neo-text-primary)] font-mono">
                {node.costRisk}
              </div>
            </div>
            <div className="p-1.5 rounded-xl neo-inset text-center">
              <div className="text-[9px] font-black text-[var(--neo-text-tertiary)] uppercase mb-0.5">
                Time Risk
              </div>
              <div className="text-xs font-black text-[var(--neo-text-primary)] font-mono">
                {node.timeRisk}
              </div>
            </div>
            <div className="p-1.5 rounded-xl neo-inset text-center">
              <div className="text-[9px] font-black text-[var(--neo-text-tertiary)] uppercase mb-0.5">
                Exec Risk
              </div>
              <div className="text-xs font-black text-[var(--neo-text-primary)] font-mono">
                {node.executionRisk}
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <button
            type="button"
            onClick={() => navigate('/projects/demo-project')}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl neo-button-primary text-xs font-bold transition-all group cursor-pointer shadow-[3px_3px_8px_rgba(21,87,214,0.35),-2px_-2px_6px_rgba(255,255,255,0.9)]"
          >
            <span>Explore Project</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
      
      {/* Pointer arrow */}
      <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2">
        <div className="w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-[rgba(255,255,255,0.9)]" />
      </div>
    </motion.div>
  );
};
