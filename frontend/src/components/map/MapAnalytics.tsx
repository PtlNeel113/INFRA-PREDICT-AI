import React, { useMemo } from 'react';
import { ProjectGeoData, MapMode } from '../../types/map';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface MapAnalyticsProps {
  projects: ProjectGeoData[];
  mode: MapMode;
}

export const MapAnalytics: React.FC<MapAnalyticsProps> = ({ projects, mode }) => {
  // Risk by state data
  const riskByState = useMemo(() => {
    const stateMap = new Map<string, { critical: number; high: number; watch: number; stable: number }>();
    
    projects.forEach(p => {
      const current = stateMap.get(p.state) || { critical: 0, high: 0, watch: 0, stable: 0 };
      switch (p.riskLevel) {
        case 'CRITICAL': current.critical++; break;
        case 'HIGH': current.high++; break;
        case 'WATCH': current.watch++; break;
        case 'STABLE': current.stable++; break;
      }
      stateMap.set(p.state, current);
    });
    
    return Array.from(stateMap.entries())
      .map(([state, counts]) => ({
        state: state.length > 12 ? state.substring(0, 12) + '...' : state,
        ...counts,
        total: counts.critical + counts.high + counts.watch + counts.stable,
      }))
      .sort((a, b) => (b.critical + b.high) - (a.critical + a.high))
      .slice(0, 10);
  }, [projects]);
  
  // Risk by sector data
  const riskBySector = useMemo(() => {
    const sectorMap = new Map<string, { critical: number; high: number; watch: number; stable: number }>();
    
    projects.forEach(p => {
      const sector = p.sector.split(' ')[0]; // Shorten sector names
      const current = sectorMap.get(sector) || { critical: 0, high: 0, watch: 0, stable: 0 };
      switch (p.riskLevel) {
        case 'CRITICAL': current.critical++; break;
        case 'HIGH': current.high++; break;
        case 'WATCH': current.watch++; break;
        case 'STABLE': current.stable++; break;
      }
      sectorMap.set(sector, current);
    });
    
    return Array.from(sectorMap.entries())
      .map(([sector, counts]) => ({
        sector,
        ...counts,
      }));
  }, [projects]);
  
  // Risk trajectory (simulated trend)
  const riskTrajectory = useMemo(() => {
    const avgHealth = projects.reduce((sum, p) => sum + p.healthScore, 0) / projects.length;
    const avgRisk = 100 - avgHealth;
    
    return [
      { period: '3M Ago', previous: Math.max(0, avgRisk - 12), current: null, forecast: null },
      { period: '2M Ago', previous: Math.max(0, avgRisk - 8), current: null, forecast: null },
      { period: '1M Ago', previous: Math.max(0, avgRisk - 4), current: null, forecast: null },
      { period: 'Current', previous: null, current: avgRisk, forecast: null },
      { period: '1M', previous: null, current: null, forecast: Math.min(100, avgRisk + 3) },
      { period: '2M', previous: null, current: null, forecast: Math.min(100, avgRisk + 5) },
      { period: '3M', previous: null, current: null, forecast: Math.min(100, avgRisk + 7) },
    ];
  }, [projects]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Risk by State */}
      <div className="bg-white dark:bg-[#0F1D2E] rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        <h3 className="text-sm font-black text-[#0B1F3A] dark:text-white mb-4">
          Risk by State
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={riskByState} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis type="number" stroke="#94A3B8" style={{ fontSize: '10px' }} />
            <YAxis dataKey="state" type="category" width={80} stroke="#94A3B8" style={{ fontSize: '10px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="critical" stackId="a" fill="#DC2626" />
            <Bar dataKey="high" stackId="a" fill="#EA580C" />
            <Bar dataKey="watch" stackId="a" fill="#D97706" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Risk by Sector */}
      <div className="bg-white dark:bg-[#0F1D2E] rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        <h3 className="text-sm font-black text-[#0B1F3A] dark:text-white mb-4">
          Risk by Sector
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={riskBySector}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="sector" stroke="#94A3B8" style={{ fontSize: '10px' }} angle={-45} textAnchor="end" height={80} />
            <YAxis stroke="#94A3B8" style={{ fontSize: '10px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="critical" stackId="a" fill="#DC2626" />
            <Bar dataKey="high" stackId="a" fill="#EA580C" />
            <Bar dataKey="watch" stackId="a" fill="#D97706" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Risk Trajectory */}
      <div className="bg-white dark:bg-[#0F1D2E] rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        <h3 className="text-sm font-black text-[#0B1F3A] dark:text-white mb-4">
          Risk Trajectory
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={riskTrajectory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="period" stroke="#94A3B8" style={{ fontSize: '10px' }} />
            <YAxis stroke="#94A3B8" style={{ fontSize: '10px' }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Line type="monotone" dataKey="previous" stroke="#64748B" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="current" stroke="#155EEF" strokeWidth={3} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="forecast" stroke="#DC2626" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
