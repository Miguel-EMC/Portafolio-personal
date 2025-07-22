import { Component } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";

interface EducationItem {
  icon: string;
  title: string;
  institution: string;
  date: string;
  description: string;
  achievements?: string[];
}

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
  imports: [NgForOf, NgIf]
})
export class EducationComponent {
  educationItems: EducationItem[] = [
    {
      icon: 'bi bi-mortarboard-fill',
      title: 'Ingeniería en Ciencias de la Computación',
      institution: 'Escuela Politécnica Nacional',
      date: 'Actualidad',
      description: 'Formación integral en ciencias de la computación con énfasis en desarrollo de software, algoritmos avanzados, inteligencia artificial y análisis de sistemas complejos.',
      achievements: [
        'Especialización en Algoritmos y Estructuras de Datos Avanzadas',
        'Proyectos de Machine Learning y Deep Learning',
        'Desarrollo de aplicaciones web full-stack',
        'Participación en competencias de programación'
      ]
    },
    {
      icon: 'bi bi-code-slash',
      title: 'Tecnología Superior en Desarrollo de Software',
      institution: 'Escuela Politécnica Nacional',
      date: '2020 - 2023',
      description: 'Formación técnica especializada en desarrollo de aplicaciones web y móviles, bases de datos, metodologías ágiles y arquitecturas de software modernas.',
      achievements: [
        'Desarrollo de más de 15 proyectos web completos',
        'Dominio de frameworks modernos (Angular, React, Vue.js)',
        'Implementación de APIs RESTful y microservicios',
        'Certificación en metodologías ágiles (Scrum)'
      ]
    },
    {
      icon: 'bi bi-book',
      title: 'Bachillerato General Unificado',
      institution: 'Unidad Educativa Leopoldo Mercado',
      date: '2013 - 2019',
      description: 'Educación secundaria con especialización en ciencias exactas, matemáticas avanzadas y fundamentos de programación que sentaron las bases para mi carrera tecnológica.',
      achievements: [
        'Graduado con honores en Ciencias Exactas',
        'Participación en olimpiadas de matemáticas',
        'Primer contacto con programación en Python',
        'Liderazgo estudiantil y trabajo en equipo'
      ]
    }
  ];

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
}