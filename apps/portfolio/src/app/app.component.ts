import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NavComponent } from './shared/components/layout/nav/nav.component';
import { FooterComponent } from './shared/components/layout/footer/footer.component';
import { BlogNavComponent } from './features/blog/components/layout/blog-nav/blog-nav.component';
import { BlogFooterComponent } from './features/blog/components/layout/blog-footer/blog-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent, BlogNavComponent, BlogFooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isBlog = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.addLangs(['en', 'es']);
      this.translate.setDefaultLang('es');
      this.translate.use('es');
    }
  }

  ngOnInit(): void {
    this.isBlog = this.router.url.startsWith('/blog');
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(event => {
      this.isBlog = event.urlAfterRedirects.startsWith('/blog');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
