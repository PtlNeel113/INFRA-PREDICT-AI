import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Layers,
  ArrowUpRight,
  Building2,
  Calendar,
  Sparkles,
  Filter,
} from 'lucide-react';
import { MOCK_PROJECTS } from '../../data/projectsData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { cn } from '../../utils/cn';

export const AnalyticsPage: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('ALL');

  // Sector breakdown aggregation
  const sectorData = [
    { name: 'Roads & Highways', count: 480, outlay: 184500, avgDelay: 8.4 },
    { name: 'Railways', count: 312, outlay: 142000, avgDelay: 12.6 },
    { name: 'Urban Transport', count: 184, outlay: 96000, avgDelay: 14.1 },
    { name: 'Power & Transmission', count: 228, outlay: 68400, avgDelay: 5.2 },
    { name: 'Petroleum & Gas', count: 165, outlay: 54000, avgDelay: 9.8 },
  ];

  // Risk Distribution Data
  const riskDistribution = [
    { name: 'Critical Risk', value: 18, color: '#DC2626' },
    { name: 'High Risk', value: 34, color: '#D97706' },
    { name: 'Moderate Risk', value: 42, color: '#2563EB' },
    { name: 'Low Risk', value: 6, color: '#15803D' },
  ];

  // Root cause distribution
  const rootCauses = [
    { cause: 'Land Acquisition & RoW Disputes', percentage: 38 },
    { cause: 'Utility Shifting (Power/Gas/Water)', percentage: 24 },
    { cause: 'Contractor Capital & Labor Shortage', percentage: 18 },
    { cause: 'Statutory Environment/Forest Clearance', percentage: 12 },
    { cause: 'Engineering & Geological Complexity', percentage: 8 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 select-none">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              NATIONAL INFRASTRUCTURE ANALYTICS
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Portfolio-wide macro patterns, sector delay velocities, capital exposure & root cause distributions.
            </p>
          </div>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-900 dark:text-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
            Monitored Projects (Demo)
          </span>
          <strong className="text-2xl font-black font-mono block mt-1">1,842</strong>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +42 this quarter
          </span>
        </div>

        <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-900 dark:text-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
            Cumulative Capital Outlay
          </span>
          <strong className="text-2xl font-black font-mono block mt-1">₹14.82 L Cr</strong>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 block">
            Across 28 States
          </span>
        </div>

        <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-900 dark:text-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
            At-Risk Outlay Exposure
          </span>
          <strong className="text-2xl font-black font-mono text-rose-600 dark:text-rose-400 block mt-1">
            ₹3.14 L Cr
          </strong>
          <span className="text-[11px] text-rose-600 dark:text-rose-400 font-medium mt-1 block">
            21.2% Portfolio Exposure
          </span>
        </div>

        <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-900 dark:text-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
            Avg Weighted Schedule Lag
          </span>
          <strong className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400 block mt-1">
            +9.8 Months
          </strong>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 block">
            Median across all packages
          </span>
        </div>
      </div>

      {/* Sector Outlay & Delay Breakdown Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-slate-900 dark:text-slate-100">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-xs font-black uppercase tracking-wider font-mono">
              Sector Capital Outlay (₹ Crores)
            </h2>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94A3B8" opacity={0.2} />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={100} />
                <Tooltip />
                <Bar dataKey="outlay" fill="#155EEF" radius={[0, 6, 6, 0]} name="Sanctioned Outlay (₹ Cr)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Level Distribution Pie */}
        <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-slate-900 dark:text-slate-100">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-xs font-black uppercase tracking-wider font-mono">
              National Risk Classification Distribution
            </h2>
          </div>

          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie
                  data={riskDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Root Cause Frequency Distribution */}
      <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-slate-900 dark:text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="text-xs font-black uppercase tracking-wider font-mono">
            National Infrastructure Risk Drivers (SHAP Aggregation)
          </h2>
          <span className="text-[11px] font-mono text-slate-400">Projects Analyzed (Demo)</span>
        </div>

        <div className="space-y-3">
          {rootCauses.map((rc, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span>{rc.cause}</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {rc.percentage}% of all project delays
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-600 dark:bg-indigo-500"
                  style={{ width: `${rc.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
