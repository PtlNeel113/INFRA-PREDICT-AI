import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';
import {
  PieChart as PieIcon,
  TrendingUp,
  Clock,
  Layers,
  BarChart2,
  AlertTriangle,
  Info,
} from 'lucide-react';
import {
  RISK_DISTRIBUTION_DATA,
  COST_RISK_TREND_DATA,
  TIME_RISK_DELAY_DATA,
  SECTOR_RISK_COMPARISON_DATA,
} from '../../data/mockData';

export const PortfolioRiskOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'distribution' | 'cost' | 'delay' | 'sector'>('distribution');

  return (
    <div className="neo-panel p-5 sm:p-6 flex flex-col justify-between">
      {/* Top Header & View Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(200,212,226,0.45)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1557D6]" />
            <h3 className="text-base sm:text-lg font-black text-[var(--neo-text-primary)] tracking-tight">
              Portfolio Risk Overview
            </h3>
          </div>
          <p className="text-xs text-[var(--neo-text-secondary)] mt-1">
            Macro risk distribution, capital exposure trajectory, and sector comparison.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center neo-inset-sm p-1 rounded-xl gap-1">
          {[
            { id: 'distribution', label: 'Risk Distribution', icon: PieIcon },
            { id: 'cost', label: 'Cost-Risk Trend', icon: TrendingUp },
            { id: 'delay', label: 'Time-Risk Trend', icon: Clock },
            { id: 'sector', label: 'Sector Comparison', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1557D6] text-white shadow-xs'
                    : 'text-[var(--neo-text-secondary)] hover:text-[var(--neo-text-primary)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="py-4 min-h-[340px] flex items-center justify-center">
        {/* 1. Risk Distribution (Donut + Stats) */}
        {activeTab === 'distribution' && (
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={RISK_DISTRIBUTION_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="count"
                  >
                    {RISK_DISTRIBUTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="neo-card p-3 rounded-xl text-xs shadow-xl">
                            <p className="font-bold text-[var(--neo-text-primary)]">{data.name}</p>
                            <p className="font-mono text-[#1557D6]">
                              {data.count} Projects ({data.percentage}%)
                            </p>
                            <p className="text-[var(--neo-text-secondary)] mt-0.5">
                              ₹{(data.valueCr / 1000).toFixed(1)}k Cr Outlay
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Breakdown Legend Cards */}
            <div className="md:col-span-6 space-y-2.5">
              {RISK_DISTRIBUTION_DATA.map((item) => (
                <div
                  key={item.name}
                  className="p-3 rounded-xl neo-card flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <div>
                      <span className="text-xs font-bold text-[#0B1F3A] block">{item.name}</span>
                      <span className="text-[11px] text-slate-500">
                        ₹{(item.valueCr / 1000).toFixed(1)}k Cr Outlay
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-sm text-[#0B1F3A] block">
                      {item.count}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Cost-Risk Trend (Area + Bar) */}
        {activeTab === 'cost' && (
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={COST_RISK_TREND_DATA} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC2626" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#DC2626" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="baselineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#155EEF" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#155EEF" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="quarter" stroke="#64748B" fontSize={11} fontBold />
                <YAxis
                  stroke="#64748B"
                  fontSize={11}
                  tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k Cr`}
                />
                <RechartsTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#0B1F3A] text-white p-3 rounded-xl border border-white/10 text-xs shadow-xl space-y-1">
                          <p className="font-bold border-b border-white/10 pb-1">{label}</p>
                          <p className="text-blue-400">
                            Sanctioned: ₹{payload[0]?.value?.toLocaleString()} Cr
                          </p>
                          <p className="text-red-400 font-bold">
                            Anticipated Final: ₹{payload[1]?.value?.toLocaleString()} Cr
                          </p>
                          <p className="text-amber-300 text-[11px] font-mono">
                            Cost Overrun Gap: +₹
                            {((payload[1]?.value as number) - (payload[0]?.value as number)).toLocaleString()} Cr
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area
                  type="monotone"
                  dataKey="sanctionedBaseline"
                  name="Sanctioned Baseline (₹ Cr)"
                  stroke="#155EEF"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#baselineGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="anticipatedFinal"
                  name="Anticipated Final Cost (₹ Cr)"
                  stroke="#DC2626"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#costGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* 3. Time-Risk Trend (Delay Buckets) */}
        {activeTab === 'delay' && (
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TIME_RISK_DELAY_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="bucket" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#0B1F3A] text-white p-3 rounded-xl border border-white/10 text-xs shadow-xl">
                          <p className="font-bold">{data.bucket}</p>
                          <p className="text-amber-400 font-mono mt-1 font-bold">
                            {data.projects} Projects ({data.percentage}% of portfolio)
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="projects" name="Project Count" radius={[6, 6, 0, 0]}>
                  {TIME_RISK_DELAY_DATA.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* 4. Sector Risk Comparison */}
        {activeTab === 'sector' && (
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={SECTOR_RISK_COMPARISON_DATA}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                <XAxis type="number" stroke="#64748B" fontSize={10} />
                <YAxis
                  dataKey="sector"
                  type="category"
                  stroke="#0B1F3A"
                  fontSize={10}
                  fontWeight="bold"
                  width={80}
                />
                <RechartsTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#0B1F3A] text-white p-3 rounded-xl border border-white/10 text-xs shadow-xl space-y-1">
                          <p className="font-bold">{label}</p>
                          <p className="text-slate-300">Total Monitored: {d.total}</p>
                          <p className="text-red-400 font-bold">Critical: {d.critical} | High: {d.high}</p>
                          <p className="text-amber-400">Avg Delay: {d.avgDelayMonths} months</p>
                          <p className="text-emerald-400">Cost Overrun: +{d.costOverrunPercent}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Bar dataKey="critical" name="Critical Risk Projects" fill="#DC2626" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="high" name="High Risk Projects" fill="#EA580C" stackId="a" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Footer Info Pill */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="text-xs text-slate-500 dark:text-slate-400">Prototype Dataset</span>
      </div>
    </div>
  );
};
