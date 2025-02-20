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
      logo: 'assets/img/university-logo.png', // Ruta a tu logo
      title: 'Ingeniería en Sistemas',
      institution: 'Universidad XYZ',
      date: '2020 - Presente',
      description:
        'Estudiando ingeniería en sistemas con énfasis en desarrollo de software y análisis de datos.',
    },
    {
      logo: 'assets/img/coding-logo.png', // Ruta a tu logo
      title: 'Desarrollo Full Stack',
      institution: 'Platzi',
      date: '2022 - 2023',
      description:
        'Curso intensivo sobre desarrollo web full stack con tecnologías como Angular, Node.js y MongoDB.',
    },
    {
      logo: 'assets/img/data-logo.png', // Ruta a tu logo
      title: 'Análisis de Datos',
      institution: 'Coursera',
      date: '2021 - 2022',
      description:
        'Certificación en análisis de datos utilizando Python, Pandas y herramientas de visualización.',
    },
  ];
}
