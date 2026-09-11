import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Bell,
  AlertTriangle,
  Sparkles,
  Clock,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  Trash2,
  Check,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { NotificationItem, NotificationType } from '../../types/notifications';
import { useToast } from '../../hooks/useToast';
import { cn } from '../../utils/cn';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
}) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [filterType, setFilterType] = useState<string>('ALL');

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filterType === 'ALL') return true;
    if (filterType === 'UNREAD') return !n.isRead;
    if (filterType === 'CRITICAL') return n.type === 'CRITICAL_RISK';
    if (filterType === 'PREDICTIONS') return n.type === 'PREDICTION_CHANGED';
    if (filterType === 'MILESTONES') return n.type === 'MILESTONE_DELAY';
    if (filterType === 'REPORTS') return n.type === 'REPORT_READY';
    return true;
  });

  const handleNotificationClick = (notif: NotificationItem) => {
    if (!notif.isRead) {
      onMarkAsRead(notif.id);
    }
    onClose();
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'CRITICAL_RISK':
        return <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      case 'PREDICTION_CHANGED':
        return <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'MILESTONE_DELAY':
        return <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />;
      case 'REPORT_READY':
        return <FileSpreadsheet className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      case 'DATA_UPDATE':
        return <Database className="w-4 h-4 text-teal-600 dark:text-teal-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md neo-panel shadow-2xl flex flex-col border-l border-slate-300/80 text-slate-900 bg-[#EEF2F6]">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-slate-300/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl neo-raised flex items-center justify-center text-indigo-700">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-black uppercase tracking-wide text-slate-900">
                    Operational Alerts
                  </h2>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-rose-50 text-rose-700 font-extrabold px-2 py-0.5 rounded-lg border border-rose-200 neo-raised">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Real-time alerts, predictions & data events</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Bar & Bulk Actions */}
          <div className="p-3 border-b border-slate-300/60 flex items-center justify-between gap-2 overflow-x-auto text-xs">
            <div className="flex items-center gap-1.5">
              {[
                { id: 'ALL', label: 'All' },
                { id: 'UNREAD', label: `Unread (${unreadCount})` },
                { id: 'CRITICAL', label: 'Critical' },
                { id: 'REPORTS', label: 'Reports' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterType(tab.id)}
                  className={cn(
                    'px-2.5 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer',
                    filterType === tab.id
                      ? 'neo-inset text-indigo-700 font-extrabold'
                      : 'neo-raised text-slate-600 hover:text-slate-900',
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={onMarkAllAsRead}
                  className="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer"
                >
                  Mark All Read
                </button>
              )}
              <button
                type="button"
                onClick={onClearAll}
                className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                title="Clear All Notifications"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center space-y-2 neo-inset rounded-2xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-slate-900">All Clear</p>
                <p className="text-[11px] text-slate-500">No active escalations matching the selected filter.</p>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={cn(
                    'p-3.5 rounded-xl text-left cursor-pointer transition-all group relative',
                    notif.isRead
                      ? 'neo-card opacity-80'
                      : 'neo-raised border-l-4 border-l-indigo-600',
                  )}
                >
                  {/* Unread indicator dot */}
                  {!notif.isRead && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
                  )}

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg neo-inset flex items-center justify-center shrink-0 mt-0.5">
                      {getIcon(notif.type)}
                    </div>

                    <div className="min-w-0 flex-1 pr-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                          {notif.badgeLabel || notif.type.replace('_', ' ')}
                        </span>
                        {notif.projectCode && (
                          <span className="text-[10px] font-bold font-mono text-indigo-700 neo-inset px-1.5 py-0.2 rounded-md">
                            {notif.projectCode}
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-bold leading-snug text-slate-900">
                        {notif.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                        {notif.message}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" />
                          {notif.timestamp}
                        </span>
                        <span className="text-indigo-600 font-bold group-hover:underline flex items-center gap-0.5">
                          View details <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-3.5 border-t border-slate-300/60 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Event Dispatcher</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate('/alerts');
              }}
              className="font-bold text-indigo-600 hover:underline cursor-pointer"
            >
              Open Early Warnings Hub →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
