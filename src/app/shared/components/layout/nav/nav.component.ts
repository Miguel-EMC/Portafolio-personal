import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from "../../../../core/services/theme.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  standalone: true,
  imports: [NgClass, TranslateModule],
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  isScrolled = false;
  activeSection = 'home';

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateActiveSection();
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
      this.updateActiveSection();
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

  scrollToSection(sectionId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const section = document.getElementById(sectionId);
      if (section) {
        const offset = isPlatformBrowser(this.platformId) && window.innerWidth <= 768 ? 0 : 0; // Sin offset para navbar vertical
        const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Cerrar menú móvil si está abierto
        if (this.isMobileMenuOpen) {
          this.closeMobileMenu();
        }
      }
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

  private updateActiveSection(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const sections = ['home', 'sobre-mi', 'educacion', 'experiencia', 'portafolio', 'contacto'];
    const scrollPosition = window.pageYOffset + 100;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection = sectionId;
          break;
        }
      }
    }

    // Si estamos en la parte superior, establecer home como activo
    if (window.pageYOffset < 100) {
      this.activeSection = 'home';
    }
  }
}