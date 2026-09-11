import React, { useMemo } from 'react';
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  Info,
  Layers,
  Sparkles,
} from 'lucide-react';
import { InfraProject } from '../../types/projects';
import { ExecutionRiskService, HistoricalTrendPoint } from '../../server/services/executionRiskService';

interface HistoricalTrendSectionProps {
  project: InfraProject;
}

export const HistoricalTrendSection: React.FC<HistoricalTrendSectionProps> = ({ project }) => {
  const { historical_series, trend_insight } = useMemo(() => {
    return ExecutionRiskService.calculateExecutionRisk(project);
  }, [project]);

  return (
    <section className="space-y-4" id="historical-trend-section">
      <div className="flex items-center justify-between pb-2 border-b border-[rgba(200,212,226,0.45)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl neo-inset flex items-center justify-center text-[#1557D6] font-black text-xs">
            04
          </div>
          <div>
            <h3 className="text-base font-black text-[var(--neo-text-primary)] tracking-tight flex items-center gap-2">
              <span>Historical Trend Audit</span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg neo-inset text-[#1557D6]">
                MoSPI Flash Cycles (April – July 2026)
              </span>
            </h3>
            <p className="text-xs text-[var(--neo-text-secondary)]">
              Corroborated historical time series for Project ID: <strong className="font-mono text-[var(--neo-text-primary)]">{project.id}</strong> ({project.code}).
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block text-[11px] text-[var(--neo-text-tertiary)] font-mono">
          Same Project Record ID Verified
        </span>
      </div>

      {/* Main Container */}
      <div className="neo-panel p-5 space-y-4">
        
        {/* Compact Table showing 4 Trends */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[rgba(200,212,226,0.45)] text-[var(--neo-text-secondary)]">
                <th className="py-2.5 px-3 font-bold">Flash Cycle</th>
                <th className="py-2.5 px-3 font-bold text-right">1. Physical Progress</th>
                <th className="py-2.5 px-3 font-bold text-right">2. Cumulative Expenditure</th>
                <th className="py-2.5 px-3 font-bold text-right">3. Revised Cost</th>
                <th className="py-2.5 px-3 font-bold text-right">4. Risk Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(200,212,226,0.3)] font-mono">
              {historical_series.map((point: HistoricalTrendPoint, index: number) => {
                const isLive = index === historical_series.length - 1;
                const prev = index > 0 ? historical_series[index - 1] : null;
                const progDelta = prev ? Number((point.physical_progress - prev.physical_progress).toFixed(1)) : 0;
                const expDelta = prev ? Number((point.expenditure_cr - prev.expenditure_cr).toFixed(2)) : 0;

                return (
                  <tr
                    key={point.period}
                    className={`transition-colors ${
                      isLive ? 'bg-blue-50/40 dark:bg-blue-950/20 font-bold' : 'hover:bg-slate-200/30'
                    }`}
                  >
                    {/* Period */}
                    <td className="py-2.5 px-3 font-sans font-semibold text-[var(--neo-text-primary)] flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-[#1557D6]' : 'bg-[var(--neo-text-tertiary)]'}`} />
                      <span>{point.period}</span>
                      {isLive && (
                        <span className="text-[9px] font-black px-1.5 py-0.2 rounded-lg neo-inset text-[#1557D6] font-mono">
                          LATEST
                        </span>
                      )}
                    </td>

                    {/* 1. Physical Progress */}
                    <td className="py-2.5 px-3 text-right text-emerald-600">
                      <span className="font-black text-sm">{point.physical_progress}%</span>
                      {index > 0 && (
                        <span className="text-[10px] text-[var(--neo-text-tertiary)] ml-1.5">
                          (+{progDelta} pp)
                        </span>
                      )}
                    </td>

                    {/* 2. Cumulative Expenditure */}
                    <td className="py-2.5 px-3 text-right text-[#1557D6]">
                      <span className="font-bold">₹{point.expenditure_cr.toLocaleString()} Cr</span>
                      {index > 0 && (
                        <span className="text-[10px] text-[var(--neo-text-tertiary)] ml-1.5">
                          (+₹{expDelta.toFixed(2)} Cr)
                        </span>
                      )}
                    </td>

                    {/* 3. Revised Cost */}
                    <td className="py-2.5 px-3 text-right text-[var(--neo-text-primary)]">
                      <span>₹{point.revised_cost_cr.toLocaleString()} Cr</span>
                    </td>

                    {/* 4. Risk Level & Score */}
                    <td className="py-2.5 px-3 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold font-sans neo-raised ${
                          point.risk_level === 'HIGH'
                            ? 'text-rose-600'
                            : point.risk_level === 'MEDIUM'
                            ? 'text-amber-600'
                            : 'text-emerald-600'
                        }`}
                      >
                        {point.risk_level} (Score {point.risk_score})
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Visual Progress Sparkline / Bar progression */}
        <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {historical_series.map((point: HistoricalTrendPoint) => (
            <div key={point.period} className="p-3 neo-card space-y-1.5">
              <span className="text-[10px] text-[var(--neo-text-tertiary)] font-bold uppercase tracking-wider block">
                {point.period}
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-base font-black text-[var(--neo-text-primary)] font-mono">
                  {point.physical_progress}%
                </span>
                <span className="text-[11px] font-mono text-[#1557D6] font-bold">
                  ₹{point.expenditure_cr.toFixed(1)} Cr
                </span>
              </div>
              <div className="w-full neo-progress-track h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, point.physical_progress)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Trend Insight Note */}
        <div className="p-3.5 neo-inset rounded-xl flex items-start gap-2.5 text-xs text-[var(--neo-text-secondary)]">
          <Info className="w-4 h-4 text-[#1557D6] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-[var(--neo-text-primary)] font-bold">Historical Trend Insight:</strong>{' '}
            {trend_insight}
          </div>
        </div>

      </div>
    </section>
  );
};
