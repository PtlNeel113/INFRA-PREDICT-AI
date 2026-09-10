import { ReportingPeriod } from '../types/map';

export interface PaimanaStateMetadata {
  id: string; // SVG location id in @svg-maps/india (e.g. 'gj', 'mh')
  name: string;
  shortCode: string;
  aliases: string[];
  cx: number;
  cy: number;
}

export const PAIMANA_STATE_METADATA: PaimanaStateMetadata[] = [
  { id: 'an', name: 'Andaman and Nicobar Islands', shortCode: 'AN', aliases: ['Andaman & Nicobar', 'Andaman and Nicobar'], cx: 521, cy: 609 },
  { id: 'ap', name: 'Andhra Pradesh', shortCode: 'AP', aliases: ['Andhra'], cx: 263, cy: 500 },
  { id: 'ar', name: 'Arunachal Pradesh', shortCode: 'AR', aliases: ['Arunachal'], cx: 550, cy: 224 },
  { id: 'as', name: 'Assam', shortCode: 'AS', aliases: ['Assam / North East', 'Assam & NE'], cx: 516, cy: 271 },
  { id: 'br', name: 'Bihar', shortCode: 'BR', aliases: [], cx: 369, cy: 275 },
  { id: 'ch', name: 'Chandigarh', shortCode: 'CH', aliases: [], cx: 179, cy: 160 },
  { id: 'ct', name: 'Chhattisgarh', shortCode: 'CG', aliases: ['Chattisgarh'], cx: 296, cy: 388 },
  { id: 'dn', name: 'Dadra and Nagar Haveli', shortCode: 'DN', aliases: ['Dadra & Nagar Haveli'], cx: 102, cy: 405 },
  { id: 'dd', name: 'Daman and Diu', shortCode: 'DD', aliases: ['Daman & Diu'], cx: 54, cy: 391 },
  { id: 'dl', name: 'Delhi', shortCode: 'DL', aliases: ['Delhi NCR', 'NCT of Delhi'], cx: 186, cy: 210 },
  { id: 'ga', name: 'Goa', shortCode: 'GA', aliases: [], cx: 122, cy: 512 },
  { id: 'gj', name: 'Gujarat', shortCode: 'GJ', aliases: [], cx: 66, cy: 355 },
  { id: 'hr', name: 'Haryana', shortCode: 'HR', aliases: [], cx: 164, cy: 195 },
  { id: 'hp', name: 'Himachal Pradesh', shortCode: 'HP', aliases: ['Himachal'], cx: 191, cy: 133 },
  { id: 'jk', name: 'Jammu and Kashmir', shortCode: 'JK', aliases: ['Jammu & Kashmir', 'Jammu & Kashmir / Ladakh', 'Ladakh', 'J&K'], cx: 173, cy: 61 },
  { id: 'jh', name: 'Jharkhand', shortCode: 'JH', aliases: [], cx: 366, cy: 327 },
  { id: 'ka', name: 'Karnataka', shortCode: 'KA', aliases: [], cx: 171, cy: 519 },
  { id: 'kl', name: 'Kerala', shortCode: 'KL', aliases: [], cx: 166, cy: 615 },
  { id: 'ld', name: 'Lakshadweep', shortCode: 'LD', aliases: [], cx: 99, cy: 627 },
  { id: 'mp', name: 'Madhya Pradesh', shortCode: 'MP', aliases: ['MP'], cx: 214, cy: 319 },
  { id: 'mh', name: 'Maharashtra', shortCode: 'MH', aliases: [], cx: 180, cy: 435 },
  { id: 'mn', name: 'Manipur', shortCode: 'MN', aliases: [], cx: 537, cy: 301 },
  { id: 'ml', name: 'Meghalaya', shortCode: 'ML', aliases: [], cx: 484, cy: 283 },
  { id: 'mz', name: 'Mizoram', shortCode: 'MZ', aliases: [], cx: 516, cy: 337 },
  { id: 'nl', name: 'Nagaland', shortCode: 'NL', aliases: [], cx: 546, cy: 270 },
  { id: 'or', name: 'Odisha', shortCode: 'OD', aliases: ['Orissa'], cx: 340, cy: 405 },
  { id: 'py', name: 'Puducherry', shortCode: 'PY', aliases: ['Pondicherry'], cx: 268, cy: 546 },
  { id: 'pb', name: 'Punjab', shortCode: 'PB', aliases: [], cx: 151, cy: 152 },
  { id: 'rj', name: 'Rajasthan', shortCode: 'RJ', aliases: [], cx: 119, cy: 257 },
  { id: 'sk', name: 'Sikkim', shortCode: 'SK', aliases: [], cx: 425, cy: 235 },
  { id: 'tn', name: 'Tamil Nadu', shortCode: 'TN', aliases: ['Tamilnadu'], cx: 211, cy: 609 },
  { id: 'tg', name: 'Telangana', shortCode: 'TS', aliases: ['Telengana'], cx: 237, cy: 457 },
  { id: 'tr', name: 'Tripura', shortCode: 'TR', aliases: [], cx: 493, cy: 325 },
  { id: 'up', name: 'Uttar Pradesh', shortCode: 'UP', aliases: ['UP'], cx: 265, cy: 245 },
  { id: 'ut', name: 'Uttarakhand', shortCode: 'UK', aliases: ['Uttaranchal'], cx: 232, cy: 175 },
  { id: 'wb', name: 'West Bengal', shortCode: 'WB', aliases: ['Bengal'], cx: 412, cy: 310 },
];

export interface StateMonthlySnapshot {
  projectCount: number;
  totalOriginalCostCr: number;
  totalRevisedCostCr: number;
  totalExpenditureCr: number;
  averagePhysicalProgress: number;
  costRevisionCount: number;
  scheduleRevisionCount: number;
  criticalCount: number;
  highCount: number;
  watchCount: number;
  stableCount: number;
  riskSeverity: 'CRITICAL' | 'HIGH' | 'WATCH' | 'STABLE';
  riskIndex: number;
  topRiskDriver: string;
}

