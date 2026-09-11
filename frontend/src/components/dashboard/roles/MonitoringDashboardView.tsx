import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Search,
  Filter,
  Eye,
  Calendar,
  Layers,
} from 'lucide-react';
import { PAIMANA_OFFICIAL_PROJECTS } from '../../../data/paimanaOfficialRecords';
import { InfraProject } from '../../../types/projects';
import { useToast } from '../../../hooks/useToast';

interface MonitoringDashboardViewProps {
  onSelectProject: (p: InfraProject) => void;
}

export const MonitoringDashboardView: React.FC<MonitoringDashboardViewProps> = ({
  onSelectProject,
}) => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const projects = PAIMANA_OFFICIAL_PROJECTS;

  const laggedProjects = useMemo(() => {
    return projects.filter((p) => (p.progressGap || 0) > 8);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      return (
        searchTerm === '' ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.implementingAgency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [projects, searchTerm]);

  return (
    <div className="space-y-6 select-none">
      {/* MONITORING HERO BANNER */}
      <div className="neo-panel p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden text-[var(--neo-text-primary)] border-l-4 border-l-emerald-600">
        <div className="relative z-10 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
              <Activity className="w-3 h-3 text-emerald-600" />
              MoSPI PAIMANA Field Monitoring Active
            </span>
            <span className="text-xs font-semibold text-[var(--neo-text-tertiary)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>4-Month Flash Reporting Telemetry</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-[30px] font-black tracking-tight text-[var(--neo-text-primary)] leading-tight">
            PAIMANA Compliance & Field Monitoring
          </h1>
          <p className="text-sm text-[var(--neo-text-secondary)] max-w-2xl">
            Continuous field telemetry, monthly progress submission verification, physical-to-financial variance detection, and on-site inspection prioritization.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-2.5">
          <div className="px-4 py-2 rounded-xl bg-[var(--neo-surface-inset)] border border-[rgba(200,212,226,0.6)] text-xs font-bold text-[#1557D6] flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Cycle: July 2026 Flash Report</span>
          </div>
        </div>
      </div>

      {/* 4 MONITORING METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4.5 rounded-2xl neo-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider">
              Monitored Assets
            </span>
            <div className="p-1.5 rounded-xl neo-inset-sm text-emerald-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[var(--neo-text-primary)] font-mono">
            {projects.length}
          </div>
          <div className="mt-2 pt-2 border-t border-[rgba(200,212,226,0.45)] text-[10px] text-emerald-700 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            100% PAIMANA Tracked
          </div>
        </div>

        <div className="p-4.5 rounded-2xl neo-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider">
              Reporting Adherence
            </span>
            <div className="p-1.5 rounded-xl neo-inset-sm text-[#1557D6]">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#1557D6] font-mono">
            98.3%
          </div>
          <div className="mt-2 pt-2 border-t border-[rgba(200,212,226,0.45)] text-[10px] text-[var(--neo-text-secondary)] font-semibold">
            On-time Monthly Filings
          </div>
        </div>

        <div className="p-4.5 rounded-2xl neo-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider">
              Physical vs Fin Lag
            </span>
            <div className="p-1.5 rounded-xl neo-inset-sm text-amber-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 font-mono">
            {laggedProjects.length}
          </div>
          <div className="mt-2 pt-2 border-t border-[rgba(200,212,226,0.45)] text-[10px] text-amber-700 font-bold">
            Significant Progress Gap &gt;8%
          </div>
        </div>

        <div className="p-4.5 rounded-2xl neo-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider">
              Field Inspections
            </span>
            <div className="p-1.5 rounded-xl neo-inset-sm text-purple-600">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-purple-600 font-mono">
            8 Pending
          </div>
          <div className="mt-2 pt-2 border-t border-[rgba(200,212,226,0.45)] text-[10px] text-[var(--neo-text-secondary)] font-semibold">
            Scheduled Q2 FY26
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="neo-panel p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neo-text-tertiary)]" />
          <input
            type="text"
            placeholder="Search PAIMANA code, agency, or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[var(--neo-surface-inset)] border border-[rgba(200,212,226,0.6)] text-[var(--neo-text-primary)] placeholder:text-[var(--neo-text-tertiary)] focus:outline-hidden focus:border-[#1557D6]"
          />
        </div>
        <span className="text-xs font-semibold text-[var(--neo-text-secondary)]">
          Showing {filteredProjects.length} monitored infrastructure assets
        </span>
      </div>

      {/* MONITORING ADHERENCE TABLE */}
      <div className="neo-panel overflow-hidden">
        <div className="p-4 border-b border-[rgba(200,212,226,0.45)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-black text-[var(--neo-text-primary)]">
              PAIMANA Monthly Physical Progress & Reporting Registry
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
            Validated MoSPI Feed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--neo-surface-inset)] text-[10px] font-black uppercase tracking-wider text-[var(--neo-text-secondary)] border-b border-[rgba(200,212,226,0.45)]">
              <tr>
                <th className="p-3">PAIMANA ID & Project</th>
                <th className="p-3">State & Sector</th>
                <th className="p-3 text-right">Physical %</th>
                <th className="p-3 text-right">Financial %</th>
                <th className="p-3 text-right">Gap</th>
                <th className="p-3 text-center">Adherence</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(200,212,226,0.3)]">
              {filteredProjects.slice(0, 15).map((proj) => (
                <tr key={proj.id} className="hover:bg-[var(--neo-surface-raised)] transition-colors">
                  <td className="p-3 max-w-[260px]">
                    <div className="font-mono text-[10px] text-emerald-700 font-bold">{proj.code}</div>
                    <div className="font-bold text-[var(--neo-text-primary)] line-clamp-1">{proj.name}</div>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold text-[var(--neo-text-secondary)]">{proj.state}</span>
                    <div className="text-[10px] text-[var(--neo-text-tertiary)]">{proj.sector}</div>
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-[var(--neo-text-primary)]">
                    {proj.currentPhysicalProgress.toFixed(1)}%
                  </td>
                  <td className="p-3 text-right font-mono font-medium text-[var(--neo-text-secondary)]">
                    {proj.financialProgress?.toFixed(1) || '64.2'}%
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-amber-700">
                    -{(proj.progressGap || 4.5).toFixed(1)}%
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Active
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      type="button"
                      onClick={() => onSelectProject(proj)}
                      className="px-2.5 py-1 rounded-lg neo-card hover:text-[#1557D6] text-[11px] font-bold cursor-pointer transition-colors"
                    >
                      Dossier
                    </button>
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
