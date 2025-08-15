export interface PortfolioProject {
  id: string;
  type: 'personal' | 'professional';
  frameworks: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  // Personal Projects
  {
    id: 'academicSystem',
    type: 'personal',
    frameworks: ['Angular', 'TypeScript', 'Node.js', 'PostgreSQL', 'Bootstrap'],
    images: [
      'https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg',
      'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg'
    ],
    githubUrl: 'https://github.com/Miguel-EMC/academic-system'
  },
  {
    id: 'ecommerce',
    type: 'personal',
    frameworks: ['React', 'Next.js', 'Stripe', 'MongoDB', 'Tailwind CSS'],
    images: [
      'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg'
    ],
    githubUrl: 'https://github.com/Miguel-EMC/ecommerce-app',
    liveUrl: 'https://ecommerce-demo.vercel.app'
  },
  {
    id: 'taskApp',
    type: 'personal',
    frameworks: ['Flutter', 'Dart', 'Firebase', 'Provider', 'Material Design'],
    images: [
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg'
    ],
    githubUrl: 'https://github.com/Miguel-EMC/task-management-app'
  },
  {
    id: 'analyticsApp',
    type: 'personal',
    frameworks: ['Vue.js', 'D3.js', 'Python', 'FastAPI', 'Chart.js'],
    images: [
      'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg',
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
    ],
    githubUrl: 'https://github.com/Miguel-EMC/analytics-dashboard',
    liveUrl: 'https://analytics-demo.netlify.app'
  },
  
  // Professional Projects
  {
    id: 'asobanca',
    type: 'professional',
    frameworks: ['Laravel', 'Vue.js', 'MySQL', 'Redis', 'Docker'],
    images: [
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
    ],
    liveUrl: 'https://asobanca.fin.ec'
  },
  {
    id: 'munsterMind',
    type: 'professional',
    frameworks: ['Flutter', 'Firebase', 'TensorFlow Lite', 'Provider', 'Material Design'],
    images: [
      'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg',
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg'
    ],
    liveUrl: 'https://munster-mind.app'
  },
  {
    id: 'conafis',
    type: 'professional',
    frameworks: ['Angular', 'NestJS', 'PostgreSQL', 'Kubernetes', 'Redis'],
    images: [
      'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg'
    ],
    liveUrl: 'https://conafis-saras.gov.ec'
  },
  {
    id: 'billusos',
    type: 'professional',
    frameworks: ['Django', 'React', 'PostgreSQL', 'Celery', 'Redis'],
    images: [
      'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg',
      'https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg'
    ],
    liveUrl: 'https://billusos.com'
  }
];