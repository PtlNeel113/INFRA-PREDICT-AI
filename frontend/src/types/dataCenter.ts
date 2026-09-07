export type IngestionStatus = 'IDLE' | 'PARSING' | 'VALIDATING' | 'COMPLETED' | 'ERROR';

export interface DataIngestionSummary {
  totalRows: number;
  validRows: number;
  missingValues: number;
  duplicateEntries: number;
  invalidDates: number;
  qualityScore: number;
  ingestedAt: string;
}

export interface DataAnomaly {
  id: string;
  field: string;
  projectCode: string;
  issue: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  suggestedCorrection: string;
}

export interface MasterDatasetItem {
  id: string;
  title: string;
  source: string;
  recordCount: number;
  coverage: string;
  lastUpdated: string;
  format: 'CSV' | 'XLSX' | 'API_STREAM';
  status: 'ACTIVE' | 'ARCHIVED' | 'PROCESSING';
}
