import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  UserCheck,
  Lock,
  Search,
  Key,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Button } from '../../components/ui/Button';
import { UserRole, AVAILABLE_ROLES, ROLE_DEFINITIONS } from '../../config/roles';

interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: UserRole;
  status: 'ACTIVE' | 'REVOKED';
  lastActive: string;
}

const INITIAL_USERS: AdminUserRecord[] = [
  {
    id: 'usr-001',
    name: 'Dr. Vikram Malhotra',
    email: 'vikram.malhotra@gov.in',
    organization: 'Cabinet Secretariat / PMO',
    role: 'Senior Decision Maker',
    status: 'ACTIVE',
    lastActive: 'Active Now',
  },
  {
    id: 'usr-002',
    name: 'Er. Rajesh Vardhan, IRSE',
    email: 'rajesh.vardhan@nhai.gov.in',
    organization: 'National Highways Authority of India [NHAI]',
    role: 'Project Manager',
    status: 'ACTIVE',
    lastActive: '24 mins ago',
  },
  {
    id: 'usr-003',
    name: 'Sunita Meena, ISS',
    email: 'sunita.meena@mospi.gov.in',
    organization: 'Ministry of Statistics & PI [MoSPI]',
    role: 'Monitoring Officer',
    status: 'ACTIVE',
    lastActive: '1 hr ago',
  },
  {
    id: 'usr-004',
    name: 'Amitabh Kant, IAS',
    email: 'amitabh.kant@niti.gov.in',
    organization: 'NITI Aayog Infrastructure Vertical',
    role: 'Ministry / Department',
    status: 'ACTIVE',
    lastActive: '3 hrs ago',
  },
  {
    id: 'usr-005',
    name: 'K. S. Narayanan, IA&AS',
    email: 'ks.narayanan@cag.gov.in',
    organization: 'Comptroller & Auditor General of India [CAG]',
    role: 'Auditor / Viewer',
    status: 'ACTIVE',
    lastActive: 'Yesterday',
  },
  {
    id: 'usr-006',
    name: 'Devendra Joshi, NIC',
    email: 'admin.infra@nic.in',
    organization: 'National Informatics Centre [NIC]',
    role: 'Administrator',
    status: 'ACTIVE',
    lastActive: 'Active Now',
  },
];

export const UsersAccessPage: React.FC = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [users, setUsers] = useState<AdminUserRecord[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      searchTerm === '' ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const next = u.status === 'ACTIVE' ? 'REVOKED' : 'ACTIVE';
          toast.info('Access Updated', `User account ${u.name} marked as ${next}.`);
          return { ...u, status: next };
        }
        return u;
      })
    );
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto select-none pb-12">
      {/* Header Banner */}
      <div className="neo-panel p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 border-l-4 border-l-slate-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-300 shadow-2xs">
              <Users className="w-3 h-3 text-slate-700" />
              Government Identity & RBAC Policy
            </span>
            <span className="text-xs font-semibold text-[var(--neo-text-tertiary)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Session Locking Enforced</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--neo-text-primary)]">
            Users & Access Management
          </h1>
          <p className="text-sm text-[var(--neo-text-secondary)] max-w-3xl">
            Authorize enterprise accounts, review session security bindings, and ensure strict role compartmentalization across all government infrastructure stakeholders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-[var(--neo-surface-inset)] border border-[rgba(200,212,226,0.6)] text-xs font-bold text-slate-800">
            {users.length} Active Enterprise Accounts
          </div>
        </div>
      </div>

      {/* Role Distribution Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {AVAILABLE_ROLES.map((r) => {
          const count = users.filter((u) => u.role === r).length;
          return (
            <div key={r} className="neo-panel p-3.5 space-y-1 text-center">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 truncate" title={r}>
                {r}
              </div>
              <div className="text-xl font-black text-slate-900">{count}</div>
              <div className="text-[9px] text-emerald-600 font-semibold">Active Policy</div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="neo-panel p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex-1 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl neo-inset text-[var(--neo-text-primary)] placeholder-slate-400 focus:outline-none"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="neo-inset px-3 py-2 rounded-xl text-xs font-semibold text-[var(--neo-text-primary)] focus:outline-none"
          >
            <option value="ALL">All Roles</option>
            {AVAILABLE_ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs text-[var(--neo-text-tertiary)] font-bold">
          Showing {filteredUsers.length} Users
        </div>
      </div>

      {/* Users Table */}
      <div className="neo-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/60 text-slate-600 uppercase font-bold tracking-wider">
                <th className="py-3 px-4">User & Designation</th>
                <th className="py-3 px-3">Organization</th>
                <th className="py-3 px-3">Assigned Role</th>
                <th className="py-3 px-3">Security Status</th>
                <th className="py-3 px-3">Last Active</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-blue-50/30">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{u.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{u.email}</div>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-700">{u.organization}</td>
                  <td className="py-3.5 px-3">
                    <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    {u.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                        <Lock className="w-3 h-3" />
                        Revoked
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 font-mono">{u.lastActive}</td>
                  <td className="py-3.5 px-3 text-right">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleToggleStatus(u.id)}
                      className="rounded-lg text-[10px] py-1 cursor-pointer"
                    >
                      {u.status === 'ACTIVE' ? 'Revoke Session' : 'Reactivate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
