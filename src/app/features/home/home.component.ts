import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { EducationComponent } from "../resume/components/education/education.component";
import { AboutMeComponent } from "../contact/about-me/about-me.component";
import { CurriculumComponent } from "../resume/components/curriculum/curriculum.component";
import { FooterComponent } from "../../shared/components/layout/footer/footer.component";
import { PortafolioComponent } from "../portfolio/portfolio/portafolio.component";
import { ContactsComponent } from "../contact/contacts/contacts.component";
import { RouterLink } from "@angular/router";
import { NgClass, NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    TranslateModule,
    EducationComponent,
    AboutMeComponent,
    CurriculumComponent,
    FooterComponent,
    PortafolioComponent,
    ContactsComponent,
    RouterLink,
    NgClass,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 60; // Altura del encabezado (app-nav)
      const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  getSkillCategories(): any[] {
    return [
      {
        name: 'Software Engineering',
        icon: 'bi bi-gear-fill',
        skills: [
          { name: 'Clean Code', level: 85 },
          { name: 'Design Patterns', level: 80 },
          { name: 'Scrum/Agile', level: 90 },
          { name: 'Git', level: 95 },
          { name: 'Testing', level: 80 },
          { name: 'API Design', level: 85 }
        ]
      },
      {
        name: 'Programming Languages',
        icon: 'bi bi-code-slash',
        skills: [
          { name: 'JavaScript', level: 95 },
          { name: 'TypeScript', level: 90 },
          { name: 'Python', level: 85 },
          { name: 'PHP', level: 80 },
          { name: 'Dart', level: 85 },
          { name: 'SQL', level: 85 }
        ]
      },
      {
        name: 'Frameworks',
        icon: 'bi bi-layers',
        skills: [
          { name: 'Angular', level: 95 },
          { name: 'React', level: 85 },
          { name: 'Vue.js', level: 80 },
          { name: 'Django', level: 80 },
          { name: 'Laravel', level: 85 },
          { name: 'Flutter', level: 85 },
          { name: 'Express.js', level: 85 }
        ]
      },
      {
        name: 'Technologies',
        icon: 'bi bi-stack',
        skills: [
          { name: 'Node.js', level: 90 },
          { name: 'PostgreSQL', level: 90 },
          { name: 'MySQL', level: 85 },
          { name: 'MongoDB', level: 80 },
          { name: 'Docker', level: 85 },
          { name: 'AWS', level: 75 },
          { name: 'Firebase', level: 85 },
          { name: 'Redis', level: 70 }
        ]
      }
    ];
  }
}
