import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  Clock,
  Coins,
  ChevronRight,
  FileSpreadsheet,
  Building2,
  MapPin,
  CheckCircle2,
  Filter,
  Zap,
  RotateCcw,
} from 'lucide-react';
import { MOCK_PROJECTS } from '../../data/projectsData';
import { InfraProject } from '../../types/projects';
import { RiskBadge } from '../ui/RiskBadge';
import { useToast } from '../../hooks/useToast';
import { cn } from '../../utils/cn';

interface DecisionModeViewProps {
  onExitDecisionMode: () => void;
}

interface RankedDecisionItem {
  project: InfraProject;
  rank: number;
  urgencyScore: number; // 0 - 100
  whyReason: string;
  whatNextDirective: string;
  impactOutlayCr: number;
  slippageMonths: number;
  deteriorationRate: string;
  nodalContact: string;
}

export const DecisionModeView: React.FC<DecisionModeViewProps> = ({ onExitDecisionMode }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [selectedSector, setSelectedSector] = useState<string>('ALL');

  // Compute composite urgency ranking:
  // Lower health score = higher urgency. Higher delay + higher cost overrun = higher urgency.
  const rankedItems: RankedDecisionItem[] = MOCK_PROJECTS.map((p, idx) => {
    const riskFactor = (100 - p.healthScore) * 0.4;
    const delayFactor = Math.min(30, (p.predictedDelayMonths / 24) * 30);
    const overrunFactor = Math.min(30, (p.predictedCostOverrunCr / 5000) * 30);
    const urgency = Math.min(99, Math.round(riskFactor + delayFactor + overrunFactor));

    // Custom deterministic WHY & WHAT NEXT rationale
    let why = p.primaryRiskDriver;
    let whatNext = 'Initiate Secretary-level inter-ministerial review & audit sub-contractor deployment.';
    let deterioration = '-12 pts in 30 days';
    let nodal = 'MoRTH Project Directorate / NHAI Region-1';

    if (p.code.includes('DME')) {
      why = 'Stalled GAIL Gas Pipeline shifting at Chainage km 314 & EPC sub-contractor labor shortfall.';
      whatNext = 'Convene immediate tri-party review with State Chief Secretary & GAIL for expedited RoW handover.';
      deterioration = '-16 pts in 30 days';
      nodal = 'NHAI Nodal Executive Director';
    } else if (p.code.includes('MAHSR')) {
      why = 'Pier girder launching bottleneck at Narmada Bridge & specialized steel delivery slippage.';
      whatNext = 'Clear conditional railway crossing windows prior to monsoon & mobilize backup crane gantries.';
      deterioration = '-9 pts in 30 days';
      nodal = 'NHSRCL Project General Manager';
    } else if (p.code.includes('METRO')) {
      why = 'Underground tunnel boring machine friction with hard rock strata & utility relocations.';
      whatNext = 'Deploy secondary dual-mode TBM cutter heads and approve revised utility relocation drawings.';
      deterioration = '-7 pts in 30 days';
      nodal = 'State Urban Transport Secretary';
    } else if (p.code.includes('DFC')) {
      why = 'Electrification substation commissioning delayed by regional grid interconnection permit.';
      whatNext = 'Issue priority clearance directive from Central Electricity Authority for grid synchronization.';
      deterioration = '-11 pts in 30 days';
      nodal = 'DFCCIL Director (Infra)';
    }

    return {
      project: p,
      rank: idx + 1,
      urgencyScore: urgency,
      whyReason: why,
      whatNextDirective: whatNext,
      impactOutlayCr: p.sanctionedCostCr,
      slippageMonths: p.predictedDelayMonths,
      deteriorationRate: deterioration,
      nodalContact: nodal,
    };
  }).sort((a, b) => b.urgencyScore - a.urgencyScore);

  const filteredItems = rankedItems.filter((item) => {
    if (selectedSector === 'ALL') return true;
    return item.project.sector === selectedSector;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto select-none pb-12">
      {/* DECISION MODE HERO BANNER */}
      <div className="neo-panel p-6 md:p-8 relative overflow-hidden text-[var(--neo-text-primary)] border border-rose-200/80">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-rose-600 text-white flex items-center gap-1.5 shadow-2xs">
                <ShieldAlert className="w-3.5 h-3.5" />
                ACTIVE DECISION MODE
              </span>
              <span className="text-xs font-mono text-rose-600 font-bold">
                Priority Action Engine
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[var(--neo-text-primary)]">
              WHERE SHOULD WE ACT FIRST?
            </h1>
            <p className="text-xs md:text-sm text-[var(--neo-text-secondary)] font-normal leading-relaxed">
              Real-time multi-dimensional prioritization ranking packages by{' '}
              <strong className="text-[var(--neo-text-primary)]">Health Score Vulnerability</strong>,{' '}
              <strong className="text-[var(--neo-text-primary)]">Rate of Deterioration</strong>, and{' '}
              <strong className="text-[var(--neo-text-primary)]">Capital Impact</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                toast.info('Prioritization Refreshed', 'Re-ranked packages against latest contractor updates.');
              }}
              className="px-4 py-2.5 rounded-xl neo-button-secondary text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
              <span>Re-rank Portfolio</span>
            </button>

            <button
              type="button"
              onClick={onExitDecisionMode}
              className="px-5 py-2.5 rounded-xl neo-button-primary text-white text-xs font-black transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Exit Decision Mode</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Sector Quick Filter Strip */}
        <div className="relative z-10 mt-6 pt-5 border-t border-[rgba(200,212,226,0.45)] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--neo-text-tertiary)] mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Sector Filter:
            </span>
            {['ALL', 'Roads & Highways', 'Railways', 'Urban Transport', 'Power'].map((sector) => (
              <button
                key={sector}
                type="button"
                onClick={() => setSelectedSector(sector)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer',
                  selectedSector === sector
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'neo-inset-sm text-[var(--neo-text-secondary)] hover:text-[var(--neo-text-primary)]',
                )}
              >
                {sector === 'ALL' ? 'All Sectors' : sector}
              </button>
            ))}
          </div>

          <div className="text-xs text-rose-600 font-mono font-bold">
            Showing Top {filteredItems.length} High-Urgency Packages
          </div>
        </div>
      </div>

      {/* RANKED ACTION CARDS LIST */}
      <div className="space-y-4">
        {filteredItems.map((item, index) => {
          const { project } = item;
          const isTopPriority = index === 0;

          return (
            <div
              key={project.id}
              className={cn(
                'rounded-2xl p-5 md:p-6 transition-all duration-200 border relative overflow-hidden group',
                'neo-card text-[var(--neo-text-primary)]',
                isTopPriority
                  ? 'border-rose-400/80 shadow-md ring-2 ring-rose-500/20'
                  : 'border-[rgba(200,212,226,0.5)]',
              )}
            >
              {/* Top Accent Bar for Priority 1 */}
              {isTopPriority && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-600 via-amber-500 to-indigo-600" />
              )}

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Left: Rank badge, Project Identification & Vital Stats */}
                <div className="space-y-3 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Rank Badge */}
                    <div
                      className={cn(
                        'w-7 h-7 rounded-lg flex items-center justify-center font-black font-mono text-xs shrink-0',
                        isTopPriority
                          ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700',
                      )}
                    >
                      #{index + 1}
                    </div>

                    <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">
                      {project.code}
                    </span>

                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" /> {project.sector}
                    </span>

                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {project.state}
                    </span>

                    <div className="ml-auto flex items-center gap-2">
                      <RiskBadge level={project.riskLevel} />
                    </div>
                  </div>

                  {/* Project Name */}
                  <h3 className="text-base md:text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    {project.name}
                  </h3>

                  {/* 2x2 Decision Matrix Grid: WHY & WHAT NEXT */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {/* WHY CARD */}
                    <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          WHY IT REQUIRES INTERVENTION
                        </span>
                        <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">
                          {item.deteriorationRate}
                        </span>
                      </div>
                      <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                        {item.whyReason}
                      </p>
                    </div>

                    {/* WHAT NEXT CARD */}
                    <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/50 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          WHAT NEXT (PRESCRIPTIVE DIRECTIVE)
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          {item.nodalContact}
                        </span>
                      </div>
                      <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                        {item.whatNextDirective}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Metrics Stack & Action Buttons */}
                <div className="lg:w-72 shrink-0 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 pt-4 lg:pt-0 lg:pl-6 space-y-4">
                  {/* KPI Summary */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 rounded-xl neo-inset-sm text-center">
                      <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase block">
                        Health Score
                      </span>
                      <strong
                        className={cn(
                          'text-xl font-black font-mono block mt-0.5',
                          project.healthScore < 50
                            ? 'text-rose-600'
                            : project.healthScore < 70
                            ? 'text-amber-600'
                            : 'text-emerald-600',
                        )}
                      >
                        {project.healthScore}
                        <span className="text-xs text-slate-400 font-normal">/100</span>
                      </strong>
                    </div>

                    <div className="p-2.5 rounded-xl neo-inset-sm text-center">
                      <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase block">
                        Predicted Delay
                      </span>
                      <strong className="text-xl font-black font-mono text-rose-600 block mt-0.5">
                        +{project.predictedDelayMonths}
                        <span className="text-xs text-slate-400 font-normal"> Mos</span>
                      </strong>
                    </div>

                    <div className="p-2.5 rounded-xl neo-inset-sm text-center">
                      <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase block">
                        Cost Outlay
                      </span>
                      <strong className="text-xs font-black font-mono text-[var(--neo-text-primary)] block mt-1">
                        ₹{project.sanctionedCostCr.toLocaleString('en-IN')} Cr
                      </strong>
                    </div>

                    <div className="p-2.5 rounded-xl neo-inset-sm text-center">
                      <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase block">
                        Overrun Exposure
                      </span>
                      <strong className="text-xs font-black font-mono text-rose-600 block mt-1">
                        +₹{project.predictedCostOverrunCr} Cr
                      </strong>
                    </div>
                  </div>

                  {/* Primary Direct CTAs */}
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/projects/${project.id}`)}
                      className="w-full py-2.5 px-4 rounded-xl neo-button-primary text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                    >
                      <span>Investigate Project Intelligence</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/reports?projectId=${project.id}`)}
                      className="w-full py-2 px-4 rounded-xl neo-button-secondary text-[var(--neo-text-primary)] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-[#1557D6]" />
                      <span>Generate Risk Brief</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
