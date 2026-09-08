import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Info,
  CheckCircle2,
  AlertTriangle,
  Layers,
  HelpCircle,
  BarChart2,
  Compass,
} from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';
import { MOCK_EXPLAINABILITY, ExplainabilityAnalysis } from '../../data/explainabilityData';
import { HealthScoreBadge } from '../../components/ui/HealthScoreBadge';
import { InfraProject } from '../../types/projects';

// Helper to build a dynamic SHAP profile for any project
const generateDynamicExplainability = (p: InfraProject): ExplainabilityAnalysis => {
  const progressGap = p.expectedProgress - p.currentPhysicalProgress;
  const overrun = p.predictedCostOverrunCr;
  const isHighRisk = p.riskLevel === 'CRITICAL' || p.riskLevel === 'HIGH';

  return {
    projectId: p.id,
    projectCode: p.code,
    projectName: p.name,
    healthScore: p.healthScore,
    riskSeverity: (p.riskLevel === 'CRITICAL' ? 'CRITICAL' : p.riskLevel === 'HIGH' ? 'HIGH' : p.riskLevel === 'MEDIUM' ? 'WATCH' : 'STABLE') as 'CRITICAL' | 'HIGH' | 'WATCH' | 'STABLE',
    modelConfidencePercent: 91.5,
    baseBaselineScore: 50,
    aiSummary: `Explainability analysis for ${p.name}: primary risk factor is ${p.primaryRiskDriver} with ${progressGap > 0 ? `a schedule deficit of ${progressGap}%` : 'nominal progress'} and estimated cost escalation of ₹${overrun} Cr.`,
    factors: [
      {
        id: 'f1',
        name: p.primaryRiskDriver,
        category: 'Regulatory',
        contributionScore: isHighRisk ? 22.4 : 12.1,
        importancePercent: 35.0,
        impactType: 'POSITIVE_RISK',
        description: `Primary operational impedance identified during onboarding: "${p.primaryRiskDriver}".`,
        evidence: `Direct project intake assessment under ${p.implementingAgency}.`,
        mitigationSuggestion: p.recommendedActions?.[0] || 'Convene urgent inter-ministerial taskforce.',
      },
      {
        id: 'f2',
        name: progressGap > 0 ? `Schedule Execution Lag (${progressGap}% Deficit)` : 'Baseline Pace Maintenance',
        category: 'Schedule',
        contributionScore: progressGap > 5 ? 18.2 : 7.5,
        importancePercent: 28.0,
        impactType: progressGap > 0 ? 'POSITIVE_RISK' : 'STABILIZING',
        description: `Physical completion is ${p.currentPhysicalProgress}% against DPR expected target of ${p.expectedProgress}%.`,
        evidence: `DPR milestone delta tracking.`,
        mitigationSuggestion: p.recommendedActions?.[1] || 'Compress remaining critical path milestones with round-the-clock shift staffing.',
      },
      {
        id: 'f3',
        name: overrun > 0 ? `Anticipated Cost Escalation (+₹${overrun} Cr)` : 'Budgetary Containment',
        category: 'Cost',
        contributionScore: overrun > 0 ? 14.6 : -8.4,
        importancePercent: 22.0,
        impactType: overrun > 0 ? 'POSITIVE_RISK' : 'STABILIZING',
        description: `Sanctioned baseline ₹${p.sanctionedCostCr.toLocaleString()} Cr vs current forecast ₹${p.forecastCostCr.toLocaleString()} Cr.`,
        evidence: `Quarterly revised expenditure reconciliation.`,
        mitigationSuggestion: p.recommendedActions?.[2] || 'Audit contractor billing claims and execute value-engineering review.',
      },
      {
        id: 'f4',
        name: 'Milestone Tracking Governance',
        category: 'Contractor',
        contributionScore: -9.5,
        importancePercent: 8.5,
        impactType: 'STABILIZING',
        description: `${p.keyMilestones.length} active deliverable gates monitored with digital telemetry verification.`,
        evidence: `${p.keyMilestones.filter((m) => m.status === 'COMPLETED').length} milestones completed.`,
        mitigationSuggestion: 'Maintain bi-weekly PMO inspection rhythm.',
      },
      {
        id: 'f5',
        name: 'Implementing Agency Statutory Backing',
        category: 'Regulatory',
        contributionScore: -6.2,
        importancePercent: 6.5,
        impactType: 'STABILIZING',
        description: `Direct supervision by ${p.implementingAgency}.`,
        evidence: `Institutional nodal framework.`,
        mitigationSuggestion: 'Leverage state nodal officers for fast-track statutory clearances.',
      },
    ],
  };
};

