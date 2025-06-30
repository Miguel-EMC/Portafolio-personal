export interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  frameworks: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'web' | 'mobile' | 'desktop' | 'api';
  features?: string[];
  status?: 'completed' | 'in-progress' | 'planned';
  startDate?: string;
  endDate?: string;
  teamSize?: number;
  role?: string;
  challenges?: string[];
  technologies?: Technology[];
}

export interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'ai/ml';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Tool {
  name: string;
  iconUrl: string;
  category?: string;
}

export interface ProjectFilter {
  category: string;
  label: string;
  icon: string;
  count?: number;
}