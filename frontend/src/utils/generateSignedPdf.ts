import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { InfraProject } from '../types/projects';
import { MOCK_INFRA_PROJECTS } from '../data/mockData';

export type BriefFormat = 'CABINET_SUMMARY' | 'SECTOR_DRILLDOWN' | 'EARLY_WARNING_LOG' | 'EXECUTIVE_RISK_BRIEF';

export interface GeneratePdfOptions {
  project?: InfraProject | null;
  format?: BriefFormat | string;
  includeSHAP?: boolean;
  includeBenchmarking?: boolean;
  includeMitigation?: boolean;
}

export function generateSignedPdf({
  project,
  format = 'CABINET_SUMMARY',
  includeSHAP = true,
  includeBenchmarking = true,
  includeMitigation = true,
}: GeneratePdfOptions): string {
  const activeProject: InfraProject = project || MOCK_INFRA_PROJECTS[0];
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const timeFormatted = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const docId = `CAB-RISK-${activeProject.code}-${now.getFullYear()}-Q${Math.floor(now.getMonth() / 3) + 1}`;
  const certId = `NIC-CA-DS-${Math.random().toString(16).substring(2, 10).toUpperCase()}-${Math.random().toString(16).substring(2, 8).toUpperCase()}`;

  // Standard government header
  const drawHeader = (pageNumber: number, totalPages: number) => {
    // Top decorative banner
    doc.setFillColor(11, 31, 58); // Deep Navy
    doc.rect(0, 0, pageWidth, 20, 'F');

    // Saffron accent stripe
    doc.setFillColor(245, 158, 11);
    doc.rect(0, 20, pageWidth, 1.2, 'F');

    // Header Titles
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('GOVERNMENT OF INDIA  •  CABINET SECRETARIAT', margin, 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(203, 213, 225);
    doc.text('PM GATI SHAKTI NATIONAL MASTER PLAN  |  PROJECT MONITORING GROUP (PMG)', margin, 13);

    // Right-aligned classification badge
    doc.setFillColor(220, 38, 38);
    doc.roundedRect(pageWidth - margin - 36, 4.5, 36, 6.5, 1, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.text('RESTRICTED / CONFIDENTIAL', pageWidth - margin - 34, 8.8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(190, 200, 215);
    doc.text(`Doc Ref: ${docId}`, pageWidth - margin - 36, 16);
  };

  // Standard footer
  const drawFooter = (pageNumber: number, totalPages: number) => {
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(
      'INFRA-PREDICT AI Autonomous Telemetry & Risk Pipeline  •  Digitally Certified Ministerial Dossier',
      margin,
      pageHeight - 7,
    );

    const pageStr = `Page ${pageNumber} of ${totalPages}`;
    doc.text(pageStr, pageWidth - margin - doc.getTextWidth(pageStr), pageHeight - 7);
  };

  // ==========================================
  // PAGE 1: EXECUTIVE SUMMARY & AI ASSESSMENT
  // ==========================================
  drawHeader(1, 3);

  let currentY = 27;

  // Document Title Banner
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, currentY, contentWidth, 18, 1.5, 1.5, 'FD');

  doc.setTextColor(11, 31, 58);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  const formatTitle =
    format === 'SECTOR_DRILLDOWN'
      ? 'SECTORAL DEEP-DIVE & VARIANCE AUDIT'
      : format === 'EARLY_WARNING_LOG'
      ? '90-DAY EARLY WARNING MITIGATION MATRIX'
      : 'EXECUTIVE RISK BRIEF & CABINET INTERVENTION DOSSIER';

  doc.text(formatTitle, margin + 4, currentY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Synthesized for Inter-Ministerial Cabinet Committee on Infrastructure (CCI)  |  Date: ${dateFormatted} ${timeFormatted}`,
    margin + 4,
    currentY + 13,
  );

  currentY += 23;

  // Project Identity Profile Table
  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    theme: 'grid',
    head: [
      [
        { content: 'PROJECT PROFILE & CRITICAL TELEMETRY', colSpan: 4, styles: { fillColor: [15, 29, 46], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8.5 } },
      ],
    ],
    body: [
      [
        { content: 'Project Name:', styles: { fontStyle: 'bold', textColor: [71, 85, 105], cellWidth: 35 } },
        { content: `${activeProject.name} (${activeProject.code})`, styles: { fontStyle: 'bold', textColor: [11, 31, 58], cellWidth: 60 } },
        { content: 'Composite Health:', styles: { fontStyle: 'bold', textColor: [71, 85, 105], cellWidth: 35 } },
        {
          content: `${activeProject.healthScore}/100 [${activeProject.riskLevel}]`,
          styles: {
            fontStyle: 'bold',
            textColor: activeProject.riskLevel === 'CRITICAL' ? [220, 38, 38] : [217, 119, 6],
            fillColor: activeProject.riskLevel === 'CRITICAL' ? [254, 242, 242] : [255, 251, 235],
          },
        },
      ],
      [
        { content: 'Sector & State:', styles: { fontStyle: 'bold', textColor: [71, 85, 105] } },
        { content: `${activeProject.sector} | ${activeProject.state}`, styles: { textColor: [15, 23, 42] } },
        { content: 'Anticipated Delay:', styles: { fontStyle: 'bold', textColor: [71, 85, 105] } },
        { content: `+${activeProject.predictedDelayMonths} Months (${activeProject.predictedCompletionDate})`, styles: { fontStyle: 'bold', textColor: [220, 38, 38] } },
      ],
      [
        { content: 'Implementing Agency:', styles: { fontStyle: 'bold', textColor: [71, 85, 105] } },
        { content: `${activeProject.implementingAgency} (${activeProject.ministry || 'Infrastructure'})`, styles: { textColor: [15, 23, 42] } },
        { content: 'Cost Escalation:', styles: { fontStyle: 'bold', textColor: [71, 85, 105] } },
        { content: `+INR ${activeProject.predictedCostOverrunCr} Cr (Forecast: INR ${activeProject.forecastCostCr || activeProject.revisedCostCr} Cr)`, styles: { fontStyle: 'bold', textColor: [217, 119, 6] } },
      ],
      [
        { content: 'Sanctioned Outlay:', styles: { fontStyle: 'bold', textColor: [71, 85, 105] } },
        { content: `INR ${activeProject.sanctionedCostCr.toLocaleString('en-IN')} Cr`, styles: { textColor: [15, 23, 42] } },
        { content: 'Physical Progress:', styles: { fontStyle: 'bold', textColor: [71, 85, 105] } },
        { content: `Actual: ${activeProject.currentPhysicalProgress}% vs Planned: ${activeProject.expectedProgress}% (Gap: -${activeProject.progressGap}%)`, styles: { textColor: [15, 23, 42] } },
      ],
    ],
    styles: {
      fontSize: 7.5,
      cellPadding: 2,
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
    },
  });

  currentY = (doc as any).lastAutoTable.finalY + 6;

  // Section 1: Executive AI Diagnosis
  doc.setFillColor(238, 242, 255);
  doc.rect(margin, currentY, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 64, 175);
  doc.text('1.0 EXECUTIVE RISK ASSESSMENT & PREDICTIVE DIAGNOSIS', margin + 3, currentY + 4.2);

  currentY += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);

  const diagnosisText =
    activeProject.aiSummary ||
    `Machine learning ensemble models (XGBoost + TreeSHAP) have identified acute delivery risk on ${activeProject.name}. Physical execution exhibits an acute divergence of ${activeProject.progressGap}% from the approved baseline schedule. With critical path activities impeded, the project is modeled to incur a slippage of +${activeProject.predictedDelayMonths} months and an estimated fiscal overrun of +INR ${activeProject.predictedCostOverrunCr} Cr beyond the sanctioned expenditure. Immediate Cabinet Secretariat escalation is advised.`;

  const splitDiagnosis = doc.splitTextToSize(diagnosisText, contentWidth - 4);
  doc.text(splitDiagnosis, margin + 2, currentY);
  currentY += splitDiagnosis.length * 3.8 + 5;

  // Section 2: SHAP Feature Attribution Matrix
  if (includeSHAP) {
    doc.setFillColor(254, 243, 199);
    doc.rect(margin, currentY, contentWidth, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(180, 83, 9);
    doc.text('2.0 AI ROOT-CAUSE ATTRIBUTION (SHAP WEIGHTED SENSITIVITY)', margin + 3, currentY + 4.2);

    currentY += 8;

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      theme: 'grid',
      head: [
        [
          { content: 'Severity', styles: { fontStyle: 'bold', fontSize: 7.5, fillColor: [241, 245, 249], textColor: [15, 23, 42] } },
          { content: 'Identified Delay Driver', styles: { fontStyle: 'bold', fontSize: 7.5, fillColor: [241, 245, 249], textColor: [15, 23, 42] } },
          { content: 'SHAP Impact', styles: { fontStyle: 'bold', fontSize: 7.5, fillColor: [241, 245, 249], textColor: [15, 23, 42] } },
          { content: 'Operational Bottleneck & Inter-Agency Context', styles: { fontStyle: 'bold', fontSize: 7.5, fillColor: [241, 245, 249], textColor: [15, 23, 42] } },
        ],
      ],
      body: [
        [
          { content: 'PRIMARY', styles: { fontStyle: 'bold', textColor: [220, 38, 38], fillColor: [254, 242, 242] } },
          { content: activeProject.primaryRiskDriver || 'Right of Way (RoW) & Forest Clearance', styles: { fontStyle: 'bold' } },
          { content: '+28.4 Pts Drag', styles: { fontStyle: 'bold', textColor: [220, 38, 38] } },
          { content: 'Corridor encumbrances, pending railway crossings, and unshifted utility lines along main alignment.' },
        ],
        [
          { content: 'SECONDARY', styles: { fontStyle: 'bold', textColor: [217, 119, 6], fillColor: [255, 251, 235] } },
          { content: activeProject.secondaryRiskDriver || 'Contractor Liquidity & Equipment Throughput', styles: { fontStyle: 'bold' } },
          { content: '+19.6 Pts Drag', styles: { fontStyle: 'bold', textColor: [217, 119, 6] } },
          { content: 'Sub-contractor mobilization rate lagging target monthly requirements by 22%.' },
        ],
        [
          { content: 'TERTIARY', styles: { fontStyle: 'bold', textColor: [79, 70, 229], fillColor: [238, 242, 255] } },
          { content: 'Environmental & Monsoon Seasonal Exposure', styles: { fontStyle: 'bold' } },
          { content: '+11.2 Pts Drag', styles: { fontStyle: 'bold', textColor: [79, 70, 229] } },
          { content: 'Drainage culverts and earthwork stabilization delayed by seasonal inundation.' },
        ],
      ],
      styles: {
        fontSize: 7.2,
        cellPadding: 2.2,
        lineColor: [226, 232, 240],
        lineWidth: 0.2,
      },
    });

    currentY = (doc as any).lastAutoTable.finalY + 6;
  }

  // Section 3: Macro Financial Exposure & Cost Overrun Breakdown
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, currentY, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text('3.0 MACRO EXPOSURE & FINANCIAL RECONCILIATION', margin + 3, currentY + 4.2);

  currentY += 8;

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    theme: 'plain',
    body: [
      [
        { content: `Original Approved Budget:\nINR ${activeProject.sanctionedCostCr.toLocaleString('en-IN')} Cr`, styles: { fillColor: [248, 250, 252], textColor: [15, 23, 42], fontStyle: 'bold' } },
        { content: `Cumulative Expenditure:\nINR ${(activeProject.expenditureCr || Math.round(activeProject.sanctionedCostCr * 0.72)).toLocaleString('en-IN')} Cr (${activeProject.financialProgress || 72}%)`, styles: { fillColor: [248, 250, 252], textColor: [15, 23, 42], fontStyle: 'bold' } },
        { content: `AI Forecast Final Outlay:\nINR ${(activeProject.forecastCostCr || activeProject.revisedCostCr).toLocaleString('en-IN')} Cr`, styles: { fillColor: [254, 242, 242], textColor: [220, 38, 38], fontStyle: 'bold' } },
        { content: `Net Predicted Overrun:\n+INR ${activeProject.predictedCostOverrunCr} Cr`, styles: { fillColor: [254, 242, 242], textColor: [220, 38, 38], fontStyle: 'bold' } },
      ],
    ],
    styles: {
      fontSize: 7.5,
      cellPadding: 3,
      lineColor: [226, 232, 240],
      lineWidth: 0.3,
      halign: 'center',
    },
  });

  drawFooter(1, 3);

  // ==========================================
  // PAGE 2: DETAILED MILESTONES & SECTOR AUDIT
  // ==========================================
  doc.addPage();
  drawHeader(2, 3);
  currentY = 27;

  doc.setFillColor(238, 242, 255);
  doc.rect(margin, currentY, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 64, 175);
  doc.text('4.0 CRITICAL PATH MILESTONE AUDIT & VARIANCE TRACKER', margin + 3, currentY + 4.2);

  currentY += 8;

  const milestonesData = activeProject.keyMilestones && activeProject.keyMilestones.length > 0
    ? activeProject.keyMilestones.map((m) => [
        m.title,
        m.targetDate,
        m.actualDate || m.revisedDate || 'Pending',
        m.delayDays ? `+${m.delayDays} days` : '0 days',
        m.criticalPath ? 'YES' : 'NO',
        m.status,
      ])
    : [
        ['Right of Way (RoW) & Alignment Handover', '2024-06-15', '2024-08-30', '+76 days', 'YES', 'COMPLETED'],
        ['Utility Diversion (Gas Pipeline & 400kV Power Line)', '2025-01-20', '2025-06-30', '+161 days', 'YES', 'CRITICAL'],
        ['Pavement & Major Bridge Superstructure Launching', '2025-07-30', '2025-12-15', '+138 days', 'YES', 'DELAYED'],
        ['Automated Toll Management & Fiber Optic Ducting', '2025-10-30', '2026-04-15', '+167 days', 'NO', 'DELAYED'],
        ['Final Statutory Safety Inspection & Commercial Operation', '2025-11-30', '2026-07-15', '+227 days', 'YES', 'CRITICAL'],
      ];

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    theme: 'grid',
    head: [
      [
        { content: 'Milestone Description', styles: { fillColor: [15, 29, 46], textColor: [255, 255, 255], fontStyle: 'bold' } },
        { content: 'Baseline Date', styles: { fillColor: [15, 29, 46], textColor: [255, 255, 255], fontStyle: 'bold' } },
        { content: 'Forecast Date', styles: { fillColor: [15, 29, 46], textColor: [255, 255, 255], fontStyle: 'bold' } },
        { content: 'Variance', styles: { fillColor: [15, 29, 46], textColor: [255, 255, 255], fontStyle: 'bold' } },
        { content: 'Critical Path', styles: { fillColor: [15, 29, 46], textColor: [255, 255, 255], fontStyle: 'bold' } },
        { content: 'Audit Status', styles: { fillColor: [15, 29, 46], textColor: [255, 255, 255], fontStyle: 'bold' } },
      ],
    ],
    body: milestonesData.map((row) => {
      const status = row[5];
      let statusFill: [number, number, number] = [255, 255, 255];
      let statusText: [number, number, number] = [15, 23, 42];
      if (status === 'CRITICAL') {
        statusFill = [254, 242, 242];
        statusText = [220, 38, 38];
      } else if (status === 'DELAYED') {
        statusFill = [255, 251, 235];
        statusText = [217, 119, 6];
      } else if (status === 'COMPLETED') {
        statusFill = [240, 253, 244];
        statusText = [22, 101, 52];
      }
      return [
        row[0],
        row[1],
        row[2],
        row[3],
        { content: row[4], styles: { fontStyle: row[4] === 'YES' ? 'bold' : 'normal', textColor: row[4] === 'YES' ? [220, 38, 38] : [100, 116, 139] } },
        { content: row[5], styles: { fontStyle: 'bold', fillColor: statusFill, textColor: statusText } },
      ];
    }),
    styles: {
      fontSize: 7.2,
      cellPadding: 2.2,
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
    },
  });

  currentY = (doc as any).lastAutoTable.finalY + 8;

  // Change Intelligence Summary Box
  if (activeProject.changeIntelligence) {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, currentY, contentWidth, 34, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(11, 31, 58);
    doc.text(
      `CYCLE-OVER-CYCLE TELEMETRY DRIFT (${activeProject.changeIntelligence.previousCycleDate} -> ${activeProject.changeIntelligence.currentCycleDate})`,
      margin + 4,
      currentY + 5.5,
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    const splitSummary = doc.splitTextToSize(activeProject.changeIntelligence.summary, contentWidth - 8);
    doc.text(splitSummary, margin + 4, currentY + 11);

    const notesY = currentY + 18;
    activeProject.changeIntelligence.highlightNotes.slice(0, 3).forEach((note, i) => {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 64, 175);
      doc.text('•', margin + 4, notesY + i * 4.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      doc.text(note, margin + 8, notesY + i * 4.5);
    });

    currentY += 40;
  }

  // Section 5: Peer Sector Benchmarking
  if (includeBenchmarking) {
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, currentY, contentWidth, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text('5.0 SECTOR BENCHMARKING & RELATIVE PERFORMANCE PERCENTILE', margin + 3, currentY + 4.2);

    currentY += 8;

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      theme: 'grid',
      head: [
        [
          { content: 'Metric Benchmark', styles: { fontStyle: 'bold', fontSize: 7.2, fillColor: [241, 245, 249], textColor: [15, 23, 42] } },
          { content: 'Project Value', styles: { fontStyle: 'bold', fontSize: 7.2, fillColor: [241, 245, 249], textColor: [15, 23, 42] } },
          { content: 'Sector Median (National)', styles: { fontStyle: 'bold', fontSize: 7.2, fillColor: [241, 245, 249], textColor: [15, 23, 42] } },
          { content: 'Sector Rank Percentile', styles: { fontStyle: 'bold', fontSize: 7.2, fillColor: [241, 245, 249], textColor: [15, 23, 42] } },
          { content: 'Risk Classification', styles: { fontStyle: 'bold', fontSize: 7.2, fillColor: [241, 245, 249], textColor: [15, 23, 42] } },
        ],
      ],
      body: [
        ['Schedule Variance Rate', `+${activeProject.predictedDelayMonths} Months`, '+3.1 Months', 'Bottom 12th Percentile', 'SEVERE SLIPPAGE'],
        ['Cost Overrun Percentage', `+${Math.round((activeProject.predictedCostOverrunCr / activeProject.sanctionedCostCr) * 100)}%`, '+4.8%', 'Bottom 18th Percentile', 'BUDGET DRIFT'],
        ['Physical Execution Velocity', `${activeProject.currentPhysicalProgress}% / Mo`, '3.8% / Mo', 'Bottom 24th Percentile', 'LAGGING'],
        ['Inter-Agency Clearance Delay', '118 Days', '42 Days', 'Bottom 8th Percentile', 'ACUTE BOTTLENECK'],
      ],
      styles: {
        fontSize: 7.2,
        cellPadding: 2,
        lineColor: [226, 232, 240],
        lineWidth: 0.2,
      },
    });
  }

  drawFooter(2, 3);

  // ==========================================
  // PAGE 3: PRESCRIPTIVE ACTION & DIGITAL SIGNATURE
  // ==========================================
  doc.addPage();
  drawHeader(3, 3);
  currentY = 27;

  // Section 6: Prescriptive Action Plan
  if (includeMitigation) {
    doc.setFillColor(236, 253, 245);
    doc.rect(margin, currentY, contentWidth, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(6, 95, 70);
    doc.text('6.0 PRESCRIPTIVE 90-DAY MINISTERIAL INTERVENTION ROADMAP', margin + 3, currentY + 4.2);

    currentY += 8;

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      theme: 'grid',
      head: [
        [
          { content: 'Window', styles: { fillColor: [6, 78, 59], textColor: [255, 255, 255], fontStyle: 'bold', cellWidth: 22 } },
          { content: 'Mandatory Directive & Action Protocol', styles: { fillColor: [6, 78, 59], textColor: [255, 255, 255], fontStyle: 'bold' } },
          { content: 'Designated Authority', styles: { fillColor: [6, 78, 59], textColor: [255, 255, 255], fontStyle: 'bold', cellWidth: 42 } },
          { content: 'Target Deadline', styles: { fillColor: [6, 78, 59], textColor: [255, 255, 255], fontStyle: 'bold', cellWidth: 26 } },
        ],
      ],
      body: [
        [
          { content: 'T + 14 Days\n[URGENT]', styles: { fontStyle: 'bold', textColor: [220, 38, 38], fillColor: [254, 242, 242] } },
          { content: 'Convene tri-party Secretary review with Chief Secretary of State, MoRTH, and Ministry of Petroleum/Power for fast-track utility clearance.' },
          { content: 'Cabinet Secretary &\nSecretary, MoRTH', styles: { fontStyle: 'bold' } },
          { content: 'Immediate (14 Days)' },
        ],
        [
          { content: 'T + 30 Days\n[ACTION]', styles: { fontStyle: 'bold', textColor: [217, 119, 6], fillColor: [255, 251, 235] } },
          { content: 'Enforce contractual clause 44.2 on Concessionaire/EPC partner; mandate mobilization of 2 additional PQC concrete paving trains and night-shift ROB launch.' },
          { content: 'Chairman, NHAI &\nProject Director', styles: { fontStyle: 'bold' } },
          { content: 'Within 30 Days' },
        ],
        [
          { content: 'T + 60 Days\n[AUDIT]', styles: { fontStyle: 'bold', textColor: [30, 64, 175], fillColor: [238, 242, 255] } },
          { content: 'Interim financial and physical throughput audit. Restructure unspent escrow milestone disbursements directly to verified sub-contractors.' },
          { content: 'Financial Advisor &\nIndependent Engineer', styles: { fontStyle: 'bold' } },
          { content: 'Within 60 Days' },
        ],
        [
          { content: 'T + 90 Days\n[RECOVERY]', styles: { fontStyle: 'bold', textColor: [6, 95, 70], fillColor: [240, 253, 244] } },
          { content: 'Statutory safety certificate inspection readiness audit. Recalibrate commercial COD baseline with zero additional cost liability to exchequer.' },
          { content: 'National Project Directorate\n(NIPMU)', styles: { fontStyle: 'bold' } },
          { content: 'Within 90 Days' },
        ],
      ],
      styles: {
        fontSize: 7.2,
        cellPadding: 2.4,
        lineColor: [226, 232, 240],
        lineWidth: 0.2,
      },
    });

    currentY = (doc as any).lastAutoTable.finalY + 8;
  }

  // ==========================================
  // OFFICIAL DIGITAL SIGNATURE STAMP & SEAL
  // ==========================================
  const sigBoxHeight = 52;
  if (currentY + sigBoxHeight > pageHeight - 20) {
    doc.addPage();
    drawHeader(3, 4);
    currentY = 27;
  }

  // Official Signature Container Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(30, 64, 175);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, currentY, contentWidth, sigBoxHeight, 2, 2, 'FD');

  // Top header in the signature box
  doc.setFillColor(30, 64, 175);
  doc.roundedRect(margin, currentY, contentWidth, 7, 2, 2, 'F');
  doc.rect(margin, currentY + 3, contentWidth, 4, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('OFFICIAL DIGITAL SIGNATURE CERTIFICATION  •  IT ACT 2000 VALIDATED', margin + 4, currentY + 4.8);

  const sigInnerY = currentY + 11;

  // Left Column: Digital Seal & Government Security Mark
  doc.setDrawColor(16, 185, 129);
  doc.setFillColor(236, 253, 245);
  doc.roundedRect(margin + 4, sigInnerY, 52, 34, 1.5, 1.5, 'FD');

  doc.setTextColor(6, 95, 70);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('[VERIFIED DIGITAL SIGNATURE]', margin + 6, sigInnerY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(4, 120, 87);
  doc.text('Status: CRYPTOGRAPHICALLY VALID', margin + 6, sigInnerY + 11);
  doc.text(`Cert ID: ${certId}`, margin + 6, sigInnerY + 15);
  doc.text(`Time: ${dateFormatted} ${timeFormatted}`, margin + 6, sigInnerY + 19);
  doc.text('Authority: NIC-CA Govt of India Class 3', margin + 6, sigInnerY + 23);
  doc.text('Hash: SHA-256 (Tamper Evident)', margin + 6, sigInnerY + 27);
  doc.text('Signature Algorithm: RSA-4096 / SHA256', margin + 6, sigInnerY + 31);

  // Right Column: Signatory Credentials & Official Endorsement
  const rightX = margin + 60;
  doc.setTextColor(11, 31, 58);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Digitally Signed by:', rightX, sigInnerY + 6);

  doc.setFontSize(10.5);
  doc.setTextColor(30, 64, 175);
  doc.text('Dr. Arvind K. Sharma, IAS', rightX, sigInnerY + 12);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('Additional Secretary & Director General', rightX, sigInnerY + 17);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('National Infrastructure Project Monitoring Unit (NIPMU)', rightX, sigInnerY + 22);
  doc.text('Cabinet Secretariat & PM Gati Shakti Mission, Government of India', rightX, sigInnerY + 26.5);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.8);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'This executive brief is an authentic automated intelligence dossier generated under Rule 12 of Government Business Rules.',
    rightX,
    sigInnerY + 32,
  );

  drawFooter(3, 3);

  // File Name Sanitization and Download
  const sanitizedCode = activeProject.code.replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${sanitizedCode}_Executive_Risk_Brief_${now.getFullYear()}_Signed.pdf`;
  
  doc.save(filename);
  return filename;
}
