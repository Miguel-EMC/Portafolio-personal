import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from "@angular/router";
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
    TranslateModule,
    RouterLink,
    AboutMeComponent,
    SkillsComponent,
    EducationComponent,
    CurriculumComponent,
    PortafolioComponent,
    ContactsComponent
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
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

  // Interactive cards
  activeCard = 'code';

  // Top skills for about section
  topSkills = ['Angular', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL'];

  // Main technologies for compact view
  mainTechs = ['Angular', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker'];

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

  // Tab management
  activeTab = 'education';

  ngOnInit() {
    this.startTypingAnimation();
    this.initializeActiveCard();
    
    if (isPlatformBrowser(this.platformId)) {
      // Configurar scroll suave
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }

  ngOnDestroy() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
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
    this.router.navigate(['/portfolio']);
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
        setTimeout(typeChar, 100);
      } else {
        this.isTyping = false;
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
}
