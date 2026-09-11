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
    <div className={cn('neo-panel p-7 relative overflow-hidden', className)}>
      <div className="relative">
        {/* AI Indicator */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl neo-button-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#1557D6]">
            {title}
          </div>
        </div>
        
        {/* Insight Text */}
        <p className="text-base leading-relaxed text-[var(--neo-text-primary)] font-medium mb-6">
          {insight}
        </p>
        
        {/* Actions */}
        {actions && actions.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl neo-button-secondary text-sm font-semibold text-[#1557D6] transition-all cursor-pointer"
              >
                <span>{action.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
