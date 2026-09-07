import React, { useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle2, X, Database, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';

interface UploadDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadDataModal: React.FC<UploadDataModalProps> = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  if (!isOpen) return null;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleUploadSubmit = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast.success(
        'Data Ingested Successfully',
        `Parsed ${selectedFile?.name || 'Portfolio_Q1.xlsx'} and recalculated risk models across monitored project portfolio.`,
      );
      setSelectedFile(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060F1D]/70 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-[20px] border border-[#E2E8F0] gov-shadow p-6 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EBF2FF] text-[#155EEF] flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#0B1F3A]">Upload Project Telemetry</h3>
              <p className="text-[11px] text-slate-500">Data Ingestion Pipeline</p>
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

        {/* Drop Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
            dragOver ? 'border-[#155EEF] bg-blue-50/50' : 'border-slate-300 hover:border-slate-400 bg-[#F8FAFC]'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <FileSpreadsheet className="w-6 h-6 text-[#155EEF]" />
          </div>
          <p className="text-xs font-bold text-[#0B1F3A]">
            {selectedFile ? selectedFile.name : 'Drag and drop DPR or MPR spreadsheet here'}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Supports .xlsx, .csv, .json, and Ministry MPR format
          </p>
          <div className="mt-3">
            <label className="inline-block px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-[#0B1F3A] hover:bg-slate-50 cursor-pointer shadow-2xs">
              <span>Browse Local Files</span>
              <input
                type="file"
                className="hidden"
                accept=".csv,.xlsx,.xls,.json"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* Auto Sync Info */}
        <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5 text-xs text-slate-700">
          <Database className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-[#0B1F3A]">Automated API Live Sync</p>
            <p className="text-[11px] text-slate-600">
              National Core database automatically synchronizes with central database nodes at 00:00 IST daily.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            isLoading={isUploading}
            onClick={handleUploadSubmit}
            leftIcon={<Upload className="w-3.5 h-3.5" />}
          >
            Ingest & Run Pipeline
          </Button>
        </div>
      </div>
    </div>
  );
};
