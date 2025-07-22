import { Component, OnInit, HostListener } from '@angular/core';
import { NgClass, NgForOf, NgIf } from "@angular/common";

interface Experience {
  title: string;
  subtitle: string;
  location: string;
  date: string;
  tasks: string[];
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
  imports: [NgClass, NgForOf, NgIf],
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {
  experiences: Experience[] = [
    {
      title: 'Full Stack Developer',
      subtitle: 'Lateral Business Thinking | Innovate Empresarial Solutions',
      location: 'Quito, Ecuador',
      date: 'Jun 2024 - Actualidad',
      tasks: [
        'Desarrollo de interfaces web dinámicas con Angular y TypeScript, mejorando la experiencia de usuario en un 40%',
        'Implementación de arquitecturas escalables con microservicios usando Node.js y Docker',
        'Liderazgo en el desarrollo del aplicativo móvil Münster Mind con Flutter y Firebase',
        'Optimización de bases de datos PostgreSQL, reduciendo tiempos de consulta en un 35%'
      ]
    },
    {
      title: 'Desarrollador de Software',
      subtitle: 'Freelance',
      location: 'Quito, Ecuador',
      date: 'Nov 2023 - Oct 2024',
      tasks: [
        'Desarrollo full-stack de la plataforma ASOBANCA con Laravel y Vue.js para 15+ instituciones financieras',
        'Mejora continua del aplicativo Billusos, implementando nuevas funcionalidades con Python y Django',
        'Creación de APIs RESTful robustas y documentación técnica completa',
        'Gestión de proyectos web personalizados con metodologías ágiles, entregando el 100% a tiempo'
      ]
    },
    {
      title: 'Full Stack Developer Jr',
      subtitle: 'Centro Ecuatoriano de Eficiencia de Recursos',
      location: 'Quito, Ecuador',
      date: 'Ene 2023 - Sep 2023',
      tasks: [
        'Maquetación responsive de interfaces cliente para CONAFIS SARAS con HTML5, CSS3 y JavaScript',
        'Configuración y optimización de entornos de desarrollo para equipos multidisciplinarios',
        'Administración de bases de datos SQL Server y generación de scripts automatizados',
        'Implementación de mejores prácticas de desarrollo y control de versiones con Git'
      ]
    }
  ];

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

  visibleItems: boolean[] = [];

  ngOnInit() {
    this.visibleItems = new Array(this.experiences.length).fill(false);
    setTimeout(() => this.onWindowScroll(), 100);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
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
}