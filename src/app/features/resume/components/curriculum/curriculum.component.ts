import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

// Data imports
import { experiences, type Experience } from '../../../../core/data/experience.data';


interface TechSkill {
  name: string;
  icon: string;
  level: number;
}

interface Technology {
  name: string;
  level: number;
}

interface TechCategory {
  name: string;
  icon: string;
  technologies: Technology[];
}

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [NgClass, NgForOf, NgIf, TranslateModule],
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  experiences: Experience[] = experiences;

  techStack: TechCategory[] = [
    {
      name: 'Frontend Development',
      icon: 'bi bi-palette',
      technologies: [
        { name: 'Angular', level: 95 },
        { name: 'React', level: 85 },
        { name: 'Vue.js', level: 80 },
        { name: 'TypeScript', level: 90 },
        { name: 'JavaScript', level: 95 },
        { name: 'HTML5/CSS3', level: 95 }
      ]
    },
    {
      name: 'Backend Development',
      icon: 'bi bi-server',
      technologies: [
        { name: 'Node.js', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'Django', level: 80 },
        { name: 'Laravel', level: 85 },
        { name: 'PHP', level: 80 },
        { name: 'Express.js', level: 85 }
      ]
    },
    {
      name: 'Bases de Datos',
      icon: 'bi bi-database',
      technologies: [
        { name: 'PostgreSQL', level: 90 },
        { name: 'MySQL', level: 85 },
        { name: 'MongoDB', level: 80 },
        { name: 'Firebase', level: 85 },
        { name: 'SQL Server', level: 75 },
        { name: 'Redis', level: 70 }
      ]
    },
    {
      name: 'DevOps & Cloud',
      icon: 'bi bi-cloud',
      technologies: [
        { name: 'Docker', level: 85 },
        { name: 'AWS', level: 75 },
        { name: 'Git', level: 95 },
        { name: 'Linux', level: 80 },
        { name: 'Nginx', level: 75 },
        { name: 'Jenkins', level: 70 }
      ]
    },
    {
      name: 'Mobile Development',
      icon: 'bi bi-phone',
      technologies: [
        { name: 'Flutter', level: 85 },
        { name: 'Dart', level: 85 },
        { name: 'React Native', level: 75 },
        { name: 'PWA', level: 80 }
      ]
    },
    {
      name: 'Herramientas & Metodologías',
      icon: 'bi bi-tools',
      technologies: [
        { name: 'Scrum/Agile', level: 90 },
        { name: 'Figma', level: 85 },
        { name: 'Jira', level: 80 },
        { name: 'Postman', level: 90 },
        { name: 'VS Code', level: 95 },
        { name: 'Clean Code', level: 85 }
      ]
    }
  ];

  // Simplified tech skills for the compact section
  techSkills: TechSkill[] = [
    { name: 'Angular', icon: 'bi bi-triangle', level: 95 },
    { name: 'React', icon: 'bi bi-atom', level: 85 },
    { name: 'Node.js', icon: 'bi bi-server', level: 90 },
    { name: 'Python', icon: 'bi bi-filetype-py', level: 85 },
    { name: 'TypeScript', icon: 'bi bi-braces', level: 90 },
    { name: 'PostgreSQL', icon: 'bi bi-database', level: 90 },
    { name: 'Docker', icon: 'bi bi-box-seam', level: 85 },
    { name: 'Flutter', icon: 'bi bi-phone', level: 85 },
    { name: 'Laravel', icon: 'bi bi-boxes', level: 85 },
    { name: 'MongoDB', icon: 'bi bi-database-down', level: 80 },
    { name: 'Vue.js', icon: 'bi bi-lightning', level: 80 },
    { name: 'AWS', icon: 'bi bi-cloud', level: 75 }
  ];

  visibleItems: boolean[] = [];

  ngOnInit() {
    this.visibleItems = new Array(this.experiences.length).fill(false);
    setTimeout(() => this.onWindowScroll(), 100);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    this.experiences.forEach((_, index) => {
      const element = document.querySelector(`.timeline-item:nth-child(${index + 1})`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
          this.visibleItems[index] = true;
        }
      }
    });
  }

  isVisible(index: number): boolean {
    return this.visibleItems[index];
  }

  scrollToSection(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80;
      const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  getPositionLevel(title: string): string {
    if (title.includes('Full Stack Developer') && !title.includes('Jr')) {
      return 'Senior Level';
    } else if (title.includes('Jr')) {
      return 'Junior Level';
    } else if (title.includes('Desarrollador')) {
      return 'Mid Level';
    }
    return 'Professional';
  }

  calculateDuration(dateRange: string): string {
    if (dateRange.includes('Actualidad')) {
      const startDate = new Date('2024-06-01');
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
      return `${diffMonths} meses`;
    } else if (dateRange.includes('Nov 2023 - Oct 2024')) {
      return '11 meses';
    } else if (dateRange.includes('Ene 2023 - Sep 2023')) {
      return '9 meses';
    }
    return '1 año';
  }

  getTechIcons(title: string): string[] {
    if (title.includes('Full Stack Developer')) {
      return ['bi bi-triangle', 'bi bi-server', 'bi bi-database'];
    } else if (title.includes('Desarrollador')) {
      return ['bi bi-code-slash', 'bi bi-palette', 'bi bi-gear'];
    }
    return ['bi bi-code-slash', 'bi bi-laptop', 'bi bi-tools'];
  }

  getImpactMetric(task: string): string | null {
    if (task.includes('40%')) return '+40% UX';
    if (task.includes('35%')) return '+35% Performance';
    if (task.includes('15+')) return '15+ Instituciones';
    if (task.includes('100%')) return '100% On Time';
    return null;
  }

  getTechIcon(techName: string): string {
    const icons: { [key: string]: string } = {
      'Angular': 'bi bi-triangle',
      'React': 'bi bi-atom',
      'Vue.js': 'bi bi-lightning',
      'TypeScript': 'bi bi-braces',
      'JavaScript': 'bi bi-braces',
      'HTML5/CSS3': 'bi bi-filetype-html',
      'Node.js': 'bi bi-server',
      'Python': 'bi bi-filetype-py',
      'Django': 'bi bi-diagram-3',
      'Laravel': 'bi bi-boxes',
      'PHP': 'bi bi-filetype-php',
      'Express.js': 'bi bi-server',
      'PostgreSQL': 'bi bi-database',
      'MySQL': 'bi bi-database-fill',
      'MongoDB': 'bi bi-database-down',
      'Firebase': 'bi bi-fire',
      'SQL Server': 'bi bi-database-check',
      'Redis': 'bi bi-database-gear',
      'Docker': 'bi bi-box-seam',
      'AWS': 'bi bi-cloud',
      'Git': 'bi bi-git',
      'Linux': 'bi bi-terminal',
      'Nginx': 'bi bi-server',
      'Jenkins': 'bi bi-gear',
      'Flutter': 'bi bi-phone',
      'Dart': 'bi bi-lightning-charge',
      'React Native': 'bi bi-phone-landscape',
      'PWA': 'bi bi-app',
      'Scrum/Agile': 'bi bi-kanban',
      'Figma': 'bi bi-pencil-square',
      'Jira': 'bi bi-kanban',
      'Postman': 'bi bi-send',
      'VS Code': 'bi bi-code-square',
      'Clean Code': 'bi bi-code-slash'
    };
    return icons[techName] || 'bi bi-code-slash';
  }

  getLevelText(level: number): string {
    if (level >= 90) return 'Experto';
    if (level >= 80) return 'Avanzado';
    if (level >= 70) return 'Intermedio';
    return 'Básico';
  }

  getTotalExperience(): number {
    return 2;
  }

  getTotalProjects(): number {
    return 25;
  }

  getTotalTechnologies(): number {
    return this.techStack.reduce((total, category) => total + category.technologies.length, 0);
  }

  getTechForExperience(index: number): string[] {
    const techByExperience = [
      ['Angular', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
      ['Laravel', 'Vue.js', 'Python', 'Django', 'MySQL'],
      ['HTML5', 'CSS3', 'JavaScript', 'SQL Server', 'Git']
    ];
    return techByExperience[index] || [];
  }

  getFrontendTechs(): TechSkill[] {
    return [
      { name: 'Angular', icon: 'bi bi-triangle', level: 95 },
      { name: 'React', icon: 'bi bi-atom', level: 85 },
      { name: 'Vue.js', icon: 'bi bi-lightning', level: 80 },
      { name: 'TypeScript', icon: 'bi bi-braces', level: 90 }
    ];
  }

  getBackendTechs(): TechSkill[] {
    return [
      { name: 'Node.js', icon: 'bi bi-server', level: 90 },
      { name: 'Python', icon: 'bi bi-filetype-py', level: 85 },
      { name: 'Laravel', icon: 'bi bi-boxes', level: 85 },
      { name: 'Django', icon: 'bi bi-diagram-3', level: 80 }
    ];
  }

  getDatabaseTechs(): TechSkill[] {
    return [
      { name: 'PostgreSQL', icon: 'bi bi-database', level: 90 },
      { name: 'MySQL', icon: 'bi bi-database-fill', level: 85 },
      { name: 'MongoDB', icon: 'bi bi-database-down', level: 80 },
      { name: 'Firebase', icon: 'bi bi-fire', level: 85 }
    ];
  }

  getDevOpsTechs(): TechSkill[] {
    return [
      { name: 'Docker', icon: 'bi bi-box-seam', level: 85 },
      { name: 'Git', icon: 'bi bi-git', level: 95 },
      { name: 'AWS', icon: 'bi bi-cloud', level: 75 },
      { name: 'Linux', icon: 'bi bi-terminal', level: 80 }
    ];
  }

  getFeaturedTechs(): any[] {
    return [
      { name: 'Angular', icon: 'bi bi-triangle', level: 95, category: 'Frontend' },
      { name: 'Node.js', icon: 'bi bi-server', level: 90, category: 'Backend' },
      { name: 'PostgreSQL', icon: 'bi bi-database', level: 90, category: 'Database' },
      { name: 'Docker', icon: 'bi bi-box-seam', level: 85, category: 'DevOps' }
    ];
  }

  getTechCategories(): any[] {
    return [
      {
        name: 'Frontend',
        icon: 'bi bi-palette',
        technologies: [
          { name: 'React', level: 85 },
          { name: 'Vue.js', level: 80 },
          { name: 'TypeScript', level: 90 }
        ]
      },
      {
        name: 'Backend',
        icon: 'bi bi-server',
        technologies: [
          { name: 'Python', level: 85 },
          { name: 'Laravel', level: 85 },
          { name: 'Django', level: 80 }
        ]
      },
      {
        name: 'Database',
        icon: 'bi bi-database',
        technologies: [
          { name: 'MySQL', level: 85 },
          { name: 'MongoDB', level: 80 },
          { name: 'Firebase', level: 85 }
        ]
      },
      {
        name: 'Tools',
        icon: 'bi bi-tools',
        technologies: [
          { name: 'Git', level: 95 },
          { name: 'AWS', level: 75 },
          { name: 'Linux', level: 80 }
        ]
      }
    ];
  }

  getTotalTechCount(): number {
    return 20;
  }

  getPrimaryTechs(): any[] {
    return [
      { name: 'Angular', icon: 'bi bi-triangle', level: 95 },
      { name: 'Node.js', icon: 'bi bi-server', level: 90 },
      { name: 'PostgreSQL', icon: 'bi bi-database', level: 90 },
      { name: 'TypeScript', icon: 'bi bi-braces', level: 90 }
    ];
  }

  getSecondaryTechs(): any[] {
    return [
      { name: 'React', icon: 'bi bi-atom', level: 85 },
      { name: 'Vue.js', icon: 'bi bi-lightning', level: 80 },
      { name: 'Python', icon: 'bi bi-filetype-py', level: 85 },
      { name: 'Laravel', icon: 'bi bi-boxes', level: 85 },
      { name: 'Django', icon: 'bi bi-diagram-3', level: 80 },
      { name: 'MySQL', icon: 'bi bi-database-fill', level: 85 },
      { name: 'MongoDB', icon: 'bi bi-database-down', level: 80 },
      { name: 'Firebase', icon: 'bi bi-fire', level: 85 }
    ];
  }

  getToolsTechs(): any[] {
    return [
      { name: 'Docker', icon: 'bi bi-box-seam', level: 85 },
      { name: 'Git', icon: 'bi bi-git', level: 95 },
      { name: 'AWS', icon: 'bi bi-cloud', level: 75 },
      { name: 'Linux', icon: 'bi bi-terminal', level: 80 },
      { name: 'Figma', icon: 'bi bi-pencil-square', level: 85 },
      { name: 'Postman', icon: 'bi bi-send', level: 90 }
    ];
  }

  getExperienceIcon(index: number): string {
    const icons = [
      'bi bi-star-fill',        // Experiencia actual - estrella
      'bi bi-code-slash',       // Freelance - código
      'bi bi-rocket-takeoff'    // Primera experiencia - cohete
    ];
    return icons[index] || 'bi bi-briefcase-fill';
  }

  getSkillCategories(): any[] {
    return [
      {
        name: 'Software Engineering',
        icon: 'bi bi-gear-fill',
        skills: [
          { name: 'Clean Code', level: 85 },
          { name: 'Design Patterns', level: 80 },
          { name: 'Scrum/Agile', level: 90 },
          { name: 'Git', level: 95 },
          { name: 'Testing', level: 80 },
          { name: 'API Design', level: 85 }
        ]
      },
      {
        name: 'Programming Languages',
        icon: 'bi bi-code-slash',
        skills: [
          { name: 'JavaScript', level: 95 },
          { name: 'TypeScript', level: 90 },
          { name: 'Python', level: 85 },
          { name: 'PHP', level: 80 },
          { name: 'Dart', level: 85 },
          { name: 'SQL', level: 85 }
        ]
      },
      {
        name: 'Frameworks',
        icon: 'bi bi-layers',
        skills: [
          { name: 'Angular', level: 95 },
          { name: 'React', level: 85 },
          { name: 'Vue.js', level: 80 },
          { name: 'Django', level: 80 },
          { name: 'Laravel', level: 85 },
          { name: 'Flutter', level: 85 },
          { name: 'Express.js', level: 85 }
        ]
      },
      {
        name: 'Technologies',
        icon: 'bi bi-stack',
        skills: [
          { name: 'Node.js', level: 90 },
          { name: 'PostgreSQL', level: 90 },
          { name: 'MySQL', level: 85 },
          { name: 'MongoDB', level: 80 },
          { name: 'Docker', level: 85 },
          { name: 'AWS', level: 75 },
          { name: 'Firebase', level: 85 },
          { name: 'Redis', level: 70 }
        ]
      }
    ];
  }

  getCategoryOverview(): any[] {
    return [
      { name: 'Software Engineering', icon: 'bi bi-gear-fill', level: 86 },
      { name: 'Programming Languages', icon: 'bi bi-code-slash', level: 88 },
      { name: 'Frameworks', icon: 'bi bi-layers', level: 84 },
      { name: 'Technologies', icon: 'bi bi-stack', level: 85 }
    ];
  }
}