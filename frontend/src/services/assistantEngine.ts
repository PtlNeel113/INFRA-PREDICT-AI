import { MOCK_PROJECTS } from '../data/projectsData';
import { MOCK_EARLY_WARNING_ALERTS } from '../data/alertsData';
import { MOCK_BENCHMARKS } from '../data/benchmarkingData';
import { MOCK_EXPLAINABILITY, ExplainabilityAnalysis } from '../data/explainabilityData';
import {
  AssistantMessage,
  PromptChip,
  AssistantRecommendation,
  AssistantShapFactor,
} from '../types/assistant';
import { InfraProject } from '../types/projects';

export const PROMPT_CHIPS: PromptChip[] = [
  {
    id: 'chip-1',
    label: 'Why is this project high risk?',
    prompt: 'Explain the primary risk drivers and SHAP attributions for the selected project.',
    category: 'RISK',
  },
  {
    id: 'chip-2',
    label: 'What is the delay & milestone status?',
    prompt: 'What is the predicted completion date, schedule progress gap, and status of critical milestones?',
    category: 'SCHEDULE',
  },
  {
    id: 'chip-3',
    label: 'What are the major cost-risk drivers?',
    prompt: 'Detail the sanctioned cost vs expenditure, forecast budget overrun, and financial progress variance.',
    category: 'COST',
  },
  {
    id: 'chip-4',
    label: 'What are the recommended actions?',
    prompt: 'Provide prioritized prescriptive recommendations with expected impact and responsible nodal authority.',
    category: 'RISK',
  },
  {
    id: 'chip-5',
    label: 'Compare this project with peers',
    prompt: 'Generate a peer benchmarking summary comparing progress velocity, cost overrun, and health against sector medians.',
    category: 'SCHEDULE',
  },
  {
    id: 'chip-6',
    label: 'What changed since the previous update?',
    prompt: 'Summarize the latest trajectory shifts, risk trend delta, and recent telemetry updates over the last 30 days.',
    category: 'RISK',
  },
  {
    id: 'chip-7',
    label: 'Which projects require attention first?',
    prompt: 'Rank the top high-urgency projects across all sectors requiring immediate ministerial intervention.',
    category: 'PORTFOLIO',
  },
  {
    id: 'chip-8',
    label: 'Show projects by state or region',
    prompt: 'Summarize the high-risk infrastructure packages located in the project state.',
    category: 'PORTFOLIO',
  },
];

