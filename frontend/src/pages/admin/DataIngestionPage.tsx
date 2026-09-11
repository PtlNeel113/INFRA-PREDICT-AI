import React, { useState } from 'react';
import {
  UploadCloud,
  Database,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Button } from '../../components/ui/Button';
import { UploadDataModal } from '../../components/dashboard/UploadDataModal';
import { PAIMANA_OFFICIAL_PROJECTS } from '../../data/paimanaOfficialRecords';

export const DataIngestionPage: React.FC = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projects = PAIMANA_OFFICIAL_PROJECTS;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto select-none pb-12">
      {/* Header Banner */}
      <div className="neo-panel p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 border-l-4 border-l-purple-600">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200 shadow-2xs">
              <UploadCloud className="w-3 h-3 text-purple-600" />
              Administrative Data Pipeline
            </span>
            <span className="text-xs font-semibold text-[var(--neo-text-tertiary)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Official PAIMANA Source Protected</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--neo-text-primary)]">
            Data Ingestion Console
          </h1>
          <p className="text-sm text-[var(--neo-text-secondary)] max-w-3xl">
            Stage and validate incoming monthly telemetry batches or supplementary contractor work breakdown structures. Note: Historical April–July 2026 baseline records remain strictly immutable.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            leftIcon={<UploadCloud className="w-4 h-4" />}
            className="rounded-xl cursor-pointer"
          >
            Launch Ingestion Wizard
          </Button>
        </div>
      </div>

      {/* Security Notice Card */}
      <div className="neo-panel p-5 border border-blue-200/80 bg-blue-50/40 flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-900">
            Source Data Protection Policy Active
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            In accordance with Government Data Integrity standards, existing PAIMANA official records across April, May, June, and July 2026 are preserved as the official baseline. New ingestion batches are isolated, cross-checked for primary key uniqueness, and logged to the system audit trail.
          </p>
        </div>
      </div>

      {/* Dataset Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="neo-panel p-5 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Baseline Dataset</div>
          <div className="text-2xl font-black text-slate-900">{projects.length} Central Sector Projects</div>
          <p className="text-xs text-emerald-700 font-semibold">236 verified monthly observations</p>
        </div>

        <div className="neo-panel p-5 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Supported Formats</div>
          <div className="text-2xl font-black text-slate-900">Excel, CSV, JSON</div>
          <p className="text-xs text-slate-500 font-medium">Standard MoSPI PAIMANA schema</p>
        </div>

        <div className="neo-panel p-5 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">RBAC Restriction</div>
          <div className="text-2xl font-black text-purple-800">Admin Exclusive</div>
          <p className="text-xs text-slate-500 font-medium">HTTP 403 enforced on non-admin roles</p>
        </div>
      </div>

      {/* Upload Data Modal */}
      <UploadDataModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
