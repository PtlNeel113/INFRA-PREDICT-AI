import * as XLSX from 'xlsx';
import {
  IngestionFileFormat,
  ColumnMappingOption,
  ParsedIngestionPreview,
  SchemaMappingState,
  IngestionRowError,
  IngestionProcessSummary,
} from '../types/ingestion';
import { InfraProject, CreateProjectInput } from '../types/projects';
import { calculateProjectMetrics } from '../utils/riskCalculationEngine';

export const CANONICAL_COLUMNS: ColumnMappingOption[] = [
  {
    key: 'name',
    label: 'Project Name',
    required: true,
    type: 'string',
    aliases: ['project name', 'project_name', 'name', 'project', 'asset name', 'title', 'project title'],
  },
  {
    key: 'code',
    label: 'Project Code / ID',
    required: true,
    type: 'string',
    aliases: ['project code', 'project_code', 'code', 'pkg code', 'package code', 'package id', 'project id', 'id'],
  },
  {
    key: 'sector',
    label: 'Infrastructure Sector',
    required: true,
    type: 'string',
    aliases: ['sector', 'sector name', 'sector_name', 'category', 'infrastructure sector', 'domain'],
  },
  {
    key: 'state',
    label: 'State / Region',
    required: true,
    type: 'string',
    aliases: ['state', 'state name', 'state_name', 'location', 'region'],
  },
  {
    key: 'district',
    label: 'District',
    required: false,
    type: 'string',
    aliases: ['district', 'district name', 'district_name', 'city', 'location district'],
  },
  {
    key: 'implementingAgency',
    label: 'Implementing Agency',
    required: true,
    type: 'string',
    aliases: ['implementing agency', 'implementing_agency', 'agency', 'nodal agency', 'authority', 'executor'],
  },
  {
    key: 'ministry',
    label: 'Ministry / Department',
    required: false,
    type: 'string',
    aliases: ['ministry', 'ministry name', 'ministry_name', 'department', 'govt body', 'central ministry'],
  },
  {
    key: 'sanctionedCostCr',
    label: 'Sanctioned Cost (₹ Cr)',
    required: true,
    type: 'number',
    aliases: ['sanctioned cost', 'sanctioned_cost', 'sanctioned cost cr', 'approved cost', 'budget', 'sanctioned cost (cr)', 'cost cr'],
  },
  {
    key: 'expenditureCr',
    label: 'Cumulative Expenditure (₹ Cr)',
    required: false,
    type: 'number',
    aliases: ['expenditure', 'expenditure cr', 'expenditure (cr)', 'expenditure_cr', 'cumulative expenditure', 'spent', 'actual cost', 'actual outlay'],
  },
  {
    key: 'currentPhysicalProgress',
    label: 'Physical Progress (%)',
    required: true,
    type: 'number',
    aliases: ['physical progress', 'physical_progress', 'current physical progress', 'progress', 'progress %', 'progress_pct', 'completion %', 'actual progress'],
  },
  {
    key: 'expectedProgress',
    label: 'Scheduled Progress (%)',
    required: false,
    type: 'number',
    aliases: ['expected progress', 'expected_progress', 'scheduled progress', 'target progress', 'planned progress', 'plan progress %'],
  },
  {
    key: 'startDate',
    label: 'Start Date',
    required: false,
    type: 'date',
    aliases: ['start date', 'start_date', 'commencement date', 'sanction date', 'start', 'date of start'],
  },
  {
    key: 'originalDeadline',
    label: 'Target Completion Date',
    required: false,
    type: 'date',
    aliases: ['target date', 'target_date', 'deadline', 'original deadline', 'original_deadline', 'target completion date', 'completion date'],
  },
  {
    key: 'primaryRiskDriver',
    label: 'Primary Risk Driver',
    required: false,
    type: 'string',
    aliases: ['primary risk driver', 'primary_risk_driver', 'risk driver', 'bottleneck', 'main bottleneck', 'impediment', 'key risk'],
  },
  {
    key: 'currentIssues',
    label: 'Current Issues & Remarks',
    required: false,
    type: 'string',
    aliases: ['current issues', 'current_issues', 'issues', 'remarks', 'delay reason', 'reasons for delay', 'impediments'],
  },
];

// Helper to determine file format
export function getFileFormat(filename: string): IngestionFileFormat {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  if (ext === 'xlsx') return 'xlsx';
  if (ext === 'xls') return 'xls';
  if (ext === 'csv') return 'csv';
  if (ext === 'json') return 'json';
  return 'csv';
}

