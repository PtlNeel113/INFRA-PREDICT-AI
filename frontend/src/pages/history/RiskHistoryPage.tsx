import React, { useState, useMemo } from 'react';
import {
  History,
  TrendingUp,
  Calendar,
  Search,
  Building2,
  CheckCircle2,
  FileText,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';
import { PAIMANA_HISTORICAL_MONTHLY_RECORDS, PaimanaMonthlyRecord } from '../../data/paimanaHistoricalRecords';
import { PAIMANA_OFFICIAL_PROJECTS } from '../../data/paimanaOfficialRecords';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

export const RiskHistoryPage: React.FC = () => {
  const { user } = useAuth();
  const toast = useToast();

  const projects = PAIMANA_OFFICIAL_PROJECTS;
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '612786');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter project dropdown options
  const filteredProjectOptions = useMemo(() => {
    return projects.filter((p) => {
      return (
        searchTerm === '' ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.implementingAgency.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [projects, searchTerm]);

  const activeProject = useMemo(() => {
    return projects.find((p) => p.id === selectedProjectId) || projects[0];
  }, [projects, selectedProjectId]);

  // Retrieve 4-month records for selected project
  const projectSnapshots: PaimanaMonthlyRecord[] = useMemo(() => {
    const raw = PAIMANA_HISTORICAL_MONTHLY_RECORDS.filter(
      (r) => r.projectId === selectedProjectId
    );

    const monthOrder: Record<string, number> = {
      'April 2026': 1,
      'May 2026': 2,
      'June 2026': 3,
      'July 2026': 4,
    };

    return raw.sort((a, b) => (monthOrder[a.reportMonth] || 0) - (monthOrder[b.reportMonth] || 0));
  }, [selectedProjectId]);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto select-none pb-12">
      {/* Header Banner */}
      <div className="neo-panel p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 border-l-4 border-l-amber-600">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 shadow-2xs">
              <History className="w-3 h-3 text-amber-600" />
              4-Month Multi-Cycle Audit Progression
            </span>
            <span className="text-xs font-semibold text-[var(--neo-text-tertiary)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>April → May → June → July 2026 Source Telemetry</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--neo-text-primary)]">
            Project Risk & Progression History
          </h1>
          <p className="text-sm text-[var(--neo-text-secondary)] max-w-3xl">
            Audit-grade longitudinal tracking across four consecutive official PAIMANA reporting cycles. Verify physical progress acceleration, financial drawdown rates, and completion target shifts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-xl bg-[var(--neo-surface-inset)] border border-[rgba(200,212,226,0.6)] text-xs font-bold text-amber-800">
            236 Verified Monthly Snapshots
          </div>
        </div>
      </div>

      {/* Project Selector Control */}
      <div className="neo-panel p-5 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Select Infrastructure Project to Inspect History:
          </label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full neo-inset px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                [{p.code}] {p.name} — {p.implementingAgency} ({p.state})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Project Header Summary */}
      {activeProject && (
        <div className="neo-panel p-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <div className="text-xs font-bold text-blue-700 font-mono">
                {activeProject.code} • {activeProject.implementingAgency}
              </div>
              <h2 className="text-lg font-black text-slate-900 mt-0.5">{activeProject.name}</h2>
              <div className="text-xs text-slate-500">
                {activeProject.sector} • State: {activeProject.state}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400">Sanctioned Outlay</div>
                <div className="text-sm font-black text-slate-800 font-mono">
                  ₹{activeProject.sanctionedCostCr?.toLocaleString()} Cr
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400">July Revised Cost</div>
                <div className="text-sm font-black text-blue-800 font-mono">
                  ₹{activeProject.revisedCostCr?.toLocaleString()} Cr
                </div>
              </div>
            </div>
          </div>

          {/* 4-Month Progression Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {projectSnapshots.map((snap, idx) => {
              const prev = idx > 0 ? projectSnapshots[idx - 1] : null;
              const progressDelta = prev
                ? (snap.physicalProgressPercent - prev.physicalProgressPercent).toFixed(1)
                : '0.0';
              const expenditureDelta = prev
                ? (snap.cumulativeExpenditureCr - prev.cumulativeExpenditureCr).toFixed(2)
                : '0.00';

              return (
                <div
                  key={snap.reportMonth}
                  className="p-4 rounded-2xl bg-[var(--neo-surface-inset)] border border-[rgba(200,212,226,0.7)] space-y-2.5 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#1557D6]">
                      {snap.reportMonth}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Pg. {snap.reportPage} • #{snap.serialNo}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Physical Progress:</span>
                      <span className="font-bold text-emerald-800 font-mono">
                        {snap.physicalProgressPercent}%
                      </span>
                    </div>
                    {idx > 0 && (
                      <div className="text-[10px] text-emerald-600 font-bold text-right">
                        +{progressDelta}% monthly delta
                      </div>
                    )}

                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${Math.min(100, snap.physicalProgressPercent)}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cumulative Spend:</span>
                      <span className="font-bold text-blue-800 font-mono">
                        ₹{snap.cumulativeExpenditureCr.toLocaleString()} Cr
                      </span>
                    </div>
                    {idx > 0 && (
                      <div className="text-[10px] text-blue-600 font-bold text-right">
                        +₹{expenditureDelta} Cr drawdown
                      </div>
                    )}

                    <div className="flex justify-between pt-1">
                      <span className="text-slate-500">Target DOC:</span>
                      <span className="font-semibold text-slate-800 font-mono">
                        {snap.revisedTargetDoc || snap.originalTargetDoc || 'N/A'}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Approved Cost:</span>
                      <span className="font-semibold text-slate-800 font-mono">
                        ₹{snap.revisedCostCr.toLocaleString()} Cr
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4-Month Comparative Verification Table */}
      <div className="neo-panel p-6 space-y-4">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
          Cycle-by-Cycle Reconciled Records (Official PAIMANA Source)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/60 text-slate-600 font-bold uppercase">
                <th className="py-2.5 px-3">Reporting Month</th>
                <th className="py-2.5 px-3">Original DOC</th>
                <th className="py-2.5 px-3">Revised DOC</th>
                <th className="py-2.5 px-3 text-right">Original Cost</th>
                <th className="py-2.5 px-3 text-right">Revised Cost</th>
                <th className="py-2.5 px-3 text-right">Cumulative Spend</th>
                <th className="py-2.5 px-3 text-right">Physical Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {projectSnapshots.map((snap) => (
                <tr key={snap.reportMonth} className="hover:bg-blue-50/30">
                  <td className="py-3 px-3 font-bold text-[#1557D6]">{snap.reportMonth}</td>
                  <td className="py-3 px-3">{snap.originalTargetDoc || '—'}</td>
                  <td className="py-3 px-3 font-bold text-amber-700">{snap.revisedTargetDoc || '—'}</td>
                  <td className="py-3 px-3 text-right">₹{snap.originalCostCr.toLocaleString()} Cr</td>
                  <td className="py-3 px-3 text-right font-bold">₹{snap.revisedCostCr.toLocaleString()} Cr</td>
                  <td className="py-3 px-3 text-right font-bold text-blue-700">
                    ₹{snap.cumulativeExpenditureCr.toLocaleString()} Cr
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-700">
                    {snap.physicalProgressPercent}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
