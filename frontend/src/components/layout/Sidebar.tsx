import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
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
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Tooltip } from '../ui/Tooltip';
import { useLanguage } from '../../contexts/LanguageContext';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

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

  const handleLogout = () => {
    logout();
    toast.info('Signed Out', 'You have securely ended your platform session.');
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', label: t('nav.commandCenter'), icon: LayoutDashboard },
    { to: '/national-risk-map', label: t('nav.nationalRiskMap'), icon: MapPin },
    { to: '/projects', label: t('nav.projects'), icon: FolderGit2 },
    { to: '/alerts', label: t('nav.earlyWarnings'), icon: AlertTriangle },
    { to: '/predictions', label: t('nav.predictions'), icon: Sparkles },
    { to: '/explainability', label: t('nav.explainableAI'), icon: SearchCode },
    { to: '/benchmarking', label: t('nav.peerBenchmarking'), icon: Scale },
    { to: '/analytics', label: t('nav.analytics'), icon: BarChart3 },
    { to: '/reports', label: t('nav.aiReports'), icon: FileSpreadsheet },
    { to: '/settings', label: t('nav.settings'), icon: Settings },
  ];

  const getInitials = (name?: string) => {
    if (!name) return 'VM';
    return name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 76 : 260 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="flex flex-col shrink-0 border-r border-[rgba(200,212,226,0.6)] select-none h-screen relative z-40 bg-[var(--neo-surface)] shadow-[4px_0_14px_rgba(166,180,200,0.2)]"
    >
      {/* Brand Header */}
      <div className="h-16 px-4 border-b border-[rgba(200,212,226,0.45)] flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl neo-button-primary flex items-center justify-center shrink-0">
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
                <span className="text-sm font-black tracking-tight text-[var(--neo-text-primary)] truncate">
                  INFRA-PREDICT
                </span>
                <span className="text-[10px] px-1.5 py-0.5 bg-[#1557D6] rounded-md font-bold text-white shrink-0 shadow-xs">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-[var(--neo-text-tertiary)] font-semibold uppercase tracking-[0.1em] truncate">
                {t('app.subtitle')}
              </p>
            </motion.div>
          )}
        </div>

        <button
          type="button"
          onClick={toggleCollapse}
          className={cn(
            'p-1.5 rounded-xl text-[var(--neo-text-secondary)] hover:text-[var(--neo-text-primary)] neo-button-interactive transition-colors cursor-pointer',
            isCollapsed && 'mx-auto',
          )}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto overflow-x-hidden">
        {!isCollapsed && (
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--neo-text-tertiary)]">
            {t('nav.sectionTitle')}
          </div>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
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
                  : 'text-[var(--neo-text-secondary)] hover:bg-[var(--neo-surface-inset)] hover:text-[var(--neo-text-primary)] hover:shadow-[inset_1px_1px_2px_rgba(166,180,200,0.2)]',
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
              
              <Icon className={cn(
                "w-4.5 h-4.5 shrink-0 transition-transform",
                isActive ? "text-[#1557D6] scale-105" : "text-[var(--neo-text-tertiary)] group-hover:text-[var(--neo-text-primary)] group-hover:scale-105"
              )} />
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
      <Tooltip content={t('assistant.title')} position={isCollapsed ? "right" : "top"}>
        <motion.button
          type="button"
          onClick={() => navigate('/assistant')}
          className={cn(
            "absolute bottom-4 right-4 w-12 h-12 rounded-2xl neo-raised-lg border border-white/80 bg-[var(--neo-surface-raised)] text-[#1557D6] flex items-center justify-center cursor-pointer transition-all neo-button-interactive group z-50",
            isCollapsed && "right-3"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={t('assistant.title')}
          aria-label={t('assistant.openButton')}
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
