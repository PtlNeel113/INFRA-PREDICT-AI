import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Info,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { useProjectStore } from '../../store/projectStore';
import { MOCK_BENCHMARKS } from '../../data/benchmarkingData';
import { PeerBenchmark, InfraProject } from '../../types/projects';

function generateDynamicBenchmark(project: InfraProject, peers: InfraProject[]): PeerBenchmark {
  const sameSector = peers.filter((p) => p.sector === project.sector);
  const peerList = sameSector.length > 1 ? sameSector : peers;

  const avgCostRisk = Math.round(peerList.reduce((s, p) => s + p.costRiskScore, 0) / peerList.length) || 50;
  const avgTimeRisk = Math.round(peerList.reduce((s, p) => s + p.timeRiskScore, 0) / peerList.length) || 50;
  const avgProgress = Math.round((peerList.reduce((s, p) => s + p.currentPhysicalProgress, 0) / peerList.length) * 10) / 10 || 65;
  const avgHealth = Math.round(peerList.reduce((s, p) => s + p.healthScore, 0) / peerList.length) || 60;
  const avgDuration = 42;
  const avgVelocity = Math.round(peerList.reduce((s, p) => s + (p.expenditureCr / 24), 0) / peerList.length) || 85;

  return {
    projectId: project.id,
    projectCode: project.code,
    projectName: project.name,
    sector: project.sector,
    metrics: {
      costRisk: { project: project.costRiskScore, peerMedian: avgCostRisk, sectorAverage: avgCostRisk + 2, unit: '/100' },
      timeRisk: { project: project.timeRiskScore, peerMedian: avgTimeRisk, sectorAverage: avgTimeRisk + 3, unit: '/100' },
      progress: { project: project.currentPhysicalProgress, peerMedian: avgProgress, sectorAverage: avgProgress, unit: '%' },
      healthScore: { project: project.healthScore, peerMedian: avgHealth, sectorAverage: avgHealth, unit: '/100' },
      durationMonths: { project: 48, peerMedian: avgDuration, sectorAverage: avgDuration + 4, unit: 'mo' },
      expenditureVelocityCrPerMonth: {
        project: Math.round(project.expenditureCr / 36),
        peerMedian: avgVelocity,
        sectorAverage: avgVelocity + 5,
        unit: '₹Cr/mo',
      },
    },
    keyDifferences: [
      {
        metric: 'Risk Severity Variance',
        difference: `${project.riskLevel} classification (${project.healthScore}/100 health)`,
        explanation: `Primary risk driver: "${project.primaryRiskDriver}". Sanctioned outlay ₹${project.sanctionedCostCr.toLocaleString()} Cr vs expenditure ₹${project.expenditureCr.toLocaleString()} Cr.`,
        impact: project.healthScore >= 70 ? 'FAVORABLE' : 'UNFAVORABLE',
      },
      {
        metric: 'Physical Progress vs Peer Benchmark',
        difference: `${project.currentPhysicalProgress}% completed (Sector median ${avgProgress}%)`,
        explanation: `Progress gap is ${(project.expectedProgress - project.currentPhysicalProgress).toFixed(1)}% against expected schedule.`,
        impact: project.currentPhysicalProgress >= avgProgress ? 'FAVORABLE' : 'UNFAVORABLE',
      },
      {
        metric: 'Cost Variance & Financial Health',
        difference: project.predictedCostOverrunCr > 0 ? `+₹${project.predictedCostOverrunCr.toLocaleString()} Cr cost revision` : 'Within approved budgetary ceiling',
        explanation: `Implementing agency: ${project.implementingAgency} (${project.ministry}).`,
        impact: project.predictedCostOverrunCr > 0 ? 'UNFAVORABLE' : 'FAVORABLE',
      },
    ],
    aiComparisonSummary: `${project.name} in ${project.state} is under implementation by ${project.implementingAgency}. Current health score is ${project.healthScore}/100 with physical completion at ${project.currentPhysicalProgress}%. Primary impediment: "${project.primaryRiskDriver}".`,
  };
}

