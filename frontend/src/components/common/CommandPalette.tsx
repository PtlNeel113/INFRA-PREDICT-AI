import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  FolderGit2,
  AlertTriangle,
  Sparkles,
  SearchCode,
  Scale,
  Bot,
  FileSpreadsheet,
  Settings,
  ArrowRight,
  MapPin,
  X,
  ShieldAlert,
} from 'lucide-react';
import { MOCK_PROJECTS } from '../../data/projectsData';
import { MOCK_EARLY_WARNING_ALERTS } from '../../data/alertsData';
import { useDemoStore } from '../../store/demoStore';
import { cn } from '../../utils/cn';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Projects' | 'Alerts' | 'Actions';
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  path?: string;
  badge?: string;
  action?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const setDecisionMode = useDemoStore((s) => s.setDecisionMode);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const defaultCommands: CommandItem[] = [
    {
      id: 'cmd-decision',
      category: 'Actions',
      title: 'Enter Decision Mode',
      subtitle: 'Transform view into "Where should we act first?" priority ranking',
      icon: ShieldAlert,
      action: () => {
        setDecisionMode(true);
        navigate('/dashboard');
      },
    },
    {
      id: 'cmd-dashboard',
      category: 'Navigation',
      title: 'Go to Command Center',
      subtitle: 'Executive Command Center & Portfolio KPIs',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      id: 'cmd-map',
      category: 'Navigation',
      title: 'National Infrastructure Map',
      subtitle: 'Geospatial risk clusters across all Indian states',
      icon: MapPin,
      path: '/map',
    },
    {
      id: 'cmd-projects',
      category: 'Navigation',
      title: 'Open Projects',
      subtitle: 'Multi-parameter search, filters and project table',
      icon: FolderGit2,
      path: '/projects',
    },
    {
      id: 'cmd-alerts',
      category: 'Navigation',
      title: 'Open Early Warnings',
      subtitle: 'Early warning priority matrix and escalations',
      icon: AlertTriangle,
      path: '/alerts',
    },
    {
      id: 'cmd-predictions',
      category: 'Navigation',
      title: 'Open Risk Predictions',
      subtitle: 'Cost overrun, schedule delay & risk velocities (Prototype)',
      icon: Sparkles,
      path: '/predictions',
    },
    {
      id: 'cmd-explainable',
      category: 'Navigation',
      title: 'Open Risk Drivers & Explainability',
      subtitle: 'Factor weight contributions & root-cause attributions',
      icon: SearchCode,
      path: '/explainability',
    },
    {
      id: 'cmd-benchmarking',
      category: 'Navigation',
      title: 'Open Benchmarking',
      subtitle: 'Peer parity polygons & multi-way comparison',
      icon: Scale,
      path: '/benchmarking',
    },
    {
      id: 'cmd-assistant',
      category: 'Navigation',
      title: 'Open Infra-Assist AI',
      subtitle: 'Interactive conversational intelligence assistant',
      icon: Bot,
      path: '/assistant',
    },
    {
      id: 'cmd-reports',
      category: 'Navigation',
      title: 'Generate Risk Brief',
      subtitle: 'Synthesize Executive Risk Briefs & official PDF dossiers',
      icon: FileSpreadsheet,
      path: '/reports',
    },
    {
      id: 'cmd-settings',
      category: 'Navigation',
      title: 'System Settings',
      subtitle: 'System configuration & threshold rules',
      icon: Settings,
      path: '/settings',
    },
  ];

  // Dynamic search results
  let filteredItems: CommandItem[] = [];

  if (!query.trim()) {
    filteredItems = defaultCommands;
  } else {
    const q = query.toLowerCase();

    // 1. Matched Navigation / Actions
    const navMatches = defaultCommands.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        (c.subtitle && c.subtitle.toLowerCase().includes(q)),
    );

    // 2. Matched Projects
    const projectMatches: CommandItem[] = MOCK_PROJECTS.filter(
      (p) =>
        p.code.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.sector.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q),
    ).map((p) => ({
      id: `prj-${p.id}`,
      category: 'Projects',
      title: `${p.code} — ${p.name}`,
      subtitle: `${p.sector} • ${p.state} • Health: ${p.healthScore}/100`,
      icon: FolderGit2,
      path: `/projects/${p.id}`,
      badge: p.riskLevel,
    }));

    // 3. Matched Alerts
    const alertMatches: CommandItem[] = MOCK_EARLY_WARNING_ALERTS.filter(
      (a) =>
        a.projectName.toLowerCase().includes(q) ||
        a.projectCode.toLowerCase().includes(q) ||
        a.primaryDriver.toLowerCase().includes(q),
    ).map((a) => ({
      id: `alt-${a.id}`,
      category: 'Alerts',
      title: `[Alert] ${a.projectCode}: ${a.primaryDriver}`,
      subtitle: `${a.changeSummary} • Review: ${a.recommendedReviewDate}`,
      icon: AlertTriangle,
      path: `/alerts`,
      badge: a.severity,
    }));

    filteredItems = [...navMatches, ...projectMatches, ...alertMatches];
  }

  // Keyboard controls
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? Math.max(0, filteredItems.length - 1) : prev - 1,
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const handleSelect = (item: CommandItem) => {
    onClose();
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl neo-panel rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh] text-slate-900 border border-slate-300/80">
        {/* Search Header Input */}
        <div className="p-4 border-b border-slate-300/60 flex items-center gap-3 neo-inset m-3 rounded-xl">
          <Search className="w-5 h-5 text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search projects, alerts, and reports (e.g. DME-PKG-14B, Gujarat)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <kbd className="px-2 py-0.5 text-[10px] font-mono font-bold neo-raised text-slate-700 rounded-md border border-slate-300/80">
              ESC
            </kbd>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No matching commands or projects found for <strong className="text-slate-900">"{query}"</strong>.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    'p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all',
                    isSelected
                      ? 'neo-raised bg-indigo-50/90 text-indigo-950 border border-indigo-200 font-medium'
                      : 'neo-card hover:bg-slate-100/70 text-slate-700 border-transparent',
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                        isSelected
                          ? 'neo-raised bg-indigo-600 text-white'
                          : 'neo-inset text-slate-600',
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold truncate leading-tight">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-bold font-mono px-1.5 py-0.2 rounded neo-inset text-slate-800">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 ml-3">
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                      {item.category}
                    </span>
                    <ArrowRight
                      className={cn(
                        'w-3.5 h-3.5',
                        isSelected ? 'text-indigo-600 font-bold' : 'text-slate-400',
                      )}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="p-3 border-t border-slate-300/60 neo-inset text-[11px] text-slate-500 flex items-center justify-between m-3 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[9px] font-mono neo-raised text-slate-700 rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 text-[9px] font-mono neo-raised text-slate-700 rounded">↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[9px] font-mono neo-raised text-slate-700 rounded">↵</kbd>
              <span>to select</span>
            </span>
          </div>
          <span className="font-mono text-[10px] text-slate-500 font-bold">
            INFRA-PREDICT Core
          </span>
        </div>
      </div>
    </div>
  );
};
