import { Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { Project, Tool } from '../../interfaces/project.interface';
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [NavComponent, NgForOf, NgIf],
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.scss']
})
export class PortafolioComponent {
  personalProjects: Project[] = [
    {
      id: 1,
      title: 'Proyecto Personal 1',
      description: 'Descripción detallada del proyecto personal 1.',
      images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/400'],
      frameworks: ['Angular', 'TypeScript'],
      githubUrl: 'https://github.com/user/project1'
    },
    {
      id: 2,
      title: 'Proyecto Personal 1',
      description: 'Descripción detallada del proyecto personal 1.',
      images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/400'],
      frameworks: ['Angular', 'TypeScript'],
      githubUrl: 'https://github.com/user/project1'
    },
    {
      id: 3,
      title: 'Proyecto Personal 1',
      description: 'Descripción detallada del proyecto personal 1.',
      images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/400'],
      frameworks: ['Angular', 'TypeScript'],
      githubUrl: 'https://github.com/user/project1'
    },
    // Más proyectos...
  ];

  professionalProjects: Project[] = [
    {
      id: 2,
      title: 'Proyecto Profesional 1',
      description: 'Descripción detallada del proyecto profesional 1.',
      images: ['https://via.placeholder.com/500', 'https://via.placeholder.com/600'],
      frameworks: ['React', 'Node.js'],
      liveUrl: 'https://proyectoprofesional1.com'
    },
    // Más proyectos...
  ];

  tools: Tool[] = [
    { name: 'Git', iconUrl: 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png' },
    { name: 'Jira', iconUrl: 'https://cdn-icons-png.flaticon.com/512/5968/5968875.png' },
    // Más herramientas...
  ];

  selectedProject: Project | null = null;
  currentImageIndex: number = 0;

  showDetails(project: Project): void {
    this.selectedProject = project;
    this.currentImageIndex = 0; // Reinicia el índice de la imagen al abrir el detalle
  }

  closeDetails(): void {
    this.selectedProject = null;
  }

  getToolIcon(toolName: string): string {
    const tool = this.tools.find(t => t.name === toolName);
    return tool ? tool.iconUrl : '';
  }

  nextImage(): void {
    if (this.selectedProject) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.selectedProject.images.length;
    }
  }

  prevImage(): void {
    if (this.selectedProject) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.selectedProject.images.length) % this.selectedProject.images.length;
    }
  }
}
