import React from 'react';
import {
  Sparkles,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { AI_PRIORITY_QUEUE } from '../../data/mockData';
import { InfraProject } from '../../types/projects';
import { useToast } from '../../hooks/useToast';

interface AiPriorityQueueProps {
  onSelectProject: (project: InfraProject) => void;
  onViewAllPriority: () => void;
}

export const AiPriorityQueue: React.FC<AiPriorityQueueProps> = ({
  onSelectProject,
  onViewAllPriority,
}) => {
  const toast = useToast();

  const getRankBadgeClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-[#DC2626] text-white shadow-xs';
      case 2:
        return 'bg-[#EA580C] text-white shadow-xs';
      case 3:
        return 'bg-[#D97706] text-white shadow-xs';
      default:
        return 'bg-slate-700 text-white';
    }
  };

  const getSeverityBadgeClass = (severity: 'CRITICAL' | 'HIGH' | 'WATCH') => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'HIGH':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'WATCH':
        return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="bg-white rounded-[18px] border border-[#E2E8F0] gov-shadow p-5 sm:p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-pulse" />
            <h3 className="text-base sm:text-lg font-black text-[#0B1F3A] tracking-tight">
              AI Priority Queue
            </h3>
            <span className="text-[10px] font-bold bg-red-50 text-[#DC2626] px-2 py-0.5 rounded uppercase">
              Top 5 Critical
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Algorithmic ranking: <span className="font-mono font-semibold text-slate-700">Risk × Severity × Deterioration × Impact</span>
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAllPriority}
          className="text-xs font-bold text-[#155EEF] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View all priority projects</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Ranked Project List */}
      <div className="py-4 space-y-3">
        {AI_PRIORITY_QUEUE.map((item) => {
          const { project, rank, severityRank, compositeScore, urgencyReason } = item;

          return (
            <div
              key={project.id}
              onClick={() => {
                onSelectProject(project);
                toast.info(`Priority #${rank}`, project.name);
              }}
              className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#155EEF]/50 hover:bg-white hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* Priority Rank Circle */}
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-black font-mono text-xs shrink-0 mt-0.5 ${getRankBadgeClass(
                      rank,
                    )}`}
                  >
                    #{rank}
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[#155EEF] bg-[#EBF2FF] px-1.5 py-0.2 rounded">
                        {project.code}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0B1F3A] group-hover:text-[#155EEF] transition-colors truncate max-w-sm">
                        {project.name}
                      </h4>
                      <span
                        className={`text-[9px] font-black px-1.5 py-0.2 rounded uppercase border ${getSeverityBadgeClass(
                          severityRank,
                        )}`}
                      >
                        {severityRank}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 mt-1">
                      <span>{project.sector}</span>
                      <span>•</span>
                      <span>{project.state}</span>
                      <span>•</span>
                      <span className="text-[#DC2626] font-bold">
                        +{project.predictedDelayMonths} mo Delay
                      </span>
                      <span>•</span>
                      <span className="text-amber-700 font-bold">
                        +₹{project.predictedCostOverrunCr} Cr Overrun
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 mt-1.5 line-clamp-1 leading-snug">
                      <strong className="text-slate-700">Urgency: </strong>
                      {urgencyReason}
                    </p>
                  </div>
                </div>

                {/* Composite Score Pill */}
                <div className="text-right shrink-0">
                  <div className="text-xs font-mono font-black text-[#0B1F3A]">
                    {compositeScore}
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Priority Score
                  </span>
                  <div className="mt-1 flex items-center justify-end">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#155EEF] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Escalation Action */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Auto-generated priority ranking</span>
        <button
          type="button"
          onClick={onViewAllPriority}
          className="font-bold text-[#155EEF] hover:underline cursor-pointer"
        >
          View All Priority Projects →
        </button>
      </div>
    </div>
  );
};