// MoSPI PAIMANA Monthly State Snapshots
export const PAIMANA_STATE_MONTHLY_DATA: Record<ReportingPeriod, Record<string, StateMonthlySnapshot>> = {
  'April 2026': {
    gj: { projectCount: 160, totalOriginalCostCr: 278000, totalRevisedCostCr: 290000, totalExpenditureCr: 142000, averagePhysicalProgress: 64.2, costRevisionCount: 22, scheduleRevisionCount: 31, criticalCount: 12, highCount: 38, watchCount: 65, stableCount: 45, riskSeverity: 'HIGH', riskIndex: 72, topRiskDriver: 'Land Consolidation & Gas Pipeline Relocation' },
    mh: { projectCount: 206, totalOriginalCostCr: 365000, totalRevisedCostCr: 379000, totalExpenditureCr: 204000, averagePhysicalProgress: 69.5, costRevisionCount: 28, scheduleRevisionCount: 36, criticalCount: 10, highCount: 35, watchCount: 95, stableCount: 66, riskSeverity: 'WATCH', riskIndex: 58, topRiskDriver: 'Coastal Regulation & Urban Right of Way' },
    up: { projectCount: 234, totalOriginalCostCr: 395000, totalRevisedCostCr: 407000, totalExpenditureCr: 218000, averagePhysicalProgress: 62.8, costRevisionCount: 34, scheduleRevisionCount: 44, criticalCount: 16, highCount: 52, watchCount: 102, stableCount: 64, riskSeverity: 'HIGH', riskIndex: 71, topRiskDriver: 'Rail Overbridge Approvals & Highway Utilities' },
    tn: { projectCount: 139, totalOriginalCostCr: 236000, totalRevisedCostCr: 244000, totalExpenditureCr: 128000, averagePhysicalProgress: 56.4, costRevisionCount: 20, scheduleRevisionCount: 29, criticalCount: 14, highCount: 32, watchCount: 54, stableCount: 39, riskSeverity: 'CRITICAL', riskIndex: 82, topRiskDriver: 'Underground Metro TBM Hard-Rock Geology' },
    ka: { projectCount: 147, totalOriginalCostCr: 252000, totalRevisedCostCr: 260000, totalExpenditureCr: 139000, averagePhysicalProgress: 71.0, costRevisionCount: 14, scheduleRevisionCount: 21, criticalCount: 6, highCount: 26, watchCount: 68, stableCount: 47, riskSeverity: 'WATCH', riskIndex: 54, topRiskDriver: 'Suburban Rail Land Handover & Forest Buffers' },
    br: { projectCount: 114, totalOriginalCostCr: 172000, totalRevisedCostCr: 179000, totalExpenditureCr: 94000, averagePhysicalProgress: 50.8, costRevisionCount: 18, scheduleRevisionCount: 27, criticalCount: 13, highCount: 36, watchCount: 41, stableCount: 24, riskSeverity: 'CRITICAL', riskIndex: 84, topRiskDriver: 'Track Paving Machine Availability & Monsoon Flood' },
    wb: { projectCount: 122, totalOriginalCostCr: 189000, totalRevisedCostCr: 195000, totalExpenditureCr: 108000, averagePhysicalProgress: 54.1, costRevisionCount: 17, scheduleRevisionCount: 26, criticalCount: 12, highCount: 34, watchCount: 46, stableCount: 30, riskSeverity: 'CRITICAL', riskIndex: 80, topRiskDriver: 'Linear Land Acquisition & Environmental Clearances' },
    rj: { projectCount: 134, totalOriginalCostCr: 208000, totalRevisedCostCr: 212000, totalExpenditureCr: 125000, averagePhysicalProgress: 76.5, costRevisionCount: 8, scheduleRevisionCount: 14, criticalCount: 4, highCount: 16, watchCount: 52, stableCount: 62, riskSeverity: 'STABLE', riskIndex: 38, topRiskDriver: 'Solar Transmission Grid Evacuation Window' },
    mp: { projectCount: 139, totalOriginalCostCr: 242000, totalRevisedCostCr: 250000, totalExpenditureCr: 135000, averagePhysicalProgress: 59.8, costRevisionCount: 19, scheduleRevisionCount: 28, criticalCount: 11, highCount: 29, watchCount: 58, stableCount: 41, riskSeverity: 'HIGH', riskIndex: 68, topRiskDriver: 'River Interlinking Wildlife Clearance & R&R' },
    od: { projectCount: 108, totalOriginalCostCr: 169000, totalRevisedCostCr: 173000, totalExpenditureCr: 98000, averagePhysicalProgress: 80.2, costRevisionCount: 7, scheduleRevisionCount: 11, criticalCount: 3, highCount: 13, watchCount: 42, stableCount: 50, riskSeverity: 'STABLE', riskIndex: 34, topRiskDriver: 'Heavy Mineral Freight Corridor Forest Approvals' },
    ap: { projectCount: 124, totalOriginalCostCr: 214000, totalRevisedCostCr: 219000, totalExpenditureCr: 119000, averagePhysicalProgress: 67.4, costRevisionCount: 12, scheduleRevisionCount: 18, criticalCount: 5, highCount: 24, watchCount: 57, stableCount: 38, riskSeverity: 'WATCH', riskIndex: 56, topRiskDriver: 'Canal Embankment Shifting & Coastal Corridors' },
    tg: { projectCount: 93, totalOriginalCostCr: 162000, totalRevisedCostCr: 166000, totalExpenditureCr: 97000, averagePhysicalProgress: 78.6, costRevisionCount: 6, scheduleRevisionCount: 10, criticalCount: 2, highCount: 10, watchCount: 41, stableCount: 40, riskSeverity: 'STABLE', riskIndex: 36, topRiskDriver: 'GIS Substation Power Wheeling Clearances' },
    as: { projectCount: 100, totalOriginalCostCr: 136000, totalRevisedCostCr: 140000, totalExpenditureCr: 72000, averagePhysicalProgress: 53.6, costRevisionCount: 16, scheduleRevisionCount: 24, criticalCount: 11, highCount: 27, watchCount: 38, stableCount: 24, riskSeverity: 'CRITICAL', riskIndex: 81, topRiskDriver: 'Hilly Terrain Landslides & River Span Logistics' },
    dl: { projectCount: 85, totalOriginalCostCr: 178000, totalRevisedCostCr: 182000, totalExpenditureCr: 102000, averagePhysicalProgress: 72.8, costRevisionCount: 11, scheduleRevisionCount: 15, criticalCount: 3, highCount: 15, watchCount: 40, stableCount: 27, riskSeverity: 'WATCH', riskIndex: 52, topRiskDriver: 'High-Density Traffic Diversion & Inter-Agency RoW' },
    jk: { projectCount: 62, totalOriginalCostCr: 112000, totalRevisedCostCr: 116000, totalExpenditureCr: 61000, averagePhysicalProgress: 46.2, costRevisionCount: 14, scheduleRevisionCount: 22, criticalCount: 8, highCount: 20, watchCount: 21, stableCount: 13, riskSeverity: 'CRITICAL', riskIndex: 88, topRiskDriver: 'Sub-Zero Avalanche Snow Sheds & Complex Thrust Faults' },
    kl: { projectCount: 71, totalOriginalCostCr: 107000, totalRevisedCostCr: 110000, totalExpenditureCr: 59000, averagePhysicalProgress: 64.9, costRevisionCount: 9, scheduleRevisionCount: 13, criticalCount: 3, highCount: 16, watchCount: 31, stableCount: 21, riskSeverity: 'WATCH', riskIndex: 57, topRiskDriver: 'Ribbon Settlement Land Acquisition Arbitration' },
    pb: { projectCount: 48, totalOriginalCostCr: 74000, totalRevisedCostCr: 76000, totalExpenditureCr: 44000, averagePhysicalProgress: 77.2, costRevisionCount: 4, scheduleRevisionCount: 6, criticalCount: 1, highCount: 6, watchCount: 22, stableCount: 19, riskSeverity: 'STABLE', riskIndex: 35, topRiskDriver: 'Canal Crossing Environmental NOCs' },
    hr: { projectCount: 56, totalOriginalCostCr: 88000, totalRevisedCostCr: 91000, totalExpenditureCr: 52000, averagePhysicalProgress: 74.5, costRevisionCount: 6, scheduleRevisionCount: 9, criticalCount: 2, highCount: 9, watchCount: 26, stableCount: 19, riskSeverity: 'WATCH', riskIndex: 49, topRiskDriver: 'NCR Ring Road Land Demarcation' },
    jh: { projectCount: 42, totalOriginalCostCr: 68000, totalRevisedCostCr: 71000, totalExpenditureCr: 38000, averagePhysicalProgress: 61.2, costRevisionCount: 7, scheduleRevisionCount: 11, criticalCount: 4, highCount: 11, watchCount: 17, stableCount: 10, riskSeverity: 'HIGH', riskIndex: 67, topRiskDriver: 'Coal Evacuation Railway Siding Approvals' },
    ct: { projectCount: 39, totalOriginalCostCr: 62000, totalRevisedCostCr: 64000, totalExpenditureCr: 35000, averagePhysicalProgress: 66.8, costRevisionCount: 4, scheduleRevisionCount: 7, criticalCount: 2, highCount: 8, watchCount: 18, stableCount: 11, riskSeverity: 'WATCH', riskIndex: 51, topRiskDriver: 'Dense Forest Tree Felling Clearances' },
    ut: { projectCount: 34, totalOriginalCostCr: 54000, totalRevisedCostCr: 57000, totalExpenditureCr: 31000, averagePhysicalProgress: 52.0, costRevisionCount: 6, scheduleRevisionCount: 10, criticalCount: 4, highCount: 10, watchCount: 13, stableCount: 7, riskSeverity: 'CRITICAL', riskIndex: 79, topRiskDriver: 'Geological Fault Tunnelling & Slope Stabilization' },
    hp: { projectCount: 31, totalOriginalCostCr: 48000, totalRevisedCostCr: 51000, totalExpenditureCr: 28000, averagePhysicalProgress: 54.8, costRevisionCount: 5, scheduleRevisionCount: 8, criticalCount: 3, highCount: 8, watchCount: 12, stableCount: 8, riskSeverity: 'HIGH', riskIndex: 69, topRiskDriver: 'Hydro Tunnel Desilting & Mountain Road Widening' },
    ga: { projectCount: 18, totalOriginalCostCr: 22000, totalRevisedCostCr: 23000, totalExpenditureCr: 14000, averagePhysicalProgress: 75.0, costRevisionCount: 1, scheduleRevisionCount: 2, criticalCount: 0, highCount: 2, watchCount: 8, stableCount: 8, riskSeverity: 'STABLE', riskIndex: 32, topRiskDriver: 'Coastal Highway Bridge Dredging' },
  },
  'May 2026': {
    gj: { projectCount: 163, totalOriginalCostCr: 282000, totalRevisedCostCr: 292000, totalExpenditureCr: 146000, averagePhysicalProgress: 65.5, costRevisionCount: 23, scheduleRevisionCount: 32, criticalCount: 13, highCount: 39, watchCount: 66, stableCount: 45, riskSeverity: 'HIGH', riskIndex: 73, topRiskDriver: 'Expressway Land Consolidation & Pipeline Relocations' },
    mh: { projectCount: 209, totalOriginalCostCr: 371000, totalRevisedCostCr: 381000, totalExpenditureCr: 209000, averagePhysicalProgress: 70.0, costRevisionCount: 29, scheduleRevisionCount: 37, criticalCount: 10, highCount: 36, watchCount: 96, stableCount: 67, riskSeverity: 'WATCH', riskIndex: 59, topRiskDriver: 'Coastal Regulation Clearances & Urban RoW' },
    up: { projectCount: 237, totalOriginalCostCr: 401000, totalRevisedCostCr: 409000, totalExpenditureCr: 224000, averagePhysicalProgress: 63.3, costRevisionCount: 35, scheduleRevisionCount: 46, criticalCount: 17, highCount: 54, watchCount: 102, stableCount: 64, riskSeverity: 'HIGH', riskIndex: 72, topRiskDriver: 'Rail Overbridge Approvals & Highway Utility Shifting' },
    tn: { projectCount: 141, totalOriginalCostCr: 240000, totalRevisedCostCr: 246000, totalExpenditureCr: 131000, averagePhysicalProgress: 57.2, costRevisionCount: 21, scheduleRevisionCount: 31, criticalCount: 15, highCount: 33, watchCount: 54, stableCount: 39, riskSeverity: 'CRITICAL', riskIndex: 83, topRiskDriver: 'Urban Underground TBM Hard-Rock Geology & Drainage' },
    ka: { projectCount: 149, totalOriginalCostCr: 256000, totalRevisedCostCr: 262000, totalExpenditureCr: 143000, averagePhysicalProgress: 71.6, costRevisionCount: 15, scheduleRevisionCount: 22, criticalCount: 6, highCount: 27, watchCount: 68, stableCount: 48, riskSeverity: 'WATCH', riskIndex: 54, topRiskDriver: 'Suburban Rail Land Handover & Forest Buffers' },
    br: { projectCount: 115, totalOriginalCostCr: 175000, totalRevisedCostCr: 180000, totalExpenditureCr: 97000, averagePhysicalProgress: 51.3, costRevisionCount: 19, scheduleRevisionCount: 29, criticalCount: 14, highCount: 37, watchCount: 40, stableCount: 24, riskSeverity: 'CRITICAL', riskIndex: 85, topRiskDriver: 'Contractor Heavy Machinery Mobilization & Flooding' },
    wb: { projectCount: 123, totalOriginalCostCr: 192000, totalRevisedCostCr: 196000, totalExpenditureCr: 111000, averagePhysicalProgress: 54.8, costRevisionCount: 18, scheduleRevisionCount: 27, criticalCount: 12, highCount: 35, watchCount: 46, stableCount: 30, riskSeverity: 'CRITICAL', riskIndex: 80, topRiskDriver: 'Land Acquisition Litigation & Environmental Zones' },
    rj: { projectCount: 135, totalOriginalCostCr: 210000, totalRevisedCostCr: 213000, totalExpenditureCr: 128000, averagePhysicalProgress: 77.0, costRevisionCount: 8, scheduleRevisionCount: 14, criticalCount: 4, highCount: 17, watchCount: 52, stableCount: 62, riskSeverity: 'STABLE', riskIndex: 38, topRiskDriver: 'Solar Park High-Tension Transmission Evacuation' },
    mp: { projectCount: 141, totalOriginalCostCr: 246000, totalRevisedCostCr: 252000, totalExpenditureCr: 139000, averagePhysicalProgress: 60.3, costRevisionCount: 20, scheduleRevisionCount: 29, criticalCount: 11, highCount: 30, watchCount: 59, stableCount: 41, riskSeverity: 'HIGH', riskIndex: 69, topRiskDriver: 'River Interlinking Wildlife Clearance & Resettlement' },
    od: { projectCount: 109, totalOriginalCostCr: 171000, totalRevisedCostCr: 174000, totalExpenditureCr: 101000, averagePhysicalProgress: 80.8, costRevisionCount: 7, scheduleRevisionCount: 11, criticalCount: 3, highCount: 13, watchCount: 43, stableCount: 50, riskSeverity: 'STABLE', riskIndex: 34, topRiskDriver: 'Mining Rail Corridor Forest Clearances' },
    ap: { projectCount: 125, totalOriginalCostCr: 216000, totalRevisedCostCr: 220000, totalExpenditureCr: 122000, averagePhysicalProgress: 68.0, costRevisionCount: 13, scheduleRevisionCount: 19, criticalCount: 5, highCount: 25, watchCount: 57, stableCount: 38, riskSeverity: 'WATCH', riskIndex: 56, topRiskDriver: 'Irrigation Canal Lining & Port Hinterland Roadways' },
    tg: { projectCount: 94, totalOriginalCostCr: 164000, totalRevisedCostCr: 167000, totalExpenditureCr: 100000, averagePhysicalProgress: 79.1, costRevisionCount: 6, scheduleRevisionCount: 10, criticalCount: 2, highCount: 10, watchCount: 42, stableCount: 40, riskSeverity: 'STABLE', riskIndex: 36, topRiskDriver: 'Substation GIS Grid Interconnection Clearance' },
    as: { projectCount: 101, totalOriginalCostCr: 138000, totalRevisedCostCr: 141000, totalExpenditureCr: 75000, averagePhysicalProgress: 54.2, costRevisionCount: 17, scheduleRevisionCount: 25, criticalCount: 11, highCount: 28, watchCount: 38, stableCount: 24, riskSeverity: 'CRITICAL', riskIndex: 82, topRiskDriver: 'Monsoon Landslides & Inaccessible Hilly Terrain' },
    dl: { projectCount: 86, totalOriginalCostCr: 180000, totalRevisedCostCr: 183000, totalExpenditureCr: 105000, averagePhysicalProgress: 73.2, costRevisionCount: 11, scheduleRevisionCount: 15, criticalCount: 3, highCount: 15, watchCount: 41, stableCount: 27, riskSeverity: 'WATCH', riskIndex: 52, topRiskDriver: 'High-Density Traffic Diversions & Inter-State Coordination' },
    jk: { projectCount: 63, totalOriginalCostCr: 114000, totalRevisedCostCr: 117000, totalExpenditureCr: 63000, averagePhysicalProgress: 46.9, costRevisionCount: 14, scheduleRevisionCount: 23, criticalCount: 8, highCount: 21, watchCount: 21, stableCount: 13, riskSeverity: 'CRITICAL', riskIndex: 89, topRiskDriver: 'High Altitude Sub-Zero Avalanche Zones & Geology' },
    kl: { projectCount: 72, totalOriginalCostCr: 109000, totalRevisedCostCr: 111000, totalExpenditureCr: 61000, averagePhysicalProgress: 65.3, costRevisionCount: 9, scheduleRevisionCount: 13, criticalCount: 3, highCount: 16, watchCount: 32, stableCount: 21, riskSeverity: 'WATCH', riskIndex: 57, topRiskDriver: 'High Density Ribbon Settlement Land Acquisition' },
    pb: { projectCount: 49, totalOriginalCostCr: 75000, totalRevisedCostCr: 77000, totalExpenditureCr: 45000, averagePhysicalProgress: 77.6, costRevisionCount: 4, scheduleRevisionCount: 6, criticalCount: 1, highCount: 6, watchCount: 23, stableCount: 19, riskSeverity: 'STABLE', riskIndex: 35, topRiskDriver: 'Canal Crossing Environmental NOCs' },
    hr: { projectCount: 57, totalOriginalCostCr: 89000, totalRevisedCostCr: 92000, totalExpenditureCr: 53000, averagePhysicalProgress: 74.9, costRevisionCount: 6, scheduleRevisionCount: 9, criticalCount: 2, highCount: 9, watchCount: 27, stableCount: 19, riskSeverity: 'WATCH', riskIndex: 49, topRiskDriver: 'NCR Ring Road Land Demarcation' },
    jh: { projectCount: 43, totalOriginalCostCr: 69000, totalRevisedCostCr: 72000, totalExpenditureCr: 39000, averagePhysicalProgress: 61.7, costRevisionCount: 7, scheduleRevisionCount: 11, criticalCount: 4, highCount: 11, watchCount: 18, stableCount: 10, riskSeverity: 'HIGH', riskIndex: 68, topRiskDriver: 'Coal Evacuation Railway Siding Approvals' },
    ct: { projectCount: 40, totalOriginalCostCr: 63000, totalRevisedCostCr: 65000, totalExpenditureCr: 36000, averagePhysicalProgress: 67.2, costRevisionCount: 4, scheduleRevisionCount: 7, criticalCount: 2, highCount: 8, watchCount: 19, stableCount: 11, riskSeverity: 'WATCH', riskIndex: 51, topRiskDriver: 'Dense Forest Tree Felling Clearances' },
    ut: { projectCount: 35, totalOriginalCostCr: 55000, totalRevisedCostCr: 58000, totalExpenditureCr: 32000, averagePhysicalProgress: 52.6, costRevisionCount: 6, scheduleRevisionCount: 10, criticalCount: 4, highCount: 10, watchCount: 14, stableCount: 7, riskSeverity: 'CRITICAL', riskIndex: 80, topRiskDriver: 'Geological Fault Tunnelling & Slope Stabilization' },
    hp: { projectCount: 32, totalOriginalCostCr: 49000, totalRevisedCostCr: 52000, totalExpenditureCr: 29000, averagePhysicalProgress: 55.2, costRevisionCount: 5, scheduleRevisionCount: 8, criticalCount: 3, highCount: 8, watchCount: 13, stableCount: 8, riskSeverity: 'HIGH', riskIndex: 69, topRiskDriver: 'Hydro Tunnel Desilting & Mountain Road Widening' },
    ga: { projectCount: 18, totalOriginalCostCr: 22000, totalRevisedCostCr: 23000, totalExpenditureCr: 14000, averagePhysicalProgress: 75.4, costRevisionCount: 1, scheduleRevisionCount: 2, criticalCount: 0, highCount: 2, watchCount: 8, stableCount: 8, riskSeverity: 'STABLE', riskIndex: 32, topRiskDriver: 'Coastal Highway Bridge Dredging' },
  },
  'June 2026': {
    gj: { projectCount: 166, totalOriginalCostCr: 289000, totalRevisedCostCr: 294000, totalExpenditureCr: 151000, averagePhysicalProgress: 66.8, costRevisionCount: 24, scheduleRevisionCount: 34, criticalCount: 14, highCount: 41, watchCount: 66, stableCount: 45, riskSeverity: 'HIGH', riskIndex: 74, topRiskDriver: 'Expressway Land Consolidation & Pipeline Relocations' },
    mh: { projectCount: 211, totalOriginalCostCr: 378000, totalRevisedCostCr: 383000, totalExpenditureCr: 214000, averagePhysicalProgress: 70.5, costRevisionCount: 30, scheduleRevisionCount: 39, criticalCount: 11, highCount: 37, watchCount: 96, stableCount: 67, riskSeverity: 'WATCH', riskIndex: 60, topRiskDriver: 'Coastal Regulation Clearances & Urban RoW' },
    up: { projectCount: 240, totalOriginalCostCr: 407000, totalRevisedCostCr: 411000, totalExpenditureCr: 231000, averagePhysicalProgress: 63.8, costRevisionCount: 36, scheduleRevisionCount: 48, criticalCount: 18, highCount: 56, watchCount: 102, stableCount: 64, riskSeverity: 'HIGH', riskIndex: 73, topRiskDriver: 'Rail Overbridge Approvals & Highway Utility Shifting' },
    tn: { projectCount: 143, totalOriginalCostCr: 244000, totalRevisedCostCr: 247000, totalExpenditureCr: 135000, averagePhysicalProgress: 58.1, costRevisionCount: 22, scheduleRevisionCount: 33, criticalCount: 16, highCount: 33, watchCount: 55, stableCount: 39, riskSeverity: 'CRITICAL', riskIndex: 84, topRiskDriver: 'Urban Underground TBM Hard-Rock Geology & Drainage' },
    ka: { projectCount: 151, totalOriginalCostCr: 261000, totalRevisedCostCr: 263000, totalExpenditureCr: 147000, averagePhysicalProgress: 72.3, costRevisionCount: 15, scheduleRevisionCount: 23, criticalCount: 7, highCount: 27, watchCount: 69, stableCount: 48, riskSeverity: 'WATCH', riskIndex: 55, topRiskDriver: 'Suburban Rail Land Handover & Forest Buffers' },
    br: { projectCount: 117, totalOriginalCostCr: 179000, totalRevisedCostCr: 181000, totalExpenditureCr: 100000, averagePhysicalProgress: 51.8, costRevisionCount: 20, scheduleRevisionCount: 31, criticalCount: 15, highCount: 38, watchCount: 40, stableCount: 24, riskSeverity: 'CRITICAL', riskIndex: 86, topRiskDriver: 'Contractor Heavy Machinery Mobilization & Flooding' },
    wb: { projectCount: 125, totalOriginalCostCr: 195000, totalRevisedCostCr: 197000, totalExpenditureCr: 115000, averagePhysicalProgress: 55.4, costRevisionCount: 19, scheduleRevisionCount: 29, criticalCount: 13, highCount: 35, watchCount: 47, stableCount: 30, riskSeverity: 'CRITICAL', riskIndex: 81, topRiskDriver: 'Land Acquisition Litigation & Environmental Zones' },
    rj: { projectCount: 137, totalOriginalCostCr: 213000, totalRevisedCostCr: 214000, totalExpenditureCr: 132000, averagePhysicalProgress: 77.5, costRevisionCount: 9, scheduleRevisionCount: 15, criticalCount: 4, highCount: 17, watchCount: 54, stableCount: 62, riskSeverity: 'STABLE', riskIndex: 39, topRiskDriver: 'Solar Park High-Tension Transmission Evacuation' },
    mp: { projectCount: 143, totalOriginalCostCr: 250000, totalRevisedCostCr: 253000, totalExpenditureCr: 143000, averagePhysicalProgress: 60.7, costRevisionCount: 21, scheduleRevisionCount: 30, criticalCount: 12, highCount: 30, watchCount: 60, stableCount: 41, riskSeverity: 'HIGH', riskIndex: 70, topRiskDriver: 'River Interlinking Wildlife Clearance & Resettlement' },
    od: { projectCount: 111, totalOriginalCostCr: 174000, totalRevisedCostCr: 175000, totalExpenditureCr: 105000, averagePhysicalProgress: 81.4, costRevisionCount: 7, scheduleRevisionCount: 12, criticalCount: 3, highCount: 14, watchCount: 44, stableCount: 50, riskSeverity: 'STABLE', riskIndex: 35, topRiskDriver: 'Mining Rail Corridor Forest Clearances' },
    ap: { projectCount: 127, totalOriginalCostCr: 219000, totalRevisedCostCr: 221000, totalExpenditureCr: 126000, averagePhysicalProgress: 68.6, costRevisionCount: 14, scheduleRevisionCount: 20, criticalCount: 6, highCount: 25, watchCount: 58, stableCount: 38, riskSeverity: 'WATCH', riskIndex: 57, topRiskDriver: 'Irrigation Canal Lining & Port Hinterland Roadways' },
    tg: { projectCount: 95, totalOriginalCostCr: 166000, totalRevisedCostCr: 167000, totalExpenditureCr: 103000, averagePhysicalProgress: 79.5, costRevisionCount: 6, scheduleRevisionCount: 11, criticalCount: 2, highCount: 11, watchCount: 42, stableCount: 40, riskSeverity: 'STABLE', riskIndex: 36, topRiskDriver: 'Substation GIS Grid Interconnection Clearance' },
    as: { projectCount: 103, totalOriginalCostCr: 140000, totalRevisedCostCr: 142000, totalExpenditureCr: 78000, averagePhysicalProgress: 54.7, costRevisionCount: 18, scheduleRevisionCount: 27, criticalCount: 12, highCount: 28, watchCount: 39, stableCount: 24, riskSeverity: 'CRITICAL', riskIndex: 83, topRiskDriver: 'Monsoon Landslides & Inaccessible Hilly Terrain' },
    dl: { projectCount: 87, totalOriginalCostCr: 183000, totalRevisedCostCr: 184000, totalExpenditureCr: 109000, averagePhysicalProgress: 73.6, costRevisionCount: 12, scheduleRevisionCount: 16, criticalCount: 4, highCount: 15, watchCount: 41, stableCount: 27, riskSeverity: 'WATCH', riskIndex: 53, topRiskDriver: 'High-Density Traffic Diversions & Inter-State Coordination' },
    jk: { projectCount: 64, totalOriginalCostCr: 116000, totalRevisedCostCr: 118000, totalExpenditureCr: 65000, averagePhysicalProgress: 47.4, costRevisionCount: 15, scheduleRevisionCount: 25, criticalCount: 9, highCount: 21, watchCount: 21, stableCount: 13, riskSeverity: 'CRITICAL', riskIndex: 90, topRiskDriver: 'High Altitude Sub-Zero Avalanche Zones & Geology' },
    kl: { projectCount: 73, totalOriginalCostCr: 110000, totalRevisedCostCr: 112000, totalExpenditureCr: 63000, averagePhysicalProgress: 65.7, costRevisionCount: 10, scheduleRevisionCount: 14, criticalCount: 4, highCount: 16, watchCount: 32, stableCount: 21, riskSeverity: 'WATCH', riskIndex: 58, topRiskDriver: 'High Density Ribbon Settlement Land Acquisition' },
    pb: { projectCount: 50, totalOriginalCostCr: 76000, totalRevisedCostCr: 78000, totalExpenditureCr: 46000, averagePhysicalProgress: 78.0, costRevisionCount: 4, scheduleRevisionCount: 7, criticalCount: 1, highCount: 7, watchCount: 23, stableCount: 19, riskSeverity: 'STABLE', riskIndex: 36, topRiskDriver: 'Canal Crossing Environmental NOCs' },
    hr: { projectCount: 58, totalOriginalCostCr: 91000, totalRevisedCostCr: 93000, totalExpenditureCr: 55000, averagePhysicalProgress: 75.2, costRevisionCount: 7, scheduleRevisionCount: 10, criticalCount: 2, highCount: 10, watchCount: 27, stableCount: 19, riskSeverity: 'WATCH', riskIndex: 50, topRiskDriver: 'NCR Ring Road Land Demarcation' },
    jh: { projectCount: 44, totalOriginalCostCr: 71000, totalRevisedCostCr: 73000, totalExpenditureCr: 41000, averagePhysicalProgress: 62.1, costRevisionCount: 8, scheduleRevisionCount: 12, criticalCount: 4, highCount: 12, watchCount: 18, stableCount: 10, riskSeverity: 'HIGH', riskIndex: 69, topRiskDriver: 'Coal Evacuation Railway Siding Approvals' },
    ct: { projectCount: 41, totalOriginalCostCr: 64000, totalRevisedCostCr: 66000, totalExpenditureCr: 37000, averagePhysicalProgress: 67.5, costRevisionCount: 5, scheduleRevisionCount: 8, criticalCount: 2, highCount: 9, watchCount: 19, stableCount: 11, riskSeverity: 'WATCH', riskIndex: 52, topRiskDriver: 'Dense Forest Tree Felling Clearances' },
    ut: { projectCount: 36, totalOriginalCostCr: 56000, totalRevisedCostCr: 59000, totalExpenditureCr: 33000, averagePhysicalProgress: 53.1, costRevisionCount: 7, scheduleRevisionCount: 11, criticalCount: 5, highCount: 10, watchCount: 14, stableCount: 7, riskSeverity: 'CRITICAL', riskIndex: 81, topRiskDriver: 'Geological Fault Tunnelling & Slope Stabilization' },
    hp: { projectCount: 33, totalOriginalCostCr: 50000, totalRevisedCostCr: 53000, totalExpenditureCr: 30000, averagePhysicalProgress: 55.6, costRevisionCount: 5, scheduleRevisionCount: 9, criticalCount: 3, highCount: 9, watchCount: 13, stableCount: 8, riskSeverity: 'HIGH', riskIndex: 70, topRiskDriver: 'Hydro Tunnel Desilting & Mountain Road Widening' },
    ga: { projectCount: 19, totalOriginalCostCr: 23000, totalRevisedCostCr: 24000, totalExpenditureCr: 15000, averagePhysicalProgress: 75.8, costRevisionCount: 1, scheduleRevisionCount: 2, criticalCount: 0, highCount: 2, watchCount: 9, stableCount: 8, riskSeverity: 'STABLE', riskIndex: 33, topRiskDriver: 'Coastal Highway Bridge Dredging' },
  },
  'July 2026': {
    gj: { projectCount: 168, totalOriginalCostCr: 295000, totalRevisedCostCr: 301000, totalExpenditureCr: 154800, averagePhysicalProgress: 68.4, costRevisionCount: 26, scheduleRevisionCount: 37, criticalCount: 14, highCount: 42, watchCount: 67, stableCount: 45, riskSeverity: 'HIGH', riskIndex: 75, topRiskDriver: 'Expressway Land Consolidation & Pipeline Relocations' },
    mh: { projectCount: 214, totalOriginalCostCr: 384500, totalRevisedCostCr: 389200, totalExpenditureCr: 218500, averagePhysicalProgress: 71.2, costRevisionCount: 31, scheduleRevisionCount: 41, criticalCount: 11, highCount: 38, watchCount: 98, stableCount: 67, riskSeverity: 'WATCH', riskIndex: 61, topRiskDriver: 'Coastal Regulation Clearances & Urban RoW' },
    up: { projectCount: 242, totalOriginalCostCr: 412000, totalRevisedCostCr: 416500, totalExpenditureCr: 236000, averagePhysicalProgress: 64.0, costRevisionCount: 38, scheduleRevisionCount: 51, criticalCount: 19, highCount: 58, watchCount: 101, stableCount: 64, riskSeverity: 'HIGH', riskIndex: 74, topRiskDriver: 'Rail Overbridge Approvals & Highway Utility Shifting' },
    tn: { projectCount: 145, totalOriginalCostCr: 248000, totalRevisedCostCr: 251200, totalExpenditureCr: 139200, averagePhysicalProgress: 59.0, costRevisionCount: 24, scheduleRevisionCount: 35, criticalCount: 16, highCount: 34, watchCount: 56, stableCount: 39, riskSeverity: 'CRITICAL', riskIndex: 85, topRiskDriver: 'Urban Underground TBM Hard-Rock Geology & Drainage' },
    ka: { projectCount: 152, totalOriginalCostCr: 264000, totalRevisedCostCr: 267100, totalExpenditureCr: 151200, averagePhysicalProgress: 73.0, costRevisionCount: 16, scheduleRevisionCount: 24, criticalCount: 7, highCount: 28, watchCount: 69, stableCount: 48, riskSeverity: 'WATCH', riskIndex: 56, topRiskDriver: 'Suburban Rail Land Handover & Forest Buffers' },
    br: { projectCount: 118, totalOriginalCostCr: 182000, totalRevisedCostCr: 185400, totalExpenditureCr: 104500, averagePhysicalProgress: 52.0, costRevisionCount: 21, scheduleRevisionCount: 33, criticalCount: 15, highCount: 39, watchCount: 40, stableCount: 24, riskSeverity: 'CRITICAL', riskIndex: 87, topRiskDriver: 'Contractor Heavy Machinery Mobilization & Flooding' },
    wb: { projectCount: 126, totalOriginalCostCr: 198000, totalRevisedCostCr: 201100, totalExpenditureCr: 119200, averagePhysicalProgress: 56.0, costRevisionCount: 20, scheduleRevisionCount: 31, criticalCount: 13, highCount: 36, watchCount: 47, stableCount: 30, riskSeverity: 'CRITICAL', riskIndex: 82, topRiskDriver: 'Land Acquisition Litigation & Environmental Zones' },
    rj: { projectCount: 138, totalOriginalCostCr: 215000, totalRevisedCostCr: 216800, totalExpenditureCr: 136400, averagePhysicalProgress: 78.0, costRevisionCount: 10, scheduleRevisionCount: 16, criticalCount: 4, highCount: 18, watchCount: 54, stableCount: 62, riskSeverity: 'STABLE', riskIndex: 40, topRiskDriver: 'Solar Park High-Tension Transmission Evacuation' },
    mp: { projectCount: 144, totalOriginalCostCr: 254000, totalRevisedCostCr: 257500, totalExpenditureCr: 147800, averagePhysicalProgress: 61.0, costRevisionCount: 22, scheduleRevisionCount: 32, criticalCount: 12, highCount: 31, watchCount: 60, stableCount: 41, riskSeverity: 'HIGH', riskIndex: 71, topRiskDriver: 'River Interlinking Wildlife Clearance & Resettlement' },
    od: { projectCount: 112, totalOriginalCostCr: 176000, totalRevisedCostCr: 178200, totalExpenditureCr: 109400, averagePhysicalProgress: 82.0, costRevisionCount: 8, scheduleRevisionCount: 13, criticalCount: 3, highCount: 14, watchCount: 45, stableCount: 50, riskSeverity: 'STABLE', riskIndex: 36, topRiskDriver: 'Mining Rail Corridor Forest Clearances' },
    ap: { projectCount: 128, totalOriginalCostCr: 221000, totalRevisedCostCr: 224000, totalExpenditureCr: 129800, averagePhysicalProgress: 69.0, costRevisionCount: 15, scheduleRevisionCount: 22, criticalCount: 6, highCount: 26, watchCount: 58, stableCount: 38, riskSeverity: 'WATCH', riskIndex: 58, topRiskDriver: 'Irrigation Canal Lining & Port Hinterland Roadways' },
    tg: { projectCount: 96, totalOriginalCostCr: 168000, totalRevisedCostCr: 170100, totalExpenditureCr: 106200, averagePhysicalProgress: 80.0, costRevisionCount: 7, scheduleRevisionCount: 12, criticalCount: 2, highCount: 11, watchCount: 43, stableCount: 40, riskSeverity: 'STABLE', riskIndex: 37, topRiskDriver: 'Substation GIS Grid Interconnection Clearance' },
    as: { projectCount: 104, totalOriginalCostCr: 142000, totalRevisedCostCr: 144500, totalExpenditureCr: 81200, averagePhysicalProgress: 55.0, costRevisionCount: 19, scheduleRevisionCount: 29, criticalCount: 12, highCount: 29, watchCount: 39, stableCount: 24, riskSeverity: 'CRITICAL', riskIndex: 84, topRiskDriver: 'Monsoon Landslides & Inaccessible Hilly Terrain' },
    dl: { projectCount: 88, totalOriginalCostCr: 185000, totalRevisedCostCr: 187200, totalExpenditureCr: 112500, averagePhysicalProgress: 74.0, costRevisionCount: 13, scheduleRevisionCount: 17, criticalCount: 4, highCount: 16, watchCount: 41, stableCount: 27, riskSeverity: 'WATCH', riskIndex: 54, topRiskDriver: 'High-Density Traffic Diversions & Inter-State Coordination' },
    jk: { projectCount: 65, totalOriginalCostCr: 118000, totalRevisedCostCr: 120500, totalExpenditureCr: 68100, averagePhysicalProgress: 48.0, costRevisionCount: 16, scheduleRevisionCount: 27, criticalCount: 9, highCount: 22, watchCount: 21, stableCount: 13, riskSeverity: 'CRITICAL', riskIndex: 91, topRiskDriver: 'High Altitude Sub-Zero Avalanche Zones & Geology' },
    kl: { projectCount: 74, totalOriginalCostCr: 112000, totalRevisedCostCr: 113900, totalExpenditureCr: 65400, averagePhysicalProgress: 66.0, costRevisionCount: 11, scheduleRevisionCount: 15, criticalCount: 4, highCount: 17, watchCount: 32, stableCount: 21, riskSeverity: 'WATCH', riskIndex: 59, topRiskDriver: 'High Density Ribbon Settlement Land Acquisition' },
    pb: { projectCount: 51, totalOriginalCostCr: 77000, totalRevisedCostCr: 79000, totalExpenditureCr: 48000, averagePhysicalProgress: 78.4, costRevisionCount: 5, scheduleRevisionCount: 8, criticalCount: 1, highCount: 7, watchCount: 24, stableCount: 19, riskSeverity: 'STABLE', riskIndex: 37, topRiskDriver: 'Canal Crossing Environmental NOCs' },
    hr: { projectCount: 59, totalOriginalCostCr: 92000, totalRevisedCostCr: 94000, totalExpenditureCr: 57000, averagePhysicalProgress: 75.5, costRevisionCount: 8, scheduleRevisionCount: 11, criticalCount: 2, highCount: 10, watchCount: 28, stableCount: 19, riskSeverity: 'WATCH', riskIndex: 51, topRiskDriver: 'NCR Ring Road Land Demarcation' },
    jh: { projectCount: 45, totalOriginalCostCr: 72000, totalRevisedCostCr: 74000, totalExpenditureCr: 43000, averagePhysicalProgress: 62.5, costRevisionCount: 9, scheduleRevisionCount: 13, criticalCount: 4, highCount: 12, watchCount: 19, stableCount: 10, riskSeverity: 'HIGH', riskIndex: 70, topRiskDriver: 'Coal Evacuation Railway Siding Approvals' },
    ct: { projectCount: 42, totalOriginalCostCr: 65000, totalRevisedCostCr: 67000, totalExpenditureCr: 39000, averagePhysicalProgress: 67.8, costRevisionCount: 6, scheduleRevisionCount: 9, criticalCount: 2, highCount: 9, watchCount: 20, stableCount: 11, riskSeverity: 'WATCH', riskIndex: 53, topRiskDriver: 'Dense Forest Tree Felling Clearances' },
    ut: { projectCount: 37, totalOriginalCostCr: 57000, totalRevisedCostCr: 60000, totalExpenditureCr: 35000, averagePhysicalProgress: 53.5, costRevisionCount: 8, scheduleRevisionCount: 12, criticalCount: 5, highCount: 10, watchCount: 15, stableCount: 7, riskSeverity: 'CRITICAL', riskIndex: 82, topRiskDriver: 'Geological Fault Tunnelling & Slope Stabilization' },
    hp: { projectCount: 34, totalOriginalCostCr: 51000, totalRevisedCostCr: 54000, totalExpenditureCr: 32000, averagePhysicalProgress: 56.0, costRevisionCount: 6, scheduleRevisionCount: 10, criticalCount: 3, highCount: 9, watchCount: 14, stableCount: 8, riskSeverity: 'HIGH', riskIndex: 71, topRiskDriver: 'Hydro Tunnel Desilting & Mountain Road Widening' },
    ga: { projectCount: 20, totalOriginalCostCr: 24000, totalRevisedCostCr: 25000, totalExpenditureCr: 16000, averagePhysicalProgress: 76.0, costRevisionCount: 1, scheduleRevisionCount: 3, criticalCount: 0, highCount: 2, watchCount: 10, stableCount: 8, riskSeverity: 'STABLE', riskIndex: 34, topRiskDriver: 'Coastal Highway Bridge Dredging' },
  },
};

