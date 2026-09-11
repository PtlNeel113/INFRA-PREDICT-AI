/**
 * Centralized Role-Based Access Control (RBAC) Configuration
 * Single Source of Truth for INFRA-PREDICT AI
 * 
 * Note: Official PAIMANA records (April - July 2026) are strictly read-only source data.
 */

export type UserRole =
  | 'Senior Decision Maker'
  | 'Project Manager'
  | 'Monitoring Officer'
  | 'Ministry / Department'
  | 'Auditor / Viewer'
  | 'Administrator';

export type Permission =
  // View permissions
  | 'view:dashboard'
  | 'view:national_risk_map'
  | 'view:projects'
  | 'view:project_details'
  | 'view:alerts'
  | 'view:predictions'
  | 'view:explainability'
  | 'view:benchmarking'
  | 'view:analytics'
  | 'view:reports'
  | 'view:settings'
  | 'view:assistant'
  | 'view:audit_trail'
  | 'view:compliance_ledger'
  | 'view:admin_panel'
  | 'view:user_management'
  | 'view:pipeline_health'
  | 'view:cost_expenditure'
  | 'view:recommended_actions'
  | 'view:field_verification'
  | 'view:data_validation'
  | 'view:risk_history'
  | 'view:system_health'
  | 'view:audit_logs'
  | 'view:data_ingestion'
  // Mutation / action permissions
  | 'edit:project_notes'
  | 'edit:milestones'
  | 'trigger:risk_recalc'
  | 'export:audit_pack'
  | 'export:executive_summary'
  | 'export:field_report'
  | 'manage:users'
  | 'manage:system_settings'
  | 'ingest:data';

export interface AIPersonaConfig {
  roleTitle: string;
  focusAreas: string[];
  promptChips: string[];
  isReadOnly: boolean;
  systemContextPrompt: string;
}

export interface RoleDefinition {
  role: UserRole;
  title: string;
  badge: string;
  badgeColor: {
    bg: string;
    text: string;
    border: string;
  };
  description: string;
  scope: string;
  defaultRoute: string;
  permissions: Permission[];
  allowedRoutes: string[];
  aiPersona: AIPersonaConfig;
}

