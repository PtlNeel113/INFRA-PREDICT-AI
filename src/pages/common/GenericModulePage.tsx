import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Sparkles,
  Layers,
  BarChart3,
  Bot,
  Scale,
  SearchCode,
  FileSpreadsheet,
  AlertTriangle,
  FolderGit2,
  Settings,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useToast } from '../../hooks/useToast';

interface ModuleConfig {
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  highlights: string[];
}

const MODULE_DATA: Record<string, ModuleConfig> = {
  '/projects': {
    title: 'Projects & Mega Portfolios',
    subtitle: 'National infrastructure repository with multi-tier sector filtering and progress metrics.',
    category: 'Portfolio Management',
    badge: 'Monitored Assets',
    icon: FolderGit2,
    highlights: [
      'Comprehensive geo-spatial and state-level allocation index',
      'Real-time physical vs financial expenditure variance mapping',
      'Implementing agency performance scoring and milestone adherence',
    ],
  },
  '/alerts': {
    title: 'Early Warnings & Delay Forecasts',
    subtitle: 'Multi-criteria critical delay escalation engine with 90-day predictive lookahead.',
    category: 'Predictive Warnings',
    badge: '318 Active Flags',
    icon: AlertTriangle,
    highlights: [
      'Automated milestone slippage alerts based on leading indicators',
      'Right-of-Way (RoW) and environmental clearance blockage predictors',
      'Actionable ministerial escalation workflows with audit trails',
    ],
  },
  '/predictions': {
    title: 'Cost & Delay Forecasts',
    subtitle: 'Machine learning regression & survival models for completion dates and budget exposure.',
    category: 'AI Forecasting',
    badge: 'AI Engine',
    icon: Sparkles,
    highlights: [
      'Confidence intervals (P10, P50, P90) on project commissioning dates',
      'Material cost inflation and macroeconomic shock sensitivity simulations',
      'Contractor historical delivery velocity modeling',
    ],
  },
  '/explainability': {
    title: 'Root-Cause & SHAP Attribution',
    subtitle: 'Transparent AI explainability visualizing why each project is delayed or over-budget.',
    category: 'Model Transparency',
    badge: 'TreeSHAP & Integrated Gradients',
    icon: SearchCode,
    highlights: [
      'Waterfall attribution of top negative and positive contributing factors',
      'Land acquisition vs utility shifting vs contractor liquidity breakdown',
      'Audit-ready explainability reports for parliamentary committees',
    ],
  },
  '/benchmarking': {
    title: 'Peer & Cost Benchmarking',
    subtitle: 'Standardized unit-cost and timeline comparisons across comparable historical projects.',
    category: 'Comparative Analytics',
    badge: '15 Years Historical Baseline',
    icon: Scale,
    highlights: [
      'Cost-per-kilometer benchmarks adjusted for terrain and inflation indices',
      'Inter-state clearance velocity comparisons for peer learning',
      'Top-performing agency operational efficiency ranking',
    ],
  },
  '/assistant': {
    title: 'AI Copilot',
    subtitle: 'Conversational infrastructure intelligence assistant for instant queries and executive briefings.',
    category: 'Decision Copilot',
    badge: 'Infrastructure LLM v3',
    icon: Bot,
    highlights: [
      'Instant answers to complex cross-sectoral delay inquiries',
      'Automated drafting of official review meeting minutes and agendas',
      'Prescriptive recommendation generation tailored to project constraints',
    ],
  },
  '/analytics': {
    title: 'Macro Analytics & Trends',
    subtitle: 'Macroeconomic infrastructure outlay trends, capital absorption, and state-wise performance.',
    category: 'Executive Insights',
    badge: 'Quarterly Macro Series',
    icon: BarChart3,
    highlights: [
      'National Gati Shakti multi-modal integration metrics',
      'Quarterly capital expenditure velocity versus budget targets',
      'Longitudinal bottleneck resolution timelines across sectors',
    ],
  },
  '/reports': {
    title: 'Executive Dossiers & Reports',
    subtitle: 'Standardized cabinet notes, quarterly review dossiers, and compliance summaries.',
    category: 'Governance & Reporting',
    badge: 'Cabinet Ready',
    icon: FileSpreadsheet,
    highlights: [
      'One-click PDF/Excel export for high-level inter-ministerial meetings',
      'Automated executive summaries generated with AI synthesis',
      'Customizable report templates for monitoring officers and auditors',
    ],
  },
  '/settings': {
    title: 'System & Security Settings',
    subtitle: 'Role permissions, notification thresholds, and security compliance configuration.',
    category: 'Administration',
    badge: 'Zero Trust RBAC',
    icon: Settings,
    highlights: [
      'Granular role-based access control (RBAC) management',
      'Customizable risk threshold parameters for automated alarms',
      'Security audit logging and session management',
    ],
  },
};

export const GenericModulePage: React.FC = () => {
  const location = useLocation();
  const toast = useToast();

  const moduleInfo = MODULE_DATA[location.pathname] || {
    title: 'Infrastructure Module',
    subtitle: 'Predictive Intelligence System',
    category: 'Decision Support',
    badge: 'Active Module',
    icon: Layers,
    highlights: [
      'Interactive analytical views and real-time data feeds',
      'Enterprise-grade decision intelligence architecture',
      'Predictive and prescriptive mitigation workflows',
    ],
  };

  const IconComponent = moduleInfo.icon;

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-white rounded-[16px] p-6 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#155EEF] bg-[#EBF2FF] px-2 py-0.5 rounded">
              {moduleInfo.category}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">{moduleInfo.badge}</span>
          </div>
          <h2 className="text-2xl font-black text-[#0B1F3A] tracking-tight flex items-center gap-2.5">
            <IconComponent className="w-6 h-6 text-[#155EEF]" />
            {moduleInfo.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">{moduleInfo.subtitle}</p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              toast.success(
                'Action Dispatched',
                `Queried live ${moduleInfo.title} state from central node.`,
              )
            }
          >
            Refresh Live Matrix
          </Button>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {moduleInfo.highlights.map((h, i) => (
          <div
            key={i}
            className="bg-white rounded-[16px] p-5 border border-[#E2E8F0] shadow-sm flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-[#F0FDF4] border border-[#86EFAC] flex items-center justify-center text-[#15803D] shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0B1F3A] mb-1">Core Capability {i + 1}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{h}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Mock Data Showcase Container */}
      <div className="bg-white rounded-[16px] p-8 border border-[#E2E8F0] shadow-sm text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#EBF2FF] text-[#155EEF] flex items-center justify-center mx-auto shadow-xs">
            <IconComponent className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-[#0B1F3A]">
            {moduleInfo.title} Ready for Part 2 Integration
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            All Part 1 foundational routing, user state, theme tokens, and component hierarchies are fully active.
          </p>
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                toast.info(
                  'Simulation Triggered',
                  `Running analytical diagnostic for ${moduleInfo.title}.`,
                )
              }
            >
              Run Diagnostic Check
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
