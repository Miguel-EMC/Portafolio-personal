import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  // Redirigir todas las rutas a home para navegación por secciones
  {
    path: 'portfolio',
    redirectTo: 'home'
  },
  {
    path: 'resume',
    redirectTo: 'home'
  },
  {
    path: 'about',
    redirectTo: 'home'
  },
  {
    path: 'contact',
    redirectTo: 'home'
  },
  {
    path: 'sobre-mi',
    redirectTo: 'home'
  },
  {
    path: 'educacion',
    redirectTo: 'home'
  },
  {
    path: 'experiencia',
    redirectTo: 'home'
  },
  {
    path: 'portafolio',
    redirectTo: 'home'
  },
  {
    path: 'contacto',
    redirectTo: 'home'
  },
  // Backward compatibility routes
  {
    path: 'about-me',
    redirectTo: 'home'
  },
  {
    path: 'contacts',
    redirectTo: 'home'
  },
  {
    path: 'curriculum',
    redirectTo: 'home'
  },
  {
    path: 'education',
    redirectTo: 'home'
  },
  {
    path: 'skills',
    redirectTo: 'home'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
