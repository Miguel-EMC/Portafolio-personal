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
    <div class="resume-container">
      <app-section-header 
        title="Mi Trayectoria"
        highlight="Profesional"
        subtitle="Experiencia, educación y habilidades que definen mi perfil profesional"
        badge="Currículum"
        badgeIcon="bi bi-person-workspace">
      </app-section-header>
      
      <section class="resume-section">
        <app-curriculum></app-curriculum>
      </section>
      
      <section class="resume-section">
        <app-education></app-education>
      </section>
      
      <section class="resume-section">
        <app-skills></app-skills>
      </section>
    </div>
  `,
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent { }