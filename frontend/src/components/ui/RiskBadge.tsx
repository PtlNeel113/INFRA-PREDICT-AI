import React from 'react';
import { AlertOctagon, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { RiskLevel } from '../../types/ui';
import { cn } from '../../utils/cn';

export interface RiskBadgeProps {
  level: RiskLevel;
  showIcon?: boolean;
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, showIcon = true, className }) => {
  const config: Record<
    RiskLevel,
    { label: string; bg: string; text: string; border: string; icon: React.ReactNode }
  > = {
    CRITICAL: {
      label: 'Critical Risk',
      bg: 'bg-[#FEF2F2]',
      text: 'text-[#DC2626]',
      border: 'border-[#FCA5A5]',
      icon: <AlertOctagon className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />,
    },
    HIGH: {
      label: 'High Risk',
      bg: 'bg-[#FFFBEB]',
      text: 'text-[#D97706]',
      border: 'border-[#FCD34D]',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-[#D97706] shrink-0" />,
    },
    MEDIUM: {
      label: 'Moderate Risk',
      bg: 'bg-[#EFF6FF]',
      text: 'text-[#2563EB]',
      border: 'border-[#93C5FD]',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />,
    },
    LOW: {
      label: 'Low Risk',
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-200',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-slate-600 shrink-0" />,
    },
    WATCH: {
      label: 'Watch Risk',
      bg: 'bg-[#FFFBEB]',
      text: 'text-[#B45309]',
      border: 'border-[#FDE68A]',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-[#B45309] shrink-0" />,
    },
    STABLE: {
      label: 'Stable / Healthy',
      bg: 'bg-[#F0FDF4]',
      text: 'text-[#15803D]',
      border: 'border-[#86EFAC]',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] shrink-0" />,
    },
  };

  const current = config[level] || config.STABLE;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border select-none whitespace-nowrap',
        current.bg,
        current.text,
        current.border,
        className,
      )}
    >
      {showIcon && current.icon}
      <span>{current.label}</span>
    </span>
  );
};
