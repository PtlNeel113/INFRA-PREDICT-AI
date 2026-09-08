import { CreateProjectInput, InfraProject, Milestone, ProjectStage } from '../types/projects';
import { RiskLevel } from '../types/ui';

/**
 * Prototype Risk Calculation Engine
 * 
 * Computes transparent, deterministic risk scores and forecasts
 * from user-submitted form data for demonstration and prototype intelligence.
 */
export function calculateProjectMetrics(input: CreateProjectInput, existingProjects: InfraProject[]): InfraProject {
  const today = new Date();
  const startDate = new Date(input.startDate);
  const targetDate = new Date(input.targetDate);

  // 1. Calculate schedule durations and progress metrics
  const totalDurationMs = Math.max(1, targetDate.getTime() - startDate.getTime());
  const elapsedMs = Math.max(0, today.getTime() - startDate.getTime());
  const totalDays = Math.ceil(totalDurationMs / (1000 * 60 * 60 * 24));
  const elapsedDays = Math.ceil(elapsedMs / (1000 * 60 * 60 * 24));
  const totalPlannedMonths = Math.max(1, Math.round(totalDays / 30.4));

  let expectedProgress = 0;
  if (today < startDate) {
    expectedProgress = 0;
  } else if (today >= targetDate) {
    expectedProgress = 100;
  } else {
    expectedProgress = Math.min(100, Math.max(0, Math.round((elapsedDays / totalDays) * 100)));
  }

  const currentPhysicalProgress = Number(input.physicalProgress) || 0;
  const progressGap = Number((expectedProgress - currentPhysicalProgress).toFixed(1));

  // 2. Financial Metrics
  const sanctionedCostCr = Number(input.sanctionedCostCr) || 0;
  const expenditureCr = Number(input.expenditureCr) || 0;
  const revisedCostCr = input.revisedCostCr ? Number(input.revisedCostCr) : sanctionedCostCr;
  const effectiveBaseCost = revisedCostCr > 0 ? revisedCostCr : sanctionedCostCr;
  const financialProgress = effectiveBaseCost > 0
    ? Math.min(100, Number(((expenditureCr / effectiveBaseCost) * 100).toFixed(1)))
    : 0;

  // Cost variance ratio
  const approvedOverrunCr = Math.max(0, revisedCostCr - sanctionedCostCr);
  const approvedOverrunPct = sanctionedCostCr > 0 ? (approvedOverrunCr / sanctionedCostCr) * 100 : 0;

  // 3. Process Milestones
  let delayedMilestonesCount = 0;
  const keyMilestones: Milestone[] = (input.milestones || []).map((m, idx) => {
    const planned = m.planned ? new Date(m.planned) : targetDate;
    const actual = m.actual ? new Date(m.actual) : undefined;
    
    let status: 'COMPLETED' | 'ON_TRACK' | 'DELAYED' | 'CRITICAL' = 'ON_TRACK';
    let delayDays = 0;

    if (actual) {
      status = 'COMPLETED';
      delayDays = Math.max(0, Math.ceil((actual.getTime() - planned.getTime()) / (1000 * 60 * 60 * 24)));
    } else if (planned < today) {
      delayDays = Math.ceil((today.getTime() - planned.getTime()) / (1000 * 60 * 60 * 24));
      if (delayDays > 60) {
        status = 'CRITICAL';
        delayedMilestonesCount++;
      } else {
        status = 'DELAYED';
        delayedMilestonesCount++;
      }
    } else {
      status = 'ON_TRACK';
    }

    return {
      id: `m_${idx + 1}`,
      title: m.name || `Milestone ${idx + 1}`,
      targetDate: m.planned || input.targetDate,
      actualDate: m.actual || undefined,
      revisedDate: delayDays > 0 ? formatDateOffset(planned, delayDays) : undefined,
      status,
      delayDays,
      criticalPath: idx === 1 || idx === Math.floor(input.milestones.length / 2),
    };
  });

  // 4. Text Mining & Risk Driver Identification
  const combinedText = `${input.currentIssues || ''} ${input.delays || ''} ${input.constraints || ''}`.toLowerCase();
  
  const driverMatches: Array<{ driver: string; score: number }> = [];
  if (combinedText.includes('land') || combinedText.includes('row') || combinedText.includes('acquisition') || combinedText.includes('compensation')) {
    driverMatches.push({ driver: 'Land Acquisition & Right of Way Clearances', score: 25 });
  }
  if (combinedText.includes('utility') || combinedText.includes('pipeline') || combinedText.includes('cable') || combinedText.includes('power line') || combinedText.includes('shifting')) {
    driverMatches.push({ driver: 'Utility Relocation & Multi-Agency Coordination', score: 22 });
  }
  if (combinedText.includes('forest') || combinedText.includes('environment') || combinedText.includes('wildlife') || combinedText.includes('pollution') || combinedText.includes('clearance')) {
    driverMatches.push({ driver: 'Statutory Environmental & Forest Clearances', score: 20 });
  }
  if (combinedText.includes('contractor') || combinedText.includes('labor') || combinedText.includes('manpower') || combinedText.includes('mobilization') || combinedText.includes('equipment')) {
    driverMatches.push({ driver: 'Contractor Solvency & Execution Equipment Shortage', score: 18 });
  }
  if (combinedText.includes('court') || combinedText.includes('litigation') || combinedText.includes('arbitration') || combinedText.includes('stay') || combinedText.includes('tribunal')) {
    driverMatches.push({ driver: 'Judicial Stay & Ongoing Arbitration Claims', score: 24 });
  }
  if (combinedText.includes('monsoon') || combinedText.includes('flood') || combinedText.includes('rain') || combinedText.includes('geology') || combinedText.includes('slope')) {
    driverMatches.push({ driver: 'Geotechnical & Extreme Weather Disruption', score: 16 });
  }
  if (combinedText.includes('fund') || combinedText.includes('budget') || combinedText.includes('cashflow') || combinedText.includes('billing') || combinedText.includes('drawdown')) {
    driverMatches.push({ driver: 'Fiscal Liquidity & Delayed Milestone Disbursements', score: 19 });
  }

  driverMatches.sort((a, b) => b.score - a.score);

  const primaryRiskDriver = driverMatches[0]?.driver ||
    (progressGap > 8
      ? 'Milestone Execution Velocity Deficit'
      : approvedOverrunPct > 10
      ? 'Material Cost Inflation & Baseline Revision'
      : `${input.sector} Execution Coordination`);

  const secondaryRiskDriver = driverMatches[1]?.driver ||
    (delayedMilestonesCount > 0
      ? 'Critical Path Deliverable Slippage'
      : 'Contractor Site Mobilization Latency');

  // 5. Pillar Risk Scoring (0 - 100)
  let costRiskScore = 20;
  costRiskScore += Math.min(35, approvedOverrunPct * 1.8);
  if (financialProgress > currentPhysicalProgress + 8) {
    costRiskScore += Math.min(25, (financialProgress - currentPhysicalProgress) * 0.9);
  }
  if (combinedText.includes('fund') || combinedText.includes('budget') || combinedText.includes('cost')) {
    costRiskScore += 10;
  }
  costRiskScore = Math.min(95, Math.max(15, Math.round(costRiskScore)));

  let timeRiskScore = 20;
  if (progressGap > 0) {
    timeRiskScore += Math.min(45, progressGap * 1.5);
  } else {
    timeRiskScore = Math.max(15, timeRiskScore - 8);
  }
  timeRiskScore += Math.min(20, delayedMilestonesCount * 8);
  if (input.delays && input.delays.trim().length > 10) {
    timeRiskScore += 10;
  }
  timeRiskScore = Math.min(95, Math.max(15, Math.round(timeRiskScore)));

  let executionRiskScore = 25;
  if (input.currentIssues && input.currentIssues.trim().length > 10) executionRiskScore += 15;
  if (input.constraints && input.constraints.trim().length > 10) executionRiskScore += 12;
  if (delayedMilestonesCount > 1) executionRiskScore += 12;
  if (progressGap > 12) executionRiskScore += 15;
  executionRiskScore = Math.min(95, Math.max(15, Math.round(executionRiskScore)));

  const compositeRisk = 0.35 * costRiskScore + 0.40 * timeRiskScore + 0.25 * executionRiskScore;
  const healthScore = Math.max(15, Math.min(95, Math.round(100 - compositeRisk)));

  let riskLevel: RiskLevel = 'STABLE';
  if (healthScore < 50) {
    riskLevel = 'CRITICAL';
  } else if (healthScore < 70) {
    riskLevel = 'HIGH';
  } else if (healthScore < 85) {
    riskLevel = 'WATCH';
  } else {
    riskLevel = 'STABLE';
  }

  const riskTrend = progressGap > 5 || costRiskScore > 65
    ? Math.min(18, Math.max(3, Math.round((timeRiskScore + costRiskScore) / 14)))
    : -Math.max(2, Math.round((100 - healthScore) / 22));

  const predictedDelayMonths = Math.max(
    0,
    Number(
      Math.min(
        36,
        ((Math.max(0, progressGap) / 100) * totalPlannedMonths * 1.25) +
          delayedMilestonesCount * 1.2
      ).toFixed(1)
    )
  );

  const predictedCostOverrunCr = approvedOverrunCr > 0
    ? approvedOverrunCr + Math.round(sanctionedCostCr * (costRiskScore / 1200))
    : Math.round(sanctionedCostCr * Math.max(0, (costRiskScore - 35) / 500));

  const forecastCostCr = sanctionedCostCr + predictedCostOverrunCr;
  const predictedCompletionDate = addMonthsToDateString(input.targetDate, predictedDelayMonths);

  let stage: ProjectStage = 'Under Construction';
  if (currentPhysicalProgress < 10) stage = 'Pre-Construction';
  else if (currentPhysicalProgress >= 90) stage = 'Near Completion';
  else if (currentPhysicalProgress >= 80) stage = 'Testing & Commissioning';
  else stage = 'Under Construction';

  const recommendedActions: string[] = [];
  if (driverMatches.some(d => d.driver.includes('Land'))) {
    recommendedActions.push(
      `Convene inter-departmental task force with ${input.state} Revenue Department to fast-track remaining parcel handovers.`
    );
  }
  if (driverMatches.some(d => d.driver.includes('Utility'))) {
    recommendedActions.push(
      'Issue unified utility-shifting work orders and schedule night-time joint corridor possessions.'
    );
  }
  if (progressGap > 8) {
    recommendedActions.push(
      `Re-baseline critical path deliverables to compress ${progressGap}% progress deficit through 24/7 dual-shift operations.`
    );
  }
  if (costRiskScore > 65) {
    recommendedActions.push(
      'Audit contractor expenditure milestones and initiate value engineering review to curb cost escalation.'
    );
  }
  if (recommendedActions.length < 3) {
    recommendedActions.push(
      `Schedule bi-weekly PMO review with ${input.ministry || 'Nodal Ministry'} to clear regulatory dependencies.`
    );
  }
  if (recommendedActions.length < 3) {
    recommendedActions.push(
      'Deploy on-site IoT sensors and drone telemetry to continuously audit earthwork and physical progress.'
    );
  }

  const aiSummary = `[Prototype Risk Simulation Engine] Composite health scored at ${healthScore}/100 with ${riskLevel} risk rating. Physical execution stands at ${currentPhysicalProgress}% against scheduled DPR target of ${expectedProgress}% (${progressGap > 0 ? `deficit of ${progressGap}%` : 'on schedule'}). Financial expenditure is ₹${expenditureCr.toLocaleString()} Cr (${financialProgress}% of outlay). Primary risk driver: "${primaryRiskDriver}". Estimated completion slippage: +${predictedDelayMonths} months to ${predictedCompletionDate}.`;

  const cleanCode = input.code.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '-');
  let uniqueId = `PRJ-${cleanCode}`;
  if (existingProjects.some(p => p.id === uniqueId)) {
    uniqueId = `PRJ-${cleanCode}-${Math.floor(100 + Math.random() * 900)}`;
  }

  const riskTrajectory = generateRiskTrajectory(healthScore, riskLevel, riskTrend);
  const costTrend = generateCostTrend(sanctionedCostCr, revisedCostCr, expenditureCr, forecastCostCr);

  return {
    id: uniqueId,
    name: input.name.trim(),
    code: cleanCode,
    sector: input.sector,
    state: input.state,
    stage,
    implementingAgency: `${input.ministry} Executing Authority`,
    ministry: input.ministry,
    sanctionedCostCr,
    revisedCostCr,
    expenditureCr,
    forecastCostCr,
    originalDeadline: input.targetDate,
    predictedCompletionDate,
    expectedProgress,
    currentPhysicalProgress,
    progressGap,
    financialProgress,
    healthScore,
    riskLevel,
    riskTrend,
    costRiskScore,
    timeRiskScore,
    executionRiskScore,
    predictedDelayMonths,
    predictedCostOverrunCr,
    primaryRiskDriver,
    secondaryRiskDriver,
    priorityScore: Number((100 - healthScore + costRiskScore * 0.2).toFixed(1)),
    impactScore: Math.min(100, Math.max(30, Math.round((sanctionedCostCr / 200) + costRiskScore * 0.3))),
    escalationStatus: healthScore < 50 ? 'UNRESOLVED' : healthScore < 75 ? 'UNDER_REVIEW' : 'MITIGATION_IN_PROGRESS',
    keyMilestones,
    aiSummary,
    riskTrajectory,
    costTrend,
    changeIntelligence: {
      previousCycleDate: '30 Days Ago',
      currentCycleDate: 'Today (Onboarded)',
      summary: `Baseline intake completed. Physical execution is ${currentPhysicalProgress}% with a detected schedule gap of ${progressGap}%.`,
      metrics: [
        { metric: 'Physical Progress', previous: `${Math.max(0, currentPhysicalProgress - 3)}%`, current: `${currentPhysicalProgress}%`, delta: '+3%', type: 'increase', impact: 'favorable' },
        { metric: 'Progress Deficit', previous: `${Math.max(0, progressGap - 1)}%`, current: `${progressGap}%`, delta: `${progressGap > 0 ? `+${progressGap}%` : '0%'}`, type: 'increase', impact: progressGap > 5 ? 'adverse' : 'neutral', isSignificant: progressGap > 8 },
        { metric: 'Cost Overrun Exposure', previous: '₹0 Cr', current: `₹${predictedCostOverrunCr} Cr`, delta: `+₹${predictedCostOverrunCr} Cr`, type: 'increase', impact: predictedCostOverrunCr > 0 ? 'adverse' : 'neutral' },
      ],
      highlightNotes: [
        `Onboarded into National Infrastructure Intelligence Layer.`,
        `Primary risk driver attributed to "${primaryRiskDriver}".`,
        `${keyMilestones.length} milestone gate(s) mapped to timeline tracking.`,
      ],
    },
    startDate: input.startDate,
    district: input.district,
    latitude: input.latitude ? Number(input.latitude) : undefined,
    longitude: input.longitude ? Number(input.longitude) : undefined,
    currentIssues: input.currentIssues,
    delays: input.delays,
    constraints: input.constraints,
    recommendedActions,
    isUserCreated: true,
    calculationMethodology: 'Deterministic Multi-Factor Prototype Engine (SIH-2026 Sandbox)',
  };
}

