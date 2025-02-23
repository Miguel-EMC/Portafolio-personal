import { Component } from '@angular/core';
import { ScrollService } from "../../services/scroll.service";
import { ThemeService } from "../../services/theme.service";
import { NgClass } from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  standalone: true,
  imports: [NgClass, RouterLink],
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(
    private themeService: ThemeService,
    private scrollService: ScrollService
  ) {}

  get theme() {
    return this.themeService.getCurrentTheme();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
  }
}
