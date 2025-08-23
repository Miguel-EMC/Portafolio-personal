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
    id: 'sinapsekEducation',
    type: 'personal',
    frameworks: ['Django', 'React', 'PostgreSQL', 'Docker'],
    images: [
      '/assets/img/sinapsekEducation.png',
      'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg'
    ],
    liveUrl: 'https://import-synapsek-plat-5b7i.bolt.host/'
  },
  
  // Professional Projects
  {
    id: 'asobanca',
    type: 'professional',
    frameworks: ['Laravel', 'Angular', 'PostgreSQL'],
    images: [
      '/assets/img/asobancaPlataforma.png',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
    ],
    liveUrl: 'https://plataformariesgos.app/'
  },
  {
    id: 'munsterMind',
    type: 'professional',
    frameworks: ['Flutter', 'PostgreSQL', 'NestJS'],
    images: [
      '/assets/img/munstermain.png',
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg'
    ],
    liveUrl: 'https://play.google.com/store/apps/details?id=io.munstermind.dev&pcampaignid=web_share'
  },
  {
    id: 'conafis',
    type: 'professional',
    frameworks: ['Laravel', 'Angular', 'PostgreSQL'],
    images: [
      '/assets/img/conafis.png',
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg'
    ],
    liveUrl: 'https://saras.finanzaspopulares.gob.ec/View/SARAS/index.php'
  },
  {
    id: 'billusos',
    type: 'professional',
    frameworks: ['Django', 'PostgreSQL', 'Docker', 'React Native'],
    images: [
      '/assets/img/billusos.png',
      'https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg'
    ],
    liveUrl: 'https://ecuador.billusos.com/#'
  }
];