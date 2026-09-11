import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Send, Sparkles, X, ArrowRight, ExternalLink, Building2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useProjectStore } from '../../store/projectStore';
import { generateAssistantResponse } from '../../services/assistantEngine';
import { InfraProject } from '../../types/projects';

interface InfraAssistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  projectId?: string;
}

export const InfraAssistModal: React.FC<InfraAssistModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const projects = useProjectStore((s) => s.projects);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || 'PRJ-MORT-891');

  const currentProject: InfraProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Welcome to Infra-Assist. Grounded telemetry context is currently set to **${currentProject?.name || 'Monitored Assets'}** (${currentProject?.code || ''}). You can inquire about delay causes, cost escalation projections, milestone delivery, or peer benchmarking.`,
      timestamp: 'Just now',
      projectId: currentProject?.id,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    setTimeout(() => {
      try {
        const response = generateAssistantResponse(text, currentProject, projects);
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: response.content,
            timestamp: response.timestamp,
            projectId: response.projectId,
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: 'Unable to complete AI synthesis. Please inspect the project telemetry directly.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } finally {
        setIsThinking(false);
      }
    }, 450);
  };

  const sampleQueries = [
    `Why is ${currentProject?.code || 'this project'} at risk?`,
    'What is the delay forecast & milestone status?',
    'What are the recommended actions?',
    'Which projects require attention first?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none">
      <div className="w-full max-w-2xl neo-panel rounded-[24px] shadow-2xl p-6 space-y-4 max-h-[85vh] flex flex-col justify-between text-slate-900 border border-slate-300/80">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-300/60 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl neo-raised flex items-center justify-center text-indigo-700">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900">Infra-Assist AI</h3>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-lg border border-emerald-200 neo-raised">
                  Grounded Core
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Connected to {projects.length} monitored national infrastructure assets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Project Context Selector */}
            <div className="hidden sm:flex items-center gap-1.5 neo-inset rounded-xl px-2.5 py-1">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="text-xs font-bold bg-transparent text-slate-800 focus:outline-none cursor-pointer max-w-[150px] truncate"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.code}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-80 custom-scrollbar">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg neo-raised text-indigo-700 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  AI
                </div>
              )}
              <div
                className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'neo-button-primary text-white rounded-br-xs font-medium'
                    : 'neo-card text-slate-800 rounded-bl-xs'
                }`}
              >
                <div className="whitespace-pre-line text-xs">{m.text}</div>
                <span
                  className={`text-[9px] mt-1.5 block text-right font-mono ${
                    m.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </span>
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg neo-inset text-indigo-700 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  YOU
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-2.5 items-center text-xs text-slate-500">
              <div className="w-7 h-7 rounded-lg neo-raised text-indigo-700 flex items-center justify-center shrink-0 text-xs font-bold animate-pulse">
                AI
              </div>
              <div className="p-3 rounded-2xl neo-card flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-slate-500 font-medium ml-1">
                  Synthesizing telemetry data...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Query Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {sampleQueries.map((q, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(q)}
              className="text-[11px] font-bold neo-raised hover:text-indigo-700 text-slate-700 px-3 py-1 rounded-xl truncate max-w-xs transition-all cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Action Link to Full Copilot Page */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-300/60">
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate(`/assistant?project=${currentProject.id}`);
            }}
            className="text-indigo-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Open Dedicated Infra-Assist Copilot Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Input Bar */}
        <div className="pt-2 border-t border-slate-300/60 flex items-center gap-2">
          <input
            type="text"
            placeholder={`Ask about ${currentProject.code}, delays, cost variances, or SHAP...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            className="flex-1 neo-input text-xs text-slate-900 placeholder:text-slate-400 rounded-xl px-4 py-2.5 focus:outline-none font-medium"
          />
          <button
            type="button"
            onClick={() => handleSendMessage()}
            className="px-4 py-2.5 text-xs font-bold neo-button-primary flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask</span>
          </button>
        </div>
      </div>
    </div>
  );
};
