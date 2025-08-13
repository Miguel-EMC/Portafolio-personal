import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  skillCategories = [
    {
      name: 'Frontend',
      skills: ['Angular', 'React', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML/CSS']
    },
    {
      name: 'Backend',
      skills: ['Node.js', 'Python', 'Django', 'Laravel', 'Express.js', 'PHP']
    },
    {
      name: 'Bases de Datos',
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Redis']
    },
    {
      name: 'Herramientas',
      skills: ['Docker', 'Git', 'AWS', 'Linux', 'Figma', 'Postman']
    }
  ];
}
