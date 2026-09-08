import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Check,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';
import { InfraProject } from '../../types/projects';
import { HealthScoreBadge } from '../ui/HealthScoreBadge';
import { RiskBadge } from '../ui/RiskBadge';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated?: (project: InfraProject) => void;
}

type FormStep = 1 | 2 | 3 | 4 | 5 | 6;

export const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onProjectCreated }) => {
  const navigate = useNavigate();
  const { projects, addProject } = useProjectStore();

  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdProject, setCreatedProject] = useState<InfraProject | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form Data States
  const [projectName, setProjectName] = useState('');
  const [projectCode, setProjectCode] = useState('');
  const [ministry, setMinistry] = useState('');
  const [sector, setSector] = useState('');

  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [sanctionedCost, setSanctionedCost] = useState('');
  const [expenditure, setExpenditure] = useState('');
  const [revisedCost, setRevisedCost] = useState('');

  const [physicalProgress, setPhysicalProgress] = useState('');
  const [startDate, setStartDate] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const [milestones, setMilestones] = useState<Array<{ name: string; planned: string; actual: string }>>([
    { name: '', planned: '', actual: '' },
  ]);

  const [currentIssues, setCurrentIssues] = useState('');
  const [delays, setDelays] = useState('');
  const [constraints, setConstraints] = useState('');

  const steps = [
    { id: 1, title: 'Project Details', icon: Building2 },
    { id: 2, title: 'Location', icon: MapPin },
    { id: 3, title: 'Financials', icon: DollarSign },
    { id: 4, title: 'Progress', icon: Calendar },
    { id: 5, title: 'Milestones', icon: Check },
    { id: 6, title: 'Risk Inputs', icon: AlertTriangle },
  ];

  if (!isOpen) return null;

  const resetForm = () => {
    setCurrentStep(1);
    setErrors({});
    setCreatedProject(null);
    setIsSubmitting(false);
    setProjectName('');
    setProjectCode('');
    setMinistry('');
    setSector('');
    setState('');
    setDistrict('');
    setLatitude('');
    setLongitude('');
    setSanctionedCost('');
    setExpenditure('');
    setRevisedCost('');
    setPhysicalProgress('');
    setStartDate('');
    setTargetDate('');
    setMilestones([{ name: '', planned: '', actual: '' }]);
    setCurrentIssues('');
    setDelays('');
    setConstraints('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validateStep = (step: FormStep): boolean => {
    const newErrors: Record<string, string> = { ...errors };

    if (step === 1) {
      delete newErrors.projectName;
      delete newErrors.projectCode;
      delete newErrors.ministry;
      delete newErrors.sector;

      if (!projectName.trim()) {
        newErrors.projectName = 'Project name is required';
      }
      if (!projectCode.trim()) {
        newErrors.projectCode = 'Project ID / Code is required';
      } else {
        const cleanCode = projectCode.trim().toUpperCase();
        const duplicate = projects.some(
          (p) => p.code.toUpperCase() === cleanCode || p.id.toUpperCase() === `PRJ-${cleanCode}`
        );
        if (duplicate) {
          newErrors.projectCode = 'A project with this ID or Code already exists';
        }
      }
      if (!ministry) {
        newErrors.ministry = 'Please select a Ministry / Agency';
      }
      if (!sector) {
        newErrors.sector = 'Please select a Sector';
      }
    } else if (step === 2) {
      delete newErrors.state;
      delete newErrors.district;
      delete newErrors.coords;

      if (!state) {
        newErrors.state = 'Please select a State / UT';
      }
      if (!district.trim()) {
        newErrors.district = 'District is required';
      }
      if (latitude && isNaN(Number(latitude))) {
        newErrors.coords = 'Latitude must be a valid decimal number';
      }
      if (longitude && isNaN(Number(longitude))) {
        newErrors.coords = 'Longitude must be a valid decimal number';
      }
    } else if (step === 3) {
      delete newErrors.sanctionedCost;
      delete newErrors.expenditure;
      delete newErrors.revisedCost;

      const sCost = Number(sanctionedCost);
      const exp = Number(expenditure);

      if (!sanctionedCost || isNaN(sCost) || sCost <= 0) {
        newErrors.sanctionedCost = 'Sanctioned Cost must be a positive number greater than 0';
      }
      if (expenditure === '' || isNaN(exp) || exp < 0) {
        newErrors.expenditure = 'Expenditure till date must be a non-negative number';
      }
      if (revisedCost && (isNaN(Number(revisedCost)) || Number(revisedCost) < 0)) {
        newErrors.revisedCost = 'Revised Cost must be a positive number';
      }
    } else if (step === 4) {
      delete newErrors.physicalProgress;
      delete newErrors.startDate;
      delete newErrors.targetDate;

      const prog = Number(physicalProgress);
      if (physicalProgress === '' || isNaN(prog) || prog < 0 || prog > 100) {
        newErrors.physicalProgress = 'Physical Progress must be between 0% and 100%';
      }
      if (!startDate) {
        newErrors.startDate = 'Project Start Date is required';
      }
      if (!targetDate) {
        newErrors.targetDate = 'Target Completion Date is required';
      } else if (startDate && new Date(targetDate) < new Date(startDate)) {
        newErrors.targetDate = 'Target date cannot be earlier than project start date';
      }
    } else if (step === 5) {
      delete newErrors.milestones;
      const validMilestones = milestones.filter((m) => m.name.trim() !== '');
      if (validMilestones.length === 0) {
        newErrors.milestones = 'Please enter at least one key milestone with a name and planned date';
      } else {
        const hasMissingDate = validMilestones.some((m) => !m.planned);
        if (hasMissingDate) {
          newErrors.milestones = 'Each milestone must have a planned target date';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 6) {
        setCurrentStep((currentStep + 1) as FormStep);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as FormStep);
    }
  };

  const handleSubmit = () => {
    for (let step = 1; step <= 5; step++) {
      if (!validateStep(step as FormStep)) {
        setCurrentStep(step as FormStep);
        return;
      }
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const validMilestones = milestones
          .filter((m) => m.name.trim() !== '')
          .map((m) => ({
            name: m.name.trim(),
            planned: m.planned || targetDate,
            actual: m.actual.trim() || undefined,
          }));

        const newProj = addProject({
          name: projectName.trim(),
          code: projectCode.trim().toUpperCase(),
          ministry,
          sector,
          state,
          district: district.trim(),
          latitude: latitude.trim() || undefined,
          longitude: longitude.trim() || undefined,
          sanctionedCostCr: Number(sanctionedCost),
          expenditureCr: Number(expenditure),
          revisedCostCr: revisedCost ? Number(revisedCost) : undefined,
          physicalProgress: Number(physicalProgress),
          startDate,
          targetDate,
          milestones: validMilestones,
          currentIssues: currentIssues.trim(),
          delays: delays.trim(),
          constraints: constraints.trim(),
        });

        setIsSubmitting(false);
        setCreatedProject(newProj);
        if (onProjectCreated) {
          onProjectCreated(newProj);
        }
      } catch (err) {
        console.error('Failed to create project', err);
        setIsSubmitting(false);
        setErrors({ submit: 'An error occurred while creating the project. Please check your inputs.' });
      }
    }, 1200);
  };

  const addMilestone = () => {
    setMilestones([...milestones, { name: '', planned: '', actual: '' }]);
  };

  const updateMilestone = (index: number, field: 'name' | 'planned' | 'actual', value: string) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };

  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((_, i) => i !== index));
    }
  };

  // SUCCESS CONFIRMATION MODAL
  if (createdProject) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-6 sm:p-8 max-w-lg w-full text-center space-y-5 shadow-2xl border border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-950/60 rounded-2xl flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-9 h-9 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              Project Onboarded
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Project successfully added to Project Intelligence.
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Automated multi-dimensional prototype risk scoring, schedule telemetry, and forward escalation trajectories have been calculated.
            </p>
          </div>

          {/* Project Summary Chip Card */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-left space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                  {createdProject.code}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mt-1 leading-snug">
                  {createdProject.name}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {createdProject.sector} • {createdProject.state}
                </span>
              </div>
              <HealthScoreBadge score={createdProject.healthScore} size="sm" showLabel />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700 text-center">
              <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Cost Risk</span>
                <span className="text-xs font-black font-mono text-slate-800 dark:text-slate-200">
                  {createdProject.costRiskScore}/100
                </span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Time Risk</span>
                <span className="text-xs font-black font-mono text-slate-800 dark:text-slate-200">
                  {createdProject.timeRiskScore}/100
                </span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Execution</span>
                <span className="text-xs font-black font-mono text-slate-800 dark:text-slate-200">
                  {createdProject.executionRiskScore}/100
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5 pt-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Primary Driver: <strong>{createdProject.primaryRiskDriver}</strong></span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
            <button
              id="view-created-project-btn"
              onClick={() => {
                const targetId = createdProject.id;
                handleClose();
                navigate(`/projects/${targetId}`);
              }}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <span>View Project &rarr;</span>
            </button>

            <button
              onClick={handleClose}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              Back to Projects Table
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#0F1D2E] text-slate-900 dark:text-slate-100 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add New Project</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Complete all steps to onboard project into the AI intelligence pipeline
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Steps Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 overflow-x-auto bg-slate-50/50 dark:bg-slate-900/30">
          <div className="flex items-center gap-2 min-w-max">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              return (
                <React.Fragment key={step.id}>
                  <button
                    type="button"
                    onClick={() => {
                      if (step.id < currentStep) {
                        setCurrentStep(step.id as FormStep);
                      }
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-left ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-semibold'
                        : isCompleted
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 cursor-pointer hover:bg-emerald-100'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 opacity-60'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    <span className="text-xs whitespace-nowrap">{step.title}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Form Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Project Details */}
          {currentStep === 1 && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Project Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                    if (errors.projectName) setErrors((prev) => ({ ...prev, projectName: '' }));
                  }}
                  placeholder="e.g., Delhi-Mumbai Expressway Package IV"
                  className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 ${
                    errors.projectName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.projectName && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.projectName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Project ID / Code <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={projectCode}
                  onChange={(e) => {
                    setProjectCode(e.target.value);
                    if (errors.projectCode) setErrors((prev) => ({ ...prev, projectCode: '' }));
                  }}
                  placeholder="e.g., DME-PKG-IV"
                  className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 ${
                    errors.projectCode ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.projectCode && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.projectCode}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Ministry / Agency <span className="text-rose-500">*</span>
                </label>
                <select
                  value={ministry}
                  onChange={(e) => {
                    setMinistry(e.target.value);
                    if (errors.ministry) setErrors((prev) => ({ ...prev, ministry: '' }));
                  }}
                  className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 ${
                    errors.ministry ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                >
                  <option value="">Select Ministry</option>
                  <option value="Road Transport & Highways">Road Transport & Highways</option>
                  <option value="Railways">Railways</option>
                  <option value="Power">Power</option>
                  <option value="Petroleum & Natural Gas">Petroleum & Natural Gas</option>
                  <option value="Urban Development">Urban Development</option>
                  <option value="Water Resources">Water Resources</option>
                  <option value="Civil Aviation">Civil Aviation</option>
                  <option value="Shipping & Ports">Shipping & Ports</option>
                  <option value="Telecommunications">Telecommunications</option>
                </select>
                {errors.ministry && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.ministry}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Sector <span className="text-rose-500">*</span>
                </label>
                <select
                  value={sector}
                  onChange={(e) => {
                    setSector(e.target.value);
                    if (errors.sector) setErrors((prev) => ({ ...prev, sector: '' }));
                  }}
                  className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 ${
                    errors.sector ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                >
                  <option value="">Select Sector</option>
                  <option value="Roads & Highways">Roads & Highways</option>
                  <option value="Railways">Railways</option>
                  <option value="Urban Metro">Urban Metro</option>
                  <option value="Power">Power</option>
                  <option value="Oil & Gas">Oil & Gas</option>
                  <option value="Irrigation">Irrigation</option>
                  <option value="Airports">Airports</option>
                  <option value="Ports">Ports</option>
                  <option value="Digital & Telecom Infra">Digital & Telecom Infra</option>
                </select>
                {errors.sector && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.sector}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  State / UT <span className="text-rose-500">*</span>
                </label>
                <select
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    if (errors.state) setErrors((prev) => ({ ...prev, state: '' }));
                  }}
                  className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 ${
                    errors.state ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                >
                  <option value="">Select State</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Jammu & Kashmir / Ladakh">Jammu & Kashmir / Ladakh</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Assam">Assam</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Kerala">Kerala</option>
                </select>
                {errors.state && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.state}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  District <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                    if (errors.district) setErrors((prev) => ({ ...prev, district: '' }));
                  }}
                  placeholder="e.g., Surat"
                  className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 ${
                    errors.district ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.district && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.district}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="e.g., 21.1702"
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="e.g., 72.8311"
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>
              {errors.coords && (
                <p className="text-xs text-rose-500 font-medium">{errors.coords}</p>
              )}
            </div>
          )}

          {/* Step 3: Financials */}
          {currentStep === 3 && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Sanctioned Cost (₹ Crores) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  value={sanctionedCost}
                  onChange={(e) => {
                    setSanctionedCost(e.target.value);
                    if (errors.sanctionedCost) setErrors((prev) => ({ ...prev, sanctionedCost: '' }));
                  }}
                  placeholder="e.g., 4500"
                  className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 ${
                    errors.sanctionedCost ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.sanctionedCost && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.sanctionedCost}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Expenditure Till Date (₹ Crores) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  value={expenditure}
                  onChange={(e) => {
                    setExpenditure(e.target.value);
                    if (errors.expenditure) setErrors((prev) => ({ ...prev, expenditure: '' }));
                  }}
                  placeholder="e.g., 2800"
                  className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 ${
                    errors.expenditure ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.expenditure && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.expenditure}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Revised Cost (₹ Crores) <span className="text-slate-400 text-xs">(if applicable)</span>
                </label>
                <input
                  type="number"
                  value={revisedCost}
                  onChange={(e) => {
                    setRevisedCost(e.target.value);
                    if (errors.revisedCost) setErrors((prev) => ({ ...prev, revisedCost: '' }));
                  }}
                  placeholder="e.g., 4850"
                  className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 ${
                    errors.revisedCost ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.revisedCost && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.revisedCost}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Progress */}
          {currentStep === 4 && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Physical Progress (%) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={physicalProgress}
                  onChange={(e) => {
                    setPhysicalProgress(e.target.value);
                    if (errors.physicalProgress) setErrors((prev) => ({ ...prev, physicalProgress: '' }));
                  }}
                  placeholder="e.g., 62"
                  className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 ${
                    errors.physicalProgress ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.physicalProgress && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.physicalProgress}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Project Start Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    if (errors.startDate) setErrors((prev) => ({ ...prev, startDate: '' }));
                  }}
                  className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 ${
                    errors.startDate ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.startDate && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.startDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Target Completion Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => {
                    setTargetDate(e.target.value);
                    if (errors.targetDate) setErrors((prev) => ({ ...prev, targetDate: '' }));
                  }}
                  className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 ${
                    errors.targetDate ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.targetDate && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.targetDate}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Milestones */}
          {currentStep === 5 && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Key Project Milestones <span className="text-rose-500">*</span>
                  </label>
                  <p className="text-xs text-slate-400">At least one milestone with planned date is required</p>
                </div>
                <button
                  type="button"
                  onClick={addMilestone}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 rounded-lg transition-colors cursor-pointer"
                >
                  + Add Milestone
                </button>
              </div>

              {errors.milestones && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg text-xs text-rose-600 dark:text-rose-400 font-medium">
                  {errors.milestones}
                </div>
              )}

              {milestones.map((milestone, index) => (
                <div key={index} className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl space-y-3 relative border border-slate-200 dark:border-slate-800">
                  {milestones.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMilestone(index)}
                      className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                      Milestone Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={milestone.name}
                      onChange={(e) => updateMilestone(index, 'name', e.target.value)}
                      placeholder="e.g., Land Acquisition Complete"
                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                        Planned Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={milestone.planned}
                        onChange={(e) => updateMilestone(index, 'planned', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                        Actual Date <span className="text-slate-400">(if completed)</span>
                      </label>
                      <input
                        type="date"
                        value={milestone.actual}
                        onChange={(e) => updateMilestone(index, 'actual', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 6: Risk Inputs */}
          {currentStep === 6 && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Current Issues / Challenges
                </label>
                <textarea
                  value={currentIssues}
                  onChange={(e) => setCurrentIssues(e.target.value)}
                  placeholder="Describe any current technical, regulatory, land acquisition, or operational challenges..."
                  rows={3}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Delays & Schedule Slippages
                </label>
                <textarea
                  value={delays}
                  onChange={(e) => setDelays(e.target.value)}
                  placeholder="Document any schedule delays, reasons, and expected recovery timeline..."
                  rows={3}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Resource & Other Constraints
                </label>
                <textarea
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  placeholder="List any funding, manpower, material, or environmental constraints..."
                  rows={3}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none bg-white dark:bg-slate-900"
                />
              </div>

              {errors.submit && (
                <p className="text-xs text-rose-500 font-medium">{errors.submit}</p>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Step {currentStep} of 6
          </div>
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
            )}

            {currentStep < 6 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 rounded-lg transition-all cursor-pointer shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Analysis...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Create Project & Run AI Analysis</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
