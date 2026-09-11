import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ShieldAlert,
  TrendingUp,
  Layers,
} from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';
import { InfraProject } from '../../types/projects';
import { ProjectOverviewCard } from '../../components/predictions/ProjectOverviewCard';
import { PredictiveParametersCard } from '../../components/predictions/PredictiveParametersCard';
import { RiskPillarsSection } from '../../components/predictions/RiskPillarsSection';
import { UnifiedRiskDriversSection } from '../../components/predictions/UnifiedRiskDriversSection';
import { HistoricalTrendSection } from '../../components/predictions/HistoricalTrendSection';
import { OverallRiskSummaryCard } from '../../components/predictions/OverallRiskSummaryCard';
import { ForwardRiskOutlookTab } from '../../components/predictions/ForwardRiskOutlookTab';

export const PredictionsPage: React.FC = () => {
  const projects = useProjectStore((state) => state.projects);

  // Active sub-feature tab: 'risk_intelligence' (Part 1) or 'forward_outlook' (Part 2)
  const [activeTab, setActiveTab] = useState<'risk_intelligence' | 'forward_outlook'>('risk_intelligence');

  // Selected project state
  const [selectedProjectId, setSelectedProjectId] = useState<string>(() => {
    if (projects.length > 0) {
      const foundKadapa = projects.find((p) => p.id === '612786' || p.code.includes('612786'));
      return foundKadapa ? foundKadapa.id : projects[0].id;
    }
    return '612786';
  });

  const selectedProject: InfraProject = useMemo(() => {
    return (
      projects.find((p) => p.id === selectedProjectId || p.code === selectedProjectId) ||
      projects[0] || {
        id: '612786',
        code: 'PAIMANA-612786',
        name: 'Construction of New Domestic Terminal Building and Allied Works at Kadapa Airport',
        sector: 'Civil Aviation',
        state: 'Andhra Pradesh',
        stage: 'Testing & Commissioning',
        implementingAgency: 'Airport Authority of India [AAI]',
        sanctionedCostCr: 265.91,
        revisedCostCr: 265.91,
        expenditureCr: 176.38,
        forecastCostCr: 265.91,
        originalDeadline: '01/2026',
        predictedCompletionDate: '09/2026',
        expectedProgress: 89.6,
        currentPhysicalProgress: 80.0,
        progressGap: 9.6,
        financialProgress: 66.3,
        healthScore: 86,
        riskLevel: 'HIGH',
        riskTrend: 5.0,
        costRiskScore: 30,
        timeRiskScore: 50,
        executionRiskScore: 44,
        predictedDelayMonths: 8,
        predictedCostOverrunCr: 0,
        primaryRiskDriver: 'Apron Expansion & Air Traffic Automation Interface',
        impactScore: 53,
        escalationStatus: 'UNDER_REVIEW',
        keyMilestones: [],
        aiSummary: '',
      }
    );
  }, [projects, selectedProjectId]);

  const handleSwitchToForwardOutlook = () => {
    setActiveTab('forward_outlook');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchToRiskIntelligence = () => {
    setActiveTab('risk_intelligence');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto" id="predictive-intelligence-page">
      
      {/* Top Header & Segmented Sub-Feature Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>AI Predictive & Prescriptive Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Infrastructure Predictive Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Deterministic risk synthesis grounded in official MoSPI PAIMANA baseline records.
          </p>
        </div>

        {/* Segmented Sub-Feature Navigation (Tab 1 vs Tab 2) */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 self-start md:self-auto shrink-0 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab('risk_intelligence')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'risk_intelligence'
                ? 'bg-white text-indigo-900 shadow-2xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
            <span>Project Risk Intelligence</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('forward_outlook')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'forward_outlook'
                ? 'bg-white text-indigo-900 shadow-2xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
            <span>Forward Risk Outlook</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          PART 1: PROJECT RISK INTELLIGENCE
          ========================================================================= */}
      {activeTab === 'risk_intelligence' && (
        <div className="space-y-6" id="part-1-project-risk-intelligence">
          {/* 1. Project Selection & Overview */}
          <ProjectOverviewCard
            selectedProject={selectedProject}
            projects={projects}
            onSelectProject={setSelectedProjectId}
          />

          {/* 2. Predictive Parameters (Cost, Time, Execution) */}
          <PredictiveParametersCard project={selectedProject} />

          {/* 3, 4, 5. Risk Summary (Cost Risk, Time Risk, Execution Risk) */}
          <RiskPillarsSection project={selectedProject} />

          {/* 6. Why Is This Project At Risk? (Unified Quantified Risk Drivers) */}
          <UnifiedRiskDriversSection project={selectedProject} />

          {/* 7. Historical Trend (April -> May -> June -> July 2026 for the same project) */}
          <HistoricalTrendSection project={selectedProject} />

          {/* 8. Overall Risk Summary with CTA to Forward Risk Outlook */}
          <OverallRiskSummaryCard
            project={selectedProject}
            onViewForwardOutlook={handleSwitchToForwardOutlook}
          />
        </div>
      )}

      {/* =========================================================================
          PART 2: FORWARD RISK OUTLOOK
          ========================================================================= */}
      {activeTab === 'forward_outlook' && (
        <ForwardRiskOutlookTab
          project={selectedProject}
          onBackToRiskIntelligence={handleSwitchToRiskIntelligence}
        />
      )}

    </div>
  );
};
