import { Component, AfterViewInit } from '@angular/core';
import {NavComponent} from "../../components/nav/nav.component";
import {ScrollService} from "../../utils/scroll.service";
import {AboutMeComponent} from "../about-me/about-me.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    NavComponent,
    AboutMeComponent
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  constructor(private scrollService: ScrollService) {}

  ngAfterViewInit(): void {
    this.createAnimatedBackground();
  }

  createAnimatedBackground(): void {
    const canvas = document.getElementById('animated-background') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('El contexto 2D del canvas no está disponible.');
      return;
    }

    // Configuración inicial del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    const numParticles = 100;

    // Clase para las partículas
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Rebotar en los bordes
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;

        // Cambiar el color según el tema
        const particleColor = document.body.classList.contains('dark-theme')
          ? 'rgba(255, 255, 255, 0.4)' // Color más claro para modo oscuro
          : 'rgba(0, 0, 0, 0.4)'; // Color más oscuro para modo claro

        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Crear partículas
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    // Función para conectar partículas
    function connect() {
      if (!ctx) return;

      // Cambiar el color según el tema
      const lineColor = document.body.classList.contains('dark-theme')
        ? 'rgba(255, 255, 255, 0.1)' // Líneas más claras para modo oscuro
        : 'rgba(0, 0, 0, 0.1)'; // Líneas más oscuras para modo claro

      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    // Animación
    function animate() {
      if (!ctx) return;

      // Limpiar el canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Actualizar y dibujar partículas
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      // Conectar partículas
      connect();

      // Repetir la animación
      requestAnimationFrame(animate);
    }

    // Iniciar la animación
    animate();

    // Ajustar tamaño del canvas al redimensionar la ventana
    window.addEventListener('resize', () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  scrollToAboutMe(): void {
    const section = document.getElementById('aboutme');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
