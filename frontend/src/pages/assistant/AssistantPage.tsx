import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Bot,
  Send,
  Sparkles,
  RefreshCw,
  Building2,
  MapPin,
  FileSpreadsheet,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Info,
  Clock,
  Layers,
  Search,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  ExternalLink,
} from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';
import { AssistantMessage, PromptChip } from '../../types/assistant';
import { PROMPT_CHIPS, generateAssistantResponse } from '../../services/assistantEngine';
import { InfraProject } from '../../types/projects';
import { RiskBadge } from '../../components/ui/RiskBadge';
import { useToast } from '../../hooks/useToast';
import { cn } from '../../utils/cn';

export const AssistantPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const toast = useToast();
  const projects = useProjectStore((s) => s.projects);

  const initialProjectId = searchParams.get('project') || projects[0]?.id || 'PRJ-MORT-891';
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjectId);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);

  const activeProject: InfraProject =
    projects.find((p) => p.id === selectedProjectId || p.code === selectedProjectId) || projects[0];

  const buildInitialWelcomeMessage = (p: InfraProject): AssistantMessage => ({
    id: 'msg-welcome',
    sender: 'assistant',
    content: `### Welcome to INFRA-ASSIST AI
Operational Decision Copilot connected to the **Infrastructure Intelligence Core**.

I have loaded telemetry context for **${p.name}** (${p.code}).

You can inquire about:
• **Root causes & SHAP feature attributions** ("Why is this project high risk?")
• **Schedule slippages & critical milestone gates** ("What is the delay status?")
• **Sanctioned cost vs expenditure & forecast overruns** ("What are the cost drivers?")
• **Peer benchmarks** against ${p.sector} medians
• **Actionable prescriptive interventions** & inter-ministerial escalations
• **National portfolio urgency rankings** across all monitored projects`,
    timestamp: 'Just now',
    projectId: p.id,
    confidencePercent: 95.0,
    dataQuality: {
      score: 98,
      freshness: 'Telemetry live',
      status: 'Verified',
    },
    metrics: [
      { label: 'Health Score', value: `${p.healthScore}/100`, color: p.healthScore < 50 ? 'text-rose-600 dark:text-rose-400' : p.healthScore < 70 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Risk Severity', value: p.riskLevel, color: p.riskLevel === 'CRITICAL' ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400' },
      { label: 'Predicted Delay', value: `+${p.predictedDelayMonths} Mos`, color: 'text-amber-600 dark:text-amber-400' },
      { label: 'Forecast Cost', value: `₹${p.forecastCostCr.toLocaleString('en-IN')} Cr`, color: 'text-slate-800 dark:text-slate-200' },
    ],
    actions: [
      { label: 'Why is it high risk? (SHAP)', actionType: 'FILTER', target: 'Why is this project high risk?' },
      { label: 'View Recommended Actions', actionType: 'FILTER', target: 'What are the recommended actions?' },
      { label: 'Open Project Intelligence', actionType: 'NAVIGATE', target: `/projects/${p.id}` },
    ],
    sourceCitations: ['Infrastructure Telemetry Core', 'Central Monitoring System', 'TreeSHAP v2.4'],
  });

  const [messages, setMessages] = useState<AssistantMessage[]>([buildInitialWelcomeMessage(activeProject)]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Sync state if URL query param changes
  useEffect(() => {
    const urlPid = searchParams.get('project');
    if (urlPid && urlPid !== selectedProjectId) {
      setSelectedProjectId(urlPid);
    }
  }, [searchParams, selectedProjectId]);

  const handleProjectChange = (newProjectId: string) => {
    setSelectedProjectId(newProjectId);
    setSearchParams({ project: newProjectId });
    const targetPrj = projects.find((p) => p.id === newProjectId || p.code === newProjectId);

    if (targetPrj) {
      toast.info('Context Updated', `Telemetry loaded for ${targetPrj.code}`);
      // Add a context-switch system notice message
      const switchNotice: AssistantMessage = {
        id: `sys-${Date.now()}`,
        sender: 'assistant',
        content: `**Telemetry Context Switched to ${targetPrj.name} (${targetPrj.code})**.\n\n• **Sector / Agency:** ${targetPrj.sector} | ${targetPrj.implementingAgency}\n• **Health Score:** ${targetPrj.healthScore}/100 (${targetPrj.riskLevel})\n• **Forecast Delay:** +${targetPrj.predictedDelayMonths} Mos | **Overrun:** +₹${targetPrj.predictedCostOverrunCr} Cr\n\nAll subsequent questions will analyze this package's parameters.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        projectId: targetPrj.id,
        confidencePercent: 94.0,
        metrics: [
          { label: 'Health Score', value: `${targetPrj.healthScore}/100`, color: targetPrj.healthScore < 60 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Delay Forecast', value: `+${targetPrj.predictedDelayMonths} Mos`, color: 'text-amber-600 dark:text-amber-400' },
          { label: 'Cost Overrun', value: `+₹${targetPrj.predictedCostOverrunCr} Cr`, color: 'text-rose-600 dark:text-rose-400' },
        ],
        actions: [
          { label: 'Why is it at risk?', actionType: 'FILTER', target: 'Why is this project high risk?' },
          { label: 'Full Project Dossier', actionType: 'NAVIGATE', target: `/projects/${targetPrj.id}` },
        ],
        sourceCitations: ['Active Context Switch', 'Live Telemetry Stream'],
      };
      setMessages((prev) => [...prev, switchNotice]);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: AssistantMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      try {
        const botResponse = generateAssistantResponse(query, activeProject, projects);
        setMessages((prev) => [...prev, botResponse]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            sender: 'assistant',
            content: 'Unable to complete telemetry synthesis for this query. Please retry or inspect the project directly in the Projects Registry.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isError: true,
            actions: [
              { label: 'Open Project Intelligence', actionType: 'NAVIGATE', target: `/projects/${activeProject.id}` },
            ],
          },
        ]);
      } finally {
        setIsThinking(false);
      }
    }, 450);
  };

  const handlePromptChipClick = (chip: PromptChip) => {
    handleSendMessage(chip.prompt);
  };

  const handleActionClick = (action: { label: string; actionType: string; target: string }) => {
    if (action.actionType === 'NAVIGATE' || action.actionType === 'GENERATE_REPORT') {
      navigate(action.target);
    } else if (action.actionType === 'FILTER') {
      handleSendMessage(action.target);
    }
  };

  const handleResetChat = () => {
    setMessages([buildInitialWelcomeMessage(activeProject)]);
    toast.info('Chat Reset', 'Conversation history cleared to baseline context.');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 select-none">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#155EEF] to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  INFRA-ASSIST AI
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Operational Intelligence Active
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Grounded conversational intelligence for national infrastructure risk triage, root-cause attribution & briefings.
              </p>
            </div>
          </div>
        </div>

        {/* Active Project Context Selector */}
        <div className="flex items-center gap-3 bg-white dark:bg-[#0F1D2E] border border-slate-200 dark:border-slate-800 p-2 rounded-2xl shadow-xs">
          <Building2 className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
          <div className="min-w-0">
            <span className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500 block leading-tight">
              Active Project Context
            </span>
            <select
              value={selectedProjectId}
              onChange={(e) => handleProjectChange(e.target.value)}
              className="text-xs font-bold text-slate-900 dark:text-white bg-transparent focus:outline-none cursor-pointer pr-4 max-w-[280px] truncate"
              aria-label="Select active project context"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id} className="dark:bg-[#0B1F3A]">
                  {p.code} — {p.name.slice(0, 36)}...
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Chat Stream & Right Context Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Chat Conversation Stream (2 Columns wide) */}
        <div className="lg:col-span-2 flex flex-col h-[700px] bg-white dark:bg-[#0F1D2E] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Stream Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1F3A]/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold font-mono text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                Grounding: Telemetry & ML Models
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono hidden sm:inline">
                ({projects.length} Monitored Projects Connected)
              </span>
            </div>

            <button
              type="button"
              onClick={handleResetChat}
              className="text-[11px] text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 font-semibold cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Chat
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={cn(
                    'flex items-start gap-3 text-xs',
                    isUser ? 'justify-end' : 'justify-start',
                  )}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#155EEF] to-indigo-700 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={cn(
                      'max-w-[88%] rounded-2xl p-4 space-y-3.5',
                      isUser
                        ? 'bg-indigo-600 text-white shadow-xs rounded-tr-none'
                        : 'bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none',
                    )}
                  >
                    {/* Header Badges if available */}
                    {!isUser && (msg.confidencePercent || msg.dataQuality) && (
                      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-200/70 dark:border-slate-800">
                        {msg.confidencePercent && (
                          <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            Confidence: {msg.confidencePercent}%
                          </span>
                        )}
                        {msg.dataQuality && (
                          <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            {msg.dataQuality.status} ({msg.dataQuality.score}% Integrity)
                          </span>
                        )}
                      </div>
                    )}

                    {/* Message Body */}
                    <div className="whitespace-pre-line leading-relaxed text-xs">
                      {msg.content}
                    </div>

                    {/* SHAP Factor Breakdown Cards if present */}
                    {msg.shapBreakdown && msg.shapBreakdown.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono block">
                          TreeSHAP Feature Contributions
                        </span>
                        <div className="space-y-1.5">
                          {msg.shapBreakdown.map((item, idx) => {
                            const isAdverse = item.impactType === 'POSITIVE_RISK';
                            return (
                              <div
                                key={idx}
                                className="p-2.5 rounded-xl bg-white dark:bg-[#0F1D2E] border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2"
                              >
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                      {item.category}
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                      {item.factor}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                                    {item.evidence}
                                  </p>
                                </div>
                                <span
                                  className={cn(
                                    'text-xs font-black font-mono shrink-0 px-2 py-1 rounded',
                                    isAdverse
                                      ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                                      : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
                                  )}
                                >
                                  {item.contribution > 0 ? `+${item.contribution.toFixed(1)}` : item.contribution.toFixed(1)} pts
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Prescriptive Recommendations Cards if present */}
                    {msg.recommendations && msg.recommendations.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono block">
                          Prioritized Action Plan
                        </span>
                        <div className="space-y-2">
                          {msg.recommendations.map((rec, idx) => {
                            const badgeColor =
                              rec.priority.includes('P1')
                                ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                                : rec.priority.includes('P2')
                                ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                                : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';

                            return (
                              <div
                                key={idx}
                                className="p-3 rounded-xl bg-white dark:bg-[#0F1D2E] border border-slate-200/80 dark:border-slate-800 space-y-1.5"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className={cn('text-[9px] font-black uppercase px-2 py-0.5 rounded border', badgeColor)}>
                                    {rec.priority} • {rec.urgency}
                                  </span>
                                  <span className="text-[10px] text-slate-400 truncate">
                                    {rec.responsibleEntity}
                                  </span>
                                </div>
                                <p className="text-xs font-bold text-slate-900 dark:text-white">
                                  {rec.action}
                                </p>
                                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                                  <span>Impact:</span> {rec.expectedImpact}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Associated Metrics Grid */}
                    {msg.metrics && msg.metrics.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                        {msg.metrics.map((m, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-xl bg-white dark:bg-[#0F1D2E] border border-slate-200 dark:border-slate-800 text-center"
                          >
                            <span className="text-[9px] uppercase font-bold text-slate-400 block truncate">
                              {m.label}
                            </span>
                            <strong className={cn('text-xs font-black font-mono block mt-0.5 truncate', m.color || 'text-slate-900 dark:text-white')}>
                              {m.value}
                            </strong>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Directives */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                        {msg.actions.map((act, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleActionClick(act)}
                            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#0F1D2E] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>{act.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Source Citations */}
                    {msg.sourceCitations && (
                      <div className="pt-2 text-[10px] text-slate-400 dark:text-slate-500 font-mono border-t border-slate-200/60 dark:border-slate-800">
                        Sources: {msg.sourceCitations.join(' • ')}
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-xl bg-[#0B1F3A] dark:bg-slate-800 text-white flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                      YOU
                    </div>
                  )}
                </div>
              );
            })}

            {isThinking && (
              <div className="flex items-center gap-2 text-slate-400 text-xs pl-11">
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                <span className="font-mono text-[11px] ml-1 text-slate-500 dark:text-slate-400">
                  Grounded multi-factor reasoning in progress...
                </span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0B1F3A]/40 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Prompts:
            </span>
            {PROMPT_CHIPS.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => handlePromptChipClick(chip)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#0F1D2E] hover:bg-indigo-50 dark:hover:bg-indigo-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0F1D2E] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask Infra-Assist about project risk, delays, SHAP, cost overruns, or peers..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isThinking}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl transition-all shadow-xs cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Live Context & Fast Links (1 Column wide) */}
        <div className="space-y-4">
          {/* Active Context Card */}
          <div className="bg-white dark:bg-[#0F1D2E] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono">
                Project Telemetry Stack
              </span>
              <RiskBadge level={activeProject.riskLevel} />
            </div>

            <div>
              <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                {activeProject.code}
              </span>
              <h3 className="text-sm font-black mt-1.5 leading-snug">
                {activeProject.name}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {activeProject.sector} • {activeProject.state} • {activeProject.implementingAgency}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Health Score</span>
                <strong className={cn('text-base font-black font-mono block', activeProject.healthScore < 50 ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400')}>
                  {activeProject.healthScore}/100
                </strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Progress Gap</span>
                <strong className={cn('text-base font-black font-mono block', activeProject.progressGap > 5 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200')}>
                  {activeProject.progressGap}%
                </strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Predicted Delay</span>
                <strong className="text-sm font-black font-mono text-amber-600 dark:text-amber-400 block">
                  +{activeProject.predictedDelayMonths} Mos
                </strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Forecast Cost</span>
                <strong className="text-xs font-black font-mono text-slate-800 dark:text-slate-200 block truncate">
                  ₹{activeProject.forecastCostCr.toLocaleString('en-IN')} Cr
                </strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 space-y-1">
              <span className="text-[10px] font-bold uppercase text-rose-700 dark:text-rose-400 block font-mono">
                Primary Risk Driver
              </span>
              <p className="text-xs font-bold text-rose-950 dark:text-rose-200 leading-snug">
                {activeProject.primaryRiskDriver}
              </p>
            </div>

            {/* Direct Navigation Links */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => navigate(`/projects/${activeProject.id}`)}
                className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-between transition-colors cursor-pointer shadow-xs"
              >
                <span>Full Project Intelligence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => navigate(`/reports?projectId=${activeProject.id}`)}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  Generate Risk Brief
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => navigate(`/benchmarking?projectId=${activeProject.id}`)}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Peer Benchmarking
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
