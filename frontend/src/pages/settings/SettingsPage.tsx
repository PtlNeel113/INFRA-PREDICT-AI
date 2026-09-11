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
      <div className="neo-panel p-6 flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl neo-raised flex items-center justify-center text-slate-800">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            SYSTEM PREFERENCES & PLATFORM SETTINGS
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Configure visual themes, demo simulation state, risk alert sensitivities & API nodes.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Section 1: Appearance & Theme */}
        <div className="neo-panel rounded-2xl p-6 space-y-4 text-slate-900">
          <div className="flex items-center justify-between border-b border-slate-300/60 pb-3">
            <div className="flex items-center gap-2">
              {isDarkMode ? <Moon className="w-4 h-4 text-indigo-500" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <h2 className="text-xs font-black uppercase tracking-wider font-mono text-slate-800">
                Visual Theme & Appearance
              </h2>
            </div>
            <span className="text-[11px] font-bold text-slate-500 font-mono neo-inset px-2.5 py-1 rounded-lg">
              Current: {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-800">Government Enterprise Neumorphic Theme</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Switch between high-contrast enterprise light theme and deep command navy dark theme (#07111F).
              </p>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="px-4 py-2.5 rounded-xl neo-button-secondary text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
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
        <div className="neo-panel rounded-2xl p-6 space-y-4 text-slate-900">
          <div className="flex items-center justify-between border-b border-slate-300/60 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <h2 className="text-xs font-black uppercase tracking-wider font-mono text-slate-800">
                Demo Environment & Data Management
              </h2>
            </div>
            <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-200 neo-raised">
              Active Demonstration
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800">Active Telemetry Baseline</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {demoCycle}
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetData}
                className="px-4 py-2.5 rounded-xl neo-button-danger text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Risk Thresholds & Model Parameters */}
        <div className="neo-panel rounded-2xl p-6 space-y-4 text-slate-900">
          <div className="flex items-center justify-between border-b border-slate-300/60 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-600" />
              <h2 className="text-xs font-black uppercase tracking-wider font-mono text-slate-800">
                AI Engine & Escalation Thresholds
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {/* Risk Threshold Slider */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800">Critical Risk Escalation Cutoff</span>
                <span className="font-mono font-bold text-rose-700 neo-inset px-2.5 py-1 rounded-lg">
                  Score ≥ {riskThreshold}/100
                </span>
              </div>
              <div className="p-2 neo-inset rounded-xl">
                <input
                  type="range"
                  min="50"
                  max="90"
                  value={riskThreshold}
                  onChange={(e) => setRiskThreshold(Number(e.target.value))}
                  className="w-full cursor-pointer accent-indigo-600 h-2 bg-transparent"
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono font-semibold px-1">
                <span>50 (Aggressive)</span>
                <span>75 (Standard)</span>
                <span>90 (Conservative)</span>
              </div>
            </div>

            {/* Anomaly Detection Sensitivity */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-300/60">
              <div>
                <span className="font-bold text-slate-800 block">Anomaly Detection Sensitivity</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Controls threshold for triggering contractor progress jump alerts.
                </p>
              </div>

              <select
                value={anomalySensitivity}
                onChange={(e) => setAnomalySensitivity(e.target.value)}
                className="font-bold neo-input rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none cursor-pointer"
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
            className="px-6 py-2.5 rounded-xl neo-button-primary font-bold text-xs cursor-pointer"
          >
            Save All Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
