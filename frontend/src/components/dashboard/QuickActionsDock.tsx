import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  FileSpreadsheet,
  AlertTriangle,
  Bot,
  Sparkles,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { roleHasPermission } from '../../config/roles';

interface QuickActionsDockProps {
  onOpenUpload: () => void;
  onOpenBrief: () => void;
  onOpenAssist: () => void;
}

export const QuickActionsDock: React.FC<QuickActionsDockProps> = ({
  onOpenUpload,
  onOpenBrief,
  onOpenAssist,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const canIngest = roleHasPermission(user?.role || 'Senior Decision Maker', 'ingest:data');

  const actions = [
    canIngest
      ? {
          title: 'Upload Project Data',
          desc: 'Ingest DPR files, monthly progress reports, and contractor spreadsheets.',
          icon: Upload,
          badge: 'CSV / Excel / GeoJSON',
          onClick: onOpenUpload,
        }
      : {
          title: 'National Risk Map',
          desc: 'Explore geospatial infrastructure risk exposure across Indian states.',
          icon: MapPin,
          badge: 'All India Map',
          onClick: () => navigate('/national-risk-map'),
        },
    {
      title: 'Generate Risk Brief',
      desc: 'Synthesize high-level Cabinet notes with explainable risk drivers.',
      icon: FileSpreadsheet,
      badge: 'Cabinet Ready PDF',
      onClick: onOpenBrief,
    },
    {
      title: 'Open Early Warnings',
      desc: 'Inspect active milestone slippages with forward risk outlook.',
      icon: AlertTriangle,
      badge: '42 High Critical',
      onClick: () => navigate('/alerts'),
    },
    {
      title: 'Ask Infra-Assist',
      desc: 'Query project delay factors and simulate intervention scenarios.',
      icon: Bot,
      badge: 'Assistant Copilot',
      onClick: onOpenAssist,
    },
  ];

  return (
    <div className="neo-panel p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[rgba(200,212,226,0.45)]">
        <div>
          <h3 className="text-base sm:text-lg font-black text-[var(--neo-text-primary)] tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#1557D6]" />
            <span>Executive Command Center • Quick Actions</span>
          </h3>
          <p className="text-xs text-[var(--neo-text-secondary)] mt-0.5">
            Immediate decision-support workflows for monitoring officers and senior policymakers.
          </p>
        </div>
      </div>

      {/* Grid of Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <div
              key={i}
              onClick={action.onClick}
              className="p-4 rounded-xl neo-card hover:translate-y-[-2px] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl neo-inset-sm text-[#1557D6] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-md neo-inset-sm text-[var(--neo-text-secondary)] uppercase tracking-wider">
                    {action.badge}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[var(--neo-text-primary)] group-hover:text-[#1557D6] transition-colors">
                  {action.title}
                </h4>
                <p className="text-xs text-[var(--neo-text-secondary)] mt-1 line-clamp-2 leading-relaxed">
                  {action.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[rgba(200,212,226,0.4)] flex items-center justify-between text-xs font-bold text-[#1557D6]">
                <span>Launch Workflow</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
