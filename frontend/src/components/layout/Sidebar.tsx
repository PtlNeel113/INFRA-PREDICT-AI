import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  MapPin,
  FolderGit2,
  AlertTriangle,
  Sparkles,
  SearchCode,
  Scale,
  Bot,
  BarChart3,
  FileSpreadsheet,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserCheck,
  ShieldAlert,
  Lock,
  Banknote,
  CheckCircle2,
  ClipboardCheck,
  History,
  Database,
  Users,
  Activity,
  FileText,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Tooltip } from '../ui/Tooltip';
import { useLanguage } from '../../contexts/LanguageContext';
import { UserRole, ROLE_DEFINITIONS, Permission, roleHasPermission, ROLE_NAVIGATION, RoleNavigationItem } from '../../config/roles';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const ROUTE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  '/dashboard': LayoutDashboard,
  '/national-risk-map': MapPin,
  '/projects': FolderGit2,
  '/alerts': AlertTriangle,
  '/predictions': Sparkles,
  '/explainability': SearchCode,
  '/benchmarking': Scale,
  '/analytics': BarChart3,
  '/reports': FileSpreadsheet,
  '/settings': Settings,
  '/cost-expenditure': Banknote,
  '/recommended-actions': CheckCircle2,
  '/field-verification': ClipboardCheck,
  '/data-validation': ShieldAlert,
  '/risk-history': History,
  '/data-ingestion': Database,
  '/admin/users': Users,
  '/system-health': Activity,
  '/audit-logs': FileText,
};

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed: externalIsCollapsed,
  onToggleCollapse,
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = externalIsCollapsed !== undefined ? externalIsCollapsed : internalCollapsed;
  const toggleCollapse = onToggleCollapse || (() => setInternalCollapsed((prev) => !prev));

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { t } = useLanguage();

  const currentRole: UserRole = user?.role || 'Senior Decision Maker';
  const roleDef = ROLE_DEFINITIONS[currentRole] || ROLE_DEFINITIONS['Senior Decision Maker'];

  const handleLogout = () => {
    logout();
    toast.info('Signed Out', 'You have securely ended your platform session.');
    navigate('/login');
  };

  // Get dynamic navigation items strictly for current role from centralized ROLE_NAVIGATION
  const currentNavItems = ROLE_NAVIGATION[currentRole] || ROLE_NAVIGATION['Senior Decision Maker'];

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 76 : 268 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="flex flex-col shrink-0 border-r border-[rgba(200,212,226,0.6)] select-none h-screen relative z-40 bg-[var(--neo-surface,#F1F5F9)] shadow-[4px_0_14px_rgba(166,180,200,0.2)]"
    >
      {/* Brand Header */}
      <div className="h-16 px-4 border-b border-[rgba(200,212,226,0.45)] flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1557D6] to-[#0D3B94] shadow-[2px_2px_6px_rgba(21,87,214,0.35)] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-w-0"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black tracking-tight text-[var(--neo-text-primary,#0F172A)] truncate">
                  INFRA-PREDICT
                </span>
                <span className="text-[10px] px-1.5 py-0.5 bg-[#1557D6] rounded-md font-bold text-white shrink-0 shadow-xs">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-[var(--neo-text-tertiary,#64748B)] font-semibold uppercase tracking-[0.1em] truncate">
                Gov Intelligence
              </p>
            </motion.div>
          )}
        </div>

        <button
          type="button"
          onClick={toggleCollapse}
          className={cn(
            'p-1.5 rounded-xl text-[var(--neo-text-secondary,#475569)] hover:text-[var(--neo-text-primary,#0F172A)] transition-colors cursor-pointer',
            isCollapsed && 'mx-auto',
          )}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Current Authenticated Operational Role (Static Informational - Locked for Session) */}
      {!isCollapsed ? (
        <div className="px-3 pt-3 pb-1">
          <div className="w-full p-2.5 rounded-xl bg-[var(--neo-surface-inset,#E8EEF5)] border border-[rgba(200,212,226,0.7)] shadow-xs select-none">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-[9px] font-black uppercase tracking-wider text-[var(--neo-text-tertiary,#64748B)]">
                AUTHENTICATED ROLE
              </span>
              {currentRole === 'Auditor / Viewer' && (
                <Lock className="w-2.5 h-2.5 text-amber-600 ml-auto shrink-0" />
              )}
            </div>
            <div className="text-xs font-black text-[var(--neo-text-primary,#0F172A)] truncate">
              {currentRole}
            </div>
            <div className="text-[9px] text-[var(--neo-text-tertiary,#64748B)] font-medium truncate mt-0.5">
              {roleDef.scope}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-2.5 flex justify-center">
          <Tooltip content={`Role: ${currentRole} (Session Locked)`} position="right">
            <div className="w-9 h-9 rounded-xl bg-blue-50/90 border border-blue-200 text-[#1557D6] flex items-center justify-center font-bold text-xs select-none shadow-xs">
              {currentRole[0]}
            </div>
          </Tooltip>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-3 space-y-1.5 overflow-y-auto overflow-x-hidden">
        {!isCollapsed && (
          <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--neo-text-tertiary,#64748B)] flex items-center justify-between">
            <span>{t('nav.sectionTitle')}</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200/60 font-semibold">
              {currentNavItems.length}
            </span>
          </div>
        )}

        {currentNavItems.map((item) => {
          const Icon = ROUTE_ICONS[item.to] || LayoutDashboard;
          const isActive =
            location.pathname === item.to ||
            (item.to === '/dashboard' && location.pathname === '/');

          const linkContent = (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative',
                isActive
                  ? 'neo-active text-[#1557D6] font-semibold border border-[rgba(21,87,214,0.25)] shadow-[inset_2px_2px_4px_rgba(166,180,200,0.4),_inset_-2px_-2px_4px_rgba(255,255,255,0.85)]'
                  : 'text-[var(--neo-text-secondary,#475569)] hover:bg-[var(--neo-surface-inset,#E5EBF2)] hover:text-[var(--neo-text-primary,#0F172A)] hover:shadow-[inset_1px_1px_2px_rgba(166,180,200,0.2)]',
                isCollapsed && 'justify-center px-0 py-2.5',
              )}
            >
              {/* Active indicator bar */}
              {isActive && !isCollapsed && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#1557D6] rounded-r-full shadow-xs"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              <Icon
                className={cn(
                  'w-4.5 h-4.5 shrink-0 transition-transform',
                  isActive
                    ? 'text-[#1557D6] scale-105'
                    : 'text-[var(--neo-text-tertiary,#64748B)] group-hover:text-[var(--neo-text-primary,#0F172A)] group-hover:scale-105',
                )}
              />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );

          if (isCollapsed) {
            return (
              <Tooltip key={item.to} content={item.label} position="right">
                {linkContent}
              </Tooltip>
            );
          }

          return linkContent;
        })}
      </nav>

      {/* AI Assistant Floating Button */}
      <Tooltip content={`AI Assistant • ${currentRole}`} position={isCollapsed ? 'right' : 'top'}>
        <motion.button
          type="button"
          onClick={() => navigate('/assistant')}
          className={cn(
            'absolute bottom-4 right-4 w-12 h-12 rounded-2xl border border-white/80 bg-[var(--neo-surface-raised,#F8FAFC)] text-[#1557D6] flex items-center justify-center cursor-pointer transition-all shadow-[4px_4px_12px_rgba(166,180,200,0.35),-4px_-4px_12px_rgba(255,255,255,0.9)] hover:scale-105 active:scale-95 group z-50',
            isCollapsed && 'right-3',
          )}
          title="Open AI Decision Assistant"
          aria-label="Open AI Decision Assistant"
        >
          <Bot className="w-5 h-5 group-hover:scale-110 transition-transform text-[#1557D6]" />

          {/* AI Badge */}
          <div className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#1557D6] border-2 border-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-2.5 h-2.5 text-white" />
          </div>
        </motion.button>
      </Tooltip>
    </motion.aside>
  );
};
