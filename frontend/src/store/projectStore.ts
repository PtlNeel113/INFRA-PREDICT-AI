import { create } from 'zustand';
import { InfraProject, CreateProjectInput } from '../types/projects';
import { MOCK_PROJECTS } from '../data/projectsData';
import { calculateProjectMetrics } from '../utils/riskCalculationEngine';

interface ProjectState {
  projects: InfraProject[];
  addProject: (input: CreateProjectInput) => InfraProject;
  getProject: (id: string) => InfraProject | undefined;
  resetProjects: () => void;
}

const STORAGE_KEY = 'infra_predict_projects_v1';

function loadInitialProjects(): InfraProject[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure any newly added mock projects in data are preserved
        const existingIds = new Set(parsed.map((p: InfraProject) => p.id));
        const combined = [...parsed];
        MOCK_PROJECTS.forEach(mockP => {
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

function saveProjects(projects: InfraProject[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save projects to localStorage', err);
  }
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: loadInitialProjects(),

  addProject: (input: CreateProjectInput): InfraProject => {
    const currentProjects = get().projects;
    const newProject = calculateProjectMetrics(input, currentProjects);
    
    // Add to the top of the list so it appears immediately
    const updatedProjects = [newProject, ...currentProjects];
    saveProjects(updatedProjects);
    set({ projects: updatedProjects });

    return newProject;
  },

  getProject: (id: string): InfraProject | undefined => {
    return get().projects.find((p) => p.id === id || p.code === id);
  },

  resetProjects: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ projects: [...MOCK_PROJECTS] });
  },
}));
