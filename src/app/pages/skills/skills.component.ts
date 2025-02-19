import { Component } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
import {NavComponent} from "../../components/nav/nav.component";

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NavComponent, FooterComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {

}