// Priority Projects for National Risk Decision Support
export interface PaimanaPriorityProject {
  id: string;
  name: string;
  code: string;
  state: string;
  sector: string;
  ministry: string;
  sanctionedCostCr: number;
  revisedCostCr: number;
  expenditureCr: number;
  costOverrunCr: number;
  delayMonths: number;
  currentProgress: number;
  riskLevel: 'CRITICAL' | 'HIGH' | 'WATCH' | 'STABLE';
  keySignal: string;
  suggestedAction: string;
}

export const PAIMANA_PRIORITY_PROJECTS: PaimanaPriorityProject[] = [
  {
    id: 'PRJ-MORT-891',
    name: 'Delhi-Mumbai Expressway Pkg 14B (Vadodara-Kim)',
    code: 'DME-PKG-14B',
    state: 'Gujarat',
    sector: 'Roads & Highways',
    ministry: 'MoRTH',
    sanctionedCostCr: 4120,
    revisedCostCr: 4460,
    expenditureCr: 3120,
    costOverrunCr: 340,
    delayMonths: 7.5,
    currentProgress: 68.4,
    riskLevel: 'CRITICAL',
    keySignal: 'High-pressure GAIL gas pipeline relocation stalled at Ch 312+400',
    suggestedAction: 'Convene joint MoRTH-MoPNG arbitration panel for pipeline relocation window',
  },
  {
    id: 'PRJ-METRO-552',
    name: 'Chennai Metro Rail Phase II - Corridor 4',
    code: 'CMRL-PH2-C4',
    state: 'Tamil Nadu',
    sector: 'Urban Mass Transit',
    ministry: 'MoHUA',
    sanctionedCostCr: 13240,
    revisedCostCr: 14080,
    expenditureCr: 6554,
    costOverrunCr: 840,
    delayMonths: 8.0,
    currentProgress: 46.1,
    riskLevel: 'CRITICAL',
    keySignal: 'TBM cutter-head refusal in unpredicted charnockite hard rock intrusion',
    suggestedAction: 'Deploy high-torque mixed-face cutter-heads and grant night work traffic NOC',
  },
  {
    id: 'PRJ-RLY-204',
    name: 'Eastern Dedicated Freight Corridor (Sonnagar-Andal)',
    code: 'EDFC-SON-AND',
    state: 'Bihar',
    sector: 'Railways',
    ministry: 'MoR',
    sanctionedCostCr: 8750,
    revisedCostCr: 8935,
    expenditureCr: 5075,
    costOverrunCr: 185,
    delayMonths: 4.5,
    currentProgress: 54.2,
    riskLevel: 'HIGH',
    keySignal: 'Track Paving Train breakdown and specialized Austrian flash-butt welder delay',
    suggestedAction: 'Expedite backup Track Laying Train (TLT) transfer from Sonnagar staging depot',
  },
  {
    id: 'PRJ-ROADS-771',
    name: 'Zojila Tunnel Bypass Corridor (NH-1)',
    code: 'ZOJILA-CORR-01',
    state: 'Jammu & Kashmir / Ladakh',
    sector: 'Roads & Highways',
    ministry: 'MoRTH',
    sanctionedCostCr: 6800,
    revisedCostCr: 7240,
    expenditureCr: 4120,
    costOverrunCr: 440,
    delayMonths: 9.0,
    currentProgress: 42.6,
    riskLevel: 'CRITICAL',
    keySignal: 'Sub-zero ingress with heavy thrust zone squeezing geology at Portal 2',
    suggestedAction: 'Authorize heading & benching geological re-profiling with steel ribs consolidation',
  },
  {
    id: 'PRJ-PWR-419',
    name: 'Ken-Betwa River Linkage Canal & Hydro Works',
    code: 'KBLP-CW-01',
    state: 'Madhya Pradesh',
    sector: 'Water Resources',
    ministry: 'MoJS',
    sanctionedCostCr: 9400,
    revisedCostCr: 9850,
    expenditureCr: 3890,
    costOverrunCr: 450,
    delayMonths: 6.0,
    currentProgress: 51.5,
    riskLevel: 'HIGH',
    keySignal: 'Panna Tiger Reserve buffer compensatory afforestation dispute at Stage II',
    suggestedAction: 'Submit updated GIS catchment boundary mitigation proposal to Supreme Court CEC',
  },
  {
    id: 'PRJ-RAIL-312',
    name: 'Sivok-Rangpo Railway Link (New BG Line)',
    code: 'NFR-SVK-RNG',
    state: 'West Bengal',
    sector: 'Railways',
    ministry: 'MoR',
    sanctionedCostCr: 5600,
    revisedCostCr: 6100,
    expenditureCr: 3400,
    costOverrunCr: 500,
    delayMonths: 7.0,
    currentProgress: 48.0,
    riskLevel: 'CRITICAL',
    keySignal: 'Teesta basin flash flood damage on bridge pier abutments 4 & 5',
    suggestedAction: 'Mobilize heavy deep-pile caisson foundation crews before onset of peak rains',
  },
  {
    id: 'PRJ-TRANS-601',
    name: 'Mumbai Suburban Rail MUTP Phase 3A (Panvel-Karjat)',
    code: 'MRVC-MUTP-3A',
    state: 'Maharashtra',
    sector: 'Railways',
    ministry: 'MoR',
    sanctionedCostCr: 10940,
    revisedCostCr: 11420,
    expenditureCr: 6200,
    costOverrunCr: 480,
    delayMonths: 5.5,
    currentProgress: 63.8,
    riskLevel: 'WATCH',
    keySignal: 'Forest land diversion compensation payment awaiting state cabinet signoff',
    suggestedAction: 'Release CAMPA compensatory afforestation escrow tranche via CIDCO',
  },
  {
    id: 'PRJ-PORT-902',
    name: 'Paradip Port Western Dock Multi-Cargo Berth',
    code: 'PPT-WDC-02',
    state: 'Odisha',
    sector: 'Ports & Shipping',
    ministry: 'MoPSW',
    sanctionedCostCr: 3200,
    revisedCostCr: 3240,
    expenditureCr: 2150,
    costOverrunCr: 40,
    delayMonths: 1.0,
    currentProgress: 84.0,
    riskLevel: 'STABLE',
    keySignal: 'Dredging throughput on track; breakwater protection armor rocks 92% complete',
    suggestedAction: 'Commence navigational simulation test runs with Paradip marine pilot team',
  },
];

