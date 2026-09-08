import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  FileSpreadsheet,
  AlertTriangle,
  Bot,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

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

  const actions = [
    {
      title: 'Upload Project Data',
      desc: 'Ingest DPR files, monthly progress reports, and contractor spreadsheets.',
      icon: Upload,
      color: 'bg-blue-500',
      badge: 'CSV / Excel / GeoJSON',
      onClick: onOpenUpload,
    },
    {
      title: 'Generate Risk Brief',
      desc: 'Auto-synthesize high-level Cabinet notes with AI risk attribution.',
      icon: FileSpreadsheet,
      color: 'bg-[#0E7490]',
      badge: 'Cabinet Ready PDF',
      onClick: onOpenBrief,
    },
    {
      title: 'Open Early Warnings',
      desc: 'Inspect 318 active milestone slippages with 90-day predictive lookahead.',
      icon: AlertTriangle,
      color: 'bg-[#DC2626]',
      badge: '42 High Critical',
      onClick: () => navigate('/alerts'),
    },
    {
      title: 'Ask Infra-Assist',
      desc: 'Query project delay factors, simulate RoW clearance interventions via AI.',
      icon: Bot,
      color: 'bg-[#155EEF]',
      badge: 'AI Assistant',
      onClick: onOpenAssist,
    },
  ];

  return (
    <div className="bg-white rounded-[18px] border border-[#E2E8F0] gov-shadow p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-black text-[#0B1F3A] tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#155EEF]" />
            <span>Executive Command Center • Quick Actions</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
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
              className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#155EEF]/50 hover:bg-white hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl ${action.color} text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-200/70 text-slate-700 uppercase tracking-wider">
                    {action.badge}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#0B1F3A] group-hover:text-[#155EEF] transition-colors">
                  {action.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {action.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#155EEF]">
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
