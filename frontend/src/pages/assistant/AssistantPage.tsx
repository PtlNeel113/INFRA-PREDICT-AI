import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Zap,
  Info,
  Clock,
  Layers,
  Search,
} from 'lucide-react';
import { MOCK_PROJECTS } from '../../data/projectsData';
import { AssistantMessage, PromptChip } from '../../types/assistant';
import { PROMPT_CHIPS, generateAssistantResponse } from '../../services/assistantEngine';
import { InfraProject } from '../../types/projects';
import { RiskBadge } from '../../components/ui/RiskBadge';
import { useToast } from '../../hooks/useToast';
import { cn } from '../../utils/cn';

export const AssistantPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [selectedProjectId, setSelectedProjectId] = useState<string>('PRJ-MORT-891');
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);

  const activeProject: InfraProject =
    MOCK_PROJECTS.find((p) => p.id === selectedProjectId) || MOCK_PROJECTS[0];

  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      content: `Greetings. I am **INFRA-ASSIST AI**, your operational decision copilot connected to the **Infrastructure Intelligence Core**.\n\nI have loaded the telemetry context for **${activeProject.name} (${activeProject.code})**.\n\nYou can inquire about risk drivers, SHAP feature attributions, trajectory anomalies, peer benchmarks, or generate executive risk dossiers.`,
      timestamp: 'Just now',
      projectId: activeProject.id,
      metrics: [
        { label: 'Health Score', value: `${activeProject.healthScore}/100`, color: 'text-rose-600 dark:text-rose-400' },
        { label: 'Risk Severity', value: activeProject.riskLevel, color: 'text-amber-600 dark:text-amber-400' },
        { label: 'Predicted Delay', value: `+${activeProject.predictedDelayMonths} Mos`, color: 'text-rose-600 dark:text-rose-400' },
      ],
      actions: [
        { label: 'Why is it high risk?', actionType: 'FILTER', target: 'Why is this project high risk?' },
        { label: 'Open Project Intelligence', actionType: 'NAVIGATE', target: `/projects/${activeProject.id}` },
      ],
      sourceCitations: ['AI Engine', 'Central Infrastructure Monitoring System'],
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

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
      const botResponse = generateAssistantResponse(query, activeProject);
      setMessages((prev) => [...prev, botResponse]);
      setIsThinking(false);
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

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 select-none">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#155EEF] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                INFRA-ASSIST AI
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Grounded conversational intelligence for national infrastructure risk triage & briefings.
              </p>
            </div>
          </div>
        </div>

        {/* Target Project Selector Dropdown */}
        <div className="flex items-center gap-3 bg-white dark:bg-[#0F1D2E] border border-slate-200 dark:border-slate-800 p-2 rounded-2xl shadow-xs">
          <Building2 className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
          <div className="min-w-0">
            <span className="text-[9px] uppercase font-bold text-slate-400 block leading-tight">
              Active Project Context
            </span>
            <select
              value={selectedProjectId}
              onChange={(e) => {
                setSelectedProjectId(e.target.value);
                const prj = MOCK_PROJECTS.find((p) => p.id === e.target.value);
                toast.info('Context Switch', `Loaded telemetry for ${prj?.code || e.target.value}`);
              }}
              className="text-xs font-bold text-slate-900 dark:text-white bg-transparent focus:outline-none cursor-pointer pr-4"
            >
              {MOCK_PROJECTS.map((p) => (
                <option key={p.id} value={p.id} className="dark:bg-[#0B1F3A]">
                  {p.code} — {p.name.slice(0, 32)}...
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Chat Stream & Right Context Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Chat Conversation Stream (2 Columns wide) */}
        <div className="lg:col-span-2 flex flex-col h-[680px] bg-white dark:bg-[#0F1D2E] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Stream Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1F3A]/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold font-mono text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                Grounding: Knowledge Vector
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setMessages([messages[0]]);
                toast.info('Session Cleared', 'Chat history reset to initial context.');
              }}
              className="text-[11px] text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 font-semibold cursor-pointer"
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
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl p-4 space-y-3',
                      isUser
                        ? 'bg-indigo-600 text-white shadow-xs rounded-tr-none'
                        : 'bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none',
                    )}
                  >
                    {/* Message Body */}
                    <div className="whitespace-pre-line leading-relaxed">
                      {msg.content}
                    </div>

                    {/* Associated Metrics Grid */}
                    {msg.metrics && msg.metrics.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                        {msg.metrics.map((m, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-lg bg-white dark:bg-[#0F1D2E] border border-slate-200 dark:border-slate-800 text-center"
                          >
                            <span className="text-[9px] uppercase font-bold text-slate-400 block">
                              {m.label}
                            </span>
                            <strong className={cn('text-xs font-black font-mono block mt-0.5', m.color || 'text-slate-900 dark:text-white')}>
                              {m.value}
                            </strong>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Directives */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {msg.actions.map((act, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleActionClick(act)}
                            className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#0F1D2E] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>{act.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Source Citations */}
                    {msg.sourceCitations && (
                      <div className="pt-2 text-[10px] text-slate-400 font-mono border-t border-slate-200 dark:border-slate-700/60">
                        Sources: {msg.sourceCitations.join(' • ')}
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-xl bg-[#0B1F3A] dark:bg-slate-800 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
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
                <span className="font-mono text-[11px] ml-1">AI reasoning in progress...</span>
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
              placeholder="Ask Infra-Assist anything regarding project risk, delays, SHAP, or benchmarks..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isThinking}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl transition-all shadow-xs cursor-pointer"
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
                <strong className="text-base font-black font-mono text-rose-600 dark:text-rose-400">
                  {activeProject.healthScore}/100
                </strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Progress Gap</span>
                <strong className="text-base font-black font-mono text-rose-600 dark:text-rose-400">
                  {activeProject.progressGap}%
                </strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Predicted Delay</span>
                <strong className="text-sm font-black font-mono text-amber-600 dark:text-amber-400">
                  +{activeProject.predictedDelayMonths} Mos
                </strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Forecast Cost</span>
                <strong className="text-xs font-black font-mono text-slate-800 dark:text-slate-200">
                  ₹{activeProject.forecastCostCr.toLocaleString('en-IN')} Cr
                </strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 space-y-1">
              <span className="text-[10px] font-bold uppercase text-rose-700 dark:text-rose-400 block font-mono">
                Primary Risk Driver
              </span>
              <p className="text-xs font-bold text-rose-950 dark:text-rose-200">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
