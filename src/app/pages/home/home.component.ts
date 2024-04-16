import { Component } from '@angular/core';
import { NavComponent } from '../../component/nav/nav.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { AboutMeComponent } from '../about-me/about-me.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent, FooterComponent, AboutMeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
