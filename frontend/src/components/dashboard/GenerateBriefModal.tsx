import React, { useState } from 'react';
import { FileSpreadsheet, Download, CheckCircle2, X, Sparkles, Printer, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';

interface GenerateBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GenerateBriefModal: React.FC<GenerateBriefModalProps> = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [reportType, setReportType] = useState('CABINET_SUMMARY');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success(
        'Executive Briefing Downloaded',
        'Cabinet_Risk_Dossier_FY26_Q1.pdf successfully saved to your downloads.',
      );
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060F1D]/70 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-[20px] border border-[#E2E8F0] gov-shadow p-6 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#ECFEFF] text-[#0E7490] flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#0B1F3A]">Generate Executive Risk Brief</h3>
              <p className="text-[11px] text-slate-500">Cabinet & Ministerial Intelligence Dossier</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Template Select */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0B1F3A]">Select Briefing Format</label>
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
                onClick={() => setReportType(tpl.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  reportType === tpl.id
                    ? 'border-[#155EEF] bg-blue-50/50'
                    : 'border-slate-200 hover:border-slate-300 bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0B1F3A]">{tpl.title}</span>
                  {reportType === tpl.id && (
                    <CheckCircle2 className="w-4 h-4 text-[#155EEF]" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">{tpl.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Synthesis Notice */}
        <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-800">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            AI synthesis engine automatically correlates monitored projects, attributing top SHAP delay factors for official inter-ministerial review meetings.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            isLoading={isGenerating}
            onClick={handleDownload}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export Signed PDF Brief
          </Button>
        </div>
      </div>
    </div>
  );
};
