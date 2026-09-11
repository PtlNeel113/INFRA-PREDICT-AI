import React, { useState, useMemo, useRef } from 'react';
import india from '@svg-maps/india';
import { StateGeoSummary, ReportingPeriod } from '../../types/map';
import { PAIMANA_STATE_METADATA } from '../../data/paimanaData';
import { PaimanaDataService } from '../../data/paimanaDataService';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  AlertCircle,
  TrendingUp,
  X,
  Layers,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

interface IndiaRiskMapProps {
  stateSummaries: Map<string, StateGeoSummary>;
  selectedStateId: string | null;
  onSelectState: (state: StateGeoSummary | null) => void;
  reportingPeriod: ReportingPeriod;
  activeRiskFilter?: string;
  onSelectRiskFilter?: (filter: string) => void;
  className?: string;
}

interface HoveredStateData {
  meta: typeof PAIMANA_STATE_METADATA[0];
  summary?: StateGeoSummary;
  x: number;
  y: number;
}

export const IndiaRiskMap: React.FC<IndiaRiskMapProps> = ({
  stateSummaries,
  selectedStateId,
  onSelectState,
  reportingPeriod,
  activeRiskFilter = 'ALL',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredState, setHoveredState] = useState<HoveredStateData | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  // Map state metadata for fast O(1) lookup
  const metaMap = useMemo(() => {
    const map = new Map<string, typeof PAIMANA_STATE_METADATA[0]>();
    PAIMANA_STATE_METADATA.forEach((m) => {
      map.set(m.id.toLowerCase(), m);
    });
    return map;
  }, []);

  // Determine state fill color based on risk level
  const getStateFill = (summary?: StateGeoSummary, isHovered = false, isSelected = false): string => {
    if (isSelected) {
      return '#1E40AF'; // Deep royal blue focus for selected
    }

    if (!summary || summary.riskSeverity === 'NO_DATA' || summary.projectCount === 0) {
      return isHovered ? '#CBD5E1' : '#E2E8F0';
    }

    switch (summary.riskSeverity) {
      case 'CRITICAL':
        return isHovered ? '#B91C1C' : '#DC2626';
      case 'HIGH':
        return isHovered ? '#C2410C' : '#EA580C';
      case 'WATCH':
        return isHovered ? '#B45309' : '#D97706';
      case 'STABLE':
        return isHovered ? '#15803D' : '#16A34A';
      default:
        return isHovered ? '#CBD5E1' : '#E2E8F0';
    }
  };

  const getStateStroke = (summary?: StateGeoSummary, isHovered = false, isSelected = false): string => {
    if (isSelected) return '#FFFFFF';
    if (isHovered) return '#0B1F3A';
    return '#FFFFFF';
  };

  const getStateStrokeWidth = (isSelected = false, isHovered = false): number => {
    if (isSelected) return 2.8;
    if (isHovered) return 2.0;
    return 0.85;
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.3, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.3, 0.8));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only primary mouse button
    setIsPanning(true);
    setStartPan({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Find the selected state summary
  const selectedSummary = selectedStateId ? stateSummaries.get(selectedStateId.toLowerCase()) : null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[520px] sm:h-[600px] lg:h-[660px] bg-[#EEF2F6] dark:bg-[#091524] rounded-2xl neo-panel overflow-hidden flex items-center justify-center select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        handleMouseUp();
        setHoveredState(null);
      }}
    >
      {/* Background cartographic grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* Floating State Info Header (if a state is selected) */}
      {selectedSummary && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 neo-raised px-3.5 py-2 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1557D6] animate-pulse" />
            <span className="text-xs font-black text-[var(--neo-text-primary)] uppercase tracking-wider">
              Selected: {selectedSummary.name}
            </span>
            <span className="text-[11px] font-bold text-[var(--neo-text-secondary)]">
              ({selectedSummary.projectCount} projects)
            </span>
          </div>
          <button
            type="button"
            onClick={() => onSelectState(null)}
            className="ml-2 p-1 rounded-md hover:bg-slate-200/60 text-[var(--neo-text-tertiary)] hover:text-[var(--neo-text-primary)] transition-colors cursor-pointer"
            title="Deselect state"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Map Zoom & Pan Control Bar */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 neo-raised p-1.5 rounded-xl">
        <button
          type="button"
          onClick={handleZoomIn}
          title="Zoom in"
          className="p-2 rounded-lg hover:bg-slate-200/60 text-[var(--neo-text-secondary)] hover:text-[var(--neo-text-primary)] transition-colors cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          title="Zoom out"
          className="p-2 rounded-lg hover:bg-slate-200/60 text-[var(--neo-text-secondary)] hover:text-[var(--neo-text-primary)] transition-colors cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleResetZoom}
          title="Reset map view"
          className="p-2 rounded-lg hover:bg-slate-200/60 text-[var(--neo-text-secondary)] hover:text-[var(--neo-text-primary)] transition-colors cursor-pointer"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Interactive India SVG Canvas */}
      <div
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform duration-75"
        onMouseDown={handleMouseDown}
      >
        <svg
          viewBox={india.viewBox || '0 0 612 696'}
          className="w-full h-full max-h-[92%] object-contain filter drop-shadow-md"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: 'center center',
          }}
        >
          {/* Subtle Outer Boundary Drop Shadow */}
          <defs>
            <filter id="indiaShadow" x="-5%" y="-5%" width="115%" height="115%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Render All 36 State Paths */}
          <g filter="url(#indiaShadow)">
            {india.locations.map((loc: { id: string; name: string; path: string }) => {
              const locId = loc.id.toLowerCase();
              const meta = metaMap.get(locId) || {
                id: loc.id,
                name: loc.name,
                shortCode: loc.id.toUpperCase(),
                aliases: [],
                cx: 0,
                cy: 0,
              };

              const summary = stateSummaries.get(locId);
              const isSelected = selectedStateId?.toLowerCase() === locId;
              const isHovered = hoveredState?.meta.id.toLowerCase() === locId;

              // If risk filter is active (e.g. only show CRITICAL), dim or keep normal
              const matchesFilter =
                activeRiskFilter === 'ALL' ||
                (summary && summary.riskSeverity === activeRiskFilter);

              const fillColor = matchesFilter
                ? getStateFill(summary, isHovered, isSelected)
                : '#CBD5E1';

              const opacity = matchesFilter ? 1 : 0.35;

              return (
                <path
                  key={loc.id}
                  d={loc.path}
                  id={`state-${loc.id}`}
                  fill={fillColor}
                  opacity={opacity}
                  stroke={getStateStroke(summary, isHovered, isSelected)}
                  strokeWidth={getStateStrokeWidth(isSelected, isHovered)}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="transition-colors duration-150 cursor-pointer outline-none"
                  onMouseEnter={(e) => {
                    const rect = containerRef.current?.getBoundingClientRect();
                    setHoveredState({
                      meta,
                      summary,
                      x: rect ? e.clientX - rect.left : e.clientX,
                      y: rect ? e.clientY - rect.top : e.clientY,
                    });
                  }}
                  onMouseMove={(e) => {
                    const rect = containerRef.current?.getBoundingClientRect();
                    setHoveredState((prev) =>
                      prev
                        ? {
                            ...prev,
                            x: rect ? e.clientX - rect.left : e.clientX,
                            y: rect ? e.clientY - rect.top : e.clientY,
                          }
                        : null
                    );
                  }}
                  onMouseLeave={() => {
                    setHoveredState(null);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isSelected) {
                      onSelectState(null);
                    } else if (summary) {
                      onSelectState(summary);
                    } else {
                      // Fallback summary for state with zero projects
                      onSelectState({
                        name: meta.name,
                        shortCode: meta.shortCode,
                        mapId: meta.id,
                        projectCount: 0,
                        criticalCount: 0,
                        highCount: 0,
                        watchCount: 0,
                        stableCount: 0,
                        portfolioHealth: 100,
                        riskTrend: 0,
                        riskSeverity: 'NO_DATA',
                        topProjects: [],
                      });
                    }
                  }}
                />
              );
            })}
          </g>

          {/* State Short Code Typography Centroids (Only for states with cx/cy & projects) */}
          <g className="pointer-events-none select-none">
            {PAIMANA_STATE_METADATA.map((meta) => {
              const summary = stateSummaries.get(meta.id);
              if (!summary || summary.projectCount === 0 || meta.cx === 0) return null;

              const isSelected = selectedStateId?.toLowerCase() === meta.id;
              const matchesFilter =
                activeRiskFilter === 'ALL' || summary.riskSeverity === activeRiskFilter;

              if (!matchesFilter) return null;

              return (
                <g key={`label-${meta.id}`} transform={`translate(${meta.cx}, ${meta.cy})`}>
                  {/* Subtle contrast badge backing */}
                  <rect
                    x="-8"
                    y="-5.5"
                    width="16"
                    height="11"
                    rx="3"
                    fill={isSelected ? '#0B1F3A' : 'rgba(15, 23, 42, 0.72)'}
                    stroke={isSelected ? '#38BDF8' : '#FFFFFF'}
                    strokeWidth={isSelected ? '0.8' : '0.4'}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="6.2"
                    fontWeight="800"
                    fill="#FFFFFF"
                    fontFamily="monospace"
                  >
                    {meta.shortCode}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Floating State Intelligence Tooltip */}
      {hoveredState && (
        <div
          className="pointer-events-none absolute z-40 transition-transform duration-75"
          style={{
            left: `${Math.min(hoveredState.x + 16, (containerRef.current?.clientWidth || 600) - 260)}px`,
            top: `${Math.max(16, Math.min(hoveredState.y - 40, (containerRef.current?.clientHeight || 600) - 240))}px`,
          }}
        >
          <div className="w-64 bg-[#0B1F3A]/98 text-white rounded-xl p-3.5 shadow-2xl border border-slate-700/80 backdrop-blur-md">
            {/* Tooltip Header */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-700">
              <div>
                <h4 className="text-xs font-black tracking-wide text-white">
                  {hoveredState.meta.name}
                </h4>
                <p className="text-[10px] font-mono text-slate-400">
                  Short Code: {hoveredState.meta.shortCode}
                </p>
              </div>

              <span
                className={`px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase ${
                  hoveredState.summary?.riskSeverity === 'CRITICAL'
                    ? 'bg-red-500/25 text-red-300 border border-red-500/40'
                    : hoveredState.summary?.riskSeverity === 'HIGH'
                    ? 'bg-orange-500/25 text-orange-300 border border-orange-500/40'
                    : hoveredState.summary?.riskSeverity === 'WATCH'
                    ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40'
                    : hoveredState.summary?.riskSeverity === 'STABLE'
                    ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {hoveredState.summary?.riskSeverity || 'NO DATA'}
              </span>
            </div>

            {/* Metrics Breakdown */}
            {hoveredState.summary && hoveredState.summary.projectCount > 0 ? (
              <div className="mt-2.5 space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Monitored Projects:</span>
                  <span className="font-bold text-white font-mono">
                    {hoveredState.summary.projectCount}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">High Priority / Critical:</span>
                  <span className="font-bold text-red-400 font-mono">
                    {hoveredState.summary.criticalCount + hoveredState.summary.highCount} projects
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Original Outlay:</span>
                  <span className="font-mono text-slate-200">
                    {hoveredState.summary.totalOriginalCostCr
                      ? `₹${(hoveredState.summary.totalOriginalCostCr / 1000).toFixed(1)}K Cr`
                      : 'N/A'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Revised Outlay:</span>
                  <span className="font-mono text-amber-300 font-semibold">
                    {hoveredState.summary.totalRevisedCostCr
                      ? `₹${(hoveredState.summary.totalRevisedCostCr / 1000).toFixed(1)}K Cr`
                      : 'N/A'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Avg Physical Progress:</span>
                  <span className="font-bold text-emerald-400 font-mono">
                    {hoveredState.summary.averagePhysicalProgress
                      ? `${hoveredState.summary.averagePhysicalProgress}%`
                      : 'N/A'}
                  </span>
                </div>

                {/* Primary Risk Driver */}
                <div className="mt-2 pt-2 border-t border-slate-700/80">
                  <span className="text-[10px] text-slate-400 block mb-0.5">
                    Primary Risk Driver:
                  </span>
                  <span className="text-[10px] font-medium text-slate-200 line-clamp-2 italic">
                    "{hoveredState.summary.topRiskDriver}"
                  </span>
                </div>

                <div className="mt-2 text-[9px] text-blue-300 font-semibold flex items-center justify-between">
                  <span>Click to select & isolate state</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ) : (
              <div className="mt-2 text-[11px] text-slate-400 py-1">
                No active central infrastructure projects monitored in the {reportingPeriod} cycle.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