// Helper to clean and normalize numerical currency values
function cleanNumber(val: unknown): number | null {
  if (val === null || val === undefined || val === '') return null;
  if (typeof val === 'number') return isNaN(val) ? null : val;
  const str = String(val)
    .replace(/[₹$,\s]/g, '')
    .replace(/cr$/i, '')
    .trim();
  const num = parseFloat(str);
  return isNaN(num) ? null : num;
}

// Helper to clean percentages (e.g. 68.5% or 0.685)
function cleanPercentage(val: unknown): number | null {
  const num = cleanNumber(val);
  if (num === null) return null;
  // If user provided 0.68 instead of 68%
  if (num > 0 && num <= 1.0) {
    return Math.round(num * 1000) / 10;
  }
  return Math.min(100, Math.max(0, Math.round(num * 10) / 10));
}

// Helper to clean dates
function cleanDate(val: unknown): string {
  if (!val) return new Date().toISOString().split('T')[0];
  if (typeof val === 'number') {
    // Excel serial date number
    const date = new Date((val - (25567 + 2)) * 86400 * 1000);
    return date.toISOString().split('T')[0];
  }
  const str = String(val).trim();
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split('T')[0];
  }
  // Try DD-MM-YYYY or DD/MM/YYYY
  const parts = str.split(/[-/]/);
  if (parts.length === 3) {
    if (parts[0].length === 4) {
      // YYYY-MM-DD
      return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
    }
    // DD-MM-YYYY
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }
  return new Date().toISOString().split('T')[0];
}

// Auto map detected columns to canonical keys
export function autoMapColumns(headers: string[]): SchemaMappingState {
  const mappings: SchemaMappingState = {};

  headers.forEach((header) => {
    const cleanH = header.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
    const matchedCanonical = CANONICAL_COLUMNS.find((col) => {
      const canonicalKey = col.key.toLowerCase();
      const canonicalLabel = col.label.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
      if (cleanH === canonicalKey || cleanH === canonicalLabel) return true;
      return col.aliases.some((alias) => cleanH === alias || cleanH.includes(alias));
    });

    if (matchedCanonical) {
      mappings[header] = matchedCanonical.key;
    }
  });

  return mappings;
}

// Parse file in memory into preview
export async function parseUploadedFile(file: File): Promise<ParsedIngestionPreview> {
  const format = getFileFormat(file.name);
  const buffer = await file.arrayBuffer();

  let rows: Record<string, unknown>[] = [];
  let headers: string[] = [];

  if (format === 'json') {
    const text = new TextDecoder().decode(buffer);
    const parsed = JSON.parse(text);
    rows = Array.isArray(parsed) ? parsed : [parsed];
    if (rows.length > 0) {
      headers = Object.keys(rows[0]);
    }
  } else {
    // xlsx, xls, csv
    const workbook = XLSX.read(buffer, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, { defval: '' });
    if (rows.length > 0) {
      headers = Object.keys(rows[0]);
    }
  }

  if (rows.length === 0) {
    throw new Error('The uploaded file contains no data rows.');
  }

  const suggestedMappings = autoMapColumns(headers);
  const unmappedHeaders = headers.filter((h) => !suggestedMappings[h]);

  return {
    filename: file.name,
    format,
    fileSize: file.size,
    headers,
    totalRows: rows.length,
    sampleRows: rows.slice(0, 5),
    suggestedMappings,
    unmappedHeaders,
  };
}

