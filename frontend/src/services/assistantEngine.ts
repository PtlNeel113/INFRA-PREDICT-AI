import { MOCK_PROJECTS } from '../data/projectsData';
import { MOCK_EARLY_WARNING_ALERTS } from '../data/alertsData';
import { MOCK_BENCHMARKS } from '../data/benchmarkingData';
import { MOCK_EXPLAINABILITY } from '../data/explainabilityData';
import { AssistantMessage } from '../types/assistant';
import { InfraProject } from '../types/projects';

export const PROMPT_CHIPS = [
  {
    id: 'chip-1',
    label: 'Why is this project high risk?',
    prompt: 'Explain the primary risk drivers and SHAP attributions for the selected project.',
    category: 'RISK' as const,
  },
  {
    id: 'chip-2',
    label: 'What changed since the previous update?',
    prompt: 'Summarize the latest trajectory shifts, milestone delays, and risk delta over the last 30 days.',
    category: 'RISK' as const,
  },
  {
    id: 'chip-3',
    label: 'Which projects require attention first?',
    prompt: 'Rank the top high-urgency projects across all sectors requiring immediate ministerial intervention.',
    category: 'PORTFOLIO' as const,
  },
  {
    id: 'chip-4',
    label: 'Show high-risk projects in Gujarat',
    prompt: 'List all mega-infrastructure projects located in Gujarat carrying a Critical or High risk rating.',
    category: 'PORTFOLIO' as const,
  },
  {
    id: 'chip-5',
    label: 'Compare this project with peers',
    prompt: 'Generate a peer benchmarking summary comparing progress velocity, cost overrun, and health against sector medians.',
    category: 'SCHEDULE' as const,
  },
  {
    id: 'chip-6',
    label: 'What are the major cost-risk drivers?',
    prompt: 'Identify the top cost escalation drivers and forecast budget variance across the portfolio.',
    category: 'COST' as const,
  },
];

