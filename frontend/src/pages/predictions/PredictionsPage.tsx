import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Clock,
  DollarSign,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  Info,
  Calendar,
  Layers,
  ChevronRight,
  Activity,
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
import { MOCK_PROJECTS } from '../../data/projectsData';
import { MOCK_PREDICTIONS } from '../../data/predictionsData';
import { useNavigate } from 'react-router-dom';

export const PredictionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('PRJ-MORT-891');

  const selectedProject =
    MOCK_PROJECTS.find((p) => p.id === selectedProjectId) || MOCK_PROJECTS[0];

  const prediction =
    MOCK_PREDICTIONS[selectedProjectId] || MOCK_PREDICTIONS['PRJ-MORT-891'];

  return (
    <div className="space-y-6 pb-16" id="predictive-intelligence-page">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>ML Intelligence Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Predictive Intelligence & Forward Projections</h1>
          <p className="text-sm text-slate-500 mt-1">
            Bayesian risk modeling, cost escalation trajectories, and completion date probability bounds.
          </p>
        </div>

        {/* Project Selector Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-600 whitespace-nowrap">Select Target Project:</label>
          <select
            id="prediction-project-select"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-xs truncate"
          >
            {MOCK_PROJECTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.code} - {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Model Estimate Disclaimer Banner */}
      <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl flex items-start gap-3 text-xs text-indigo-950">
        <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>AI Model Estimate (Confidence: {prediction.costOverrun.modelConfidencePercent}%):</strong> Forward projections are generated via multi-variable regression and historical delay signatures trained on 1,800+ Indian infrastructure DPRs. Estimates incorporate raw material commodity indices, contractor velocity curves, and state-level right-of-way clearance lead times.
        </div>
      </div>

      {/* Selected Project Overview Strip */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-400 font-mono font-medium">{selectedProject.code}</span>
          <h2 className="text-base font-bold text-slate-900">{selectedProject.name}</h2>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <div>
            <span className="text-slate-400 block">Sanctioned Outlay</span>
            <strong className="text-slate-800 font-mono">₹{selectedProject.sanctionedCostCr.toLocaleString()} Cr</strong>
          </div>
          <div>
            <span className="text-slate-400 block">Current Progress</span>
            <strong className="text-indigo-600 font-mono">{selectedProject.currentPhysicalProgress}%</strong>
          </div>
          <div>
            <span className="text-slate-400 block">Sector</span>
            <strong className="text-slate-800">{selectedProject.sector}</strong>
          </div>
          <button
            onClick={() => navigate(`/projects/${selectedProject.id}`)}
            className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
          >
            Inspect Project &rarr;
          </button>
        </div>
      </div>

      {/* 3 Major Predictive Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MODULE 1: Cost Overrun Prediction */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-slate-900 text-base">Cost Overrun Forecast</h3>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-100 text-rose-700 rounded">
                +{prediction.costOverrun.escalationPercentage}% Escalation
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-slate-400">Current Sanctioned</span>
                <div className="text-sm font-bold text-slate-800 mt-1 font-mono">₹{prediction.costOverrun.sanctionedCostCr} Cr</div>
              </div>
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-rose-700">Forecast Final</span>
                <div className="text-sm font-bold text-rose-900 mt-1 font-mono">₹{prediction.costOverrun.forecastEstimateCr} Cr</div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>Potential Escalation:</span>
                <strong className="text-rose-600 font-mono">+₹{prediction.costOverrun.potentialEscalationCr} Cr</strong>
              </div>
              <div className="flex justify-between">
                <span>80% Confidence Interval:</span>
                <strong className="text-slate-800 font-mono">
                  ₹{prediction.costOverrun.confidenceInterval.lower} - ₹{prediction.costOverrun.confidenceInterval.upper} Cr
                </strong>
              </div>
              <div className="flex justify-between">
                <span>ML Model Confidence:</span>
                <strong className="text-emerald-700 font-mono">{prediction.costOverrun.modelConfidencePercent}%</strong>
              </div>
            </div>
          </div>

          {/* Historical vs Forecast Series mini chart */}
          <div className="pt-3 border-t border-slate-100">
            <div className="text-[11px] font-semibold text-slate-500 mb-2">Cost Outlay Trajectory (₹ Cr)</div>
            <div className="h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={prediction.costOverrun.historicalSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="period" tick={{ fontSize: 9, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 9, fill: '#64748b' }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="forecast" stroke="#e11d48" fill="#ffe4e6" strokeWidth={2} name="Forecast Cost" />
                  <Area type="monotone" dataKey="actualExp" stroke="#4f46e5" fill="#e0e7ff" strokeWidth={2} name="Actual Expenditure" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* MODULE 2: Time Overrun Prediction */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-base">Time Overrun Forecast</h3>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded">
                +{prediction.timeOverrun.expectedDelayMonths} Months Delay
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-slate-400">Planned Date</span>
                <div className="text-xs font-bold text-slate-800 mt-1 truncate">{prediction.timeOverrun.plannedCompletion}</div>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-amber-700">Forecast Date</span>
                <div className="text-xs font-bold text-amber-900 mt-1 truncate">{prediction.timeOverrun.forecastCompletion}</div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>Total Delay in Days:</span>
                <strong className="text-amber-700 font-mono">~{prediction.timeOverrun.delayDays} Days</strong>
              </div>
              <div className="flex justify-between">
                <span>Delay Bounds (P10-P90):</span>
                <strong className="text-slate-800 font-mono">
                  {prediction.timeOverrun.confidenceIntervalMonths.lower} - {prediction.timeOverrun.confidenceIntervalMonths.upper} Months
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Schedule Adherence Prob.:</span>
                <strong className="text-rose-600 font-mono">14.2% on original date</strong>
              </div>
            </div>
          </div>

          {/* S-Curve Progress Trajectory */}
          <div className="pt-3 border-t border-slate-100">
            <div className="text-[11px] font-semibold text-slate-500 mb-2">S-Curve Progress Velocity (%)</div>
            <div className="h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={prediction.timeOverrun.historicalSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="period" tick={{ fontSize: 9, fill: '#64748b' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#64748b' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="plannedProgress" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth={2} name="Baseline" />
                  <Line type="monotone" dataKey="actualProgress" stroke="#4f46e5" strokeWidth={2.5} name="Actual" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* MODULE 3: Implementation Risk */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">Implementation Risk</h3>
              </div>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                prediction.implementationRisk.riskVelocityTrend === 'ACCELERATING'
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                {prediction.implementationRisk.riskVelocityTrend}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-slate-400">Current Risk Score</span>
                <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">{prediction.implementationRisk.currentRiskScore}</div>
              </div>
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-indigo-700">Projected 90d Risk</span>
                <div className="text-2xl font-extrabold text-indigo-900 mt-1 font-mono">{prediction.implementationRisk.projectedRiskScore}</div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>Composite Priority Index:</span>
                <strong className="text-indigo-700 font-mono">{prediction.implementationRisk.compositeIndex} / 100</strong>
              </div>
              <div className="flex justify-between">
                <span>Momentum Velocity:</span>
                <strong className="text-rose-600 font-mono">+3.8 pts / month</strong>
              </div>
              <div className="flex justify-between">
                <span>Recommended Monitoring:</span>
                <strong className="text-slate-800">Weekly Cadence</strong>
              </div>
            </div>
          </div>

          {/* Implementation Risk Confidence Fan Chart */}
          <div className="pt-3 border-t border-slate-100">
            <div className="text-[11px] font-semibold text-slate-500 mb-2">90-Day Risk Confidence Band (P10 - P90)</div>
            <div className="h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={prediction.implementationRisk.historicalSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="period" tick={{ fontSize: 9, fill: '#64748b' }} />
                  <YAxis domain={[40, 100]} tick={{ fontSize: 9, fill: '#64748b' }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="p90" stroke="#cbd5e1" fill="#f1f5f9" strokeWidth={1} name="Upper Bound (P90)" />
                  <Area type="monotone" dataKey="historicalRisk" stroke="#4f46e5" fill="#e0e7ff" strokeWidth={2.5} name="Risk Score" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Prediction Narrative & Model Parameters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Key Assumptions & Model Sensitivity Drivers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">1. Commodity Price Sensitivity</span>
            <p>
              Rebar steel and bulk diesel inflation indices are projected at +4.2% annualized trend. A 2% additional spike would expand cost exposure by ₹68 Cr.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">2. Monsoon Weather Window</span>
            <p>
              Pre-monsoon bridge girder launching window closes by May 30th. If missed, wet-season earthwork restrictions will add minimum 60 days slippage.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">3. Regulatory Statutory Approvals</span>
            <p>
              Inter-ministerial railway crossing safety NOC is currently the critical-path bottleneck. Model assigns 88% weight to immediate resolution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
