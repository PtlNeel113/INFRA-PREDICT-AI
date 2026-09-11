import { InfraProject } from '../types/projects';
import { PAIMANA_OFFICIAL_PROJECTS } from './paimanaOfficialRecords';

/**
 * Official Central Sector Infrastructure Projects Dataset
 * Sourced directly from PAIMANA Flash Reports (April, May, June, July 2026)
 * MoSPI Government of India
 */
export { PAIMANA_OFFICIAL_PROJECTS };

// Backward-compatible alias for existing components and store initializers
export const MOCK_PROJECTS: InfraProject[] = PAIMANA_OFFICIAL_PROJECTS;
