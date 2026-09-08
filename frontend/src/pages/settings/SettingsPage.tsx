import React, { useState } from 'react';
import {
  Settings,
  Moon,
  Sun,
  RotateCcw,
  ShieldCheck,
  Cpu,
  Sliders,
  Bell,
  Database,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useDemoStore } from '../../store/demoStore';
import { useToast } from '../../hooks/useToast';
import { cn } from '../../utils/cn';

export const SettingsPage: React.FC = () => {
  const toast = useToast();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { isDemoMode, toggleDemoMode, resetDemoData, demoCycle } = useDemoStore();

  const [riskThreshold, setRiskThreshold] = useState<number>(75);
  const [anomalySensitivity, setAnomalySensitivity] = useState<string>('HIGH');
  const [autoSyncInterval, setAutoSyncInterval] = useState<string>('HOURLY');

  const handleResetData = () => {
    resetDemoData();
    toast.success('Demo Data Reset', 'Restored default baseline dataset & dismissed alert states.');
  };

  const handleSavePreferences = () => {
    toast.success('Configuration Saved', 'System risk thresholds and display preferences updated successfully.');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 select-none">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-md">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            SYSTEM PREFERENCES & PLATFORM SETTINGS
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Configure visual themes, demo simulation state, risk alert sensitivities & API nodes.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Section 1: Appearance & Theme */}
        <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-slate-900 dark:text-slate-100">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <h2 className="text-xs font-black uppercase tracking-wider font-mono">
                Visual Theme & Appearance
              </h2>
            </div>
            <span className="text-[11px] font-bold text-slate-400 font-mono">
              Current: {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold">Government Enterprise Theme</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Switch between high-contrast light theme and deep command navy dark theme (#07111F).
              </p>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Switch to Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span>Switch to Dark</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Section 2: Demo Environment & Data Controls */}
        <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-slate-900 dark:text-slate-100">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xs font-black uppercase tracking-wider font-mono">
                Demo Environment & Data Management
              </h2>
            </div>
            <span className="text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
              Active Demonstration
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">Active Telemetry Baseline</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {demoCycle}
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetData}
                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Risk Thresholds & Model Parameters */}
        <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-slate-900 dark:text-slate-100">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <h2 className="text-xs font-black uppercase tracking-wider font-mono">
                AI Engine & Escalation Thresholds
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {/* Risk Threshold Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold">Critical Risk Escalation Cutoff</span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                  Score ≥ {riskThreshold}/100
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                value={riskThreshold}
                onChange={(e) => setRiskThreshold(Number(e.target.value))}
                className="w-full cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>50 (Aggressive)</span>
                <span>75 (Standard)</span>
                <span>90 (Conservative)</span>
              </div>
            </div>

            {/* Anomaly Detection Sensitivity */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="font-bold block">Anomaly Detection Sensitivity</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Controls threshold for triggering contractor progress jump alerts.
                </p>
              </div>

              <select
                value={anomalySensitivity}
                onChange={(e) => setAnomalySensitivity(e.target.value)}
                className="font-bold bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 focus:outline-none"
              >
                <option value="HIGH">High (Flags ±5% Discrepancies)</option>
                <option value="MEDIUM">Medium (Flags ±10% Discrepancies)</option>
                <option value="LOW">Low (Flags Major Anomalies Only)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSavePreferences}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
          >
            Save All Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
