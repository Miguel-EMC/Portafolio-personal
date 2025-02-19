import { Component } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
import {NavComponent} from "../../components/nav/nav.component";

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NavComponent, FooterComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

}