// Helper to compute or retrieve SHAP explainability for any project
function getProjectExplainability(p: InfraProject): ExplainabilityAnalysis {
  if (MOCK_EXPLAINABILITY[p.id]) {
    return MOCK_EXPLAINABILITY[p.id];
  }
  const progressGap = p.expectedProgress - p.currentPhysicalProgress;
  const overrun = p.predictedCostOverrunCr;
  const isHighRisk = p.riskLevel === 'CRITICAL' || p.riskLevel === 'HIGH';

  return {
    projectId: p.id,
    projectCode: p.code,
    projectName: p.name,
    healthScore: p.healthScore,
    riskSeverity: (p.riskLevel === 'CRITICAL' ? 'CRITICAL' : p.riskLevel === 'HIGH' ? 'HIGH' : p.riskLevel === 'MEDIUM' ? 'WATCH' : 'STABLE') as 'CRITICAL' | 'HIGH' | 'WATCH' | 'STABLE',
    modelConfidencePercent: 92.4,
    baseBaselineScore: 50,
    aiSummary: `Telemetry synthesis for ${p.name}: primary risk factor is ${p.primaryRiskDriver} with ${progressGap > 0 ? `a schedule deficit of ${progressGap}%` : 'nominal pace'}.`,
    factors: [
      {
        id: 'f1',
        name: p.primaryRiskDriver,
        category: 'Regulatory',
        contributionScore: isHighRisk ? 22.4 : 11.5,
        importancePercent: 35.0,
        impactType: 'POSITIVE_RISK',
        description: `Primary operational impedance recorded: "${p.primaryRiskDriver}".`,
        evidence: `Direct intake telemetry audit under ${p.implementingAgency}.`,
        mitigationSuggestion: p.recommendedActions?.[0] || 'Convene urgent inter-departmental taskforce.',
      },
      {
        id: 'f2',
        name: progressGap > 0 ? `Schedule Execution Lag (${progressGap}% Deficit)` : 'Baseline Pace Maintenance',
        category: 'Schedule',
        contributionScore: progressGap > 5 ? 18.2 : 6.4,
        importancePercent: 28.0,
        impactType: progressGap > 0 ? 'POSITIVE_RISK' : 'STABILIZING',
        description: `Actual physical completion is ${p.currentPhysicalProgress}% against DPR expected target of ${p.expectedProgress}%.`,
        evidence: `Milestone gate discrepancy analysis.`,
        mitigationSuggestion: p.recommendedActions?.[1] || 'Compress remaining critical path milestones with accelerated shifts.',
      },
      {
        id: 'f3',
        name: overrun > 0 ? `Anticipated Cost Escalation (+₹${overrun} Cr)` : 'Budgetary Containment',
        category: 'Cost',
        contributionScore: overrun > 0 ? 14.6 : -8.5,
        importancePercent: 22.0,
        impactType: overrun > 0 ? 'POSITIVE_RISK' : 'STABILIZING',
        description: `Sanctioned baseline ₹${p.sanctionedCostCr.toLocaleString()} Cr vs current forecast ₹${p.forecastCostCr.toLocaleString()} Cr.`,
        evidence: `Quarterly expenditure audit reconciliation.`,
        mitigationSuggestion: p.recommendedActions?.[2] || 'Execute value-engineering audit and review contractor claims.',
      },
      {
        id: 'f4',
        name: 'Milestone Tracking Governance',
        category: 'Contractor',
        contributionScore: -9.5,
        importancePercent: 8.5,
        impactType: 'STABILIZING',
        description: `${p.keyMilestones?.length || 0} active deliverable gates under telemetry monitoring.`,
        evidence: `${p.keyMilestones?.filter((m) => m.status === 'COMPLETED').length || 0} milestones verified completed.`,
        mitigationSuggestion: 'Maintain bi-weekly PMO inspection rhythm.',
      },
      {
        id: 'f5',
        name: 'Implementing Agency Statutory Oversight',
        category: 'Regulatory',
        contributionScore: -6.2,
        importancePercent: 6.5,
        impactType: 'STABILIZING',
        description: `Direct statutory supervision by ${p.implementingAgency}.`,
        evidence: `Nodal governance framework active.`,
        mitigationSuggestion: 'Leverage state nodal officers for fast-track statutory clearances.',
      },
    ],
  };
}

// Helper to sanitize queries and prevent script injection
function sanitizeQuery(query: string): string {
  return query.replace(/[<>]/g, '').trim();
}

