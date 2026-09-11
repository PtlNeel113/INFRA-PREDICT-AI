import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Search,
  Download,
  Building2,
  PieChart,
} from 'lucide-react';
import { PAIMANA_OFFICIAL_PROJECTS } from '../../data/paimanaOfficialRecords';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Button } from '../../components/ui/Button';
import { INFRA_SECTORS } from '../../data/constants';

export const CostExpenditurePage: React.FC = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [filterOverrun, setFilterOverrun] = useState<'ALL' | 'OVERRUN' | 'ON_BUDGET'>('ALL');

  const projects = PAIMANA_OFFICIAL_PROJECTS;

  // Portfolio Totals derived from real PAIMANA records
  const totals = useMemo(() => {
    let sanctioned = 0;
    let revised = 0;
    let expenditure = 0;
    let overrunCount = 0;

    projects.forEach((p) => {
      sanctioned += p.sanctionedCostCr || 0;
      revised += p.revisedCostCr || 0;
      expenditure += p.expenditureCr || 0;
      if ((p.predictedCostOverrunCr || 0) > 0 || (p.costOverrunCr || 0) > 0) {
        overrunCount++;
      }
    });

    const variance = Math.max(0, revised - sanctioned);
    const absorptionRate = sanctioned > 0 ? (expenditure / sanctioned) * 100 : 0;

    return {
      sanctionedCr: Math.round(sanctioned),
      revisedCr: Math.round(revised),
      expenditureCr: Math.round(expenditure),
      varianceCr: Math.round(variance),
      overrunCount,
      absorptionRate: absorptionRate.toFixed(1),
    };
  }, [projects]);

  // Filtered project list
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        searchTerm === '' ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.implementingAgency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.state.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSector = selectedSector === 'ALL' || p.sector === selectedSector;

      const hasOverrun = (p.predictedCostOverrunCr || 0) > 0 || (p.costOverrunCr || 0) > 0;
      const matchesOverrun =
        filterOverrun === 'ALL' ||
        (filterOverrun === 'OVERRUN' && hasOverrun) ||
        (filterOverrun === 'ON_BUDGET' && !hasOverrun);

      return matchesSearch && matchesSector && matchesOverrun;
    });
  }, [projects, searchTerm, selectedSector, filterOverrun]);

  const handleExportCsv = () => {
    const headers = [
      'Project ID',
      'Project Name',
      'Sector',
      'State',
      'Implementing Agency',
      'Sanctioned Cost (Cr)',
      'Revised Cost (Cr)',
      'Cumulative Expenditure (Cr)',
      'Physical Progress (%)',
      'Financial Progress (%)',
      'Cost Overrun (Cr)',
    ];

    const rows = filteredProjects.map((p) => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.sector}"`,
      `"${p.state}"`,
      `"${p.implementingAgency}"`,
      p.sanctionedCostCr,
      p.revisedCostCr,
      p.expenditureCr,
      p.currentPhysicalProgress,
      p.financialProgress,
      p.predictedCostOverrunCr || 0,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PAIMANA_Cost_Expenditure_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Cost Report Exported', `Downloaded ${filteredProjects.length} records in verified CSV format.`);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto select-none pb-12">
      {/* Header Banner */}
      <div className="neo-panel p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 border-l-4 border-l-[#1557D6]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 shadow-2xs">
              <DollarSign className="w-3 h-3 text-[#1557D6]" />
              Official PAIMANA Expenditure Telemetry
            </span>
            <span className="text-xs font-semibold text-[var(--neo-text-tertiary)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>April – July 2026 Source Records</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--neo-text-primary)]">
            Cost & Expenditure Tracking
          </h1>
          <p className="text-sm text-[var(--neo-text-secondary)] max-w-3xl">
            Financial allocation oversight across all 59 monitored infrastructure projects. Reconcile sanctioned capital outlay, revised project costs, physical milestones, and cumulative disbursement.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportCsv}
            leftIcon={<Download className="w-4 h-4" />}
            className="rounded-xl neo-button-interactive cursor-pointer"
          >
            Export Cost CSV
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="neo-panel p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--neo-text-tertiary)] font-bold uppercase tracking-wider">
            <span>Total Sanctioned Outlay</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-[var(--neo-text-primary)]">
            ₹{totals.sanctionedCr.toLocaleString()} Cr
          </div>
          <p className="text-[11px] text-[var(--neo-text-secondary)]">Across 59 Central Sector projects</p>
        </div>

        <div className="neo-panel p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--neo-text-tertiary)] font-bold uppercase tracking-wider">
            <span>Revised Completion Cost</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-[var(--neo-text-primary)]">
            ₹{totals.revisedCr.toLocaleString()} Cr
          </div>
          <p className="text-[11px] text-amber-600 font-semibold">
            ₹{totals.varianceCr.toLocaleString()} Cr cumulative escalation
          </p>
        </div>

        <div className="neo-panel p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--neo-text-tertiary)] font-bold uppercase tracking-wider">
            <span>Cumulative Expenditure</span>
            <PieChart className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-[var(--neo-text-primary)]">
            ₹{totals.expenditureCr.toLocaleString()} Cr
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold">
            {totals.absorptionRate}% Overall Fund Absorption
          </p>
        </div>

        <div className="neo-panel p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--neo-text-tertiary)] font-bold uppercase tracking-wider">
            <span>Cost Overrun Status</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-[var(--neo-text-primary)]">
            {totals.overrunCount} / {projects.length}
          </div>
          <p className="text-[11px] text-slate-500 font-semibold">
            Projects experiencing cost escalation
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="neo-panel p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex-1 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by project name, code, state, or agency..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl neo-inset text-[var(--neo-text-primary)] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="neo-inset px-3 py-2 rounded-xl text-xs font-semibold text-[var(--neo-text-primary)] focus:outline-none"
          >
            <option value="ALL">All Sectors ({projects.length})</option>
            {INFRA_SECTORS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={filterOverrun}
            onChange={(e) => setFilterOverrun(e.target.value as any)}
            className="neo-inset px-3 py-2 rounded-xl text-xs font-semibold text-[var(--neo-text-primary)] focus:outline-none"
          >
            <option value="ALL">All Budget Statuses</option>
            <option value="OVERRUN">Cost Overrun Only</option>
            <option value="ON_BUDGET">Within Sanctioned Budget</option>
          </select>
        </div>

        <div className="text-xs text-[var(--neo-text-tertiary)] font-bold">
          Showing {filteredProjects.length} of {projects.length} Projects
        </div>
      </div>

      {/* Project Financial Table */}
      <div className="neo-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[rgba(200,212,226,0.6)] bg-slate-50/50 text-[var(--neo-text-secondary)] uppercase tracking-wider font-bold">
                <th className="py-3 px-4">Project & Code</th>
                <th className="py-3 px-3">Sector & State</th>
                <th className="py-3 px-3 text-right">Sanctioned (₹ Cr)</th>
                <th className="py-3 px-3 text-right">Revised (₹ Cr)</th>
                <th className="py-3 px-3 text-right">Expenditure (₹ Cr)</th>
                <th className="py-3 px-3 text-center">Progress (Phy vs Fin)</th>
                <th className="py-3 px-3 text-center">Variance / Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(200,212,226,0.4)] text-[var(--neo-text-primary)] font-medium">
              {filteredProjects.map((p) => {
                const variance = Math.max(0, (p.revisedCostCr || 0) - (p.sanctionedCostCr || 0));
                const phyProgress = p.currentPhysicalProgress || 0;
                const finProgress = p.financialProgress || 0;
                const progressDivergence = Math.round(finProgress - phyProgress);

                return (
                  <tr key={p.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-bold text-slate-900 truncate" title={p.name}>
                        {p.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {p.code} • {p.implementingAgency}
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-slate-800">{p.sector}</div>
                      <div className="text-[10px] text-slate-500">{p.state}</div>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold">
                      ₹{p.sanctionedCostCr?.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold">
                      ₹{p.revisedCostCr?.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-blue-700">
                      ₹{p.expenditureCr?.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="space-y-1 max-w-[140px] mx-auto">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span className="text-emerald-700">Phy: {phyProgress}%</span>
                          <span className="text-blue-700">Fin: {finProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden flex">
                          <div
                            className="bg-emerald-500 h-full"
                            style={{ width: `${Math.min(100, phyProgress)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {variance > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-50 text-red-700 border border-red-200">
                          +₹{variance.toLocaleString()} Cr
                        </span>
                      ) : progressDivergence > 15 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                          Disbursement Gap
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          On Budget
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
