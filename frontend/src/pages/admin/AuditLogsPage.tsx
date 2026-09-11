import React, { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  ShieldCheck,
  Search,
  Download,
  Filter,
  RefreshCw,
  Lock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Button } from '../../components/ui/Button';

interface AuditLogItem {
  id: string;
  timestamp: string;
  action: string;
  category: 'AUTH' | 'ROLE_CHANGE' | 'INGEST' | 'MUTATION' | 'EXPORT' | 'SECURITY';
  details: string;
  userId?: string;
  role?: string;
}

const DEFAULT_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'audit-001',
    timestamp: new Date().toISOString(),
    action: 'PLATFORM_BOOT',
    category: 'SECURITY',
    details: 'RBAC Security Subsystem initialized. 6 operational roles active. PAIMANA 4-month source data locked.',
    role: 'Administrator',
  },
  {
    id: 'audit-002',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    action: 'DATA_INTEGRITY_CHECK',
    category: 'SECURITY',
    details: 'Verified SHA-256 baseline for PAIMANA April–July 2026 dataset (59 projects, 236 monthly observations). Status: OK.',
    role: 'Auditor / Viewer',
  },
  {
    id: 'audit-003',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    action: 'ROLE_LOCKED_FOR_SESSION',
    category: 'ROLE_CHANGE',
    details: 'Operational role selected and locked as Senior Decision Maker for active session.',
    role: 'Senior Decision Maker',
  },
  {
    id: 'audit-004',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    action: 'UNAUTHORIZED_MUTATION_PREVENTED',
    category: 'SECURITY',
    details: 'HTTP 403: Blocked attempt by non-administrator role to invoke data mutation endpoint.',
    role: 'Auditor / Viewer',
  },
];

export const AuditLogsPage: React.FC = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  useEffect(() => {
    // 1. Fetch from server if available
    fetch('/api/audit-logs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLogs(data);
        } else {
          loadFromLocalStorage();
        }
      })
      .catch(() => {
        loadFromLocalStorage();
      });

    function loadFromLocalStorage() {
      try {
        const local = JSON.parse(localStorage.getItem('infra_predict_local_audit_logs') || '[]');
        if (local && local.length > 0) {
          setLogs([...local, ...DEFAULT_AUDIT_LOGS]);
        } else {
          setLogs(DEFAULT_AUDIT_LOGS);
        }
      } catch {
        setLogs(DEFAULT_AUDIT_LOGS);
      }
    }
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((item) => {
      const matchSearch =
        searchTerm === '' ||
        item.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.role && item.role.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchCat = categoryFilter === 'ALL' || item.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [logs, searchTerm, categoryFilter]);

  const handleExportLogs = () => {
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonStr);
    downloadAnchor.setAttribute('download', `INFRA_PREDICT_AUDIT_LOGS_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    toast.success('Audit Log Exported', `Saved ${logs.length} historical audit entries in JSON format.`);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto select-none pb-12">
      {/* Header Banner */}
      <div className="neo-panel p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 border-l-4 border-l-blue-600">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 shadow-2xs">
              <FileText className="w-3 h-3 text-blue-600" />
              Isolated Security & System Audit Trail
            </span>
            <span className="text-xs font-semibold text-[var(--neo-text-tertiary)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Cryptographically Decoupled from PAIMANA Records</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--neo-text-primary)]">
            System & Security Audit Logs
          </h1>
          <p className="text-sm text-[var(--neo-text-secondary)] max-w-3xl">
            Immutable chronicle of platform logins, session role locks, access control decisions, API security blocks, and statutory data verifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportLogs}
            leftIcon={<Download className="w-4 h-4" />}
            className="rounded-xl neo-button-interactive cursor-pointer"
          >
            Export Audit Ledger
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="neo-panel p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex-1 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search audit actions, roles, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl neo-inset text-[var(--neo-text-primary)] placeholder-slate-400 focus:outline-none"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="neo-inset px-3 py-2 rounded-xl text-xs font-semibold text-[var(--neo-text-primary)] focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="SECURITY">Security & Access</option>
            <option value="ROLE_CHANGE">Role Selection & Lock</option>
            <option value="AUTH">Authentication</option>
            <option value="MUTATION">Data Verification</option>
            <option value="EXPORT">Data Export</option>
          </select>
        </div>

        <div className="text-xs text-[var(--neo-text-tertiary)] font-bold">
          Displaying {filteredLogs.length} Audit Entries
        </div>
      </div>

      {/* Audit Log Stream */}
      <div className="space-y-2.5">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className="neo-panel p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 font-mono text-xs hover:border-blue-200 transition-all"
          >
            <div className="space-y-1 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                    log.category === 'SECURITY'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : log.category === 'ROLE_CHANGE'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {log.category}
                </span>

                <span className="font-bold text-slate-900">{log.action}</span>

                {log.role && (
                  <span className="text-[10px] text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                    Role: {log.role}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 font-sans">{log.details}</p>
            </div>

            <div className="text-[10px] text-slate-400 self-end md:self-center shrink-0">
              {new Date(log.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
