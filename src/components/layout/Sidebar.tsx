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
      className="glass-panel flex flex-col shrink-0 border-r border-[rgba(15,30,50,0.08)] select-none h-screen relative z-40"
      style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(24px)',
      }}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 border-b border-[rgba(15,30,50,0.06)] flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-[#1557D6] flex items-center justify-center shadow-md shadow-blue-500/15 shrink-0">
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
                <span className="text-sm font-black tracking-tight text-[#0B1220] truncate">
                  INFRA-PREDICT
                </span>
                <span className="text-[10px] px-1.5 py-0.5 bg-[#1557D6] rounded font-bold text-white shrink-0">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-[#536174] font-semibold uppercase tracking-[0.1em] truncate">
                {t('app.subtitle')}
              </p>
            </motion.div>
          )}
        </div>

        <button
          type="button"
          onClick={toggleCollapse}
          className={cn(
            'p-1.5 rounded-lg text-[#536174] hover:text-[#0B1220] hover:bg-[rgba(15,30,50,0.04)] transition-colors cursor-pointer',
            isCollapsed && 'mx-auto',
          )}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
        {!isCollapsed && (
          <div className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8B95A8]">
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
                  ? 'bg-[#EBF5FF] text-[#1557D6] font-semibold shadow-sm'
                  : 'text-[#536174] hover:bg-[rgba(21,87,214,0.04)] hover:text-[#0B1220]',
                isCollapsed && 'justify-center px-0 py-2.5',
              )}
            >
              {/* Active indicator bar */}
              {isActive && !isCollapsed && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-[#1557D6] rounded-r-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              
              <Icon className={cn(
                "w-4.5 h-4.5 shrink-0 transition-transform",
                isActive ? "scale-105" : "group-hover:scale-105"
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
            "absolute bottom-4 right-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1557D6] to-[#8EDC35] text-white shadow-float hover:shadow-deep flex items-center justify-center cursor-pointer transition-all hover-lift group z-50",
            isCollapsed && "right-3"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={t('assistant.title')}
          aria-label={t('assistant.openButton')}
        >
          <Bot className="w-6 h-6 group-hover:scale-110 transition-transform" />
          
          {/* Pulsing Ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1557D6] to-[#8EDC35] opacity-50"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* AI Badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#8EDC35] border-2 border-white flex items-center justify-center shadow-md">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </motion.button>
      </Tooltip>
    </motion.aside>
  );
};
