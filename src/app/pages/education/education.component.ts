import { Component } from '@angular/core';
import { NavComponent } from '../../component/nav/nav.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [NavComponent, FooterComponent, RouterModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {

}
