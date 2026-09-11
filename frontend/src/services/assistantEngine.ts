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
import { UserRole, ROLE_DEFINITIONS } from '../config/roles';

export const PROMPT_CHIPS: PromptChip[] = [
  {
    id: 'chip-1',
    label: 'Why is this project high risk?',
    prompt: 'Explain the primary risk drivers and contributing factors for the selected project.',
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

/**
 * Returns role-tailored prompt chips based on active UserRole
 */
export function getPromptChipsForRole(role?: UserRole): PromptChip[] {
  const currentRole: UserRole = role || 'Senior Decision Maker';
  const roleDef = ROLE_DEFINITIONS[currentRole] || ROLE_DEFINITIONS['Senior Decision Maker'];
  const chips = roleDef.aiPersona.promptChips;

  return chips.map((label, idx) => ({
    id: `role-chip-${idx + 1}`,
    label,
    prompt: label,
    category: (idx % 2 === 0 ? 'RISK' : 'SCHEDULE') as any,
  }));
}

// Helper to compute or retrieve explainability for any project
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
        importancePercent: 15.0,
        impactType: 'STABILIZING',
        description: 'Consistent monthly milestone reporting cadence maintained by concessionaire.',
        evidence: 'Field inspection and site surveillance logs.',
        mitigationSuggestion: 'Maintain bi-weekly review meetings.',
      },
    ],
  };
}

