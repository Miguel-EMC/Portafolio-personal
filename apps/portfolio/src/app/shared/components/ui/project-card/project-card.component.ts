import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { getTechIcon } from '../../../../core/utils/tech-icon.util';
import { getProjectCategory } from '../../../../core/utils/project-category.util';
import { PortfolioProjectMeta } from '../../../../interfaces/project.interface';
import { UpcomingProject } from '../../../../core/data/upcoming-projects.data';

export type ProjectCardVariant = 'featured' | 'coming-soon' | 'client-secondary';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, TranslateModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardComponent {
  @Input({ required: true }) variant!: ProjectCardVariant;

  /** Required for 'featured' and 'client-secondary'. */
  @Input() project?: PortfolioProjectMeta;

  /** Required for 'coming-soon'. */
  @Input() upcoming?: UpcomingProject;

  getTechIcon = getTechIcon;

  get stackTags(): string[] {
    if (this.upcoming) {
      return this.upcoming.stack;
    }
    return this.project?.frameworks.slice(0, 4) ?? [];
  }

  get detailLink(): string[] | null {
    return this.project ? ['/portfolio', 'project', this.project.slug] : null;
  }

  get category(): string {
    return getProjectCategory(this.stackTags);
  }
}
