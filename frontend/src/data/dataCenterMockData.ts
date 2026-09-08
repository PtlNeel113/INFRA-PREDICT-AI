import { DataAnomaly, MasterDatasetItem } from '../types/dataCenter';

export const MOCK_MASTER_DATASETS: MasterDatasetItem[] = [
  {
    id: 'ds-01',
    title: 'Monthly Infrastructure Master',
    source: 'Central Infrastructure Monitoring Portal',
    recordCount: 1842,
    coverage: 'All Mega Infrastructure Projects (>₹150 Cr Outlay)',
    lastUpdated: 'Today • 10:30 AM',
    format: 'API_STREAM',
    status: 'ACTIVE',
  },
  {
    id: 'ds-02',
    title: 'NHAI Bharatmala Project Telemetry & Milestone Ledger',
    source: 'National Highways Authority of India (Data Lake)',
    recordCount: 480,
    coverage: 'Expressways, Economic Corridors & Ring Roads',
    lastUpdated: 'Yesterday • 06:15 PM',
    format: 'CSV',
    status: 'ACTIVE',
  },
  {
    id: 'ds-03',
    title: 'Indian Railways Mission 3000MT Corridor Progress Feed',
    source: 'Ministry of Railways (Gati Shakti Directorate)',
    recordCount: 312,
    coverage: 'Dedicated Freight Corridors, High-Speed & Doubling',
    lastUpdated: '3 days ago',
    format: 'XLSX',
    status: 'ACTIVE',
  },
  {
    id: 'ds-04',
    title: 'Central Electricity Authority (CEA) Power Transmission Feed',
    source: 'Ministry of Power',
    recordCount: 228,
    coverage: 'Green Energy Corridors & HVDC Links',
    lastUpdated: '1 week ago',
    format: 'CSV',
    status: 'ACTIVE',
  },
];

export const MOCK_DATA_ANOMALIES: DataAnomaly[] = [
  {
    id: 'anom-01',
    field: 'Physical Progress (%)',
    projectCode: 'NH-66-KRL-02',
    issue: 'Discontinuous progress jump (+18% reported in 7 days without corresponding billing milestone)',
    severity: 'HIGH',
    suggestedCorrection: 'Verify contractor milestone billing certificate with Independent Engineer.',
  },
  {
    id: 'anom-02',
    field: 'Revised Target Date',
    projectCode: 'METRO-PH2-BLR',
    issue: 'Target completion date precedes statutory railway safety commissioner inspection window',
    severity: 'MEDIUM',
    suggestedCorrection: 'Re-align commercial launch date +45 days post CRS safety audit.',
  },
  {
    id: 'anom-03',
    field: 'Land Acquisition Chainage',
    projectCode: 'DME-PKG-14B',
    issue: 'Discrepancy between state revenue circle certificate (94%) vs GIS ROW boundary audit (89.2%)',
    severity: 'HIGH',
    suggestedCorrection: 'Reconcile chainage km 312 to 328 with State Nodal Collector.',
  },
];
