import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Bell,
  Search,
  Sparkles,
  Command,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
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
  const { user } = useAuth();
  const location = useLocation();
  const { isDemoMode, isDecisionMode } = useDemoStore();

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
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Demo Environment
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

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-[#0B1220] leading-tight">
              {user?.fullName || 'Dr. Vikram Malhotra'}
            </p>
            <p className="text-[10px] text-[#536174] font-medium leading-tight">
              {user?.role || 'Senior Decision Maker'}
            </p>
          </div>
          <div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1557D6] to-[#0E7490] flex items-center justify-center text-white font-bold text-sm shadow-md relative ring-2 ring-white"
            title={user?.email || 'vikram.malhotra@example.com'}
          >
            {getInitials(user?.fullName)}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#16A34A] ring-2 ring-white" />
          </div>
        </div>
      </div>
    </header>
  );
};
