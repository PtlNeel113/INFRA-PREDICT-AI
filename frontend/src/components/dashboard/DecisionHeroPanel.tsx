import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, ShieldAlert } from 'lucide-react';
import { AI_PRIORITY_QUEUE } from '../../data/mockData';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../contexts/LanguageContext';

export const DecisionHeroPanel: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const topProjects = AI_PRIORITY_QUEUE.slice(0, 3);

  const getRiskColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'text-[#DC2626] bg-[#FEF2F2] border-[#FCA5A5]';
      case 'HIGH':
        return 'text-[#EA580C] bg-[#FFF7ED] border-[#FDBA74]';
      case 'WATCH':
        return 'text-[#D97706] bg-[#FFFBEB] border-[#FCD34D]';
      default:
        return 'text-[#16A34A] bg-[#F0FDF4] border-[#86EFAC]';
    }
  };

  const getReviewStatus = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return t('dashboard.hero.actionCritical');
      case 'HIGH':
        return t('dashboard.hero.actionHigh');
      case 'WATCH':
        return t('dashboard.hero.actionWatch');
      default:
        return t('dashboard.hero.actionStable');
    }
  };
  
  const getRiskLabel = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return t('common.riskCritical');
      case 'HIGH':
        return t('common.riskHigh');
      case 'WATCH':
        return t('common.riskWatch');
      default:
        return t('common.riskStable');
    }
  };

  return (
    <div className="neo-panel p-6 sm:p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl sm:text-2xl font-black text-[var(--neo-text-primary)] tracking-tight uppercase">
          {t('dashboard.hero.title')}
        </h2>
        <p className="text-sm text-[var(--neo-text-secondary)] leading-relaxed">
          {t('dashboard.hero.description')}
        </p>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {topProjects.map((item, index) => {
          const { project, rank, severityRank } = item;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col neo-card p-5.5 hover:translate-y-[-2px] transition-all"
            >
              {/* Rank Number & Risk Badge */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl font-black text-slate-300 tracking-tighter leading-none group-hover:text-[#1557D6]/20 transition-colors font-mono">
                  {rank.toString().padStart(2, '0')}
                </span>
                <span
                  className={cn(
                    'text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase border shadow-2xs',
                    getRiskColor(severityRank)
                  )}
                >
                  {getRiskLabel(severityRank)}
                </span>
              </div>

              {/* Project Name */}
              <div className="flex flex-col gap-2 mb-4 flex-grow">
                <h3 className="text-sm font-bold text-[var(--neo-text-primary)] line-clamp-2 leading-snug">
                  {project.name}
                </h3>
                
                {/* Health Bar */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-[var(--neo-text-tertiary)] font-mono font-semibold">
                    {t('dashboard.hero.health')}:
                  </span>
                  <div className="flex-1 h-2 neo-inset-sm rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        project.healthScore > 70
                          ? 'bg-[#10B981]'
                          : project.healthScore > 40
                          ? 'bg-[#EA580C]'
                          : 'bg-[#DC2626]'
                      )}
                      style={{ width: `${project.healthScore}%` }}
                    />
                  </div>
                  <span className="text-xs font-black text-[var(--neo-text-primary)] font-mono">
                    {project.healthScore}/100
                  </span>
                </div>
              </div>

              {/* Risk Details */}
              <div className="mb-4 space-y-2.5 pt-3 border-t border-[rgba(200,212,226,0.4)]">
                <div>
                  <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-[0.12em]">
                    {t('dashboard.hero.primaryRisk')}
                  </span>
                  <p className="text-xs text-[var(--neo-text-primary)] font-medium mt-0.5 line-clamp-2 leading-snug">
                    {project.primaryRiskDriver}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-[0.12em]">
                    {t('dashboard.hero.recommendedAction')}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    {severityRank === 'CRITICAL' ? (
                      <ShieldAlert className="w-3.5 h-3.5 text-[#DC2626]" />
                    ) : (
                      <Eye className="w-3.5 h-3.5 text-[#EA580C]" />
                    )}
                    <p className="text-xs text-[var(--neo-text-primary)] font-semibold">
                      {getReviewStatus(severityRank)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => navigate(`/projects/${project.id}`)}
                className="w-full flex items-center justify-center gap-2 neo-button-primary text-white text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                <span>{t('dashboard.hero.investigateButton')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
