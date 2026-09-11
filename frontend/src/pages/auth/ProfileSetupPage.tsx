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
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { INDIAN_STATES_REGIONS, INFRA_SECTORS } from '../../data/constants';
import { UserRole, ROLE_DEFINITIONS, AVAILABLE_ROLES } from '../../config/roles';

interface RoleOption {
  role: UserRole;
  title: string;
  description: string;
  badge: string;
  scope: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    role: 'Senior Decision Maker',
    title: 'Senior Decision Maker',
    description: 'Executive portfolio oversight, macroeconomic risk briefings, national delay exposure & cabinet-level recommendations.',
    badge: 'Executive',
    scope: 'National Portfolio & Inter-Ministerial Review',
    icon: ShieldCheck,
  },
  {
    role: 'Project Manager',
    title: 'Project Manager',
    description: 'Milestone tracking, contractor delay escalations, critical path slippage & operational cost-variance mitigation.',
    badge: 'Operations',
    scope: 'Direct Project Execution & Milestones',
    icon: Briefcase,
  },
  {
    role: 'Monitoring Officer',
    title: 'Monitoring Officer',
    description: 'MoSPI PAIMANA reporting compliance, physical progress inspection, multi-month variance tracking & field alerts.',
    badge: 'Field / KPI',
    scope: 'PAIMANA Adherence & Monthly Telemetry',
    icon: Activity,
  },
  {
    role: 'Ministry / Department',
    title: 'Ministry / Department',
    description: 'Sectoral capital expenditure, inter-ministerial clearances, state infrastructure allocations & statutory governance.',
    badge: 'Policy',
    scope: 'Sector Allocations & Sanction Compliance',
    icon: Building2,
  },
  {
    role: 'Auditor / Viewer',
    title: 'Auditor / Viewer',
    description: 'Statutory compliance audits, 4-month PAIMANA historical variance verification, fund utilization & strict read-only audit ledger.',
    badge: 'Strict Read-Only Audit',
    scope: 'Independent Audit & Ledger Immutability',
    icon: Eye,
  },
  {
    role: 'Administrator',
    title: 'Administrator',
    description: 'Platform security management, user roles, system telemetry, data ingestion pipeline verification & audit trails.',
    badge: 'System Admin',
    scope: 'Security, User Roles & System Health',
    icon: Sliders,
  },
];

