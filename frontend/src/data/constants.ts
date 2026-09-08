import { UserRole } from '../types/auth';

export const GOV_ROLES: UserRole[] = [
  'Monitoring Officer',
  'Ministry / Department',
  'Project Manager',
  'Senior Decision Maker',
  'Auditor / Viewer',
  'Administrator',
];

export const INDIAN_STATES_REGIONS = [
  'National / All India',
  'Andhra Pradesh',
  'Assam',
  'Bihar',
  'Gujarat',
  'Karnataka',
  'Madhya Pradesh',
  'Maharashtra',
  'Odisha',
  'Rajasthan',
  'Tamil Nadu',
  'Uttar Pradesh',
  'West Bengal',
  'Delhi NCR',
  'North Eastern Region',
  'Union Territories',
];

export const INFRA_SECTORS = [
  'Roads & Highways (MoRTH)',
  'Railways (MoR)',
  'Renewable Energy & Power',
  'Ports, Shipping & Waterways',
  'Civil Aviation',
  'Urban Mass Transit (Metro)',
  'Water Resources & Irrigation',
  'Digital & Telecom Infra',
];

export const DEMO_USER_PROFILE = {
  id: 'usr_gov_98241',
  fullName: 'Dr. Vikram Malhotra',
  organization: 'Infrastructure Monitoring',
  email: 'vikram.malhotra@example.com',
  role: 'Senior Decision Maker' as UserRole,
  stateRegion: 'National / All India',
  preferredSectors: [
    'Roads & Highways (MoRTH)',
    'Railways (MoR)',
    'Renewable Energy & Power',
  ],
  isProfileComplete: true,
  lastLoginAt: new Date().toISOString(),
};
