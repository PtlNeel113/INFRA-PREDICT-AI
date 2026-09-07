import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Filter,
  X,
  Layers,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  Eye,
  Building2,
  TrendingUp,
} from 'lucide-react';
import { StateRiskData } from '../../types/projects';
import { STATE_RISK_DATA } from '../../data/mockData';

interface IndiaRiskMapProps {
  selectedState: string | null;
  onSelectState: (stateName: string | null) => void;
}

export const IndiaRiskMap: React.FC<IndiaRiskMapProps> = ({
  selectedState,
  onSelectState,
}) => {
  const [hoveredState, setHoveredState] = useState<StateRiskData | null>(null);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'WATCH' | 'STABLE'>('ALL');

  const filteredStates = STATE_RISK_DATA.filter((s) => {
    if (activeFilter === 'ALL') return true;
    return s.riskSeverity === activeFilter;
  });

  const getSeverityBg = (severity: StateRiskData['riskSeverity']) => {
    switch (severity) {
      case 'CRITICAL':
        return '#DC2626'; // Red
      case 'HIGH':
        return '#EA580C'; // Orange
      case 'WATCH':
        return '#D97706'; // Amber
      case 'STABLE':
        return '#15803D'; // Green
      default:
        return '#64748B';
    }
  };

  const getSeverityBadgeClass = (severity: StateRiskData['riskSeverity']) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'HIGH':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'WATCH':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'STABLE':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-[18px] border border-[#E2E8F0] gov-shadow p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#155EEF] animate-pulse" />
            <h3 className="text-base sm:text-lg font-black text-[#0B1F3A] tracking-tight">
              National Infrastructure Risk Map
            </h3>
            <span className="text-[10px] font-bold bg-[#EBF2FF] text-[#155EEF] px-2 py-0.5 rounded uppercase">
              Geo-Spatial Matrix
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Click any state or corridor cluster to filter high-impact projects & bottleneck attributions.
          </p>
        </div>

        {/* Severity Legend & Interactive Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { label: 'All States', key: 'ALL', color: 'bg-slate-700' },
              { label: 'Critical', key: 'CRITICAL', color: 'bg-[#DC2626]' },
              { label: 'High', key: 'HIGH', color: 'bg-[#EA580C]' },
              { label: 'Watch', key: 'WATCH', color: 'bg-[#D97706]' },
              { label: 'Stable', key: 'STABLE', color: 'bg-[#15803D]' },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveFilter(item.key)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                activeFilter === item.key
                  ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${item.color}`} />
              <span>{item.label}</span>
            </button>
          ))}

          {selectedState && (
            <button
              type="button"
              onClick={() => onSelectState(null)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 text-[#155EEF] border border-blue-200 hover:bg-blue-100 cursor-pointer ml-1"
            >
              <span>State: {selectedState}</span>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Map Visual Canvas */}
      <div className="relative my-4 w-full h-[400px] sm:h-[460px] bg-gradient-to-b from-[#0B1F3A]/[0.02] to-[#0B1F3A]/[0.06] rounded-2xl border border-slate-100 p-4 flex items-center justify-center overflow-hidden">
        {/* Subtle Map Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

        {/* Polished SVG India Contour & State Clusters */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full max-h-[420px] select-none filter drop-shadow-sm"
        >
          {/* Stylized India Subcontinental Outline */}
          <path
            d="M 32,8 
               C 36,9 38,14 42,16 
               C 46,18 52,19 56,22 
               C 62,24 74,22 80,24 
               C 88,26 94,32 94,38 
               C 92,44 86,46 82,48 
               C 76,50 72,46 68,52 
               C 65,58 62,64 58,68 
               C 52,74 46,84 42,94 
               C 38,92 36,82 34,76 
               C 32,70 28,64 26,58 
               C 22,54 16,50 14,44 
               C 12,38 18,34 22,30 
               C 26,26 28,16 32,8 Z"
            fill="#F1F5F9"
            stroke="#CBD5E1"
            strokeWidth="0.8"
            className="transition-colors"
          />

          {/* Regional Inter-State Corridors Connecting Lines */}
          <path
            d="M 36,30 L 44,38 L 62,42 L 70,50 L 58,57 L 44,70 L 40,84"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="0.4"
            strokeDasharray="1,1"
            opacity="0.6"
          />
          <path
            d="M 36,30 L 24,36 L 20,48 L 32,58 L 34,74 L 40,84"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="0.4"
            strokeDasharray="1,1"
            opacity="0.6"
          />

          {/* Interactive State Hub Markers */}
          {STATE_RISK_DATA.map((state) => {
            const isSelected = selectedState === state.name;
            const isHovered = hoveredState?.id === state.id;
            const isVisible = activeFilter === 'ALL' || state.riskSeverity === activeFilter;
            const severityColor = getSeverityBg(state.riskSeverity);

            if (!isVisible) return null;

            return (
              <g
                key={state.id}
                transform={`translate(${state.x}, ${state.y})`}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredState(state)}
                onMouseLeave={() => setHoveredState(null)}
                onClick={() => {
                  if (selectedState === state.name) {
                    onSelectState(null);
                  } else {
                    onSelectState(state.name);
                  }
                }}
              >
                {/* Pulse Ring for Critical / Selected */}
                {(state.riskSeverity === 'CRITICAL' || isSelected) && (
                  <circle
                    r={isSelected ? 6 : 4.5}
                    fill={severityColor}
                    opacity="0.25"
                    className="animate-ping"
                  />
                )}

                {/* State Boundary Cluster Circle */}
                <circle
                  r={isSelected ? 4.5 : isHovered ? 4.0 : 3.2}
                  fill={isSelected ? '#0B1F3A' : severityColor}
                  stroke={isSelected ? '#155EEF' : '#FFFFFF'}
                  strokeWidth={isSelected ? 1.2 : 0.8}
                  className="transition-all duration-150 drop-shadow-sm"
                />

                {/* State Short Code Label */}
                <text
                  textAnchor="middle"
                  dy="0.8"
                  fontSize="2"
                  fontWeight="bold"
                  fill="#FFFFFF"
                  className="pointer-events-none font-mono"
                >
                  {state.shortCode}
                </text>

                {/* State Project Count Badge Bubble */}
                <g transform="translate(3, -2.5)">
                  <rect
                    width="4.5"
                    height="2.5"
                    rx="1.2"
                    fill={isSelected ? '#155EEF' : '#0B1F3A'}
                    stroke="#FFFFFF"
                    strokeWidth="0.3"
                  />
                  <text
                    x="2.25"
                    y="1.7"
                    textAnchor="middle"
                    fontSize="1.4"
                    fontWeight="bold"
                    fill="#FFFFFF"
                    className="pointer-events-none font-mono"
                  >
                    {state.projectCount}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Hover / Active State Floating Telemetry Tooltip */}
        {(hoveredState || selectedState) && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-[#0B1F3A]/95 backdrop-blur-md text-white rounded-xl p-4 border border-[#1C3F73] shadow-xl z-20 transition-all">
            {(() => {
              const activeData =
                hoveredState ||
                STATE_RISK_DATA.find((s) => s.name === selectedState) ||
                STATE_RISK_DATA[0];

              return (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black px-1.5 py-0.5 bg-[#155EEF] rounded">
                        {activeData.shortCode}
                      </span>
                      <h4 className="text-sm font-bold text-white tracking-tight">{activeData.name}</h4>
                    </div>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase border ${getSeverityBadgeClass(
                        activeData.riskSeverity,
                      )}`}
                    >
                      {activeData.riskSeverity}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-white/10">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Monitored Assets</span>
                      <span className="font-mono font-bold text-white text-xs">
                        {activeData.projectCount} Projects
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Capital Outlay</span>
                      <span className="font-mono font-bold text-emerald-400 text-xs">
                        ₹{(activeData.totalOutlayCr / 1000).toFixed(1)}k Cr
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Avg Health Score</span>
                      <span
                        className={`font-mono font-bold text-xs ${
                          activeData.avgHealthScore >= 75
                            ? 'text-emerald-400'
                            : activeData.avgHealthScore >= 60
                            ? 'text-amber-400'
                            : 'text-red-400'
                        }`}
                      >
                        {activeData.avgHealthScore} / 100
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Critical Flags</span>
                      <span className="font-mono font-bold text-red-400 text-xs">
                        {activeData.criticalProjectsCount} Critical
                      </span>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-white/10 text-[10px] text-slate-300">
                    <span className="text-slate-400 block font-semibold uppercase">Top Bottleneck:</span>
                    <span className="text-slate-200 line-clamp-1">{activeData.topRiskDriver}</span>
                  </div>

                  <div className="pt-1 text-center">
                    <button
                      type="button"
                      onClick={() => onSelectState(activeData.name)}
                      className="w-full py-1.5 bg-[#155EEF] hover:bg-[#1048B5] text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      {selectedState === activeData.name ? 'Clear Filter' : `Filter Table by ${activeData.name}`}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Footer Insight Ribbon */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Building2 className="w-3.5 h-3.5 text-[#155EEF]" />
          <span>Active clusters across 28 States & 8 Union Territories</span>
        </div>
        <span className="font-medium text-slate-400 text-[11px]">
          Click pin to synchronize table below
        </span>
      </div>
    </div>
  );
};
