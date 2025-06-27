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
  pulse: number;
}

interface GeometricShape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: 'circle' | 'triangle' | 'square' | 'hexagon';
  color: string;
  strokeWidth: number;
}

interface Connection {
  particle1: Particle;
  particle2: Particle;
  opacity: number;
}

@Injectable({
  providedIn: 'root',
})
export class AnimatedBackgroundService {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private shapes: GeometricShape[] = [];
  private connections: Connection[] = [];
  private theme: 'light' | 'dark' = 'light';
  private animationFrameId!: number;
  private mouseX = 0;
  private mouseY = 0;
  private time = 0;
  private isInitialized = false;

  // Configuración profesional
  private readonly config = {
    particles: {
      count: 50,
      maxSpeed: 0.5,
      maxSize: 3,
      minSize: 1,
      connectionDistance: 120,
      mouseInfluence: 80
    },
    shapes: {
      count: 8,
      maxSpeed: 0.3,
      maxSize: 40,
      minSize: 20
    },
    colors: {
      light: {
        primary: '#3b82f6',
        secondary: '#10b981',
        tertiary: '#8b5cf6',
        accent: '#06b6d4'
      },
      dark: {
        primary: '#60a5fa',
        secondary: '#34d399',
        tertiary: '#a78bfa',
        accent: '#22d3ee'
      }
    }
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  init(canvas: HTMLCanvasElement): void {
    if (!isPlatformBrowser(this.platformId) || this.isInitialized) return;
    
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;
    
    if (!this.ctx) return;
    
    this.isInitialized = true;
    this.resizeCanvas();
    this.createParticles();
    this.createShapes();
    this.setupEventListeners();
    this.startAnimation();
  }

  toggleTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.updateColors();
  }

  destroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.isInitialized = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.removeEventListeners();
  }

  private setupEventListeners(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    window.addEventListener('resize', this.handleResize.bind(this));
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('touchmove', this.handleTouchMove.bind(this));
  }

  private removeEventListeners(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    window.removeEventListener('resize', this.handleResize.bind(this));
    window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    window.removeEventListener('touchmove', this.handleTouchMove.bind(this));
  }

  private handleResize(): void {
    this.resizeCanvas();
    this.createParticles();
    this.createShapes();
  }

  private handleMouseMove(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  private handleTouchMove(event: TouchEvent): void {
    if (event.touches.length > 0) {
      this.mouseX = event.touches[0].clientX;
      this.mouseY = event.touches[0].clientY;
    }
  }

  private resizeCanvas(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
    
    this.ctx.scale(dpr, dpr);
  }

  private createParticles(): void {
    this.particles = [];
    const particleCount = Math.min(
      this.config.particles.count,
      Math.floor((this.canvas.width * this.canvas.height) / 20000)
    );
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle(): Particle {
    const colors = this.getColorPalette();
    const size = Math.random() * (this.config.particles.maxSize - this.config.particles.minSize) + this.config.particles.minSize;
    
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size,
      speedX: (Math.random() - 0.5) * this.config.particles.maxSpeed,
      speedY: (Math.random() - 0.5) * this.config.particles.maxSpeed,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 300 + 200,
      pulse: Math.random() * Math.PI * 2
    };
  }

  private createShapes(): void {
    this.shapes = [];
    const shapeCount = Math.min(
      this.config.shapes.count,
      Math.floor((this.canvas.width * this.canvas.height) / 100000)
    );
    
    for (let i = 0; i < shapeCount; i++) {
      this.shapes.push(this.createShape());
    }
  }

  private createShape(): GeometricShape {
    const types: ('circle' | 'triangle' | 'square' | 'hexagon')[] = ['circle', 'triangle', 'square', 'hexagon'];
    const colors = this.getColorPalette();
    const size = Math.random() * (this.config.shapes.maxSize - this.config.shapes.minSize) + this.config.shapes.minSize;
    
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      speedX: (Math.random() - 0.5) * this.config.shapes.maxSpeed,
      speedY: (Math.random() - 0.5) * this.config.shapes.maxSpeed,
      opacity: Math.random() * 0.15 + 0.05,
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      strokeWidth: Math.random() * 2 + 1
    };
  }

  private getColorPalette(): string[] {
    const palette = this.config.colors[this.theme];
    return [palette.primary, palette.secondary, palette.tertiary, palette.accent];
  }

  private updateColors(): void {
    const colors = this.getColorPalette();
    
    this.particles.forEach(particle => {
      particle.color = colors[Math.floor(Math.random() * colors.length)];
    });
    
    this.shapes.forEach(shape => {
      shape.color = colors[Math.floor(Math.random() * colors.length)];
    });
  }

  private startAnimation(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const animate = () => {
      if (!this.isInitialized) return;
      
      this.time += 0.016; // ~60fps
      this.update();
      this.render();
      this.animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
  }

  private update(): void {
    // Actualizar partículas
    this.particles.forEach((particle, index) => {
      this.updateParticle(particle);
      
      // Regenerar partícula si ha completado su ciclo
      if (particle.life >= particle.maxLife) {
        this.particles[index] = this.createParticle();
      }
    });

    // Actualizar formas
    this.shapes.forEach(shape => {
      this.updateShape(shape);
    });

    // Calcular conexiones
    this.updateConnections();
  }

  private updateParticle(particle: Particle): void {
    // Movimiento base
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    particle.life++;
    particle.pulse += 0.05;

    // Efecto de mouse
    if (this.mouseX && this.mouseY) {
      const dx = this.mouseX - particle.x;
      const dy = this.mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.config.particles.mouseInfluence) {
        const force = (this.config.particles.mouseInfluence - distance) / this.config.particles.mouseInfluence;
        particle.speedX += (dx / distance) * force * 0.01;
        particle.speedY += (dy / distance) * force * 0.01;
      }
    }

    // Efecto de respiración
    particle.opacity = (Math.sin(particle.pulse) * 0.3 + 0.7) * 
                      (1 - particle.life / particle.maxLife) * 0.8;

    // Rebote en bordes con amortiguación
    if (particle.x <= 0 || particle.x >= this.canvas.width) {
      particle.speedX *= -0.8;
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
    }
    if (particle.y <= 0 || particle.y >= this.canvas.height) {
      particle.speedY *= -0.8;
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
    }

    // Fricción sutil
    particle.speedX *= 0.999;
    particle.speedY *= 0.999;
  }

  private updateShape(shape: GeometricShape): void {
    shape.x += shape.speedX;
    shape.y += shape.speedY;
    shape.rotation += shape.rotationSpeed;

    // Rebote suave en bordes
    if (shape.x <= -shape.size || shape.x >= this.canvas.width + shape.size) {
      shape.speedX *= -1;
    }
    if (shape.y <= -shape.size || shape.y >= this.canvas.height + shape.size) {
      shape.speedY *= -1;
    }

    // Mantener dentro de límites extendidos
    shape.x = Math.max(-shape.size, Math.min(this.canvas.width + shape.size, shape.x));
    shape.y = Math.max(-shape.size, Math.min(this.canvas.height + shape.size, shape.y));
  }

  private updateConnections(): void {
    this.connections = [];
    const maxConnections = 50; // Limitar para performance
    
    for (let i = 0; i < this.particles.length && this.connections.length < maxConnections; i++) {
      for (let j = i + 1; j < this.particles.length && this.connections.length < maxConnections; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.config.particles.connectionDistance) {
          const opacity = (1 - distance / this.config.particles.connectionDistance) * 0.3;
          this.connections.push({ particle1: p1, particle2: p2, opacity });
        }
      }
    }
  }

  private render(): void {
    // Limpiar canvas con gradiente sutil
    this.clearCanvas();
    
    // Renderizar conexiones
    this.renderConnections();
    
    // Renderizar formas geométricas
    this.shapes.forEach(shape => this.renderShape(shape));
    
    // Renderizar partículas
    this.particles.forEach(particle => this.renderParticle(particle));
    
    // Efecto de mouse
    this.renderMouseEffect();
  }

  private clearCanvas(): void {
    const gradient = this.ctx.createRadialGradient(
      this.canvas.width / 2, this.canvas.height / 2, 0,
      this.canvas.width / 2, this.canvas.height / 2, Math.max(this.canvas.width, this.canvas.height) / 2
    );
    
    if (this.theme === 'light') {
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
      gradient.addColorStop(0.5, 'rgba(249, 250, 251, 0.95)');
      gradient.addColorStop(1, 'rgba(243, 244, 246, 0.9)');
    } else {
      gradient.addColorStop(0, 'rgba(3, 7, 18, 0.98)');
      gradient.addColorStop(0.5, 'rgba(17, 24, 39, 0.95)');
      gradient.addColorStop(1, 'rgba(31, 41, 55, 0.9)');
    }
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private renderConnections(): void {
    this.connections.forEach(connection => {
      this.ctx.save();
      this.ctx.globalAlpha = connection.opacity;
      this.ctx.strokeStyle = this.theme === 'light' ? '#3b82f6' : '#60a5fa';
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(connection.particle1.x, connection.particle1.y);
      this.ctx.lineTo(connection.particle2.x, connection.particle2.y);
      this.ctx.stroke();
      this.ctx.restore();
    });
  }

  private renderParticle(particle: Particle): void {
    this.ctx.save();
    this.ctx.globalAlpha = particle.opacity;
    
    // Partícula principal
    this.ctx.fillStyle = particle.color;
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Efecto de brillo
    const glowGradient = this.ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, particle.size * 4
    );
    glowGradient.addColorStop(0, particle.color);
    glowGradient.addColorStop(1, 'transparent');
    
    this.ctx.fillStyle = glowGradient;
    this.ctx.globalAlpha = particle.opacity * 0.4;
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.restore();
  }

  private renderShape(shape: GeometricShape): void {
    this.ctx.save();
    this.ctx.globalAlpha = shape.opacity;
    this.ctx.translate(shape.x, shape.y);
    this.ctx.rotate(shape.rotation);
    this.ctx.strokeStyle = shape.color;
    this.ctx.lineWidth = shape.strokeWidth;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    
    this.ctx.beginPath();
    
    switch (shape.type) {
      case 'circle':
        this.ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
        break;
      case 'triangle':
        this.ctx.moveTo(0, -shape.size / 2);
        this.ctx.lineTo(-shape.size / 2, shape.size / 2);
        this.ctx.lineTo(shape.size / 2, shape.size / 2);
        this.ctx.closePath();
        break;
      case 'square':
        this.ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
        break;
      case 'hexagon':
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x = Math.cos(angle) * shape.size / 2;
          const y = Math.sin(angle) * shape.size / 2;
          if (i === 0) this.ctx.moveTo(x, y);
          else this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
        break;
    }
    
    this.ctx.stroke();
    this.ctx.restore();
  }

  private renderMouseEffect(): void {
    if (!this.mouseX || !this.mouseY) return;
    
    const gradient = this.ctx.createRadialGradient(
      this.mouseX, this.mouseY, 0,
      this.mouseX, this.mouseY, 100
    );
    
    const color = this.theme === 'light' ? '59, 130, 246' : '96, 165, 250';
    gradient.addColorStop(0, `rgba(${color}, 0.15)`);
    gradient.addColorStop(0.5, `rgba(${color}, 0.05)`);
    gradient.addColorStop(1, 'transparent');
    
    this.ctx.save();
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(this.mouseX, this.mouseY, 100, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }
}