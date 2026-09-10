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
    <div className="bg-white/95 dark:bg-[#0B1F3A]/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200 dark:border-slate-700/80 p-3.5 max-w-[210px] select-none">
      <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
        <span className="text-[11px] font-black text-[#0B1F3A] dark:text-white uppercase tracking-wider">
          State Risk Severity
        </span>
        {activeRiskFilter !== 'ALL' && onSelectRiskFilter && (
          <button
            type="button"
            onClick={() => onSelectRiskFilter('ALL')}
            className="text-[10px] font-bold text-[#155EEF] dark:text-blue-400 hover:underline cursor-pointer"
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
              className={`w-full flex items-center justify-between px-2 py-1 rounded-md text-left transition-all ${
                isSelected
                  ? 'bg-slate-100 dark:bg-slate-800 ring-1 ring-[#155EEF]'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
              } cursor-pointer`}
              title={item.description}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0 shadow-xs"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                  {item.label}
                </span>
              </div>
              {isSelected && (
                <span className="text-[9px] font-black text-[#155EEF] dark:text-blue-400 uppercase">
                  Active
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-slate-500 dark:text-slate-400 font-semibold">Total Projects</span>
          <span className="font-mono font-black text-[#0B1F3A] dark:text-white">{totalProjects.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-[10px] mt-1">
          <span className="text-slate-500 dark:text-slate-400 font-semibold">Source</span>
          <span className="font-bold text-slate-700 dark:text-slate-300">PAIMANA / MoSPI</span>
        </div>
        <div className="flex items-center justify-between text-[10px] mt-1">
          <span className="text-slate-500 dark:text-slate-400 font-semibold">Reporting</span>
          <span className="font-mono font-bold text-[#155EEF] dark:text-blue-400">{reportingPeriod}</span>
        </div>
      </div>
    </div>
  );
};
