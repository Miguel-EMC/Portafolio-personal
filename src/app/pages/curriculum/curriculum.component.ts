import { Component } from '@angular/core';
import { NavComponent } from '../../component/nav/nav.component';
import { FooterComponent } from '../../component/footer/footer.component';

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [NavComponent, FooterComponent],
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.css'
})
export class CurriculumComponent {

}
