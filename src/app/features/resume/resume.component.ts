import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './components/education/education.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { SkillsComponent } from './components/skills/skills.component';
import { SectionHeaderComponent } from '../../shared/components/ui/section-header/section-header.component';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [
    CommonModule,
    EducationComponent,
    CurriculumComponent,
    SkillsComponent,
    SectionHeaderComponent
  ],
  template: `
    <section class="resume-section">
      <!-- Background Elements -->
      <div class="bg-decoration">
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
      </div>

      <div class="container">
        <!-- Professional Resume Layout -->
        <div class="resume-grid">
          <!-- Skills Carousel -->
          <div class="skills-carousel-section">
            <div class="section-header">
              <div class="header-icon">
                <i class="bi bi-code-slash"></i>
              </div>
              <h3>Competencias Técnicas</h3>
              <div class="carousel-controls">
                <button class="carousel-btn prev" (click)="previousSkillSet()">
                  <i class="bi bi-chevron-left"></i>
                </button>
                <div class="carousel-indicators">
                  <div class="indicator" 
                       *ngFor="let skill of skillSets; let i = index"
                       [class.active]="i === currentSkillSet"
                       (click)="setSkillSet(i)"></div>
                </div>
                <button class="carousel-btn next" (click)="nextSkillSet()">
                  <i class="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
            
            <div class="skills-carousel">
              <div class="skill-set" 
                   *ngFor="let skillSet of skillSets; let i = index"
                   [class.active]="i === currentSkillSet">
                <div class="skill-set-header">
                  <div class="skill-category-icon" [ngClass]="skillSet.iconClass">
                    <i [class]="skillSet.icon"></i>
                  </div>
                  <div class="skill-category-info">
                    <h4>{{ skillSet.category }}</h4>
                    <p>{{ skillSet.description }}</p>
                  </div>
                </div>
                
                <div class="skills-grid">
                  <div class="skill-item" *ngFor="let skill of skillSet.skills">
                    <div class="skill-info">
                      <div class="skill-tech">
                        <i [class]="skill.icon" [style.color]="skill.color"></i>
                        <span>{{ skill.name }}</span>
                      </div>
                      <span class="skill-level">{{ skill.level }}%</span>
                    </div>
                    <div class="skill-progress-bar">
                      <div class="progress-fill" [style.width.%]="skill.level" [style.background]="skill.color"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Professional Experience & Education Timeline -->
          <div class="professional-timeline">
            <div class="timeline-tabs">
              <button class="timeline-tab" 
                      [class.active]="activeTab === 'experience'"
                      (click)="setActiveTab('experience')">
                <i class="bi bi-briefcase-fill"></i>
                <span>Experiencia</span>
              </button>
              <button class="timeline-tab" 
                      [class.active]="activeTab === 'education'"
                      (click)="setActiveTab('education')">
                <i class="bi bi-mortarboard-fill"></i>
                <span>Educación</span>
              </button>
            </div>
            
            <div class="timeline-content">
              <div class="timeline-panel" [class.active]="activeTab === 'experience'">
                <div class="timeline-wrapper">
                  <app-curriculum></app-curriculum>
                </div>
              </div>
              
              <div class="timeline-panel" [class.active]="activeTab === 'education'">
                <div class="timeline-wrapper">
                  <app-education></app-education>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {
  // Control del carousel de skills
  currentSkillSet = 0;
  private skillSetInterval: any;
  
  // Control de pestañas
  activeTab: 'experience' | 'education' = 'experience';

  // Configuración de skills por categorías
  skillSets = [
    {
      category: 'Frontend Development',
      description: 'Tecnologías de interfaz de usuario',
      icon: 'bi bi-palette-fill',
      iconClass: 'frontend-icon',
      skills: [
        { name: 'Angular', level: 90, icon: 'bi bi-code-square', color: '#dd0031' },
        { name: 'React', level: 85, icon: 'bi bi-code-square', color: '#61dafb' },
        { name: 'TypeScript', level: 88, icon: 'bi bi-code', color: '#3178c6' },
        { name: 'CSS/SCSS', level: 92, icon: 'bi bi-palette2', color: '#1572b6' },
        { name: 'HTML5', level: 95, icon: 'bi bi-filetype-html', color: '#e34f26' },
        { name: 'JavaScript', level: 90, icon: 'bi bi-code-slash', color: '#f7df1e' }
      ]
    },
    {
      category: 'Backend Development',
      description: 'Tecnologías del lado servidor',
      icon: 'bi bi-server',
      iconClass: 'backend-icon',
      skills: [
        { name: 'Node.js', level: 87, icon: 'bi bi-code-square', color: '#339933' },
        { name: 'Python', level: 82, icon: 'bi bi-code', color: '#3776ab' },
        { name: 'Express.js', level: 85, icon: 'bi bi-server', color: '#000000' },
        { name: 'PostgreSQL', level: 85, icon: 'bi bi-database', color: '#336791' },
        { name: 'MongoDB', level: 80, icon: 'bi bi-database-fill', color: '#47a248' },
        { name: 'REST APIs', level: 90, icon: 'bi bi-cloud-arrow-up', color: '#ff6b35' }
      ]
    },
    {
      category: 'DevOps & Tools',
      description: 'Herramientas y deployment',
      icon: 'bi bi-gear-fill',
      iconClass: 'devops-icon',
      skills: [
        { name: 'Docker', level: 78, icon: 'bi bi-box', color: '#2496ed' },
        { name: 'AWS', level: 75, icon: 'bi bi-cloud', color: '#ff9900' },
        { name: 'Git', level: 90, icon: 'bi bi-git', color: '#f05032' },
        { name: 'Linux', level: 82, icon: 'bi bi-terminal', color: '#fcc624' },
        { name: 'Nginx', level: 75, icon: 'bi bi-server', color: '#009639' },
        { name: 'CI/CD', level: 70, icon: 'bi bi-arrow-repeat', color: '#326ce5' }
      ]
    },
    {
      category: 'Design & UX',
      description: 'Diseño y experiencia de usuario',
      icon: 'bi bi-brush-fill',
      iconClass: 'design-icon',
      skills: [
        { name: 'Figma', level: 85, icon: 'bi bi-palette', color: '#f24e1e' },
        { name: 'Adobe XD', level: 80, icon: 'bi bi-palette2', color: '#ff61f6' },
        { name: 'UI/UX Design', level: 88, icon: 'bi bi-brush', color: '#6c5ce7' },
        { name: 'Responsive', level: 92, icon: 'bi bi-phone', color: '#00b894' },
        { name: 'Prototyping', level: 85, icon: 'bi bi-diagram-3', color: '#fdcb6e' },
        { name: 'User Research', level: 78, icon: 'bi bi-people', color: '#e17055' }
      ]
    }
  ];

  // Navegación del carousel
  ngOnInit() {
    // Auto-rotate skills carousel
    this.startSkillSetRotation();
  }

  ngOnDestroy() {
    if (this.skillSetInterval) {
      clearInterval(this.skillSetInterval);
    }
  }

  private startSkillSetRotation() {
    this.skillSetInterval = setInterval(() => {
      this.nextSkillSet();
    }, 5000); // Change every 5 seconds
  }

  private resetSkillSetRotation() {
    if (this.skillSetInterval) {
      clearInterval(this.skillSetInterval);
    }
    this.startSkillSetRotation();
  }

  nextSkillSet() {
    this.currentSkillSet = (this.currentSkillSet + 1) % this.skillSets.length;
    this.resetSkillSetRotation();
  }

  previousSkillSet() {
    this.currentSkillSet = this.currentSkillSet === 0 ? this.skillSets.length - 1 : this.currentSkillSet - 1;
    this.resetSkillSetRotation();
  }

  setSkillSet(index: number) {
    this.currentSkillSet = index;
    this.resetSkillSetRotation();
  }

  // Control de pestañas
  setActiveTab(tab: 'experience' | 'education') {
    this.activeTab = tab;
  }
}