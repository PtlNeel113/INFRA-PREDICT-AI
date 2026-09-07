import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Activity, Sparkles, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { RISK_TRAJECTORY_DATA } from '../../data/mockData';

export const RiskTrajectoryChart: React.FC = () => {
  const [timeHorizon, setTimeHorizon] = useState<'30d' | '90d' | '1y'>('90d');

  const data = RISK_TRAJECTORY_DATA[timeHorizon];

  return (
    <div className="bg-white rounded-[18px] border border-[#E2E8F0] gov-shadow p-5 sm:p-6 flex flex-col justify-between">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#155EEF]" />
            <h3 className="text-base sm:text-lg font-black text-[#0B1F3A] tracking-tight">
              Risk Trajectory & Predictive Forecast
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Historical risk trajectory with AI-projected forecast and confidence bounds.
          </p>
        </div>

        {/* Time Horizon Selector (30d, 90d, 1y) */}
        <div className="flex items-center bg-[#F8FAFC] border border-[#E2E8F0] p-1 rounded-xl gap-1">
          {[
            { id: '30d', label: '30 Days' },
            { id: '90d', label: '90 Days' },
            { id: '1y', label: '1 Year' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTimeHorizon(item.id as any)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                timeHorizon === item.id
                  ? 'bg-[#155EEF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-200/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="py-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="confidenceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#155EEF" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#155EEF" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="label" stroke="#64748B" fontSize={11} fontBold />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              domain={[10, 80]}
              tickFormatter={(val) => `${val}%`}
            />
            <RechartsTooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-[#0B1F3A] text-white p-3.5 rounded-xl border border-white/10 text-xs shadow-xl space-y-1.5 min-w-[170px]">
                      <div className="flex items-center justify-between border-b border-white/10 pb-1">
                        <span className="font-bold">{label}</span>
                        {d.isCurrent && (
                          <span className="bg-[#155EEF] text-[10px] font-mono px-1.5 py-0.2 rounded">
                            CURRENT
                          </span>
                        )}
                      </div>
                      {d.historicalRisk && (
                        <p className="text-slate-300">
                          Historical Portfolio Risk: <strong className="text-white">{d.historicalRisk}%</strong>
                        </p>
                      )}
                      {d.projectedRisk && (
                        <p className="text-red-400 font-bold">
                          AI Projected Risk: {d.projectedRisk}%
                        </p>
                      )}
                      <p className="text-[10px] text-slate-400 font-mono">
                        90% Confidence Interval: [{d.p10Lower}% - {d.p90Upper}%]
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />

            {/* Confidence Interval Upper/Lower */}
            <Area
              type="monotone"
              dataKey="p90Upper"
              name="Upper Confidence (P90)"
              stroke="transparent"
              fill="#155EEF"
              fillOpacity={0.08}
            />

            {/* Historical Series */}
            <Line
              type="monotone"
              dataKey="historicalRisk"
              name="Historical Reporting Cycle Risk"
              stroke="#0E7490"
              strokeWidth={3}
              dot={{ r: 4, fill: '#0E7490' }}
            />

            {/* Projected Forecast Series */}
            <Line
              type="monotone"
              dataKey="projectedRisk"
              name="Projected Risk Trajectory (AI Forecast)"
              stroke="#DC2626"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ r: 4, fill: '#DC2626' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Summary Callout */}
      <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#155EEF]" />
          <span className="text-[#0B1F3A] font-semibold">
            Risk Trend:
          </span>
          <span className="text-slate-600 hidden sm:inline">
            Risk momentum is accelerating at +3.2% per quarter without prescriptive intervention.
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-red-600">
          +3.2% Velocity Drift
        </span>
      </div>
    </div>
  );
};
