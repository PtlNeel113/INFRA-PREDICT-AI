import React, { useState } from 'react';
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
import { useToast } from '../../hooks/useToast';
import { useDemoStore } from '../../store/demoStore';
import {
  EXECUTIVE_KPI_CARDS,
  MOCK_INFRA_PROJECTS,
} from '../../data/mockData';
import { InfraProject } from '../../types/projects';
import { DecisionHeroPanel } from '../../components/dashboard/DecisionHeroPanel';
import { NationalRiskSnapshot } from '../../components/dashboard/NationalRiskSnapshot';
import { PortfolioRiskOverview } from '../../components/dashboard/PortfolioRiskOverview';
import { PortfolioFinancialExposure } from '../../components/dashboard/PortfolioFinancialExposure';
import { ProjectsAttentionTable } from '../../components/dashboard/ProjectsAttentionTable';
import { RiskTrajectoryChart } from '../../components/dashboard/RiskTrajectoryChart';
import { WhatChangedFeed } from '../../components/dashboard/WhatChangedFeed';
import { AiPriorityInsight } from '../../components/dashboard/AiPriorityInsight';
import { QuickActionsDock } from '../../components/dashboard/QuickActionsDock';
import { ProjectDetailModal } from '../../components/dashboard/ProjectDetailModal';
import { UploadDataModal } from '../../components/dashboard/UploadDataModal';
import { GenerateBriefModal } from '../../components/dashboard/GenerateBriefModal';
import { InfraAssistModal } from '../../components/dashboard/InfraAssistModal';
import { DecisionModeView } from '../../components/dashboard/DecisionModeView';

export const DashboardPage: React.FC = () => {

  const toast = useToast();
  const { isDecisionMode, setDecisionMode } = useDemoStore();

  // State Management
  const [selectedStateFilter, setSelectedStateFilter] = useState<string | null>(null);
  const [activeKpiFilter, setActiveKpiFilter] = useState<string>('ALL');
  const [selectedProjectForDossier, setSelectedProjectForDossier] = useState<InfraProject | null>(null);

  // Modals state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [briefModalOpen, setBriefModalOpen] = useState(false);
  const [assistModalOpen, setAssistModalOpen] = useState(false);

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

  // If in Decision Mode, render the signature Decision Mode view
  if (isDecisionMode) {
    return <DecisionModeView onExitDecisionMode={() => setDecisionMode(false)} />;
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto select-none">
      {/* EXECUTIVE COMMAND CENTER HERO */}
      <div className="bg-white dark:bg-[#0F1D2E] rounded-[18px] p-6 sm:p-7 border border-[#E2E8F0] dark:border-slate-800 gov-shadow flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden text-slate-900 dark:text-slate-100">
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
              Demo Environment
            </span>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Prototype Dataset</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-[32px] font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Executive Command Center
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg">
            Portfolio-wide predictive intelligence for infrastructure decision-making.
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
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white text-xs font-black shadow-lg shadow-rose-500/25 transition-all cursor-pointer hover:scale-105 active:scale-95 decision-pulse"
          >
            <ShieldAlert className="w-4 h-4 text-white" />
            <span>ENTER DECISION MODE</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* SECONDARY CTA: GENERATE RISK BRIEF */}
          <button
            type="button"
            onClick={() => setBriefModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#155EEF] hover:bg-[#1048B5] text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>GENERATE RISK BRIEF</span>
          </button>
        </div>
      </div>

      {/* PRIMARY 4 KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {EXECUTIVE_KPI_CARDS.map((card, idx) => {
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
              className={`p-4 rounded-[18px] border transition-all cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-blue-50/70 dark:bg-indigo-950/60 border-[#155EEF] ring-2 ring-[#155EEF]/20 shadow-md'
                  : 'bg-white dark:bg-[#0F1D2E] border-[#E2E8F0] dark:border-slate-800 gov-shadow hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider line-clamp-1">
                    {card.title}
                  </span>
                  <div className="p-1.5 rounded-lg bg-[#F8FAFC] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:scale-105 transition-transform">
                    {getKpiIcon(card.id)}
                  </div>
                </div>

                <div className="text-xl sm:text-2xl font-black text-[#0B1F3A] dark:text-white font-mono tracking-tight">
                  {card.value}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-0.5">
                <span
                  className={`text-[11px] font-bold ${
                    card.risk
                      ? 'text-[#DC2626] dark:text-rose-400'
                      : card.warning
                      ? 'text-[#D97706] dark:text-amber-400'
                      : card.success
                      ? 'text-[#15803D] dark:text-emerald-400'
                      : 'text-[#155EEF] dark:text-indigo-400'
                  }`}
                >
                  {card.trend}
                </span>
                <span className="text-[10px] text-slate-400 line-clamp-1 leading-tight">
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
              const matched = MOCK_INFRA_PROJECTS.find((p) => p.code === code);
              if (matched) setSelectedProjectForDossier(matched);
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
          projects={MOCK_INFRA_PROJECTS}
          selectedStateFilter={selectedStateFilter}
          onClearStateFilter={() => setSelectedStateFilter(null)}
          onSelectProject={(project) => setSelectedProjectForDossier(project)}
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
          onOpenUpload={() => setUploadModalOpen(true)}
          onOpenBrief={() => setBriefModalOpen(true)}
          onOpenAssist={() => setAssistModalOpen(true)}
        />
      </div>

      {/* MODALS & DIALOGS */}
      <ProjectDetailModal
        project={selectedProjectForDossier}
        isOpen={!!selectedProjectForDossier}
        onClose={() => setSelectedProjectForDossier(null)}
      />

      <UploadDataModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />

      <GenerateBriefModal
        isOpen={briefModalOpen}
        onClose={() => setBriefModalOpen(false)}
        project={selectedProjectForDossier}
      />

      <InfraAssistModal
        isOpen={assistModalOpen}
        onClose={() => setAssistModalOpen(false)}
      />
    </div>
  );
};
