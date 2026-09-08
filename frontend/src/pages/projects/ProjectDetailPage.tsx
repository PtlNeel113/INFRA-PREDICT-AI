import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  Sparkles,
  Layers,
  FileText,
  Share2,
  Download,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BarChart3,
  Activity,
  History,
  ShieldAlert,
  Sliders,
  Maximize2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useProjectStore } from '../../store/projectStore';
import { HealthScoreBadge } from '../../components/ui/HealthScoreBadge';
import { RiskBadge } from '../../components/ui/RiskBadge';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'cost' | 'schedule' | 'milestones' | 'what-changed'>('overview');

  // Find project from store or fallback
  const { getProject, projects } = useProjectStore();
  const project = getProject(id || '') || projects.find((p) => p.id === id || p.code === id) || projects[0];

  return (
    <div className="space-y-6 pb-16" id={`project-detail-page-${project.id}`}>
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          id="back-to-projects-btn"
          onClick={() => navigate('/projects')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects Directory</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/explainability?project=${project.id}`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explainable AI (SHAP)</span>
          </button>
          <button
            onClick={() => navigate(`/benchmarking?project=${project.id}`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors shadow-sm"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Peer Benchmarking</span>
          </button>
          <button
            onClick={() => alert(`Generated Dossier PDF for ${project.name}`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Dossier</span>
          </button>
        </div>
      </div>

      {/* Main Project Hero Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Project Details Info */}
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-md">
                {project.code}
              </span>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                {project.sector}
              </span>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                {project.stage}
              </span>
              <RiskBadge level={project.riskLevel} />
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {project.name}
            </h1>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600 pt-1">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>Agency: <strong>{project.implementingAgency}</strong></span>
              </div>
              {project.ministry && (
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-slate-400" />
                  <span>Ministry: <strong>{project.ministry}</strong></span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Location: <strong>{project.state}{project.district ? ` (${project.district})` : ''}</strong></span>
              </div>
              {project.startDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Start Date: <strong>{project.startDate}</strong></span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Target Date: <strong>{project.originalDeadline}</strong></span>
              </div>
            </div>
          </div>

          {/* Health Score Large Block */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-center gap-5 min-w-[280px]">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                Composite Health
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl font-extrabold text-slate-900">{project.healthScore}</span>
                <span className="text-sm font-semibold text-slate-400">/ 100</span>
              </div>
              <span className={`text-xs font-bold mt-1 ${
                project.healthScore < 50
                  ? 'text-rose-600'
                  : project.healthScore < 75
                  ? 'text-amber-600'
                  : 'text-emerald-600'
              }`}>
                {project.healthScore < 50 ? 'HIGH RISK ALERT' : project.healthScore < 75 ? 'WATCH REQUIRED' : 'OPTIMAL HEALTH'}
              </span>
            </div>

            <div className="w-px h-16 bg-slate-200" />

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">60d Velocity:</span>
                <span className={`font-bold ${project.riskTrend > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {project.riskTrend > 0 ? `+${project.riskTrend} pts` : `${project.riskTrend} pts`}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Delay Exp.:</span>
                <span className="font-bold text-slate-800">+{project.predictedDelayMonths} mos</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Cost Exp.:</span>
                <span className="font-bold text-rose-600">+₹{project.predictedCostOverrunCr} Cr</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Prominent Risk Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
          {/* Cost Risk */}
          <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-rose-900 uppercase tracking-wide">
                Cost Risk Index
              </div>
              <div className="text-xs text-rose-700/80 mt-0.5">
                Escalation probability & claims exposure
              </div>
            </div>
            <div className="text-3xl font-extrabold text-rose-700 font-mono">
              {project.costRiskScore}
            </div>
          </div>

          {/* Time Risk */}
          <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                Time Risk Index
              </div>
              <div className="text-xs text-amber-700/80 mt-0.5">
                Critical path & schedule slippage
              </div>
            </div>
            <div className="text-3xl font-extrabold text-amber-700 font-mono">
              {project.timeRiskScore}
            </div>
          </div>

          {/* Execution Risk */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                Execution Risk Index
              </div>
              <div className="text-xs text-blue-700/80 mt-0.5">
                Machinery, geology & contractor solvency
              </div>
            </div>
            <div className="text-3xl font-extrabold text-blue-700 font-mono">
              {project.executionRiskScore}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 bg-white rounded-xl p-1.5 shadow-sm gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-indigo-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Intelligence Overview
        </button>
        <button
          onClick={() => setActiveTab('cost')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'cost'
              ? 'bg-indigo-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Cost Intelligence
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'schedule'
              ? 'bg-indigo-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Time & Schedule
        </button>
        <button
          onClick={() => setActiveTab('milestones')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'milestones'
              ? 'bg-indigo-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Milestone Timeline ({project.keyMilestones.length})
        </button>
        <button
          onClick={() => setActiveTab('what-changed')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'what-changed'
              ? 'bg-indigo-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Change Intelligence</span>
        </button>
      </div>

      {/* TAB CONTENT: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* AI Executive Summary Box */}
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-indigo-800">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>AI Executive Synthesis</span>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-indigo-50 font-normal">
              {project.aiSummary}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-4 border-t border-indigo-800/80 text-xs">
              <div>
                <span className="text-indigo-300 block">Primary Risk Driver</span>
                <strong className="text-white font-medium mt-0.5 block">{project.primaryRiskDriver}</strong>
              </div>
              <div>
                <span className="text-indigo-300 block">Physical Progress vs Planned</span>
                <strong className="text-white font-medium mt-0.5 block">
                  {project.currentPhysicalProgress}% / {project.expectedProgress}% ({project.progressGap > 0 ? `-${project.progressGap}% lag` : '+2.5% ahead'})
                </strong>
              </div>
              <div>
                <span className="text-indigo-300 block">Predicted COD</span>
                <strong className="text-white font-medium mt-0.5 block">{project.predictedCompletionDate}</strong>
              </div>
              <div>
                <span className="text-indigo-300 block">Current Escalation Status</span>
                <strong className="text-amber-300 font-medium mt-0.5 block">{project.escalationStatus}</strong>
              </div>
            </div>
          </div>

          {/* Two-column layout: Cost & Time Intelligence Snapshots */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cost Intelligence Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-900 text-base">Cost Intelligence</h3>
                </div>
                <button
                  onClick={() => setActiveTab('cost')}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  View Details &rarr;
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Approved Cost</span>
                  <div className="text-sm font-bold text-slate-800 mt-1">₹{project.sanctionedCostCr.toLocaleString()} Cr</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Revised Cost</span>
                  <div className="text-sm font-bold text-slate-800 mt-1">₹{project.revisedCostCr.toLocaleString()} Cr</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Expenditure</span>
                  <div className="text-sm font-bold text-indigo-700 mt-1">₹{project.expenditureCr.toLocaleString()} Cr</div>
                </div>
                <div className="bg-rose-50/70 p-3 rounded-lg border border-rose-100">
                  <span className="text-[10px] text-rose-700 uppercase font-semibold">Forecast Final</span>
                  <div className="text-sm font-bold text-rose-800 mt-1">₹{project.forecastCostCr.toLocaleString()} Cr</div>
                </div>
              </div>

              {/* Mini Cost Trend Graph */}
              {project.costTrend && (
                <div className="h-44 w-full pt-2">
                  <div className="text-[11px] font-semibold text-slate-500 mb-1">Expenditure vs Forecast Cost (₹ Cr)</div>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={project.costTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="period" tick={{ fontSize: 10, fill: '#64748b' }} />
                      <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="forecast" stroke="#e11d48" fill="#ffe4e6" strokeWidth={2} name="Forecast Cost" />
                      <Area type="monotone" dataKey="expenditure" stroke="#4f46e5" fill="#e0e7ff" strokeWidth={2} name="Actual Expenditure" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Time Intelligence Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-900 text-base">Time & Schedule Intelligence</h3>
                </div>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  View Details &rarr;
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Planned Date</span>
                  <div className="text-xs font-bold text-slate-800 mt-1 truncate">{project.originalDeadline}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Current Pace</span>
                  <div className="text-xs font-bold text-slate-800 mt-1">{project.currentPhysicalProgress}% / Mo</div>
                </div>
                <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-100">
                  <span className="text-[10px] text-amber-700 uppercase font-semibold">Forecast Date</span>
                  <div className="text-xs font-bold text-amber-900 mt-1 truncate">{project.predictedCompletionDate}</div>
                </div>
                <div className="bg-rose-50/70 p-3 rounded-lg border border-rose-100">
                  <span className="text-[10px] text-rose-700 uppercase font-semibold">Predicted Delay</span>
                  <div className="text-xs font-bold text-rose-900 mt-1">+{project.predictedDelayMonths} Months</div>
                </div>
              </div>

              {/* Progress Bar comparison */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <span>Physical Progress (Actual)</span>
                    <span className="font-bold text-indigo-600">{project.currentPhysicalProgress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${project.currentPhysicalProgress}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <span>Scheduled Baseline Target</span>
                    <span className="font-bold text-slate-800">{project.expectedProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 rounded-full" style={{ width: `${project.expectedProgress}%` }} />
                  </div>
                </div>

                {project.progressGap > 0 && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>
                      Progress deficit of <strong>{project.progressGap}%</strong> behind sanctioned DPR baseline.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Risk Trajectory History Chart */}
          {project.riskTrajectory && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Historical & Forecast Risk Trajectory</h3>
                  <p className="text-xs text-slate-500">6-Month historical risk trend and projected 90-day trajectory</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-indigo-600" />
                    <span className="text-slate-600">Observed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500 border border-dashed border-rose-700" />
                    <span className="text-slate-600">Forecast</span>
                  </div>
                </div>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={project.riskTrajectory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#4f46e5"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#4f46e5' }}
                      activeDot={{ r: 6 }}
                      name="Risk Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Current Issues & Risk Inputs Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-base">Current Issues & Risk Inputs</h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                Field Intake Log
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                  Current Challenges
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {project.currentIssues || 'No active operational or technical challenges logged for this project package.'}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                  Delays & Schedule Slippages
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {project.delays || 'No schedule recovery adjustments or statutory timeline slippages registered.'}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                  Resource & Other Constraints
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {project.constraints || 'No labor, machinery, capital, or environmental clearances flagged as bottlenecks.'}
                </p>
              </div>
            </div>
          </div>

          {/* Recommended Actions Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">Recommended Actions & Prescriptive Mitigations</h3>
              </div>
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-md">
                Priority Interventions
              </span>
            </div>

            <div className="space-y-3">
              {((project.recommendedActions && project.recommendedActions.length > 0)
                ? project.recommendedActions
                : [
                    `Convene nodal coordination with ${project.ministry || 'Ministry'} to resolve critical path inter-agency dependencies.`,
                    `Re-baseline construction milestones and enforce daily liquidated damages clause for delays exceeding 30 days.`,
                    `Initiate joint district collectorate hearings to expedite right-of-way and utility handover corridors.`,
                  ]
              ).map((action, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 flex items-start gap-3 transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-800 leading-relaxed">
                      {action}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    idx === 0 ? 'bg-rose-100 text-rose-700' : idx === 1 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {idx === 0 ? 'Critical' : idx === 1 ? 'High' : 'Advisory'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Cost Intelligence */}
      {activeTab === 'cost' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Cost Intelligence & Price Escalation Breakdown</h3>
            <p className="text-xs text-slate-500 mt-1">
              Detailed tracking of sanctioned budgets, contractor billings, and multi-variable price adjustment indices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs font-semibold text-slate-500">Original Sanctioned Cost</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">₹{project.sanctionedCostCr.toLocaleString()} Cr</div>
              <span className="text-[11px] text-slate-400 mt-1 block">Cabinet Approved DPR Outlay</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs font-semibold text-slate-500">Revised Approved Cost</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">₹{project.revisedCostCr.toLocaleString()} Cr</div>
              <span className="text-[11px] text-slate-400 mt-1 block">Post Cost-Committee Revision</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs font-semibold text-slate-500">Actual Expenditure</span>
              <div className="text-2xl font-extrabold text-indigo-700 mt-1">₹{project.expenditureCr.toLocaleString()} Cr</div>
              <span className="text-[11px] text-slate-400 mt-1 block">{((project.expenditureCr / project.sanctionedCostCr) * 100).toFixed(1)}% financial drawdown</span>
            </div>

            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
              <span className="text-xs font-semibold text-rose-700">Forecast Final Cost</span>
              <div className="text-2xl font-extrabold text-rose-800 mt-1">₹{project.forecastCostCr.toLocaleString()} Cr</div>
              <span className="text-[11px] text-rose-600 font-semibold mt-1 block">+₹{project.predictedCostOverrunCr} Cr anticipated overrun</span>
            </div>
          </div>

          {/* Cost Escalation Historical Chart */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-sm font-bold text-slate-800 mb-3">Cost Progression Curve (₹ Cr)</h4>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={project.costTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="period" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sanctioned" fill="#cbd5e1" name="Sanctioned Baseline" />
                  <Bar dataKey="expenditure" fill="#4f46e5" name="Actual Expenditure" />
                  <Bar dataKey="forecast" fill="#e11d48" name="Forecast Escalation" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Time & Schedule */}
      {activeTab === 'schedule' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Schedule Intelligence & Critical Path Velocity</h3>
            <p className="text-xs text-slate-500 mt-1">
              Linear progress simulation vs original baseline timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs font-semibold text-slate-500">Planned Completion Date</span>
              <div className="text-xl font-bold text-slate-900 mt-1">{project.originalDeadline}</div>
              <span className="text-[11px] text-slate-400 mt-1 block">Sanctioned statutory target</span>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <span className="text-xs font-semibold text-amber-800">Forecast Completion Date</span>
              <div className="text-xl font-bold text-amber-900 mt-1">{project.predictedCompletionDate}</div>
              <span className="text-[11px] text-amber-700 mt-1 block">AI Model Forecast</span>
            </div>

            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
              <span className="text-xs font-semibold text-rose-700">Projected Slippage</span>
              <div className="text-xl font-bold text-rose-900 mt-1">+{project.predictedDelayMonths} Months</div>
              <span className="text-[11px] text-rose-600 mt-1 block">Approx. {Math.round(project.predictedDelayMonths * 30.4)} days delay</span>
            </div>
          </div>

          {/* Schedule Detail Breakdown */}
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-sm font-bold text-slate-800">Root Causes for Schedule Deficit</h4>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span><strong>Primary Choke Point:</strong> {project.primaryRiskDriver}</span>
              </li>
              {project.secondaryRiskDriver && (
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Secondary Factor:</strong> {project.secondaryRiskDriver}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Milestone Timeline */}
      {activeTab === 'milestones' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Milestone Timeline & Critical Path Audit</h3>
              <p className="text-xs text-slate-500 mt-1">
                Active tracking of major deliverable stages, delay metrics, and critical path gates.
              </p>
            </div>
            <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-lg">
              {project.keyMilestones.filter((m) => m.status === 'COMPLETED').length} of {project.keyMilestones.length} Completed
            </span>
          </div>

          <div className="space-y-4 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-200">
            {project.keyMilestones.map((m, idx) => (
              <div key={m.id || idx} className="relative flex items-start gap-4 pl-8 group">
                {/* Status Dot on Line */}
                <div className={`absolute left-2.5 top-1 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 bg-white ${
                  m.status === 'COMPLETED'
                    ? 'border-emerald-600 bg-emerald-600'
                    : m.status === 'CRITICAL'
                    ? 'border-rose-600 bg-rose-600 ring-4 ring-rose-100'
                    : m.status === 'DELAYED'
                    ? 'border-amber-500 bg-amber-500'
                    : 'border-slate-400'
                }`} />

                <div className="flex-1 bg-slate-50 group-hover:bg-slate-100/80 transition-colors p-4 rounded-xl border border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{m.title}</h4>
                        {m.criticalPath && (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-100 text-rose-700 rounded">
                            Critical Path
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span>Target: <strong>{m.targetDate}</strong></span>
                        {m.actualDate && <span>• Actual: <strong className="text-emerald-700">{m.actualDate}</strong></span>}
                        {m.revisedDate && <span>• Revised Forecast: <strong className="text-rose-700">{m.revisedDate}</strong></span>}
                      </div>
                    </div>

                    <div>
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-lg ${
                        m.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : m.status === 'CRITICAL'
                          ? 'bg-rose-100 text-rose-800'
                          : m.status === 'DELAYED'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-800'
                      }`}>
                        {m.status} {m.delayDays && m.delayDays > 0 ? `(+${m.delayDays}d)` : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Change Intelligence ("What Changed") */}
      {activeTab === 'what-changed' && project.changeIntelligence && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-1">
                <History className="w-4 h-4" />
                <span>Inter-Cycle Variance Engine</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">What Changed: Previous vs Current Cycle</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparing cycle {project.changeIntelligence.previousCycleDate} with {project.changeIntelligence.currentCycleDate}
              </p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
              Cycle Interval: 30 Days
            </span>
          </div>

          {/* Change Summary Highlight */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
            <strong>Executive Note:</strong> {project.changeIntelligence.summary}
          </div>

          {/* Side-by-side metric comparison table */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-3">Key Metric Deltas</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <th className="py-2.5 px-4">Metric</th>
                    <th className="py-2.5 px-4">Previous Cycle ({project.changeIntelligence.previousCycleDate})</th>
                    <th className="py-2.5 px-4">Current Cycle ({project.changeIntelligence.currentCycleDate})</th>
                    <th className="py-2.5 px-4">Observed Change (Delta)</th>
                    <th className="py-2.5 px-4 text-center">Impact Severity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {project.changeIntelligence.metrics.map((m, i) => (
                    <tr key={i} className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">{m.metric}</td>
                      <td className="py-3 px-4 text-slate-600 font-mono">{m.previous}</td>
                      <td className="py-3 px-4 text-slate-900 font-bold font-mono">{m.current}</td>
                      <td className="py-3 px-4 font-bold font-mono">
                        <span className={m.impact === 'adverse' ? 'text-rose-600' : 'text-emerald-600'}>
                          {m.delta}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded ${
                          m.isSignificant
                            ? 'bg-rose-100 text-rose-800'
                            : m.impact === 'adverse'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {m.isSignificant ? 'CRITICAL DELTA' : m.impact.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Operational Shift Notes */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-2">Ground Level Observations Logged</h4>
            <div className="space-y-2">
              {project.changeIntelligence.highlightNotes.map((note, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
