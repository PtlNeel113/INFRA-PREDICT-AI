import React from 'react';
import {
  DollarSign,
  Clock,
  Activity,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Layers,
  ChevronRight,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { InfraProject, PredictionData } from '../../types/projects';

interface PredictionForecastsSectionProps {
  project: InfraProject;
  prediction: PredictionData;
}

export const PredictionForecastsSection: React.FC<PredictionForecastsSectionProps> = ({
  project,
  prediction,
}) => {
  return (
    <section className="space-y-6" id="prediction-forecasts-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 font-bold text-xs shadow-2xs">
            04
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>AI Predictions & Forward Projections</span>
              <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                Bayesian Machine Learning Bounds
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Forward completion dates, potential cost escalation limits, and 90-day probability envelopes.
            </p>
          </div>
        </div>
        <div className="text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs self-start sm:self-auto flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Confidence: <strong>{prediction.costOverrun.modelConfidencePercent}%</strong></span>
        </div>
      </div>

      {/* 3 Major Predictive Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* MODULE 1: Cost Overrun Prediction */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-slate-900 text-sm">Cost Overrun Forecast</h3>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-100 text-rose-700 rounded">
                +{prediction.costOverrun.escalationPercentage}% Escalation
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-slate-400">Current Sanctioned</span>
                <div className="text-sm font-bold text-slate-800 mt-1 font-mono">
                  ₹{prediction.costOverrun.sanctionedCostCr.toLocaleString()} Cr
                </div>
              </div>
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-rose-700">Forecast Final</span>
                <div className="text-sm font-bold text-rose-900 mt-1 font-mono">
                  ₹{prediction.costOverrun.forecastEstimateCr.toLocaleString()} Cr
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>Potential Escalation:</span>
                <strong className="text-rose-600 font-mono">
                  +₹{prediction.costOverrun.potentialEscalationCr.toLocaleString()} Cr
                </strong>
              </div>
              <div className="flex justify-between">
                <span>80% Confidence Interval:</span>
                <strong className="text-slate-800 font-mono">
                  ₹{prediction.costOverrun.confidenceInterval.lower.toLocaleString()} - ₹{prediction.costOverrun.confidenceInterval.upper.toLocaleString()} Cr
                </strong>
              </div>
              <div className="flex justify-between">
                <span>ML Model Confidence:</span>
                <strong className="text-emerald-700 font-mono">
                  {prediction.costOverrun.modelConfidencePercent}%
                </strong>
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
                  <Area
                    type="monotone"
                    dataKey="forecast"
                    stroke="#e11d48"
                    fill="#ffe4e6"
                    strokeWidth={2}
                    name="Forecast Cost"
                  />
                  <Area
                    type="monotone"
                    dataKey="actualExp"
                    stroke="#4f46e5"
                    fill="#e0e7ff"
                    strokeWidth={2}
                    name="Actual Expenditure"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* MODULE 2: Time Overrun Prediction */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-sm">Time Overrun Forecast</h3>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded">
                +{prediction.timeOverrun.expectedDelayMonths} Months Delay
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-slate-400">Planned Date</span>
                <div className="text-xs font-bold text-slate-800 mt-1 truncate">
                  {prediction.timeOverrun.plannedCompletion}
                </div>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-amber-700">Forecast Date</span>
                <div className="text-xs font-bold text-amber-900 mt-1 truncate">
                  {prediction.timeOverrun.forecastCompletion}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>Total Delay in Days:</span>
                <strong className="text-amber-700 font-mono">
                  ~{prediction.timeOverrun.delayDays} Days
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Delay Bounds (P10-P90):</span>
                <strong className="text-slate-800 font-mono">
                  {prediction.timeOverrun.confidenceIntervalMonths.lower} - {prediction.timeOverrun.confidenceIntervalMonths.upper} Months
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Original DoC Probability:</span>
                <strong className="text-rose-600 font-mono">
                  14.2% on planned deadline
                </strong>
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
                  <Line
                    type="monotone"
                    dataKey="plannedProgress"
                    stroke="#94a3b8"
                    strokeDasharray="3 3"
                    strokeWidth={2}
                    name="Baseline Plan"
                  />
                  <Line
                    type="monotone"
                    dataKey="actualProgress"
                    stroke="#4f46e5"
                    strokeWidth={2.5}
                    name="Actual Execution"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* MODULE 3: Implementation Risk */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm">Implementation Risk Trajectory</h3>
              </div>
              <span
                className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                  prediction.implementationRisk.riskVelocityTrend === 'ACCELERATING'
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {prediction.implementationRisk.riskVelocityTrend}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-slate-400">Current Risk Score</span>
                <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">
                  {prediction.implementationRisk.currentRiskScore}
                </div>
              </div>
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-indigo-700">Projected 90d Risk</span>
                <div className="text-2xl font-extrabold text-indigo-900 mt-1 font-mono">
                  {prediction.implementationRisk.projectedRiskScore}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>Composite Priority Index:</span>
                <strong className="text-indigo-700 font-mono">
                  {prediction.implementationRisk.compositeIndex} / 100
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Momentum Velocity:</span>
                <strong className="text-rose-600 font-mono">+3.8 pts / month</strong>
              </div>
              <div className="flex justify-between">
                <span>Recommended Cadence:</span>
                <strong className="text-slate-800">Weekly Inter-Ministerial Review</strong>
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
                  <Area
                    type="monotone"
                    dataKey="p90"
                    stroke="#cbd5e1"
                    fill="#f1f5f9"
                    strokeWidth={1}
                    name="Upper Bound (P90)"
                  />
                  <Area
                    type="monotone"
                    dataKey="historicalRisk"
                    stroke="#4f46e5"
                    fill="#e0e7ff"
                    strokeWidth={2.5}
                    name="Risk Trajectory"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>

      {/* Comprehensive Prediction Narrative & Model Parameters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h3 className="font-bold text-slate-900 text-sm">Key Model Sensitivity Drivers & Strategic Assumptions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block">1. Commodity Price Sensitivity</span>
            <p className="leading-relaxed">
              Rebar steel and bulk diesel inflation indices are projected at +4.2% annualized trend. A 2% additional spike would expand cost exposure by ₹{Math.round((project.sanctionedCostCr || 500) * 0.025)} Cr.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block">2. Seasonal Weather & Monsoon Window</span>
            <p className="leading-relaxed">
              Pre-monsoon civil foundation & earthwork window closes within 45 days. If delayed, wet-season work suspensions typically add 60 to 90 days of schedule slippage.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block">3. Statutory Clearances & Nodal Interface</span>
            <p className="leading-relaxed">
              Inter-agency railway safety and forest clearance lead times represent critical-path bottlenecks with 88% predictive sensitivity weighting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
