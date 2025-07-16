import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Forzar tema oscuro siempre
      this.setTheme('dark');
    }
  }

  toggleTheme(): void {
    // Mantener siempre tema oscuro
    this.setTheme('dark');
  }

  private setTheme(theme: 'light' | 'dark'): void {
    // Forzar siempre tema oscuro
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    }
  }

  getCurrentTheme(): 'light' | 'dark' {
    return 'dark';
  }
}