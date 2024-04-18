import { Component } from '@angular/core';
import { NavComponent } from '../../component/nav/nav.component';
import { FooterComponent } from '../../component/footer/footer.component';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [NavComponent, FooterComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {
  email: string = " eduardomuzo123456@gmail.com";
}
