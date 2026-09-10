import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import {
  MapPin,
  ShieldAlert,
  RotateCcw,
  Calendar,
  Layers,
  Search,
  Filter,
  X,
  TrendingUp,
  AlertTriangle,
  Flame,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { IndiaRiskMap } from '../../components/map/IndiaRiskMap';
import { MapLegend } from '../../components/map/MapLegend';
import { RiskIntelligencePanel } from '../../components/map/RiskIntelligencePanel';
import { MapAnalytics } from '../../components/map/MapAnalytics';
import { PriorityProjectsSection } from '../../components/map/PriorityProjectsSection';
import { StateDrawer } from '../../components/map/StateDrawer';
import { DecisionModePanel } from '../../components/map/DecisionModePanel';
import { ReportingPeriod, StateGeoSummary, ProjectGeoData } from '../../types/map';
import { PaimanaDataService, PaimanaFilterOptions } from '../../data/paimanaDataService';
import { PAIMANA_STATE_METADATA } from '../../data/paimanaData';
import { SECTOR_OPTIONS, MINISTRY_OPTIONS, PROJECT_GEO_DATA } from '../../data/mapData';
import { useProjectStore } from '../../store/projectStore';
import { useToast } from '../../hooks/useToast';

export const NationalRiskMapPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const customProjects = useProjectStore((state) => state.projects);

  // 1. Reporting Period Selection (Step 9)
  const [reportingPeriod, setReportingPeriod] = useState<ReportingPeriod>('July 2026');
  const availablePeriods: ReportingPeriod[] = ['April 2026', 'May 2026', 'June 2026', 'July 2026'];

  // 2. Filters & Search State
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [activeRiskFilter, setActiveRiskFilter] = useState<string>('ALL');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [selectedMinistry, setSelectedMinistry] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  // 3. Modals & Drawers
  const [drawerState, setDrawerState] = useState<StateGeoSummary | null>(null);
  const [isDecisionMode, setIsDecisionMode] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectGeoData | null>(null);

  // Compose filter options
  const filterOptions: PaimanaFilterOptions = useMemo(() => {
    let stateName: string | undefined = undefined;
    if (selectedStateId) {
      const meta = PaimanaDataService.findStateMetadata(selectedStateId);
      if (meta) stateName = meta.name;
    }

    return {
      state: stateName,
      sector: selectedSector !== 'ALL' ? selectedSector : undefined,
      ministry: selectedMinistry !== 'ALL' ? selectedMinistry : undefined,
      riskLevel: activeRiskFilter !== 'ALL' ? activeRiskFilter : undefined,
      search: searchQuery.trim() || undefined,
    };
  }, [selectedStateId, selectedSector, selectedMinistry, activeRiskFilter, searchQuery]);

  // Dynamically calculate state summaries for the map
  const stateSummaries = useMemo(() => {
    return PaimanaDataService.getStateSummaries(reportingPeriod, filterOptions, customProjects);
  }, [reportingPeriod, filterOptions, customProjects]);

  // Dynamically calculate national KPIs
  const nationalKPIs = useMemo(() => {
    return PaimanaDataService.getNationalKPIs(reportingPeriod, filterOptions, customProjects);
  }, [reportingPeriod, filterOptions, customProjects]);

  // Dynamically calculate Top Risk States
  const topRiskStates = useMemo(() => {
    return PaimanaDataService.getTopRiskStates(reportingPeriod, 5, customProjects);
  }, [reportingPeriod, customProjects]);

  // Filter priority projects
  const priorityProjects = useMemo(() => {
    return PaimanaDataService.getPriorityProjects(filterOptions, customProjects);
  }, [filterOptions, customProjects]);

  // Current selected state summary
  const selectedStateSummary = useMemo(() => {
    if (!selectedStateId) return null;
    return stateSummaries.get(selectedStateId.toLowerCase()) || null;
  }, [selectedStateId, stateSummaries]);

  // Handlers
  const handleSelectState = (summary: StateGeoSummary | null) => {
    if (!summary) {
      setSelectedStateId(null);
    } else {
      const meta = PaimanaDataService.findStateMetadata(summary.name);
      setSelectedStateId(meta?.id || summary.mapId || null);
    }
  };

  const handleResetFilters = () => {
    setSelectedStateId(null);
    setActiveRiskFilter('ALL');
    setSelectedSector('ALL');
    setSelectedMinistry('ALL');
    setSearchQuery('');
    toast.info('Filters Reset', 'Displaying all monitored projects across India');
  };

  const handleEnterDecisionMode = () => {
    setIsDecisionMode(true);
    toast.info('Decision Mode Active', 'Prioritizing projects by composite urgency score');
  };

  const activeFiltersCount =
    (selectedStateId ? 1 : 0) +
    (activeRiskFilter !== 'ALL' ? 1 : 0) +
    (selectedSector !== 'ALL' ? 1 : 0) +
    (selectedMinistry !== 'ALL' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#07111F] text-slate-900 dark:text-slate-100 flex flex-col pb-20">
      {/* ============================================================ */}
      {/* 1. PAGE HEADER (Step 11 & Step 9)                            */}
      {/* ============================================================ */}
      <header className="bg-white dark:bg-[#0B1F3A] border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8 py-5 shadow-xs sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-100 dark:border-blue-900 text-[#155EEF]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-black text-[#0B1F3A] dark:text-white tracking-tight uppercase">
                    National Infrastructure Risk Map
                  </h1>
                  <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md text-[10px] font-black bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    PAIMANA / MoSPI
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  Geospatial intelligence for identifying, comparing and prioritizing infrastructure project risk across India.
                </p>
              </div>
            </div>
          </div>

          {/* Controls: Reporting Period Selector & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Reporting Period Selector */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-900/90 rounded-xl p-1 border border-slate-200/80 dark:border-slate-800">
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 px-2">
                <Calendar className="w-3.5 h-3.5" />
                Period:
              </span>
              {availablePeriods.map((period) => (
                <button
                  key={period}
                  type="button"
                  onClick={() => setReportingPeriod(period)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    reportingPeriod === period
                      ? 'bg-white dark:bg-[#155EEF] text-[#155EEF] dark:text-white shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            {/* Decision Mode Button */}
            <button
              type="button"
              onClick={handleEnterDecisionMode}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-700 hover:to-indigo-700 text-white text-xs font-black tracking-wide shadow-md shadow-red-500/20 transition-all cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>DECISION MODE</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 space-y-6 flex-1">
        {/* ============================================================ */}
        {/* 2. KPI STRIP (Step 10)                                      */}
        {/* ============================================================ */}
        <section aria-label="National Portfolio KPIs">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {/* Total Monitored Projects */}
            <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Total Monitored
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-[#0B1F3A] dark:text-white font-mono">
                  {nationalKPIs.totalProjects.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 font-semibold">projects</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                Cycle: {reportingPeriod}
              </span>
            </div>

            {/* High Priority Projects */}
            <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block mb-1">
                High Priority
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-orange-600 dark:text-orange-400 font-mono">
                  {nationalKPIs.highPriorityCount.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 font-semibold">projects</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                Critical + High risk segments
              </span>
            </div>

            {/* Critical Severity Projects */}
            <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 block mb-1">
                Critical Escalation
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-red-600 dark:text-red-400 font-mono">
                  {nationalKPIs.criticalCount.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 font-semibold">urgent</span>
              </div>
              <span className="text-[10px] text-red-500 dark:text-red-400 font-bold block mt-1">
                Requires Cabinet Review
              </span>
            </div>

            {/* Portfolio Value & Variance */}
            <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Portfolio Outlay
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-[#0B1F3A] dark:text-white font-mono">
                  ₹{(nationalKPIs.totalRevisedCostCr / 100000).toFixed(2)}L
                </span>
                <span className="text-xs font-bold text-slate-500">Cr</span>
              </div>
              <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold block mt-1">
                +₹{(nationalKPIs.costOverrunCr / 1000).toFixed(1)}K Cr Revision Gap
              </span>
            </div>

            {/* Cumulative Expenditure & Progress */}
            <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs col-span-2 sm:col-span-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Cumulative Spend
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  ₹{(nationalKPIs.totalExpenditureCr / 100000).toFixed(2)}L
                </span>
                <span className="text-xs font-bold text-slate-500">Cr</span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">
                Avg Progress: <strong className="text-slate-800 dark:text-slate-200">{nationalKPIs.averagePhysicalProgress}%</strong>
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. SEARCH & CONTROL STRIP                                    */}
        {/* ============================================================ */}
        <section className="bg-white dark:bg-[#0F1D2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search state, project code (e.g. NHAI-DL-001) or project name..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#155EEF]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* State Filter Dropdown */}
            <div className="w-full md:w-56">
              <select
                value={selectedStateId || ''}
                onChange={(e) => setSelectedStateId(e.target.value || null)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155EEF]"
              >
                <option value="">All States & UTs (36)</option>
                {PAIMANA_STATE_METADATA.map((meta) => (
                  <option key={meta.id} value={meta.id}>
                    {meta.name} ({meta.shortCode})
                  </option>
                ))}
              </select>
            </div>

            {/* Toggle Advanced Filters */}
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer w-full md:w-auto ${
                showAdvancedFilters || activeFiltersCount > 0
                  ? 'bg-blue-50 dark:bg-blue-950/70 text-[#155EEF] border-blue-300 dark:border-blue-800'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#155EEF] text-white text-[10px] font-black flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Reset Button */}
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Collapsible Advanced Filters */}
          {showAdvancedFilters && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                  Sector
                </label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium"
                >
                  <option value="ALL">All Infrastructure Sectors</option>
                  {SECTOR_OPTIONS.filter((s) => s !== 'All Sectors').map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                  Ministry
                </label>
                <select
                  value={selectedMinistry}
                  onChange={(e) => setSelectedMinistry(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium"
                >
                  <option value="ALL">All Ministries</option>
                  {MINISTRY_OPTIONS.filter((m) => m !== 'All Ministries').map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                  Risk Severity Filter
                </label>
                <select
                  value={activeRiskFilter}
                  onChange={(e) => setActiveRiskFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium"
                >
                  <option value="ALL">All Risk Levels</option>
                  <option value="CRITICAL">Critical Only</option>
                  <option value="HIGH">High Risk Only</option>
                  <option value="WATCH">Watchlist Only</option>
                  <option value="STABLE">Stable Execution Only</option>
                </select>
              </div>
            </div>
          )}
        </section>

        {/* ============================================================ */}
        {/* 4. MAIN INTELLIGENCE AREA (Step 2, 5, 6, 7, 11, 15)          */}
        {/* ============================================================ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main India SVG Map (col-span-12 lg:col-span-8 xl:col-span-9) */}
          <div className="lg:col-span-8 xl:col-span-8 relative">
            <IndiaRiskMap
              stateSummaries={stateSummaries}
              selectedStateId={selectedStateId}
              onSelectState={handleSelectState}
              reportingPeriod={reportingPeriod}
              activeRiskFilter={activeRiskFilter}
              onSelectRiskFilter={setActiveRiskFilter}
            />

            {/* Semantic Map Legend Overlay */}
            <div className="absolute bottom-4 left-4 z-20">
              <MapLegend
                reportingPeriod={reportingPeriod}
                totalProjects={nationalKPIs.totalProjects}
                activeRiskFilter={activeRiskFilter}
                onSelectRiskFilter={setActiveRiskFilter}
              />
            </div>
          </div>

          {/* Right-Side Risk Intelligence Panel (col-span-12 lg:col-span-4 xl:col-span-4) */}
          <div className="lg:col-span-4 xl:col-span-4">
            <RiskIntelligencePanel
              kpiSummary={nationalKPIs}
              topRiskStates={topRiskStates}
              selectedStateSummary={selectedStateSummary}
              onSelectState={handleSelectState}
              reportingPeriod={reportingPeriod}
              activeRiskFilter={activeRiskFilter}
              onSelectRiskFilter={setActiveRiskFilter}
            />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. LOWER ANALYTICS (Step 13 & Step 14)                      */}
        {/* ============================================================ */}
        <section aria-label="Sector and Trajectory Analytics">
          <MapAnalytics reportingPeriod={reportingPeriod} />
        </section>

        {/* ============================================================ */}
        {/* 6. PRIORITY PROJECTS FOR EXECUTIVE REVIEW (Step 16)         */}
        {/* ============================================================ */}
        <section aria-label="Priority Projects">
          <PriorityProjectsSection
            projects={priorityProjects}
            selectedStateName={selectedStateSummary?.name}
            onClearStateFilter={() => setSelectedStateId(null)}
            onProjectClick={(id) => {
              const matched = PROJECT_GEO_DATA.find((p) => p.id === id);
              if (matched) {
                setSelectedProject(matched);
              } else {
                navigate(`/projects/${id}`);
              }
            }}
          />
        </section>
      </main>

      {/* State Detail Drawer (preserved from original app for deep dive) */}
      <AnimatePresence>
        {drawerState && (
          <StateDrawer
            state={drawerState}
            onClose={() => setDrawerState(null)}
            onProjectSelect={(project) => {
              setSelectedProject(project);
            }}
          />
        )}
      </AnimatePresence>

      {/* Decision Mode Panel (preserved) */}
      <AnimatePresence>
        {isDecisionMode && (
          <DecisionModePanel
            projects={PROJECT_GEO_DATA}
            onClose={() => setIsDecisionMode(false)}
            onProjectSelect={(project) => {
              setSelectedProject(project);
              navigate(`/projects/${project.id}`);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
export default NationalRiskMapPage;
