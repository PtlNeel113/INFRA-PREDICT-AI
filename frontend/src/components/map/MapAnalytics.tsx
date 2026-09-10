import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine,
} from 'recharts';
import { PAIMANA_SECTOR_RISK_METRICS, PAIMANA_RISK_TRAJECTORY } from '../../data/paimanaData';
import { Layers, TrendingUp, HelpCircle } from 'lucide-react';

interface MapAnalyticsProps {
  reportingPeriod: string;
}

export const MapAnalytics: React.FC<MapAnalyticsProps> = ({ reportingPeriod }) => {
  // Format sector metrics for clean bar chart
  const sectorData = PAIMANA_SECTOR_RISK_METRICS.map((s) => ({
    sector: s.sector,
    critical: s.criticalCount,
    high: s.highCount,
    watch: s.watchCount,
    stable: s.stableCount,
    highPriority: s.criticalCount + s.highCount,
    total: s.totalProjects,
  }));

  // Format trajectory data distinguishing observed from predicted
  const trajectoryData = PAIMANA_RISK_TRAJECTORY.map((pt) => ({
    month: pt.month.replace(' 2026', ''),
    observedRisk: pt.isObserved ? pt.riskScore : null,
    predictedRisk: !pt.isObserved ? pt.riskScore : null,
    // Connect the boundary line between July and August
    boundaryRisk: pt.month === 'July 2026' ? pt.riskScore : !pt.isObserved ? pt.riskScore : null,
    isObserved: pt.isObserved,
    score: pt.riskScore,
    notes: pt.notes,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 1. Risk by Sector (Step 13) */}
      <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-black text-[#0B1F3A] dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#155EEF]" />
              <span>Risk Concentration by Sector</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              MoSPI PAIMANA portfolio breakdown across key infrastructure segments
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-bold">
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded bg-red-600" />
              Critical
            </span>
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded bg-orange-500" />
              High
            </span>
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded bg-amber-500" />
              Watch
            </span>
          </div>
        </div>

        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sectorData}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
              <XAxis
                type="number"
                stroke="#94A3B8"
                style={{ fontSize: '11px', fontWeight: 600 }}
                domain={[0, 'dataMax + 40']}
              />
              <YAxis
                dataKey="sector"
                type="category"
                width={120}
                stroke="#64748B"
                style={{ fontSize: '11px', fontWeight: 600 }}
                tickLine={false}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-[#0B1F3A] text-white p-3 rounded-xl shadow-xl text-xs border border-slate-700">
                        <div className="font-bold border-b border-slate-700 pb-1 mb-2 text-blue-200">
                          {data.sector}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-300">Total Projects:</span>
                            <span className="font-mono font-bold">{data.total}</span>
                          </div>
                          <div className="flex justify-between gap-4 text-red-400">
                            <span>Critical Risk:</span>
                            <span className="font-mono font-bold">{data.critical}</span>
                          </div>
                          <div className="flex justify-between gap-4 text-orange-400">
                            <span>High Risk:</span>
                            <span className="font-mono font-bold">{data.high}</span>
                          </div>
                          <div className="flex justify-between gap-4 text-amber-400">
                            <span>Watchlist:</span>
                            <span className="font-mono font-bold">{data.watch}</span>
                          </div>
                          <div className="flex justify-between gap-4 text-emerald-400">
                            <span>Stable Execution:</span>
                            <span className="font-mono font-bold">{data.stable}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="critical" stackId="a" fill="#DC2626" radius={[0, 0, 0, 0]} />
              <Bar dataKey="high" stackId="a" fill="#EA580C" radius={[0, 0, 0, 0]} />
              <Bar dataKey="watch" stackId="a" fill="#D97706" radius={[0, 0, 0, 0]} />
              <Bar dataKey="stable" stackId="a" fill="#16A34A" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. National Risk Trajectory (Step 14) */}
      <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-black text-[#0B1F3A] dark:text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#155EEF]" />
              <span>National Portfolio Risk Trajectory</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Historical observed monthly scores vs predictive AI escalation forecast
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-bold">
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <span className="w-3 h-1 bg-[#155EEF] rounded" />
              Observed (Apr–Jul)
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <span className="w-3 h-1 border-t-2 border-dashed border-amber-500" />
              Predicted (Aug–Sep)
            </span>
          </div>
        </div>

        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trajectoryData}
              margin={{ top: 10, right: 25, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="#64748B"
                style={{ fontSize: '11px', fontWeight: 600 }}
                tickLine={false}
              />
              <YAxis
                stroke="#94A3B8"
                style={{ fontSize: '11px', fontWeight: 600 }}
                domain={[25, 55]}
                tickFormatter={(val) => `${val}`}
                unit=" pts"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-[#0B1F3A] text-white p-3 rounded-xl shadow-xl text-xs border border-slate-700">
                        <div className="font-bold flex items-center justify-between gap-3 border-b border-slate-700 pb-1 mb-2">
                          <span>{data.month} 2026</span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase ${
                              data.isObserved
                                ? 'bg-blue-500/20 text-blue-300'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {data.isObserved ? 'Observed Record' : 'AI Projected'}
                          </span>
                        </div>
                        <div className="flex justify-between gap-4 mb-1">
                          <span className="text-slate-300">National Composite Risk:</span>
                          <span className="font-mono font-black text-amber-400">
                            {data.score} / 100
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 italic mt-1">
                          {data.notes}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {/* Solid line for Observed data */}
              <Line
                type="monotone"
                dataKey="observedRisk"
                stroke="#155EEF"
                strokeWidth={2.5}
                dot={{ fill: '#155EEF', r: 4, strokeWidth: 2, stroke: '#FFFFFF' }}
                activeDot={{ r: 6 }}
                connectNulls={false}
              />
              {/* Dashed line for Predicted forecast */}
              <Line
                type="monotone"
                dataKey="boundaryRisk"
                stroke="#D97706"
                strokeWidth={2.5}
                strokeDasharray="5 5"
                dot={{ fill: '#D97706', r: 4, strokeWidth: 2, stroke: '#FFFFFF' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
