import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnimatedBackgroundService {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: any[] = [];
  private theme: 'light' | 'dark' = 'light';
  private animationFrameId!: number;

  constructor() {}

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
    this.createParticles();
    this.startAnimation();
    window.addEventListener('resize', this.resizeCanvas.bind(this));
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('light-theme', this.theme === 'light');
    document.body.classList.toggle('dark-theme', this.theme === 'dark');
    this.createParticles();
    this.drawParticles();
  }

  destroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
  }

  private resizeCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.createParticles(); // Recrear partículas para ajustarlas al nuevo tamaño
  }

  private createParticles(): void {
    const particleCount = Math.floor(window.innerWidth / 10); // Ajustar cantidad según el tamaño de la pantalla
    this.particles = [];
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        color: this.theme === 'light' ? '#2ecc71' : '#f8fafc',
      });
    }
  }

  private drawParticles(): void {
    const bgColor = getComputedStyle(document.body).getPropertyValue('--primary-bg').trim();
    this.ctx.fillStyle = bgColor || (this.theme === 'light' ? 'rgba(255, 255, 255, 0)' : 'rgba(0, 0, 0, 0.8)');
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();

      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x > this.canvas.width || particle.x < 0) {
        particle.speedX *= -1;
      }
      if (particle.y > this.canvas.height || particle.y < 0) {
        particle.speedY *= -1;
      }
    });
  }

  private startAnimation(): void {
    const animate = () => {
      this.drawParticles();
      this.animationFrameId = requestAnimationFrame(animate);
    };
    animate();
  }
}