export function generateAssistantResponse(
  userQuery: string,
  currentProject: InfraProject = MOCK_PROJECTS[0],
): AssistantMessage {
  const query = userQuery.toLowerCase();
  const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const msgId = `msg-${Date.now()}`;

  // 1. "Why is this project high risk?" or "drivers" or "shap"
  if (
    query.includes('why') ||
    query.includes('driver') ||
    query.includes('shap') ||
    query.includes('high risk') ||
    query.includes('explain')
  ) {
    return {
      id: msgId,
      sender: 'assistant',
      content: `Analysis for **${currentProject.name} (${currentProject.code})**:\n\nThe project carries a composite risk score of **${100 - currentProject.healthScore}/100** (${currentProject.riskLevel} Severity). The machine learning model identifies **${currentProject.primaryRiskDriver}** as the single largest contributor (+24.2 points on the SHAP waterfall).\n\nKey vulnerability breakdown:\n• **Execution Friction:** ${currentProject.primaryRiskDriver} across chainage km 312-328.\n• **Contractor Mobilization Deficit:** Secondary drag (+18.4 pts) caused by sub-contractor equipment shortages.\n• **Physical Schedule Slippage:** Currently lagging approved baseline by **${currentProject.progressGap}%**, translating to an estimated delay of **+${currentProject.predictedDelayMonths} months**.`,
      timestamp: timeString,
      projectId: currentProject.id,
      metrics: [
        { label: 'Health Score', value: `${currentProject.healthScore}/100`, color: 'text-rose-600' },
        { label: 'Predicted Delay', value: `+${currentProject.predictedDelayMonths} Mos`, color: 'text-amber-600' },
        { label: 'Cost Overrun', value: `+₹${currentProject.predictedCostOverrunCr} Cr`, color: 'text-rose-600' },
        { label: 'Progress Gap', value: `${currentProject.progressGap}%`, color: 'text-indigo-600' },
      ],
      actions: [
        { label: 'View SHAP Waterfall', actionType: 'NAVIGATE', target: '/explainability' },
        { label: 'Open Project Intelligence', actionType: 'NAVIGATE', target: `/projects/${currentProject.id}` },
        { label: 'Generate Risk Brief', actionType: 'GENERATE_REPORT', target: `/reports?projectId=${currentProject.id}` },
      ],
      sourceCitations: [
        'ML Engine (Ensemble XGBoost + TreeSHAP)',
        'August 2026 Monthly Progress Report',
        'Project Telemetry Database',
      ],
    };
  }

  // 2. "What changed" / "trajectory" / "delta"
  if (query.includes('changed') || query.includes('delta') || query.includes('previous') || query.includes('trend')) {
    return {
      id: msgId,
      sender: 'assistant',
      content: `Telemetry delta for **${currentProject.name}** over the last 30 days:\n\n1. **Risk Score Escalation:** Health score declined from 46 to **${currentProject.healthScore}**, triggered by stalled statutory utility shifting.\n2. **Predicted Completion Shift:** Revised ML delivery forecast moved out by **+1.2 months** to **${currentProject.predictedCompletionDate}**.\n3. **Financial vs Physical Divergence:** Outlay expenditure reached **₹${currentProject.expenditureCr} Cr** (${((currentProject.expenditureCr / currentProject.sanctionedCostCr) * 100).toFixed(1)}%) while physical works stand at only **${currentProject.currentPhysicalProgress}%**.\n4. **Active Nodal Escalations:** 1 critical early warning alert flagged for State Revenue Collector intervention.`,
      timestamp: timeString,
      projectId: currentProject.id,
      metrics: [
        { label: '30-Day Health Δ', value: '-8 pts', color: 'text-rose-600', trend: 'down' },
        { label: 'Physical Progress', value: `${currentProject.currentPhysicalProgress}%`, color: 'text-slate-800' },
        { label: 'Forecast Date', value: currentProject.predictedCompletionDate, color: 'text-indigo-600' },
      ],
      actions: [
        { label: 'View Active Alerts', actionType: 'NAVIGATE', target: '/alerts' },
        { label: 'Open Project Trajectory', actionType: 'NAVIGATE', target: `/projects/${currentProject.id}` },
      ],
      sourceCitations: ['Data Ingestion Ledger Batch #891-B', 'Independent Engineer Site Inspection Log'],
    };
  }

  // 3. "Which projects require attention first" or "urgent" or "rank"
  if (query.includes('attention') || query.includes('first') || query.includes('urgent') || query.includes('priority')) {
    const criticalProjects = MOCK_PROJECTS.filter((p) => p.riskLevel === 'CRITICAL' || p.riskLevel === 'HIGH').slice(0, 3);
    const summaryList = criticalProjects
      .map(
        (p, i) =>
          `**${i + 1}. ${p.code}** (${p.name.slice(0, 35)}...)\n   • Health: **${p.healthScore}/100** | Delay: **+${p.predictedDelayMonths} Mos** | Overrun: **+₹${p.predictedCostOverrunCr} Cr**\n   • Root Cause: ${p.primaryRiskDriver}`,
      )
      .join('\n\n');

    return {
      id: msgId,
      sender: 'assistant',
      content: `### High-Priority Action List (Ranked by Urgency)\n\nBased on the multi-factor risk index, these projects exhibit acute schedule slippage and budget exposure:\n\n${summaryList}\n\n**Recommendation:** Switch to **Decision Mode** on the Command Center or initiate Nodal Escalation Reviews immediately.`,
      timestamp: timeString,
      metrics: [
        { label: 'Critical Packages', value: '4 Projects', color: 'text-rose-600' },
        { label: 'At-Risk Outlay', value: '₹42,850 Cr', color: 'text-amber-600' },
        { label: 'Avg Schedule Lag', value: '+14.2 Mos', color: 'text-rose-600' },
      ],
      actions: [
        { label: 'Enter Decision Mode', actionType: 'NAVIGATE', target: '/dashboard' },
        { label: 'View All Critical Alerts', actionType: 'NAVIGATE', target: '/alerts' },
      ],
      sourceCitations: ['National Multi-Sector Risk Prioritization Matrix'],
    };
  }

  // 4. "Gujarat" or State filtering
  if (query.includes('gujarat') || query.includes('state') || query.includes('region')) {
    const gujaratProjects = MOCK_PROJECTS.filter((p) => p.state.toLowerCase().includes('gujarat'));
    const list = gujaratProjects
      .map((p) => `• **${p.code}** — ${p.name} (Health: **${p.healthScore}/100**, Risk: **${p.riskLevel}**)`)
      .join('\n');

    return {
      id: msgId,
      sender: 'assistant',
      content: `Found **${gujaratProjects.length} active infrastructure projects** in **Gujarat**:\n\n${list}\n\n**Key Focus Area:** The Ahmedabad-Mumbai High Speed Rail Package and Vadodara Expressway segment require targeted inter-departmental clearances for power transmission corridor crossings.`,
      timestamp: timeString,
      metrics: [
        { label: 'State Projects', value: `${gujaratProjects.length} Active`, color: 'text-indigo-600' },
        { label: 'Avg Health', value: '54/100', color: 'text-amber-600' },
      ],
      actions: [
        { label: 'Filter Projects by Gujarat', actionType: 'NAVIGATE', target: '/projects' },
        { label: 'Open National Map', actionType: 'NAVIGATE', target: '/map' },
      ],
      sourceCitations: ['State Infrastructure Registry (Gujarat Nodal Portal)'],
    };
  }

  // 5. Default General Response
  return {
    id: msgId,
    sender: 'assistant',
    content: `I have synthesized the operational telemetry for **${currentProject.name} (${currentProject.code})**:\n\n• **Sector & Implementing Body:** ${currentProject.sector} | ${currentProject.implementingAgency}\n• **Health Score & Risk:** **${currentProject.healthScore}/100** (${currentProject.riskLevel})\n• **Forecast Cost Outlay:** **₹${currentProject.forecastCostCr.toLocaleString('en-IN')} Cr** (+₹${currentProject.predictedCostOverrunCr} Cr Overrun)\n• **Anticipated Completion:** **${currentProject.predictedCompletionDate}** (+${currentProject.predictedDelayMonths} Months Delay)\n• **Primary Bottleneck:** ${currentProject.primaryRiskDriver}\n\nWould you like to examine the SHAP feature contributions, compare with peer packages, or generate an official Executive Risk Brief?`,
    timestamp: timeString,
    projectId: currentProject.id,
    metrics: [
      { label: 'Health Score', value: `${currentProject.healthScore}/100`, color: 'text-indigo-600' },
      { label: 'Forecast Slippage', value: `+${currentProject.predictedDelayMonths} Mos`, color: 'text-rose-600' },
      { label: 'Sanctioned Cost', value: `₹${currentProject.sanctionedCostCr} Cr`, color: 'text-slate-800' },
    ],
    actions: [
      { label: 'View SHAP Explanations', actionType: 'NAVIGATE', target: '/explainability' },
      { label: 'Generate Executive Brief', actionType: 'GENERATE_REPORT', target: `/reports?projectId=${currentProject.id}` },
    ],
    sourceCitations: ['Infrastructure Intelligence Core', 'Public Expenditure Review Committee Benchmark'],
  };
}
