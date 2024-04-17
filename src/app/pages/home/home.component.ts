import { Component } from '@angular/core';
import { NavComponent } from '../../component/nav/nav.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { CurriculumComponent } from '../curriculum/curriculum.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent, FooterComponent, AboutMeComponent, CurriculumComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
