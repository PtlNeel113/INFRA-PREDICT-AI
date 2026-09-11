import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Search,
  Filter,
  Layers,
  Send,
  Building2,
} from 'lucide-react';
import { PAIMANA_OFFICIAL_PROJECTS } from '../../data/paimanaOfficialRecords';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Button } from '../../components/ui/Button';

interface ActionItem {
  id: string;
  projectId: string;
  projectName: string;
  agency: string;
  state: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  category: 'SCHEDULE_SLIPPAGE' | 'COST_VARIANCE' | 'PROGRESS_GAP' | 'MILESTONE_DELAY';
  recommendation: string;
  indicatorContext: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'DISPATCHED';
}

export const RecommendedActionsPage: React.FC = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [actionStatuses, setActionStatuses] = useState<Record<string, 'PENDING' | 'UNDER_REVIEW' | 'DISPATCHED'>>({});

  const projects = PAIMANA_OFFICIAL_PROJECTS;

  // Derive concrete, truthful recommended actions strictly from real PAIMANA project metrics
  const actions: ActionItem[] = useMemo(() => {
    const list: ActionItem[] = [];

    projects.forEach((p) => {
      const delay = p.predictedDelayMonths || 0;
      const progressGap = p.progressGap || 0;
      const costVariance = Math.max(0, (p.revisedCostCr || 0) - (p.sanctionedCostCr || 0));
      const finPhyDiff = (p.financialProgress || 0) - (p.currentPhysicalProgress || 0);

      // 1. Critical Delay Escalation
      if (delay >= 6) {
        list.push({
          id: `act-delay-${p.id}`,
          projectId: p.id,
          projectName: p.name,
          agency: p.implementingAgency,
          state: p.state,
          priority: 'CRITICAL',
          category: 'SCHEDULE_SLIPPAGE',
          recommendation: `Issue statutory milestone slippage notice to ${p.implementingAgency} regarding ${delay}-month extended completion horizon.`,
          indicatorContext: `Anticipated delay: ${delay} months (target DOC: ${p.predictedCompletionDate || 'Pending'}). Driver: ${p.primaryRiskDriver || 'Execution pace'}.`,
          status: actionStatuses[`act-delay-${p.id}`] || 'PENDING',
        });
      }

      // 2. Cost Escalation Review
      if (costVariance > 50) {
        list.push({
          id: `act-cost-${p.id}`,
          projectId: p.id,
          projectName: p.name,
          agency: p.implementingAgency,
          state: p.state,
          priority: costVariance > 200 ? 'CRITICAL' : 'HIGH',
          category: 'COST_VARIANCE',
          recommendation: `Conduct revised cost estimate reconciliation. Audit ₹${costVariance.toLocaleString()} Cr capital overrun against initial sanction.`,
          indicatorContext: `Sanctioned: ₹${p.sanctionedCostCr?.toLocaleString()} Cr, Revised: ₹${p.revisedCostCr?.toLocaleString()} Cr (+₹${costVariance.toLocaleString()} Cr).`,
          status: actionStatuses[`act-cost-${p.id}`] || 'PENDING',
        });
      }

      // 3. Progress vs Expenditure Divergence
      if (finPhyDiff > 12) {
        list.push({
          id: `act-mismatch-${p.id}`,
          projectId: p.id,
          projectName: p.name,
          agency: p.implementingAgency,
          state: p.state,
          priority: 'HIGH',
          category: 'PROGRESS_GAP',
          recommendation: `Verify physical work execution on site. Financial disbursement (${p.financialProgress}%) outpaces physical progress (${p.currentPhysicalProgress}%).`,
          indicatorContext: `Divergence gap of ${Math.round(finPhyDiff)}% between capital spent and physical milestones claimed.`,
          status: actionStatuses[`act-mismatch-${p.id}`] || 'PENDING',
        });
      }

      // 4. Milestone Bottleneck
      const delayedMilestone = p.keyMilestones?.find((m) => m.status === 'DELAYED');
      if (delayedMilestone) {
        list.push({
          id: `act-milestone-${p.id}-${delayedMilestone.id}`,
          projectId: p.id,
          projectName: p.name,
          agency: p.implementingAgency,
          state: p.state,
          priority: 'MEDIUM',
          category: 'MILESTONE_DELAY',
          recommendation: `Prioritize contractor intervention on bottleneck milestone: "${delayedMilestone.title}".`,
          indicatorContext: `Delayed by ${delayedMilestone.delayDays} days against scheduled target date (${delayedMilestone.targetDate}).`,
          status: actionStatuses[`act-milestone-${p.id}-${delayedMilestone.id}`] || 'PENDING',
        });
      }
    });

    return list.sort((a, b) => {
      const pOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2 };
      return pOrder[a.priority] - pOrder[b.priority];
    });
  }, [projects, actionStatuses]);

  const filteredActions = useMemo(() => {
    return actions.filter((a) => {
      const matchSearch =
        searchTerm === '' ||
        a.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.state.toLowerCase().includes(searchTerm.toLowerCase());

      const matchPriority = filterPriority === 'ALL' || a.priority === filterPriority;
      const matchCategory = filterCategory === 'ALL' || a.category === filterCategory;

      return matchSearch && matchPriority && matchCategory;
    });
  }, [actions, searchTerm, filterPriority, filterCategory]);

  const handleUpdateStatus = (actionId: string, nextStatus: 'PENDING' | 'UNDER_REVIEW' | 'DISPATCHED') => {
    setActionStatuses((prev) => ({ ...prev, [actionId]: nextStatus }));
    toast.success('Action Updated', `Intervention marked as ${nextStatus.replace('_', ' ')}.`);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto select-none pb-12">
      {/* Header Banner */}
      <div className="neo-panel p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 border-l-4 border-l-emerald-600">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Operational Decision Support
            </span>
            <span className="text-xs font-semibold text-[var(--neo-text-tertiary)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Directly Derived from PAIMANA Indicators</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--neo-text-primary)]">
            Recommended Corrective Actions
          </h1>
          <p className="text-sm text-[var(--neo-text-secondary)] max-w-3xl">
            Prioritized operational interventions derived from schedule variances, milestone slippages, and capital expenditure divergences across official projects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-xl bg-[var(--neo-surface-inset)] border border-[rgba(200,212,226,0.6)] text-xs font-bold text-emerald-700">
            {actions.length} Action Items Identified
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="neo-panel p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex-1 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search actions by project, agency, state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl neo-inset text-[var(--neo-text-primary)] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="neo-inset px-3 py-2 rounded-xl text-xs font-semibold text-[var(--neo-text-primary)] focus:outline-none"
          >
            <option value="ALL">All Priorities</option>
            <option value="CRITICAL">Critical Priority</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="neo-inset px-3 py-2 rounded-xl text-xs font-semibold text-[var(--neo-text-primary)] focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="SCHEDULE_SLIPPAGE">Schedule Slippage</option>
            <option value="COST_VARIANCE">Cost Variance</option>
            <option value="PROGRESS_GAP">Physical vs Financial Gap</option>
            <option value="MILESTONE_DELAY">Milestone Delay</option>
          </select>
        </div>

        <div className="text-xs text-[var(--neo-text-tertiary)] font-bold">
          Showing {filteredActions.length} of {actions.length} Interventions
        </div>
      </div>

      {/* Action Cards List */}
      <div className="space-y-3">
        {filteredActions.map((act) => (
          <div
            key={act.id}
            className="neo-panel p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-200 transition-all"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                    act.priority === 'CRITICAL'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : act.priority === 'HIGH'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}
                >
                  {act.priority} Priority
                </span>

                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {act.category.replace(/_/g, ' ')}
                </span>

                <span className="text-[10px] text-slate-400 font-mono">
                  Project: {act.projectName} ({act.agency}, {act.state})
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {act.recommendation}
              </h3>

              <p className="text-xs text-slate-600 font-mono bg-slate-50 p-2 rounded-lg border border-slate-200/60 inline-block">
                Indicator: {act.indicatorContext}
              </p>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
              {act.status === 'DISPATCHED' ? (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Intervention Dispatched
                </span>
              ) : act.status === 'UNDER_REVIEW' ? (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    Under Review
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpdateStatus(act.id, 'DISPATCHED')}
                    className="rounded-xl cursor-pointer"
                  >
                    Dispatch Action
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleUpdateStatus(act.id, 'UNDER_REVIEW')}
                    className="rounded-xl neo-button-interactive cursor-pointer"
                  >
                    Mark Under Review
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpdateStatus(act.id, 'DISPATCHED')}
                    rightIcon={<Send className="w-3.5 h-3.5" />}
                    className="rounded-xl cursor-pointer"
                  >
                    Dispatch
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