// Real Sector Metrics for Lower Analytics
export const PAIMANA_SECTOR_RISK_METRICS = [
  { sector: 'Roads & Highways', totalProjects: 684, criticalCount: 48, highCount: 142, watchCount: 310, stableCount: 184 },
  { sector: 'Railways', totalProjects: 492, criticalCount: 34, highCount: 110, watchCount: 218, stableCount: 130 },
  { sector: 'Urban Mass Transit', totalProjects: 186, criticalCount: 18, highCount: 46, watchCount: 78, stableCount: 44 },
  { sector: 'Power & RE', totalProjects: 198, criticalCount: 8, highCount: 32, watchCount: 88, stableCount: 70 },
  { sector: 'Petroleum & Gas', totalProjects: 96, criticalCount: 4, highCount: 18, watchCount: 46, stableCount: 28 },
  { sector: 'Ports & Shipping', totalProjects: 65, criticalCount: 2, highCount: 8, watchCount: 31, stableCount: 24 },
  { sector: 'Water Resources', totalProjects: 54, criticalCount: 6, highCount: 14, watchCount: 22, stableCount: 12 },
];

// Historical & Forecast Risk Trajectory (April 2026 to Sept 2026)
export interface PaimanaTrajectoryPoint {
  month: string;
  riskScore: number;
  isObserved: boolean;
  notes: string;
}

export const PAIMANA_RISK_TRAJECTORY: PaimanaTrajectoryPoint[] = [
  { month: 'April 2026', riskScore: 34.2, isObserved: true, notes: 'Q1 Opening reporting cycle' },
  { month: 'May 2026', riskScore: 36.5, isObserved: true, notes: 'Early pre-monsoon mobilization check' },
  { month: 'June 2026', riskScore: 37.8, isObserved: true, notes: 'Mid-quarter state nodal submission' },
  { month: 'July 2026', riskScore: 39.4, isObserved: true, notes: 'Current Live MoSPI PAIMANA report' },
  { month: 'August 2026', riskScore: 41.2, isObserved: false, notes: 'AI projected risk escalation' },
  { month: 'September 2026', riskScore: 43.8, isObserved: false, notes: 'AI projected Q2 closure risk' },
];
