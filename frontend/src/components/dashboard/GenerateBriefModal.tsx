import React, { useState } from 'react';
import { FileSpreadsheet, Download, CheckCircle2, X, Sparkles, Building2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';
import { InfraProject } from '../../types/projects';
import { MOCK_INFRA_PROJECTS } from '../../data/mockData';
import { generateSignedPdf, BriefFormat } from '../../utils/generateSignedPdf';

interface GenerateBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: InfraProject | null;
}

export const GenerateBriefModal: React.FC<GenerateBriefModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const toast = useToast();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    project?.id || MOCK_INFRA_PROJECTS[0]?.id || '',
  );
  const [reportType, setReportType] = useState<BriefFormat>('CABINET_SUMMARY');
  const [isGenerating, setIsGenerating] = useState(false);

  // Sync selected project when modal opens with a project
  React.useEffect(() => {
    if (project?.id) {
      setSelectedProjectId(project.id);
    }
  }, [project]);

  if (!isOpen) return null;

  const currentProject =
    MOCK_INFRA_PROJECTS.find((p) => p.id === selectedProjectId) ||
    project ||
    MOCK_INFRA_PROJECTS[0];

  const handleDownload = () => {
    setIsGenerating(true);
    try {
      const filename = generateSignedPdf({
        project: currentProject,
        format: reportType,
        includeSHAP: true,
        includeBenchmarking: true,
        includeMitigation: true,
      });

      setTimeout(() => {
        setIsGenerating(false);
        toast.success(
          'Executive Briefing Downloaded',
          `${filename} successfully saved to your downloads.`,
        );
        onClose();
      }, 600);
    } catch (err: any) {
      setIsGenerating(false);
      toast.error('Download Failed', err?.message || 'Could not generate signed PDF.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs select-none">
      <div className="w-full max-w-lg neo-panel rounded-[22px] p-6 sm:p-7 space-y-5 border border-slate-300/80 shadow-2xl text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-300/60 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl neo-raised text-indigo-700 flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Generate Executive Risk Brief</h3>
              <p className="text-[11px] text-slate-500 font-medium">Cabinet & Ministerial Intelligence Dossier</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Target Infrastructure Package Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-indigo-700" />
              <span>Target Infrastructure Package</span>
            </span>
            <span className="text-[11px] font-mono text-indigo-700 font-bold neo-inset px-2.5 py-0.5 rounded-lg">
              {currentProject.code}
            </span>
          </label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full text-xs font-bold neo-input rounded-xl p-2.5 text-slate-900 focus:outline-none transition-all cursor-pointer"
          >
            {MOCK_INFRA_PROJECTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.code} — {p.name} ({p.riskLevel})
              </option>
            ))}
          </select>
          <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
            <span>Sector: <strong className="text-slate-700">{currentProject.sector}</strong></span>
            <span className={`font-bold ${currentProject.riskLevel === 'CRITICAL' ? 'text-rose-600' : 'text-amber-600'}`}>
              Health Score: {currentProject.healthScore}/100 ({currentProject.riskLevel})
            </span>
          </div>
        </div>

        {/* Template Select */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800">Select Briefing Format</label>
          <div className="space-y-2">
            {[
              {
                id: 'CABINET_SUMMARY',
                title: 'High-Level Cabinet Note (3 Pages)',
                desc: 'Executive summary with macro overrun exposures, top 5 critical projects, and inter-ministerial bottlenecks.',
              },
              {
                id: 'SECTOR_DRILLDOWN',
                title: 'Sectoral Deep-Dive (Roads & Railways)',
                desc: 'Detailed milestone variance tables, RoW litigations, and contractor velocity indices.',
              },
              {
                id: 'EARLY_WARNING_LOG',
                title: '90-Day Early Warning Mitigation Matrix',
                desc: 'Actionable intervention timelines with designated project officers and agency milestones.',
              },
            ].map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => setReportType(tpl.id as BriefFormat)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  reportType === tpl.id
                    ? 'neo-raised bg-indigo-50/80 border-indigo-300'
                    : 'neo-card hover:bg-slate-100/60 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{tpl.title}</span>
                  {reportType === tpl.id && (
                    <CheckCircle2 className="w-4 h-4 text-indigo-700" />
                  )}
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">{tpl.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Synthesis Notice */}
        <div className="p-3.5 rounded-xl neo-card border-l-4 border-l-amber-500 flex items-start gap-2.5 text-xs text-amber-950">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed text-slate-700">
            AI synthesis engine automatically correlates monitored projects, attributing top SHAP delay factors for official inter-ministerial review meetings.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-slate-300/60 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold neo-button-secondary cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isGenerating}
            onClick={handleDownload}
            className="px-4 py-2 text-xs font-bold neo-button-primary flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Generating...' : 'Export Signed PDF Brief'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
