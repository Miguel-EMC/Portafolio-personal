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
      <div class="container">
        <!-- Header -->
        <div class="section-header">
          <h2 class="section-title">Mi Experiencia Profesional</h2>
          <p class="section-subtitle">Un recorrido por mi carrera en desarrollo de software</p>
        </div>

        <!-- Navigation Tabs -->
        <div class="nav-tabs">
          <button class="nav-tab" 
                  [class.active]="activeTab === 'experience'"
                  (click)="setActiveTab('experience')">
            Experiencia
          </button>
          <button class="nav-tab" 
                  [class.active]="activeTab === 'education'"
                  (click)="setActiveTab('education')">
            Educación
          </button>
          <button class="nav-tab" 
                  [class.active]="activeTab === 'skills'"
                  (click)="setActiveTab('skills')">
            Habilidades
          </button>
        </div>

        <!-- Content -->
        <div class="tab-content">
          <div class="tab-panel" [class.active]="activeTab === 'experience'">
            <app-curriculum></app-curriculum>
          </div>
          
          <div class="tab-panel" [class.active]="activeTab === 'education'">
            <app-education></app-education>
          </div>
          
          <div class="tab-panel" [class.active]="activeTab === 'skills'">
            <app-skills></app-skills>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {
  // Control de pestañas
  activeTab: 'experience' | 'education' | 'skills' = 'experience';

  // Control de pestañas
  setActiveTab(tab: 'experience' | 'education' | 'skills') {
    this.activeTab = tab;
  }
}