export const ROLE_DEFINITIONS: Record<UserRole, RoleDefinition> = {
  'Senior Decision Maker': {
    role: 'Senior Decision Maker',
    title: 'Senior Decision Maker',
    badge: 'Executive',
    badgeColor: {
      bg: 'bg-blue-50 dark:bg-blue-950/60',
      text: 'text-[#1557D6] dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800',
    },
    description: 'Executive risk briefings, strategic portfolio oversight, macroeconomic delay impact, and cabinet-level decisions.',
    scope: 'National Strategic Portfolio & Inter-Ministerial Review',
    defaultRoute: '/dashboard',
    permissions: [
      'view:dashboard',
      'view:national_risk_map',
      'view:projects',
      'view:project_details',
      'view:alerts',
      'view:predictions',
      'view:explainability',
      'view:benchmarking',
      'view:analytics',
      'view:reports',
      'view:assistant',
      'view:settings',
      'export:executive_summary',
    ],
    allowedRoutes: [
      '/dashboard',
      '/map',
      '/national-risk-map',
      '/projects',
      '/projects/:id',
      '/alerts',
      '/predictions',
      '/explainability',
      '/benchmarking',
      '/analytics',
      '/reports',
      '/assistant',
      '/settings',
    ],
    aiPersona: {
      roleTitle: 'Senior Decision Maker Executive Advisor',
      focusAreas: ['Portfolio Risk Exposure', 'Macro Cost Escalation', 'Inter-Agency Coordination', 'Cabinet Summary'],
      promptChips: [
        'Summarize top 3 portfolio risks',
        'National delay cost exposure',
        'Cabinet-level escalation summary',
        'Strategic mitigation options for mega projects',
      ],
      isReadOnly: false,
      systemContextPrompt:
        'You are advising a Senior Decision Maker (Cabinet Secretary / Principal Secretary level). Prioritize strategic macroeconomic delay impact, capital allocation exposure, cross-ministerial bottlenecks, and decisive high-level intervention recommendations. Avoid micromanaging operational tasks.',
    },
  },

  'Project Manager': {
    role: 'Project Manager',
    title: 'Project Manager',
    badge: 'Operations',
    badgeColor: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/60',
      text: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-200 dark:border-indigo-800',
    },
    description: 'Milestone tracking, contractor delay escalations, critical path slippage, and on-ground cost-variance mitigation.',
    scope: 'Direct Project Execution & Critical Path Management',
    defaultRoute: '/dashboard',
    permissions: [
      'view:dashboard',
      'view:projects',
      'view:project_details',
      'view:alerts',
      'view:predictions',
      'view:explainability',
      'view:benchmarking',
      'view:cost_expenditure',
      'view:recommended_actions',
      'view:analytics',
      'view:reports',
      'view:assistant',
      'view:settings',
      'edit:project_notes',
      'edit:milestones',
      'export:field_report',
    ],
    allowedRoutes: [
      '/dashboard',
      '/projects',
      '/projects/:id',
      '/cost-expenditure',
      '/alerts',
      '/predictions',
      '/explainability',
      '/benchmarking',
      '/recommended-actions',
      '/analytics',
      '/reports',
      '/assistant',
      '/settings',
    ],
    aiPersona: {
      roleTitle: 'Project Execution & Schedule Optimizer',
      focusAreas: ['Milestone Slippage', 'Contractor Performance', 'Material & Site Clearances', 'Budget Variance'],
      promptChips: [
        'Show milestones slipping this quarter',
        'Cost overrun drivers for high-risk projects',
        'Critical path delay mitigation plan',
        'Contractor dispute risk analysis',
      ],
      isReadOnly: false,
      systemContextPrompt:
        'You are advising a Project Manager responsible for project delivery. Focus on concrete milestones, critical path schedules, contractor deliverables, ROW/statutory bottleneck clearing, and active site risk mitigation.',
    },
  },

  'Monitoring Officer': {
    role: 'Monitoring Officer',
    title: 'Monitoring Officer',
    badge: 'Field / KPI',
    badgeColor: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/60',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-800',
    },
    description: 'MoSPI PAIMANA reporting compliance, physical progress inspection, month-over-month variance, and early warning alerts.',
    scope: 'PAIMANA Adherence & Monthly Telemetry Verification',
    defaultRoute: '/dashboard',
    permissions: [
      'view:dashboard',
      'view:national_risk_map',
      'view:projects',
      'view:project_details',
      'view:alerts',
      'view:predictions',
      'view:explainability',
      'view:field_verification',
      'view:compliance_ledger',
      'view:benchmarking',
      'view:analytics',
      'view:reports',
      'view:assistant',
      'view:settings',
      'export:field_report',
    ],
    allowedRoutes: [
      '/dashboard',
      '/map',
      '/national-risk-map',
      '/projects',
      '/projects/:id',
      '/alerts',
      '/predictions',
      '/explainability',
      '/field-verification',
      '/benchmarking',
      '/analytics',
      '/reports',
      '/assistant',
      '/settings',
    ],
    aiPersona: {
      roleTitle: 'PAIMANA Compliance & Field Monitoring Inspector',
      focusAreas: ['Reporting Adherence', 'Physical vs Financial Lag', 'State-Level Variance', 'Inspection Escalations'],
      promptChips: [
        'PAIMANA multi-month progress lag',
        'Projects missing physical progress targets',
        'Month-over-month expenditure discrepancy',
        'Inspection checklist for high-risk assets',
      ],
      isReadOnly: false,
      systemContextPrompt:
        'You are advising a Monitoring Officer validating MoSPI PAIMANA reporting. Emphasize multi-month progress continuity (April–July 2026), reporting lags, physical vs financial expenditure gaps, and field verification priorities.',
    },
  },

  'Ministry / Department': {
    role: 'Ministry / Department',
    title: 'Ministry / Department',
    badge: 'Policy',
    badgeColor: {
      bg: 'bg-purple-50 dark:bg-purple-950/60',
      text: 'text-purple-700 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800',
    },
    description: 'Sectoral capital expenditure, inter-ministerial clearances, state infrastructure allocations, and statutory governance.',
    scope: 'Sectoral Allocation, Sanction Compliance & State Disbursals',
    defaultRoute: '/dashboard',
    permissions: [
      'view:dashboard',
      'view:national_risk_map',
      'view:projects',
      'view:project_details',
      'view:alerts',
      'view:predictions',
      'view:explainability',
      'view:benchmarking',
      'view:cost_expenditure',
      'view:analytics',
      'view:reports',
      'view:assistant',
      'view:settings',
      'export:executive_summary',
    ],
    allowedRoutes: [
      '/dashboard',
      '/map',
      '/national-risk-map',
      '/projects',
      '/projects/:id',
      '/alerts',
      '/predictions',
      '/explainability',
      '/benchmarking',
      '/cost-expenditure',
      '/analytics',
      '/reports',
      '/assistant',
      '/settings',
    ],
    aiPersona: {
      roleTitle: 'Ministerial Sectoral & Budget Policy Analyst',
      focusAreas: ['Ministry Budget Absorption', 'State Allocations', 'Inter-Ministerial Approvals', 'Flagship Schemes'],
      promptChips: [
        'Railways vs Roadways budget absorption',
        'State-wise capital allocation progress',
        'Sanctioned vs actual expenditure ratio',
        'Policy recommendations for lagging sectors',
      ],
      isReadOnly: false,
      systemContextPrompt:
        'You are advising a Ministry or Departmental Joint Secretary. Focus on sectoral capital deployment, state-wise fund absorption, inter-departmental clearances, and scheme performance.',
    },
  },

  'Auditor / Viewer': {
    role: 'Auditor / Viewer',
    title: 'Auditor / Viewer',
    badge: 'Audit & Watch (Strict Read-Only)',
    badgeColor: {
      bg: 'bg-amber-50 dark:bg-amber-950/60',
      text: 'text-amber-700 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-800',
    },
    description: 'Statutory compliance audits, 4-month PAIMANA variance verification, fund utilization inspection, and strict read-only audit ledger.',
    scope: 'Independent Audit, Statutory Compliance & Data Immutability Verification',
    defaultRoute: '/dashboard',
    permissions: [
      'view:dashboard',
      'view:national_risk_map',
      'view:projects',
      'view:project_details',
      'view:alerts',
      'view:data_validation',
      'view:risk_history',
      'view:explainability',
      'view:cost_expenditure',
      'view:audit_trail',
      'view:compliance_ledger',
      'view:audit_logs',
      'view:analytics',
      'view:reports',
      'view:assistant',
      'export:audit_pack',
    ],
    allowedRoutes: [
      '/dashboard',
      '/map',
      '/national-risk-map',
      '/projects',
      '/projects/:id',
      '/alerts',
      '/data-validation',
      '/risk-history',
      '/cost-expenditure',
      '/audit-logs',
      '/explainability',
      '/analytics',
      '/reports',
      '/assistant',
    ],
    aiPersona: {
      roleTitle: 'Statutory Compliance & Audit Verification Officer',
      focusAreas: ['Historical Variance Verification', 'Fund Utilization Discrepancy', 'Data Immutability', 'Statutory Compliance'],
      promptChips: [
        'Verify 4-month PAIMANA variance integrity',
        'Flag historical cost revisions across April-July',
        'Generate statutory audit observation summary',
        'Fund utilization compliance status',
      ],
      isReadOnly: true,
      systemContextPrompt:
        'You are an AI Statutory Audit Assistant serving an Auditor / Viewer. Your role is strictly READ-ONLY. You verify 4-month PAIMANA historical data integrity (April–July 2026), highlight cost/timeline discrepancies, and provide compliance evidence. You must decline any request to modify, delete, or ingest project data.',
    },
  },

  'Administrator': {
    role: 'Administrator',
    title: 'Administrator',
    badge: 'System Admin',
    badgeColor: {
      bg: 'bg-slate-100 dark:bg-slate-800',
      text: 'text-slate-800 dark:text-slate-200',
      border: 'border-slate-300 dark:border-slate-700',
    },
    description: 'Platform access management, user roles, system telemetry, ingestion pipeline verification, and security audit logging.',
    scope: 'System Administration, RBAC Policies & Security Logging',
    defaultRoute: '/dashboard',
    permissions: [
      'view:dashboard',
      'view:national_risk_map',
      'view:projects',
      'view:project_details',
      'view:alerts',
      'view:predictions',
      'view:explainability',
      'view:benchmarking',
      'view:analytics',
      'view:reports',
      'view:settings',
      'view:assistant',
      'view:audit_trail',
      'view:compliance_ledger',
      'view:admin_panel',
      'view:user_management',
      'view:pipeline_health',
      'view:data_validation',
      'view:system_health',
      'view:audit_logs',
      'view:data_ingestion',
      'manage:users',
      'manage:system_settings',
      'ingest:data',
      'trigger:risk_recalc',
      'export:audit_pack',
      'export:executive_summary',
    ],
    allowedRoutes: [
      '/dashboard',
      '/map',
      '/national-risk-map',
      '/projects',
      '/projects/:id',
      '/alerts',
      '/predictions',
      '/explainability',
      '/benchmarking',
      '/analytics',
      '/reports',
      '/assistant',
      '/settings',
      '/data-ingestion',
      '/data-validation',
      '/admin/users',
      '/system-health',
      '/audit-logs',
      '/admin',
      '/admin/*',
    ],
    aiPersona: {
      roleTitle: 'System Security & Telemetry Administrator',
      focusAreas: ['Access Log Audits', 'Data Pipeline Health', 'User Roles & Permissions', 'Platform Security'],
      promptChips: [
        'System audit log summary for last 24h',
        'PAIMANA data pipeline sync status',
        'Active user session and role breakdown',
        'Security & RBAC policy audit',
      ],
      isReadOnly: false,
      systemContextPrompt:
        'You are an AI System Administrator Assistant. Provide diagnostics on platform access, RBAC security, data ingestion telemetry, system health, and audit trail events. Support administrative oversight while ensuring data governance compliance.',
    },
  },
};

