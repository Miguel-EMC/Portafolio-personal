import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {NgClass, NgForOf, ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {
  experiences = [
    {
      title: 'Desarrollador de Software',
      subtitle: 'Freelance - Actualidad',
      location: 'Quito - Ecuador',
      tasks: [
        'Participé en el desarrollo de la plataforma Proyecto ASOBANCA en la empresa CEER, enfocándome en la elaboración de pantallas de la aplicación.',
        'Colaboro en el mejoramiento tanto del backend como del frontend del aplicativo Billusos, implementando mejoras significativas para aumentar su rendimiento y usabilidad.'
      ],
      image: 'https://static.vecteezy.com/system/resources/thumbnails/019/153/003/small/3d-minimal-programming-icon-coding-screen-web-development-concept-laptop-with-a-coding-screen-and-a-coding-icon-3d-illustration-png.png'
    },
    {
      title: 'Full Stack Developer Jr',
      subtitle: 'Centro Ecuatoriano de Eficiencia de Recursos - 02/2023 - 09/2023',
      location: 'Quito - Ecuador',
      tasks: [
        'Maquetación de pantallas cliente para el sistema CONAFIS SARAS.',
        'Configuración de equipos de trabajo en el área de desarrollo.',
        'Manejo de base de datos y generación de scripts para el sistema CONAFIPS SARAS.',
        'Desarrollo de la plataforma SARAS <a href="https://saras.finanzaspopulares.gob.ec/View/SARAS/index.php" target="_blank">Link</a>'
      ],
      image: 'https://pbs.twimg.com/profile_images/997152929911136256/ALjrjqbO_400x400.jpg'
    },
    {
      title: 'Full Stack Developer Jr',
      subtitle: 'Centro Ecuatoriano de Eficiencia de Recursos - 02/2023 - 09/2023',
      location: 'Quito - Ecuador',
      tasks: [
        'Maquetación de pantallas cliente para el sistema CONAFIS SARAS.',
        'Configuración de equipos de trabajo en el área de desarrollo.',
        'Manejo de base de datos y generación de scripts para el sistema CONAFIPS SARAS.',
        'Desarrollo de la plataforma SARAS <a href="https://saras.finanzaspopulares.gob.ec/View/SARAS/index.php" target="_blank">Link</a>'
      ],
      image: 'https://pbs.twimg.com/profile_images/997152929911136256/ALjrjqbO_400x400.jpg'
    },
    {
      title: 'Full Stack Developer Jr',
      subtitle: 'Centro Ecuatoriano de Eficiencia de Recursos - 02/2023 - 09/2023',
      location: 'Quito - Ecuador',
      tasks: [
        'Maquetación de pantallas cliente para el sistema CONAFIS SARAS.',
        'Configuración de equipos de trabajo en el área de desarrollo.',
        'Manejo de base de datos y generación de scripts para el sistema CONAFIPS SARAS.',
        'Desarrollo de la plataforma SARAS <a href="https://saras.finanzaspopulares.gob.ec/View/SARAS/index.php" target="_blank">Link</a>'
      ],
      image: 'https://pbs.twimg.com/profile_images/997152929911136256/ALjrjqbO_400x400.jpg'
    }
  ];

  skills = [
    {
      category: 'Frontend',
      items: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'Angular', 'React']
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express.js', 'Django', 'PHP']
    },
    {
      category: 'Bases de Datos',
      items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase']
    },
    {
      category: 'Herramientas',
      items: ['Git & GitHub', 'Docker', 'Jenkins', 'AWS']
    }
  ];

  visibleItems: boolean[] = [];

  constructor(private router: Router, private viewportScroller: ViewportScroller) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
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
      'HTML5 & CSS3': 'bi-code-slash',
      'JavaScript (ES6+)': 'bi-braces',
      Angular: 'bi-lightning',
      React: 'bi-boxes',
      'Node.js': 'bi-terminal',
      'Express.js': 'bi-server',
      Django: 'bi-diagram-3',
      PHP: 'bi-filetype-php',
      MySQL: 'bi-database',
      PostgreSQL: 'bi-database-fill',
      MongoDB: 'bi-database-down',
      Firebase: 'bi-fire',
      'Git & GitHub': 'bi-git',
      Docker: 'bi-box-seam',
      Jenkins: 'bi-gear',
      AWS: 'bi-cloud'
    };
    // @ts-ignore
    return 'bi-question-circle' || icons[skill]; // Ícono por defecto si no hay coincidencia
  }
}
