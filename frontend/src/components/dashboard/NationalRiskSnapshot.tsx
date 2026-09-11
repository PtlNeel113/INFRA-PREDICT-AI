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
    <div className="neo-panel overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-[rgba(200,212,226,0.45)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl neo-inset-sm text-[#1557D6]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[var(--neo-text-primary)] tracking-tight">
                National Risk Snapshot
              </h3>
              <p className="text-xs text-[var(--neo-text-secondary)] mt-0.5">
                Portfolio-level distribution of infrastructure project risk.
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => navigate('/national-risk-map')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl neo-button-primary text-white text-xs font-bold transition-all cursor-pointer"
          >
            <span>Open National Risk Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-4">
        {/* Portfolio Health & Risk Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Portfolio Health */}
          <div className="p-4 rounded-xl neo-card">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--neo-text-tertiary)] mb-1">
              Portfolio Health
            </div>
            <div className="text-2xl font-black text-[var(--neo-text-primary)] font-mono">
              {summary.portfolioHealth}
            </div>
            <div className="text-xs text-[#1557D6] font-semibold mt-1">
              / 100
            </div>
          </div>

          {/* Critical Projects */}
          <div className="p-4 rounded-xl neo-card">
            <div className="flex items-center gap-1.5 mb-1">
              <Flame className="w-3 h-3 text-[#DC2626]" />
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#DC2626]">
                Critical
              </div>
            </div>
            <div className="text-2xl font-black text-[#DC2626] font-mono">
              {summary.critical}
            </div>
            <div className="text-xs text-[var(--neo-text-tertiary)] font-semibold mt-1">
              Projects
            </div>
          </div>

          {/* High Risk Projects */}
          <div className="p-4 rounded-xl neo-card">
            <div className="flex items-center gap-1.5 mb-1">
              <AlertOctagon className="w-3 h-3 text-[#EA580C]" />
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C]">
                High
              </div>
            </div>
            <div className="text-2xl font-black text-[#EA580C] font-mono">
              {summary.high}
            </div>
            <div className="text-xs text-[var(--neo-text-tertiary)] font-semibold mt-1">
              Projects
            </div>
          </div>

          {/* Watch Projects */}
          <div className="p-4 rounded-xl neo-card">
            <div className="flex items-center gap-1.5 mb-1">
              <Eye className="w-3 h-3 text-[#D97706]" />
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#D97706]">
                Watch
              </div>
            </div>
            <div className="text-2xl font-black text-[#D97706] font-mono">
              {summary.watch}
            </div>
            <div className="text-xs text-[var(--neo-text-tertiary)] font-semibold mt-1">
              Projects
            </div>
          </div>
        </div>

        {/* Risk Trend */}
        <div className="p-4 rounded-xl neo-inset-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#1557D6]" />
              <span className="text-xs font-bold text-[var(--neo-text-primary)]">
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
        <div className="pt-2">
          <button
            type="button"
            onClick={() => navigate('/national-risk-map')}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl neo-button-primary text-white text-sm font-bold transition-all cursor-pointer group"
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
