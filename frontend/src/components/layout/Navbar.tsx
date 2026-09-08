import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Bell,
  Search,
  Sparkles,
  Command,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { useDemoStore } from '../../store/demoStore';
import { cn } from '../../utils/cn';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
  onOpenSystemStatus?: () => void;
  onOpenNotifications?: () => void;
  unreadNotificationsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenNotifications,
  unreadNotificationsCount = 2,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { isDemoMode, isDecisionMode } = useDemoStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileOpen]);

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    toast.success('Logged out successfully.');
    navigate('/login', { replace: true });
  };

  const handleGoToProfile = () => {
    setIsProfileOpen(false);
    navigate('/profile-setup');
  };

  const handleGoToSettings = () => {
    setIsProfileOpen(false);
    navigate('/settings');
  };

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

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
      case '/':
        return isDecisionMode ? 'Decision Mode — Priority Actions' : 'Executive Command Center';
      case '/map':
      case '/national-risk-map':
        return 'National Infrastructure Risk Map';
      case '/projects':
        return 'Project Intelligence';
      case '/alerts':
        return 'Early Warning Center';
      case '/predictions':
        return 'AI Predictions';
      case '/explainability':
        return 'Explainable AI';
      case '/benchmarking':
        return 'Peer Benchmarking';
      case '/assistant':
        return 'Infra-Assist';
      case '/data':
        return 'Data Intelligence Center';
      case '/analytics':
        return 'Portfolio Analytics';
      case '/reports':
        return 'AI Risk Briefs';
      case '/settings':
        return 'Settings';
      default:
        return 'Executive Command Center';
    }
  };

  const getBreadcrumb = () => {
    if (location.pathname === '/dashboard' || location.pathname === '/') {
      return 'Command Center';
    }
    if (location.pathname.startsWith('/projects/')) {
      return 'Projects › Detail';
    }
    return null;
  };

  return (
    <header className="h-16 glass-surface border-b border-[rgba(15,30,50,0.06)] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shrink-0 select-none">
      {/* Left: Page Title & Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex flex-col">
          {getBreadcrumb() && (
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8B95A8] mb-0.5">
              {getBreadcrumb()}
            </div>
          )}
          <h1 className="text-lg sm:text-xl font-black text-[#0B1220] tracking-tight truncate">
            {getPageTitle()}
          </h1>
        </div>
        
        {isDemoMode && (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Operational Intelligence Active
          </span>
        )}
      </div>

      {/* Center: Command Search */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="w-full bg-white hover:bg-[rgba(21,87,214,0.02)] border border-[rgba(15,30,50,0.08)] hover:border-[rgba(21,87,214,0.15)] text-sm text-[#536174] rounded-xl pl-4 pr-3 py-2 flex items-center justify-between transition-all cursor-pointer group shadow-lifted"
        >
          <span className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-[#8B95A8] group-hover:text-[#1557D6]" />
            <span className="font-medium">Search projects, states, risks or commands...</span>
          </span>
          <kbd className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#F7F8F5] border border-[rgba(15,30,50,0.08)] rounded text-[#536174] flex items-center gap-1">
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        </button>
      </div>

      {/* Right: Demo Badge + Notifications + Profile */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          type="button"
          onClick={onOpenNotifications}
          className="relative p-2.5 text-[#536174] hover:text-[#1557D6] rounded-xl hover:bg-[rgba(21,87,214,0.04)] border border-transparent hover:border-[rgba(21,87,214,0.08)] transition-all cursor-pointer"
          title="Notifications"
          aria-label="View notifications"
        >
          <Bell className="w-4.5 h-4.5" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC2626] ring-2 ring-white" />
          )}
        </button>

        <div className="h-8 w-px bg-[rgba(15,30,50,0.06)] hidden sm:block" />

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center gap-2.5 sm:gap-3 p-1 sm:pl-2.5 sm:pr-2 rounded-xl hover:bg-[rgba(21,87,214,0.04)] dark:hover:bg-slate-800/70 border border-transparent hover:border-[rgba(21,87,214,0.08)] dark:hover:border-slate-700/60 transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-500/20 select-none"
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
            aria-label="User account menu"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-[#0B1220] dark:text-slate-100 leading-tight group-hover:text-[#1557D6] dark:group-hover:text-blue-400 transition-colors">
                {user?.fullName || 'Dr. Vikram Malhotra'}
              </p>
              <p className="text-[10px] text-[#536174] dark:text-slate-400 font-medium leading-tight">
                {user?.role || 'Senior Decision Maker'}
              </p>
            </div>
            <div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1557D6] to-[#0E7490] flex items-center justify-center text-white font-bold text-sm shadow-md relative ring-2 ring-white dark:ring-slate-900 group-hover:scale-105 transition-transform shrink-0"
              title={user?.email || 'vikram.malhotra@gov.in'}
            >
              {getInitials(user?.fullName)}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#16A34A] ring-2 ring-white dark:ring-slate-900" />
            </div>
            <ChevronDown
              className={cn(
                'w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform duration-200 hidden sm:block',
                isProfileOpen && 'rotate-180 text-[#1557D6] dark:text-blue-400'
              )}
            />
          </button>

          {/* Profile Dropdown Menu */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 6 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white dark:bg-[#0F1D2E] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/10 p-1.5 z-50 overflow-hidden text-slate-800 dark:text-slate-200"
              >
                {/* Header Profile Summary */}
                <div className="px-3 py-2.5 mb-1 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1557D6] to-[#0E7490] flex items-center justify-center text-white font-bold text-xs shrink-0">
                      {getInitials(user?.fullName)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {user?.fullName || 'Dr. Vikram Malhotra'}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {user?.email || 'vikram.malhotra@gov.in'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                      {user?.role || 'Senior Decision Maker'}
                    </span>
                  </div>
                </div>

                {/* Dropdown Options */}
                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={handleGoToProfile}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-[#1557D6] dark:hover:text-blue-400 transition-colors cursor-pointer text-left group"
                  >
                    <User className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-[#1557D6] dark:group-hover:text-blue-400 transition-colors" />
                    <span>Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleGoToSettings}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-[#1557D6] dark:hover:text-blue-400 transition-colors cursor-pointer text-left group"
                  >
                    <Settings className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-[#1557D6] dark:group-hover:text-blue-400 transition-colors" />
                    <span>Account Settings</span>
                  </button>
                </div>

                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                {/* Logout Option */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer text-left group"
                >
                  <LogOut className="w-4 h-4 text-rose-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>Log Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
