import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { Project, Tool } from '../../interfaces/project.interface';
import { NgForOf, NgIf } from "@angular/common";
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [NavComponent, NgForOf, NgIf],
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class PortafolioComponent implements OnInit {
  selectedProject: Project | null = null;
  currentImageIndex: number = 0;
  activeFilter: string = 'all';

  personalProjects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Moderno',
      description: 'Plataforma de comercio electrónico completa con carrito de compras, pagos integrados y panel de administración.',
      images: [
        'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg'
      ],
      frameworks: ['Angular', 'TypeScript', 'Node.js', 'MongoDB'],
      githubUrl: 'https://github.com/Miguel-EMC/ecommerce-project',
      category: 'web',
      features: [
        'Autenticación de usuarios',
        'Carrito de compras dinámico',
        'Integración con pasarelas de pago',
        'Panel de administración',
        'Responsive design'
      ]
    },
    {
      id: 2,
      title: 'App de Gestión de Tareas',
      description: 'Aplicación móvil para gestión de tareas con sincronización en tiempo real y colaboración en equipo.',
      images: [
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
        'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg'
      ],
      frameworks: ['Flutter', 'Dart', 'Firebase'],
      githubUrl: 'https://github.com/Miguel-EMC/task-manager',
      category: 'mobile',
      features: [
        'Sincronización en tiempo real',
        'Colaboración en equipo',
        'Notificaciones push',
        'Modo offline',
        'Interfaz intuitiva'
      ]
    },
    {
      id: 3,
      title: 'Dashboard Analytics',
      description: 'Dashboard interactivo para visualización de datos con gráficos dinámicos y reportes personalizables.',
      images: [
        'https://images.pexels.com/photos/590020/pexels-photo-590020.jpg',
        'https://images.pexels.com/photos/265087/pexels-photo-265087.jpg'
      ],
      frameworks: ['React', 'D3.js', 'Python', 'PostgreSQL'],
      githubUrl: 'https://github.com/Miguel-EMC/analytics-dashboard',
      category: 'web',
      features: [
        'Visualización de datos en tiempo real',
        'Gráficos interactivos',
        'Reportes personalizables',
        'Exportación de datos',
        'API REST integrada'
      ]
    }
  ];

  professionalProjects: Project[] = [
    {
      id: 4,
      title: 'Sistema CONAFIS SARAS',
      description: 'Sistema integral de gestión financiera para instituciones públicas con módulos de presupuesto, contabilidad y reportes.',
      images: [
        'https://images.pexels.com/photos/265087/pexels-photo-265087.jpg',
        'https://images.pexels.com/photos/590020/pexels-photo-590020.jpg'
      ],
      frameworks: ['Angular', 'Java', 'Spring Boot', 'Oracle'],
      liveUrl: 'https://conafis-demo.example.com',
      category: 'web',
      features: [
        'Gestión de presupuestos',
        'Módulo de contabilidad',
        'Reportes financieros',
        'Control de usuarios',
        'Auditoría de transacciones'
      ]
    },
    {
      id: 5,
      title: 'Plataforma ASOBANCA',
      description: 'Plataforma web para la Asociación de Bancos del Ecuador con funcionalidades de gestión de miembros y comunicaciones.',
      images: [
        'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
        'https://images.pexels.com/photos/265087/pexels-photo-265087.jpg'
      ],
      frameworks: ['Vue.js', 'Laravel', 'MySQL', 'Docker'],
      liveUrl: 'https://asobanca-platform.example.com',
      category: 'web',
      features: [
        'Gestión de miembros',
        'Sistema de comunicaciones',
        'Portal de noticias',
        'Eventos y calendario',
        'Documentos compartidos'
      ]
    },
    {
      id: 6,
      title: 'App Münster Mind',
      description: 'Aplicación móvil innovadora para entrenamiento mental y mejora cognitiva con ejercicios personalizados.',
      images: [
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
        'https://images.pexels.com/photos/590020/pexels-photo-590020.jpg'
      ],
      frameworks: ['Flutter', 'Firebase', 'TensorFlow', 'Cloud Functions'],
      category: 'mobile',
      features: [
        'Ejercicios cognitivos personalizados',
        'Seguimiento de progreso',
        'Inteligencia artificial integrada',
        'Gamificación',
        'Análisis de rendimiento'
      ]
    }
  ];

  tools: Tool[] = [
    { name: 'Angular', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
    { name: 'React', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Vue.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
    { name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'Node.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Java', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'Flutter', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
    { name: 'Dart', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
    { name: 'MongoDB', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'MySQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'PostgreSQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Firebase', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    { name: 'Docker', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Laravel', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg' },
    { name: 'Spring Boot', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { name: 'TensorFlow', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'D3.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg' },
    { name: 'Oracle', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg' }
  ];

  ngOnInit(): void {
    // Inicialización del componente
  }

  showDetails(project: Project): void {
    this.selectedProject = project;
    this.currentImageIndex = 0;
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
  }

  closeDetails(): void {
    this.selectedProject = null;
    document.body.style.overflow = ''; // Restaurar scroll del body
  }

  getToolIcon(toolName: string): string {
    const tool = this.tools.find(t => t.name === toolName);
    return tool ? tool.iconUrl : '';
  }

  nextImage(): void {
    if (this.selectedProject && this.selectedProject.images.length > 1) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.selectedProject.images.length;
    }
  }

  prevImage(): void {
    if (this.selectedProject && this.selectedProject.images.length > 1) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.selectedProject.images.length) % this.selectedProject.images.length;
    }
  }

  goToImage(index: number): void {
    this.currentImageIndex = index;
  }

  filterProjects(category: string): void {
    this.activeFilter = category;
    
    // Actualizar clases activas de los botones
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const activeButton = document.querySelector(`[onclick*="${category}"]`) as HTMLElement;
    if (activeButton) {
      activeButton.classList.add('active');
    }
  }

  shouldShowSection(type: 'personal' | 'professional'): boolean {
    return this.activeFilter === 'all' || 
           this.activeFilter === type ||
           this.getFilteredProjects(type).length > 0;
  }

  getFilteredProjects(type: 'personal' | 'professional'): Project[] {
    const projects = type === 'personal' ? this.personalProjects : this.professionalProjects;
    
    if (this.activeFilter === 'all' || this.activeFilter === type) {
      return projects;
    }
    
    return projects.filter(project => project.category === this.activeFilter);
  }

  getAllProjects(): Project[] {
    return [...this.personalProjects, ...this.professionalProjects];
  }
}