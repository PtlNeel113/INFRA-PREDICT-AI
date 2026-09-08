import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { MobileNavbar } from './MobileNavbar';
import { CommandPalette } from '../common/CommandPalette';
import { SystemStatusModal } from '../common/SystemStatusModal';
import { NotificationDrawer } from '../notifications/NotificationDrawer';
import { INITIAL_NOTIFICATIONS } from '../../data/notificationsData';
import { NotificationItem } from '../../types/notifications';
import { useToast } from '../../hooks/useToast';

export const AppLayout: React.FC = () => {
  const toast = useToast();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [systemStatusOpen, setSystemStatusOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast.success('All Notifications Read', 'Marked all active escalations as read.');
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.info('Notifications Cleared', 'Cleared all notification cards.');
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="flex h-screen overflow-hidden bg-[#F7F8F5] text-[#0B1220] transition-colors">
      {/* Desktop & Tablet Sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenNotifications={() => setNotificationsOpen(true)}
          unreadNotificationsCount={unreadCount}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 pb-20 md:pb-8">
          <Outlet />
        </main>

        {/* Mobile Navigation Bottom Bar */}
        <MobileNavbar onOpenMenu={() => setCommandPaletteOpen(true)} />
      </div>

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* Security System Status Modal */}
      <SystemStatusModal
        isOpen={systemStatusOpen}
        onClose={() => setSystemStatusOpen(false)}
      />

      {/* Notifications Drawer */}
      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAll}
      />
    </div>
  );
};
