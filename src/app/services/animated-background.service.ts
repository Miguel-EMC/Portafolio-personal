import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface FloatingShape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: 'circle' | 'triangle' | 'square';
  color: string;
}

@Injectable({
  providedIn: 'root',
})
export class AnimatedBackgroundService {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private floatingShapes: FloatingShape[] = [];
  private theme: 'light' | 'dark' = 'light';
  private animationFrameId!: number;
  private mouseX = 0;
  private mouseY = 0;
  private time = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  init(canvas: HTMLCanvasElement): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
    this.createParticles();
    this.createFloatingShapes();
    this.startAnimation();
    this.setupEventListeners();
  }

  toggleTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('light-theme', this.theme === 'light');
    document.body.classList.toggle('dark-theme', this.theme === 'dark');
    this.updateParticleColors();
  }

  destroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
    window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  private setupEventListeners(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    window.addEventListener('resize', this.resizeCanvas.bind(this));
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  private handleMouseMove(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  private resizeCanvas(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.createParticles();
    this.createFloatingShapes();
  }

  private createParticles(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    this.particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle(): Particle {
    const colors = this.theme === 'light' 
      ? ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981']
      : ['#60a5fa', '#a78bfa', '#22d3ee', '#34d399'];
    
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 200 + 100
    };
  }

  private createFloatingShapes(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const shapeCount = Math.floor((this.canvas.width * this.canvas.height) / 50000);
    this.floatingShapes = [];
    
    for (let i = 0; i < shapeCount; i++) {
      this.floatingShapes.push(this.createFloatingShape());
    }
  }

  private createFloatingShape(): FloatingShape {
    const types: ('circle' | 'triangle' | 'square')[] = ['circle', 'triangle', 'square'];
    const colors = this.theme === 'light' 
      ? ['#3b82f6', '#8b5cf6', '#06b6d4']
      : ['#60a5fa', '#a78bfa', '#22d3ee'];
    
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: Math.random() * 30 + 10,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.1 + 0.05,
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  }

  private updateParticleColors(): void {
    const colors = this.theme === 'light' 
      ? ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981']
      : ['#60a5fa', '#a78bfa', '#22d3ee', '#34d399'];
    
    this.particles.forEach(particle => {
      particle.color = colors[Math.floor(Math.random() * colors.length)];
    });

    const shapeColors = this.theme === 'light' 
      ? ['#3b82f6', '#8b5cf6', '#06b6d4']
      : ['#60a5fa', '#a78bfa', '#22d3ee'];
    
    this.floatingShapes.forEach(shape => {
      shape.color = shapeColors[Math.floor(Math.random() * shapeColors.length)];
    });
  }

  private drawParticles(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Limpiar canvas con gradiente sutil
    this.drawBackground();
    
    // Actualizar y dibujar partículas
    this.particles.forEach((particle, index) => {
      this.updateParticle(particle);
      this.drawParticle(particle);
      
      // Regenerar partícula si ha completado su ciclo de vida
      if (particle.life >= particle.maxLife) {
        this.particles[index] = this.createParticle();
      }
    });

    // Actualizar y dibujar formas flotantes
    this.floatingShapes.forEach(shape => {
      this.updateFloatingShape(shape);
      this.drawFloatingShape(shape);
    });

    // Dibujar conexiones entre partículas cercanas
    this.drawConnections();
    
    // Efecto de mouse
    this.drawMouseEffect();
  }

  private drawBackground(): void {
    const gradient = this.ctx.createRadialGradient(
      this.canvas.width / 2, this.canvas.height / 2, 0,
      this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 2
    );
    
    if (this.theme === 'light') {
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      gradient.addColorStop(0.5, 'rgba(248, 250, 252, 0.9)');
      gradient.addColorStop(1, 'rgba(241, 245, 249, 0.85)');
    } else {
      gradient.addColorStop(0, 'rgba(10, 10, 10, 0.95)');
      gradient.addColorStop(0.5, 'rgba(23, 23, 23, 0.9)');
      gradient.addColorStop(1, 'rgba(38, 38, 38, 0.85)');
    }
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private updateParticle(particle: Particle): void {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    particle.life++;
    
    // Efecto de respiración
    particle.opacity = (Math.sin(particle.life * 0.02) + 1) * 0.25 + 0.1;
    
    // Rebote en los bordes
    if (particle.x <= 0 || particle.x >= this.canvas.width) {
      particle.speedX *= -1;
    }
    if (particle.y <= 0 || particle.y >= this.canvas.height) {
      particle.speedY *= -1;
    }
    
    // Mantener dentro de los límites
    particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
    particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
  }

  private drawParticle(particle: Particle): void {
    this.ctx.save();
    this.ctx.globalAlpha = particle.opacity;
    this.ctx.fillStyle = particle.color;
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Efecto de brillo
    const glowGradient = this.ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, particle.size * 3
    );
    glowGradient.addColorStop(0, particle.color);
    glowGradient.addColorStop(1, 'transparent');
    
    this.ctx.fillStyle = glowGradient;
    this.ctx.globalAlpha = particle.opacity * 0.3;
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.restore();
  }

  private updateFloatingShape(shape: FloatingShape): void {
    shape.x += shape.speedX;
    shape.y += shape.speedY;
    shape.rotation += shape.rotationSpeed;
    
    // Rebote en los bordes
    if (shape.x <= -shape.size || shape.x >= this.canvas.width + shape.size) {
      shape.speedX *= -1;
    }
    if (shape.y <= -shape.size || shape.y >= this.canvas.height + shape.size) {
      shape.speedY *= -1;
    }
  }

  private drawFloatingShape(shape: FloatingShape): void {
    this.ctx.save();
    this.ctx.globalAlpha = shape.opacity;
    this.ctx.translate(shape.x, shape.y);
    this.ctx.rotate(shape.rotation);
    this.ctx.fillStyle = shape.color;
    this.ctx.strokeStyle = shape.color;
    this.ctx.lineWidth = 2;
    
    switch (shape.type) {
      case 'circle':
        this.ctx.beginPath();
        this.ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
        this.ctx.stroke();
        break;
      case 'triangle':
        this.ctx.beginPath();
        this.ctx.moveTo(0, -shape.size / 2);
        this.ctx.lineTo(-shape.size / 2, shape.size / 2);
        this.ctx.lineTo(shape.size / 2, shape.size / 2);
        this.ctx.closePath();
        this.ctx.stroke();
        break;
      case 'square':
        this.ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
        break;
    }
    
    this.ctx.restore();
  }

  private drawConnections(): void {
    const maxDistance = 120;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.1;
          
          this.ctx.save();
          this.ctx.globalAlpha = opacity;
          this.ctx.strokeStyle = this.theme === 'light' ? '#3b82f6' : '#60a5fa';
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }
  }

  private drawMouseEffect(): void {
    if (this.mouseX === 0 && this.mouseY === 0) return;
    
    const gradient = this.ctx.createRadialGradient(
      this.mouseX, this.mouseY, 0,
      this.mouseX, this.mouseY, 100
    );
    
    const color = this.theme === 'light' ? '59, 130, 246' : '96, 165, 250';
    gradient.addColorStop(0, `rgba(${color}, 0.1)`);
    gradient.addColorStop(1, 'transparent');
    
    this.ctx.save();
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(this.mouseX, this.mouseY, 100, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  private startAnimation(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const animate = () => {
      this.time += 0.01;
      this.drawParticles();
      this.animationFrameId = requestAnimationFrame(animate);
    };
    animate();
  }
}