// Execute complete production ingestion pipeline
export async function executeIngestionPipeline(
  file: File,
  mappings: SchemaMappingState,
  existingProjects: InfraProject[],
): Promise<{
  summary: IngestionProcessSummary;
  ingestedProjects: InfraProject[];
  errorReportCsv: string;
}> {
  const format = getFileFormat(file.name);
  const buffer = await file.arrayBuffer();

  let rawRows: Record<string, unknown>[] = [];
  if (format === 'json') {
    const text = new TextDecoder().decode(buffer);
    const parsed = JSON.parse(text);
    rawRows = Array.isArray(parsed) ? parsed : [parsed];
  } else {
    const workbook = XLSX.read(buffer, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, { defval: '' });
  }

  const errors: IngestionRowError[] = [];
  const validInputs: CreateProjectInput[] = [];

  // Inverted mapping: canonicalKey -> sourceColumn
  const reverseMap: Record<string, string> = {};
  Object.entries(mappings).forEach(([sourceCol, canonicalKey]) => {
    if (canonicalKey) {
      reverseMap[canonicalKey] = sourceCol;
    }
  });

  rawRows.forEach((row, idx) => {
    const rowNum = idx + 2; // 1-indexed, accounting for header row
    const getValue = (key: string): unknown => {
      const sourceCol = reverseMap[key];
      return sourceCol ? row[sourceCol] : row[key];
    };

    const name = String(getValue('name') || '').trim();
    let code = String(getValue('code') || '').trim();
    const sector = String(getValue('sector') || 'Roads & Highways').trim();
    const state = String(getValue('state') || 'National').trim();
    const agency = String(getValue('implementingAgency') || 'NHAI').trim();
    const ministry = String(getValue('ministry') || 'MoRTH').trim();
    const district = String(getValue('district') || '').trim();

    const costVal = cleanNumber(getValue('sanctionedCostCr'));
    const expVal = cleanNumber(getValue('expenditureCr'));
    const physProgVal = cleanPercentage(getValue('currentPhysicalProgress'));
    const schedProgVal = cleanPercentage(getValue('expectedProgress'));

    const startDate = cleanDate(getValue('startDate'));
    const originalDeadline = cleanDate(getValue('originalDeadline'));
    const primaryRiskDriver = String(getValue('primaryRiskDriver') || 'Right of Way & Statutory Clearances').trim();
    const currentIssues = String(getValue('currentIssues') || '').trim();

    // Validation rules
    if (!name) {
      errors.push({
        rowNumber: rowNum,
        projectCode: code || undefined,
        field: 'name',
        rawValue: getValue('name'),
        reason: 'Project Name is required and cannot be blank.',
      });
      return;
    }

    if (!costVal || costVal <= 0) {
      errors.push({
        rowNumber: rowNum,
        projectCode: code || undefined,
        field: 'sanctionedCostCr',
        rawValue: getValue('sanctionedCostCr'),
        reason: 'Sanctioned Cost must be a positive number in ₹ Cr.',
      });
      return;
    }

    if (physProgVal === null || physProgVal < 0 || physProgVal > 100) {
      errors.push({
        rowNumber: rowNum,
        projectCode: code || undefined,
        field: 'currentPhysicalProgress',
        rawValue: getValue('currentPhysicalProgress'),
        reason: 'Physical Progress must be between 0% and 100%.',
      });
      return;
    }

    // Auto-generate code if missing
    if (!code) {
      const initials = sector.split(' ').map((s) => s[0]).join('').slice(0, 3).toUpperCase();
      code = `PRJ-${initials}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    }

    const input: CreateProjectInput = {
      name,
      code,
      sector,
      state,
      district: district || undefined,
      implementingAgency: agency,
      ministry: ministry || undefined,
      sanctionedCostCr: costVal,
      expenditureCr: expVal !== null && expVal >= 0 ? expVal : Math.round(costVal * (physProgVal / 100) * 0.95),
      currentPhysicalProgress: physProgVal,
      expectedProgress: schedProgVal !== null ? schedProgVal : Math.min(100, Math.round(physProgVal + 5)),
      startDate,
      originalDeadline,
      primaryRiskDriver,
      currentIssues: currentIssues || undefined,
    };

    validInputs.push(input);
  });

  // Calculate risks and create unified InfraProject records
  let createdCount = 0;
  let updatedCount = 0;
  const existingCodeSet = new Set(existingProjects.map((p) => p.code.toLowerCase().trim()));

  const ingestedProjects: InfraProject[] = validInputs.map((input) => {
    const isExisting = existingCodeSet.has(input.code.toLowerCase().trim());
    if (isExisting) {
      updatedCount++;
    } else {
      createdCount++;
    }
    const computed = calculateProjectMetrics(input, existingProjects);
    return {
      ...computed,
      isUserCreated: true,
      calculationMethodology: 'Recalculated via Telemetry Ingestion Pipeline (Prototype Model)',
    };
  });

  const totalProcessed = rawRows.length;
  const rejectedCount = errors.length;
  const qualityScore = totalProcessed > 0
    ? Math.round(((totalProcessed - rejectedCount) / totalProcessed) * 1000) / 10
    : 100;

  // Build error report CSV for rejected rows
  let errorReportCsv = 'Row Number,Project Code,Field,Raw Value,Failure Reason\n';
  errors.forEach((err) => {
    const rawClean = String(err.rawValue || '').replace(/"/g, '""');
    const reasonClean = String(err.reason || '').replace(/"/g, '""');
    errorReportCsv += `${err.rowNumber},"${err.projectCode || 'N/A'}","${err.field}","${rawClean}","${reasonClean}"\n`;
  });

  const summary: IngestionProcessSummary = {
    jobId: `JOB-${Date.now().toString(36).toUpperCase()}`,
    filename: file.name,
    totalProcessed,
    updatedCount,
    createdCount,
    rejectedCount,
    errors,
    recalculatedRiskCount: ingestedProjects.length,
    qualityScore,
  };

  return { summary, ingestedProjects, errorReportCsv };
}
