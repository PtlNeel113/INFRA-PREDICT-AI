import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  AlertTriangle,
  Clock,
  CheckCircle2,
  TrendingDown,
  FileSpreadsheet,
  ChevronRight,
  Filter,
  Search,
  Zap,
} from 'lucide-react';
import { PAIMANA_OFFICIAL_PROJECTS } from '../../../data/paimanaOfficialRecords';
import { InfraProject } from '../../../types/projects';
import { useToast } from '../../../hooks/useToast';

interface ProjectManagerDashboardViewProps {
  onSelectProject: (p: InfraProject) => void;
}

export const ProjectManagerDashboardView: React.FC<ProjectManagerDashboardViewProps> = ({
  onSelectProject,
}) => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDelay, setFilterDelay] = useState<string>('ALL');

  const projects = PAIMANA_OFFICIAL_PROJECTS;

  const slippingProjects = useMemo(() => {
    return projects.filter((p) => (p.predictedDelayMonths || 0) > 0);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        searchTerm === '' ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.implementingAgency.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDelay =
        filterDelay === 'ALL' ||
        (filterDelay === 'CRITICAL' && (p.predictedDelayMonths || 0) >= 6) ||
        (filterDelay === 'MODERATE' && (p.predictedDelayMonths || 0) > 0 && (p.predictedDelayMonths || 0) < 6);
      return matchSearch && matchDelay;
    });
  }, [projects, searchTerm, filterDelay]);

  return (
    <div className="space-y-6 select-none">
      {/* PM HERO BANNER */}
      <div className="neo-panel p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden text-[var(--neo-text-primary)] border-l-4 border-l-indigo-600">
        <div className="relative z-10 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200 shadow-2xs">
              <Briefcase className="w-3 h-3 text-indigo-600" />
              Project Operations & Execution
            </span>
            <span className="text-xs font-semibold text-[var(--neo-text-tertiary)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Critical Path & Milestone Adherence Active</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-[30px] font-black tracking-tight text-[var(--neo-text-primary)] leading-tight">
            Project Execution & Milestone Cockpit
          </h1>
          <p className="text-sm text-[var(--neo-text-secondary)] max-w-2xl">
            Operational dashboard for project managers. Track contractor deliverables, milestone slippages, critical path bottlenecks, and schedule variances.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setFilterDelay('CRITICAL');
              toast.info('Filter Applied', 'Showing projects with severe critical path delay (>6 months).');
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl neo-button-primary text-xs font-bold text-white transition-all cursor-pointer shadow-[3px_3px_8px_rgba(21,87,214,0.3)]"
          >
            <Clock className="w-4 h-4" />
            <span>VIEW CRITICAL PATH SLIPS</span>
          </button>
        </div>
      </div>

      {/* 4 PM METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4.5 rounded-2xl neo-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider">
              Active Packages
            </span>
            <div className="p-1.5 rounded-xl neo-inset-sm text-indigo-600">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[var(--neo-text-primary)] font-mono">
            {projects.length}
          </div>
          <div className="mt-2 pt-2 border-t border-[rgba(200,212,226,0.45)] text-[10px] text-[var(--neo-text-secondary)] font-semibold">
            Under Active Execution
          </div>
        </div>

        <div className="p-4.5 rounded-2xl neo-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider">
              Slipping Schedules
            </span>
            <div className="p-1.5 rounded-xl neo-inset-sm text-[#DC2626]">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#DC2626] font-mono">
            {slippingProjects.length}
          </div>
          <div className="mt-2 pt-2 border-t border-[rgba(200,212,226,0.45)] text-[10px] text-[#DC2626] font-bold">
            Behind Original Deadline
          </div>
        </div>

        <div className="p-4.5 rounded-2xl neo-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider">
              Average Progress Gap
            </span>
            <div className="p-1.5 rounded-xl neo-inset-sm text-amber-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 font-mono">
            -8.4%
          </div>
          <div className="mt-2 pt-2 border-t border-[rgba(200,212,226,0.45)] text-[10px] text-[var(--neo-text-secondary)] font-semibold">
            Physical vs Target Gap
          </div>
        </div>

        <div className="p-4.5 rounded-2xl neo-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider">
              Site Interventions
            </span>
            <div className="p-1.5 rounded-xl neo-inset-sm text-[#1557D6]">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#1557D6] font-mono">
            14 Active
          </div>
          <div className="mt-2 pt-2 border-t border-[rgba(200,212,226,0.45)] text-[10px] text-[var(--neo-text-secondary)] font-semibold">
            Clearance & ROW Accelerations
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTER */}
      <div className="neo-panel p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neo-text-tertiary)]" />
          <input
            type="text"
            placeholder="Search projects or contractors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[var(--neo-surface-inset)] border border-[rgba(200,212,226,0.6)] text-[var(--neo-text-primary)] placeholder:text-[var(--neo-text-tertiary)] focus:outline-hidden focus:border-[#1557D6]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[var(--neo-text-tertiary)]" />
          <span className="text-xs font-semibold text-[var(--neo-text-secondary)]">Schedule Filter:</span>
          <select
            value={filterDelay}
            onChange={(e) => setFilterDelay(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-[var(--neo-surface-inset)] border border-[rgba(200,212,226,0.6)] text-[var(--neo-text-primary)] font-semibold"
          >
            <option value="ALL">All Projects ({projects.length})</option>
            <option value="CRITICAL">Severe Delay &gt;6 mo</option>
            <option value="MODERATE">Moderate Delay 1-5 mo</option>
          </select>
        </div>
      </div>

      {/* OPERATIONAL PROJECTS & MILESTONES TABLE */}
      <div className="neo-panel overflow-hidden">
        <div className="p-4 border-b border-[rgba(200,212,226,0.45)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#1557D6]" />
            <h3 className="text-sm font-black text-[var(--neo-text-primary)]">
              Operational Schedule & Critical Path Tracking
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
            Real-time Execution Telemetry
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--neo-surface-inset)] text-[10px] font-black uppercase tracking-wider text-[var(--neo-text-secondary)] border-b border-[rgba(200,212,226,0.45)]">
              <tr>
                <th className="p-3">Project & Contractor</th>
                <th className="p-3">Current Stage</th>
                <th className="p-3 text-right">Physical Progress</th>
                <th className="p-3 text-right">Delay (Months)</th>
                <th className="p-3">Primary Risk Bottleneck</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(200,212,226,0.3)]">
              {filteredProjects.slice(0, 15).map((proj) => (
                <tr key={proj.id} className="hover:bg-[var(--neo-surface-raised)] transition-colors">
                  <td className="p-3 max-w-[260px]">
                    <div className="font-bold text-[var(--neo-text-primary)] line-clamp-1">{proj.name}</div>
                    <div className="text-[10px] text-[var(--neo-text-tertiary)]">{proj.implementingAgency}</div>
                  </td>
                  <td className="p-3 font-semibold text-[var(--neo-text-secondary)]">{proj.stage}</td>
                  <td className="p-3 text-right font-mono font-bold text-[var(--neo-text-primary)]">
                    {proj.currentPhysicalProgress.toFixed(1)}%
                    <div className="text-[10px] text-red-600 font-semibold">
                      Gap: -{(proj.progressGap || 5.2).toFixed(1)}%
                    </div>
                  </td>
                  <td className="p-3 text-right font-mono font-black text-amber-700">
                    +{proj.predictedDelayMonths || 0} mo
                  </td>
                  <td className="p-3 text-[var(--neo-text-secondary)] max-w-[220px] truncate">
                    {proj.primaryRiskDriver || 'Site Mobilization & Approvals'}
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
