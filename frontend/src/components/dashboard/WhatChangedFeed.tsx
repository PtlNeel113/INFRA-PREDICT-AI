import React from 'react';
import {
  Clock,
  TrendingUp,
  AlertTriangle,
  FileSpreadsheet,
  Layers,
  ArrowUpRight,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { WHAT_CHANGED_EVENTS } from '../../data/mockData';
import { WhatChangedEvent } from '../../types/projects';
import { useToast } from '../../hooks/useToast';

interface WhatChangedFeedProps {
  onSelectProjectCode?: (code: string) => void;
}

export const WhatChangedFeed: React.FC<WhatChangedFeedProps> = ({ onSelectProjectCode }) => {
  const toast = useToast();

  const getEventIcon = (type: WhatChangedEvent['type']) => {
    switch (type) {
      case 'COST_REVISION':
        return <TrendingUp className="w-4 h-4 text-[#DC2626]" />;
      case 'SCHEDULE_SLIPPAGE':
        return <Clock className="w-4 h-4 text-[#EA580C]" />;
      case 'MILESTONE_MISSED':
        return <AlertTriangle className="w-4 h-4 text-[#DC2626]" />;
      case 'PHYSICAL_PROGRESS_LAG':
        return <Layers className="w-4 h-4 text-[#D97706]" />;
      case 'RISK_SCORE_CHANGED':
        return <Sparkles className="w-4 h-4 text-[#15803D]" />;
      default:
        return <Clock className="w-4 h-4 text-[#155EEF]" />;
    }
  };

  const getSeverityBadge = (severity: WhatChangedEvent['severity']) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'HIGH':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'INFO':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="neo-panel p-5 sm:p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[rgba(200,212,226,0.45)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1557D6] animate-pulse" />
            <h3 className="text-base sm:text-lg font-black text-[var(--neo-text-primary)] tracking-tight">
              What Changed?
            </h3>
          </div>
          <p className="text-xs text-[var(--neo-text-secondary)] mt-1">
            Variance signals, milestone breaches, and budget adjustments across reporting cycles.
          </p>
        </div>

        <span className="w-2.5 h-2.5 rounded-full bg-[#1557D6] animate-pulse" />
      </div>

      {/* Timeline Stream */}
      <div className="py-4 space-y-3.5">
        {WHAT_CHANGED_EVENTS.map((event, idx) => (
          <div
            key={event.id}
            onClick={() => {
              toast.info(event.title, `${event.projectName}: ${event.deltaText}`);
              if (onSelectProjectCode) onSelectProjectCode(event.projectCode);
            }}
            className="p-3.5 rounded-xl neo-card hover:translate-y-[-1px] transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg neo-inset-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {getEventIcon(event.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[var(--neo-text-primary)] group-hover:text-[#1557D6] transition-colors">
                      {event.title}
                    </span>
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.2 rounded uppercase border ${getSeverityBadge(
                        event.severity,
                      )}`}
                    >
                      {event.severity}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[var(--neo-text-secondary)] mt-0.5">
                    <span className="font-mono font-bold text-[#1557D6]">{event.projectCode}</span>
                    <span>•</span>
                    <span className="truncate max-w-[200px]">{event.state}</span>
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 shrink-0">
                <Clock className="w-3 h-3" />
                {event.timestamp}
              </span>
            </div>

            {/* Delta Highlight Pill */}
            <div className="mt-2.5 pt-2 border-t border-[rgba(200,212,226,0.4)] flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--neo-text-primary)] text-xs flex items-center gap-1">
                {event.deltaText}
              </span>
              <span className="text-[11px] text-[#1557D6] font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                Inspect <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-[11px] text-[var(--neo-text-secondary)] mt-1 line-clamp-1 leading-snug">
              {event.details}
            </p>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="pt-3 border-t border-[rgba(200,212,226,0.45)] flex items-center justify-between text-xs text-[var(--neo-text-secondary)]">
        <span>Latest cycle changes</span>
        <button
          type="button"
          onClick={() => toast.info('Log Archive', 'Showing latest 24-hour variance signals.')}
          className="font-bold text-[#1557D6] hover:underline cursor-pointer"
        >
          View 24h Signal Log →
        </button>
      </div>
    </div>
  );
};
