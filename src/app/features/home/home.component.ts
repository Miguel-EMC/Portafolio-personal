import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink, Router } from "@angular/router";
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

// Data imports
import { featuredProjects, type Project } from '../../core/data/projects.data';
import { experiences, type Experience } from '../../core/data/experience.data';
import { educationItems, type Education } from '../../core/data/education.data';
import { skillAreas, type SkillArea } from '../../core/data/skills.data';

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
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
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

  // Top skills for about section
  topSkills = ['Angular', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL'];

  // Main technologies for compact view with details
  mainTechs = [
    { name: 'Angular', level: 'Experto', years: '3+' },
    { name: 'TypeScript', level: 'Experto', years: '3+' },
    { name: 'Node.js', level: 'Avanzado', years: '2+' },
    { name: 'Python', level: 'Avanzado', years: '2+' },
    { name: 'PostgreSQL', level: 'Avanzado', years: '2+' },
    { name: 'Docker', level: 'Intermedio', years: '1+' }
  ];

  // Tech Stack for skills section
  techStack = [
    {
      name: 'Lenguajes',
      icon: 'bi-code-slash',
      technologies: [
        { name: 'TypeScript', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'PHP', level: 80 },
        { name: 'Java', level: 75 },
        { name: 'C#', level: 70 },
        { name: 'SQL', level: 85 },
        { name: 'HTML/CSS', level: 95 }
      ]
    },
    {
      name: 'Frontend',
      icon: 'bi-palette',
      technologies: [
        { name: 'Angular', level: 95 },
        { name: 'React', level: 80 },
        { name: 'Vue.js', level: 75 },
        { name: 'Next.js', level: 78 },
        { name: 'Tailwind', level: 90 },
        { name: 'Bootstrap', level: 85 },
        { name: 'Sass/SCSS', level: 88 },
        { name: 'Material UI', level: 82 }
      ]
    },
    {
      name: 'Backend',
      icon: 'bi-server',
      technologies: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'Laravel', level: 75 },
        { name: 'NestJS', level: 85 },
        { name: 'Express.js', level: 88 },
        { name: 'Django', level: 72 },
        { name: 'FastAPI', level: 75 },
        { name: 'Spring Boot', level: 68 }
      ]
    },
    {
      name: 'Database',
      icon: 'bi-database',
      technologies: [
        { name: 'PostgreSQL', level: 85 },
        { name: 'MySQL', level: 80 },
        { name: 'MongoDB', level: 70 },
        { name: 'Firebase', level: 75 },
        { name: 'Redis', level: 70 },
        { name: 'SQLite', level: 82 },
        { name: 'Supabase', level: 78 },
        { name: 'Oracle', level: 65 }
      ]
    },
    {
      name: 'DevOps',
      icon: 'bi-tools',
      technologies: [
        { name: 'Docker', level: 70 },
        { name: 'Git', level: 90 },
        { name: 'AWS', level: 65 },
        { name: 'Linux', level: 75 },
        { name: 'GitHub Actions', level: 72 },
        { name: 'Nginx', level: 68 },
        { name: 'Jenkins', level: 60 },
        { name: 'Kubernetes', level: 55 }
      ]
    }
  ];

  // Featured projects for compact portfolio
  featuredProjects: Project[] = featuredProjects;

  // Detailed data for tabs
  educationItems: Education[] = educationItems;

  experiences: Experience[] = experiences;


  // Skill Areas Dashboard
  skillAreas: SkillArea[] = skillAreas;


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

  getSkillColor(index: number): string {
    const colors = [
      '#14B8A6', // Turquoise
      '#06B6D4', // Cyan
      '#0EA5E9', // Sky
      '#3B82F6', // Blue
      '#6366F1', // Indigo
      '#8B5CF6', // Violet
      '#A855F7', // Purple
      '#D946EF', // Fuchsia
      '#EC4899', // Pink
      '#F43F5E'  // Rose
    ];
    return colors[index % colors.length];
  }

  getEducationColor(index: number): string {
    const educationColors = [
      '#3B82F6', // Blue
      '#6366F1', // Indigo  
      '#8B5CF6', // Violet
      '#A855F7'  // Purple
    ];
    return educationColors[index % educationColors.length];
  }

  getExperienceColor(index: number): string {
    const experienceColors = [
      '#14B8A6', // Turquoise
      '#06B6D4', // Cyan
      '#0EA5E9', // Sky
      '#3B82F6'  // Blue
    ];
    return experienceColors[index % experienceColors.length];
  }

  getExperienceGradient(index: number): string {
    const gradients = [
      'linear-gradient(135deg, rgba(20, 184, 166, 0.05), rgba(20, 184, 166, 0.02))',
      'linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(6, 182, 212, 0.02))',
      'linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(14, 165, 233, 0.02))',
      'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.02))'
    ];
    return gradients[index % gradients.length];
  }

  getExperienceEmoji(index: number): string {
    const emojis = ['🚀', '💻', '⚡'];
    return emojis[index] || '💼';
  }

  getEducationEmoji(index: number): string {
    const emojis = ['🎓', '💻', '📚'];
    return emojis[index] || '🎓';
  }

  // Método para obtener iconos de tecnologías
  getTechIcon(tech: string): string {
    const icons: { [key: string]: string } = {
      'Angular': 'bi-triangle',
      'React': 'bi-atom',
      'Vue.js': 'bi-lightning',
      'TypeScript': 'bi-braces',
      'JavaScript': 'bi-braces',
      'Node.js': 'bi-server',
      'Python': 'bi-filetype-py',
      'PostgreSQL': 'bi-database',
      'Docker': 'bi-box-seam',
      'Laravel': 'bi-boxes',
      'Flutter': 'bi-phone',
      'Firebase': 'bi-fire',
      'MySQL': 'bi-database-fill',
      'MongoDB': 'bi-database-down'
    };
    return icons[tech] || 'bi-code-slash';
  }

  // Chart initialization - removed for new design
  private initializeCharts(): void {
    // No charts needed for the new areas dashboard
  }

  // Method to get technologies for specific experience
  getTechForExperience(index: number): string[] {
    const techMap = [
      ['Angular', 'TypeScript', 'Node.js', 'Docker', 'PostgreSQL'],
      ['Laravel', 'Vue.js', 'Python', 'Django', 'MySQL'],
      ['Angular', 'NestJS', 'PostgreSQL', 'HTML5', 'CSS3']
    ];
    return techMap[index] || [];
  }
}