import { Component, OnInit, HostListener } from '@angular/core';
import { NgClass, NgForOf } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    RouterLink
  ],
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {
  // Datos de Experiencia
  experiences = [
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
        'Gestión de proyectos web personalizados con metodologías ágiles'
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

  // Datos de Habilidades
  skills = [
    {
      category: 'Frontend Development',
      items: [
        'Angular', 'React', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SASS/SCSS',
        'Bootstrap', 'Tailwind CSS', 'Material UI', 'Responsive Design'
      ]
    },
    {
      category: 'Backend Development',
      items: [
        'Node.js', 'Python', 'Django', 'Laravel', 'PHP', 'NestJS', 'Express.js',
        'RESTful APIs', 'GraphQL', 'Microservices'
      ]
    },
    {
      category: 'Bases de Datos',
      items: [
        'PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'SQL Server', 'Redis',
        'Database Design', 'Query Optimization'
      ]
    },
    {
      category: 'DevOps & Tools',
      items: [
        'Docker', 'Kubernetes', 'AWS', 'Git', 'GitHub Actions', 'Jenkins',
        'Linux', 'Bash', 'Nginx', 'Apache'
      ]
    },
    {
      category: 'Mobile Development',
      items: [
        'Flutter', 'Dart', 'React Native', 'Progressive Web Apps',
        'Mobile UI/UX', 'App Store Deployment'
      ]
    },
    {
      category: 'Soft Skills',
      items: [
        'Liderazgo de Equipos', 'Metodologías Ágiles', 'Scrum', 'Problem Solving',
        'Comunicación Efectiva', 'Mentoring', 'Code Review', 'Technical Writing'
      ]
    }
  ];

  visibleItems: boolean[] = [];

  ngOnInit() {
    this.visibleItems = new Array(this.experiences.length).fill(false);
    // Trigger initial check
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

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'Frontend Development': 'bi-palette',
      'Backend Development': 'bi-server',
      'Bases de Datos': 'bi-database',
      'DevOps & Tools': 'bi-gear',
      'Mobile Development': 'bi-phone',
      'Soft Skills': 'bi-people'
    };
    return icons[category] || 'bi-code-slash';
  }

  getSkillIcon(skill: string): string {
    const icons: { [key: string]: string } = {
      // Frontend
      'Angular': 'bi-triangle',
      'React': 'bi-atom',
      'Vue.js': 'bi-lightning',
      'TypeScript': 'bi-braces',
      'JavaScript': 'bi-braces',
      'HTML5': 'bi-filetype-html',
      'CSS3': 'bi-filetype-css',
      'SASS/SCSS': 'bi-palette2',
      'Bootstrap': 'bi-bootstrap',
      'Tailwind CSS': 'bi-wind',
      
      // Backend
      'Node.js': 'bi-server',
      'Python': 'bi-filetype-py',
      'Django': 'bi-diagram-3',
      'Laravel': 'bi-boxes',
      'PHP': 'bi-filetype-php',
      'NestJS': 'bi-nest',
      
      // Databases
      'PostgreSQL': 'bi-database',
      'MySQL': 'bi-database-fill',
      'MongoDB': 'bi-database-down',
      'Firebase': 'bi-fire',
      'SQL Server': 'bi-database-check',
      
      // DevOps
      'Docker': 'bi-box-seam',
      'Kubernetes': 'bi-diagram-3',
      'AWS': 'bi-cloud',
      'Git': 'bi-git',
      'Linux': 'bi-terminal',
      
      // Mobile
      'Flutter': 'bi-phone',
      'Dart': 'bi-lightning-charge',
      
      // Tools
      'Figma': 'bi-pencil-square',
      'Jira': 'bi-kanban',
      'Power BI': 'bi-bar-chart'
    };

    return icons[skill] || 'bi-code-slash';
  }
}