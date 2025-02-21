// interfaces/project.interface.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  frameworks: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Tool {
  name: string;
  iconUrl: string;
}
