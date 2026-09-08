import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  MapPin,
  Target,
  X,
  ShieldAlert,
  TrendingUp,
  RotateCcw,
  Layers,
} from 'lucide-react';
import { IndiaRiskMap } from '../../components/map/IndiaRiskMap';
import { MapControls } from '../../components/map/MapControls';
import { MapLegend } from '../../components/map/MapLegend';
import { StateDrawer } from '../../components/map/StateDrawer';
import { RiskIntelligencePanel } from '../../components/map/RiskIntelligencePanel';
import { MapAnalytics } from '../../components/map/MapAnalytics';
import { DecisionModePanel } from '../../components/map/DecisionModePanel';
import { ProjectGeoData, MapMode, MapFilter, StateGeoSummary } from '../../types/map';
import { PROJECT_GEO_DATA, STATE_GEO_SUMMARIES } from '../../data/mapData';
import { useToast } from '../../hooks/useToast';

export const NationalRiskMapPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  
  // State management
  const [mapMode, setMapMode] = useState<MapMode>('PORTFOLIO');
  const [filters, setFilters] = useState<MapFilter>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<StateGeoSummary | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectGeoData | null>(null);
  const [isDecisionMode, setIsDecisionMode] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<ProjectGeoData | null>(null);
  
  // Filter projects based on current filters
  const filteredProjects = useMemo(() => {
    let projects = PROJECT_GEO_DATA;
    
    if (filters.state) {
      projects = projects.filter(p => p.state === filters.state);
    }
    
    if (filters.sector && filters.sector.length > 0) {
      projects = projects.filter(p => filters.sector!.includes(p.sector));
    }
    
    if (filters.ministry && filters.ministry !== 'All Ministries') {
      projects = projects.filter(p => p.ministry === filters.ministry);
    }
    
    if (filters.riskLevel && filters.riskLevel.length > 0) {
      projects = projects.filter(p => filters.riskLevel!.includes(p.riskLevel));
    }
    
    if (filters.projectStage && filters.projectStage.length > 0) {
      // For now, we don't have stage in geo data, but structure is ready
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      projects = projects.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.code.toLowerCase().includes(query) ||
        p.state.toLowerCase().includes(query)
      );
    }
    
    return projects;
  }, [filters, searchQuery]);
  
  const handleResetFilters = () => {
    setFilters({});
    setSearchQuery('');
    setSelectedState(null);
    toast.info('Filters Reset', 'Showing all projects across India');
  };
  
  const handleStateSelect = (stateSummary: StateGeoSummary) => {
    setSelectedState(stateSummary);
    setFilters(prev => ({ ...prev, state: stateSummary.name }));
  };
  
  const handleProjectSelect = (project: ProjectGeoData) => {
    setSelectedProject(project);
  };
  
  const handleEnterDecisionMode = () => {
    setIsDecisionMode(true);
    toast.info('Decision Mode Active', 'Prioritizing projects by composite urgency score');
  };
  
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.state) count++;
    if (filters.sector && filters.sector.length > 0) count += filters.sector.length;
    if (filters.ministry && filters.ministry !== 'All Ministries') count++;
    if (filters.riskLevel && filters.riskLevel.length > 0) count += filters.riskLevel.length;
    if (searchQuery.trim()) count++;
    return count;
  }, [filters, searchQuery]);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#F6F8FC] dark:bg-[#07111F]">
      {/* Page Header */}
      <div className="bg-white dark:bg-[#0F1D2E] border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-xl bg-[#EBF2FF] dark:bg-indigo-950">
                <MapPin className="w-5 h-5 text-[#155EEF] dark:text-indigo-400" />
              </div>
              <h1 className="text-2xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
                NATIONAL INFRASTRUCTURE RISK MAP
              </h1>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 ml-14">
              Geospatial intelligence for identifying, comparing and prioritizing infrastructure project risk across India.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleEnterDecisionMode}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white text-sm font-bold shadow-lg shadow-rose-500/25 transition-all cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>DECISION MODE</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Map + Controls */}
        <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden">
          {/* Map Controls Bar */}
          <MapControls
            mode={mapMode}
            onModeChange={setMapMode}
            filters={filters}
            onFiltersChange={setFilters}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onResetFilters={handleResetFilters}
            activeFilterCount={activeFilterCount}
            filteredProjectCount={filteredProjects.length}
            totalProjectCount={PROJECT_GEO_DATA.length}
          />
          
          {/* Map Container */}
          <div className="flex-1 relative mt-4 rounded-[18px] overflow-hidden bg-white dark:bg-[#0F1D2E] border border-slate-200 dark:border-slate-800 shadow-lg">
            <IndiaRiskMap
              projects={filteredProjects}
              mode={mapMode}
              selectedState={selectedState}
              selectedProject={selectedProject}
              hoveredProject={hoveredProject}
              onStateSelect={handleStateSelect}
              onProjectSelect={handleProjectSelect}
              onProjectHover={setHoveredProject}
            />
            
            {/* Map Legend Overlay */}
            <div className="absolute bottom-4 left-4 z-10">
              <MapLegend
                mode={mapMode}
                projectCount={filteredProjects.length}
              />
            </div>
          </div>
          
          {/* Bottom Analytics */}
          <div className="mt-4">
            <MapAnalytics
              projects={filteredProjects}
              mode={mapMode}
            />
          </div>
        </div>
        
        {/* Right Side: Risk Intelligence Panel (Desktop Only) */}
        <div className="hidden xl:block w-80 p-6 pl-0 overflow-y-auto">
          <RiskIntelligencePanel
            projects={filteredProjects}
            onProjectSelect={handleProjectSelect}
          />
        </div>
      </div>
      
      {/* State Detail Drawer */}
      <AnimatePresence>
        {selectedState && (
          <StateDrawer
            state={selectedState}
            onClose={() => {
              setSelectedState(null);
              setFilters(prev => {
                const { state, ...rest } = prev;
                return rest;
              });
            }}
            onProjectSelect={handleProjectSelect}
          />
        )}
      </AnimatePresence>
      
      {/* Decision Mode Panel */}
      <AnimatePresence>
        {isDecisionMode && (
          <DecisionModePanel
            projects={filteredProjects}
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
