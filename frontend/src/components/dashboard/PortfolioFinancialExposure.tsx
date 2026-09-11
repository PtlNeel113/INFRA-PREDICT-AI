import React from 'react';
import { cn } from '../../utils/cn';

export const PortfolioFinancialExposure: React.FC = () => {
  return (
    <div className="neo-panel p-5 sm:p-6 flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-black text-[var(--neo-text-primary)] tracking-tight uppercase">
          Portfolio Financial Exposure
        </h2>
        <p className="text-xs text-[var(--neo-text-secondary)]">
          Aggregate financial risk exposure across monitored infrastructure portfolio.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="neo-card rounded-xl p-4 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider">
              Total Project Value
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded neo-inset-sm text-[var(--neo-text-secondary)] uppercase tracking-wider">
              Observed
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-black text-[var(--neo-text-primary)] mt-1">
            ₹29,482 <span className="text-sm font-bold text-slate-400">Cr</span>
          </div>
          <p className="text-xs text-[var(--neo-text-secondary)] font-medium">Sanctioned Outlay</p>
        </div>

        {/* Metric 2 */}
        <div className="neo-card rounded-xl p-4 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider">
              Current Expenditure
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded neo-inset-sm text-[var(--neo-text-secondary)] uppercase tracking-wider">
              Observed
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-black text-[var(--neo-text-primary)] mt-1">
            ₹18,420 <span className="text-sm font-bold text-slate-400">Cr</span>
          </div>
          <p className="text-xs text-[var(--neo-text-secondary)] font-medium">To Date</p>
        </div>

        {/* Metric 3 */}
        <div className="neo-card rounded-xl p-4 flex flex-col gap-1.5 border border-blue-200/60">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#1557D6] uppercase tracking-wider">
              Forecast Exposure
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded neo-inset-sm text-[#1557D6] uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1557D6] animate-pulse" />
              AI Forecast
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-black text-[#1557D6] mt-1">
            ₹32,900 <span className="text-sm font-bold text-blue-400">Cr</span>
          </div>
          <p className="text-xs text-[var(--neo-text-secondary)] font-medium">
            Anticipated Final Cost
          </p>
        </div>

        {/* Metric 4 */}
        <div className="neo-card rounded-xl p-4 flex flex-col gap-1.5 border border-red-200/60">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">
              Cost Escalation
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded neo-inset-sm text-red-700 uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              AI Forecast
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-black text-red-700 mt-1 flex items-baseline gap-2">
            ₹3,420 <span className="text-sm font-bold text-red-400">Cr</span>
            <span className="text-xs font-bold text-red-600 bg-red-100 px-1 py-0.5 rounded">
              +11.6%
            </span>
          </div>
          <p className="text-xs text-red-600/80 font-medium">Potential Overrun</p>
        </div>
      </div>
    </div>
  );
};
