import React, { useState } from 'react';
import { Bot, Send, Sparkles, X, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

interface InfraAssistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const InfraAssistModal: React.FC<InfraAssistModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Welcome. I am the Infra-Assist AI assistant. You can ask me about project delay factors, state-wise bottleneck concentrations, or simulate budget risk scenarios.',
      timestamp: '10:42 AM',
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
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('delhi-mumbai') || lower.includes('dme')) {
        reply =
          '**Delhi-Mumbai Expressway Pkg-14B Analysis**:\n- **Predicted Delay**: 7.5 months (Est. completion: July 2026).\n- **Primary Bottleneck**: Forest Clearance & Gas Pipeline Relocation in Vadodara section.\n- **Overrun Exposure**: +₹340 Cr.\n- **Recommended Action**: Inter-agency taskforce escalation with Gujarat Forest Dept and GAIL.';
      } else if (lower.includes('chennai') || lower.includes('metro')) {
        reply =
          '**Chennai Metro Phase 2 Corridor 4**:\n- **Status**: Critical (Health: 49/100).\n- **Root Cause**: Underground TBM hard-rock strata wear at Panagal Park.\n- **Delay Risk**: +8.0 months | +₹840 Cr variance.\n- **Prescriptive Recommendation**: Deploy twin high-torque cutter heads and adjust shift rotation.';
      } else if (lower.includes('critical') || lower.includes('top risk')) {
        reply =
          'Currently **84 mega projects** are flagged as Critical across India. The top 3 severe risks are:\n1. Delhi-Mumbai Expressway Pkg-14B (7.5 mo delay)\n2. Zojila Bi-Directional Tunnel (9.0 mo delay)\n3. Chennai Metro Phase 2 Corridor 4 (8.0 mo delay)\nTotal capital exposure at risk: **₹1,48,200 Cr**.';
      } else {
        reply = `Based on multi-variate modeling across the monitored portfolio, ${text.slice(
          0,
          30,
        )}... correlates with right-of-way clearance cycle delays. The historical resolution velocity is 4.2 months with 89% mitigation compliance.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          timestamp: 'Just now',
        },
      ]);
      setIsThinking(false);
    }, 800);
  };

  const sampleQueries = [
    'Why is Delhi-Mumbai Expressway Pkg-14B delayed?',
    'What are the top 3 critical projects in India right now?',
    'Explain Chennai Metro Phase-2 underground bottleneck',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060F1D]/70 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white rounded-[20px] border border-[#E2E8F0] gov-shadow p-6 space-y-4 max-h-[85vh] flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#155EEF] text-white flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-[#0B1F3A]">Infra-Assist</h3>
                <span className="text-[10px] font-bold bg-[#EBF2FF] text-[#155EEF] px-2 py-0.5 rounded">
                  AI Assistant
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Domain-trained on national infrastructure project graphs</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-80 custom-scrollbar">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-[#0B1F3A] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  AI
                </div>
              )}
              <div
                className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#155EEF] text-white rounded-br-xs font-medium'
                    : 'bg-[#F8FAFC] border border-[#E2E8F0] text-slate-800 rounded-bl-xs'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>
                <span
                  className={`text-[9px] mt-1 block text-right ${
                    m.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </span>
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#155EEF] flex items-center justify-center shrink-0 text-xs font-bold">
                  VM
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-2.5 items-center text-xs text-slate-500">
              <div className="w-7 h-7 rounded-lg bg-[#0B1F3A] text-white flex items-center justify-center shrink-0 text-xs font-bold animate-pulse">
                AI
              </div>
              <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#155EEF] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#155EEF] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#155EEF] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-slate-500 font-medium ml-1">
                  Correlating projects in memory...
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
              className="text-[11px] font-medium bg-[#F8FAFC] hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 truncate max-w-xs transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about project delays, cost variances, or SHAP factors..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#155EEF] text-xs text-[#0B1F3A] placeholder:text-slate-400 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleSendMessage()}
            leftIcon={<Send className="w-3.5 h-3.5" />}
          >
            Ask
          </Button>
        </div>
      </div>
    </div>
  );
};
