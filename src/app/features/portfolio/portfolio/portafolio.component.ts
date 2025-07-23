import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Project, Tool } from '../../../interfaces/project.interface';

@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95) translateY(20px)' }),
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ])
    ])
  ]
})
export class PortafolioComponent implements OnInit {
  activeFilter: 'all' | 'personal' | 'professional' = 'all';
  selectedProject: Project | null = null;
  currentImageIndex: number = 0;

  personalProjects: Project[] = [
    {
      id: 1,
      title: 'Sistema de Gestión Académica',
      description: 'Plataforma web completa para la gestión de estudiantes, profesores y cursos con dashboard administrativo y reportes en tiempo real.',
      images: [
        '/assets/img/img-01.jpg',
        '/assets/img/img-02.jpg'
      ],
      frameworks: ['Angular', 'TypeScript', 'Node.js', 'PostgreSQL', 'Bootstrap'],
      githubUrl: 'https://github.com/Miguel-EMC/academic-system',
      type: 'personal'
    },
    {
      id: 2,
      title: 'E-Commerce Moderno',
      description: 'Tienda online responsive con carrito de compras, pasarela de pagos, gestión de inventario y panel de administración.',
      images: [
        '/assets/img/img-01.jpg',
        '/assets/img/img-02.jpg'
      ],
      frameworks: ['React', 'Next.js', 'Stripe', 'MongoDB', 'Tailwind CSS'],
      githubUrl: 'https://github.com/Miguel-EMC/ecommerce-app',
      type: 'personal'
    },
    {
      id: 3,
      title: 'App de Gestión de Tareas',
      description: 'Aplicación móvil multiplataforma para gestión de proyectos y tareas con sincronización en tiempo real y colaboración en equipo.',
      images: [
        '/assets/img/img-01.jpg',
        '/assets/img/img-02.jpg'
      ],
      frameworks: ['Flutter', 'Dart', 'Firebase', 'Provider', 'Material Design'],
      githubUrl: 'https://github.com/Miguel-EMC/task-manager-app',
      type: 'personal'
    },
    {
      id: 4,
      title: 'Dashboard de Analytics',
      description: 'Panel de control interactivo con visualización de datos, gráficos dinámicos y reportes personalizables para análisis de negocio.',
      images: [
        '/assets/img/img-01.jpg',
        '/assets/img/img-02.jpg'
      ],
      frameworks: ['Vue.js', 'D3.js', 'Python', 'FastAPI', 'Chart.js'],
      githubUrl: 'https://github.com/Miguel-EMC/analytics-dashboard',
      type: 'personal'
    }
  ];

  professionalProjects: Project[] = [
    {
      id: 5,
      title: 'Plataforma ASOBANCA',
      description: 'Sistema integral para instituciones financieras con módulos de gestión de clientes, transacciones y reportes regulatorios.',
      images: [
        '/assets/img/img-01.jpg',
        '/assets/img/img-02.jpg'
      ],
      frameworks: ['Laravel', 'Vue.js', 'MySQL', 'Redis', 'Docker'],
      liveUrl: 'https://asobanca-demo.com',
      type: 'professional'
    },
    {
      id: 6,
      title: 'Münster Mind App',
      description: 'Aplicación móvil innovadora para entrenamiento mental y cognitivo con gamificación y seguimiento de progreso.',
      images: [
        '/assets/img/img-01.jpg',
        '/assets/img/img-02.jpg'
      ],
      frameworks: ['Flutter', 'Firebase', 'TensorFlow Lite', 'Provider', 'Hive'],
      liveUrl: 'https://munster-mind.app',
      type: 'professional'
    },
    {
      id: 7,
      title: 'Sistema CONAFIS SARAS',
      description: 'Plataforma gubernamental para gestión de recursos y análisis estadístico con alta disponibilidad y seguridad.',
      images: [
        '/assets/img/img-01.jpg',
        '/assets/img/img-02.jpg'
      ],
      frameworks: ['Angular', 'NestJS', 'PostgreSQL', 'Kubernetes', 'JWT'],
      liveUrl: 'https://conafis-saras.gov.ec',
      type: 'professional'
    },
    {
      id: 8,
      title: 'Billusos Platform',
      description: 'Plataforma de facturación electrónica y gestión empresarial con integración a servicios gubernamentales.',
      images: [
        '/assets/img/img-01.jpg',
        '/assets/img/img-02.jpg'
      ],
      frameworks: ['Django', 'React', 'PostgreSQL', 'Celery', 'AWS'],
      liveUrl: 'https://billusos.com',
      type: 'professional'
    }
  ];

