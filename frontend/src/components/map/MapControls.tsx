import React, { useState } from 'react';
import { Search, Filter, X, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { MapMode, MapFilter } from '../../types/map';
import { SECTOR_OPTIONS, MINISTRY_OPTIONS } from '../../data/mapData';
import { INDIAN_STATES_REGIONS } from '../../data/constants';

interface MapControlsProps {
  mode: MapMode;
  onModeChange: (mode: MapMode) => void;
  filters: MapFilter;
  onFiltersChange: (filters: MapFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
  filteredProjectCount: number;
  totalProjectCount: number;
}

export const MapControls: React.FC<MapControlsProps> = ({
  mode,
  onModeChange,
  filters,
  onFiltersChange,
  searchQuery,
  onSearchChange,
  onResetFilters,
  activeFilterCount,
  filteredProjectCount,
  totalProjectCount,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  
  const mapModes: { value: MapMode; label: string }[] = [
    { value: 'PORTFOLIO', label: 'Portfolio' },
    { value: 'RISK', label: 'Risk' },
    { value: 'COST_RISK', label: 'Cost Risk' },
    { value: 'TIME_RISK', label: 'Time Risk' },
    { value: 'EXECUTION_RISK', label: 'Execution Risk' },
  ];
  
  const riskLevels = ['STABLE', 'WATCH', 'HIGH', 'CRITICAL'];
  
  return (
    <div className="bg-white dark:bg-[#0F1D2E] rounded-[18px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Top Row: Search + Map Modes */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search state, project or project ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#155EEF] dark:focus:ring-indigo-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-3.5 h-3.5 text-slate-400" />
              </button>
            )}
          </div>
          
          {/* Map Mode Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl p-1">
            {mapModes.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => onModeChange(m.value)}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  mode === m.value
                    ? 'bg-[#155EEF] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          
          {/* Filter Toggle */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition-all ${
              showFilters || activeFilterCount > 0
                ? 'bg-[#155EEF] text-white border-[#155EEF] shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-white text-[#155EEF] text-[10px] font-black">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Expandable Filter Panel */}
      {showFilters && (
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* State Filter */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                State
              </label>
              <select
                value={filters.state || ''}
                onChange={(e) => onFiltersChange({ ...filters, state: e.target.value || undefined })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#155EEF]"
              >
                <option value="">All States</option>
                {INDIAN_STATES_REGIONS.filter(s => s !== 'National / All India').map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Sector Filter */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Sector
              </label>
              <select
                value={filters.sector?.[0] || ''}
                onChange={(e) => onFiltersChange({ 
                  ...filters, 
                  sector: e.target.value ? [e.target.value] : undefined 
                })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#155EEF]"
              >
                {SECTOR_OPTIONS.map((sector) => (
                  <option key={sector} value={sector === 'All Sectors' ? '' : sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Ministry Filter */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Ministry
              </label>
              <select
                value={filters.ministry || ''}
                onChange={(e) => onFiltersChange({ ...filters, ministry: e.target.value || undefined })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#155EEF]"
              >
                {MINISTRY_OPTIONS.map((ministry) => (
                  <option key={ministry} value={ministry}>
                    {ministry}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Risk Level Filter */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Risk Level
              </label>
              <div className="flex flex-wrap gap-1.5">
                {riskLevels.map((level) => {
                  const isSelected = filters.riskLevel?.includes(level as any);
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => {
                        const current = filters.riskLevel || [];
                        const updated = isSelected
                          ? current.filter(l => l !== level)
                          : [...current, level as any];
                        onFiltersChange({ 
                          ...filters, 
                          riskLevel: updated.length > 0 ? updated : undefined 
                        });
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        isSelected
                          ? 'bg-[#155EEF] text-white border-[#155EEF]'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Reset Filters */}
          {activeFilterCount > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={onResetFilters}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Results Summary */}
      <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/40 flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-600 dark:text-slate-400">
          Filtered <span className="text-[#155EEF] dark:text-indigo-400 font-black">{filteredProjectCount}</span> of <span className="font-black">{totalProjectCount}</span> monitored projects
        </span>
        <span className="text-slate-500 dark:text-slate-400 font-medium">
          Source: PAIMANA / MoSPI
        </span>
      </div>
    </div>
  );
};
