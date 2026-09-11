import React from 'react';
import { ReportingPeriod } from '../../types/map';

interface MapLegendProps {
  reportingPeriod: ReportingPeriod;
  totalProjects: number;
  activeRiskFilter?: string;
  onSelectRiskFilter?: (riskLevel: string) => void;
}

export const MapLegend: React.FC<MapLegendProps> = ({
  reportingPeriod,
  totalProjects,
  activeRiskFilter = 'ALL',
  onSelectRiskFilter,
}) => {
  const legendItems = [
    { label: 'CRITICAL', color: '#DC2626', bgClass: 'bg-red-600', description: 'Immediate escalation required' },
    { label: 'HIGH', color: '#EA580C', bgClass: 'bg-orange-600', description: 'Schedule/cost slippage >15%' },
    { label: 'WATCH', color: '#D97706', bgClass: 'bg-amber-600', description: 'Key milestone monitoring' },
    { label: 'STABLE', color: '#16A34A', bgClass: 'bg-emerald-600', description: 'Execution on DPR baseline' },
    { label: 'NO DATA', color: '#94A3B8', bgClass: 'bg-slate-400', description: 'No active monitored projects' },
  ];

  return (
    <div className="neo-panel p-3.5 max-w-[210px] select-none shadow-[4px_4px_12px_rgba(166,180,200,0.35),-3px_-3px_10px_rgba(255,255,255,0.9)]">
      <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-[rgba(200,212,226,0.45)]">
        <span className="text-[11px] font-black text-[var(--neo-text-primary)] uppercase tracking-wider">
          State Risk Severity
        </span>
        {activeRiskFilter !== 'ALL' && onSelectRiskFilter && (
          <button
            type="button"
            onClick={() => onSelectRiskFilter('ALL')}
            className="text-[10px] font-bold text-[#1557D6] hover:underline cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-1.5">
        {legendItems.map((item) => {
          const isSelected = activeRiskFilter === item.label;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onSelectRiskFilter && onSelectRiskFilter(item.label)}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-all ${
                isSelected
                  ? 'neo-inset text-[#1557D6] font-black'
                  : 'hover:bg-slate-200/40 text-[var(--neo-text-primary)]'
              } cursor-pointer`}
              title={item.description}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-xs"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[11px] font-bold">
                  {item.label}
                </span>
              </div>
              {isSelected && (
                <span className="text-[9px] font-black text-[#1557D6] uppercase tracking-wider">
                  Active
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3 pt-2.5 border-t border-[rgba(200,212,226,0.45)]">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-[var(--neo-text-tertiary)] font-semibold">Total Projects</span>
          <span className="font-mono font-black text-[var(--neo-text-primary)]">{totalProjects.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-[10px] mt-1">
          <span className="text-[var(--neo-text-tertiary)] font-semibold">Source</span>
          <span className="font-bold text-[var(--neo-text-secondary)]">PAIMANA / MoSPI</span>
        </div>
        <div className="flex items-center justify-between text-[10px] mt-1">
          <span className="text-[var(--neo-text-tertiary)] font-semibold">Reporting</span>
          <span className="font-mono font-bold text-[#1557D6]">{reportingPeriod}</span>
        </div>
      </div>
    </div>
  );
};
