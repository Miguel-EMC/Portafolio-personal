export interface Project {
  id: string;
  image: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  type?: string;
}

export const featuredProjects: Project[] = [
  {
    id: 'asobanca',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    tech: ['Laravel', 'Vue.js', 'MySQL'],
    liveUrl: 'https://asobanca-demo.com',
    githubUrl: undefined,
    type: 'web'
  },
  {
    id: 'munsterMind',
    image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg',
    tech: ['Flutter', 'Firebase', 'TensorFlow'],
    liveUrl: 'https://munster-mind.app',
    githubUrl: undefined,
    type: 'mobile'
  },
  {
    id: 'conafis',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
    tech: ['Angular', 'NestJS', 'PostgreSQL'],
    liveUrl: 'https://conafis-saras.gov.ec',
    githubUrl: undefined,
    type: 'web'
  }
];