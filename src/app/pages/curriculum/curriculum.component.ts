import { Component, OnInit, HostListener } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    RouterLink
  ],
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {
  // Datos de Experiencia
  experiences = [
    {
      title: 'Full Stack Developer',
      subtitle: 'Lateral Business Thinking | Innovate Empresarial Solutions',
      location: 'Quito, Ecuador',
      date: 'Jun 2024 - Actualidad',
      tasks: [
        'Crear interfaces web dinámicas y optimizar la experiencia de usuario.',
        'Colaborar con equipos para desarrollar aplicaciones escalables y eficientes.',
        'Desarrollo de aplicativo móvil Münster Mind.'
      ]
    },
    {
      title: 'Desarrollador de Software',
      subtitle: 'Freelance',
      location: 'Quito, Ecuador',
      date: 'Nov 2023 - Oct 2024',
      tasks: [
        'Contribuir al desarrollo de la plataforma Proyecto ASOBANCA, tanto en el backend como en el frontend.',
        'Colaborar en la mejora continua del aplicativo Billusos.',
        'Realizar proyectos web personales.'
      ]
    },
    {
      title: 'Full Stack Developer Jr',
      subtitle: 'Centro Ecuatoriano de Eficiencia de Recursos',
      location: 'Quito, Ecuador',
      date: 'Ene 2023 - Sep 2023',
      tasks: [
        'Maquetar pantallas cliente para el sistema CONAFIS SARAS.',
        'Configurar equipos de trabajo en el área de desarrollo.',
        'Manejar bases de datos, incluyendo la generación de scripts para CONAFIPS SARAS.'
      ]
    }
  ];

  // Datos de Habilidades
  skills = [
    {
      category: 'Habilidades Técnicas',
      items: [
        'Python', 'JavaScript', 'TypeScript', 'PHP', 'HTML', 'CSS', 'Bash', 'Dart',
        'MySQL', 'SQLServer', 'MongoDB', 'Firebase', 'Postgresql',
        'Django', 'Laravel', 'NestJs', 'Node.js', 'Angular', 'Flutter',
        'Docker', 'Kubernetes', 'AWS', 'Figma', 'Git', 'Jira', 'Power BI', 'Microsoft Office'
      ]
    },
    {
      category: 'Habilidades Interpersonales',
      items: [
        'Trabajo en equipo', 'Aprendizaje continuo', 'Manejo de presión',
        'Análisis y solución de problemas'
      ]
    }
  ];

  visibleItems: boolean[] = [];

  ngOnInit() {
    this.visibleItems = new Array(this.experiences.length).fill(false);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.experiences.forEach((_, index) => {
      const element = document.querySelector(`.timeline-item:nth-child(${index + 1})`);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          this.visibleItems[index] = true;
        }
      }
    });
  }

  isVisible(index: number): boolean {
    return this.visibleItems[index];
  }

  getSkillIcon(skill: string): string {
    const icons = {
      Python: 'bi-filetype-py',
      JavaScript: 'bi-braces',
      TypeScript: 'bi-braces',
      PHP: 'bi-filetype-php',
      HTML: 'bi-filetype-html',
      CSS: 'bi-filetype-css',
      Bash: 'bi-terminal',
      Dart: 'bi-lightning',
      MySQL: 'bi-database',
      SQLServer: 'bi-database-fill',
      MongoDB: 'bi-database-down',
      Firebase: 'bi-fire',
      Postgresql: 'bi-database-check',
      Django: 'bi-diagram-3',
      Laravel: 'bi-boxes',
      NestJs: 'bi-nut',
      'Node.js': 'bi-terminal',
      Angular: 'bi-lightning',
      Flutter: 'bi-phone',
      Docker: 'bi-box-seam',
      Kubernetes: 'bi-diagram-3',
      AWS: 'bi-cloud',
      Figma: 'bi-pencil-square',
      Git: 'bi-git',
      Jira: 'bi-kanban',
      'Power BI': 'bi-bar-chart',
      'Microsoft Office': 'bi-file-earmark-spreadsheet'
    };

    return skill in icons ? icons[skill as keyof typeof icons] : 'bi-brightness-high';
  }
}
