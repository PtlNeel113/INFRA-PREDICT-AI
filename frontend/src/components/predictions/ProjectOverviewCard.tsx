import React from 'react';
import {
  Building2,
  ExternalLink,
  MapPin,
  Tag,
  ShieldCheck,
  Calendar,
  IndianRupee,
  Layers,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InfraProject } from '../../types/projects';

interface ProjectOverviewCardProps {
  selectedProject: InfraProject;
  projects: InfraProject[];
  onSelectProject: (projectId: string) => void;
}

export const ProjectOverviewCard: React.FC<ProjectOverviewCardProps> = ({
  selectedProject,
  projects,
  onSelectProject,
}) => {
  const navigate = useNavigate();

  const originalCost = selectedProject.sanctionedCostCr || 0;
  const revisedCost = selectedProject.revisedCostCr || originalCost;
  const expenditure = selectedProject.expenditureCr || 0;
  const physicalProgress = selectedProject.currentPhysicalProgress ?? 0;
  const originalDoC = selectedProject.originalDeadline || 'TBD';
  const revisedDoC = selectedProject.predictedCompletionDate || 'TBD';
  const implementingAgency = selectedProject.implementingAgency || 'Nodal Agency';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4" id="project-overview-card">
      {/* Top Row: Project Selector + Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              {selectedProject.code}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium border border-blue-100 flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {selectedProject.sector}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium border border-emerald-100 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {selectedProject.state}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200">
              {selectedProject.stage || 'Under Construction'}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-1">
            {selectedProject.name}
          </h2>
        </div>

        {/* Project Selector Control */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <Building2 className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">Project:</span>
            <select
              id="project-overview-select"
              value={selectedProject.id}
              onChange={(e) => onSelectProject(e.target.value)}
              aria-label="Select Infrastructure Project"
              className="px-2.5 py-1 text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs max-w-[240px] sm:max-w-xs truncate cursor-pointer"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.code} - {p.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/projects/${selectedProject.id}`)}
            className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200/70 shadow-2xs cursor-pointer"
          >
            <span>Dossier</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Primary Project Baseline Matrix: Required 11 Parameters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        {/* 1. Original Cost */}
        <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Original Cost
          </span>
          <div className="text-sm font-bold text-slate-900 font-mono">
            ₹{originalCost.toLocaleString()} Cr
          </div>
          <span className="text-[10px] text-slate-400 block">Sanctioned Outlay</span>
        </div>

        {/* 2. Revised Cost */}
        <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Revised Cost
          </span>
          <div className="text-sm font-bold text-slate-900 font-mono">
            ₹{revisedCost.toLocaleString()} Cr
          </div>
          <span className={`text-[10px] font-mono block ${revisedCost > originalCost ? 'text-rose-600 font-semibold' : 'text-emerald-600'}`}>
            {revisedCost > originalCost ? `+₹${(revisedCost - originalCost).toFixed(2)} Cr` : 'Within Budget'}
          </span>
        </div>

        {/* 3. Cumulative Expenditure */}
        <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Expenditure
          </span>
          <div className="text-sm font-bold text-indigo-700 font-mono">
            ₹{expenditure.toLocaleString()} Cr
          </div>
          <span className="text-[10px] font-mono text-slate-500 block">
            {revisedCost > 0 ? ((expenditure / revisedCost) * 100).toFixed(1) : 0}% of Revised
          </span>
        </div>

        {/* 4. Physical Progress */}
        <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Physical Progress
          </span>
          <div className="text-sm font-bold text-emerald-700 font-mono">
            {physicalProgress}%
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1 mt-1 overflow-hidden">
            <div
              className="bg-emerald-600 h-1 rounded-full"
              style={{ width: `${Math.min(100, physicalProgress)}%` }}
            />
          </div>
        </div>

        {/* 5. Original & Revised DoC */}
        <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Target Timeline
          </span>
          <div className="text-xs font-bold text-slate-800 font-mono flex items-center justify-between">
            <span className="text-slate-500 font-normal text-[10px]">Orig:</span>
            <span>{originalDoC}</span>
          </div>
          <div className="text-xs font-bold text-amber-800 font-mono flex items-center justify-between">
            <span className="text-slate-500 font-normal text-[10px]">Rev:</span>
            <span>{revisedDoC}</span>
          </div>
        </div>

        {/* 6. Implementing Agency */}
        <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Implementing Agency
          </span>
          <div className="text-xs font-bold text-slate-800 truncate" title={implementingAgency}>
            {implementingAgency}
          </div>
          <span className="text-[10px] text-slate-400 block">
            ID: {selectedProject.id}
          </span>
        </div>
      </div>
    </div>
  );
};
