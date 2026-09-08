import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  FolderGit2,
  AlertTriangle,
  Sparkles,
  Bot,
  Layers,
  Menu,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface MobileNavbarProps {
  onOpenMenu?: () => void;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({ onOpenMenu }) => {
  const location = useLocation();

  const navItems = [
    { to: '/dashboard', label: 'Command', icon: LayoutDashboard },
    { to: '/map', label: 'Map', icon: MapPin },
    { to: '/projects', label: 'Projects', icon: FolderGit2 },
    { to: '/alerts', label: 'Alerts', icon: AlertTriangle },
    { to: '/assistant', label: 'Infra-Assist', icon: Bot },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#0B1F3A] border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around select-none shadow-xl print:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          location.pathname === item.to ||
          (item.to === '/dashboard' && location.pathname === '/');

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={cn(
              'flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-bold transition-all min-w-[56px]',
              isActive
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
            )}
          >
            <Icon className={cn('w-4 h-4 mb-0.5', isActive && 'scale-110')} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}

      {onOpenMenu && (
        <button
          type="button"
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white min-w-[56px] cursor-pointer"
        >
          <Menu className="w-4 h-4 mb-0.5" />
          <span>More</span>
        </button>
      )}
    </div>
  );
};
