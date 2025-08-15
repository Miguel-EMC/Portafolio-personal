import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, Router } from "@angular/router";
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { AboutMeComponent } from '../contact/about-me/about-me.component';
import { SkillsComponent } from '../resume/components/skills/skills.component';
import { EducationComponent } from '../resume/components/education/education.component';
import { CurriculumComponent } from '../resume/components/curriculum/curriculum.component';
import { PortafolioComponent } from "../portfolio/portfolio/portafolio.component";
import { ContactsComponent } from '../contact/contacts/contacts.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterLink,
    AboutMeComponent,
    SkillsComponent,
    EducationComponent,
    CurriculumComponent,
    PortafolioComponent,
    ContactsComponent
  ],
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideInScale', [
      transition(':enter', [
        style({
          transform: 'scale(0.7) translateY(-50px)',
          opacity: 0
        }),
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({
            transform: 'scale(1) translateY(0)',
            opacity: 1
          })
        )
      ]),
      transition(':leave', [
        animate('300ms ease-in',
          style({
            transform: 'scale(0.8) translateY(20px)',
            opacity: 0
          })
        )
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  // Typing animation
  currentRole = '';
  isTyping = false;
  private typingInterval: any;
  private roles = [
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Mobile Developer'
  ];
  private currentRoleIndex = 0;
  activeCard = 'code';

  // Featured projects for compact portfolio
  featuredProjects = [
    {
      title: 'Plataforma ASOBANCA',
      description: 'Sistema integral para instituciones financieras con módulos de gestión completos.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      tech: ['Laravel', 'Vue.js', 'MySQL'],
      liveUrl: 'https://asobanca-demo.com',
      githubUrl: null
    },
    {
      title: 'Münster Mind App',
      description: 'Aplicación móvil para entrenamiento mental y cognitivo con gamificación.',
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg',
      tech: ['Flutter', 'Firebase', 'TensorFlow'],
      liveUrl: 'https://munster-mind.app',
      githubUrl: null
    },
    {
      title: 'Sistema CONAFIS SARAS',
      description: 'Plataforma gubernamental para gestión de recursos y análisis estadístico.',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
      tech: ['Angular', 'NestJS', 'PostgreSQL'],
      liveUrl: 'https://conafis-saras.gov.ec',
      githubUrl: null
    }
  ];

  // Detailed data for tabs
  educationItems = [
    {
      icon: 'bi bi-mortarboard-fill',
      title: 'Ingeniería en Ciencias de la Computación',
      institution: 'Escuela Politécnica Nacional',
      date: 'Actualidad',
      description: 'Formación integral en ciencias de la computación con énfasis en desarrollo de software, algoritmos avanzados, inteligencia artificial y análisis de sistemas complejos.',
      achievements: [
        'Especialización en Algoritmos y Estructuras de Datos Avanzadas',
        'Proyectos de Machine Learning y Deep Learning',
        'Desarrollo de aplicaciones web full-stack',
        'Participación en competencias de programación'
      ]
    },
    {
      icon: 'bi bi-code-slash',
      title: 'Tecnología Superior en Desarrollo de Software',
      institution: 'Escuela Politécnica Nacional',
      date: '2020 - 2023',
      description: 'Formación técnica especializada en desarrollo de aplicaciones web y móviles, bases de datos, metodologías ágiles y arquitecturas de software modernas.',
      achievements: [
        'Desarrollo de más de 15 proyectos web completos',
        'Dominio de frameworks modernos (Angular, React, Vue.js)',
        'Implementación de APIs RESTful y microservicios',
        'Certificación en metodologías ágiles (Scrum)'
      ]
    },
    {
      icon: 'bi bi-book',
      title: 'Bachillerato General Unificado',
      institution: 'Unidad Educativa Leopoldo Mercado',
      date: '2013 - 2019',
      description: 'Educación secundaria con especialización en ciencias exactas, matemáticas avanzadas y fundamentos de programación que sentaron las bases para mi carrera tecnológica.',
      achievements: [
        'Graduado con honores en Ciencias Exactas',
        'Participación en olimpiadas de matemáticas',
        'Primer contacto con programación en Python',
        'Liderazgo estudiantil y trabajo en equipo'
      ]
    }
  ];

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


  // Skill Areas Dashboard
skillAreas = [
  {
    emoji: '🎨',
    title: 'Frontend',
    description: 'Interfaces modernas y experiencias de usuario excepcionales',
    color: '#A29BFE',
    technologies: ['Angular', 'React', 'Vue.js', 'HTML5/CSS3', 'Tailwind CSS'],
    detailedTechs: [
      { name: 'Angular', mastery: 7 },
      { name: 'HTML5/CSS3', mastery: 7 },
      { name: 'Tailwind CSS', mastery: 6 },
      { name: 'React', mastery: 4 },
      { name: 'Vue.js', mastery: 4 }
    ]
  },
  {
    emoji: '⚙️',
    title: 'Backend',
    description: 'APIs robustas y arquitecturas escalables',
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
    emoji: '📱',
    title: 'Mobile',
    description: 'Aplicaciones móviles multiplataforma innovadoras',
    color: '#45B7D1',
    technologies: ['Flutter', 'React Native', 'PWA', 'Firebase'],
    detailedTechs: [
      { name: 'Flutter', mastery: 6 },
      { name: 'React Native', mastery: 4 },
      { name: 'Firebase', mastery: 6 }
    ]
  },
  {
    emoji: '🌐',
    title: 'Redes & DevOps',
    description: 'Infraestructura cloud y administración de sistemas',
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
    emoji: '💻',
    title: 'Lenguajes de Programación',
    description: 'Base sólida en múltiples lenguajes para distintos entornos',
    color: '#1ad1ffff',
    technologies: ['TypeScript', 'Python', 'Dart'],
    detailedTechs: [
      { name: 'Python', mastery: 8 },
      { name: 'TypeScript', mastery: 7 },
      { name: 'JavaScript', mastery: 7 },
      { name: 'Dart', mastery: 6 },
      { name: 'PHP', mastery: 6 },
      // { name: 'Golang', mastery: 6 },
      { name: 'Java', mastery: 3 },
      { name: 'C++/C', mastery: 3  }
    ]
  },
  {
    emoji: '🗄️',
    title: 'Bases de Datos',
    description: 'Almacenamiento y gestión eficiente de datos',
    color: '#836c42ff',
    technologies: ['PostgreSQL', 'MySQL'],
    detailedTechs: [
      { name: 'PostgreSQL', mastery: 7 },
      { name: 'MySQL', mastery: 7 }
    ]
  },
  // { // emoji: '🔒', // title: 'Hacking Ético', // description: 'Ciberseguridad y pruebas de penetración', // color: '#FD79A8', // technologies: ['Kali Linux', 'Metasploit', 'Burp Suite', 'Nmap'], // detailedTechs: [ // { name: 'Kali Linux', mastery: 3 }, // { name: 'Metasploit', mastery: 2 }, // { name: 'Burp Suite', mastery: 2 }, // { name: 'Nmap', mastery: 3 }, // { name: 'OWASP', mastery: 3 } // ] // }
  // { // emoji: '🤖', // title: 'IA & Machine Learning', // description: 'Inteligencia artificial y análisis de datos avanzado', // color: '#96CEB4', // technologies: ['TensorFlow', 'Python', 'Pandas', 'Scikit-learn'], // detailedTechs: [ // { name: 'TensorFlow', mastery: 3 }, // { name: 'Python ML', mastery: 3 }, // { name: 'Pandas', mastery: 3 }, // { name: 'NumPy', mastery: 3 }, // { name: 'Scikit-learn', mastery: 2 } // ] // },
];


  // Chart instances
  private skillsBarChartRoot?: am5.Root;

  // Tab management
  activeTab = 'skills';

  // Area selection management
  selectedArea: number | null = null;

  ngOnInit() {
    this.startTypingAnimation();
    this.initializeActiveCard();

    if (isPlatformBrowser(this.platformId)) {
      // Configurar scroll suave
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initializeCharts();
      }, 500);
    }
  }

  ngOnDestroy() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }

    // Dispose charts
    if (this.skillsBarChartRoot) {
      this.skillsBarChartRoot.dispose();
    }
  }

  scrollToSection(sectionId: string): void {
    if (isPlatformBrowser(this.platformId)) {
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
  }

  setActiveCard(cardType: string): void {
    this.activeCard = cardType;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  viewAllProjects(): void {
    this.router.navigate(['/portfolio']).then(() => {
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  private startTypingAnimation(): void {
    this.typeText(this.roles[this.currentRoleIndex]);
  }

  private typeText(text: string): void {
    this.currentRole = '';
    this.isTyping = true;
    let charIndex = 0;

    const typeChar = () => {
      if (charIndex < text.length) {
        this.currentRole += text.charAt(charIndex);
        charIndex++;
        this.cdr.markForCheck(); // Force change detection
        setTimeout(typeChar, 100);
      } else {
        this.isTyping = false;
        this.cdr.markForCheck(); // Force change detection
        setTimeout(() => {
          this.eraseText();
        }, 2000);
      }
    };

    typeChar();
  }

  private eraseText(): void {
    this.isTyping = true;
    const eraseChar = () => {
      if (this.currentRole.length > 0) {
        this.currentRole = this.currentRole.slice(0, -1);
        this.cdr.markForCheck(); // Force change detection
        setTimeout(eraseChar, 50);
      } else {
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
        setTimeout(() => {
          this.typeText(this.roles[this.currentRoleIndex]);
        }, 500);
      }
    };

    eraseChar();
  }

  private initializeActiveCard(): void {
    // Rotate active card every 3 seconds
    const cards = ['code', 'design', 'tech'];
    let cardIndex = 0;

    setInterval(() => {
      cardIndex = (cardIndex + 1) % cards.length;
      this.activeCard = cards[cardIndex];
    }, 3000);
  }

  // Area selection methods
  selectArea(index: number): void {
    this.selectedArea = index;
  }

  closeModal(): void {
    this.selectedArea = null;
  }

  getMasteryLabel(mastery: number): string {
    if ([1, 2].includes(mastery)) return 'Básico';
    if ([3, 4].includes(mastery)) return 'Intermedio';
    if ([5, 6].includes(mastery)) return 'Avanzado';
    if ([7, 8].includes(mastery)) return 'Experto';
    if ([9, 10].includes(mastery)) return 'Maestro';
    return 'Básico';
  }
  getExpertCount(areaIndex: number): number {
    return this.skillAreas[areaIndex].detailedTechs
      .filter(tech => [7, 8].includes(tech.mastery)).length;
  }

  getMasteryCount(areaIndex: number, level: number): number {
    return this.skillAreas[areaIndex].detailedTechs.filter(tech => tech.mastery === level).length;
  }

  // Dashboard utility methods - simplified

  getTotalExperience(): string {
    return '2+';
  }

  getSkillColor(level: number): string {
    if (level >= 90) return 'linear-gradient(135deg, #4CAF50, #45A049)';
    if (level >= 80) return 'linear-gradient(135deg, #2196F3, #1976D2)';
    if (level >= 70) return 'linear-gradient(135deg, #FF9800, #F57C00)';
    return 'linear-gradient(135deg, #9E9E9E, #757575)';
  }

  getExperienceEmoji(index: number): string {
    const emojis = ['🚀', '💻', '⚡'];
    return emojis[index] || '💼';
  }

  getEducationEmoji(index: number): string {
    const emojis = ['🎓', '💻', '📚'];
    return emojis[index] || '🎓';
  }

  // Chart initialization - removed for new design
  private initializeCharts(): void {
    // No charts needed for the new areas dashboard
  }
}
