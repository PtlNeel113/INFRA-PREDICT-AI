import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PaimanaPriorityProject } from '../../data/paimanaData';
import {
  AlertTriangle,
  Flame,
  ArrowUpRight,
  ShieldAlert,
  Building2,
  Calendar,
  CheckCircle2,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';

interface PriorityProjectsSectionProps {
  projects: PaimanaPriorityProject[];
  selectedStateName?: string | null;
  onClearStateFilter?: () => void;
  onProjectClick?: (projectId: string) => void;
}

export const PriorityProjectsSection: React.FC<PriorityProjectsSectionProps> = ({
  projects,
  selectedStateName,
  onClearStateFilter,
  onProjectClick,
}) => {
  const navigate = useNavigate();

  const handleOpenProject = (id: string) => {
    if (onProjectClick) {
      onProjectClick(id);
    } else {
      navigate(`/projects/${id}`);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-black text-[#0B1F3A] dark:text-white uppercase tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Critical & High Priority Projects for Executive Review</span>
            </h3>
            {selectedStateName && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#155EEF] border border-blue-200">
                Filtered: {selectedStateName}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Ranked by composite risk exposure, physical milestone slippage, and budget variance
          </p>
        </div>

        {selectedStateName && onClearStateFilter && (
          <button
            type="button"
            onClick={onClearStateFilter}
            className="text-xs font-bold text-[#155EEF] hover:underline cursor-pointer self-start sm:self-auto"
          >
            Show All India Projects
          </button>
        )}
      </div>

      {/* Projects Table / Cards */}
      {projects.length === 0 ? (
        <div className="py-12 text-center text-slate-500 dark:text-slate-400 text-sm">
          No projects found matching the active filter criteria.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">Project & Code</th>
                <th className="py-3 px-3">State & Sector</th>
                <th className="py-3 px-3">Risk Level</th>
                <th className="py-3 px-3">Key Risk Driver / Signal</th>
                <th className="py-3 px-3">Suggested Government Action</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {projects.slice(0, 8).map((project, idx) => (
                <tr
                  key={`${project.id}-${project.code || idx}`}
                  onClick={() => handleOpenProject(project.id)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                >
                  {/* Project Name & Code */}
                  <td className="py-3.5 px-3 min-w-[220px]">
                    <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#155EEF] dark:group-hover:text-blue-400 transition-colors">
                      {project.name}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                        {project.code}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        ₹{project.sanctionedCostCr.toLocaleString()} Cr
                      </span>
                    </div>
                  </td>

                  {/* State & Sector */}
                  <td className="py-3.5 px-3 min-w-[140px]">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {project.state}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {project.sector}
                    </div>
                  </td>

                  {/* Risk Level */}
                  <td className="py-3.5 px-3 min-w-[100px]">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        project.riskLevel === 'CRITICAL'
                          ? 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-900'
                          : project.riskLevel === 'HIGH'
                          ? 'bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-900'
                          : project.riskLevel === 'WATCH'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900'
                      }`}
                    >
                      {project.riskLevel === 'CRITICAL' && <Flame className="w-3 h-3" />}
                      <span>{project.riskLevel}</span>
                    </span>
                  </td>

                  {/* Key Signal */}
                  <td className="py-3.5 px-3 min-w-[240px] max-w-[300px]">
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed line-clamp-2">
                      {project.keySignal}
                    </p>
                    {project.costOverrunCr > 0 && (
                      <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold mt-0.5 block">
                        +₹{project.costOverrunCr} Cr overrun ({project.delayMonths} mo delay)
                      </span>
                    )}
                  </td>

                  {/* Suggested Action */}
                  <td className="py-3.5 px-3 min-w-[240px] max-w-[320px]">
                    <div className="bg-slate-50 dark:bg-slate-800/80 p-2 rounded-lg border border-slate-200/70 dark:border-slate-700/60">
                      <p className="text-[11px] font-medium text-slate-800 dark:text-slate-200 line-clamp-2">
                        {project.suggestedAction}
                      </p>
                    </div>
                  </td>

                  {/* Button */}
                  <td className="py-3.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenProject(project.id);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#155EEF] hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
                      title="View project detail"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
