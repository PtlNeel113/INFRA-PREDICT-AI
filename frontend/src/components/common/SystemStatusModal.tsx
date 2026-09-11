import React from 'react';
import {
  ShieldCheck,
  X,
  Database,
  Cpu,
  Server,
  BellRing,
  Activity,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SystemStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemStatusModal: React.FC<SystemStatusModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const services = [
    {
      name: 'DATA INGESTION',
      status: 'Connected',
      statusColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800',
      icon: Database,
      details: 'API Node • Sync Cycle: Hourly • Latency: 14ms',
      uptime: '99.98%',
    },
    {
      name: 'AI RISK & FORECAST ENGINE',
      status: 'Operational',
      statusColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800',
      icon: Cpu,
      details: 'Ensemble XGBoost + LightGBM + TreeSHAP • Inference Time: 42ms',
      uptime: '99.95%',
    },
    {
      name: 'NATIONAL PROJECT DATABASE',
      status: 'Healthy',
      statusColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800',
      icon: Server,
      details: 'Monitored Infrastructure Vectors • Multi-AZ Replication Active',
      uptime: '100.00%',
    },
    {
      name: 'ALERT & ESCALATION ENGINE',
      status: 'Active',
      statusColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800',
      icon: BellRing,
      details: 'Rule-Based Thresholds & Anomaly Detectors • 5 Active Escalations',
      uptime: '99.99%',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-center justify-center select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg neo-panel rounded-2xl shadow-2xl overflow-hidden z-10 text-slate-900 border border-slate-300/80">
        {/* Header */}
        <div className="p-5 border-b border-slate-300/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl neo-raised flex items-center justify-center text-indigo-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-wide text-slate-900">
                System Security & Service Status
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Infrastructure telemetry health monitor
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Services List */}
        <div className="p-5 space-y-3">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.name}
                className="p-3.5 rounded-xl neo-card flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg neo-inset flex items-center justify-center text-indigo-700 shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black tracking-tight font-mono text-slate-900">
                      {srv.name}
                    </span>
                    <span
                      className={cn(
                        'text-[10px] font-black uppercase px-2.5 py-0.5 rounded-lg border neo-raised flex items-center gap-1.5',
                        srv.statusColor,
                      )}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {srv.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600">
                    {srv.details}
                  </p>

                  <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between pt-1">
                    <span>Availability: {srv.uptime}</span>
                    <span className="text-emerald-700 font-bold">● Normal Baseline</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Demo Notice Footer */}
        <div className="p-4 border-t border-slate-300/60 neo-inset text-[11px] text-slate-500 flex items-center justify-between m-4 rounded-xl">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-mono text-[10px] uppercase font-bold text-indigo-700">
              Demo Environment Mode
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium">
            <span>UI Demonstration Only</span>
          </span>
        </div>
      </div>
    </div>
  );
};
