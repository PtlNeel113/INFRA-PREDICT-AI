import React, { useState } from 'react';
import {
  Database,
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Server,
  FileCheck,
  Zap,
  ArrowRight,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { MOCK_MASTER_DATASETS, MOCK_DATA_ANOMALIES } from '../../data/dataCenterMockData';
import { DataAnomaly, DataIngestionSummary, IngestionStatus } from '../../types/dataCenter';
import { useToast } from '../../hooks/useToast';
import { cn } from '../../utils/cn';

export const DataCenterPage: React.FC = () => {
  const toast = useToast();
  const [ingestionStatus, setIngestionStatus] = useState<IngestionStatus>('IDLE');
  const [activeTab, setActiveTab] = useState<'INGEST' | 'DATASETS' | 'ANOMALIES'>('INGEST');
  const [anomalies, setAnomalies] = useState<DataAnomaly[]>(MOCK_DATA_ANOMALIES);

  const [summary, setSummary] = useState<DataIngestionSummary | null>({
    totalRows: 1842,
    validRows: 1818,
    missingValues: 14,
    duplicateEntries: 3,
    invalidDates: 7,
    qualityScore: 98.6,
    ingestedAt: 'Today at 10:30 AM (Batch #2026-08-B)',
  });

  const handleSimulateUpload = () => {
    setIngestionStatus('PARSING');
    toast.info('Ingestion Started', 'Parsing multi-sector schema and contractor work breakdown structures...');

    setTimeout(() => {
      setIngestionStatus('VALIDATING');
      toast.info('Validation Pipeline Active', 'Running cross-agency constraint and geospatial checks...');

      setTimeout(() => {
        setIngestionStatus('COMPLETED');
        setSummary({
          totalRows: 1950,
          validRows: 1932,
          missingValues: 8,
          duplicateEntries: 2,
          invalidDates: 8,
          qualityScore: 99.1,
          ingestedAt: 'Just now (Live Verified Batch)',
        });
        toast.success('Ingestion & Sync Complete', 'Successfully verified 1,950 project vectors. AI risk matrices updated.');
      }, 900);
    }, 800);
  };

  const handleResolveAnomaly = (id: string) => {
    setAnomalies((prev) => prev.filter((a) => a.id !== id));
    toast.success('Anomaly Resolved', 'Correction applied to master telemetry ledger.');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 select-none">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              DATA CENTER & INGESTION HUB
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Pipeline synchronization, validation ledger & automated anomaly detection.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#0F1D2E] rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          {[
            { id: 'INGEST', label: 'Upload & Ingest', icon: UploadCloud },
            { id: 'DATASETS', label: 'Master Datasets', icon: Server },
            { id: 'ANOMALIES', label: `Anomalies (${anomalies.length})`, icon: AlertTriangle },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer',
                  activeTab === tab.id
                    ? 'bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Upload & Ingest Pipeline */}
      {activeTab === 'INGEST' && (
        <div className="space-y-6">
          {/* Upload Dropzone Container */}
          <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-slate-900 dark:text-slate-100">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-base md:text-lg font-black tracking-tight">
                Ingest New Monthly Telemetry Batch
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Supports standard schema, infrastructure CSV milestone files, and project Excel workbooks.
              </p>
            </div>

            {/* Dropzone Area */}
            <div
              onClick={handleSimulateUpload}
              className={cn(
                'border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all',
                ingestionStatus === 'PARSING' || ingestionStatus === 'VALIDATING'
                  ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20'
                  : 'border-slate-300 dark:border-slate-700 hover:border-indigo-500 bg-slate-50/50 dark:bg-[#0B1F3A]/50',
              )}
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Drag & Drop CSV / Excel dataset here, or click to upload
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Automatic schema mapping • SHA-256 integrity verification • Instant SHAP recalculation
              </p>

              <button
                type="button"
                className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                {ingestionStatus === 'PARSING'
                  ? 'Parsing Schema...'
                  : ingestionStatus === 'VALIDATING'
                  ? 'Validating Geospatial Boundaries...'
                  : 'Select Sample Dataset (Simulate Ingestion)'}
              </button>
            </div>
          </div>

          {/* Validation & Quality Score Summary */}
          {summary && (
            <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-slate-900 dark:text-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-xs font-black uppercase tracking-wider font-mono">
                    Latest Ingestion Integrity Audit
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {summary.ingestedAt}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Records</span>
                  <strong className="text-sm md:text-base font-black font-mono mt-0.5 block text-slate-900 dark:text-white">
                    {summary.totalRows}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Valid Vectors</span>
                  <strong className="text-sm md:text-base font-black font-mono mt-0.5 block text-emerald-600 dark:text-emerald-400">
                    {summary.validRows}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Missing Cells</span>
                  <strong className="text-sm md:text-base font-black font-mono mt-0.5 block text-amber-600 dark:text-amber-400">
                    {summary.missingValues}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Duplicates</span>
                  <strong className="text-sm md:text-base font-black font-mono mt-0.5 block text-slate-700 dark:text-slate-300">
                    {summary.duplicateEntries}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Date Format Fixes</span>
                  <strong className="text-sm md:text-base font-black font-mono mt-0.5 block text-indigo-600 dark:text-indigo-400">
                    {summary.invalidDates}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 uppercase font-bold block">Quality Index</span>
                  <strong className="text-sm md:text-base font-black font-mono mt-0.5 block text-emerald-600 dark:text-emerald-400">
                    {summary.qualityScore}%
                  </strong>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Master Datasets */}
      {activeTab === 'DATASETS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_MASTER_DATASETS.map((ds) => (
              <div
                key={ds.id}
                className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-slate-900 dark:text-slate-100"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                      {ds.format}
                    </span>
                    <h3 className="text-sm font-black mt-1.5">{ds.title}</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{ds.source}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shrink-0">
                    {ds.status}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Coverage:</span>
                    <span className="font-bold text-right">{ds.coverage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Project Vectors:</span>
                    <span className="font-mono font-bold">{ds.recordCount} Projects</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Last Synced:</span>
                    <span className="font-mono">{ds.lastUpdated}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toast.info('Export Requested', `Initiated secure download for ${ds.title}`)}
                  className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>Download Telemetry Dump</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Anomalies */}
      {activeTab === 'ANOMALIES' && (
        <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-slate-900 dark:text-slate-100">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-black uppercase tracking-wide">
                Detected Telemetry Inconsistencies
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Automated heuristic checks identifying milestone discrepancies, billing divergence & chainage errors.
              </p>
            </div>
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
              {anomalies.length} Flagged Issues
            </span>
          </div>

          <div className="space-y-3">
            {anomalies.map((anom) => (
              <div
                key={anom.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0B1F3A]/50 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                      {anom.projectCode}
                    </span>
                    <span className="text-xs font-bold">{anom.field}</span>
                  </div>
                  <span
                    className={cn(
                      'text-[10px] font-black uppercase px-2 py-0.5 rounded-full border',
                      anom.severity === 'HIGH'
                        ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
                    )}
                  >
                    {anom.severity} SEVERITY
                  </span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {anom.issue}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">
                    <strong className="text-slate-700 dark:text-slate-300">Correction:</strong> {anom.suggestedCorrection}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleResolveAnomaly(anom.id)}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] shrink-0 transition-colors cursor-pointer"
                  >
                    Accept Correction
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
