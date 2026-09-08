import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertTriangle, AlertOctagon, Info, X } from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import { cn } from '../../utils/cn';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0" />,
    error: <AlertOctagon className="w-5 h-5 text-[#DC2626] shrink-0" />,
    info: <Info className="w-5 h-5 text-[#155EEF] shrink-0" />,
  };

  const borderMap = {
    success: 'border-l-4 border-l-[#15803D]',
    warning: 'border-l-4 border-l-[#D97706]',
    error: 'border-l-4 border-l-[#DC2626]',
    info: 'border-l-4 border-l-[#155EEF]',
  };

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'pointer-events-auto bg-white rounded-[12px] p-4 shadow-xl border border-[#E2E8F0] flex items-start gap-3',
              borderMap[t.type],
            )}
          >
            {iconMap[t.type]}
            <div className="flex-1 text-left">
              <h5 className="text-xs font-bold text-[#0B1F3A]">{t.title}</h5>
              {t.description && <p className="text-xs text-slate-500 mt-0.5">{t.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
