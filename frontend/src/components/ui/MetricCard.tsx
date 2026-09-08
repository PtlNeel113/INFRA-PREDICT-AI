import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
    isGood?: boolean;
  };
  icon?: LucideIcon;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  trend,
  icon: Icon,
  className,
}) => {
  return (
    <div className={cn('glass-card p-6 hover-lift', className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8B95A8]">
          {label}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-[#EBF5FF] flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#1557D6]" />
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-2">
        <div className="text-4xl font-black text-[#0B1220] tracking-tight">
          {value}
        </div>
        {unit && (
          <div className="text-lg font-semibold text-[#536174]">
            {unit}
          </div>
        )}
      </div>
      
      {trend && (
        <div className="mt-3 flex items-center gap-1.5">
          <span className={cn(
            'text-xs font-bold',
            trend.isGood ? 'text-[#16A34A]' : 'text-[#DC2626]'
          )}>
            {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-[#8B95A8] font-medium">
            vs last period
          </span>
        </div>
      )}
    </div>
  );
};
