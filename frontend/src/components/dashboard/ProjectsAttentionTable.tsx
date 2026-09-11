import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  X,
  Building2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { InfraProject } from '../../types/projects';
import { HealthScoreBadge } from '../ui/HealthScoreBadge';
import { RiskBadge } from '../ui/RiskBadge';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';
import { exportProjectsToCsv } from '../../utils/exportCsv';

interface ProjectsAttentionTableProps {
  projects: InfraProject[];
  selectedStateFilter: string | null;
  onClearStateFilter: () => void;
  onSelectProject: (project: InfraProject) => void;
  activeKpiFilter?: string;
}

export const ProjectsAttentionTable: React.FC<ProjectsAttentionTableProps> = ({
  projects,
  selectedStateFilter,
  onClearStateFilter,
  onSelectProject,
  activeKpiFilter,
}) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [sortField, setSortField] = useState<'health' | 'delay' | 'cost' | 'trend'>('health');
  const [sortAsc, setSortAsc] = useState(true);

  // Available sectors in current data
  const availableSectors = useMemo(() => {
    const set = new Set(projects.map((p) => p.sector));
    return ['ALL', ...Array.from(set)];
  }, [projects]);

  // Filtered & Sorted Projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        // State Filter from Map
        if (selectedStateFilter && !p.state.toLowerCase().includes(selectedStateFilter.toLowerCase())) {
          return false;
        }

        // KPI card filter
        if (activeKpiFilter === 'CRITICAL' && p.riskLevel !== 'CRITICAL') return false;
        if (activeKpiFilter === 'AT_RISK' && p.riskLevel === 'STABLE') return false;
        if (activeKpiFilter === 'DETERIORATING' && p.riskTrend <= 0) return false;
        if (activeKpiFilter === 'NEEDS_REVIEW' && p.healthScore >= 75) return false;

        // Search text
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const match =
            p.name.toLowerCase().includes(term) ||
            p.code.toLowerCase().includes(term) ||
            p.state.toLowerCase().includes(term) ||
            p.sector.toLowerCase().includes(term) ||
            (p.ministry && p.ministry.toLowerCase().includes(term)) ||
            p.primaryRiskDriver.toLowerCase().includes(term);
          if (!match) return false;
        }

        // Sector Filter
        if (sectorFilter !== 'ALL' && p.sector !== sectorFilter) return false;

        // Risk Filter
        if (riskFilter !== 'ALL' && p.riskLevel !== riskFilter) return false;

        return true;
      })
      .sort((a, b) => {
        let valA = 0;
        let valB = 0;
        if (sortField === 'health') {
          valA = a.healthScore;
          valB = b.healthScore;
        } else if (sortField === 'delay') {
          valA = a.predictedDelayMonths;
          valB = b.predictedDelayMonths;
        } else if (sortField === 'cost') {
          valA = a.predictedCostOverrunCr;
          valB = b.predictedCostOverrunCr;
        } else if (sortField === 'trend') {
          valA = a.riskTrend;
          valB = b.riskTrend;
        }
        return sortAsc ? valA - valB : valB - valA;
      });
  }, [
    projects,
    selectedStateFilter,
    activeKpiFilter,
    searchTerm,
    sectorFilter,
    riskFilter,
    sortField,
    sortAsc,
  ]);

  const toggleSort = (field: 'health' | 'delay' | 'cost' | 'trend') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="neo-panel p-5 sm:p-6 space-y-4">
      {/* Table Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[rgba(200,212,226,0.45)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-pulse" />
            <h3 className="text-base sm:text-lg font-black text-[var(--neo-text-primary)] tracking-tight">
              Projects Requiring Attention
            </h3>
            <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-md uppercase">
              {filteredProjects.length} Actionable
            </span>
          </div>
          <p className="text-xs text-[var(--neo-text-secondary)] mt-1">
            Prioritized by key risk driver sensitivity, schedule slippage, and capital overrun.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Active State Filter Chip */}
          {selectedStateFilter && (
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl neo-inset-sm text-[#1557D6] text-xs font-bold">
              <span>State: {selectedStateFilter}</span>
              <button
                type="button"
                onClick={onClearStateFilter}
                className="hover:text-blue-900 p-0.5 cursor-pointer"
                title="Remove state filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Active KPI Filter Chip */}
          {activeKpiFilter && activeKpiFilter !== 'ALL' && (
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl neo-inset-sm text-amber-800 text-xs font-bold">
              <span>Filter: {activeKpiFilter}</span>
            </div>
          )}

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter table..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="neo-input text-xs text-[var(--neo-text-primary)] placeholder:text-slate-400 rounded-xl pl-8 pr-3 py-1.5 focus:outline-none w-44 sm:w-56"
            />
          </div>

          {/* Sector Select */}
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="neo-input text-xs text-[var(--neo-text-primary)] font-semibold rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Sectors</option>
            {availableSectors.filter((s) => s !== 'ALL').map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>

          {/* Risk Level Select */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="neo-input text-xs text-[var(--neo-text-primary)] font-semibold rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Risks</option>
            <option value="CRITICAL">Critical Risk</option>
            <option value="HIGH">High Risk</option>
            <option value="MEDIUM">Medium / Watch</option>
            <option value="STABLE">Stable</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto rounded-xl border border-[rgba(200,212,226,0.6)] neo-card p-0">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[var(--neo-surface-inset)] border-b border-[rgba(200,212,226,0.5)] text-[10px] font-bold uppercase text-[var(--neo-text-tertiary)] tracking-wider select-none">
              <th className="py-3 px-4">Project & Implementing Agency</th>
              <th className="py-3 px-3">Ministry</th>
              <th className="py-3 px-3">Sector</th>
              <th className="py-3 px-3">State</th>
              <th
                className="py-3 px-3 cursor-pointer hover:text-[#0B1F3A]"
                onClick={() => toggleSort('health')}
              >
                <div className="flex items-center gap-1">
                  <span>Health</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="py-3 px-3 cursor-pointer hover:text-[#0B1F3A]"
                onClick={() => toggleSort('trend')}
              >
                <div className="flex items-center gap-1">
                  <span>Risk Trend</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-4">Top Risk Driver</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                  No infrastructure projects match the active search or state filter criteria.
                </td>
              </tr>
            ) : (
              filteredProjects.map((project) => {
                const isDeteriorating = project.riskTrend > 0;

                return (
                  <tr
                    key={project.id}
                    onClick={() => onSelectProject(project)}
                    className="hover:bg-[var(--neo-surface-inset)] transition-colors cursor-pointer group border-b border-[rgba(200,212,226,0.35)]"
                  >
                    {/* Project & Agency */}
                    <td className="py-3 px-4 min-w-[260px]">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono text-[10px] font-bold text-[#1557D6] neo-inset-sm px-1.5 py-0.5 rounded-md">
                          {project.code}
                        </span>
                        <RiskBadge level={project.riskLevel} />
                      </div>
                      <p className="font-bold text-[var(--neo-text-primary)] group-hover:text-[#1557D6] transition-colors leading-snug line-clamp-1">
                        {project.name}
                      </p>
                      <p className="text-[10px] text-[var(--neo-text-tertiary)] mt-0.5 truncate">
                        {project.implementingAgency}
                      </p>
                    </td>

                    {/* Ministry */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="font-bold text-[var(--neo-text-secondary)] neo-inset-sm px-2 py-0.5 rounded-md text-[11px]">
                        {project.ministry || 'Infrastructure'}
                      </span>
                    </td>

                    {/* Sector */}
                    <td className="py-3 px-3 whitespace-nowrap text-slate-600 font-medium">
                      {project.sector}
                    </td>

                    {/* State */}
                    <td className="py-3 px-3 whitespace-nowrap text-slate-700 font-semibold">
                      {project.state}
                    </td>

                    {/* Health Score */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <HealthScoreBadge score={project.healthScore} />
                    </td>

                    {/* Risk Trend */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div
                        className={`inline-flex items-center gap-1 font-bold text-xs font-mono px-2 py-0.5 rounded ${
                          isDeteriorating
                            ? 'text-[#DC2626] bg-red-50'
                            : 'text-[#15803D] bg-emerald-50'
                        }`}
                      >
                        {isDeteriorating ? (
                          <>
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>↑ {project.riskTrend}</span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="w-3.5 h-3.5" />
                            <span>↓ {Math.abs(project.riskTrend)}</span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Top Risk Driver */}
                    <td className="py-3 px-4 min-w-[200px] max-w-xs">
                      <p className="text-slate-700 font-medium line-clamp-1 leading-snug">
                        {project.primaryRiskDriver}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">
                        +{project.predictedDelayMonths} mo | +₹{project.predictedCostOverrunCr} Cr
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#155EEF] text-[#155EEF] font-bold text-[11px] group-hover:bg-[#155EEF] group-hover:text-white transition-all shadow-2xs cursor-pointer"
                      >
                        <span>Dossier</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-slate-500">
        <span>Showing {filteredProjects.length} of {projects.length} prioritized mega projects</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (filteredProjects.length === 0) {
                toast.warning('No Records to Export', 'There are no prioritized projects in the current view.');
                return;
              }
              try {
                const dateStr = new Date().toISOString().slice(0, 10);
                exportProjectsToCsv(filteredProjects, {
                  filename: `InfraPredict_Attention_Projects_${dateStr}.csv`,
                });
                toast.success(
                  'CSV Export Downloaded',
                  `Successfully exported ${filteredProjects.length} prioritized projects to CSV.`
                );
              } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : 'Failed to export CSV';
                toast.error('Export Failed', msg);
              }
            }}
            className="font-bold text-[#155EEF] hover:underline cursor-pointer"
          >
            Export Filtered CSV
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="font-bold text-[#155EEF] hover:underline cursor-pointer"
          >
            Open Full Projects Directory →
          </button>
        </div>
      </div>
    </div>
  );
};
