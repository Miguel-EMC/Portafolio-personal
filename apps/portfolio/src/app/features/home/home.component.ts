import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID, inject, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { ToastrService } from 'ngx-toastr';

// Data imports
import { upcomingProjects, type UpcomingProject } from '../../core/data/upcoming-projects.data';
import { BlogService } from '../../core/services/blog.service';
import { EmailService } from '../../core/services/email.service';
import { PortfolioService } from '../../core/services/portfolio.service';
import { BLOG_CATEGORIES, BlogCategory, BlogCategoryInfo, BlogPostMeta } from '../../interfaces/blog.interface';
import { PortfolioProjectMeta } from '../../interfaces/project.interface';

import { LottieAnimationComponent } from '../../shared/components/ui/lottie-animation/lottie-animation.component';
import { ProjectCardComponent } from '../../shared/components/ui/project-card/project-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterLink,
    ProjectCardComponent,
    LottieAnimationComponent,
    LottieComponent
  ],
  styleUrls: ['./home.component.scss', './toast-fix.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideInScale', [
      transition(':enter', [
        style({
          transform: 'scale(0.7) translateY(-50px)',
          opacity: 0
        }),
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({
            transform: 'scale(1) translateY(0)',
            opacity: 1
          })
        )
      ]),
      transition(':leave', [
        animate('300ms ease-in',
          style({
            transform: 'scale(0.8) translateY(20px)',
            opacity: 0
          })
        )
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  private ngZone = inject(NgZone);

  // Lottie Animation Options
  options: AnimationOptions = {
    path: '/assets/jsons/Artificial Intelligence Chatbot.json',
  };

  contactOptions: AnimationOptions = {
    path: '/assets/jsons/tech startup.json',
  };

  private portfolioService = inject(PortfolioService);
  private emailService = inject(EmailService);
  private blogService = inject(BlogService);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private toastr: ToastrService
  ) { }

  // Función helper para forzar estilos del toast
  private forceToastStyles() {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        const container = document.querySelector('.toast-container') as HTMLElement;
        const toastElement = document.querySelector('.ngx-toastr') as HTMLElement;

        if (toastElement) {
          // Forzar estilos del contenedor
          if (container) {
            container.style.cssText = `
            position: fixed !important;
            top: 20px !important;
            right: 20px !important;
            z-index: 999999 !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
          `;
          }

          // Determinar el color según el tipo de toast
          let bgGradient = 'linear-gradient(135deg, #10b981 0%, #059669 100%)'; // success por defecto
          if (toastElement.classList.contains('toast-error')) {
            bgGradient = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
          } else if (toastElement.classList.contains('toast-info')) {
            bgGradient = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
          } else if (toastElement.classList.contains('toast-warning')) {
            bgGradient = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
          }

          // Forzar estilos del toast
          toastElement.style.cssText = `
          position: relative !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: 350px !important;
          min-height: 80px !important;
          padding: 20px !important;
          margin-bottom: 15px !important;
          background: ${bgGradient} !important;
          color: white !important;
          border-radius: 12px !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
          font-family: Inter, sans-serif !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
          pointer-events: auto !important;
          transform: translateX(0) !important;
        `;
        }
      }, 100);
    });
  }

  // Typing animation
  currentRole = '';
  isTyping = false;
  private typingInterval: any;
  private roles: string[] = ['Backend Developer'];
  private currentRoleIndex = 0;

  currentLang: 'es' | 'en' = 'es';

  // Own projects (featured + coming-soon), loaded from the portfolio service
  ownProjects: PortfolioProjectMeta[] = [];
  // Client work, shown as a secondary grid — no business figures, see ProjectCardComponent's client-secondary variant
  clientProjects: PortfolioProjectMeta[] = [];
  readonly upcomingProjects: UpcomingProject[] = upcomingProjects;

  recentPosts: BlogPostMeta[] = [];

  ngOnInit() {
    // Track current language
    this.currentLang = (this.translate.currentLang || this.translate.defaultLang || 'es') as 'es' | 'en';
    this.loadRoles();
    this.translate.onLangChange.subscribe(event => {
      this.currentLang = (event.lang || 'es') as 'es' | 'en';
      this.loadRoles();
      this.cdr.markForCheck();
    });

    this.portfolioService.getAllProjects().subscribe((projects: PortfolioProjectMeta[]) => {
      this.ownProjects = projects.filter(p => p.type === 'personal');
      this.clientProjects = projects.filter(p => p.type === 'professional');
      this.cdr.markForCheck();
    });

    this.blogService.getRecentPosts(3).subscribe((posts: BlogPostMeta[]) => {
      this.recentPosts = posts;
      this.cdr.markForCheck();
    });

    if (isPlatformBrowser(this.platformId)) {
      this.startTypingAnimation();
      // Configurar scroll suave
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }

  ngOnDestroy() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
  }

  private loadRoles(): void {
    const roles = this.translate.instant('home.hero.roles');
    if (Array.isArray(roles) && roles.length > 0) {
      this.roles = roles;
      this.currentRoleIndex = 0;
    }
  }

  private startTypingAnimation(): void {
    this.typeText(this.roles[this.currentRoleIndex]);
  }

  private typeText(text: string): void {
    this.currentRole = '';
    this.isTyping = true;
    let charIndex = 0;

    const typeChar = () => {
      if (charIndex < text.length) {
        this.currentRole += text.charAt(charIndex);
        charIndex++;
        this.cdr.detectChanges();
        this.ngZone.runOutsideAngular(() => setTimeout(typeChar, 100));
      } else {
        this.isTyping = false;
        this.cdr.detectChanges();
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            this.eraseText();
          }, 2000);
        });
      }
    };

    this.ngZone.runOutsideAngular(() => typeChar());
  }

  private eraseText(): void {
    this.isTyping = true;
    const eraseChar = () => {
      if (this.currentRole.length > 0) {
        this.currentRole = this.currentRole.slice(0, -1);
        this.cdr.detectChanges();
        this.ngZone.runOutsideAngular(() => setTimeout(eraseChar, 50));
      } else {
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            this.typeText(this.roles[this.currentRoleIndex]);
          }, 500);
        });
      }
    };

    this.ngZone.runOutsideAngular(() => eraseChar());
  }

  getCategoryInfo(category: BlogCategory): BlogCategoryInfo {
    return BLOG_CATEGORIES.find(c => c.id === category) ?? BLOG_CATEGORIES[BLOG_CATEGORIES.length - 1];
  }

  // Get CV URL based on current language
  getCvUrl(): string {
    const currentLang = this.translate.currentLang || 'es';
    if (currentLang === 'en') {
      return '/assets/documents/CV_MuzoMiguel_english.pdf';
    }
    return '/assets/documents/CV_MuzoMiguel.pdf';
  }

  async onSubmit(event: Event) {
    // Solo ejecutar en el navegador, no en SSR
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    // Mostrar toast de "enviando..." con traducción
    this.toastr.info(this.translate.instant('home.contact.toast.sending'), '', {
      timeOut: 2000
    });
    this.forceToastStyles();

    const sent = await this.emailService.sendContactForm({
      from_name: (data.get('name') as string) ?? '',
      from_email: (data.get('email') as string) ?? '',
      subject: (data.get('subject') as string) ?? '',
      message: (data.get('message') as string) ?? ''
    });

    if (sent) {
      // Toast de éxito con traducción
      this.toastr.success(
        this.translate.instant('home.contact.toast.successMessage'),
        this.translate.instant('home.contact.toast.successTitle'),
        {
          timeOut: 5000,
          progressBar: true
        }
      );
      this.forceToastStyles();
      form.reset();
    } else {
      // Toast de error con traducción
      this.toastr.error(
        this.translate.instant('home.contact.toast.errorMessage'),
        this.translate.instant('home.contact.toast.errorTitle'),
        {
          timeOut: 5000,
          progressBar: true
        }
      );
      this.forceToastStyles();
    }
  }

}