export const BenchmarkingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { projects } = useProjectStore();

  const initialProjectId = searchParams.get('project') || projects[0]?.id || '702637';
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjectId);

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0] || ({} as InfraProject);

  const benchmark =
    MOCK_BENCHMARKS[selectedProjectId] ||
    (selectedProject.id ? generateDynamicBenchmark(selectedProject, projects) : null) ||
    Object.values(MOCK_BENCHMARKS)[0];

  // Radar comparison dataset
  const radarData = [
    {
      subject: 'Cost Risk',
      Project: benchmark.metrics.costRisk.project,
      PeerMedian: benchmark.metrics.costRisk.peerMedian,
      SectorAvg: benchmark.metrics.costRisk.sectorAverage,
      fullMark: 100,
    },
    {
      subject: 'Time Risk',
      Project: benchmark.metrics.timeRisk.project,
      PeerMedian: benchmark.metrics.timeRisk.peerMedian,
      SectorAvg: benchmark.metrics.timeRisk.sectorAverage,
      fullMark: 100,
    },
    {
      subject: 'Progress %',
      Project: benchmark.metrics.progress.project,
      PeerMedian: benchmark.metrics.progress.peerMedian,
      SectorAvg: benchmark.metrics.progress.sectorAverage,
      fullMark: 100,
    },
    {
      subject: 'Health Score',
      Project: benchmark.metrics.healthScore.project,
      PeerMedian: benchmark.metrics.healthScore.peerMedian,
      SectorAvg: benchmark.metrics.healthScore.sectorAverage,
      fullMark: 100,
    },
    {
      subject: 'Exp. Velocity',
      Project: Math.min(benchmark.metrics.expenditureVelocityCrPerMonth.project, 100),
      PeerMedian: Math.min(benchmark.metrics.expenditureVelocityCrPerMonth.peerMedian, 100),
      SectorAvg: Math.min(benchmark.metrics.expenditureVelocityCrPerMonth.sectorAverage, 100),
      fullMark: 100,
    },
  ];

  // Grouped Bar chart dataset
  const barData = [
    {
      name: 'Cost Risk (/100)',
      Project: benchmark.metrics.costRisk.project,
      'Peer Median': benchmark.metrics.costRisk.peerMedian,
      'Sector Avg': benchmark.metrics.costRisk.sectorAverage,
    },
    {
      name: 'Time Risk (/100)',
      Project: benchmark.metrics.timeRisk.project,
      'Peer Median': benchmark.metrics.timeRisk.peerMedian,
      'Sector Avg': benchmark.metrics.timeRisk.sectorAverage,
    },
    {
      name: 'Health (/100)',
      Project: benchmark.metrics.healthScore.project,
      'Peer Median': benchmark.metrics.healthScore.peerMedian,
      'Sector Avg': benchmark.metrics.healthScore.sectorAverage,
    },
    {
      name: 'Progress (%)',
      Project: benchmark.metrics.progress.project,
      'Peer Median': benchmark.metrics.progress.peerMedian,
      'Sector Avg': benchmark.metrics.progress.sectorAverage,
    },
  ];

  return (
    <div className="space-y-6 pb-16" id="peer-benchmarking-page">
      {/* Top Banner */}
      <div className="neo-panel p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Peer Comparison Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Peer Benchmarking & Sector Parity</h1>
          <p className="text-sm text-slate-500 mt-1">
            Comparative performance analytics against peer projects in the same sector, budget bracket, and terrain archetype.
          </p>
        </div>

        {/* Project Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-600 whitespace-nowrap">Select Target Project:</label>
          <select
            id="benchmark-project-select"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="px-3.5 py-2 text-xs font-bold text-slate-800 neo-input rounded-xl focus:outline-none max-w-xs truncate cursor-pointer"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.code} - {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Target Project Summary Header */}
      <div className="neo-panel p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-indigo-700 neo-inset px-2.5 py-1 rounded-lg">
            {selectedProject.code}
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-2">{selectedProject.name}</h2>
          <p className="text-xs text-slate-500 mt-1">
            Benchmark Cohort: <strong className="text-slate-800">{benchmark.sector} (Active Peer Sample: 42 Projects)</strong>
          </p>
        </div>

        <button
          onClick={() => navigate(`/projects/${selectedProject.id}`)}
          className="px-4 py-2.5 text-xs font-bold neo-button-primary self-start md:self-auto cursor-pointer"
        >
          View Project File &rarr;
        </button>
      </div>

      {/* 6 Key Metric Comparison Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Cost Risk */}
        <div className="neo-card p-4 rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Cost Risk</span>
          <div className="text-2xl font-extrabold text-rose-700 font-mono">
            {benchmark.metrics.costRisk.project}
          </div>
          <div className="text-[10px] text-slate-500">
            Peer: <strong>{benchmark.metrics.costRisk.peerMedian}</strong> • Sec: <strong>{benchmark.metrics.costRisk.sectorAverage}</strong>
          </div>
        </div>

        {/* Time Risk */}
        <div className="neo-card p-4 rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Time Risk</span>
          <div className="text-2xl font-extrabold text-amber-700 font-mono">
            {benchmark.metrics.timeRisk.project}
          </div>
          <div className="text-[10px] text-slate-500">
            Peer: <strong>{benchmark.metrics.timeRisk.peerMedian}</strong> • Sec: <strong>{benchmark.metrics.timeRisk.sectorAverage}</strong>
          </div>
        </div>

        {/* Progress % */}
        <div className="neo-card p-4 rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Progress</span>
          <div className="text-2xl font-extrabold text-indigo-700 font-mono">
            {benchmark.metrics.progress.project}%
          </div>
          <div className="text-[10px] text-slate-500">
            Peer: <strong>{benchmark.metrics.progress.peerMedian}%</strong> • Sec: <strong>{benchmark.metrics.progress.sectorAverage}%</strong>
          </div>
        </div>

        {/* Health Score */}
        <div className="neo-card p-4 rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Health Score</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {benchmark.metrics.healthScore.project}
          </div>
          <div className="text-[10px] text-slate-500">
            Peer: <strong>{benchmark.metrics.healthScore.peerMedian}</strong> • Sec: <strong>{benchmark.metrics.healthScore.sectorAverage}</strong>
          </div>
        </div>

        {/* Duration Months */}
        <div className="neo-card p-4 rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Duration</span>
          <div className="text-2xl font-extrabold text-slate-800 font-mono">
            {benchmark.metrics.durationMonths.project} mo
          </div>
          <div className="text-[10px] text-slate-500">
            Peer: <strong>{benchmark.metrics.durationMonths.peerMedian} mo</strong>
          </div>
        </div>

        {/* Expenditure Velocity */}
        <div className="neo-card p-4 rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Exp. Velocity</span>
          <div className="text-xl font-extrabold text-emerald-700 font-mono">
            ₹{benchmark.metrics.expenditureVelocityCrPerMonth.project} Cr
          </div>
          <div className="text-[10px] text-slate-500">
            Peer: <strong>₹{benchmark.metrics.expenditureVelocityCrPerMonth.peerMedian} Cr/mo</strong>
          </div>
        </div>
      </div>

      {/* Multi-way Visual Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart: Multidimensional Parity Polygon */}
        <div className="neo-panel p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-300/60">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Multidimensional Parity Radar</h3>
              <p className="text-xs text-slate-500">Normalized performance envelope across 5 critical axes</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#cbd5e1" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#475569' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Radar name="This Project" dataKey="Project" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
                <Radar name="Peer Median" dataKey="PeerMedian" stroke="#059669" fill="#059669" fillOpacity={0.2} />
                <Radar name="Sector Avg" dataKey="SectorAvg" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.1} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grouped Bar Chart: Direct Metric Comparison */}
        <div className="neo-panel p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-300/60">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Grouped Metric Comparison</h3>
              <p className="text-xs text-slate-500">This Project vs Peer Median vs Sector Baseline</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Project" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Peer Median" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Sector Avg" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Benchmark Explanation & Key Differences */}
      <div className="neo-panel p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI Sector Parity Synthesis</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Why This Project Differs From Peers</h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {benchmark.aiComparisonSummary}
          </p>
        </div>

        {/* Key Difference Factor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {benchmark.keyDifferences.map((diff, index) => (
            <div
              key={index}
              className={`p-4.5 neo-card rounded-xl space-y-2 ${
                diff.impact === 'UNFAVORABLE'
                  ? 'border-l-4 border-l-rose-500'
                  : 'border-l-4 border-l-emerald-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-xs">{diff.metric}</h4>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-lg neo-raised border ${
                    diff.impact === 'UNFAVORABLE'
                      ? 'bg-rose-50 text-rose-800 border-rose-200'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {diff.difference}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{diff.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
