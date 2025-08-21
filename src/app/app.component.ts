import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { LanguageToggleComponent } from './shared/components/ui/language-toggle/language-toggle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LanguageToggleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'protafolio-personal';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.addLangs(['en', 'es']);
      this.translate.setDefaultLang('es');
      
      const browserLang = this.translate.getBrowserLang();
      const savedLang = localStorage.getItem('portfolio-language');
      
      if (savedLang && ['en', 'es'].includes(savedLang)) {
        this.translate.use(savedLang);
      } else if (browserLang && browserLang.match(/en|es/)) {
        this.translate.use(browserLang);
      } else {
        this.translate.use('es');
      }
    }
  }

  ngOnInit(): void {
    // Initialize translation service
  }
}
