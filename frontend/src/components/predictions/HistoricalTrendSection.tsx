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
    <section className="space-y-3" id="historical-trend-section">
      <div className="flex items-center justify-between pb-1 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs shadow-2xs">
            04
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Historical Trend Audit</span>
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                MoSPI Flash Cycles (April – July 2026)
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Corroborated historical time series for Project ID: <strong className="font-mono text-slate-800">{project.id}</strong> ({project.code}).
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block text-[11px] text-slate-400 font-mono">
          Same Project Record ID Verified
        </span>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        
        {/* Compact Table showing 4 Trends */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-700">
                <th className="py-2.5 px-3 font-semibold">Flash Cycle</th>
                <th className="py-2.5 px-3 font-semibold text-right">1. Physical Progress</th>
                <th className="py-2.5 px-3 font-semibold text-right">2. Cumulative Expenditure</th>
                <th className="py-2.5 px-3 font-semibold text-right">3. Revised Cost</th>
                <th className="py-2.5 px-3 font-semibold text-right">4. Risk Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {historical_series.map((point: HistoricalTrendPoint, index: number) => {
                const isLive = index === historical_series.length - 1;
                const prev = index > 0 ? historical_series[index - 1] : null;
                const progDelta = prev ? Number((point.physical_progress - prev.physical_progress).toFixed(1)) : 0;
                const expDelta = prev ? Number((point.expenditure_cr - prev.expenditure_cr).toFixed(2)) : 0;

                return (
                  <tr
                    key={point.period}
                    className={`transition-colors ${
                      isLive ? 'bg-indigo-50/40 font-semibold' : 'hover:bg-slate-50/60'
                    }`}
                  >
                    {/* Period */}
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-900 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-indigo-600' : 'bg-slate-300'}`} />
                      <span>{point.period}</span>
                      {isLive && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 font-mono">
                          LATEST
                        </span>
                      )}
                    </td>

                    {/* 1. Physical Progress */}
                    <td className="py-2.5 px-3 text-right text-emerald-700">
                      <span className="font-bold text-sm">{point.physical_progress}%</span>
                      {index > 0 && (
                        <span className="text-[10px] text-slate-400 ml-1.5">
                          (+{progDelta} pp)
                        </span>
                      )}
                    </td>

                    {/* 2. Cumulative Expenditure */}
                    <td className="py-2.5 px-3 text-right text-indigo-700">
                      <span className="font-bold">₹{point.expenditure_cr.toLocaleString()} Cr</span>
                      {index > 0 && (
                        <span className="text-[10px] text-slate-400 ml-1.5">
                          (+₹{expDelta.toFixed(2)} Cr)
                        </span>
                      )}
                    </td>

                    {/* 3. Revised Cost */}
                    <td className="py-2.5 px-3 text-right text-slate-800">
                      <span>₹{point.revised_cost_cr.toLocaleString()} Cr</span>
                    </td>

                    {/* 4. Risk Level & Score */}
                    <td className="py-2.5 px-3 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border font-sans ${
                          point.risk_level === 'HIGH'
                            ? 'bg-rose-100 text-rose-700 border-rose-200'
                            : point.risk_level === 'MEDIUM'
                            ? 'bg-amber-100 text-amber-800 border-amber-200'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-200'
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
            <div key={point.period} className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1.5">
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block">
                {point.period}
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-base font-bold text-slate-900 font-mono">
                  {point.physical_progress}%
                </span>
                <span className="text-[11px] font-mono text-indigo-700">
                  ₹{point.expenditure_cr.toFixed(1)} Cr
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, point.physical_progress)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Trend Insight Note */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700">
          <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-slate-900 font-semibold">Historical Trend Insight:</strong>{' '}
            {trend_insight}
          </div>
        </div>

      </div>
    </section>
  );
};
