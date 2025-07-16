import { Component } from '@angular/core';
import { EducationComponent } from "../resume/components/education/education.component";
import { AboutMeComponent } from "../contact/about-me/about-me.component";
import { CurriculumComponent } from "../resume/components/curriculum/curriculum.component";
import { FooterComponent } from "../../shared/components/layout/footer/footer.component";
import { NavComponent } from "../../shared/components/layout/nav/nav.component";
import { PortafolioComponent } from "../portfolio/portfolio/portafolio.component";
import { ContactsComponent } from "../contact/contacts/contacts.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    EducationComponent,
    AboutMeComponent,
    CurriculumComponent,
    FooterComponent,
    NavComponent,
    PortafolioComponent,
    ContactsComponent,
    RouterLink
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
}
