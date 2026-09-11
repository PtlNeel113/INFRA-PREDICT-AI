import { InfraProject } from '../types/projects';

/**
 * Clean and escape string values according to RFC 4180 specifications
 * and protect against CSV injection vulnerabilities in spreadsheet applications.
 */
function escapeCsvValue(val: unknown): string {
  if (val === null || val === undefined) {
    return '""';
  }

  let str = String(val);

  // CSV Injection prevention: prepend single quote if cell starts with formula characters
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }

  // If the value contains quotes, commas, newlines, or carriage returns, wrap in quotes and escape quotes
  if (/[",\n\r]/.test(str) || str.includes(';')) {
    return `"${str.replace(/"/g, '""')}"`;
  }

  return `"${str}"`;
}

export interface ExportProjectsOptions {
  filename?: string;
  scopeDescription?: string;
}

/**
 * Converts a list of InfraProject items into an executive-grade CSV string
 * and triggers an automatic browser download.
 */
export function exportProjectsToCsv(
  projects: InfraProject[],
  options?: ExportProjectsOptions
): { success: boolean; count: number; filename: string } {
  if (!projects || projects.length === 0) {
    throw new Error('No project records available to export.');
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const defaultFilename = `InfraPredict_Projects_${timestamp}.csv`;
  const filename = options?.filename || defaultFilename;

  // Define headers for the CSV
  const headers = [
    'Project Code',
    'Project Name',
    'Sector',
    'Ministry',
    'State / UT',
    'District',
    'Implementing Agency',
    'Project Stage',
    'Sanctioned Cost (INR Cr)',
    'Revised Cost (INR Cr)',
    'Expenditure to Date (INR Cr)',
    'AI Forecast Final Cost (INR Cr)',
    'Predicted Cost Overrun (INR Cr)',
    'Cost Overrun Ratio (%)',
    'Original Scheduled Completion',
    'Predicted Completion Date',
    'Predicted Delay (Months)',
    'Scheduled Physical Progress (%)',
    'Actual Physical Progress (%)',
    'Physical Progress Gap (%)',
    'Financial Progress (%)',
    'Health Score (0-100)',
    'Composite Risk Level',
    'Cost Risk Score (0-100)',
    'Time Risk Score (0-100)',
    'Execution Risk Score (0-100)',
    'Risk Priority / Impact Score (1-100)',
    'Risk Trend Indicator',
    'Escalation Status',
    'Primary Risk Driver',
    'Secondary Risk Driver',
    'Total Milestones Tracked',
    'Delayed Milestones',
    'AI Diagnostic Summary',
  ];

  const rows = projects.map((p) => {
    const costOverrunCr = p.predictedCostOverrunCr ?? (p.forecastCostCr - p.sanctionedCostCr);
    const overrunRatio = p.sanctionedCostCr > 0
      ? ((costOverrunCr / p.sanctionedCostCr) * 100).toFixed(1)
      : '0.0';

    const milestones = p.keyMilestones || [];
    const totalMilestones = milestones.length;
    const delayedMilestones = milestones.filter(
      (m) => m.status === 'DELAYED' || m.status === 'CRITICAL'
    ).length;

    let trendLabel = 'Stable (0)';
    if (p.riskTrend > 0) trendLabel = `Deteriorating (+${p.riskTrend})`;
    else if (p.riskTrend < 0) trendLabel = `Improving (${p.riskTrend})`;

    return [
      p.code || '',
      p.name || '',
      p.sector || '',
      p.ministry || 'N/A',
      p.state || '',
      p.district || 'N/A',
      p.implementingAgency || '',
      p.stage || '',
      p.sanctionedCostCr ?? 0,
      p.revisedCostCr ?? p.sanctionedCostCr ?? 0,
      p.expenditureCr ?? 0,
      p.forecastCostCr ?? p.sanctionedCostCr ?? 0,
      costOverrunCr >= 0 ? costOverrunCr : 0,
      overrunRatio,
      p.originalDeadline || '',
      p.predictedCompletionDate || '',
      p.predictedDelayMonths ?? 0,
      p.expectedProgress ?? 0,
      p.currentPhysicalProgress ?? 0,
      p.progressGap ?? 0,
      p.financialProgress ?? 0,
      p.healthScore ?? 0,
      p.riskLevel || 'LOW',
      p.costRiskScore ?? 0,
      p.timeRiskScore ?? 0,
      p.executionRiskScore ?? 0,
      p.impactScore ?? p.priorityScore ?? 0,
      trendLabel,
      p.escalationStatus || 'UNRESOLVED',
      p.primaryRiskDriver || 'None Detected',
      p.secondaryRiskDriver || '',
      totalMilestones,
      delayedMilestones,
      p.aiSummary || '',
    ];
  });

  // Construct CSV content with RFC-4180 escaping and UTF-8 BOM
  const csvContent =
    '\uFEFF' + // UTF-8 BOM for Microsoft Excel compatibility
    [
      headers.map(escapeCsvValue).join(','),
      ...rows.map((row) => row.map(escapeCsvValue).join(',')),
    ].join('\r\n');

  // Trigger file download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return {
    success: true,
    count: projects.length,
    filename,
  };
}
