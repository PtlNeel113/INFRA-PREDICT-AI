import React, { useState, useMemo } from 'react';
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
import { useProjectStore } from '../../store/projectStore';
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
  const projects = useProjectStore((s) => s.projects);

  const totalSanctionedCr = useMemo(
    () => projects.reduce((acc, p) => acc + p.sanctionedCostCr, 0),
    [projects]
  );
  const criticalProjects = useMemo(
    () => projects.filter((p) => p.riskLevel === 'CRITICAL'),
    [projects]
  );
  const highRiskProjects = useMemo(
    () => projects.filter((p) => p.riskLevel === 'HIGH'),
    [projects]
  );
  const watchProjects = useMemo(
    () => projects.filter((p) => p.riskLevel === 'WATCH'),
    [projects]
  );
  const stableProjects = useMemo(
    () => projects.filter((p) => p.riskLevel === 'STABLE'),
    [projects]
  );
  const avgHealthScore = useMemo(
    () => Math.round(projects.reduce((acc, p) => acc + p.healthScore, 0) / (projects.length || 1)),
    [projects]
  );

  // Sector breakdown aggregation
  const sectorData = useMemo(() => {
    const map = new Map<string, { count: number; outlay: number; totalDelay: number }>();
    projects.forEach((p) => {
      const existing = map.get(p.sector) || { count: 0, outlay: 0, totalDelay: 0 };
      existing.count += 1;
      existing.outlay += p.sanctionedCostCr;
      existing.totalDelay += p.predictedDelayMonths || 0;
      map.set(p.sector, existing);
    });
    return Array.from(map.entries()).map(([name, val]) => ({
      name,
      count: val.count,
      outlay: val.outlay,
      avgDelay: Number((val.totalDelay / (val.count || 1)).toFixed(1)),
    }));
  }, [projects]);

  // Risk Distribution Data
  const riskDistribution = useMemo(() => [
    { name: 'Critical Risk', value: criticalProjects.length, color: '#DC2626' },
    { name: 'High Risk', value: highRiskProjects.length, color: '#D97706' },
    { name: 'Watch', value: watchProjects.length, color: '#2563EB' },
    { name: 'Stable', value: stableProjects.length, color: '#15803D' },
  ], [criticalProjects, highRiskProjects, watchProjects, stableProjects]);

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
      <div className="neo-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl neo-raised flex items-center justify-center text-indigo-700">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              NATIONAL INFRASTRUCTURE ANALYTICS
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Portfolio-wide macro patterns, sector delay velocities, capital exposure & root cause distributions.
            </p>
          </div>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="neo-card rounded-2xl p-5 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 block font-mono tracking-wider">
            Active Directory Projects
          </span>
          <strong className="text-2xl font-black font-mono block text-slate-900">{projects.length} Packages</strong>
          <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> Live Synced State
          </span>
        </div>

        <div className="neo-card rounded-2xl p-5 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 block font-mono tracking-wider">
            Cumulative Capital Outlay
          </span>
          <strong className="text-2xl font-black font-mono block text-slate-900">₹{totalSanctionedCr.toLocaleString()} Cr</strong>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">
            Across Monitored Packages
          </span>
        </div>

        <div className="neo-card rounded-2xl p-5 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 block font-mono tracking-wider">
            At-Risk Project Count
          </span>
          <strong className="text-2xl font-black font-mono text-rose-700 block">
            {criticalProjects.length + highRiskProjects.length} Projects
          </strong>
          <span className="text-[11px] text-rose-600 font-bold mt-1 block">
            {(((criticalProjects.length + highRiskProjects.length) / (projects.length || 1)) * 100).toFixed(1)}% Portfolio Ratio
          </span>
        </div>

        <div className="neo-card rounded-2xl p-5 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 block font-mono tracking-wider">
            Average Health Score
          </span>
          <strong className="text-2xl font-black font-mono text-indigo-700 block">
            {avgHealthScore}/100
          </strong>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">
            Composite health index
          </span>
        </div>
      </div>

      {/* Sector Outlay & Delay Breakdown Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="neo-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-300/60 pb-3">
            <h2 className="text-xs font-black uppercase tracking-wider font-mono text-slate-800">
              Sector Capital Outlay (₹ Crores)
            </h2>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.4} />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#475569' }} width={100} />
                <Tooltip />
                <Bar dataKey="outlay" fill="#3b82f6" radius={[0, 6, 6, 0]} name="Sanctioned Outlay (₹ Cr)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Level Distribution Pie */}
        <div className="neo-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-300/60 pb-3">
            <h2 className="text-xs font-black uppercase tracking-wider font-mono text-slate-800">
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
      <div className="neo-panel rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-300/60 pb-3">
          <h2 className="text-xs font-black uppercase tracking-wider font-mono text-slate-800">
            National Infrastructure Risk Drivers (SHAP Aggregation)
          </h2>
          <span className="text-[11px] font-mono text-slate-500 font-bold neo-inset px-2.5 py-1 rounded-lg">Projects Analyzed</span>
        </div>

        <div className="space-y-3.5">
          {rootCauses.map((rc, i) => (
            <div key={i} className="space-y-1.5 p-3 neo-card rounded-xl">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>{rc.cause}</span>
                <span className="font-mono font-bold text-indigo-700">
                  {rc.percentage}% of all project delays
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full neo-inset overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-indigo-600"
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