  allProjects: Project[] = [];
  filteredProjects: Project[] = [];

  ngOnInit() {
    this.allProjects = [...this.personalProjects, ...this.professionalProjects];
    this.filteredProjects = this.allProjects;
  }

  setFilter(filter: 'all' | 'personal' | 'professional') {
    this.activeFilter = filter;
    
    switch (filter) {
      case 'personal':
        this.filteredProjects = this.personalProjects;
        break;
      case 'professional':
        this.filteredProjects = this.professionalProjects;
        break;
      default:
        this.filteredProjects = this.allProjects;
    }
  }

  showDetails(project: Project): void {
    this.selectedProject = project;
    this.currentImageIndex = 0;
    document.body.style.overflow = 'hidden';
  }

  closeDetails(): void {
    this.selectedProject = null;
    document.body.style.overflow = '';
  }

  nextImage(): void {
    if (this.selectedProject && this.selectedProject.images.length > 1) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.selectedProject.images.length;
    }
  }

  prevImage(): void {
    if (this.selectedProject && this.selectedProject.images.length > 1) {
      this.currentImageIndex = 
        (this.currentImageIndex - 1 + this.selectedProject.images.length) % this.selectedProject.images.length;
    }
  }

  getTechIcon(tech: string): string {
    const icons: { [key: string]: string } = {
      // Frontend Frameworks
      'Angular': 'bi-triangle',
      'React': 'bi-atom',
      'Vue.js': 'bi-lightning',
      'Next.js': 'bi-arrow-right-circle',
      
      // Languages
      'TypeScript': 'bi-braces',
      'JavaScript': 'bi-braces',
      'Python': 'bi-filetype-py',
      'Dart': 'bi-lightning-charge',
      'PHP': 'bi-filetype-php',
      
      // Backend
      'Node.js': 'bi-server',
      'Django': 'bi-diagram-3',
      'Laravel': 'bi-boxes',
      'NestJS': 'bi-hexagon',
      'FastAPI': 'bi-lightning',
      
      // Databases
      'PostgreSQL': 'bi-database',
      'MySQL': 'bi-database-fill',
      'MongoDB': 'bi-database-down',
      'Firebase': 'bi-fire',
      'Redis': 'bi-database-gear',
      
      // Mobile
      'Flutter': 'bi-phone',
      'React Native': 'bi-phone-landscape',
      
      // Styling
      'Bootstrap': 'bi-bootstrap',
      'Tailwind CSS': 'bi-wind',
      'Material Design': 'bi-palette',
      'CSS3': 'bi-filetype-css',
      'SASS': 'bi-palette2',
      
      // Tools & Services
      'Docker': 'bi-box-seam',
      'Kubernetes': 'bi-diagram-3',
      'AWS': 'bi-cloud',
      'Stripe': 'bi-credit-card',
      'JWT': 'bi-shield-check',
      'Chart.js': 'bi-bar-chart',
      'D3.js': 'bi-graph-up',
      'TensorFlow Lite': 'bi-cpu',
      
      // State Management
      'Provider': 'bi-arrow-repeat',
      'Redux': 'bi-arrow-clockwise',
      
      // Storage
      'Hive': 'bi-archive',
      'Celery': 'bi-gear'
    };

    return icons[tech] || 'bi-code-slash';
  }
}