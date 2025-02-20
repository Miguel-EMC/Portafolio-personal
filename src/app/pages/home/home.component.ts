import { Component } from '@angular/core';
import {EducationComponent} from "../education/education.component";
import {AboutMeComponent} from "../about-me/about-me.component";
import {CurriculumComponent} from "../curriculum/curriculum.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {NavComponent} from "../../components/nav/nav.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    EducationComponent,
    AboutMeComponent,
    CurriculumComponent,
    FooterComponent,
    NavComponent
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
