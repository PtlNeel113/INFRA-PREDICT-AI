import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  UserCheck,
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Building2,
  MapPin,
  Briefcase,
  Activity,
  Eye,
  Sliders,
  Mail,
  Compass,
} from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { GOV_ROLES, INDIAN_STATES_REGIONS, INFRA_SECTORS } from '../../data/constants';
import { UserRole } from '../../types/auth';

interface RoleOption {
  role: UserRole;
  title: string;
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    role: 'Senior Decision Maker',
    title: 'Senior Decision Maker',
    description: 'Executive risk briefings, strategic portfolio oversight & high-priority interventions.',
    badge: 'Executive',
    icon: ShieldCheck,
  },
  {
    role: 'Project Manager',
    title: 'Project Manager',
    description: 'Milestone tracking, contractor delay escalations & cost-variance mitigation.',
    badge: 'Operations',
    icon: Briefcase,
  },
  {
    role: 'Monitoring Officer',
    title: 'Monitoring Officer',
    description: 'Field KPI inputs, continuous health monitoring & early warning tracking.',
    badge: 'Field / KPI',
    icon: Activity,
  },
  {
    role: 'Ministry / Department',
    title: 'Ministry / Department',
    description: 'Inter-ministerial clearances, statutory compliance & national budget tracking.',
    badge: 'Policy',
    icon: Building2,
  },
  {
    role: 'Auditor / Viewer',
    title: 'Auditor / Viewer',
    description: 'Statutory compliance audits, fund utilization & read-only risk inspection.',
    badge: 'Audit & Watch',
    icon: Eye,
  },
  {
    role: 'Administrator',
    title: 'Administrator',
    description: 'System settings, AI model thresholds, data integrations & user permissions.',
    badge: 'Admin',
    icon: Sliders,
  },
];

export const ProfileSetupPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [organization, setOrganization] = useState(
    user?.organization || 'National Infrastructure Pipeline / MoSPI',
  );
  const [role, setRole] = useState<UserRole>(user?.role || 'Senior Decision Maker');
  const [stateRegion, setStateRegion] = useState(user?.stateRegion || INDIAN_STATES_REGIONS[0]);
  const [preferredSectors, setPreferredSectors] = useState<string[]>(
    user?.preferredSectors && user.preferredSectors.length > 0
      ? user.preferredSectors
      : [INFRA_SECTORS[0], INFRA_SECTORS[1]],
  );
  const [errors, setErrors] = useState<{ fullName?: string; organization?: string }>({});

  // Live profile completion score
  const completionPercentage = useMemo(() => {
    let score = 0;
    if (fullName.trim().length > 2) score += 25;
    if (organization.trim().length > 2) score += 25;
    if (role) score += 20;
    if (stateRegion) score += 15;
    if (preferredSectors.length > 0) score += 15;
    return Math.min(100, score);
  }, [fullName, organization, role, stateRegion, preferredSectors]);

  const toggleSector = (sector: string) => {
    if (preferredSectors.includes(sector)) {
      if (preferredSectors.length === 1) {
        toast.warning('Selection Required', 'You must maintain at least one prioritized infrastructure sector.');
        return;
      }
      setPreferredSectors(preferredSectors.filter((s) => s !== sector));
    } else {
      setPreferredSectors([...preferredSectors, sector]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { fullName?: string; organization?: string } = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!organization.trim()) errs.organization = 'Organization / Department is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error('Missing Fields', 'Please fill out all required profile details.');
      return;
    }

    updateProfile({
      fullName: fullName.trim(),
      organization: organization.trim(),
      role,
      stateRegion,
      preferredSectors,
      isProfileComplete: true,
    });

    toast.success(
      'Profile Initialized',
      `Welcome to INFRA-PREDICT AI Command Center, ${fullName.trim()} (${role})!`,
    );
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#07111F] flex items-center justify-center p-4 sm:p-8 font-sans transition-colors">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl bg-white dark:bg-[#0E1A2B] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 sm:p-10 my-8 text-slate-900 dark:text-white"
      >
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shadow-sm">
                <UserCheck className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Officer Profile & Role Selection
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Select your operational role and jurisdiction to personalize AI risk models and alerts.
                </p>
              </div>
            </div>
          </div>

          {/* Profile Completion Meter */}
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-3 min-w-[200px]">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-600 dark:text-slate-300">Profile Readiness</span>
              <span className="text-blue-600 dark:text-blue-400 font-mono">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <motion.div
                className="bg-blue-600 h-full rounded-full"
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 mt-6" noValidate>
          {/* Section 1: Role Selection Cards */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <label className="block text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  1. Choose Your Operational Role
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Defines default dashboard views, priority queues, and decision recommendations.
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                Selected: {role}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ROLE_OPTIONS.map((item) => {
                const Icon = item.icon;
                const isSelected = role === item.role;
                return (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => setRole(item.role)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative group flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 shadow-sm ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:text-blue-600'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <h3
                        className={`text-sm font-bold leading-tight ${
                          isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-400">
                        {isSelected ? 'Active Role' : 'Click to select'}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Personal & Organization Details */}
          <div>
            <label className="block text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
              2. Officer Details & Jurisdiction
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name & Designation"
                placeholder="e.g. Dr. Rajesh Verma (Director General)"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                }}
                error={errors.fullName}
                required
              />
              <Input
                label="Organization / Department"
                placeholder="e.g. National Infrastructure Pipeline / MoRTH"
                value={organization}
                onChange={(e) => {
                  setOrganization(e.target.value);
                  if (errors.organization) setErrors((prev) => ({ ...prev, organization: undefined }));
                }}
                error={errors.organization}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="w-full text-left">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Official Email ID
                </label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-sm text-slate-600 dark:text-slate-300">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{user?.email || 'officer@gov.in'}</span>
                  <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
              </div>

              <Select
                label="State / Region Jurisdiction"
                options={INDIAN_STATES_REGIONS}
                value={stateRegion}
                onChange={(e) => setStateRegion(e.target.value)}
              />
            </div>
          </div>

          {/* Section 3: Prioritized Infrastructure Sectors */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <label className="block text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  3. Prioritized Infrastructure Sectors
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Filter alerts, maps, and predictive risk indices for chosen sectors.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-500">
                {preferredSectors.length} Selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-2">
              {INFRA_SECTORS.map((sector) => {
                const isSelected = preferredSectors.includes(sector);
                return (
                  <button
                    key={sector}
                    type="button"
                    onClick={() => toggleSector(sector)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all duration-150 text-left cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-semibold shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <span className="truncate mr-2">{sector}</span>
                    {isSelected ? (
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>Calibrates customized risk alerts and decision priorities</span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto px-8"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Continue to Command Center
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
