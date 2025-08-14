import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/contact/about-me/about-me.component').then(c => c.AboutMeComponent)
  },
  {
    path: 'resume',
    loadChildren: () => import('./features/resume/resume.module').then(m => m.ResumeModule)
  },
  {
    path: 'portfolio',
    loadChildren: () => import('./features/portfolio/portfolio.module').then(m => m.PortfolioModule)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contacts/contacts.component').then(c => c.ContactsComponent)
  },
  // Backward compatibility routes
  {
    path: 'sobre-mi',
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
    path: 'experiencia',
    redirectTo: 'home'
  },
  {
    path: 'educacion',
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
