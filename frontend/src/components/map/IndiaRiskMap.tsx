import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ProjectGeoData, MapMode, StateGeoSummary } from '../../types/map';
import { INDIA_BOUNDARY_PATH, INDIA_STATE_COORDINATES } from '../../data/indiaGeoData';
import { STATE_GEO_SUMMARIES } from '../../data/mapData';
import { ProjectMarker } from './ProjectMarker';
import { ProjectTooltip } from './ProjectTooltip';

interface IndiaRiskMapProps {
  projects: ProjectGeoData[];
  mode: MapMode;
  selectedState: StateGeoSummary | null;
  selectedProject: ProjectGeoData | null;
  hoveredProject: ProjectGeoData | null;
  onStateSelect: (state: StateGeoSummary) => void;
  onProjectSelect: (project: ProjectGeoData) => void;
  onProjectHover: (project: ProjectGeoData | null) => void;
}

export const IndiaRiskMap: React.FC<IndiaRiskMapProps> = ({
  projects,
  mode,
  selectedState,
  selectedProject,
  hoveredProject,
  onStateSelect,
  onProjectSelect,
  onProjectHover,
}) => {
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [hoveredStateCoord, setHoveredStateCoord] = useState<typeof INDIA_STATE_COORDINATES[0] | null>(null);
  const [stateTooltipPos, setStateTooltipPos] = useState<{ x: number; y: number } | null>(null);
  
  // Calculate project score based on mode
  const getProjectScore = (project: ProjectGeoData): number => {
    switch (mode) {
      case 'COST_RISK':
        return project.costRiskScore;
      case 'TIME_RISK':
        return project.timeRiskScore;
      case 'EXECUTION_RISK':
        return project.executionRiskScore;
      case 'RISK':
      case 'PORTFOLIO':
      default:
        return 100 - project.healthScore;
    }
  };
  
  // Convert lat/lng to SVG coordinates
  const latLngToSVG = (lat: number, lng: number): { x: number; y: number } => {
    // India bounding box (approximate)
    const minLat = 6;
    const maxLat = 37;
    const minLng = 68;
    const maxLng = 98;
    
    const svgWidth = 600;
    const svgHeight = 700;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * svgWidth;
    const y = ((maxLat - lat) / (maxLat - minLat)) * svgHeight;
    
    return { x, y };
  };
  
  // Cluster nearby projects
  const projectClusters = useMemo(() => {
    const clusters: { projects: ProjectGeoData[]; x: number; y: number }[] = [];
    const processed = new Set<string>();
    const clusterRadius = 15; // pixels
    
    projects.forEach(project => {
      if (processed.has(project.id)) return;
      
      const pos = latLngToSVG(project.lat, project.lng);
      const nearbyProjects = projects.filter(p => {
        if (processed.has(p.id)) return false;
        const pPos = latLngToSVG(p.lat, p.lng);
        const distance = Math.sqrt(Math.pow(pos.x - pPos.x, 2) + Math.pow(pos.y - pPos.y, 2));
        return distance < clusterRadius;
      });
      
      nearbyProjects.forEach(p => processed.add(p.id));
      
      if (nearbyProjects.length > 0) {
        const avgX = nearbyProjects.reduce((sum, p) => sum + latLngToSVG(p.lat, p.lng).x, 0) / nearbyProjects.length;
        const avgY = nearbyProjects.reduce((sum, p) => sum + latLngToSVG(p.lat, p.lng).y, 0) / nearbyProjects.length;
        
        clusters.push({
          projects: nearbyProjects,
          x: avgX,
          y: avgY,
        });
      }
    });
    
    return clusters;
  }, [projects]);
  
  const handleProjectClick = (project: ProjectGeoData, event: React.MouseEvent) => {
    event.stopPropagation();
    onProjectSelect(project);
    
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };
  
  const handleProjectMouseEnter = (project: ProjectGeoData, event: React.MouseEvent) => {
    onProjectHover(project);
    
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };
  
  const handleProjectMouseLeave = () => {
    onProjectHover(null);
    if (!selectedProject) {
      setTooltipPosition(null);
    }
  };
  
  const handleStateHover = (stateCoord: typeof INDIA_STATE_COORDINATES[0], event: React.MouseEvent) => {
    setHoveredStateCoord(stateCoord);
    setStateTooltipPos({ x: event.clientX, y: event.clientY });
  };
  
  const handleStateLeave = () => {
    setHoveredStateCoord(null);
    setStateTooltipPos(null);
  };
  
  const handleStateClick = (stateName: string) => {
    const stateSummary = STATE_GEO_SUMMARIES.find(s => s.name === stateName);
    if (stateSummary) {
      onStateSelect(stateSummary);
    }
  };
  
  // Map state coordinates to SVG positions
  const stateMarkers = useMemo(() => {
    return INDIA_STATE_COORDINATES.map(stateCoord => {
      const pos = latLngToSVG(stateCoord.lat, stateCoord.lng);
      const stateSummary = STATE_GEO_SUMMARIES.find(s => s.name === stateCoord.name);
      const stateProjects = projects.filter(p => p.state === stateCoord.name);
      
      return {
        ...stateCoord,
        ...pos,
        summary: stateSummary,
        projectCount: stateProjects.length,
        avgHealth: stateProjects.length > 0 
          ? Math.round(stateProjects.reduce((sum, p) => sum + p.healthScore, 0) / stateProjects.length)
          : 100,
      };
    }).filter(s => s.projectCount > 0);
  }, [projects]);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#0B1F3A] via-[#0F2847] to-[#0B1F3A]">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#60A5FA_1px,transparent_1px)] [background-size:20px_20px]" />
      
      {/* Main SVG Map */}
      <svg
        viewBox="0 0 600 700"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }}
      >
        {/* Definitions for gradients and effects */}
        <defs>
          <linearGradient id="indiaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#1E3A8A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1E293B" stopOpacity="0.3" />
          </linearGradient>
          
          <filter id="mapShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <radialGradient id="glowGradient">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* India Base Map with 3D effect */}
        <g filter="url(#mapShadow)">
          {/* Shadow layer for depth */}
          <path
            d={INDIA_BOUNDARY_PATH}
            fill="#0F172A"
            opacity="0.4"
            transform="translate(2, 4)"
          />
          
          {/* Main India outline */}
          <path
            d={INDIA_BOUNDARY_PATH}
            fill="url(#indiaGradient)"
            stroke="#334155"
            strokeWidth="2"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />
          
          {/* Highlight overlay */}
          <path
            d={INDIA_BOUNDARY_PATH}
            fill="url(#glowGradient)"
            opacity="0.15"
            pointerEvents="none"
          />
          
          {/* Border glow */}
          <path
            d={INDIA_BOUNDARY_PATH}
            fill="none"
            stroke="#60A5FA"
            strokeWidth="1"
            opacity="0.3"
            pointerEvents="none"
          />
        </g>
        
        {/* State Markers (Interactive Hotspots) */}
        <g>
          {stateMarkers.map((state) => {
            const isHovered = hoveredStateCoord?.name === state.name;
            const isSelected = selectedState?.name === state.name;
            
            return (
              <g 
                key={state.name}
                className="cursor-pointer group"
                onMouseEnter={(e) => handleStateHover(state, e as any)}
                onMouseLeave={handleStateLeave}
                onClick={() => handleStateClick(state.name)}
              >
                {/* State Glow Effect */}
                {(isHovered || isSelected) && (
                  <circle
                    cx={state.x}
                    cy={state.y}
                    r={isSelected ? 25 : 20}
                    fill="url(#glowGradient)"
                    opacity="0.5"
                  />
                )}
                
                {/* State Circle */}
                <circle
                  cx={state.x}
                  cy={state.y}
                  r={isSelected ? 12 : isHovered ? 10 : 8}
                  fill={
                    state.avgHealth < 40 ? '#DC2626' :
                    state.avgHealth < 60 ? '#EA580C' :
                    state.avgHealth < 75 ? '#D97706' :
                    '#15803D'
                  }
                  stroke={isSelected ? '#FFFFFF' : isHovered ? '#60A5FA' : '#1E3A8A'}
                  strokeWidth={isSelected ? 3 : 2}
                  opacity="0.9"
                  className="transition-all duration-200"
                />
                
                {/* State Code Label */}
                <text
                  x={state.x}
                  y={state.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#FFFFFF"
                  fontSize={isSelected ? 7 : 6}
                  fontWeight="bold"
                  pointerEvents="none"
                  className="font-mono"
                >
                  {state.shortCode}
                </text>
                
                {/* Project Count Badge */}
                <g transform={`translate(${state.x + 8}, ${state.y - 8})`}>
                  <circle
                    r={6}
                    fill="#155EEF"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    className={isHovered || isSelected ? 'opacity-100' : 'opacity-80'}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#FFFFFF"
                    fontSize="5"
                    fontWeight="bold"
                    pointerEvents="none"
                  >
                    {state.projectCount}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
        
        {/* Project Clusters and Markers */}
        <g>
          {projectClusters.map((cluster, index) => {
            if (cluster.projects.length === 1) {
              // Single project
              const project = cluster.projects[0];
              return (
                <ProjectMarker
                  key={project.id}
                  project={project}
                  x={cluster.x}
                  y={cluster.y}
                  mode={mode}
                  score={getProjectScore(project)}
                  isSelected={selectedProject?.id === project.id}
                  isHovered={hoveredProject?.id === project.id}
                  onClick={handleProjectClick}
                  onMouseEnter={handleProjectMouseEnter}
                  onMouseLeave={handleProjectMouseLeave}
                />
              );
            } else {
              // Cluster of projects
              const avgScore = cluster.projects.reduce((sum, p) => sum + getProjectScore(p), 0) / cluster.projects.length;
              const dominantRisk = cluster.projects.reduce((max, p) => 
                getProjectScore(p) > getProjectScore(max) ? p : max
              );
              
              return (
                <g key={`cluster-${index}`}>
                  {/* Cluster glow */}
                  <circle
                    cx={cluster.x}
                    cy={cluster.y}
                    r={12 + Math.min(cluster.projects.length, 10)}
                    fill={`url(#glowGradient)`}
                    opacity="0.4"
                  />
                  
                  {/* Cluster circle */}
                  <circle
                    cx={cluster.x}
                    cy={cluster.y}
                    r={8 + Math.min(cluster.projects.length, 5)}
                    fill={dominantRisk.riskLevel === 'CRITICAL' ? '#DC2626' :
                          dominantRisk.riskLevel === 'HIGH' ? '#EA580C' :
                          dominantRisk.riskLevel === 'WATCH' ? '#D97706' : '#15803D'}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    opacity="0.9"
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={(e) => handleProjectClick(cluster.projects[0], e as any)}
                    onMouseEnter={(e) => handleProjectMouseEnter(cluster.projects[0], e as any)}
                    onMouseLeave={handleProjectMouseLeave}
                  />
                  
                  {/* Cluster count */}
                  <text
                    x={cluster.x}
                    y={cluster.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#FFFFFF"
                    fontSize="10"
                    fontWeight="bold"
                    pointerEvents="none"
                  >
                    {cluster.projects.length}
                  </text>
                </g>
              );
            }
          })}
        </g>
      </svg>
      
      {/* Project Tooltip */}
      {(hoveredProject || selectedProject) && tooltipPosition && (
        <ProjectTooltip
          project={hoveredProject || selectedProject!}
          position={tooltipPosition}
          mode={mode}
          onClose={() => {
            onProjectHover(null);
            onProjectSelect(null as any);
            setTooltipPosition(null);
          }}
        />
      )}
      
      {/* State Hover Tooltip */}
      {hoveredStateCoord && stateTooltipPos && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: stateTooltipPos.x,
            top: stateTooltipPos.y,
            transform: 'translate(-50%, -100%) translateY(-12px)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-lg shadow-2xl p-4 min-w-[280px]"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-white font-bold text-base mb-0.5">
                  {hoveredStateCoord.name}
                </div>
                <div className="text-slate-400 text-xs font-mono">
                  {hoveredStateCoord.shortCode}
                </div>
              </div>
              <div className="text-right">
                {(() => {
                  const stateData = stateMarkers.find(s => s.name === hoveredStateCoord.name);
                  if (!stateData) return null;
                  
                  const health = stateData.avgHealth;
                  const color = health < 40 ? 'text-red-500' : 
                               health < 60 ? 'text-orange-500' : 
                               health < 75 ? 'text-amber-500' : 'text-emerald-500';
                  
                  return (
                    <>
                      <div className={`text-2xl font-black ${color}`}>
                        {health}%
                      </div>
                      <div className="text-slate-400 text-xs">Portfolio Health</div>
                    </>
                  );
                })()}
              </div>
            </div>
            
            <div className="space-y-2">
              {(() => {
                const stateData = stateMarkers.find(s => s.name === hoveredStateCoord.name);
                if (!stateData) return null;
                
                const stateProjects = projects.filter(p => p.state === hoveredStateCoord.name);
                const criticalCount = stateProjects.filter(p => p.riskLevel === 'CRITICAL').length;
                const highCount = stateProjects.filter(p => p.riskLevel === 'HIGH').length;
                const watchCount = stateProjects.filter(p => p.riskLevel === 'WATCH').length;
                const stableCount = stateProjects.filter(p => p.riskLevel === 'STABLE').length;
                
                return (
                  <>
                    <div className="flex items-center justify-between text-sm py-1.5 border-t border-slate-700 pt-2">
                      <span className="text-slate-400">Total Projects</span>
                      <span className="text-white font-bold">{stateData.projectCount}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {criticalCount > 0 && (
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <span className="text-slate-400">Critical:</span>
                          <span className="text-white font-bold">{criticalCount}</span>
                        </div>
                      )}
                      {highCount > 0 && (
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-2 h-2 rounded-full bg-orange-500" />
                          <span className="text-slate-400">High:</span>
                          <span className="text-white font-bold">{highCount}</span>
                        </div>
                      )}
                      {watchCount > 0 && (
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-2 h-2 rounded-full bg-amber-500" />
                          <span className="text-slate-400">Watch:</span>
                          <span className="text-white font-bold">{watchCount}</span>
                        </div>
                      )}
                      {stableCount > 0 && (
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-slate-400">Stable:</span>
                          <span className="text-white font-bold">{stableCount}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-3 pt-2 border-t border-slate-700">
                      <div className="text-blue-400 text-xs font-semibold">
                        Click to view state details →
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
