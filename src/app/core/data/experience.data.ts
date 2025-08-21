export interface Experience {
  id: string;
  date: string;
  location: string;
  tasks: string[];
}

export const experiences: Experience[] = [
  {
    id: 'fullstack-lateral',
    date: 'Jun 2024 - Actualidad',
    location: 'Quito, Ecuador',
    tasks: [
      'Desarrollo de interfaces web dinámicas con Angular y TypeScript, mejorando la experiencia de usuario en un 40%',
      'Implementación de arquitecturas escalables con microservicios usando Node.js y Docker',
      'Liderazgo en el desarrollo del aplicativo móvil Münster Mind con Flutter y Firebase',
      'Optimización de bases de datos PostgreSQL, reduciendo tiempos de consulta en un 35%'
    ]
  },
  {
    id: 'freelance-dev',
    date: 'Nov 2023 - Oct 2024',
    location: 'Quito, Ecuador',
    tasks: [
      'Desarrollo full-stack de la plataforma ASOBANCA con Laravel y Vue.js para 15+ instituciones financieras',
      'Mejora continua del aplicativo Billusos, implementando nuevas funcionalidades con Python y Django',
      'Creación de APIs RESTful robustas y documentación técnica completa',
      'Gestión de proyectos web personalizados con metodologías ágiles, entregando el 100% a tiempo'
    ]
  },
  {
    id: 'junior-fullstack',
    date: 'Ene 2023 - Sep 2023',
    location: 'Quito, Ecuador',
    tasks: [
      'Maquetación responsive de interfaces cliente para CONAFIS SARAS con HTML5, CSS3 y JavaScript',
      'Configuración y optimización de entornos de desarrollo para equipos multidisciplinarios',
      'Administración de bases de datos SQL Server y generación de scripts automatizados',
      'Implementación de mejores prácticas de desarrollo y control de versiones con Git'
    ]
  }
];