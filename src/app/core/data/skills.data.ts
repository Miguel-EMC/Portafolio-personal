export interface TechSkill {
  name: string;
  mastery: number;
}

export interface SkillArea {
  id: string;
  emoji: string;
  color: string;
  technologies: string[];
  detailedTechs: TechSkill[];
}

export const skillAreas: SkillArea[] = [
  {
    id: 'frontend',
    emoji: '🎨',
    color: '#A29BFE',
    technologies: ['Angular', 'React', 'Vue.js', 'HTML5/CSS3', 'Tailwind CSS', 'Bootstrap'],
    detailedTechs: [
      { name: 'Angular', mastery: 7.5 },
      { name: 'HTML5/CSS3', mastery: 7 },
      { name: 'Tailwind CSS', mastery: 6 },
      { name: 'React', mastery: 6 },
      { name: 'Vue.js', mastery: 4 },
      { name: 'Bootstrap', mastery: 7 }
    ]
  },
  {
    id: 'backend',
    emoji: '⚙️',
    color: '#4ECDC4',
    technologies: ['Node.js', 'Laravel', 'Django', 'NestJS', 'Express.js'],
    detailedTechs: [
      { name: 'Django', mastery: 7 },
      { name: 'NestJS', mastery: 7 },
      { name: 'Laravel', mastery: 6 },
      { name: 'Node.js', mastery: 6 },
      { name: 'Express.js', mastery: 4 }
    ]
  },
  {
    id: 'mobile',
    emoji: '📱',
    color: '#45B7D1',
    technologies: ['Flutter', 'React Native', 'PWA', 'Firebase'],
    detailedTechs: [
      { name: 'Flutter', mastery: 6 },
      { name: 'React Native', mastery: 4 },
      { name: 'Firebase', mastery: 6 }
    ]
  },
  {
    id: 'devops',
    emoji: '🌐',
    color: '#74B9FF',
    technologies: ['Docker', 'AWS', 'Linux', 'Kubernetes', 'TerraForm', 'Nginx', 'Git'],
    detailedTechs: [
      { name: 'Linux', mastery: 8 },
      { name: 'Git', mastery: 8 },
      { name: 'Docker', mastery: 6 },
      { name: 'AWS', mastery: 4 },
      { name: 'TerraForm', mastery: 4 },
      { name: 'Nginx', mastery: 3 }
    ]
  },
  {
    id: 'languages',
    emoji: '💻',
    color: '#1ad1ffff',
    technologies: ['JavaScript', 'Python', 'TypeScript', 'PHP'],
    detailedTechs: [
      { name: 'Python', mastery: 8 },
      { name: 'JavaScript', mastery: 8 },
      { name: 'TypeScript', mastery: 7.5 },
      { name: 'PHP', mastery: 6.5 },
      { name: 'Dart', mastery: 6 },
      { name: 'Java', mastery: 3.5 },
      { name: 'C#', mastery: 2 },
      { name: 'C++/C', mastery: 3 }
    ]
  },
  {
    id: 'databases',
    emoji: '🗄️',
    color: '#836c42ff',
    technologies: ['PostgreSQL', 'MySQL'],
    detailedTechs: [
      { name: 'PostgreSQL', mastery: 7 },
      { name: 'MySQL', mastery: 7 }
    ]
  }
];