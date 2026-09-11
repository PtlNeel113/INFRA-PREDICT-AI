import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  Flame,
  FileSpreadsheet,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import { useDemoStore } from '../../../store/demoStore';
import { useProjectStore } from '../../../store/projectStore';
import { EXECUTIVE_KPI_CARDS } from '../../../data/mockData';
import { InfraProject } from '../../../types/projects';
import { DecisionHeroPanel } from '../DecisionHeroPanel';
import { NationalRiskSnapshot } from '../NationalRiskSnapshot';
import { PortfolioRiskOverview } from '../PortfolioRiskOverview';
import { PortfolioFinancialExposure } from '../PortfolioFinancialExposure';
import { ProjectsAttentionTable } from '../ProjectsAttentionTable';
import { RiskTrajectoryChart } from '../RiskTrajectoryChart';
import { WhatChangedFeed } from '../WhatChangedFeed';
import { AiPriorityInsight } from '../AiPriorityInsight';
import { QuickActionsDock } from '../QuickActionsDock';

interface ExecutiveDashboardViewProps {
  onSelectProject: (p: InfraProject) => void;
  onOpenUpload: () => void;
  onOpenBrief: () => void;
  onOpenAssist: () => void;
}

export const ExecutiveDashboardView: React.FC<ExecutiveDashboardViewProps> = ({
  onSelectProject,
  onOpenUpload,
  onOpenBrief,
  onOpenAssist,
}) => {
  const toast = useToast();
  const { setDecisionMode } = useDemoStore();
  const projects = useProjectStore((s) => s.projects);

  const [selectedStateFilter, setSelectedStateFilter] = useState<string | null>(null);
  const [activeKpiFilter, setActiveKpiFilter] = useState<string>('ALL');

  const dynamicKpiCards = useMemo(() => {
    const avgHealth = Math.round(
      projects.reduce((sum, p) => sum + (p.healthScore || 68), 0) / (projects.length || 1)
    );
    const criticalCount = projects.filter((p) => p.riskLevel === 'CRITICAL').length;
    const atRiskCount = projects.filter(
      (p) => p.riskLevel === 'CRITICAL' || p.riskLevel === 'HIGH'
    ).length;
    const actionCount = projects.filter(
      (p) =>
        p.escalationStatus === 'UNRESOLVED' ||
        p.escalationStatus === 'UNDER_REVIEW' ||
        (p.healthScore !== undefined && p.healthScore < 60)
    ).length;

    return EXECUTIVE_KPI_CARDS.map((card) => {
      if (card.id === 'portfolio-health') {
        return {
          ...card,
          value: `${avgHealth}`,
          sub: `Composite index across ${projects.length} monitored assets`,
        };
      }
      if (card.id === 'at-risk') {
        return {
          ...card,
          value: `${atRiskCount}`,
          trend: `${Math.round((atRiskCount / (projects.length || 1)) * 100)}% of portfolio`,
          sub: 'Predicted delay >3 months or high risk',
        };
      }
      if (card.id === 'critical-projects') {
        return {
          ...card,
          value: `${criticalCount}`,
          trend: criticalCount > 0 ? 'Immediate attention' : 'Nominal',
          sub: 'Highest severity band',
        };
      }
      if (card.id === 'action-required') {
        return {
          ...card,
          value: `${actionCount}`,
          trend: actionCount > 0 ? 'Active interventions' : 'All clear',
          sub: 'Pending review or escalation',
        };
      }
      return card;
    });
  }, [projects]);

  const getKpiIcon = (id: string) => {
    switch (id) {
      case 'portfolio-health':
        return <ShieldCheck className="w-4 h-4 text-[#155EEF]" />;
      case 'at-risk':
        return <AlertTriangle className="w-4 h-4 text-[#D97706]" />;
      case 'critical-projects':
        return <Flame className="w-4 h-4 text-[#DC2626]" />;
      case 'action-required':
        return <Zap className="w-4 h-4 text-[#0E7490]" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-[#155EEF]" />;
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* EXECUTIVE COMMAND CENTER HERO */}
      <div className="neo-panel p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden text-[var(--neo-text-primary)]">
        <div className="relative z-10 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
              Executive Decision Intelligence
            </span>
            <span className="text-xs font-semibold text-[var(--neo-text-tertiary)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Grounded Decision System</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-[32px] font-black tracking-tight text-[var(--neo-text-primary)] leading-tight">
            Senior Decision Maker Command Center
          </h1>
          <p className="text-sm text-[var(--neo-text-secondary)] max-w-lg">
            Macro portfolio risk briefings and strategic interventions for senior policymakers.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-2.5">
          {/* PRIMARY CTA: ENTER DECISION MODE */}
          <button
            type="button"
            onClick={() => {
              setDecisionMode(true);
              toast.info('Decision Mode Active', 'Displaying top prioritized packages ranked by composite urgency.');
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl neo-button-danger text-xs font-black transition-all cursor-pointer hover:scale-105 active:scale-95 decision-pulse"
          >
            <ShieldAlert className="w-4 h-4 text-white" />
            <span>ENTER DECISION MODE</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* SECONDARY CTA: GENERATE RISK BRIEF */}
          <button
            type="button"
            onClick={onOpenBrief}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl neo-button-primary text-xs font-bold text-white transition-all cursor-pointer shadow-[3px_3px_8px_rgba(21,87,214,0.3)]"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>GENERATE RISK BRIEF</span>
          </button>
        </div>
      </div>

      {/* PRIMARY 4 KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dynamicKpiCards.map((card, idx) => {
          const isSelected = activeKpiFilter === card.filterKey;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.2 }}
              onClick={() => {
                const newFilter = isSelected ? 'ALL' : card.filterKey || 'ALL';
                setActiveKpiFilter(newFilter);
                toast.info(`Filter: ${card.title}`, card.sub);
              }}
              className={`p-4.5 rounded-2xl transition-all cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'neo-active border border-[#1557D6]/35 shadow-[inset_2px_2px_5px_rgba(166,180,200,0.45)]'
                  : 'neo-card hover:translate-y-[-2px]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider line-clamp-1">
                    {card.title}
                  </span>
                  <div className="p-1.5 rounded-xl neo-inset-sm group-hover:scale-105 transition-transform">
                    {getKpiIcon(card.id)}
                  </div>
                </div>

                <div className="text-xl sm:text-2xl font-black text-[var(--neo-text-primary)] font-mono tracking-tight">
                  {card.value}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[rgba(200,212,226,0.45)] flex flex-col gap-0.5">
                <span
                  className={`text-[11px] font-bold ${
                    card.risk
                      ? 'text-[#DC2626]'
                      : card.warning
                      ? 'text-[#D97706]'
                      : card.success
                      ? 'text-[#10B981]'
                      : 'text-[#1557D6]'
                  }`}
                >
                  {card.trend}
                </span>
                <span className="text-[10px] text-[var(--neo-text-muted)] line-clamp-1 leading-tight">
                  {card.sub}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ROW 1: DECISION HERO + RISK TRAJECTORY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <DecisionHeroPanel />
        </div>
        <div className="lg:col-span-5 flex flex-col">
          <RiskTrajectoryChart />
        </div>
      </div>

      {/* ROW 2: WHAT CHANGED + NATIONAL RISK SNAPSHOT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6 flex flex-col">
          <WhatChangedFeed
            onSelectProjectCode={(code) => {
              const matched = projects.find((p) => p.code === code || p.id === code);
              if (matched) onSelectProject(matched);
            }}
          />
        </div>
        <div className="lg:col-span-6 flex flex-col">
          <NationalRiskSnapshot />
        </div>
      </div>

      {/* ROW 3: AI PRIORITY INSIGHT */}
      <div>
        <AiPriorityInsight />
      </div>

      {/* ROW 4: PROJECTS REQUIRING ATTENTION (TABLE) */}
      <div id="attention-table">
        <ProjectsAttentionTable
          projects={projects}
          selectedStateFilter={selectedStateFilter}
          onClearStateFilter={() => setSelectedStateFilter(null)}
          onSelectProject={(project) => onSelectProject(project)}
          activeKpiFilter={activeKpiFilter}
        />
      </div>

      {/* ROW 5: PORTFOLIO FINANCIAL EXPOSURE */}
      <div>
        <PortfolioFinancialExposure />
      </div>

      {/* ROW 6: PORTFOLIO RISK OVERVIEW (ANALYTICS) */}
      <div>
        <PortfolioRiskOverview />
      </div>

      {/* ROW 7: QUICK ACTIONS DOCK */}
      <div>
        <QuickActionsDock
          onOpenUpload={onOpenUpload}
          onOpenBrief={onOpenBrief}
          onOpenAssist={onOpenAssist}
        />
      </div>
    </div>
  );
};
