import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  PieChart,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Landmark,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { PAIMANA_OFFICIAL_PROJECTS } from '../../../data/paimanaOfficialRecords';
import { InfraProject } from '../../../types/projects';
import { useToast } from '../../../hooks/useToast';

interface MinistryDashboardViewProps {
  onSelectProject: (p: InfraProject) => void;
}

export const MinistryDashboardView: React.FC<MinistryDashboardViewProps> = ({
  onSelectProject,
}) => {
  const toast = useToast();
  const projects = PAIMANA_OFFICIAL_PROJECTS;

  const ministryStats = useMemo(() => {
    const map: Record<string, { count: number; cost: number; expenditure: number }> = {};
    projects.forEach((p) => {
      const min = p.ministry || 'Other';
      if (!map[min]) map[min] = { count: 0, cost: 0, expenditure: 0 };
      map[min].count += 1;
      map[min].cost += p.sanctionedCostCr || 0;
      map[min].expenditure += p.expenditureCr || 0;
    });
    return Object.entries(map).map(([ministry, data]) => ({
      ministry,
      ...data,
      absorption: data.cost > 0 ? Math.round((data.expenditure / data.cost) * 100) : 0,
    }));
  }, [projects]);

  return (
    <div className="space-y-6 select-none">
      {/* MINISTRY HERO BANNER */}
      <div className="neo-panel p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden text-[var(--neo-text-primary)] border-l-4 border-l-purple-600">
        <div className="relative z-10 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200 shadow-2xs">
              <Building2 className="w-3 h-3 text-purple-600" />
              Inter-Ministerial Sector Review
            </span>
            <span className="text-xs font-semibold text-[var(--neo-text-tertiary)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Capital Outlay & Statutory Approvals</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-[30px] font-black tracking-tight text-[var(--neo-text-primary)] leading-tight">
            Ministerial & Sector Allocation Cockpit
          </h1>
          <p className="text-sm text-[var(--neo-text-secondary)] max-w-2xl">
            Portfolio intelligence for line ministries, NITI Aayog, and central departments. Review sector fund absorption, statutory clearance delays, and inter-state progress.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-2.5">
          <div className="px-4 py-2 rounded-xl bg-[var(--neo-surface-inset)] border border-[rgba(200,212,226,0.6)] text-xs font-bold text-purple-700 flex items-center gap-2">
            <Landmark className="w-4 h-4" />
            <span>FY 2026-27 Allocation Tracking</span>
          </div>
        </div>
      </div>

      {/* 4 MINISTRY METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4.5 rounded-2xl neo-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider">
              Monitored Ministries
            </span>
            <div className="p-1.5 rounded-xl neo-inset-sm text-purple-600">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[var(--neo-text-primary)] font-mono">
            {ministryStats.length} Line Ministries
          </div>
          <div className="mt-2 pt-2 border-t border-[rgba(200,212,226,0.45)] text-[10px] text-[var(--neo-text-secondary)] font-semibold">
            MoRTH, Railways, MoCA, Power, Petroleum
          </div>
        </div>

        <div className="p-4.5 rounded-2xl neo-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider">
              Average Fund Absorption
            </span>
            <div className="p-1.5 rounded-xl neo-inset-sm text-[#1557D6]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#1557D6] font-mono">
            68.4%
          </div>
          <div className="mt-2 pt-2 border-t border-[rgba(200,212,226,0.45)] text-[10px] text-emerald-700 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            On track with Q2 targets
          </div>
        </div>

        <div className="p-4.5 rounded-2xl neo-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider">
              Inter-Agency Clearances
            </span>
            <div className="p-1.5 rounded-xl neo-inset-sm text-amber-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 font-mono">
            23 Clearances
          </div>
          <div className="mt-2 pt-2 border-t border-[rgba(200,212,226,0.45)] text-[10px] text-amber-700 font-bold">
            Forest, Wildlife & Railway Crossings
          </div>
        </div>

        <div className="p-4.5 rounded-2xl neo-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider">
              Flagship Schemes
            </span>
            <div className="p-1.5 rounded-xl neo-inset-sm text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 font-mono">
            96.1%
          </div>
          <div className="mt-2 pt-2 border-t border-[rgba(200,212,226,0.45)] text-[10px] text-[var(--neo-text-secondary)] font-semibold">
            PM GatiShakti & Bharatmala
          </div>
        </div>
      </div>

      {/* MINISTRY CAPITAL EXPENDITURE TABLE */}
      <div className="neo-panel overflow-hidden">
        <div className="p-4 border-b border-[rgba(200,212,226,0.45)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-black text-[var(--neo-text-primary)]">
              Ministry-wise Capital Outlay & Fund Utilization
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
            Cabinet Committee on Infrastructure (CCI)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--neo-surface-inset)] text-[10px] font-black uppercase tracking-wider text-[var(--neo-text-secondary)] border-b border-[rgba(200,212,226,0.45)]">
              <tr>
                <th className="p-3">Ministry / Department</th>
                <th className="p-3 text-center">Active Projects</th>
                <th className="p-3 text-right">Sanctioned Outlay</th>
                <th className="p-3 text-right">Cumulative Expenditure</th>
                <th className="p-3 text-center">Fund Absorption Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(200,212,226,0.3)]">
              {ministryStats.map((item) => (
                <tr key={item.ministry} className="hover:bg-[var(--neo-surface-raised)] transition-colors">
                  <td className="p-3 font-bold text-[var(--neo-text-primary)]">{item.ministry}</td>
                  <td className="p-3 text-center font-mono font-bold text-[#1557D6]">{item.count}</td>
                  <td className="p-3 text-right font-mono font-bold text-[var(--neo-text-primary)]">
                    ₹{Math.round(item.cost).toLocaleString('en-IN')} Cr
                  </td>
                  <td className="p-3 text-right font-mono font-medium text-[var(--neo-text-secondary)]">
                    ₹{Math.round(item.expenditure).toLocaleString('en-IN')} Cr
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-20 bg-[var(--neo-surface-inset)] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-purple-600 h-full rounded-full"
                          style={{ width: `${Math.min(100, item.absorption)}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-[11px] text-purple-700">
                        {item.absorption}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