export const ProfileSetupPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  // Session Lock Guard: Once operational role is selected and locked for this session,
  // user cannot re-enter role selection without logging out.
  React.useEffect(() => {
    if (user?.isProfileComplete) {
      navigate('/dashboard', { replace: true });
    }
  }, [user?.isProfileComplete, navigate]);

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [organization, setOrganization] = useState(
    user?.organization || 'National Infrastructure Pipeline / MoSPI',
  );
  // Single-select role state: initialized to user role or Senior Decision Maker
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(user?.role || 'Senior Decision Maker');
  const [stateRegion, setStateRegion] = useState(user?.stateRegion || INDIAN_STATES_REGIONS[0]);
  const [preferredSectors, setPreferredSectors] = useState<string[]>(
    user?.preferredSectors && user.preferredSectors.length > 0
      ? user.preferredSectors
      : [INFRA_SECTORS[0], INFRA_SECTORS[1]],
  );
  const [errors, setErrors] = useState<{ fullName?: string; organization?: string; role?: string }>({});

  // Strictly single-select selection handler: selecting one immediately deselects all others
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setErrors((prev) => ({ ...prev, role: undefined }));
  };

  // Live profile completion score
  const completionPercentage = useMemo(() => {
    let score = 0;
    if (fullName.trim().length > 2) score += 25;
    if (organization.trim().length > 2) score += 25;
    if (selectedRole) score += 20;
    if (stateRegion) score += 15;
    if (preferredSectors.length > 0) score += 15;
    return Math.min(100, score);
  }, [fullName, organization, selectedRole, stateRegion, preferredSectors]);

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

    const finalRole: UserRole = selectedRole || user?.role || 'Senior Decision Maker';
    const finalName = fullName.trim() || user?.fullName || 'Infrastructure Officer';
    const finalOrg = organization.trim() || user?.organization || 'National Infrastructure Pipeline / MoSPI';

    const roleDef = ROLE_DEFINITIONS[finalRole] || ROLE_DEFINITIONS['Senior Decision Maker'];

    // 1. Update centralized profile & lock operational role for session
    updateProfile({
      fullName: finalName,
      organization: finalOrg,
      role: finalRole,
      stateRegion: stateRegion || INDIAN_STATES_REGIONS[0],
      preferredSectors: preferredSectors.length > 0 ? preferredSectors : [INFRA_SECTORS[0]],
      isProfileComplete: true,
    });

    toast.success(
      'Role Confirmed & Locked',
      `Session established as ${finalRole}. Loading command center...`,
    );

    // 2. Direct guaranteed redirection to Main Dashboard
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[var(--neo-bg,#EEF2F6)] flex items-center justify-center p-4 sm:p-8 font-sans transition-colors">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-5xl bg-[var(--neo-surface,#F1F5F9)] rounded-[24px] border border-white/80 shadow-[8px_8px_24px_rgba(166,180,200,0.35),-8px_-8px_24px_rgba(255,255,255,0.95)] p-6 sm:p-10 my-8 text-[var(--neo-text-primary,#0F172A)]"
      >
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(200,212,226,0.5)]">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1557D6] to-[#0D3B94] text-white flex items-center justify-center font-bold shadow-[3px_3px_8px_rgba(21,87,214,0.35)]">
                <UserCheck className="w-6 h-6" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-[var(--neo-text-primary,#0F172A)] tracking-tight">
                    Officer Profile & Role Assignment
                  </h2>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#1557D6]/10 text-[#1557D6] border border-[#1557D6]/20">
                    RBAC Guaranteed
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--neo-text-secondary,#475569)] mt-0.5">
                  Select your single authoritative role to calibrate dashboard views, permissions, and AI agent focus.
                </p>
              </div>
            </div>
          </div>

          {/* Profile Completion Meter */}
          <div className="bg-[var(--neo-surface-raised,#F8FAFC)] border border-white/80 rounded-2xl p-3.5 min-w-[220px] shadow-[inset_1px_1px_3px_rgba(166,180,200,0.2)]">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-[var(--neo-text-secondary,#475569)]">Profile Readiness</span>
              <span className="text-[#1557D6] font-mono font-black">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-[var(--neo-surface-inset,#E5EBF2)] h-2 rounded-full overflow-hidden shadow-[inset_1px_1px_2px_rgba(166,180,200,0.4)]">
              <motion.div
                className="bg-gradient-to-r from-[#1557D6] to-[#2563EB] h-full rounded-full"
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 mt-6" noValidate>
          {/* Section 1: Single-Select Role Cards */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <label className="block text-xs font-black text-[var(--neo-text-primary,#0F172A)] uppercase tracking-wider">
                  1. Authoritative Operational Role (Select Exactly One)
                </label>
                <p className="text-xs text-[var(--neo-text-secondary,#475569)]">
                  Selecting a role immediately configures your authorization scope, sidebar views, and AI intelligence layer.
                </p>
              </div>
              {selectedRole ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-xl bg-blue-50 text-[#1557D6] border border-blue-200 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1557D6]" />
                  Active: {selectedRole}
                </span>
              ) : (
                <span className="text-xs font-bold px-3 py-1 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                  No Role Selected
                </span>
              )}
            </div>

            {/* Strict Radio Cards Grid */}
            <div
              role="radiogroup"
              aria-label="Authoritative Operational Role Selection"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
            >
              {ROLE_OPTIONS.map((item) => {
                const Icon = item.icon;
                const isSelected = selectedRole === item.role;
                return (
                  <div
                    key={item.role}
                    onClick={() => handleRoleSelect(item.role)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#1557D6] bg-white shadow-[inset_2px_2px_4px_rgba(21,87,214,0.1),_4px_4px_12px_rgba(21,87,214,0.15)] ring-2 ring-[#1557D6]/30'
                        : 'border-white/80 bg-[var(--neo-surface-raised,#F8FAFC)] hover:border-slate-300 shadow-[3px_3px_8px_rgba(166,180,200,0.25),-3px_-3px_8px_rgba(255,255,255,0.9)]'
                    }`}
                  >
                    {/* Hidden Native Radio Input for Accessibility */}
                    <input
                      type="radio"
                      name="authoritative-role"
                      id={`role-radio-${item.role.replace(/\s+/g, '-').toLowerCase()}`}
                      value={item.role}
                      checked={isSelected}
                      onChange={() => handleRoleSelect(item.role)}
                      className="sr-only"
                      aria-checked={isSelected}
                    />

                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-[#1557D6] text-white shadow-[0_2px_6px_rgba(21,87,214,0.4)]'
                              : 'bg-[var(--neo-surface-inset,#E5EBF2)] text-[var(--neo-text-secondary,#475569)] group-hover:text-[#1557D6]'
                          }`}
                        >
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                            isSelected
                              ? 'bg-blue-100 text-[#1557D6] border-blue-200'
                              : 'bg-slate-100 text-[var(--neo-text-secondary,#475569)] border-slate-200'
                          }`}
                        >
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-[var(--neo-text-primary,#0F172A)] mb-1 flex items-center gap-1.5">
                        {item.title}
                        {item.role === 'Auditor / Viewer' && (
                          <Lock className="w-3 h-3 text-amber-600 inline" title="Strict Read-Only" />
                        )}
                      </h3>
                      <p className="text-xs text-[var(--neo-text-secondary,#475569)] leading-relaxed mb-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[rgba(200,212,226,0.4)] flex items-center justify-between text-[11px]">
                      <span className="text-[10px] font-medium text-[var(--neo-text-tertiary,#64748B)] truncate max-w-[170px]">
                        Scope: {item.scope}
                      </span>
                      <div className="flex items-center gap-1">
                        {isSelected ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-[#1557D6]">
                            <Check className="w-3.5 h-3.5" />
                            Selected
                          </span>
                        ) : (
                          <span className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-blue-400 flex items-center justify-center" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {errors.role && (
              <p className="text-xs font-semibold text-red-600 mt-2">{errors.role}</p>
            )}
          </div>

          {/* Section 2: Officer Information */}
          <div className="pt-4 border-t border-[rgba(200,212,226,0.5)]">
            <label className="block text-xs font-black text-[var(--neo-text-primary,#0F172A)] uppercase tracking-wider mb-1">
              2. Officer Information & Jurisdiction
            </label>
            <p className="text-xs text-[var(--neo-text-secondary,#475569)] mb-4">
              Credentials applied to audit logs, executive exports, and inter-departmental notifications.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--neo-text-primary,#0F172A)] mb-1">
                  Full Name & Designation *
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Dr. Rajesh Kumar, IAS"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  error={errors.fullName}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--neo-text-primary,#0F172A)] mb-1">
                  Ministry / Department / Agency *
                </label>
                <Input
                  type="text"
                  placeholder="e.g. MoSPI / NITI Aayog / NHAI"
                  value={organization}
                  onChange={(e) => {
                    setOrganization(e.target.value);
                    if (errors.organization) setErrors((prev) => ({ ...prev, organization: undefined }));
                  }}
                  error={errors.organization}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--neo-text-primary,#0F172A)] mb-1">
                  State / Regional Jurisdiction
                </label>
                <Select
                  value={stateRegion}
                  onChange={(e) => setStateRegion(e.target.value)}
                  options={INDIAN_STATES_REGIONS.map((state) => ({ value: state, label: state }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--neo-text-primary,#0F172A)] mb-1">
                  Official Email (Fixed by Portal Session)
                </label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[var(--neo-surface-inset,#E5EBF2)] border border-[rgba(200,212,226,0.6)] text-xs font-mono text-[var(--neo-text-secondary,#475569)]">
                  <Mail className="w-4 h-4 text-[#1557D6] shrink-0" />
                  <span className="truncate">{user?.email || 'officer@gov.in'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Prioritized Infrastructure Sectors */}
          <div className="pt-4 border-t border-[rgba(200,212,226,0.5)]">
            <div className="flex items-center justify-between mb-2">
              <div>
                <label className="block text-xs font-black text-[var(--neo-text-primary,#0F172A)] uppercase tracking-wider">
                  3. Prioritized Infrastructure Sectors
                </label>
                <p className="text-xs text-[var(--neo-text-secondary,#475569)]">
                  Calibrates the telemetry stream, national risk map pins, and predictive delay models.
                </p>
              </div>
              <span className="text-xs font-bold text-[#1557D6] px-2 py-0.5 rounded-md bg-blue-50 border border-blue-100">
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
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'border-[#1557D6] bg-blue-50 text-[#1557D6] font-semibold shadow-xs'
                        : 'border-white/80 bg-[var(--neo-surface-raised,#F8FAFC)] text-[var(--neo-text-secondary,#475569)] hover:border-slate-300'
                    }`}
                  >
                    <span className="truncate mr-2">{sector}</span>
                    {isSelected ? (
                      <Check className="w-4 h-4 text-[#1557D6] shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-[rgba(200,212,226,0.5)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[var(--neo-text-secondary,#475569)]">
              <Sparkles className="w-4 h-4 text-[#1557D6]" />
              <span>
                {selectedRole
                  ? `Entering as ${selectedRole} • Authorized for ${ROLE_DEFINITIONS[selectedRole].scope}`
                  : 'Please select an operational role above'}
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={!selectedRole}
              className="w-full sm:w-auto px-8 py-3 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_12px_rgba(21,87,214,0.35)]"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {selectedRole ? `Continue as ${selectedRole}` : 'Select a Role to Continue'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
