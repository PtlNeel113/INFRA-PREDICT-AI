import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Building2, MapPin, DollarSign, Calendar, AlertTriangle, Sparkles } from 'lucide-react';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStep = 1 | 2 | 3 | 4 | 5 | 6;

export const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

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
    { name: '', planned: '', actual: '' }
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

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep((currentStep + 1) as FormStep);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((currentStep - 1) as FormStep);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate AI Analysis
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessScreen(true);
      setTimeout(() => {
        setShowSuccessScreen(false);
        onClose();
        // Reset form
        setCurrentStep(1);
      }, 3000);
    }, 2000);
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

  if (showSuccessScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-10 max-w-md mx-4 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-emerald-600 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Project Added Successfully!</h2>
          <p className="text-sm text-slate-600">
            Running AI Analysis Pipeline...
          </p>
          <div className="space-y-2 text-xs text-slate-500">
            <div className="flex items-center justify-between px-4 py-2 bg-emerald-50 rounded-lg">
              <span>Health Score Calculation</span>
              <Check className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-center justify-between px-4 py-2 bg-emerald-50 rounded-lg">
              <span>Cost Risk Analysis</span>
              <Check className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-center justify-between px-4 py-2 bg-emerald-50 rounded-lg">
              <span>Time Risk Forecast</span>
              <Check className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-center justify-between px-4 py-2 bg-amber-50 rounded-lg animate-pulse">
              <span>Early Warning Detection</span>
              <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Add New Project</h2>
            <p className="text-xs text-slate-500 mt-1">
              Complete all steps to onboard project into the AI intelligence pipeline
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-slate-100 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              return (
                <React.Fragment key={step.id}>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700 font-semibold'
                        : isCompleted
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-50 text-slate-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                    <span className="text-xs whitespace-nowrap">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-slate-300" />
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
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Project Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., Delhi-Mumbai Expressway Package IV"
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Project ID / Code <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={projectCode}
                  onChange={(e) => setProjectCode(e.target.value)}
                  placeholder="e.g., DME-PKG-IV"
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Ministry / Agency <span className="text-rose-500">*</span>
                </label>
                <select
                  value={ministry}
                  onChange={(e) => setMinistry(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select Ministry</option>
                  <option value="Road Transport & Highways">Road Transport & Highways</option>
                  <option value="Railways">Railways</option>
                  <option value="Power">Power</option>
                  <option value="Petroleum & Natural Gas">Petroleum & Natural Gas</option>
                  <option value="Urban Development">Urban Development</option>
                  <option value="Water Resources">Water Resources</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Sector <span className="text-rose-500">*</span>
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  State / UT <span className="text-rose-500">*</span>
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  District <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g., Surat"
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="e.g., 21.1702"
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="e.g., 72.8311"
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Financials */}
          {currentStep === 3 && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Sanctioned Cost (₹ Crores) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  value={sanctionedCost}
                  onChange={(e) => setSanctionedCost(e.target.value)}
                  placeholder="e.g., 4500"
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Expenditure Till Date (₹ Crores) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  value={expenditure}
                  onChange={(e) => setExpenditure(e.target.value)}
                  placeholder="e.g., 2800"
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Revised Cost (₹ Crores) <span className="text-slate-400 text-xs">(if applicable)</span>
                </label>
                <input
                  type="number"
                  value={revisedCost}
                  onChange={(e) => setRevisedCost(e.target.value)}
                  placeholder="e.g., 4850"
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 4: Progress */}
          {currentStep === 4 && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Physical Progress (%) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={physicalProgress}
                  onChange={(e) => setPhysicalProgress(e.target.value)}
                  placeholder="e.g., 62"
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Project Start Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Target Completion Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 5: Milestones */}
          {currentStep === 5 && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-slate-700">
                  Key Project Milestones
                </label>
                <button
                  onClick={addMilestone}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 px-3 py-1.5 bg-indigo-50 rounded-lg transition-colors"
                >
                  + Add Milestone
                </button>
              </div>
              {milestones.map((milestone, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg space-y-3 relative">
                  {milestones.length > 1 && (
                    <button
                      onClick={() => removeMilestone(index)}
                      className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-md hover:bg-slate-200 transition-colors"
                    >
                      <X className="w-4 h-4 text-slate-400" />
                    </button>
                  )}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Milestone Name
                    </label>
                    <input
                      type="text"
                      value={milestone.name}
                      onChange={(e) => updateMilestone(index, 'name', e.target.value)}
                      placeholder="e.g., Land Acquisition Complete"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Planned Date
                      </label>
                      <input
                        type="date"
                        value={milestone.planned}
                        onChange={(e) => updateMilestone(index, 'planned', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Actual Date <span className="text-slate-400">(if completed)</span>
                      </label>
                      <input
                        type="date"
                        value={milestone.actual}
                        onChange={(e) => updateMilestone(index, 'actual', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Current Issues / Challenges
                </label>
                <textarea
                  value={currentIssues}
                  onChange={(e) => setCurrentIssues(e.target.value)}
                  placeholder="Describe any current technical, regulatory, or operational challenges..."
                  rows={3}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Delays & Schedule Slippages
                </label>
                <textarea
                  value={delays}
                  onChange={(e) => setDelays(e.target.value)}
                  placeholder="Document any schedule delays, reasons, and expected recovery timeline..."
                  rows={3}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Resource & Other Constraints
                </label>
                <textarea
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  placeholder="List any funding, manpower, material, or environmental constraints..."
                  rows={3}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
          <div className="text-xs text-slate-500">
            Step {currentStep} of 6
          </div>
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
            )}
            {currentStep < 6 ? (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Create Project & Run AI Analysis
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
