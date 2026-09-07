import React from 'react';
import { Activity } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface HealthScoreBadgeProps {
  score: number; // 0 to 100
  className?: string;
}

export const HealthScoreBadge: React.FC<HealthScoreBadgeProps> = ({ score, className }) => {
  let color = 'text-[#15803D] bg-[#F0FDF4] border-[#86EFAC]';
  let label = 'Optimal';

  if (score < 50) {
    color = 'text-[#DC2626] bg-[#FEF2F2] border-[#FCA5A5]';
    label = 'Critical';
  } else if (score < 75) {
    color = 'text-[#D97706] bg-[#FFFBEB] border-[#FCD34D]';
    label = 'Attention';
  } else if (score < 90) {
    color = 'text-[#155EEF] bg-[#EBF2FF] border-blue-200';
    label = 'Moderate';
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium select-none whitespace-nowrap',
        color,
        className,
      )}
    >
      <Activity className="w-3.5 h-3.5 shrink-0" />
      <span className="font-bold font-mono">{score}/100</span>
      <span className="opacity-80">({label})</span>
    </div>
  );
};
