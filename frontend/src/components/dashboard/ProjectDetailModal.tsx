import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Building2,
  Calendar,
  AlertTriangle,
  Clock,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  SearchCode,
  FileSpreadsheet,
  ArrowUpRight,
  Send,
  Layers,
  MapPin,
} from 'lucide-react';
import { InfraProject } from '../../types/projects';
import { RiskBadge } from '../ui/RiskBadge';
import { HealthScoreBadge } from '../ui/HealthScoreBadge';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';

interface ProjectDetailModalProps {
  project: InfraProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const toast = useToast();

  if (!isOpen || !project) return null;

  const handleEscalateCabinet = () => {
    toast.success(
      'Escalation Dispatched',
      `Inter-Ministerial Cabinet note drafted for ${project.code}.`,
    );
    onClose();
  };

  const handleRunSimulation = () => {
    toast.info(
      'Monte-Carlo Simulation Started',
      `Simulating mitigation trajectories for ${project.code}.`,
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#060F1D]/70 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl bg-white rounded-[20px] border border-[#E2E8F0] gov-shadow p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="font-mono text-xs font-bold text-[#155EEF] bg-[#EBF2FF] px-2 py-0.5 rounded">
                {project.code}
              </span>
              <RiskBadge level={project.riskLevel} />
              <span className="text-slate-300">•</span>
              <span className="text-xs font-bold text-slate-700">{project.sector}</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-bold text-[#0E7490]">{project.state}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#0B1F3A] tracking-tight">
              {project.name}
            </h2>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Implementing Agency: <strong className="text-slate-700">{project.implementingAgency}</strong></span>
              <span>({project.ministry || 'Infrastructure'})</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core KPI Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Sanctioned Cost
            </span>
            <div className="text-base sm:text-lg font-black text-[#0B1F3A] font-mono mt-1">
              ₹{project.sanctionedCostCr.toLocaleString()} Cr
            </div>
            <span className="text-[10px] text-slate-500">Original Baseline</span>
          </div>

          <div className="p-3.5 rounded-xl bg-red-50/50 border border-red-100">
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
              Anticipated Overrun
            </span>
            <div className="text-base sm:text-lg font-black text-red-600 font-mono mt-1">
              +₹{project.predictedCostOverrunCr.toLocaleString()} Cr
            </div>
            <span className="text-[10px] text-red-500 font-medium">
              Revised: ₹{project.revisedCostCr.toLocaleString()} Cr
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Target Completion
            </span>
            <div className="text-sm sm:text-base font-bold text-[#0B1F3A] font-mono mt-1">
              {project.originalDeadline}
            </div>
            <span className="text-[10px] text-slate-500">DPR Milestone</span>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
              AI Forecast Date
            </span>
            <div className="text-sm sm:text-base font-black text-amber-700 font-mono mt-1">
              {project.predictedCompletionDate}
            </div>
            <span className="text-[10px] text-amber-600 font-bold font-mono">
              +{project.predictedDelayMonths} mo Delay
            </span>
          </div>
        </div>

        {/* Progress & Health Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
            <h4 className="text-xs font-black text-[#0B1F3A] uppercase tracking-wider flex items-center justify-between">
              <span>Physical vs Financial Velocity</span>
              <HealthScoreBadge score={project.healthScore} />
            </h4>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-600">Physical Progress</span>
                <span className="font-mono text-[#0B1F3A]">{project.currentPhysicalProgress}%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#155EEF] rounded-full"
                  style={{ width: `${project.currentPhysicalProgress}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-600">Financial Expenditure</span>
                <span className="font-mono text-[#0B1F3A]">{project.financialProgress}%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0E7490] rounded-full"
                  style={{ width: `${project.financialProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Root-Cause Attribution (SHAP) */}
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
            <h4 className="text-xs font-black text-[#0B1F3A] uppercase tracking-wider flex items-center gap-1.5">
              <SearchCode className="w-4 h-4 text-[#155EEF]" />
              <span>Explainable AI (SHAP Root-Cause)</span>
            </h4>
            <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-red-600 uppercase">Primary Driver</span>
              <p className="text-xs font-bold text-[#0B1F3A] leading-snug">
                {project.primaryRiskDriver}
              </p>
            </div>
            {project.secondaryRiskDriver && (
              <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-amber-600 uppercase">Secondary Factor</span>
                <p className="text-xs text-slate-700">{project.secondaryRiskDriver}</p>
              </div>
            )}
          </div>
        </div>

        {/* Key Milestones Schedule */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
            Critical Milestone Schedule
          </h4>
          <div className="space-y-2">
            {project.keyMilestones.map((m, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      m.status === 'COMPLETED'
                        ? 'bg-emerald-500'
                        : m.status === 'ON_TRACK'
                        ? 'bg-blue-500'
                        : m.status === 'DELAYED'
                        ? 'bg-amber-500'
                        : 'bg-red-500 animate-pulse'
                    }`}
                  />
                  <span className="font-bold text-[#0B1F3A]">{m.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-500 text-[11px]">{m.targetDate}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      m.status === 'COMPLETED'
                        ? 'bg-emerald-100 text-emerald-700'
                        : m.status === 'ON_TRACK'
                        ? 'bg-blue-100 text-blue-700'
                        : m.status === 'DELAYED'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRunSimulation}
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#155EEF]" />}
            >
              Simulate Mitigations
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleEscalateCabinet}
              leftIcon={<Send className="w-3.5 h-3.5" />}
            >
              Escalate to Cabinet
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            Close Dossier
          </Button>
        </div>
      </div>
    </div>
  );
};
