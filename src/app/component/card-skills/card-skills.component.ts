import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-skills',
  standalone: true,
  imports: [],
  templateUrl: './card-skills.component.html',
  styleUrl: './card-skills.component.css'
})
export class CardSkillsComponent {

  @Input() detailsCardSkills: any = {};

  constructor(){
    this.detailsCardSkills = {
      porcentaje: '',
      enlace: ''
    };
  }
}