export function generateAssistantResponse(
  userQuery: string,
  currentProject: InfraProject = MOCK_PROJECTS[0],
  allProjects: InfraProject[] = MOCK_PROJECTS,
): AssistantMessage {
  const sanitized = sanitizeQuery(userQuery);
  const query = sanitized.toLowerCase();
  const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const msgId = `msg-${Date.now()}`;

  // Telemetry metadata
  const p = currentProject;
  const progressGap = p.expectedProgress - p.currentPhysicalProgress;
  const overrun = p.predictedCostOverrunCr;
  const compositeRiskScore = Math.max(0, Math.min(100, 100 - p.healthScore));
  const expPercent = p.sanctionedCostCr > 0 ? ((p.expenditureCr / p.sanctionedCostCr) * 100).toFixed(1) : '0';

  // 1. "WHY IS THIS PROJECT HIGH RISK" / SHAP / ROOT CAUSES
  if (
    query.includes('why') ||
    query.includes('shap') ||
    query.includes('driver') ||
    query.includes('root cause') ||
    query.includes('high risk') ||
    query.includes('impediment') ||
    query.includes('bottleneck')
  ) {
    const explainability = getProjectExplainability(p);
    const shapFactors: AssistantShapFactor[] = explainability.factors.map((f) => ({
      factor: f.name,
      contribution: f.contributionScore,
      impactType: f.impactType,
      category: f.category,
      evidence: f.evidence,
    }));

    const positiveDrivers = explainability.factors
      .filter((f) => f.impactType === 'POSITIVE_RISK')
      .map((f) => `• **${f.name}** (+${f.contributionScore.toFixed(1)} pts on SHAP index): ${f.description}`)
      .join('\n');

    const stabilizingFactors = explainability.factors
      .filter((f) => f.impactType === 'STABILIZING')
      .map((f) => `• **${f.name}** (${f.contributionScore.toFixed(1)} pts mitigator): ${f.description}`)
      .join('\n');

    return {
      id: msgId,
      sender: 'assistant',
      content: `### Explainable AI Risk Attribution: **${p.name}** (${p.code})

The operational composite risk index stands at **${compositeRiskScore}/100** (Severity: **${p.riskLevel}**). The TreeSHAP attribution model isolates **${p.primaryRiskDriver}** as the primary risk driver.

#### Primary Vulnerability Factors (Increasing Risk):
${positiveDrivers || `• **${p.primaryRiskDriver}**: Contributing friction to operational execution.`}

#### Stabilizing Factors (Mitigating Exposure):
${stabilizingFactors || `• **Statutory Governance**: Project is directly supervised by ${p.implementingAgency}.`}

${p.currentIssues ? `**Field Issues On Record:**\n${p.currentIssues}\n` : ''}${p.constraints ? `**Critical Constraints:** ${p.constraints}` : ''}`,
      timestamp: timeString,
      projectId: p.id,
      confidencePercent: explainability.modelConfidencePercent || 93.2,
      dataQuality: {
        score: 96,
        freshness: 'Synchronized today',
        status: 'Verified',
      },
      shapBreakdown: shapFactors,
      metrics: [
        { label: 'Health Score', value: `${p.healthScore}/100`, color: p.healthScore < 50 ? 'text-rose-600 dark:text-rose-400' : p.healthScore < 70 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400' },
        { label: 'Risk Severity', value: p.riskLevel, color: p.riskLevel === 'CRITICAL' ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400' },
        { label: 'Forecast Delay', value: `+${p.predictedDelayMonths} Mos`, color: p.predictedDelayMonths > 6 ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400' },
        { label: 'Cost Overrun', value: `+₹${p.predictedCostOverrunCr.toLocaleString()} Cr`, color: p.predictedCostOverrunCr > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300' },
      ],
      actions: [
        { label: 'Open SHAP Waterfall', actionType: 'NAVIGATE', target: `/explainability?project=${p.id}` },
        { label: 'Full Project Intelligence', actionType: 'NAVIGATE', target: `/projects/${p.id}` },
        { label: 'Generate Risk Brief', actionType: 'GENERATE_REPORT', target: `/reports?projectId=${p.id}` },
      ],
      sourceCitations: [
        'TreeSHAP Gradient Boosting Model (v2.4)',
        `${p.implementingAgency} Project Registry`,
        'National Infrastructure Intelligence Core',
      ],
    };
  }

  // 2. "DELAY" / "SCHEDULE" / "TIMELINE" / "PROGRESS GAP" / "COMPLETION"
  if (
    query.includes('delay') ||
    query.includes('schedule') ||
    query.includes('timeline') ||
    query.includes('target date') ||
    query.includes('deadline') ||
    query.includes('completion') ||
    query.includes('slippage')
  ) {
    const delayedMilestones = p.keyMilestones?.filter((m) => m.status === 'DELAYED' || m.status === 'CRITICAL') || [];

    return {
      id: msgId,
      sender: 'assistant',
      content: `### Schedule & Timeline Analysis: **${p.name}** (${p.code})

• **Planned Delivery Baseline:** ${p.originalDeadline || 'TBD'}
• **AI Forecast Completion:** **${p.predictedCompletionDate}**
• **Predicted Delay Duration:** **+${p.predictedDelayMonths} Months**
• **Schedule Progress Variance:** Expected **${p.expectedProgress}%** vs Actual **${p.currentPhysicalProgress}%** (${progressGap > 0 ? `Deficit of **${progressGap.toFixed(1)}%**` : 'On track with zero deficit'}).
• **Time Risk Pillar Score:** **${p.timeRiskScore}/100**

${delayedMilestones.length > 0 ? `#### Critical Milestones Facing Slippage:\n${delayedMilestones.map((m) => `• **${m.title}**: Target was ${m.targetDate} (${m.status} - Critical Path: ${m.criticalPath ? 'Yes' : 'No'})`).join('\n')}` : `• All scheduled deliverables currently progressing along nominal trajectory.`}

${p.delays ? `**Delays Recorded by Field Team:**\n${p.delays}` : ''}`,
      timestamp: timeString,
      projectId: p.id,
      confidencePercent: 91.8,
      dataQuality: {
        score: 94,
        freshness: 'Synchronized today',
        status: 'Verified',
      },
      metrics: [
        { label: 'Predicted Delay', value: `+${p.predictedDelayMonths} Mos`, color: 'text-rose-600 dark:text-rose-400' },
        { label: 'Progress Gap', value: `${progressGap.toFixed(1)}%`, color: progressGap > 5 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200' },
        { label: 'Current Progress', value: `${p.currentPhysicalProgress}%`, color: 'text-indigo-600 dark:text-indigo-400' },
        { label: 'Forecast Date', value: p.predictedCompletionDate, color: 'text-slate-800 dark:text-slate-200' },
      ],
      actions: [
        { label: 'View Predictions Module', actionType: 'NAVIGATE', target: `/predictions?project=${p.id}` },
        { label: 'Milestone Intelligence', actionType: 'NAVIGATE', target: `/projects/${p.id}#milestones` },
      ],
      sourceCitations: [
        'DPR Baseline Schedule Curve',
        'Physical Milestone Telemetry Log',
        'Time-Series Delay Forecaster',
      ],
    };
  }

  // 3. "COST" / "BUDGET" / "OVERRUN" / "EXPENDITURE" / "FINANCIAL"
  if (
    query.includes('cost') ||
    query.includes('budget') ||
    query.includes('overrun') ||
    query.includes('expenditure') ||
    query.includes('financial') ||
    query.includes('sanctioned')
  ) {
    const variance = p.forecastCostCr - p.sanctionedCostCr;
    const isOverrun = variance > 0;

    return {
      id: msgId,
      sender: 'assistant',
      content: `### Financial Exposure & Cost Outlay: **${p.name}** (${p.code})

• **Sanctioned Baseline Cost:** **₹${p.sanctionedCostCr.toLocaleString('en-IN')} Cr**
• **Current Revised Baseline:** ₹${(p.revisedCostCr || p.sanctionedCostCr).toLocaleString('en-IN')} Cr
• **Cumulative Expenditure to Date:** **₹${p.expenditureCr.toLocaleString('en-IN')} Cr** (${expPercent}% of sanctioned outlay)
• **Forecast Final Cost:** **₹${p.forecastCostCr.toLocaleString('en-IN')} Cr**
• **Estimated Cost Overrun:** ${isOverrun ? `**+₹${variance.toLocaleString('en-IN')} Cr** (${((variance / p.sanctionedCostCr) * 100).toFixed(1)}% escalation)` : '**₹0 Cr** (Within sanctioned limit)'}
• **Cost Risk Pillar Score:** **${p.costRiskScore}/100**

#### Financial vs Physical Pace Divergence:
The project has utilized **${expPercent}%** of allocated capital while delivering **${p.currentPhysicalProgress}%** physical completion${parseFloat(expPercent) > p.currentPhysicalProgress + 10 ? ` (Divergence: capital draw is outpacing civil delivery by ${(parseFloat(expPercent) - p.currentPhysicalProgress).toFixed(1)} points)` : ' (Capital expenditure is well-aligned with physical milestones)'}.`,
      timestamp: timeString,
      projectId: p.id,
      confidencePercent: 94.0,
      dataQuality: {
        score: 98,
        freshness: 'PFMS reconciliation active',
        status: 'Verified',
      },
      metrics: [
        { label: 'Sanctioned Cost', value: `₹${p.sanctionedCostCr.toLocaleString()} Cr`, color: 'text-slate-800 dark:text-slate-200' },
        { label: 'Expenditure', value: `₹${p.expenditureCr.toLocaleString()} Cr`, color: 'text-indigo-600 dark:text-indigo-400' },
        { label: 'Forecast Overrun', value: `+₹${p.predictedCostOverrunCr.toLocaleString()} Cr`, color: p.predictedCostOverrunCr > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400' },
        { label: 'Cost Risk Score', value: `${p.costRiskScore}/100`, color: p.costRiskScore > 70 ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400' },
      ],
      actions: [
        { label: 'Open Financial Analytics', actionType: 'NAVIGATE', target: `/analytics` },
        { label: 'Generate Risk Brief', actionType: 'GENERATE_REPORT', target: `/reports?projectId=${p.id}` },
      ],
      sourceCitations: [
        'Public Financial Management System (PFMS)',
        'Quarterly Project Expenditure Audit',
        'Cost Variance Prediction Model',
      ],
    };
  }

  // 4. "MILESTONES" / "DELIVERABLES" / "GATES"
  if (
    query.includes('milestone') ||
    query.includes('deliverable') ||
    query.includes('gate') ||
    query.includes('phase')
  ) {
    const milestones = p.keyMilestones || [];
    const completed = milestones.filter((m) => m.status === 'COMPLETED').length;
    const delayed = milestones.filter((m) => m.status === 'DELAYED' || m.status === 'CRITICAL').length;
    const onTrack = milestones.filter((m) => m.status === 'ON_TRACK').length;

    const formattedList = milestones.length > 0
      ? milestones.map((m, idx) => {
          const statusBadge = m.status === 'COMPLETED' ? 'Completed' : m.status === 'ON_TRACK' ? 'On Track' : 'Delayed';
          return `${idx + 1}. **${m.title}**\n   • Status: ${statusBadge} | Target Date: **${m.targetDate}**${m.criticalPath ? ' | *Critical Path Gate*' : ''}`;
        }).join('\n\n')
      : 'No formal milestone schedule recorded for this package.';

    return {
      id: msgId,
      sender: 'assistant',
      content: `### Milestone Telemetry Summary: **${p.name}** (${p.code})

Total Tracked Milestones: **${milestones.length}** (${completed} Completed, ${onTrack} On Track, ${delayed} Delayed).

${formattedList}

**PMO Assessment:** Critical path milestones experiencing delay require statutory intervention to prevent contiguous downstream stalling.`,
      timestamp: timeString,
      projectId: p.id,
      confidencePercent: 96.0,
      dataQuality: {
        score: 95,
        freshness: 'Verified with site inspections',
        status: 'Verified',
      },
      metrics: [
        { label: 'Total Milestones', value: `${milestones.length}`, color: 'text-slate-800 dark:text-slate-200' },
        { label: 'Completed', value: `${completed}`, color: 'text-emerald-600 dark:text-emerald-400' },
        { label: 'Delayed Gates', value: `${delayed}`, color: delayed > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400' },
      ],
      actions: [
        { label: 'View Project Timeline', actionType: 'NAVIGATE', target: `/projects/${p.id}#milestones` },
      ],
      sourceCitations: [
        'Integrated Milestone Monitoring System',
        'Independent Engineer Inspection Log',
      ],
    };
  }

  // 5. "PEER BENCHMARK" / "COMPARE" / "SECTOR MEDIAN"
  if (
    query.includes('benchmark') ||
    query.includes('compare') ||
    query.includes('peer') ||
    query.includes('median') ||
    query.includes('sector average')
  ) {
    const staticBenchmark = MOCK_BENCHMARKS[p.id];
    const sectorPeers = allProjects.filter((other) => other.sector === p.sector);
    const peerMedianHealth = sectorPeers.length > 0
      ? Math.round(sectorPeers.reduce((s, o) => s + o.healthScore, 0) / sectorPeers.length)
      : 65;

    let content = '';
    if (staticBenchmark) {
      content = `### Peer Benchmarking Analysis: **${p.name}** (${p.sector})

${staticBenchmark.aiComparisonSummary}

#### Key Variance Differentiators:
${staticBenchmark.keyDifferences.map((d) => `• **${d.metric}** (${d.impact}): ${d.difference} — ${d.explanation}`).join('\n')}`;
    } else {
      content = `### Sector Peer Benchmarking: **${p.name}** vs **${p.sector} Peers**

• **Project Health Score:** **${p.healthScore}/100** vs Sector Peer Median **${peerMedianHealth}/100** (${p.healthScore < peerMedianHealth ? 'Underperforming sector average' : 'Performing at or above sector standard'}).
• **Cost Risk Index:** **${p.costRiskScore}/100** vs Sector Median **52/100**.
• **Schedule Delay Risk:** **+${p.predictedDelayMonths} Mos** vs Sector Median **+3.5 Mos**.
• **Execution Track:** Project is managed by **${p.implementingAgency}** in **${p.state}**.`;
    }

    return {
      id: msgId,
      sender: 'assistant',
      content,
      timestamp: timeString,
      projectId: p.id,
      confidencePercent: 91.5,
      dataQuality: {
        score: 92,
        freshness: 'Comparative sector batch #2026-Q3',
        status: 'Verified',
      },
      metrics: [
        { label: 'Project Health', value: `${p.healthScore}/100`, color: p.healthScore < peerMedianHealth ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400' },
        { label: 'Sector Median', value: `${peerMedianHealth}/100`, color: 'text-slate-800 dark:text-slate-200' },
        { label: 'Active Sector Peers', value: `${sectorPeers.length} Assets`, color: 'text-indigo-600 dark:text-indigo-400' },
      ],
      actions: [
        { label: 'Open Peer Benchmarking', actionType: 'NAVIGATE', target: `/benchmarking?projectId=${p.id}` },
        { label: 'Sector Portfolio Analytics', actionType: 'NAVIGATE', target: `/analytics` },
      ],
      sourceCitations: [
        'Cross-Sector Peer Benchmarking Database',
        'MoSPI Central Monitoring Infrastructure Index',
      ],
    };
  }

  // 6. "RECOMMENDATIONS" / "ACTION PLAN" / "MITIGATION" / "NEXT STEPS"
  if (
    query.includes('recommend') ||
    query.includes('action') ||
    query.includes('mitigat') ||
    query.includes('next steps') ||
    query.includes('prescriptive') ||
    query.includes('intervention')
  ) {
    const rawRecommendations = p.recommendedActions && p.recommendedActions.length > 0
      ? p.recommendedActions
      : [
          `Form a ministerial taskforce with ${p.implementingAgency} to address ${p.primaryRiskDriver}.`,
          'Mandate double-shift civil works to compress delayed critical path milestones.',
          'Convene monthly financial reconciliation to cap forecast budget escalation.',
        ];

    const structuredRecs: AssistantRecommendation[] = [
      {
        priority: 'P1 - Immediate',
        urgency: 'Within 48 Hours',
        action: rawRecommendations[0],
        expectedImpact: `Recovers up to 1.5 months slippage on ${p.primaryRiskDriver}.`,
        responsibleEntity: `${p.implementingAgency} Joint Secretary & State Nodal Officer`,
      },
      {
        priority: 'P2 - High',
        urgency: 'Within 7 Days',
        action: rawRecommendations[1] || 'Deploy high-capacity machinery and establish parallel work fronts.',
        expectedImpact: 'Prevents contiguous milestone chain delays.',
        responsibleEntity: 'EPC Contractor Project Director & Lead Engineer',
      },
      {
        priority: 'P3 - Medium',
        urgency: 'Next PMO Review Cycle',
        action: rawRecommendations[2] || 'Audit financial claims and review value-engineering alternatives.',
        expectedImpact: `Constrains forecast cost escalation to within ₹${p.predictedCostOverrunCr} Cr.`,
        responsibleEntity: 'Finance Wing / Internal Audit Committee',
      },
    ];

    return {
      id: msgId,
      sender: 'assistant',
      content: `### Prescriptive Operational Interventions: **${p.name}** (${p.code})

The following prioritized actions are formulated based on multi-variate risk modeling to reverse schedule slippage and contain cost escalation:`,
      timestamp: timeString,
      projectId: p.id,
      confidencePercent: 93.0,
      dataQuality: {
        score: 95,
        freshness: 'Live PMG rule engine',
        status: 'Verified',
      },
      recommendations: structuredRecs,
      actions: [
        { label: 'Generate Risk Brief with Action Plan', actionType: 'GENERATE_REPORT', target: `/reports?projectId=${p.id}` },
        { label: 'Review Project Details', actionType: 'NAVIGATE', target: `/projects/${p.id}` },
      ],
      sourceCitations: [
        'National PMG Escalation Protocol',
        'Cabinet Secretariat Infrastructure Review Directives',
      ],
    };
  }

  // 7. "WHAT CHANGED" / "TRAJECTORY" / "30-DAY DELTA" / "TREND"
  if (
    query.includes('changed') ||
    query.includes('delta') ||
    query.includes('previous') ||
    query.includes('trajectory') ||
    query.includes('trend') ||
    query.includes('shift')
  ) {
    const trendDirection = p.riskTrend > 0 ? 'DETERIORATING' : p.riskTrend < 0 ? 'IMPROVING' : 'STABLE';
    const deltaText = p.riskTrend > 0 ? `+${p.riskTrend} pts (Risk increased)` : p.riskTrend < 0 ? `${p.riskTrend} pts (Risk mitigated)` : 'Neutral (No change)';

    return {
      id: msgId,
      sender: 'assistant',
      content: `### Telemetry Shift & Trajectory Delta: **${p.name}**

• **Risk Trajectory Trend:** **${trendDirection}** (${deltaText} over the last cycle).
• **Current Composite Health:** **${p.healthScore}/100** (Baseline was ${Math.min(100, p.healthScore + p.riskTrend)}).
• **Predicted Completion Drift:** Model adjusted forecast by **+${(p.predictedDelayMonths * 0.2).toFixed(1)} months** to **${p.predictedCompletionDate}**.
• **Capital Draw vs Deliverables:** Cumulative expenditure increased to **₹${p.expenditureCr} Cr** (${expPercent}%) while actual physical works stand at **${p.currentPhysicalProgress}%**.
• **Primary Driver Velocity:** ${p.primaryRiskDriver}.`,
      timestamp: timeString,
      projectId: p.id,
      confidencePercent: 92.5,
      dataQuality: {
        score: 96,
        freshness: 'Cycle 2026-08',
        status: 'Verified',
      },
      riskTrajectory: {
        trend: trendDirection,
        delta: p.riskTrend,
        explanation: `Trajectory indicates ${trendDirection.toLowerCase()} operational momentum due to ${p.primaryRiskDriver}.`,
      },
      metrics: [
        { label: 'Risk Trend Δ', value: deltaText, color: p.riskTrend > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400' },
        { label: 'Physical Progress', value: `${p.currentPhysicalProgress}%`, color: 'text-indigo-600 dark:text-indigo-400' },
        { label: 'Forecast Date', value: p.predictedCompletionDate, color: 'text-slate-800 dark:text-slate-200' },
      ],
      actions: [
        { label: 'View Active Alerts', actionType: 'NAVIGATE', target: '/alerts' },
        { label: 'View Risk Trajectory Chart', actionType: 'NAVIGATE', target: `/projects/${p.id}#trajectory` },
      ],
      sourceCitations: [
        'Change Intelligence Cycle Ledger',
        'Continuous Project Telemetry Stream',
      ],
    };
  }

  // 8. "PORTFOLIO" / "WHICH PROJECTS REQUIRE ATTENTION FIRST" / "RANK" / "URGENT"
  if (
    query.includes('attention') ||
    query.includes('first') ||
    query.includes('urgent') ||
    query.includes('priority') ||
    query.includes('rank') ||
    query.includes('portfolio')
  ) {
    const sortedProjects = [...allProjects].sort((a, b) => a.healthScore - b.healthScore);
    const criticalProjects = sortedProjects.slice(0, 4);
    const totalOutlay = allProjects.reduce((sum, item) => sum + item.sanctionedCostCr, 0);
    const totalOverrun = allProjects.reduce((sum, item) => sum + item.predictedCostOverrunCr, 0);

    const summaryList = criticalProjects
      .map(
        (prj, idx) =>
          `**${idx + 1}. ${prj.code} — ${prj.name}**\n   • Health: **${prj.healthScore}/100** (${prj.riskLevel}) | Delay: **+${prj.predictedDelayMonths} Mos** | Overrun: **+₹${prj.predictedCostOverrunCr} Cr**\n   • Root Cause: ${prj.primaryRiskDriver}\n   • Location: ${prj.state} (${prj.implementingAgency})`,
      )
      .join('\n\n');

    return {
      id: msgId,
      sender: 'assistant',
      content: `### National Infrastructure Urgency Ranking

Across the **${allProjects.length} monitored national projects**, the following packages represent the most severe capital exposure and delivery drag:

${summaryList}

**Portfolio Exposure Summary:**
• Total Monitored Outlay: **₹${totalOutlay.toLocaleString('en-IN')} Cr**
• Predicted Portfolio Cost Overrun: **+₹${totalOverrun.toLocaleString('en-IN')} Cr**
• Recommendation: Enter **Decision Mode** on the Executive Command Center to deploy prescriptive mitigations.`,
      timestamp: timeString,
      confidencePercent: 95.5,
      dataQuality: {
        score: 97,
        freshness: 'All monitored assets active',
        status: 'Verified',
      },
      metrics: [
        { label: 'Monitored Assets', value: `${allProjects.length}`, color: 'text-indigo-600 dark:text-indigo-400' },
        { label: 'Critical Assets', value: `${allProjects.filter((i) => i.riskLevel === 'CRITICAL').length}`, color: 'text-rose-600 dark:text-rose-400' },
        { label: 'Overrun Exposure', value: `₹${totalOverrun.toLocaleString()} Cr`, color: 'text-rose-600 dark:text-rose-400' },
      ],
      actions: [
        { label: 'Enter Decision Mode', actionType: 'NAVIGATE', target: '/dashboard' },
        { label: 'Open Early Warnings Center', actionType: 'NAVIGATE', target: '/alerts' },
      ],
      sourceCitations: [
        'National Infrastructure Priority Matrix',
        'Cabinet Secretariat Monitoring Registry',
      ],
    };
  }

  // 9. "STATE" / "GUJARAT" / "MAHARASHTRA" / REGIONAL QUERIES
  const indianStates = ['gujarat', 'maharashtra', 'tamil nadu', 'karnataka', 'uttar pradesh', 'delhi', 'kerala', 'rajasthan', 'madhya pradesh', 'bihar', 'west bengal', 'andhra pradesh', 'telangana', 'odisha', 'punjab', 'haryana', 'assam', 'ladakh', 'jammu'];
  const matchedState = indianStates.find((st) => query.includes(st)) || (query.includes('state') || query.includes('region') ? p.state.toLowerCase() : null);

  if (matchedState) {
    const stateProjects = allProjects.filter((item) => item.state.toLowerCase().includes(matchedState));
    const count = stateProjects.length;

    if (count > 0) {
      const list = stateProjects
        .map((item) => `• **${item.code}** — ${item.name}\n  (Health: **${item.healthScore}/100**, Risk: **${item.riskLevel}**, Delay: **+${item.predictedDelayMonths} Mos**, Overrun: **+₹${item.predictedCostOverrunCr} Cr**)`)
        .join('\n\n');

      return {
        id: msgId,
        sender: 'assistant',
        content: `### Regional Telemetry Brief: **${matchedState.toUpperCase()}**

Found **${count} monitored infrastructure projects** in ${matchedState.toUpperCase()}:

${list}

**Regional Observation:** Coordination between State Revenue Authorities and Central Implementing Agencies is critical for fast-tracking linear clearances.`,
        timestamp: timeString,
        confidencePercent: 94.0,
        dataQuality: {
          score: 96,
          freshness: 'State Nodal Portal Sync',
          status: 'Verified',
        },
        metrics: [
          { label: 'State Projects', value: `${count} Active`, color: 'text-indigo-600 dark:text-indigo-400' },
          { label: 'Critical Assets', value: `${stateProjects.filter((i) => i.riskLevel === 'CRITICAL').length}`, color: 'text-rose-600 dark:text-rose-400' },
        ],
        actions: [
          { label: 'View National Risk Map', actionType: 'NAVIGATE', target: '/map' },
          { label: 'Filter Projects Registry', actionType: 'NAVIGATE', target: '/projects' },
        ],
        sourceCitations: [`State Infrastructure Coordination Office (${matchedState})`],
      };
    }
  }

  // 10. DEFAULT GENERAL SYNTHESIS FOR CURRENT PROJECT
  return {
    id: msgId,
    sender: 'assistant',
    content: `### Operational Intelligence Dossier: **${p.name}** (${p.code})

• **Sector & Agency:** ${p.sector} • ${p.implementingAgency} (${p.state})
• **Composite Health Score:** **${p.healthScore}/100** (Severity: **${p.riskLevel}**)
• **Financials:** Sanctioned **₹${p.sanctionedCostCr.toLocaleString('en-IN')} Cr** | Spent **₹${p.expenditureCr.toLocaleString('en-IN')} Cr** (${expPercent}%) | Forecast Overrun: **+₹${p.predictedCostOverrunCr.toLocaleString('en-IN')} Cr**
• **Schedule Status:** Expected **${p.expectedProgress}%** vs Actual **${p.currentPhysicalProgress}%** (Predicted Completion: **${p.predictedCompletionDate}**, Delay: **+${p.predictedDelayMonths} Mos**)
• **Primary Bottleneck:** ${p.primaryRiskDriver}
${p.currentIssues ? `• **Recorded Field Issue:** ${p.currentIssues}` : ''}

You can ask about SHAP feature contributions, milestone schedules, peer benchmarking, cost overrun projections, or generate an Executive Risk Brief.`,
    timestamp: timeString,
    projectId: p.id,
    confidencePercent: 93.5,
    dataQuality: {
      score: 95,
      freshness: 'Synchronized today',
      status: 'Verified',
    },
    metrics: [
      { label: 'Health Score', value: `${p.healthScore}/100`, color: p.healthScore < 60 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Forecast Slippage', value: `+${p.predictedDelayMonths} Mos`, color: 'text-rose-600 dark:text-rose-400' },
      { label: 'Cost Overrun', value: `+₹${p.predictedCostOverrunCr} Cr`, color: p.predictedCostOverrunCr > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200' },
      { label: 'Physical Progress', value: `${p.currentPhysicalProgress}%`, color: 'text-indigo-600 dark:text-indigo-400' },
    ],
    actions: [
      { label: 'Why is it at risk? (SHAP)', actionType: 'FILTER', target: 'Why is this project high risk?' },
      { label: 'Open Project Intelligence', actionType: 'NAVIGATE', target: `/projects/${p.id}` },
      { label: 'Generate Executive Brief', actionType: 'GENERATE_REPORT', target: `/reports?projectId=${p.id}` },
    ],
    sourceCitations: [
      'Infrastructure Intelligence Core Database',
      'Central Project Monitoring System',
      'XGBoost Risk Classifier v2.4',
    ],
  };
}
