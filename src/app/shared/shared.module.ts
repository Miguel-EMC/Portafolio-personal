import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Layout Components
import { FooterComponent } from './components/layout/footer/footer.component';
import { NavComponent } from './components/layout/nav/nav.component';

// UI Components
import { SectionHeaderComponent } from './components/ui/section-header/section-header.component';

const SHARED_COMPONENTS = [
  FooterComponent,
  NavComponent,
  SectionHeaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ...SHARED_COMPONENTS
  ],
  exports: [
    CommonModule,
    RouterModule,
    ...SHARED_COMPONENTS
  ]
})
export class SharedModule { }