import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  MapPin,
  TrendingUp,
  AlertTriangle,
  Eye,
  ArrowRight,
  Flame,
  AlertOctagon,
  CheckCircle2,
  Activity,
} from 'lucide-react';
import { RISK_INTELLIGENCE_SUMMARY, PROJECT_GEO_DATA } from '../../data/mapData';

export const NationalRiskSnapshot: React.FC = () => {
  const navigate = useNavigate();
  const summary = RISK_INTELLIGENCE_SUMMARY;
  
  // Get top 5 priority projects
  const topPriorityProjects = PROJECT_GEO_DATA
    .filter(p => p.riskLevel === 'CRITICAL' || p.riskLevel === 'HIGH')
    .sort((a, b) => {
      // Sort by health score (lower is worse) then by risk trend (higher is worse)
      if (a.healthScore !== b.healthScore) return a.healthScore - b.healthScore;
      return b.riskTrend - a.riskTrend;
    })
    .slice(0, 5);
  
  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return <Flame className="w-4 h-4 text-red-600" />;
      case 'HIGH':
        return <AlertOctagon className="w-4 h-4 text-orange-600" />;
      case 'WATCH':
        return <Eye className="w-4 h-4 text-amber-600" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    }
  };
  
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'HIGH':
        return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'WATCH':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      default:
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    }
  };

  return (
    <div className="bg-white dark:bg-[#0F1D2E] rounded-[18px] border border-[#E2E8F0] dark:border-slate-800 gov-shadow overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#EBF2FF] dark:bg-indigo-950">
              <MapPin className="w-5 h-5 text-[#155EEF] dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#0B1F3A] dark:text-white tracking-tight">
                National Risk Snapshot
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Portfolio-level distribution of infrastructure project risk.
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => navigate('/national-risk-map')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#155EEF] hover:bg-[#1048B5] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <span>Open National Risk Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Portfolio Health & Risk Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Portfolio Health */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40 border border-indigo-100 dark:border-indigo-900">
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              Portfolio Health
            </div>
            <div className="text-2xl font-black text-[#0B1F3A] dark:text-white font-mono">
              {summary.portfolioHealth}
            </div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
              / 100
            </div>
          </div>

          {/* Critical Projects */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/40 dark:to-rose-950/40 border border-red-100 dark:border-red-900">
            <div className="flex items-center gap-1.5 mb-1">
              <Flame className="w-3 h-3 text-red-600 dark:text-red-400" />
              <div className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                Critical
              </div>
            </div>
            <div className="text-2xl font-black text-[#0B1F3A] dark:text-white font-mono">
              {summary.critical}
            </div>
            <div className="text-xs text-red-600 dark:text-red-400 font-semibold mt-1">
              Projects
            </div>
          </div>

          {/* High Risk Projects */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/40 dark:to-amber-950/40 border border-orange-100 dark:border-orange-900">
            <div className="flex items-center gap-1.5 mb-1">
              <AlertOctagon className="w-3 h-3 text-orange-600 dark:text-orange-400" />
              <div className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                High
              </div>
            </div>
            <div className="text-2xl font-black text-[#0B1F3A] dark:text-white font-mono">
              {summary.high}
            </div>
            <div className="text-xs text-orange-600 dark:text-orange-400 font-semibold mt-1">
              Projects
            </div>
          </div>

          {/* Watch Projects */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40 border border-amber-100 dark:border-amber-900">
            <div className="flex items-center gap-1.5 mb-1">
              <Eye className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Watch
              </div>
            </div>
            <div className="text-2xl font-black text-[#0B1F3A] dark:text-white font-mono">
              {summary.watch}
            </div>
            <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">
              Projects
            </div>
          </div>
        </div>

        {/* Risk Trend */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#155EEF] dark:text-indigo-400" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Overall Risk Trend
              </span>
            </div>
            <div className={`flex items-center gap-1.5 ${summary.riskTrend > 0 ? 'text-red-600' : summary.riskTrend < 0 ? 'text-emerald-600' : 'text-slate-600'}`}>
              <TrendingUp className={`w-4 h-4 ${summary.riskTrend < 0 ? 'rotate-180' : ''}`} />
              <span className="text-lg font-black font-mono">
                {summary.riskTrend > 0 ? '+' : ''}{summary.riskTrend}%
              </span>
            </div>
          </div>
        </div>



        {/* Footer CTA */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => navigate('/national-risk-map')}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#155EEF] to-[#0E7490] hover:from-[#1048B5] hover:to-[#0C5F75] text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all cursor-pointer group"
          >
            <MapPin className="w-4 h-4" />
            <span>Explore Full Geographic Intelligence</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