function formatDateOffset(baseDate: Date, offsetDays: number): string {
  const d = new Date(baseDate);
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

function addMonthsToDateString(dateStr: string, months: number): string {
  try {
    const d = new Date(dateStr);
    const wholeMonths = Math.floor(months);
    const extraDays = Math.round((months - wholeMonths) * 30.4);
    d.setMonth(d.getMonth() + wholeMonths);
    d.setDate(d.getDate() + extraDays);
    return d.toISOString().split('T')[0];
  } catch {
    return dateStr;
  }
}

function generateRiskTrajectory(healthScore: number, level: RiskLevel, trend: number) {
  const currentScore = 100 - healthScore;
  const t1 = Math.max(10, currentScore - trend * 1.2);
  const t2 = Math.max(12, currentScore - trend * 0.8);
  const t3 = Math.max(15, currentScore - trend * 0.4);
  const t4 = Math.max(15, currentScore - trend * 0.1);
  const p1 = Math.min(95, currentScore + (trend > 0 ? 4 : -3));
  const p2 = Math.min(95, currentScore + (trend > 0 ? 7 : -6));

  return [
    { date: 'Month -4', score: Math.round(t1) },
    { date: 'Month -3', score: Math.round(t2) },
    { date: 'Month -2', score: Math.round(t3) },
    { date: 'Month -1', score: Math.round(t4) },
    { date: 'Current (Live)', score: Math.round(currentScore) },
    { date: '+30d (P)', score: Math.round(p1), forecast: true },
    { date: '+60d (P)', score: Math.round(p2), forecast: true },
  ];
}

function generateCostTrend(sanctioned: number, revised: number, expenditure: number, forecast: number) {
  return [
    { period: 'Sanctioned DPR', sanctioned, revised, expenditure: Math.round(expenditure * 0.25), forecast: sanctioned },
    { period: 'Phase 1 Review', sanctioned, revised, expenditure: Math.round(expenditure * 0.6), forecast: Math.round(sanctioned * 1.02) },
    { period: 'Current Audit', sanctioned, revised, expenditure, forecast: Math.round(forecast * 0.95) },
    { period: 'Projected COD', sanctioned, revised, expenditure, forecast },
  ];
}
