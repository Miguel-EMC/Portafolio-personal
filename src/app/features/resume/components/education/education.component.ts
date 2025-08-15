import { Component } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { TranslateModule } from '@ngx-translate/core';

// Data imports
import { educationItems, type Education } from '../../../../core/data/education.data';


interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

@Component({
  selector: 'app-education',
  standalone: true,
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  imports: [NgForOf, NgIf, TranslateModule]
})
export class EducationComponent {
  educationItems: Education[] = educationItems;

  skillsAcquired: SkillCategory[] = [
    {
      name: 'Programación',
      icon: 'bi bi-code-slash',
      skills: [
        'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'PHP', 'Dart', 'SQL'
      ]
    },
    {
      name: 'Frameworks & Librerías',
      icon: 'bi bi-layers',
      skills: [
        'Angular', 'React', 'Vue.js', 'Django', 'Laravel', 'Flutter', 'Node.js', 'Express.js'
      ]
    },
    {
      name: 'Bases de Datos',
      icon: 'bi bi-database',
      skills: [
        'PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Redis', 'SQL Server'
      ]
    },
    {
      name: 'Herramientas & DevOps',
      icon: 'bi bi-gear',
      skills: [
        'Git', 'Docker', 'AWS', 'Linux', 'Nginx', 'Jenkins', 'Kubernetes'
      ]
    },
    {
      name: 'Metodologías',
      icon: 'bi bi-diagram-3',
      skills: [
        'Scrum', 'Kanban', 'TDD', 'Clean Code', 'SOLID', 'Design Patterns'
      ]
    },
    {
      name: 'Soft Skills',
      icon: 'bi bi-people',
      skills: [
        'Liderazgo', 'Trabajo en Equipo', 'Comunicación', 'Problem Solving', 'Adaptabilidad'
      ]
    }
  ];

  getStatusClass(date: string): string {
    return date.toLowerCase().includes('actualidad') ? 'current' : 'completed';
  }

  getStatusIcon(date: string): string {
    return date.toLowerCase().includes('actualidad') ? 'bi bi-play-circle-fill' : 'bi bi-check-circle-fill';
  }

  getStatusText(date: string): string {
    return date.toLowerCase().includes('actualidad') ? 'En Curso' : 'Completado';
  }

  getEducationIcon(index: number): string {
    const icons = ['bi bi-mortarboard-fill', 'bi bi-code-slash', 'bi bi-book'];
    return icons[index] || 'bi bi-mortarboard-fill';
  }
}