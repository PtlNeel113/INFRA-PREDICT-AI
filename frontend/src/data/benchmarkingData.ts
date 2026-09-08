import { PeerBenchmark } from '../types/projects';

export const MOCK_BENCHMARKS: Record<string, PeerBenchmark> = {
  'PRJ-MORT-891': {
    projectId: 'PRJ-MORT-891',
    projectCode: 'DME-PKG-14B',
    projectName: 'Delhi-Mumbai Expressway Package 14B (Vadodara-Kim)',
    sector: 'Roads & Highways',
    metrics: {
      costRisk: { project: 82, peerMedian: 48, sectorAverage: 52, unit: '/100' },
      timeRisk: { project: 76, peerMedian: 44, sectorAverage: 49, unit: '/100' },
      progress: { project: 68.4, peerMedian: 78.0, sectorAverage: 74.2, unit: '%' },
      healthScore: { project: 42, peerMedian: 68, sectorAverage: 65, unit: '/100' },
      durationMonths: { project: 44, peerMedian: 36, sectorAverage: 38, unit: 'mo' },
      expenditureVelocityCrPerMonth: { project: 92.4, peerMedian: 114.5, sectorAverage: 108.0, unit: '₹Cr/mo' },
    },
    keyDifferences: [
      {
        metric: 'Cost Risk Exposure',
        difference: '+34 pts higher than peer median',
        explanation: 'Package 14B has accumulated unhedged utility diversion claims (GAIL gas line + High Tension cables) totaling ₹340 Cr, whereas peer packages closed utility shifting in pre-construction.',
        impact: 'UNFAVORABLE',
      },
      {
        metric: 'Physical Progress Velocity',
        difference: '9.6% below median peer progress',
        explanation: 'Peer expressway packages in Gujarat (Packages 12 & 13) completed ROB steel girder launches in dry season Q3 FY25; Package 14B was delayed into monsoon.',
        impact: 'UNFAVORABLE',
      },
      {
        metric: 'Contractor Solvency & Machinery Count',
        difference: '+18% higher equipment density than sector avg',
        explanation: 'Despite local delays, the contractor maintains heavy paver fleets and continuous batching plants on site, enabling rapid recovery once ROB is cleared.',
        impact: 'FAVORABLE',
      },
      {
        metric: 'Land Acquisition Rate',
        difference: '94% handover vs 89% sector average',
        explanation: 'Corridor land acquisition was expedited early, avoiding linear parcel fragmentation.',
        impact: 'FAVORABLE',
      },
    ],
    aiComparisonSummary:
      'Package 14B underperforms peer expressway packages primarily due to complex utility intersections (ROB + GAIL pipeline) that were not unbundled prior to civil contract award. However, high contractor capitalization and strong right-of-way handover (+5% above sector average) indicate high rebound capacity if Railway block permissions are secured within 30 days.',
  },
  'PRJ-METRO-552': {
    projectId: 'PRJ-METRO-552',
    projectCode: 'CMRL-PH2-C4',
    projectName: 'Chennai Metro Rail Phase II - Corridor 4',
    sector: 'Urban Mass Transit',
    metrics: {
      costRisk: { project: 89, peerMedian: 54, sectorAverage: 58, unit: '/100' },
      timeRisk: { project: 84, peerMedian: 52, sectorAverage: 56, unit: '/100' },
      progress: { project: 46.1, peerMedian: 58.5, sectorAverage: 54.0, unit: '%' },
      healthScore: { project: 49, peerMedian: 64, sectorAverage: 62, unit: '/100' },
      durationMonths: { project: 56, peerMedian: 48, sectorAverage: 50, unit: 'mo' },
      expenditureVelocityCrPerMonth: { project: 142.0, peerMedian: 168.0, sectorAverage: 155.0, unit: '₹Cr/mo' },
    },
    keyDifferences: [
      {
        metric: 'Tunnel Advance Velocity',
        difference: '2.8m/day vs 8.4m/day peer median',
        explanation: 'Unmapped charnockite hard rock strata slowed TBM mining significantly compared to Bangalore Metro Phase 2 or Delhi Metro Phase 4 soft clay sectors.',
        impact: 'UNFAVORABLE',
      },
      {
        metric: 'Traffic Diversion Approval Lag',
        difference: '+45 days longer than sector average',
        explanation: 'High traffic density on Arcot Road restricted station box excavation to strict night shifts.',
        impact: 'UNFAVORABLE',
      },
      {
        metric: 'Viaduct Precast Pier Completion',
        difference: '2 weeks ahead of peer median',
        explanation: 'Poonamallee elevated segment precast yard operations achieved 100% automated formwork cycling.',
        impact: 'FAVORABLE',
      },
    ],
    aiComparisonSummary:
      'Corridor 4 exhibits high structural divergence from urban metro peers due to unforgiving underground geology. While elevated packages outperform peers by 2 weeks, underground civil progress lags peer metro benchmarks by 12.4%. Dual-shield heavy tooling is recommended to restore parity.',
  },
  'PRJ-RLY-204': {
    projectId: 'PRJ-RLY-204',
    projectCode: 'EDFC-SON-AND',
    projectName: 'Eastern Dedicated Freight Corridor (Sonnagar - Andal Section)',
    sector: 'Railways',
    metrics: {
      costRisk: { project: 71, peerMedian: 46, sectorAverage: 50, unit: '/100' },
      timeRisk: { project: 68, peerMedian: 42, sectorAverage: 48, unit: '/100' },
      progress: { project: 54.2, peerMedian: 65.0, sectorAverage: 61.5, unit: '%' },
      healthScore: { project: 58, peerMedian: 72, sectorAverage: 69, unit: '/100' },
      durationMonths: { project: 42, peerMedian: 38, sectorAverage: 40, unit: 'mo' },
      expenditureVelocityCrPerMonth: { project: 135.0, peerMedian: 152.0, sectorAverage: 144.0, unit: '₹Cr/mo' },
    },
    keyDifferences: [
      {
        metric: 'Track Laying Machinery Downtime',
        difference: '28% higher downtime than Western DFC peers',
        explanation: 'Western DFC utilized 4 redundant Track Laying Trains; Sonnagar package relies on a single high-output TLT without local maintenance depot.',
        impact: 'UNFAVORABLE',
      },
      {
        metric: 'Major River Bridges Construction',
        difference: '100% completed on time vs 88% peer average',
        explanation: 'Subgrade and deep caisson foundations across Son river were executed ahead of monsoon.',
        impact: 'FAVORABLE',
      },
    ],
    aiComparisonSummary:
      'Sonnagar-Andal civil works are on par with peer benchmarks, but track laying mechanized logistics lag Western DFC benchmarks by 10.8 percentage points due to machinery redundancy shortages.',
  },
};
