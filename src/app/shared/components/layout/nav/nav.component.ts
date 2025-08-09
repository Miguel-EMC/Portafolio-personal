import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from "../../../../core/services/theme.service";
import { LanguageToggleComponent } from "../../ui/language-toggle/language-toggle.component";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  standalone: true,
  imports: [NgClass, TranslateModule, RouterModule, LanguageToggleComponent],
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  isScrolled = false;
  activeRoute = '/about';

  constructor(
    private themeService: ThemeService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateActiveRoute();
      
      // Listen to route changes
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.updateActiveRoute();
      });
    }
  }

  ngOnDestroy(): void {
    // Cleanup body overflow if mobile menu is open
    if (this.isMobileMenuOpen && isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.pageYOffset > 50;
    }
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    if (this.isMobileMenuOpen && isPlatformBrowser(this.platformId)) {
      if (window.innerWidth >= 769) {
        this.closeMobileMenu();
      }
    }
  }

  @HostListener('document:keydown.escape', [])
  onEscapeKey(): void {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  get theme() {
    return this.themeService.getCurrentTheme();
  }

  navigateToRoute(route: string): void {
    this.router.navigate([route]);
    
    // Cerrar menú móvil si está abierto
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    if (isPlatformBrowser(this.platformId)) {
      // Prevent body scroll when mobile menu is open
      if (this.isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  private updateActiveRoute(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.activeRoute = this.router.url;
  }

  isActive(route: string): boolean {
    return this.activeRoute === route || this.activeRoute === `/${route}`;
  }
}