import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AnimatedBackgroundService } from './services/animated-background.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'protafolio-personal';

  constructor(
    private animatedBackgroundService: AnimatedBackgroundService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = document.getElementById('animated-background') as HTMLCanvasElement;
      if (canvas) {
        this.animatedBackgroundService.init(canvas);
      }
    }
  }
}