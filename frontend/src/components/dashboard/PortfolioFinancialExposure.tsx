import React from 'react';
import { cn } from '../../utils/cn';

export const PortfolioFinancialExposure: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#112240] rounded-xl border border-[#E2E8F0] dark:border-slate-800 p-5 sm:p-6 gov-shadow flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-black text-[#0B1F3A] dark:text-white tracking-tight uppercase">
          Portfolio Financial Exposure
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Aggregate financial risk exposure across monitored infrastructure portfolio.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-[#F8FAFC] dark:bg-slate-800/50 rounded-lg p-4 border border-[#E2E8F0] dark:border-slate-700/50 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Project Value
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Observed
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-black text-[#0B1F3A] dark:text-white mt-1">
            ₹29,482 <span className="text-sm font-bold text-slate-400">Cr</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sanctioned Outlay</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#F8FAFC] dark:bg-slate-800/50 rounded-lg p-4 border border-[#E2E8F0] dark:border-slate-700/50 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Current Expenditure
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Observed
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-black text-[#0B1F3A] dark:text-white mt-1">
            ₹18,420 <span className="text-sm font-bold text-slate-400">Cr</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">To Date</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
              Forecast Exposure
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              AI Forecast
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-black text-blue-900 dark:text-blue-300 mt-1">
            ₹32,900 <span className="text-sm font-bold text-blue-400/70">Cr</span>
          </div>
          <p className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium">
            Anticipated Final Cost
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-red-50/50 dark:bg-red-900/10 rounded-lg p-4 border border-red-100 dark:border-red-800/30 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-red-700 dark:text-red-400 uppercase tracking-wider">
              Cost Escalation
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              AI Forecast
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-black text-red-700 dark:text-red-400 mt-1 flex items-baseline gap-2">
            ₹3,420 <span className="text-sm font-bold text-red-400/70">Cr</span>
            <span className="text-xs font-bold text-red-600 dark:text-red-300 bg-red-100 dark:bg-red-900/50 px-1 py-0.5 rounded">
              +11.6%
            </span>
          </div>
          <p className="text-xs text-red-600/70 dark:text-red-400/70 font-medium">Potential Overrun</p>
        </div>
      </div>
    </div>
  );
};
