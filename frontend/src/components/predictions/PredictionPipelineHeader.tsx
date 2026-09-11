import React from 'react';
import { ArrowDown, Layers, Activity, Sliders, TrendingUp, Sparkles, Building2, Calculator, Clock } from 'lucide-react';

export type PipelineStage = 'project' | 'parameters' | 'costrisk' | 'timerisk' | 'risks' | 'prediction';

interface PredictionPipelineHeaderProps {
  activeStage?: PipelineStage;
  onStageClick?: (stage: PipelineStage) => void;
}

export const PredictionPipelineHeader: React.FC<PredictionPipelineHeaderProps> = ({
  activeStage,
  onStageClick,
}) => {
  const stages = [
    {
      id: 'project' as PipelineStage,
      step: '1',
      title: 'Target Project',
      subtitle: 'PAIMANA Official Baseline',
      icon: <Building2 className="w-4 h-4" />,
      color: 'blue',
      badge: 'Audited DPR Data',
    },
    {
      id: 'parameters' as PipelineStage,
      step: '2',
      title: 'Parameters Matrix',
      subtitle: 'Cost, Time & Execution',
      icon: <Sliders className="w-4 h-4" />,
      color: 'indigo',
      badge: '14 Quantitative Inputs',
    },
    {
      id: 'costrisk' as PipelineStage,
      step: '3',
      title: 'Cost Risk Engine',
      subtitle: 'Budget Escalation & Ratio',
      icon: <Calculator className="w-4 h-4" />,
      color: 'rose',
      badge: 'Rule-Based Traceable',
    },
    {
      id: 'timerisk' as PipelineStage,
      step: '4',
      title: 'Time Risk Engine',
      subtitle: 'Slippage & Delay Risk',
      icon: <Clock className="w-4 h-4" />,
      color: 'amber',
      badge: 'Deterministic Schedule',
    },
    {
      id: 'risks' as PipelineStage,
      step: '5',
      title: 'Tri-Axis Risk Layer',
      subtitle: 'Composite Multi-Pillar',
      icon: <Activity className="w-4 h-4" />,
      color: 'purple',
      badge: 'Cost/Time/Execution',
    },
    {
      id: 'prediction' as PipelineStage,
      step: '6',
      title: 'Forward Forecasts',
      subtitle: 'Escalation & Slippage Projections',
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'emerald',
      badge: 'Probability Bounds',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4" id="prediction-pipeline-header">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Predictive Intelligence Architecture
            </h2>
            <p className="text-xs text-slate-500">
              PAIMANA Data &rarr; Parameters &rarr; Cost &amp; Time Engines &rarr; Tri-Axis Risk &rarr; Risk Drivers &rarr; Explainable Decisions
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 self-start sm:self-auto">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>MoSPI Flash Engine v2.4</span>
        </div>
      </div>

      {/* Visual Workflow Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
        {stages.map((st, idx) => {
          const isSelected = activeStage === st.id;
          return (
            <div
              key={st.id}
              onClick={() => onStageClick?.(st.id)}
              className={`relative rounded-xl p-3 border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-50/80 border-indigo-300 shadow-sm ring-2 ring-indigo-500/20'
                  : 'bg-slate-50/70 hover:bg-slate-100/70 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-slate-700 font-bold text-[10px] shadow-2xs border border-slate-200">
                  {st.step}
                </span>
                <span className="text-[9px] font-semibold tracking-wide text-slate-400 font-mono">
                  {st.badge}
                </span>
              </div>

              <div className="flex items-start gap-2">
                <div
                  className={`p-1.5 rounded-lg shrink-0 ${
                    st.id === 'project'
                      ? 'bg-blue-100 text-blue-700'
                      : st.id === 'parameters'
                      ? 'bg-indigo-100 text-indigo-700'
                      : st.id === 'costrisk'
                      ? 'bg-rose-100 text-rose-700'
                      : st.id === 'risks'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {st.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-slate-900 truncate">
                    {st.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate">
                    {st.subtitle}
                  </p>
                </div>
              </div>

              {/* Arrow connector indicator on desktop */}
              {idx < stages.length - 1 && (
                <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-400 shadow-2xs">
                  <span className="text-[8px] font-bold">&rarr;</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

