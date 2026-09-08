import { create } from 'zustand';
import { InfraProject, CreateProjectInput } from '../types/projects';
import { IngestionJobRecord } from '../types/ingestion';
import { MOCK_PROJECTS } from '../data/projectsData';
import { calculateProjectMetrics } from '../utils/riskCalculationEngine';

interface ProjectState {
  projects: InfraProject[];
  ingestionJobs: IngestionJobRecord[];
  addProject: (input: CreateProjectInput) => InfraProject;
  upsertProjects: (incomingProjects: InfraProject[]) => { updatedCount: number; newCount: number };
  getProject: (id: string) => InfraProject | undefined;
  addIngestionJob: (job: IngestionJobRecord) => void;
  resetProjects: () => void;
}

const STORAGE_KEY = 'infra_predict_projects_v1';
const STORAGE_KEY_JOBS = 'infra_predict_ingestion_jobs_v1';

function loadInitialProjects(): InfraProject[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const existingIds = new Set(parsed.map((p: InfraProject) => p.id));
        const combined = [...parsed];
        MOCK_PROJECTS.forEach((mockP) => {
          if (!existingIds.has(mockP.id)) {
            combined.push(mockP);
          }
        });
        return combined;
      }
    }
  } catch (err) {
    console.warn('Failed to parse saved projects, falling back to seed mock data', err);
  }
  return [...MOCK_PROJECTS];
}

function loadInitialJobs(): IngestionJobRecord[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_JOBS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // fallback
  }
  return [
    {
      id: 'JOB-2026-08-01',
      filename: 'National_Corridor_Batch_08.xlsx',
      fileSize: 482100,
      totalRows: 14,
      processedRows: 14,
      updatedRows: 12,
      newRows: 2,
      rejectedRows: 0,
      status: 'COMPLETED',
      timestamp: '2026-08-28 10:30 AM',
      errors: [],
      user: 'Dr. Vikram Malhotra',
    },
  ];
}

function saveProjects(projects: InfraProject[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save projects to localStorage', err);
  }
}

function saveJobs(jobs: IngestionJobRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEY_JOBS, JSON.stringify(jobs));
  } catch (err) {
    console.error('Failed to save ingestion jobs to localStorage', err);
  }
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: loadInitialProjects(),
  ingestionJobs: loadInitialJobs(),

  addProject: (input: CreateProjectInput): InfraProject => {
    const currentProjects = get().projects;
    const newProject = calculateProjectMetrics(input, currentProjects);
    
    // Add to the top of the list so it appears immediately
    const updatedProjects = [newProject, ...currentProjects];
    saveProjects(updatedProjects);
    set({ projects: updatedProjects });

    return newProject;
  },

  upsertProjects: (incomingProjects: InfraProject[]): { updatedCount: number; newCount: number } => {
    const currentProjects = get().projects;
    let updatedCount = 0;
    let newCount = 0;

    const projectMap = new Map<string, InfraProject>();
    // Index current projects by code and id
    currentProjects.forEach((p) => {
      projectMap.set(p.code.toLowerCase().trim(), p);
      projectMap.set(p.id.toLowerCase().trim(), p);
    });

    const resultList: InfraProject[] = [...currentProjects];

    incomingProjects.forEach((incoming) => {
      const codeKey = incoming.code.toLowerCase().trim();
      const idKey = incoming.id.toLowerCase().trim();

      const existingIndex = resultList.findIndex(
        (p) => p.code.toLowerCase().trim() === codeKey || p.id.toLowerCase().trim() === idKey,
      );

      if (existingIndex >= 0) {
        // Safe update without creating duplicate
        resultList[existingIndex] = {
          ...resultList[existingIndex],
          ...incoming,
          // Retain existing milestones/history if incoming doesn't supply them
          keyMilestones: incoming.keyMilestones && incoming.keyMilestones.length > 0
            ? incoming.keyMilestones
            : resultList[existingIndex].keyMilestones,
          riskTrajectory: incoming.riskTrajectory && incoming.riskTrajectory.length > 0
            ? incoming.riskTrajectory
            : resultList[existingIndex].riskTrajectory,
        };
        updatedCount++;
      } else {
        // Insert new project
        resultList.unshift(incoming);
        newCount++;
      }
    });

    saveProjects(resultList);
    set({ projects: resultList });

    return { updatedCount, newCount };
  },

  getProject: (id: string): InfraProject | undefined => {
    const cleaned = id.toLowerCase().trim();
    return get().projects.find((p) => p.id.toLowerCase().trim() === cleaned || p.code.toLowerCase().trim() === cleaned);
  },

  addIngestionJob: (job: IngestionJobRecord) => {
    const currentJobs = get().ingestionJobs;
    const updated = [job, ...currentJobs];
    saveJobs(updated);
    set({ ingestionJobs: updated });
  },

  resetProjects: () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY_JOBS);
    set({ projects: [...MOCK_PROJECTS], ingestionJobs: loadInitialJobs() });
  },
}));
