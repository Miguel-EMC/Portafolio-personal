import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PortafolioComponent } from "../portfolio/portfolio/portafolio.component";
import { RouterLink } from "@angular/router";
import { NgClass, NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    TranslateModule,
    PortafolioComponent,
    RouterLink,
    NgClass,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  // Typing animation
  currentRole = '';
  isTyping = false;
  private typingInterval: any;
  private roles = [
    'Full Stack Developer',
    'Frontend Developer', 
    'Backend Developer',
    'Mobile Developer'
  ];
  private currentRoleIndex = 0;

  // Interactive cards
  activeCard = 'code';

  // Top skills for about section
  topSkills = ['Angular', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL'];

  ngOnInit() {
    this.startTypingAnimation();
    this.initializeActiveCard();
  }

  ngOnDestroy() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
  }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80;
      const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  setActiveCard(cardType: string): void {
    this.activeCard = cardType;
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
        setTimeout(typeChar, 100);
      } else {
        this.isTyping = false;
        setTimeout(() => {
          this.eraseText();
        }, 2000);
      }
    };

    typeChar();
  }

  private eraseText(): void {
    this.isTyping = true;
    const eraseChar = () => {
      if (this.currentRole.length > 0) {
        this.currentRole = this.currentRole.slice(0, -1);
        setTimeout(eraseChar, 50);
      } else {
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
        setTimeout(() => {
          this.typeText(this.roles[this.currentRoleIndex]);
        }, 500);
      }
    };

    eraseChar();
  }

  private initializeActiveCard(): void {
    // Rotate active card every 3 seconds
    const cards = ['code', 'design', 'tech'];
    let cardIndex = 0;

    setInterval(() => {
      cardIndex = (cardIndex + 1) % cards.length;
      this.activeCard = cards[cardIndex];
    }, 3000);
  }
}
