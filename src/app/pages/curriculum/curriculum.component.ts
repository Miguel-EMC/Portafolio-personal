import { Component } from '@angular/core';
import { NavComponent } from '../../component/nav/nav.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [NavComponent, FooterComponent, RouterModule],
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.css'
})
export class CurriculumComponent {

}
