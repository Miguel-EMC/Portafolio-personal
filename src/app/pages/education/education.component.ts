import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-education',
  standalone: true,
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  imports: [
    NgForOf
  ]
})
export class EducationComponent {
  educationItems = [
    {
      icon: 'bi bi-mortarboard-fill', // Ícono de graduación
      title: 'Ingeniería en Ciencias de la Computación',
      institution: 'Escuela Politécnica Nacional',
      date: 'Actualidad',
      description:
        'Estudiando ingeniería en sistemas con énfasis en desarrollo de software y análisis de datos.',
    },
    {
      icon: 'bi bi-code-slash', // Ícono de código
      title: 'Tecnología Superior en Desarrollo de Software',
      institution: 'Escuela Politécnica Nacional',
      date: '2020 - 2023',
      description:
        'Formación técnica en desarrollo de aplicaciones web y móviles utilizando tecnologías modernas.',
    },
    {
      icon: 'bi bi-book', // Ícono de libro
      title: 'Bachillerato General Unificado',
      institution: 'Unidad Educativa Leopoldo Mercado',
      date: '2013 - 2019',
      description:
        'Educación secundaria con enfoque en ciencias y matemáticas.',
    },
  ];
}
