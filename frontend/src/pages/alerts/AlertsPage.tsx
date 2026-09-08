import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BellRing,
  AlertTriangle,
  ShieldAlert,
  Clock,
  Filter,
  Search,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Sliders,
  Send,
  Building2,
  Calendar,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ReferenceLine,
} from 'recharts';
import { MOCK_EARLY_WARNING_ALERTS } from '../../data/alertsData';
import { useProjectStore } from '../../store/projectStore';
import { EarlyWarningAlert } from '../../types/projects';
import { RiskBadge } from '../../components/ui/RiskBadge';

export const AlertsPage: React.FC = () => {
  const navigate = useNavigate();
  const projects = useProjectStore((s) => s.projects);

  // Dynamic alerts aggregation including newly created projects
  const allAlerts = useMemo<EarlyWarningAlert[]>(() => {
    const existingProjectIds = new Set(MOCK_EARLY_WARNING_ALERTS.map((a) => a.projectId));
    const dynamicAlerts: EarlyWarningAlert[] = projects
      .filter((p) => !existingProjectIds.has(p.id) && (p.riskLevel === 'CRITICAL' || p.riskLevel === 'HIGH' || p.riskLevel === 'MEDIUM'))
      .map((p) => ({
        id: `alert-${p.id}`,
        projectId: p.id,
        projectCode: p.code,
        projectName: p.name,
        sector: p.sector,
        state: p.state,
        ministry: p.ministry || 'MoRTH / MoR',
        severity: (p.riskLevel === 'CRITICAL' ? 'CRITICAL' : p.riskLevel === 'HIGH' ? 'HIGH' : 'WATCH') as 'CRITICAL' | 'HIGH' | 'WATCH',
        riskScore: p.impactScore || (100 - p.healthScore),
        impactScore: p.impactScore || Math.min(95, Math.round((p.sanctionedCostCr / 1000) * 10 + 40)),
        changeType: p.progressGap > 0 ? `Schedule Lag (${p.progressGap}%)` : 'Elevated Risk Level',
        changeSummary: `${p.progressGap > 0 ? `Schedule lag of ${p.progressGap}% identified.` : 'Risk threshold alert.'} ${p.predictedCostOverrunCr > 0 ? `Cost exposure +₹${p.predictedCostOverrunCr} Cr.` : ''}`,
        primaryDriver: p.primaryRiskDriver,
        detectedAt: 'Just Now',
        recommendedReviewDate: 'Within 72 Hours',
        recommendedAction: p.recommendedActions?.[0] || 'Convene urgent ministerial taskforce review.',
        nodalOfficer: `${p.implementingAgency} Project Director`,
        status: 'OPEN' as const,
      }));
    return [...dynamicAlerts, ...MOCK_EARLY_WARNING_ALERTS];
  }, [projects]);

  // State
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);

  // Counters
  const criticalCount = allAlerts.filter((a) => a.severity === 'CRITICAL').length;
  const highCount = allAlerts.filter((a) => a.severity === 'HIGH').length;
  const watchCount = allAlerts.filter((a) => a.severity === 'WATCH').length;

  const sectors = useMemo(() => {
    const set = new Set<string>();
    allAlerts.forEach((a) => set.add(a.sector));
    return Array.from(set);
  }, [allAlerts]);

  // Filtered Alerts
  const filteredAlerts = useMemo(() => {
    return allAlerts.filter((a) => {
      if (selectedSeverity !== 'ALL' && a.severity !== selectedSeverity) return false;
      if (selectedSector !== 'ALL' && a.sector !== selectedSector) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesProject = a.projectName.toLowerCase().includes(q);
        const matchesCode = a.projectCode.toLowerCase().includes(q);
        const matchesSummary = a.changeSummary.toLowerCase().includes(q);
        const matchesRoot = a.primaryDriver.toLowerCase().includes(q);
        if (!matchesProject && !matchesCode && !matchesSummary && !matchesRoot) return false;
      }
      return true;
    });
  }, [allAlerts, selectedSeverity, selectedSector, searchQuery]);

  // Scatter data for Risk Priority Matrix
  const matrixData = useMemo(() => {
    return projects.map((p) => ({
      id: p.id,
      name: p.name,
      code: p.code,
      riskScore: (p.costRiskScore + p.timeRiskScore + p.executionRiskScore) / 3,
      impactScore: p.impactScore,
      cost: p.sanctionedCostCr,
      severity: p.riskLevel,
    }));
  }, []);

  return (
    <div className="space-y-6 pb-16" id="early-warnings-page">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 mb-1">
            <BellRing className="w-4 h-4" />
            <span>National Escalation Queue</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Early Warning Alerts & Risk Priority Matrix</h1>
          <p className="text-sm text-slate-500 mt-1">
            Algorithmic anomaly detection flagging velocity decay, statutory gridlocks, and critical path milestones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Triggering real-time sensor & data pipeline refresh...')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
          >
            Refresh Telemetry
          </button>
          <button
            onClick={() => alert('Generating PMG Cabinet Summary Note...')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-rose-700 hover:bg-rose-800 rounded-lg transition-colors shadow-sm"
          >
            Cabinet Escalation Note
          </button>
        </div>
      </div>

      {/* Severity Counters Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Critical */}
        <div
          onClick={() => setSelectedSeverity(selectedSeverity === 'CRITICAL' ? 'ALL' : 'CRITICAL')}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            selectedSeverity === 'CRITICAL'
              ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-200'
              : 'bg-white border-slate-200 hover:border-rose-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wide">Critical Alerts</span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
          </div>
          <div className="text-3xl font-extrabold text-rose-900 mt-2">{criticalCount}</div>
          <span className="text-[11px] text-rose-700/80 mt-1 block">Immediate nodal action required</span>
        </div>

        {/* High */}
        <div
          onClick={() => setSelectedSeverity(selectedSeverity === 'HIGH' ? 'ALL' : 'HIGH')}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            selectedSeverity === 'HIGH'
              ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-200'
              : 'bg-white border-slate-200 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">High Risk Alerts</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-amber-900 mt-2">{highCount}</div>
          <span className="text-[11px] text-amber-700/80 mt-1 block">30-day intervention window</span>
        </div>

        {/* Watch */}
        <div
          onClick={() => setSelectedSeverity(selectedSeverity === 'WATCH' ? 'ALL' : 'WATCH')}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            selectedSeverity === 'WATCH'
              ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-200'
              : 'bg-white border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">Watch Items</span>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          </div>
          <div className="text-3xl font-extrabold text-blue-900 mt-2">{watchCount}</div>
          <span className="text-[11px] text-blue-700/80 mt-1 block">Velocity anomaly under observation</span>
        </div>
      </div>

      {/* 2D RISK PRIORITY MATRIX */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4" id="risk-priority-matrix-section">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">2D Risk Priority Matrix</h3>
            <p className="text-xs text-slate-500">
              Quadrant mapping of Project Risk Score (X) against Strategic Economic Impact (Y).
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-600" />
              <span className="text-slate-600 font-medium">Critical</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-slate-600 font-medium">High Risk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-slate-600 font-medium">Watch / Stable</span>
            </div>
          </div>
        </div>

        {/* Matrix Canvas Container */}
        <div className="h-80 w-full relative">
          {/* Quadrant Background Labels */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none p-10 opacity-30 text-xs font-black uppercase tracking-wider text-slate-400 select-none">
            <div className="flex items-start justify-start">II. Priority Review (High Outlay, Low Risk)</div>
            <div className="flex items-start justify-end text-rose-600">IV. Urgent Cabinet Action (High Risk & High Outlay)</div>
            <div className="flex items-end justify-start">I. Monitor (Low Risk, Low Outlay)</div>
            <div className="flex items-end justify-end text-amber-600">III. Operational Watch (High Risk, Low Outlay)</div>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                type="number"
                dataKey="riskScore"
                name="Risk Score"
                domain={[0, 100]}
                unit="/100"
                tick={{ fontSize: 11, fill: '#64748b' }}
                label={{ value: 'Project Risk Score (0 - 100) →', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#64748b' }}
              />
              <YAxis
                type="number"
                dataKey="impactScore"
                name="Strategic Impact"
                domain={[0, 100]}
                unit="/100"
                tick={{ fontSize: 11, fill: '#64748b' }}
                label={{ value: '↑ Strategic Outlay & Impact (0 - 100)', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#64748b' }}
              />
              <ZAxis type="number" dataKey="cost" range={[120, 600]} name="Sanctioned Outlay (₹ Cr)" />
              <ReferenceLine x={50} stroke="#cbd5e1" strokeDasharray="4 4" />
              <ReferenceLine y={50} stroke="#cbd5e1" strokeDasharray="4 4" />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs space-y-1 max-w-xs z-50">
                        <div className="font-mono text-indigo-300 font-bold">{data.code}</div>
                        <div className="font-semibold text-white">{data.name}</div>
                        <div className="text-slate-300 pt-1">
                          Risk Score: <strong className="text-rose-400">{Math.round(data.riskScore)}/100</strong>
                        </div>
                        <div className="text-slate-300">
                          Impact Index: <strong>{data.impactScore}/100</strong>
                        </div>
                        <div className="text-slate-300">
                          Outlay: <strong>₹{data.cost.toLocaleString()} Cr</strong>
                        </div>
                        <div className="text-[10px] text-indigo-400 pt-1 font-semibold">
                          Click bubble to open project dossier
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter
                data={matrixData}
                onClick={(e: any) => {
                  if (e && e.id) navigate(`/projects/${e.id}`);
                }}
                className="cursor-pointer"
              >
                {matrixData.map((entry, index) => {
                  let fill = '#3b82f6';
                  if (entry.severity === 'CRITICAL') fill = '#e11d48';
                  else if (entry.severity === 'HIGH') fill = '#f59e0b';
                  return <Cell key={`cell-${index}`} fill={fill} className="hover:opacity-80 transition-opacity" />;
                })}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search alerts by project, code, or root cause..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Sector filter */}
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-2.5 py-1.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="ALL">All Sectors</option>
            {sectors.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Severity filter */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-2.5 py-1.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical Only</option>
            <option value="HIGH">High Only</option>
            <option value="WATCH">Watch Only</option>
          </select>
        </div>
      </div>

      {/* Alerts Feed List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
            <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
            <p className="text-sm font-semibold text-slate-700">No active alerts matching filter criteria</p>
            <p className="text-xs text-slate-400 mt-1">All telemetry parameters currently within nominal bounds.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-xl border p-5 shadow-sm space-y-3 transition-all hover:border-indigo-300 ${
                alert.severity === 'CRITICAL'
                  ? 'border-l-4 border-l-rose-600'
                  : alert.severity === 'HIGH'
                  ? 'border-l-4 border-l-amber-500'
                  : 'border-l-4 border-l-blue-500'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {alert.projectCode}
                  </span>
                  <h3
                    onClick={() => navigate(`/projects/${alert.projectId}`)}
                    className="font-bold text-slate-900 text-sm hover:text-indigo-600 cursor-pointer transition-colors"
                  >
                    {alert.projectName}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <RiskBadge level={alert.severity} />
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {alert.detectedAt}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-700 font-medium">
                {alert.changeSummary}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Root Cause Driver</span>
                  <strong className="text-slate-800 font-medium">{alert.primaryDriver}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Trigger Type</span>
                  <span className="font-mono font-medium text-indigo-700">{alert.changeType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Required Review Cadence</span>
                  <strong className="text-rose-700">{alert.recommendedReviewDate}</strong>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 gap-2">
                <div className="text-[11px] text-slate-500">
                  Assigned Authority: <strong>{alert.nodalOfficer}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Acknowledged alert ${alert.id}. Logged to audit registry.`)}
                    className="px-3 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    Acknowledge
                  </button>
                  <button
                    onClick={() => navigate(`/explainability?project=${alert.projectId}`)}
                    className="px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors"
                  >
                    View SHAP Attribution &rarr;
                  </button>
                  <button
                    onClick={() => navigate(`/projects/${alert.projectId}`)}
                    className="px-3 py-1 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    Open Project &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