export const ExplainabilityPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const projects = useProjectStore((s) => s.projects);

  const initialProjectId = searchParams.get('project') || (projects[0]?.id || 'PRJ-MORT-891');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjectId);

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId || p.code === selectedProjectId) || projects[0];

  const analysis: ExplainabilityAnalysis = useMemo(() => {
    if (MOCK_EXPLAINABILITY[selectedProject.id]) {
      return MOCK_EXPLAINABILITY[selectedProject.id];
    }
    return generateDynamicExplainability(selectedProject);
  }, [selectedProject]);

  const positiveFactors = analysis.factors.filter((f) => f.impactType === 'POSITIVE_RISK');
  const stabilizingFactors = analysis.factors.filter((f) => f.impactType === 'STABILIZING');

  return (
    <div className="space-y-6 pb-16" id="explainability-intelligence-page">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Explainable AI (XAI) & SHAP Contribution Analysis</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Why Is This Project At Risk?</h1>
          <p className="text-sm text-slate-500 mt-1">
            Transparent breakdown of model weights, root cause drivers, and positive vs stabilizing risk contributors.
          </p>
        </div>

        {/* Project Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-600 whitespace-nowrap">Select Target Project:</label>
          <select
            id="explainability-project-select"
            value={selectedProject.id}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-xs truncate"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.code} - {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview & Project Health Strip */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              {selectedProject.code}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">{selectedProject.name}</h2>
            <div className="text-xs text-slate-500">
              Agency: <strong>{selectedProject.implementingAgency}</strong> • Location: <strong>{selectedProject.state}</strong>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-[11px] text-slate-500 uppercase font-semibold block">Composite Health</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-extrabold text-slate-900">{selectedProject.healthScore}</span>
                <span className="text-xs text-slate-400 font-semibold">/ 100</span>
              </div>
            </div>

            <div className="w-px h-12 bg-slate-200" />

            <div className="text-right">
              <span className="text-[11px] text-slate-500 uppercase font-semibold block">Model Confidence</span>
              <div className="text-xl font-bold text-emerald-700 mt-0.5">
                {analysis.modelConfidencePercent}%
              </div>
            </div>

            <button
              onClick={() => navigate(`/projects/${selectedProject.id}`)}
              className="px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
            >
              Full Project File &rarr;
            </button>
          </div>
        </div>

        {/* AI Explanation Narrative Box */}
        <div className="mt-6 p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs text-indigo-950 leading-relaxed space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-indigo-900">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>AI Risk Attribution Synthesis</span>
          </div>
          <p>{analysis.aiSummary}</p>
        </div>
      </div>

      {/* SHAP-Style Factor Contribution Visualizer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg">SHAP Feature Contribution Waterfall</h3>
            <span className="text-xs text-slate-500">
              Base Neutral Baseline: <strong>50.0 pts</strong>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Quantified point contribution of each independent domain parameter on the final health/risk determination.
          </p>
        </div>

        {/* Two Sections: Positive (Increasing Risk) & Negative (Stabilizing) */}
        <div className="space-y-6">
          {/* Section 1: Positive Risk Contributors */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-rose-800 uppercase tracking-wide border-b border-rose-100 pb-1.5">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-rose-600" />
                <span>Positive Risk Contributors (Elevating Project Vulnerability)</span>
              </div>
              <span>Point Impact</span>
            </div>

            <div className="space-y-3">
              {positiveFactors.map((factor) => (
                <div
                  key={factor.id}
                  className="p-4 bg-rose-50/40 border border-rose-100 rounded-xl space-y-2 hover:bg-rose-50/70 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs">{factor.name}</span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-rose-100 text-rose-800 rounded">
                        {factor.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-36 h-2.5 bg-slate-200 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className="h-full bg-rose-600 rounded-full"
                          style={{ width: `${Math.min((factor.contributionScore / 30) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-rose-700 text-xs">
                        +{factor.contributionScore.toFixed(1)} pts
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">{factor.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-rose-100/80 text-[11px]">
                    <div>
                      <span className="text-slate-500 font-medium">Ground Evidence:</span>
                      <p className="text-slate-800 font-medium mt-0.5">{factor.evidence}</p>
                    </div>
                    <div>
                      <span className="text-indigo-800 font-medium">Prescriptive Action:</span>
                      <p className="text-indigo-950 font-medium mt-0.5">{factor.mitigationSuggestion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Stabilizing / Mitigating Factors */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-800 uppercase tracking-wide border-b border-emerald-100 pb-1.5">
              <div className="flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                <span>Stabilizing & Mitigating Assets (Reducing Risk Downside)</span>
              </div>
              <span>Deduction Impact</span>
            </div>

            <div className="space-y-3">
              {stabilizingFactors.map((factor) => (
                <div
                  key={factor.id}
                  className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl space-y-2 hover:bg-emerald-50/70 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs">{factor.name}</span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded">
                        {factor.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-36 h-2.5 bg-slate-200 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className="h-full bg-emerald-600 rounded-full"
                          style={{ width: `${Math.min((Math.abs(factor.contributionScore) / 30) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-emerald-700 text-xs">
                        {factor.contributionScore.toFixed(1)} pts
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">{factor.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-emerald-100/80 text-[11px]">
                    <div>
                      <span className="text-slate-500 font-medium">Observed Buffer:</span>
                      <p className="text-slate-800 font-medium mt-0.5">{factor.evidence}</p>
                    </div>
                    <div>
                      <span className="text-emerald-800 font-medium">Recommended Safeguard:</span>
                      <p className="text-emerald-950 font-medium mt-0.5">{factor.mitigationSuggestion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
