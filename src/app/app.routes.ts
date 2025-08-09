import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
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
    path: 'home',
    redirectTo: 'about'
  },
  {
    path: 'sobre-mi',
    redirectTo: 'about'
  },
  {
    path: 'portafolio',
    redirectTo: 'portfolio'
  },
  {
    path: 'contacto',
    redirectTo: 'contact'
  },
  {
    path: 'about-me',
    redirectTo: 'about'
  },
  {
    path: 'contacts',
    redirectTo: 'contact'
  },
  {
    path: 'curriculum',
    redirectTo: 'resume'
  },
  {
    path: 'education',
    redirectTo: 'resume'
  },
  {
    path: 'experiencia',
    redirectTo: 'resume'
  },
  {
    path: 'educacion',
    redirectTo: 'resume'
  },
  {
    path: 'skills',
    redirectTo: 'resume'
  },
  {
    path: '**',
    redirectTo: 'about'
  }
];