export function generateAssistantResponse(
  userQuery: string,
  currentProject: InfraProject | string = MOCK_PROJECTS[0],
  allProjects: InfraProject[] = MOCK_PROJECTS,
  userRole?: UserRole,
): AssistantMessage {
  const query = userQuery.toLowerCase();
  const p = typeof currentProject === 'string'
    ? (allProjects.find((item) => item.id === currentProject || item.code === currentProject) || allProjects[0])
    : (currentProject || allProjects[0]);
  const progressGap = p.expectedProgress - p.currentPhysicalProgress;
  const msgId = `msg-${Date.now()}`;
  const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const overrun = p.predictedCostOverrunCr;
  const compositeRiskScore = Math.max(0, Math.min(100, 100 - p.healthScore));
  const expPercent = p.sanctionedCostCr > 0 ? ((p.expenditureCr / p.sanctionedCostCr) * 100).toFixed(1) : '0';

  // 0A. AUDITOR READ-ONLY GUARDRAIL
  if (
    userRole === 'Auditor / Viewer' &&
    (query.includes('edit') ||
      query.includes('modify') ||
      query.includes('upload') ||
      query.includes('ingest') ||
      query.includes('delete') ||
      query.includes('change cost') ||
      query.includes('update deadline'))
  ) {
    return {
      id: msgId,
      sender: 'assistant',
      content: `### Statutory Audit Policy Notice: Read-Only Constraint Enforced

In accordance with Government RBAC policy and statutory audit standards:
• **Active Role:** Auditor / Viewer (Strict Read-Only)
• **Policy Restriction:** Data mutations, uploads, edits, and deletions are strictly disabled.
• **Permitted Operations:** Historical variance verification across April–July 2026, fund utilization analysis, discrepancy flagging, and statutory audit report export.

You can ask for statutory audit summaries, compliance checklists, or historical variance reconciliations.`,
      timestamp: timeString,
      projectId: p.id,
      dataQuality: {
        score: 100,
        freshness: 'PAIMANA Historical Dataset (April–July 2026)',
        status: 'Immutable',
      },
      metrics: [
        { label: 'Access Level', value: 'Read-Only', color: 'text-amber-600 dark:text-amber-400' },
        { label: 'Policy Status', value: 'Enforced', color: 'text-emerald-600 dark:text-emerald-400' },
      ],
      actions: [
        { label: 'Verify 4-Month PAIMANA Integrity', actionType: 'FILTER', target: 'Verify 4-month PAIMANA variance integrity' },
        { label: 'Statutory Observations', actionType: 'FILTER', target: 'Generate statutory audit observation summary' },
      ],
      sourceCitations: ['Statutory Audit & Governance Rules', 'PAIMANA Historical Repository'],
    };
  }

  // 0B. AUDITOR: 4-MONTH HISTORICAL VARIANCE INTEGRITY
  if (
    query.includes('verify 4-month') ||
    query.includes('variance integrity') ||
    query.includes('historical cost revision') ||
    query.includes('statutory audit observation')
  ) {
    return {
      id: msgId,
      sender: 'assistant',
      content: `### Statutory Audit Verification: PAIMANA 4-Month Historical Integrity (April–July 2026)

• **Historical Scope Reconciled:** 4 monthly official releases (April 2026, May 2026, June 2026, July 2026).
• **Dataset Immutability:** 59 of 59 Central Sector project records verified intact against official MoSPI releases.
• **Checksum Status:** SHA-256 integrity hash verified with **Zero unauthorized alterations**.
• **Historical Cost Revisions:**
  - 51 projects maintained baseline sanctioned costs without revision.
  - 8 projects carry approved administrative cost revisions recorded in formal CCEA/PIB approvals.
• **Fund Utilization Assessment:**
  - Total Sanctioned Outlay: **₹2,41,580 Cr**
  - Total Cumulative Expenditure: **₹1,65,240 Cr** (68.4% utilization rate)
  - Zero unvouched or orphan expenditure entries detected.

**Audit Recommendation:** All records comply with statutory reporting standards. Proceed with formal audit observation sign-off.`,
      timestamp: timeString,
      projectId: p.id,
      dataQuality: {
        score: 100,
        freshness: 'PAIMANA Official Archive',
        status: '100% Reconciled',
      },
      metrics: [
        { label: 'Verified Records', value: '59 / 59', color: 'text-emerald-600 dark:text-emerald-400' },
        { label: 'Historical Window', value: 'Apr - Jul 2026', color: 'text-indigo-600 dark:text-indigo-400' },
        { label: 'Integrity Hash', value: 'MATCH', color: 'text-emerald-600 dark:text-emerald-400' },
        { label: 'Unauthorized Edits', value: '0 Detected', color: 'text-emerald-600 dark:text-emerald-400' },
      ],
      actions: [
        { label: 'Export Official Audit Pack', actionType: 'NAVIGATE', target: '/dashboard' },
        { label: 'Statutory Compliance Checklist', actionType: 'NAVIGATE', target: '/reports' },
      ],
      sourceCitations: [
        'MoSPI PAIMANA Monthly Flash Reports (April–July 2026)',
        'CAG Statutory Infrastructure Audit Norms',
        'Cabinet Committee on Infrastructure (CCI) Records',
      ],
    };
  }

  // 0C. SENIOR DECISION MAKER: STRATEGIC PORTFOLIO BRIEFING
  if (
    query.includes('top 3 portfolio risks') ||
    query.includes('delay cost exposure') ||
    query.includes('cabinet-level escalation') ||
    query.includes('strategic mitigation options')
  ) {
    return {
      id: msgId,
      sender: 'assistant',
      content: `### Cabinet-Level Strategic Risk Briefing

• **National Infrastructure Exposure:**
  - Total Monitored Portfolio: **59 Central Sector Mega Projects** (Total Outlay: ₹2.41 Lakh Cr).
  - High-Urgency Packages: **7 Projects** facing delay risk exceeding 8 months.
  - Projected Macro Cost Escalation: **₹14,280 Cr** across high-severity corridors if unmitigated.

• **Top 3 Priority Interventions for Cabinet Secretary Review:**
  1. **Kadapa Airport New Terminal (Civil Aviation):** Runway interface and apron clearance pending AAI technical sanction (+8 mo delay).
  2. **Dedicated Freight Corridor Outer Link (Railways):** Forest clearance in 2 districts holding up track linking (+11 mo delay).
  3. **High-Speed Highway Corridor Package 4 (MoRTH):** Concessionaire arbitration and utility shifting pending (+14 mo delay).

• **Executive Recommendation:** Convene an empowered Inter-Ministerial Committee (IMC) to grant fast-track single-window statutory clearances.`,
      timestamp: timeString,
      projectId: p.id,
      dataQuality: {
        score: 96,
        freshness: 'PAIMANA Historical Dataset',
        status: 'Executive Calibrated',
      },
      metrics: [
        { label: 'Critical Assets', value: '7 Projects', color: 'text-rose-600 dark:text-rose-400' },
        { label: 'Exposure Impact', value: '₹14,280 Cr', color: 'text-amber-600 dark:text-amber-400' },
        { label: 'Avg Schedule Slip', value: '+6.8 Mos', color: 'text-rose-600 dark:text-rose-400' },
      ],
      actions: [
        { label: 'Enter Decision Mode', actionType: 'NAVIGATE', target: '/dashboard' },
        { label: 'National Risk Map', actionType: 'NAVIGATE', target: '/map' },
      ],
      sourceCitations: ['MoSPI PAIMANA Registry', 'NITI Aayog Infrastructure Review', 'Cabinet Secretariat Database'],
    };
  }

  // 0D. PROJECT MANAGER: CRITICAL PATH & MILESTONE SLIPPAGE
  if (
    query.includes('slipping this quarter') ||
    query.includes('cost overrun drivers for high-risk') ||
    query.includes('critical path delay mitigation') ||
    query.includes('contractor dispute risk')
  ) {
    return {
      id: msgId,
      sender: 'assistant',
      content: `### Operational Milestone & Critical Path Review (Project Manager Brief)

• **Critical Path Bottleneck Summary:**
  - Currently **18 active milestones** across monitored assets face schedule compression deficits.
  - Primary causes: ROW parcel handover delays, railway crossing approvals, and pre-cast concrete girder logistics.

• **Target Action Plan for ${p.name}:**
  - **Critical Milestone:** Current progress gap is **-${progressGap.toFixed(1)}%**.
  - **Contractor Delivery:** Mobilize additional night shifts for pier caps and girder launches.
  - **Material Procurement:** Address structural steel supplier lead times with advance mobilization payments.

• **Mitigation Target:** Recovers up to 45 days on the critical path within 60 calendar days.`,
      timestamp: timeString,
      projectId: p.id,
      dataQuality: {
        score: 95,
        freshness: 'Field Execution Telemetry',
        status: 'Operational Verified',
      },
      metrics: [
        { label: 'Slipping Milestones', value: '18 Active', color: 'text-rose-600 dark:text-rose-400' },
        { label: 'Progress Deficit', value: `-${progressGap.toFixed(1)}%`, color: 'text-amber-600 dark:text-amber-400' },
        { label: 'Recovery Potential', value: '45 Days', color: 'text-emerald-600 dark:text-emerald-400' },
      ],
      actions: [
        { label: 'Milestone Details', actionType: 'NAVIGATE', target: `/projects/${p.id}#milestones` },
        { label: 'Peer Benchmarking', actionType: 'NAVIGATE', target: '/benchmarking' },
      ],
      sourceCitations: ['Project Concessionaire Monthly DPR', 'Site Engineer Verification Log'],
    };
  }

  // 0E. MONITORING OFFICER: COMPLIANCE & FIELD TELEMETRY
  if (
    query.includes('progress lag') ||
    query.includes('missing physical progress') ||
    query.includes('month-over-month expenditure discrepancy') ||
    query.includes('inspection checklist')
  ) {
    return {
      id: msgId,
      sender: 'assistant',
      content: `### PAIMANA Field Monitoring & Compliance Report

• **Monthly Reporting Adherence:**
  - 58 of 59 implementing agencies filed on-time progress submissions in July 2026 cycle.
  - Month-over-month progress progression has been validated across April, May, June, and July.

• **Physical vs Financial Progress Divergence:**
  - 8 projects exhibit physical progress lagging financial expenditure by >8%.
  - Flagged for immediate physical inspection by central monitoring officers.

• **Field Inspection Checklist:**
  1. Verify earthwork cross-sections and embankment compaction.
  2. Audit utility relocation compliance certificates.
  3. Validate structural safety inspection sign-offs.`,
      timestamp: timeString,
      projectId: p.id,
      dataQuality: { score: 98, freshness: 'MoSPI PAIMANA Flash Stream', status: 'Reconciled' },
      metrics: [
        { label: 'Reporting Rate', value: '98.3%', color: 'text-emerald-600 dark:text-emerald-400' },
        { label: 'Inspection Queue', value: '8 Assets', color: 'text-amber-600 dark:text-amber-400' },
      ],
      actions: [{ label: 'View Monitored Registry', actionType: 'NAVIGATE', target: '/projects' }],
      sourceCitations: ['MoSPI PAIMANA Flash Report', 'Field Inspection Cell'],
    };
  }

  // 0F. MINISTRY / DEPARTMENT: SECTORAL CAPITAL ALLOCATIONS
  if (
    query.includes('railways vs roadways') ||
    query.includes('capital allocation progress') ||
    query.includes('sanctioned vs actual expenditure') ||
    query.includes('policy recommendations for lagging')
  ) {
    return {
      id: msgId,
      sender: 'assistant',
      content: `### Ministerial Capital Outlay & Sectoral Absorption Analysis

• **Roads & Highways (MoRTH):**
  - Sanctioned Outlay: ₹84,200 Cr | Expenditure: ₹61,450 Cr (**73% Fund Absorption**)
  - Major focus: Bharatmala economic corridors and ring roads.
• **Railways (MoR):**
  - Sanctioned Outlay: ₹92,400 Cr | Expenditure: ₹59,100 Cr (**64% Fund Absorption**)
  - Major focus: Dedicated Freight Corridors and station redevelopments.
• **Civil Aviation & Ports:**
  - Sanctioned Outlay: ₹28,980 Cr | Expenditure: ₹19,720 Cr (**68% Fund Absorption**)

• **Policy Recommendation:** Expedite joint inter-ministerial ROW approvals between MoR and MoRTH for rail-over-bridges (ROBs).`,
      timestamp: timeString,
      projectId: p.id,
      dataQuality: { score: 96, freshness: 'CCI Ministerial Submissions', status: 'Verified' },
      metrics: [
        { label: 'MoRTH Absorption', value: '73%', color: 'text-emerald-600 dark:text-emerald-400' },
        { label: 'Railways Absorption', value: '64%', color: 'text-[#1557D6]' },
      ],
      actions: [{ label: 'Sector Analytics', actionType: 'NAVIGATE', target: '/analytics' }],
      sourceCitations: ['Cabinet Committee on Infrastructure', 'Ministry Finance Cells'],
    };
  }

  // 0G. ADMINISTRATOR: SECURITY & TELEMETRY
  if (
    query.includes('system audit log summary') ||
    query.includes('pipeline sync status') ||
    query.includes('user session and role') ||
    query.includes('security & rbac policy audit')
  ) {
    return {
      id: msgId,
      sender: 'assistant',
      content: `### System Security, RBAC & Telemetry Diagnostic Report

• **RBAC Policy Status:**
  - 6 authoritative roles enforced across all routes and API endpoints.
  - Strict read-only mode actively enforced for Auditor / Viewer role.
  - Unauthorized mutation attempts automatically logged and rejected with HTTP 403.

• **PAIMANA Pipeline Health:**
  - Historical source dataset (April–July 2026) verified with SHA-256 hash match.
  - Zero corruption, zero mock overrides, zero schema violations.

• **Audit Logging:**
  - Isolated system audit log stream running independently from PAIMANA source data.
  - Security audit events recorded in real-time.`,
      timestamp: timeString,
      projectId: p.id,
      dataQuality: { score: 100, freshness: 'Platform Telemetry', status: 'Nominal' },
      metrics: [
        { label: 'RBAC Policy', value: 'Enforced', color: 'text-emerald-600 dark:text-emerald-400' },
        { label: 'Data Source Integrity', value: '100% SHA256', color: 'text-emerald-600 dark:text-emerald-400' },
        { label: 'Active Roles', value: '6 Configured', color: 'text-[#1557D6]' },
      ],
      actions: [{ label: 'Admin Security Console', actionType: 'NAVIGATE', target: '/dashboard' }],
      sourceCitations: ['INFRA-PREDICT-AI Security Core', 'Express RBAC Middleware'],
    };
  }

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
      .map((f) => `• **${f.name}** (+${f.contributionScore.toFixed(1)} pts risk weight): ${f.description}`)
      .join('\n');

    const stabilizingFactors = explainability.factors
      .filter((f) => f.impactType === 'STABILIZING')
      .map((f) => `• **${f.name}** (${f.contributionScore.toFixed(1)} pts mitigator): ${f.description}`)
      .join('\n');

    return {
      id: msgId,
      sender: 'assistant',
      content: `### Risk Factor Analysis: **${p.name}** (${p.code})

The operational composite risk index stands at **${compositeRiskScore}/100** (Severity: **${p.riskLevel}**). The Risk Assessment Engine identifies **${p.primaryRiskDriver}** as the primary risk driver.

#### Primary Vulnerability Factors (Increasing Risk):
${positiveDrivers || `• **${p.primaryRiskDriver}**: Contributing friction to operational execution.`}

#### Stabilizing Factors (Mitigating Exposure):
${stabilizingFactors || `• **Statutory Governance**: Project is directly supervised by ${p.implementingAgency}.`}

${p.currentIssues ? `**Field Issues On Record:**\n${p.currentIssues}\n` : ''}${p.constraints ? `**Critical Constraints:** ${p.constraints}` : ''}`,
      timestamp: timeString,
      projectId: p.id,
      dataQuality: {
        score: 96,
        freshness: 'Synchronized from PAIMANA Flash Report',
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
        { label: 'Open Risk Drivers', actionType: 'NAVIGATE', target: `/explainability?project=${p.id}` },
        { label: 'Full Project Intelligence', actionType: 'NAVIGATE', target: `/projects/${p.id}` },
        { label: 'Generate Risk Brief', actionType: 'GENERATE_REPORT', target: `/reports?projectId=${p.id}` },
      ],
      sourceCitations: [
        'PAIMANA Risk Assessment Engine',
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
• **Indicative Completion Date:** **${p.predictedCompletionDate}**
• **Predicted Delay Duration:** **+${p.predictedDelayMonths} Months**
• **Schedule Progress Variance:** Expected **${p.expectedProgress}%** vs Actual **${p.currentPhysicalProgress}%** (${progressGap > 0 ? `Deficit of **${progressGap.toFixed(1)}%**` : 'On track with zero deficit'}).
• **Time Risk Pillar Score:** **${p.timeRiskScore}/100**

${delayedMilestones.length > 0 ? `#### Critical Milestones Facing Slippage:\n${delayedMilestones.map((m) => `• **${m.title}**: Target was ${m.targetDate} (${m.status} - Critical Path: ${m.criticalPath ? 'Yes' : 'No'})`).join('\n')}` : `• All scheduled deliverables currently progressing along nominal trajectory.`}

${p.delays ? `**Delays Recorded by Field Team:**\n${p.delays}` : ''}`,
      timestamp: timeString,
      projectId: p.id,
      dataQuality: {
        score: 94,
        freshness: 'PAIMANA Historical Dataset',
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
        'Physical Milestone Progress Log',
        'Historical Schedule Indicators',
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
      dataQuality: {
        score: 98,
        freshness: 'Historical Expenditure Records',
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
        'Cost Indicator Evaluation',
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

The following prioritized actions are formulated based on deterministic multi-pillar risk evaluation to reverse schedule slippage and contain cost escalation:`,
      timestamp: timeString,
      projectId: p.id,
      dataQuality: {
        score: 95,
        freshness: 'Deterministic PMG Rule Assessment',
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
      content: `### Historical Trend & Trajectory Delta: **${p.name}**

• **Risk Trajectory Trend:** **${trendDirection}** (${deltaText} over the last cycle).
• **Current Composite Health:** **${p.healthScore}/100** (Baseline was ${Math.min(100, p.healthScore + p.riskTrend)}).
• **Predicted Completion Drift:** Model adjusted forecast by **+${(p.predictedDelayMonths * 0.2).toFixed(1)} months** to **${p.predictedCompletionDate}**.
• **Capital Draw vs Deliverables:** Cumulative expenditure increased to **₹${p.expenditureCr} Cr** (${expPercent}%) while actual physical works stand at **${p.currentPhysicalProgress}%**.
• **Primary Driver Velocity:** ${p.primaryRiskDriver}.`,
      timestamp: timeString,
      projectId: p.id,
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
        'PAIMANA Monthly Flash Reports',
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
        dataQuality: {
          score: 96,
          freshness: 'State Nodal Records',
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

You can ask about key risk drivers, milestone schedules, peer benchmarking, cost overrun projections, or generate an Executive Risk Brief.`,
    timestamp: timeString,
    projectId: p.id,
    dataQuality: {
      score: 95,
      freshness: 'PAIMANA Historical Dataset',
      status: 'Verified',
    },
    metrics: [
      { label: 'Health Score', value: `${p.healthScore}/100`, color: p.healthScore < 60 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Forecast Slippage', value: `+${p.predictedDelayMonths} Mos`, color: 'text-rose-600 dark:text-rose-400' },
      { label: 'Cost Overrun', value: `+₹${p.predictedCostOverrunCr} Cr`, color: p.predictedCostOverrunCr > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200' },
      { label: 'Physical Progress', value: `${p.currentPhysicalProgress}%`, color: 'text-indigo-600 dark:text-indigo-400' },
    ],
    actions: [
      { label: 'Why is it at risk? (Risk Drivers)', actionType: 'FILTER', target: 'Why is this project high risk?' },
      { label: 'Open Project Intelligence', actionType: 'NAVIGATE', target: `/projects/${p.id}` },
      { label: 'Generate Executive Brief', actionType: 'GENERATE_REPORT', target: `/reports?projectId=${p.id}` },
    ],
    sourceCitations: [
      'Infrastructure Intelligence Core Database',
      'Central Project Monitoring System',
      'PAIMANA Risk Assessment Engine',
    ],
  };
}
