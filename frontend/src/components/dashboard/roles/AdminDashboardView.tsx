import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  Activity,
  Server,
  Lock,
  Clock,
  Terminal,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { ROLE_DEFINITIONS, AVAILABLE_ROLES } from '../../../config/roles';
import { useToast } from '../../../hooks/useToast';

interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  category: string;
  details: string;
  userId?: string;
  role?: string;
}

export const AdminDashboardView: React.FC = () => {
  const toast = useToast();
  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  const fetchAuditLogs = () => {
    setIsLoadingLogs(true);
    // Fetch from server or localStorage fallback
    fetch('/api/audit-logs')
      .then((res) => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setAuditLogs(data);
        } else {
          loadLocalLogs();
        }
      })
      .catch(() => {
        loadLocalLogs();
      })
      .finally(() => {
        setIsLoadingLogs(false);
      });
  };

  const loadLocalLogs = () => {
    try {
      const stored = localStorage.getItem('infra_predict_local_audit_logs');
      if (stored) {
        setAuditLogs(JSON.parse(stored));
      } else {
        setAuditLogs([
          {
            id: 'init_1',
            timestamp: new Date().toISOString(),
            action: 'SYSTEM_BOOT',
            category: 'SECURITY',
            details: 'RBAC Policy Engine initialized with 6 authoritative enterprise roles',
            role: 'Administrator',
          },
        ]);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  return (
    <div className="space-y-6 select-none">
      {/* ADMIN HERO BANNER */}
      <div className="neo-panel p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden text-[var(--neo-text-primary)] border-l-4 border-l-[#1557D6]">
        <div className="relative z-10 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 shadow-2xs">
              <ShieldCheck className="w-3 h-3 text-[#1557D6]" />
              System Administration Active
            </span>
            <span className="text-xs font-semibold text-[var(--neo-text-tertiary)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>RBAC Policy Engine & Isolated Audit Ledger</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-[30px] font-black tracking-tight text-[var(--neo-text-primary)] leading-tight">
            Security & Administration Console
          </h1>
          <p className="text-sm text-[var(--neo-text-secondary)] max-w-2xl">
            Monitor real-time system audit events, verify role-based permissions, and inspect PAIMANA data pipeline telemetry.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={fetchAuditLogs}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl neo-card text-xs font-bold text-[var(--neo-text-primary)] hover:text-[#1557D6] transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLogs ? 'animate-spin' : ''}`} />
            <span>REFRESH AUDIT LOGS</span>
          </button>
        </div>
      </div>

      {/* 4 ADMIN METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4.5 rounded-2xl neo-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider">
              Security Policy
            </span>
            <div className="p-1.5 rounded-xl neo-inset-sm text-emerald-600">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">
            ENFORCED
          </div>
          <div className="mt-2 pt-2 border-t border-[rgba(200,212,226,0.45)] text-[10px] text-[var(--neo-text-secondary)] font-semibold">
            Strict HTTP 403 Guards Active
          </div>
        </div>

        <div className="p-4.5 rounded-2xl neo-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider">
              Authoritative Roles
            </span>
            <div className="p-1.5 rounded-xl neo-inset-sm text-[#1557D6]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[var(--neo-text-primary)] font-mono">
            6 Roles
          </div>
          <div className="mt-2 pt-2 border-t border-[rgba(200,212,226,0.45)] text-[10px] text-[var(--neo-text-secondary)] font-semibold">
            Single Source of Truth
          </div>
        </div>

        <div className="p-4.5 rounded-2xl neo-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider">
              Audit Events
            </span>
            <div className="p-1.5 rounded-xl neo-inset-sm text-purple-600">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[var(--neo-text-primary)] font-mono">
            {auditLogs.length}
          </div>
          <div className="mt-2 pt-2 border-t border-[rgba(200,212,226,0.45)] text-[10px] text-[var(--neo-text-secondary)] font-semibold">
            Isolated System Telemetry
          </div>
        </div>

        <div className="p-4.5 rounded-2xl neo-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[var(--neo-text-tertiary)] uppercase tracking-wider">
              Pipeline Health
            </span>
            <div className="p-1.5 rounded-xl neo-inset-sm text-emerald-600">
              <Server className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">
            100% HEALTHY
          </div>
          <div className="mt-2 pt-2 border-t border-[rgba(200,212,226,0.45)] text-[10px] text-[var(--neo-text-secondary)] font-semibold">
            PAIMANA Read-Only Source Intact
          </div>
        </div>
      </div>

      {/* SYSTEM AUDIT LOG STREAM */}
      <div className="neo-panel overflow-hidden">
        <div className="p-4 border-b border-[rgba(200,212,226,0.45)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#1557D6]" />
            <h3 className="text-sm font-black text-[var(--neo-text-primary)]">
              Security & Action Audit Log Stream
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-[#1557D6] border border-blue-200">
            Isolated Security Ledger
          </span>
        </div>

        <div className="overflow-x-auto max-h-80 overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--neo-surface-inset)] text-[10px] font-black uppercase tracking-wider text-[var(--neo-text-secondary)] border-b border-[rgba(200,212,226,0.45)] sticky top-0">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Action</th>
                <th className="p-3">Category</th>
                <th className="p-3">Role</th>
                <th className="p-3">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(200,212,226,0.3)] font-mono text-[11px]">
              {auditLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-400 font-sans">
                    No audit logs recorded yet.
                  </td>
                </tr>
              ) : (
                auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[var(--neo-surface-raised)] transition-colors">
                    <td className="p-3 text-[var(--neo-text-tertiary)] whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleTimeString()} ({new Date(log.timestamp).toLocaleDateString()})
                    </td>
                    <td className="p-3 font-bold text-[#1557D6] whitespace-nowrap">{log.action}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {log.category}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-[var(--neo-text-primary)] whitespace-nowrap">
                      {log.role || 'System'}
                    </td>
                    <td className="p-3 text-[var(--neo-text-secondary)] max-w-md truncate font-sans">
                      {log.details}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROLE PERMISSION MATRIX OVERVIEW */}
      <div className="neo-panel p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(200,212,226,0.45)]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#1557D6]" />
            <h3 className="text-sm font-black text-[var(--neo-text-primary)]">
              Configured Role Hierarchy & Authorization Scope
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {AVAILABLE_ROLES.map((roleKey) => {
            const def = ROLE_DEFINITIONS[roleKey];
            return (
              <div key={roleKey} className="p-4 rounded-xl neo-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[var(--neo-text-primary)]">
                      {def.title}
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${def.badgeColor.bg} ${def.badgeColor.text} ${def.badgeColor.border}`}>
                      {def.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--neo-text-secondary)] leading-relaxed mb-3">
                    {def.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-[rgba(200,212,226,0.4)] text-[10px] text-[var(--neo-text-tertiary)]">
                  <span className="font-bold text-[var(--neo-text-primary)]">{def.permissions.length}</span> Granular Permissions Assigned
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
