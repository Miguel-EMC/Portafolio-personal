import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-header">
      <div class="section-badge" *ngIf="badge">
        <i [class]="badgeIcon" *ngIf="badgeIcon"></i>
        {{ badge }}
      </div>
      <h2 class="section-title">
        {{ title }}
        <span class="highlight" *ngIf="highlight">{{ highlight }}</span>
      </h2>
      <p class="section-subtitle" *ngIf="subtitle">{{ subtitle }}</p>
    </div>
  `,
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent {
  @Input() title: string = '';
  @Input() highlight?: string;
  @Input() subtitle?: string;
  @Input() badge?: string;
  @Input() badgeIcon?: string;
}