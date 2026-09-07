import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

export const AiPriorityInsight: React.FC = () => {
  const navigate = useNavigate();
  const setDecisionMode = useDemoStore((state: any) => state.setDecisionMode);

  return (
    <div className="relative overflow-hidden bg-[#F8FAFC] dark:bg-[#0B1F3A]/60 dark:backdrop-blur-3xl dark:border-white/[0.08] rounded-xl border border-[#E2E8F0] p-5 gov-shadow sm:flex sm:items-center sm:justify-between gap-6 group">
      {/* Ambient Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-xl opacity-0 dark:opacity-50 transition-opacity" />
      
      <div className="relative flex items-start gap-4">
        <div className="bg-blue-100 dark:bg-blue-500/20 p-2.5 rounded-lg shrink-0 border border-blue-200 dark:border-blue-500/30">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-[#0B1F3A] dark:text-white mb-1.5 flex items-center gap-1.5">
            AI Priority Insight
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-3xl">
            Three projects have entered the highest-priority review band this cycle. Schedule slippage and widening progress gaps are the dominant risk contributors across the monitored portfolio.
          </p>
        </div>
      </div>

      <div className="relative mt-5 sm:mt-0 shrink-0 flex flex-col sm:flex-row items-center gap-3 z-10">
        <button
          onClick={() => navigate('/explainability')}
          className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          VIEW EXPLANATION →
        </button>
        <button
          onClick={() => {
            if (setDecisionMode) setDecisionMode(true);
            navigate('/decision-mode');
          }}
          className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-white bg-[#155EEF] hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          VIEW PRIORITY PROJECTS →
        </button>
      </div>
    </div>
  );
};
