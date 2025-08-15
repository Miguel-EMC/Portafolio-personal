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
