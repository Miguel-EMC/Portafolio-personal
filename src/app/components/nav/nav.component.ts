import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollService } from "../../services/scroll.service";
import { ThemeService } from "../../services/theme.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  standalone: true,
  imports: [NgClass, RouterLink],
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  isScrolled = false;
  activeSection = 'home';

  constructor(
    private themeService: ThemeService,
    private scrollService: ScrollService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateActiveSection();
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
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
      if (window.innerWidth >= 768) {
        this.closeMobileMenu();
      }
    }
  }

  get theme() {
    return this.themeService.getCurrentTheme();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
    this.activeSection = sectionId;
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

    const sections = ['home', 'aboutme', 'education', 'curriculum'];
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

    // If we're at the top of the page, set home as active
    if (window.pageYOffset < 100) {
      this.activeSection = 'home';
    }
  }
}