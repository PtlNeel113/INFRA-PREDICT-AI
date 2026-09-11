import React, { useState, useMemo } from 'react';
import {
  ClipboardCheck,
  AlertTriangle,
  Clock,
  Eye,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Building2,
  MapPin,
  FileCheck,
} from 'lucide-react';
import { PAIMANA_OFFICIAL_PROJECTS } from '../../data/paimanaOfficialRecords';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Button } from '../../components/ui/Button';

interface VerificationTarget {
  id: string;
  code: string;
  name: string;
  agency: string;
  state: string;
  sector: string;
  priorityScore: number;
  triggerReasons: string[];
  physicalProgress: number;
  financialProgress: number;
  progressGap: number;
  delayMonths: number;
  costOverrunCr: number;
  inspectionStatus: 'PENDING_VISIT' | 'SCHEDULED' | 'VERIFIED';
}

export const FieldVerificationPage: React.FC = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState<string>('ALL');
  const [inspectionStatuses, setInspectionStatuses] = useState<Record<string, 'PENDING_VISIT' | 'SCHEDULED' | 'VERIFIED'>>({});

  const projects = PAIMANA_OFFICIAL_PROJECTS;

  // Filter projects needing on-ground field verification based on real mathematical triggers
  const verificationQueue: VerificationTarget[] = useMemo(() => {
    const list: VerificationTarget[] = [];

    projects.forEach((p) => {
      const triggers: string[] = [];
      const delay = p.predictedDelayMonths || 0;
      const gap = p.progressGap || 0;
      const overrun = Math.max(0, (p.revisedCostCr || 0) - (p.sanctionedCostCr || 0));
      const finPhyGap = (p.financialProgress || 0) - (p.currentPhysicalProgress || 0);

      if (delay >= 6) {
        triggers.push(`Schedule slippage of ${delay} months`);
      }
      if (gap >= 8) {
        triggers.push(`Milestone progress gap of ${gap.toFixed(1)}%`);
      }
      if (finPhyGap >= 10) {
        triggers.push(`Disbursement exceeds progress by ${Math.round(finPhyGap)}%`);
      }
      if (overrun > 50) {
        triggers.push(`Cost escalation of ₹${overrun.toLocaleString()} Cr`);
      }
      if (p.riskLevel === 'CRITICAL' || p.riskLevel === 'HIGH') {
        triggers.push(`Assigned risk level: ${p.riskLevel}`);
      }

      if (triggers.length > 0) {
        list.push({
          id: p.id,
          code: p.code,
          name: p.name,
          agency: p.implementingAgency,
          state: p.state,
          sector: p.sector,
          priorityScore: triggers.length * 25 + Math.min(25, delay * 2),
          triggerReasons: triggers,
          physicalProgress: p.currentPhysicalProgress || 0,
          financialProgress: p.financialProgress || 0,
          progressGap: gap,
          delayMonths: delay,
          costOverrunCr: overrun,
          inspectionStatus: inspectionStatuses[p.id] || 'PENDING_VISIT',
        });
      }
    });

    return list.sort((a, b) => b.priorityScore - a.priorityScore);
  }, [projects, inspectionStatuses]);

  const filteredQueue = useMemo(() => {
    return verificationQueue.filter((item) => {
      const matchSearch =
        searchTerm === '' ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.state.toLowerCase().includes(searchTerm.toLowerCase());

      const matchState = filterState === 'ALL' || item.state === filterState;

      return matchSearch && matchState;
    });
  }, [verificationQueue, searchTerm, filterState]);

  const handleUpdateStatus = (id: string, status: 'PENDING_VISIT' | 'SCHEDULED' | 'VERIFIED') => {
    setInspectionStatuses((prev) => ({ ...prev, [id]: status }));
    toast.success('Inspection Updated', `Verification status set to ${status.replace('_', ' ')}.`);
  };

  const uniqueStates = useMemo(() => {
    return Array.from(new Set(verificationQueue.map((v) => v.state))).sort();
  }, [verificationQueue]);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto select-none pb-12">
      {/* Header Banner */}
      <div className="neo-panel p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 border-l-4 border-l-emerald-600">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
              <ClipboardCheck className="w-3 h-3 text-emerald-600" />
              MoSPI PAIMANA Monitoring Telemetry
            </span>
            <span className="text-xs font-semibold text-[var(--neo-text-tertiary)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Inspection Prioritization Active</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--neo-text-primary)]">
            Field Verification Queue
          </h1>
          <p className="text-sm text-[var(--neo-text-secondary)] max-w-3xl">
            Automated priority targeting for physical on-site inspections. Identifies projects with substantial progress-financial divergence, milestone slippages, and unexplained schedule extensions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-xl bg-[var(--neo-surface-inset)] border border-[rgba(200,212,226,0.6)] text-xs font-bold text-emerald-700">
            {verificationQueue.length} Projects Flagged for Verification
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="neo-panel p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex-1 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by project name, agency, state, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl neo-inset text-[var(--neo-text-primary)] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className="neo-inset px-3 py-2 rounded-xl text-xs font-semibold text-[var(--neo-text-primary)] focus:outline-none"
          >
            <option value="ALL">All States ({uniqueStates.length})</option>
            {uniqueStates.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs text-[var(--neo-text-tertiary)] font-bold">
          Displaying {filteredQueue.length} Targeted Projects
        </div>
      </div>

      {/* Verification Queue List */}
      <div className="space-y-3">
        {filteredQueue.map((item) => (
          <div
            key={item.id}
            className="neo-panel p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-emerald-200 transition-all"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200">
                  Priority Score: {Math.min(100, Math.round(item.priorityScore))}
                </span>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {item.code}
                </span>
                <span className="text-[10px] font-semibold text-slate-600">
                  {item.sector} • {item.agency} • {item.state}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {item.name}
              </h3>

              {/* Rationale Triggers */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.triggerReasons.map((r, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-[10px] font-medium bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200/80"
                  >
                    <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />
                    {r}
                  </span>
                ))}
              </div>

              {/* Progress Summary */}
              <div className="flex items-center gap-4 text-xs pt-1 font-mono">
                <span className="text-slate-700">
                  Physical: <strong>{item.physicalProgress}%</strong>
                </span>
                <span className="text-blue-700">
                  Financial: <strong>{item.financialProgress}%</strong>
                </span>
                {item.delayMonths > 0 && (
                  <span className="text-red-700">
                    Slippage: <strong>+{item.delayMonths} mo</strong>
                  </span>
                )}
                {item.costOverrunCr > 0 && (
                  <span className="text-amber-700">
                    Overrun: <strong>+₹{item.costOverrunCr.toLocaleString()} Cr</strong>
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
              {item.inspectionStatus === 'VERIFIED' ? (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Site Inspected
                </span>
              ) : item.inspectionStatus === 'SCHEDULED' ? (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
                    Visit Scheduled
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpdateStatus(item.id, 'VERIFIED')}
                    className="rounded-xl cursor-pointer"
                  >
                    Mark Verified
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleUpdateStatus(item.id, 'SCHEDULED')}
                    leftIcon={<Calendar className="w-3.5 h-3.5" />}
                    className="rounded-xl neo-button-interactive cursor-pointer"
                  >
                    Schedule Visit
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpdateStatus(item.id, 'VERIFIED')}
                    leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                    className="rounded-xl cursor-pointer"
                  >
                    Quick Verify
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
