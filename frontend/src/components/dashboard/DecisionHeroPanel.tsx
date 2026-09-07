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
    <div className="glass-card p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1220] tracking-tight uppercase">
          {t('dashboard.hero.title')}
        </h2>
        <p className="text-sm text-[#536174] leading-relaxed">
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
              className="group relative flex flex-col bg-white border border-[rgba(15,30,50,0.08)] rounded-xl p-6 hover:shadow-elevated hover-lift transition-all"
            >
              {/* Rank Number & Risk Badge */}
              <div className="flex items-start justify-between mb-5">
                <span className="text-5xl font-black text-[rgba(11,18,32,0.08)] tracking-tighter leading-none group-hover:text-[#1557D6]/15 transition-colors font-mono">
                  {rank.toString().padStart(2, '0')}
                </span>
                <span
                  className={cn(
                    'text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase border shadow-sm',
                    getRiskColor(severityRank)
                  )}
                >
                  {getRiskLabel(severityRank)}
                </span>
              </div>

              {/* Project Name */}
              <div className="flex flex-col gap-2 mb-5 flex-grow">
                <h3 className="text-base font-bold text-[#0B1220] line-clamp-2 leading-snug">
                  {project.name}
                </h3>
                
                {/* Health Bar */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-[#8B95A8] font-mono font-semibold">
                    {t('dashboard.hero.health')}:
                  </span>
                  <div className="flex-1 h-2 bg-[rgba(15,30,50,0.06)] rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        project.healthScore > 70
                          ? 'bg-[#16A34A]'
                          : project.healthScore > 40
                          ? 'bg-[#EA580C]'
                          : 'bg-[#DC2626]'
                      )}
                      style={{ width: `${project.healthScore}%` }}
                    />
                  </div>
                  <span className="text-xs font-black text-[#0B1220] font-mono">
                    {project.healthScore}/100
                  </span>
                </div>
              </div>

              {/* Risk Details */}
              <div className="mb-5 space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-[#8B95A8] uppercase tracking-[0.12em]">
                    {t('dashboard.hero.primaryRisk')}
                  </span>
                  <p className="text-sm text-[#0B1220] font-medium mt-1 line-clamp-2 leading-snug">
                    {project.primaryRiskDriver}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#8B95A8] uppercase tracking-[0.12em]">
                    {t('dashboard.hero.recommendedAction')}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    {severityRank === 'CRITICAL' ? (
                      <ShieldAlert className="w-4 h-4 text-[#DC2626]" />
                    ) : (
                      <Eye className="w-4 h-4 text-[#EA580C]" />
                    )}
                    <p className="text-sm text-[#0B1220] font-semibold">
                      {getReviewStatus(severityRank)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => navigate(`/projects/${project.id}`)}
                className="w-full flex items-center justify-center gap-2 bg-[#1557D6] hover:bg-[#0A1B33] text-white text-sm font-bold py-3 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-md hover-lift"
              >
                {t('dashboard.hero.investigateButton')} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
