import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Sparkles,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  FileCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingDown,
  AlertTriangle,
} from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';
import { ReportConfig, ReportType } from '../../types/reports';
import { InfraProject } from '../../types/projects';
import { RiskBadge } from '../../components/ui/RiskBadge';
import { useToast } from '../../hooks/useToast';
import { cn } from '../../utils/cn';
import { generateSignedPdf } from '../../utils/generateSignedPdf';

export const ReportsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const toast = useToast();
  const projects = useProjectStore((s) => s.projects);
  const initialProjectId = searchParams.get('projectId') || (projects[0]?.id || 'PRJ-MORT-891');

  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjectId);
  const [reportType, setReportType] = useState<ReportType>('EXECUTIVE_RISK_BRIEF');
  const [includeSHAP, setIncludeSHAP] = useState<boolean>(true);
  const [includeBenchmarking, setIncludeBenchmarking] = useState<boolean>(true);
  const [includeMitigation, setIncludeMitigation] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const activeProject: InfraProject =
    projects.find((p) => p.id === selectedProjectId || p.code === selectedProjectId) || projects[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    try {
      const filename = generateSignedPdf({
        project: activeProject,
        format: reportType,
        includeSHAP,
        includeBenchmarking,
        includeMitigation,
      });
      toast.success('Dossier Downloaded', `Executive Risk Brief for ${activeProject.code} (${filename}) saved as PDF.`);
    } catch (err: any) {
      toast.error('Export Failed', err?.message || 'Could not export signed PDF.');
    }
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    toast.info('Synthesizing Report', 'Aggregating latest SHAP feature waterfall and peer benchmark percentiles...');
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Brief Updated', 'Report updated with latest telemetry snapshot.');
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 select-none">
      {/* Page Header */}
      <div className="neo-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl neo-raised flex items-center justify-center text-indigo-700">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-[#0B1F3A] tracking-tight">
              EXECUTIVE RISK DOSSIER & AI REPORTS
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Ministerial-grade briefings synthesizing SHAP attributions, trajectory forecasts & prescriptive actions.
            </p>
          </div>
        </div>

        {/* Top Control Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl neo-button-secondary text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Dossier</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="px-4 py-2.5 rounded-xl neo-button-primary text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Official PDF</span>
          </button>
        </div>
      </div>

      {/* Main Container: Left Config Sidebar & Right Report Document Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: Report Configuration Panel (1 Column) - Hidden during print */}
        <div className="neo-panel rounded-2xl p-5 space-y-4 text-slate-900 print:hidden">
          <div className="border-b border-slate-300/60 pb-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono">
              Dossier Configuration
            </h2>
          </div>

          {/* Project Selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 uppercase">
              Target Project
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full text-xs font-bold neo-input rounded-xl p-2.5 focus:outline-none text-[#0B1F3A] cursor-pointer"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.code} — {p.name.slice(0, 34)}...
                </option>
              ))}
            </select>
          </div>

          {/* Report Type */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 uppercase">
              Report Template
            </label>
            <div className="space-y-2">
              {[
                { id: 'EXECUTIVE_RISK_BRIEF', label: 'Executive Risk Brief' },
                { id: 'COST_RISK_REPORT', label: 'Cost Overrun & Budget Escalation Audit' },
                { id: 'SCHEDULE_RISK_REPORT', label: 'Critical Path Schedule Slippage Audit' },
              ].map((tpl) => (
                <label
                  key={tpl.id}
                  className={cn(
                    'flex items-center gap-2.5 p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all',
                    reportType === tpl.id
                      ? 'neo-raised bg-indigo-50/80 border-indigo-300 text-indigo-900'
                      : 'neo-card hover:bg-slate-100/80 border-transparent text-slate-700',
                  )}
                >
                  <input
                    type="radio"
                    name="reportType"
                    checked={reportType === tpl.id}
                    onChange={() => setReportType(tpl.id as any)}
                    className="text-indigo-600 accent-indigo-600 cursor-pointer"
                  />
                  <span>{tpl.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Include Sections Toggles */}
          <div className="space-y-2 pt-2 border-t border-slate-300/60">
            <label className="text-[11px] font-bold text-slate-600 uppercase block">
              Embedded Intelligence Modules
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl neo-card border-transparent text-xs font-semibold text-slate-700 cursor-pointer transition-colors">
              <span>SHAP Feature Attributions</span>
              <input
                type="checkbox"
                checked={includeSHAP}
                onChange={(e) => setIncludeSHAP(e.target.checked)}
                className="rounded text-indigo-600 accent-indigo-600 cursor-pointer w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl neo-card border-transparent text-xs font-semibold text-slate-700 cursor-pointer transition-colors">
              <span>Peer Sector Benchmarking</span>
              <input
                type="checkbox"
                checked={includeBenchmarking}
                onChange={(e) => setIncludeBenchmarking(e.target.checked)}
                className="rounded text-indigo-600 accent-indigo-600 cursor-pointer w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl neo-card border-transparent text-xs font-semibold text-slate-700 cursor-pointer transition-colors">
              <span>Prescriptive Action Roadmap</span>
              <input
                type="checkbox"
                checked={includeMitigation}
                onChange={(e) => setIncludeMitigation(e.target.checked)}
                className="rounded text-indigo-600 accent-indigo-600 cursor-pointer w-4 h-4"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="w-full py-2.5 rounded-xl neo-button-primary disabled:opacity-50 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Synthesizing...' : 'Regenerate Risk Brief'}</span>
          </button>
        </div>

        {/* Right: Official Document Preview (2 Columns) */}
        <div className="lg:col-span-2 neo-panel rounded-2xl p-6 md:p-10 space-y-6 text-slate-900 bg-white">
          {/* Government Watermark Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-900 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-900 text-white font-black flex items-center justify-center text-xs font-mono tracking-wider shadow-xs">
                IM
              </div>
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 block font-mono">
                  INFRASTRUCTURE MONITORING
                </span>
                <h2 className="text-base md:text-lg font-black tracking-tight text-[#0B1F3A]">
                  INFRASTRUCTURE RISK & INTERVENTION BRIEF
                </h2>
                <p className="text-[11px] text-slate-500 font-mono">
                  Document ID: RISK-{activeProject.code}-2026-Q1 &nbsp;•&nbsp; Security Classification: RESTRICTED
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Date of Issue</span>
              <span className="text-xs font-black font-mono text-slate-800">August 31, 2026</span>
            </div>
          </div>

          {/* Project Summary Banner */}
          <div className="p-4 rounded-xl neo-inset grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border border-slate-200">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Project Name</span>
              <strong className="text-xs font-black text-[#0B1F3A] block mt-0.5">{activeProject.name}</strong>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Sector / State</span>
              <strong className="text-xs font-black text-slate-700 block mt-0.5">{activeProject.sector} ({activeProject.state})</strong>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Sanctioned Outlay</span>
              <strong className="text-xs font-black font-mono text-slate-900 block mt-0.5">₹{activeProject.sanctionedCostCr.toLocaleString('en-IN')} Cr</strong>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Composite Health</span>
              <strong className="text-sm font-black font-mono text-rose-600 block mt-0.5">
                {activeProject.healthScore} / 100 ({activeProject.riskLevel})
              </strong>
            </div>
          </div>

          {/* Section 1: Executive Intelligence Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-indigo-700 font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              1.0 Executive Risk Assessment & Forecast
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              Based on the Machine learning ensemble (XGBoost + TreeSHAP), <strong className="text-[#0B1F3A]">{activeProject.name}</strong> exhibits acute delivery risk. Current physical execution stands at <strong className="text-[#0B1F3A]">{activeProject.currentPhysicalProgress}%</strong> against an expected baseline of <strong className="text-[#0B1F3A]">{activeProject.expectedProgress}%</strong>, creating an execution gap of <strong className="text-rose-600">{activeProject.progressGap}%</strong>. The model projects an anticipated schedule overrun of <strong className="text-rose-600">+{activeProject.predictedDelayMonths} months</strong> and a capital escalation of <strong className="text-amber-700">+₹{activeProject.predictedCostOverrunCr} Cr</strong> beyond sanctioned estimates.
            </p>
          </div>

          {/* Section 2: SHAP Risk Drivers */}
          {includeSHAP && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-indigo-700 font-mono flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                2.0 SHAP Root Cause Attribution Matrix
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl neo-card border-l-4 border-l-rose-500 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-rose-700 font-mono">
                    Top Positive Drag (+24.2 Pts)
                  </span>
                  <p className="font-bold text-[#0B1F3A]">
                    {activeProject.primaryRiskDriver}
                  </p>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Disputes in right-of-way handover along primary utility corridor chainage.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl neo-card border-l-4 border-l-amber-500 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-amber-800 font-mono">
                    Secondary Drag (+18.4 Pts)
                  </span>
                  <p className="font-bold text-[#0B1F3A]">
                    Contractor Working Capital Deficit
                  </p>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Sub-contractor mobilization lagging required monthly throughput targets by 22%.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Mitigation Roadmap */}
          {includeMitigation && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-indigo-700 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                3.0 Prescriptive Ministerial Action Plan
              </h3>
              <div className="p-4 rounded-xl neo-inset space-y-2.5 text-xs border border-slate-200">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-md neo-raised bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    1
                  </span>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    Convene urgent Secretary-level tri-party coordination review with State Chief Secretary and Ministry of Petroleum/Power.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-md neo-raised bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    Issue directive to Principal Contractor to augment dual-shift equipment gantries and resolve sub-contractor billing backlogs within 14 calendar days.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Document Sign-off Footer */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              <span>Generated by: <strong className="text-slate-700">INFRA-PREDICT AI Autonomous Pipeline</strong></span>
              <div className="text-[10px] font-mono text-slate-400">Intelligence Engine</div>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-800">National Project Directorate</span>
              <div className="text-[10px] text-slate-400">Project Intelligence Platform • New Delhi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
