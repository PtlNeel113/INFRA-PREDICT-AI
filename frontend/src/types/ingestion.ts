export type IngestionFileFormat = 'csv' | 'xlsx' | 'xls' | 'json' | 'mpr';

export type IngestionStep =
  | 'SELECT_FILE'
  | 'PREVIEW_AND_MAP'
  | 'PROCESSING'
  | 'COMPLETE'
  | 'ERROR';

export interface ColumnMappingOption {
  key: string;
  label: string;
  required: boolean;
  type: 'string' | 'number' | 'date';
  aliases: string[];
}

export interface IngestionJobRecord {
  id: string;
  filename: string;
  fileSize: number;
  totalRows: number;
  processedRows: number;
  updatedRows: number;
  newRows: number;
  rejectedRows: number;
  status: 'COMPLETED' | 'FAILED' | 'PARTIAL';
  timestamp: string;
  errors: IngestionRowError[];
  user: string;
}

export interface IngestionRowError {
  rowNumber: number;
  projectCode?: string;
  field: string;
  rawValue: unknown;
  reason: string;
}

export interface SchemaMappingState {
  [sourceColumn: string]: string; // sourceColumn -> canonicalKey
}

export interface ParsedIngestionPreview {
  filename: string;
  format: IngestionFileFormat;
  fileSize: number;
  headers: string[];
  totalRows: number;
  sampleRows: Record<string, unknown>[];
  suggestedMappings: SchemaMappingState;
  unmappedHeaders: string[];
}

export interface IngestionProcessSummary {
  jobId: string;
  filename: string;
  totalProcessed: number;
  updatedCount: number;
  createdCount: number;
  rejectedCount: number;
  errors: IngestionRowError[];
  recalculatedRiskCount: number;
  qualityScore: number;
}
