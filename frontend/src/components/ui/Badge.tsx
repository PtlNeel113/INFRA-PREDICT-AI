import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'navy' | 'teal' | 'green' | 'amber' | 'red' | 'gray';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  icon,
  className,
}) => {
  const variantStyles = {
    blue: 'bg-[#EBF2FF] text-[#155EEF] border-blue-200',
    navy: 'bg-[#E8EFF9] text-[#0B1F3A] border-[#1C3F73]/20',
    teal: 'bg-[#ECFEFF] text-[#0E7490] border-cyan-200',
    green: 'bg-[#F0FDF4] text-[#15803D] border-[#86EFAC]',
    amber: 'bg-[#FFFBEB] text-[#D97706] border-[#FCD34D]',
    red: 'bg-[#FEF2F2] text-[#DC2626] border-[#FCA5A5]',
    gray: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium tracking-wide',
    md: 'text-xs px-2.5 py-1 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border whitespace-nowrap select-none',
        sizeStyles[size],
        variantStyles[variant],
        className,
      )}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
};