/**
 * Role-Specific Navigation Configuration
 * Single Source of Truth for Sidebar Navigation per Role
 */
export interface RoleNavigationItem {
  to: string;
  label: string;
  requiredPermission?: Permission;
}

export const ROLE_NAVIGATION: Record<UserRole, RoleNavigationItem[]> = {
  'Senior Decision Maker': [
    { to: '/dashboard', label: 'Executive Cockpit', requiredPermission: 'view:dashboard' },
    { to: '/national-risk-map', label: 'National Risk Map', requiredPermission: 'view:national_risk_map' },
    { to: '/projects', label: 'Strategic Portfolio', requiredPermission: 'view:projects' },
    { to: '/alerts', label: 'AI Priority Queue', requiredPermission: 'view:alerts' },
    { to: '/predictions', label: 'AI Risk Predictions', requiredPermission: 'view:predictions' },
    { to: '/explainability', label: 'Explainable AI', requiredPermission: 'view:explainability' },
    { to: '/analytics', label: 'Portfolio Analytics', requiredPermission: 'view:analytics' },
    { to: '/reports', label: 'Executive Briefs', requiredPermission: 'view:reports' },
  ],
  'Project Manager': [
    { to: '/dashboard', label: 'Execution Dashboard', requiredPermission: 'view:dashboard' },
    { to: '/projects', label: 'My Projects', requiredPermission: 'view:projects' },
    { to: '/cost-expenditure', label: 'Cost & Expenditure', requiredPermission: 'view:cost_expenditure' },
    { to: '/alerts', label: 'Milestone Warnings', requiredPermission: 'view:alerts' },
    { to: '/predictions', label: 'Schedule Slippages', requiredPermission: 'view:predictions' },
    { to: '/explainability', label: 'Risk Drivers', requiredPermission: 'view:explainability' },
    { to: '/benchmarking', label: 'Peer Benchmarking', requiredPermission: 'view:benchmarking' },
    { to: '/recommended-actions', label: 'Recommended Actions', requiredPermission: 'view:recommended_actions' },
    { to: '/reports', label: 'Progress Reports', requiredPermission: 'view:reports' },
  ],
  'Monitoring Officer': [
    { to: '/dashboard', label: 'Monitoring Dashboard', requiredPermission: 'view:dashboard' },
    { to: '/national-risk-map', label: 'National Risk Map', requiredPermission: 'view:national_risk_map' },
    { to: '/projects', label: 'PAIMANA Projects', requiredPermission: 'view:projects' },
    { to: '/alerts', label: 'Early Warnings', requiredPermission: 'view:alerts' },
    { to: '/predictions', label: 'Risk Indicators', requiredPermission: 'view:predictions' },
    { to: '/explainability', label: 'KPI Monitoring', requiredPermission: 'view:explainability' },
    { to: '/field-verification', label: 'Field Verification', requiredPermission: 'view:field_verification' },
    { to: '/analytics', label: 'Reporting Analytics', requiredPermission: 'view:analytics' },
  ],
  'Ministry / Department': [
    { to: '/dashboard', label: 'Ministry Dashboard', requiredPermission: 'view:dashboard' },
    { to: '/national-risk-map', label: 'National Risk Map', requiredPermission: 'view:national_risk_map' },
    { to: '/projects', label: 'Ministry Projects', requiredPermission: 'view:projects' },
    { to: '/alerts', label: 'Portfolio Priorities', requiredPermission: 'view:alerts' },
    { to: '/predictions', label: 'Portfolio Risk Outlook', requiredPermission: 'view:predictions' },
    { to: '/explainability', label: 'Explainable AI', requiredPermission: 'view:explainability' },
    { to: '/benchmarking', label: 'Sector Benchmarking', requiredPermission: 'view:benchmarking' },
    { to: '/cost-expenditure', label: 'Cost & Expenditure', requiredPermission: 'view:cost_expenditure' },
    { to: '/reports', label: 'Policy Briefs', requiredPermission: 'view:reports' },
  ],
  'Auditor / Viewer': [
    { to: '/dashboard', label: 'Audit Workspace', requiredPermission: 'view:dashboard' },
    { to: '/national-risk-map', label: 'Risk Map (Read-Only)', requiredPermission: 'view:national_risk_map' },
    { to: '/projects', label: 'PAIMANA Records', requiredPermission: 'view:projects' },
    { to: '/alerts', label: 'Compliance Exceptions', requiredPermission: 'view:alerts' },
    { to: '/data-validation', label: 'Data Quality & Validation', requiredPermission: 'view:data_validation' },
    { to: '/risk-history', label: 'Risk History', requiredPermission: 'view:risk_history' },
    { to: '/explainability', label: 'Explainable AI', requiredPermission: 'view:explainability' },
    { to: '/cost-expenditure', label: 'Expenditure Verification', requiredPermission: 'view:cost_expenditure' },
    { to: '/reports', label: 'Export Audit Pack', requiredPermission: 'view:reports' },
  ],
  'Administrator': [
    { to: '/dashboard', label: 'Admin Console', requiredPermission: 'view:dashboard' },
    { to: '/data-ingestion', label: 'Data Ingestion', requiredPermission: 'ingest:data' },
    { to: '/data-validation', label: 'Data Validation', requiredPermission: 'view:data_validation' },
    { to: '/admin/users', label: 'Users & Access', requiredPermission: 'manage:users' },
    { to: '/settings', label: 'RBAC & Settings', requiredPermission: 'manage:system_settings' },
    { to: '/alerts', label: 'Data & System Alerts', requiredPermission: 'view:alerts' },
    { to: '/system-health', label: 'System Health', requiredPermission: 'view:system_health' },
    { to: '/audit-logs', label: 'Audit Logs', requiredPermission: 'view:audit_logs' },
    { to: '/reports', label: 'Reports Generator', requiredPermission: 'view:reports' },
  ],
};

/**
 * Check if a given role has a specific permission
 */
export function roleHasPermission(role: UserRole, permission: Permission): boolean {
  const def = ROLE_DEFINITIONS[role];
  if (!def) return false;
  return def.permissions.includes(permission);
}

/**
 * Get all available roles as array
 */
export const AVAILABLE_ROLES: UserRole[] = [
  'Senior Decision Maker',
  'Project Manager',
  'Monitoring Officer',
  'Ministry / Department',
  'Auditor / Viewer',
  'Administrator',
];
