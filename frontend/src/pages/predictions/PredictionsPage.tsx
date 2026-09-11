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
      <div className="neo-panel p-5 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1557D6] mb-1.5">
            <span className="px-2.5 py-0.5 rounded-lg neo-inset text-[#1557D6] font-bold text-[10px]">
              Prototype • Historical PAIMANA Data
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--neo-text-primary)] tracking-tight">
            Predictive Risk Assessment — Prototype
          </h1>
          <p className="text-xs sm:text-sm text-[var(--neo-text-secondary)] mt-1 max-w-3xl">
            Derived from historical PAIMANA project indicators. Risk assessment based on available project cost, expenditure, physical progress and schedule indicators.
          </p>
          <div className="mt-2 text-[11px] text-[var(--neo-text-tertiary)] flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Source: Official PAIMANA Flash Reports, April–July 2026</span>
            <span className="hidden sm:inline">•</span>
            <span>Prototype assessment using available historical project records</span>
          </div>
        </div>

        {/* Segmented Sub-Feature Navigation (Tab 1 vs Tab 2) */}
        <div className="flex items-center p-1.5 neo-inset rounded-2xl self-start md:self-auto shrink-0 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('risk_intelligence')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'risk_intelligence'
                ? 'neo-raised text-[#1557D6] font-black shadow-[2px_2px_5px_rgba(166,180,200,0.45),-2px_-2px_5px_rgba(255,255,255,0.9)]'
                : 'text-[var(--neo-text-secondary)] hover:text-[var(--neo-text-primary)]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#1557D6]" />
            <span>Project Risk Intelligence</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('forward_outlook')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'forward_outlook'
                ? 'neo-raised text-[#1557D6] font-black shadow-[2px_2px_5px_rgba(166,180,200,0.45),-2px_-2px_5px_rgba(255,255,255,0.9)]'
                : 'text-[var(--neo-text-secondary)] hover:text-[var(--neo-text-primary)]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#1557D6]" />
            <span>Forward Risk Outlook — Prototype</span>
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

      {/* Methodological Disclaimer Note */}
      <div className="p-4 sm:p-5 rounded-2xl neo-inset text-xs text-[var(--neo-text-secondary)] space-y-1.5 mt-6 border border-[rgba(200,212,226,0.45)]">
        <div className="font-bold text-[var(--neo-text-primary)] text-xs uppercase tracking-wider">Methodological Note:</div>
        <p className="leading-relaxed">
          This prototype derives project risk indicators from available historical PAIMANA project data. Production-grade predictive modelling would require a larger historical dataset, validated training labels, model evaluation and authorized live data integration.
        </p>
      </div>

    </div>
  );
};
