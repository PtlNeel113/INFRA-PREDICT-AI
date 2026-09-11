import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

export const AiPriorityInsight: React.FC = () => {
  const navigate = useNavigate();
  const setDecisionMode = useDemoStore((state: any) => state.setDecisionMode);

  return (
    <div className="relative overflow-hidden neo-panel p-5 sm:flex sm:items-center sm:justify-between gap-6 group">
      <div className="relative flex items-start gap-4">
        <div className="neo-inset-sm p-2.5 rounded-xl shrink-0 text-[#1557D6]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-[var(--neo-text-primary)] mb-1.5 flex items-center gap-1.5">
            AI Priority Insight
          </h3>
          <p className="text-sm text-[var(--neo-text-secondary)] font-medium leading-relaxed max-w-3xl">
            Three projects have entered the highest-priority review band this cycle. Schedule slippage and widening progress gaps are the dominant risk contributors across the monitored portfolio.
          </p>
        </div>
      </div>

      <div className="relative mt-4 sm:mt-0 shrink-0 flex flex-col sm:flex-row items-center gap-2.5 z-10">
        <button
          onClick={() => navigate('/explainability')}
          className="w-full sm:w-auto px-4 py-2 text-xs font-bold neo-button-secondary rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Lightbulb className="w-3.5 h-3.5 text-[#1557D6]" />
          <span>VIEW EXPLANATION →</span>
        </button>
        <button
          onClick={() => {
            if (setDecisionMode) setDecisionMode(true);
            navigate('/decision-mode');
          }}
          className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-white neo-button-primary rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>VIEW PRIORITY PROJECTS →</span>
        </button>
      </div>
    </div>
  );
};
