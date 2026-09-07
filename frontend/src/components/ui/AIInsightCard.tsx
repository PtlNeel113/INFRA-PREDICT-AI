import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

interface AIInsightCardProps {
  title: string;
  insight: string;
  actions?: {
    label: string;
    onClick: () => void;
  }[];
  className?: string;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({
  title,
  insight,
  actions,
  className,
}) => {
  return (
    <div className={cn('glass-panel p-8 relative overflow-hidden', className)}>
      {/* AI Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EBF5FF] via-transparent to-[#F2F9E8] opacity-40 pointer-events-none" />
      
      <div className="relative">
        {/* AI Indicator */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1557D6] to-[#8EDC35] flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1557D6]">
            {title}
          </div>
        </div>
        
        {/* Insight Text */}
        <p className="text-lg leading-relaxed text-[#0B1220] font-medium mb-6">
          {insight}
        </p>
        
        {/* Actions */}
        {actions && actions.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-[#EBF5FF] border border-[rgba(15,30,50,0.08)] text-sm font-semibold text-[#1557D6] transition-all hover-lift cursor-pointer"
              >
                {action.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
