import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Download,
  Loader2,
  AlertTriangle,
  Layers,
  Building2,
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  Clock,
  DollarSign,
  FileSpreadsheet,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';
import { InfraProject, ProjectStage } from '../../types/projects';
import { RiskBadge } from '../../components/ui/RiskBadge';
import { HealthScoreBadge } from '../../components/ui/HealthScoreBadge';
import { RiskLevel } from '../../types/ui';
import { AddProjectModal } from '../../components/modals/AddProjectModal';
import { useToast } from '../../hooks/useToast';
import { exportProjectsToCsv } from '../../utils/exportCsv';

type SortField =
  | 'name'
  | 'sector'
  | 'state'
  | 'sanctionedCostCr'
  | 'currentPhysicalProgress'
  | 'healthScore'
  | 'costRiskScore'
  | 'timeRiskScore'
  | 'executionRiskScore'
  | 'riskTrend';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const projects = useProjectStore((state) => state.projects);
  const toast = useToast();

  // Export State
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMinistry, setSelectedMinistry] = useState<string>('ALL');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [costRange, setCostRange] = useState<string>('ALL'); // ALL, UNDER_2000, 2000_10000, ABOVE_10000

  // Sorting States
  const [sortField, setSortField] = useState<SortField>('healthScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Add Project Modal States
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  // Extract unique filter options from data
  const ministries = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.ministry && set.add(p.ministry));
    return Array.from(set);
  }, [projects]);

  const sectors = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => set.add(p.sector));
    return Array.from(set);
  }, [projects]);

  const states = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => set.add(p.state));
    return Array.from(set);
  }, [projects]);

  const stages: ProjectStage[] = [
    'Planning',
    'Pre-Construction',
    'Under Construction',
    'Testing & Commissioning',
    'Near Completion',
  ];

  // Filtering Logic
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCode = p.code.toLowerCase().includes(q);
        const matchesDriver = (p.primaryRiskDriver || '').toLowerCase().includes(q);
        const matchesAgency = (p.implementingAgency || '').toLowerCase().includes(q);
        const matchesState = (p.state || '').toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesDriver && !matchesAgency && !matchesState) return false;
      }

      // Ministry
      if (selectedMinistry !== 'ALL' && p.ministry !== selectedMinistry) return false;

      // Sector
      if (selectedSector !== 'ALL' && p.sector !== selectedSector) return false;

      // State
      if (selectedState !== 'ALL' && p.state !== selectedState) return false;

      // Risk Level
      if (selectedRisk !== 'ALL' && p.riskLevel !== selectedRisk) return false;

      // Stage
      if (selectedStage !== 'ALL' && p.stage !== selectedStage) return false;

      // Cost Range
      if (costRange === 'UNDER_2000' && p.sanctionedCostCr >= 2000) return false;
      if (costRange === '2000_10000' && (p.sanctionedCostCr < 2000 || p.sanctionedCostCr > 10000)) return false;
      if (costRange === 'ABOVE_10000' && p.sanctionedCostCr <= 10000) return false;

      return true;
    });
  }, [
    projects,
    searchQuery,
    selectedMinistry,
    selectedSector,
    selectedState,
    selectedRisk,
    selectedStage,
    costRange,
  ]);

  // Sorting Logic
  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') {
        return sortDirection === 'asc'
          ? (aVal as string).localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal as string);
      }

      return sortDirection === 'asc'
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  }, [filteredProjects, sortField, sortDirection]);

  // Paginated Projects
  const totalPages = Math.ceil(sortedProjects.length / pageSize) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedProjects.slice(start, start + pageSize);
  }, [sortedProjects, currentPage, pageSize]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedMinistry('ALL');
    setSelectedSector('ALL');
    setSelectedState('ALL');
    setSelectedRisk('ALL');
    setSelectedStage('ALL');
    setCostRange('ALL');
    setCurrentPage(1);
  };

  const handleExportCsv = (exportAll = false) => {
    const dataToExport = exportAll ? projects : filteredProjects;
    if (!dataToExport || dataToExport.length === 0) {
      toast.warning('No Records to Export', 'There are no project records matching the selected criteria.');
      return;
    }

    try {
      setIsExporting(true);
      const isFiltered = !exportAll && filteredProjects.length < projects.length;
      const scopeName = isFiltered ? 'Filtered' : 'All';
      const dateStr = new Date().toISOString().slice(0, 10);
      const filename = `InfraPredict_Projects_${scopeName}_${dateStr}.csv`;

      exportProjectsToCsv(dataToExport, { filename });

      toast.success(
        'CSV Export Downloaded',
        `Successfully exported ${dataToExport.length} infrastructure project${dataToExport.length === 1 ? '' : 's'} (${scopeName} View).`
      );
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unable to generate CSV export.';
      toast.error('Export Failed', errorMsg);
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setShowExportMenu(false);
      }, 400);
    }
  };

  return (
    <>
      <AddProjectModal isOpen={showAddProjectModal} onClose={() => setShowAddProjectModal(false)} />
      <div className="space-y-6 pb-12" id="projects-intelligence-page">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-1">
            <Layers className="w-4 h-4" />
            <span>National Infrastructure Directory</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Project Intelligence Layer</h1>
          <p className="text-sm text-slate-500 mt-1">
            Multi-dimensional risk scoring, cost escalation forecasts, and milestone tracking across India's high-value infrastructure.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Production-Ready Export CSV with Scope Menu */}
          <div className="relative">
            <div className="inline-flex items-center rounded-lg shadow-sm border border-slate-200 bg-slate-50">
              <button
                id="export-projects-csv-btn"
                type="button"
                disabled={isExporting || filteredProjects.length === 0}
                onClick={() => handleExportCsv(false)}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50 rounded-l-lg hover:text-slate-900 transition-colors cursor-pointer"
                title={`Export ${filteredProjects.length} visible project(s) to CSV`}
              >
                {isExporting ? (
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                ) : (
                  <Download className="w-4 h-4 text-slate-600" />
                )}
                <span>Export CSV</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-slate-200/80 text-slate-700 rounded-full">
                  {filteredProjects.length}
                </span>
              </button>
              <button
                type="button"
                id="export-csv-dropdown-toggle"
                disabled={isExporting}
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="px-2 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 border-l border-slate-200 rounded-r-lg hover:text-slate-900 transition-colors cursor-pointer"
                title="Choose export scope"
                aria-label="Export options"
              >
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>

            {showExportMenu && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowExportMenu(false)}
                />
                <div className="absolute right-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 text-xs animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Export Options (RFC-4180 CSV)
                  </div>
                  <button
                    type="button"
                    onClick={() => handleExportCsv(false)}
                    className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800">Current Filtered View</span>
                      <span className="text-[10px] text-slate-400">Respects search & active filters</span>
                    </div>
                    <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {filteredProjects.length}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExportCsv(true)}
                    className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer border-t border-slate-100"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800">All Portfolio Projects</span>
                      <span className="text-[10px] text-slate-400">Entire national directory</span>
                    </div>
                    <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {projects.length}
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            id="add-project-btn"
            onClick={() => setShowAddProjectModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <Building2 className="w-4 h-4" />
            <span>+ Add Project</span>
          </button>
          <button
            id="quick-risk-report-btn"
            onClick={() => navigate('/predictions')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Predictive Intelligence</span>
          </button>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        {/* Search & Top Action */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="project-search-input"
              type="text"
              placeholder="Search by project name, code (e.g. DME-PKG-14B), agency, or risk driver..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-slate-500">
              Showing <strong className="text-slate-800">{filteredProjects.length}</strong> of {projects.length} projects
            </span>
            {(searchQuery || selectedMinistry !== 'ALL' || selectedSector !== 'ALL' || selectedState !== 'ALL' || selectedRisk !== 'ALL' || selectedStage !== 'ALL' || costRange !== 'ALL') && (
              <button
                id="reset-filters-btn"
                onClick={resetFilters}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium ml-2 underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Multi-facet Filter Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-slate-100">
          {/* Ministry */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Ministry</label>
            <select
              id="filter-ministry-select"
              value={selectedMinistry}
              onChange={(e) => {
                setSelectedMinistry(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="ALL">All Ministries</option>
              {ministries.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Sector */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Sector</label>
            <select
              id="filter-sector-select"
              value={selectedSector}
              onChange={(e) => {
                setSelectedSector(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="ALL">All Sectors</option>
              {sectors.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">State / UT</label>
            <select
              id="filter-state-select"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="ALL">All States</option>
              {states.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Risk Level */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Risk Severity</label>
            <select
              id="filter-risk-select"
              value={selectedRisk}
              onChange={(e) => {
                setSelectedRisk(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="CRITICAL">Critical Risk</option>
              <option value="HIGH">High Risk</option>
              <option value="WATCH">Watch</option>
              <option value="MEDIUM">Medium</option>
              <option value="STABLE">Stable / On Track</option>
            </select>
          </div>

          {/* Project Stage */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Project Stage</label>
            <select
              id="filter-stage-select"
              value={selectedStage}
              onChange={(e) => {
                setSelectedStage(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="ALL">All Stages</option>
              {stages.map((stg) => (
                <option key={stg} value={stg}>{stg}</option>
              ))}
            </select>
          </div>

          {/* Cost Range */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Sanctioned Outlay</label>
            <select
              id="filter-cost-select"
              value={costRange}
              onChange={(e) => {
                setCostRange(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="ALL">All Outlays</option>
              <option value="UNDER_2000">&lt; ₹2,000 Cr</option>
              <option value="2000_10000">₹2,000 - ₹10,000 Cr</option>
              <option value="ABOVE_10000">&gt; ₹10,000 Cr</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Project Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden" id="projects-table-container">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold select-none">
                <th
                  className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1.5">
                    <span>Project & Code</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-3.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('sector')}
                >
                  <div className="flex items-center gap-1.5">
                    <span>Sector</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-3.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('state')}
                >
                  <div className="flex items-center gap-1.5">
                    <span>State</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-3.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('sanctionedCostCr')}
                >
                  <div className="flex items-center gap-1.5">
                    <span>Sanctioned Cost</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-3.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('currentPhysicalProgress')}
                >
                  <div className="flex items-center gap-1.5">
                    <span>Physical Progress</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-3.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('healthScore')}
                >
                  <div className="flex items-center gap-1.5">
                    <span>Health Score</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-3.5 px-2.5 text-center cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('costRiskScore')}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Cost Risk</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-3.5 px-2.5 text-center cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('timeRiskScore')}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Time Risk</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-3.5 px-2.5 text-center cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('executionRiskScore')}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Execution</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-3.5 px-3 text-center cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('riskTrend')}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>60d Trend</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedProjects.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400">
                    <AlertTriangle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="text-sm font-medium text-slate-600">No projects match the selected criteria</p>
                    <p className="text-xs text-slate-400 mt-1">Try relaxing some filters or clearing your search term.</p>
                  </td>
                </tr>
              ) : (
                paginatedProjects.map((project) => (
                  <tr
                    key={project.id}
                    id={`project-row-${project.id}`}
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="hover:bg-slate-50/90 cursor-pointer transition-colors group"
                  >
                    {/* Project Name & Code */}
                    <td className="py-3.5 px-4">
                      <div className="max-w-[280px]">
                        <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                          {project.name}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                          <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-medium">
                            {project.code}
                          </span>
                          <span>•</span>
                          <span className="truncate">{project.implementingAgency.split('(')[0]}</span>
                        </div>
                      </div>
                    </td>

                    {/* Sector */}
                    <td className="py-3.5 px-3">
                      <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-medium rounded-md whitespace-nowrap">
                        {project.sector}
                      </span>
                    </td>

                    {/* State */}
                    <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap font-medium">
                      {project.state}
                    </td>

                    {/* Cost */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">
                        ₹{project.sanctionedCostCr.toLocaleString()} Cr
                      </div>
                      {project.predictedCostOverrunCr > 0 && (
                        <div className="text-[10px] text-rose-600 font-medium">
                          +₹{project.predictedCostOverrunCr} Cr overrun
                        </div>
                      )}
                    </td>

                    {/* Physical Progress */}
                    <td className="py-3.5 px-3">
                      <div className="w-28 space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-medium text-slate-800">{project.currentPhysicalProgress}%</span>
                          <span className="text-[10px] text-slate-400">Exp: {project.expectedProgress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              project.currentPhysicalProgress < project.expectedProgress - 5
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(project.currentPhysicalProgress, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Health Score */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <HealthScoreBadge score={project.healthScore} size="sm" showLabel />
                    </td>

                    {/* Cost Risk */}
                    <td className="py-3.5 px-2.5 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded ${
                          project.costRiskScore >= 75
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : project.costRiskScore >= 50
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {project.costRiskScore}
                      </span>
                    </td>

                    {/* Time Risk */}
                    <td className="py-3.5 px-2.5 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded ${
                          project.timeRiskScore >= 75
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : project.timeRiskScore >= 50
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {project.timeRiskScore}
                      </span>
                    </td>

                    {/* Execution Risk */}
                    <td className="py-3.5 px-2.5 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded ${
                          project.executionRiskScore >= 75
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : project.executionRiskScore >= 50
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {project.executionRiskScore}
                      </span>
                    </td>

                    {/* Trend */}
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      {project.riskTrend > 0 ? (
                        <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-rose-600">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>+{project.riskTrend}</span>
                        </span>
                      ) : project.riskTrend < 0 ? (
                        <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                          <TrendingDown className="w-3.5 h-3.5" />
                          <span>{project.riskTrend}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 text-xs text-slate-400">
                          <Minus className="w-3 h-3" />
                          <span>0</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        id={`view-project-btn-${project.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/projects/${project.id}`);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
                      >
                        <span>Deep Dive</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Page <span className="font-semibold text-slate-700">{currentPage}</span> of{' '}
            <span className="font-semibold text-slate-700">{totalPages}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              id="pagination-prev-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                  currentPage === page
                    ? 'bg-indigo-700 text-white font-bold'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              id="pagination-next-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
