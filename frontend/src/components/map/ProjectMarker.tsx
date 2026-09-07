import React from 'react';
import { ProjectGeoData, MapMode } from '../../types/map';

interface ProjectMarkerProps {
  project: ProjectGeoData;
  x: number;
  y: number;
  mode: MapMode;
  score: number;
  isSelected: boolean;
  isHovered: boolean;
  onClick: (project: ProjectGeoData, event: React.MouseEvent) => void;
  onMouseEnter: (project: ProjectGeoData, event: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

export const ProjectMarker: React.FC<ProjectMarkerProps> = ({
  project,
  x,
  y,
  mode,
  score,
  isSelected,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const getMarkerColor = () => {
    if (mode === 'PORTFOLIO') {
      switch (project.riskLevel) {
        case 'CRITICAL': return '#DC2626';
        case 'HIGH': return '#EA580C';
        case 'WATCH': return '#D97706';
        default: return '#15803D';
      }
    }
    
    // For risk-specific modes, use gradient based on score
    if (score >= 75) return '#DC2626';
    if (score >= 50) return '#EA580C';
    if (score >= 25) return '#D97706';
    return '#15803D';
  };
  
  const markerSize = isSelected ? 6 : isHovered ? 5 : 4;
  const color = getMarkerColor();
  const shouldPulse = project.riskLevel === 'CRITICAL';
  
  return (
    <g
      onClick={(e) => onClick(project, e)}
      onMouseEnter={(e) => onMouseEnter(project, e)}
      onMouseLeave={onMouseLeave}
      className="cursor-pointer"
      style={{ transition: 'all 0.2s ease' }}
    >
      {/* Pulse effect for critical projects */}
      {shouldPulse && (
        <circle
          cx={x}
          cy={y}
          r={markerSize + 2}
          fill={color}
          opacity="0.3"
        >
          <animate
            attributeName="r"
            from={markerSize}
            to={markerSize + 4}
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="0.5"
            to="0"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      
      {/* Glow effect on hover/select */}
      {(isHovered || isSelected) && (
        <circle
          cx={x}
          cy={y}
          r={markerSize + 3}
          fill={color}
          opacity="0.4"
        />
      )}
      
      {/* Main marker */}
      <circle
        cx={x}
        cy={y}
        r={markerSize}
        fill={color}
        stroke={isSelected ? '#FFFFFF' : isHovered ? '#FFFFFF' : color}
        strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 1}
        opacity={isSelected || isHovered ? 1 : 0.9}
      />
      
      {/* Inner dot for selected */}
      {isSelected && (
        <circle
          cx={x}
          cy={y}
          r={1.5}
          fill="#FFFFFF"
        />
      )}
    </g>
  );
};
