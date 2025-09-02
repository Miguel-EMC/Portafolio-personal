export interface Education {
  id: string;
  date: string;
  achievements: string[];
  icon?: string;
}

export const educationItems: Education[] = [
  {
    id: 'computer-engineering',
    date: 'common.current',
    achievements: [
      'Especialización en Algoritmos y Estructuras de Datos Avanzadas',
      'Proyectos de Machine Learning y Deep Learning',
      'Desarrollo de aplicaciones web full-stack',
      'Participación en competencias de programación'
    ],
    icon: 'bi-mortarboard'
  },
  {
    id: 'software-development',
    date: '2020 - 2023',
    achievements: [
      'Desarrollo de más de 15 proyectos web completos',
      'Dominio de frameworks modernos (Angular, React, Vue.js)',
      'Implementación de APIs RESTful y microservicios',
      'Certificación en metodologías ágiles (Scrum)'
    ],
    icon: 'bi-code-slash'
  },
  {
    id: 'high-school',
    date: '2013 - 2019',
    achievements: [
      'Graduado con honores en Ciencias Exactas',
      'Participación en olimpiadas de matemáticas',
      'Primer contacto con programación en Python',
      'Liderazgo estudiantil y trabajo en equipo'
    ],
    icon: 'bi-book'
  }
];