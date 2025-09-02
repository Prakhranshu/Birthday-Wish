import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, style, animate, transition, keyframes, query, stagger } from '@angular/animations';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [
    trigger('pageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('1000ms cubic-bezier(0.25, 0.8, 0.25, 1)', 
          style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    
    trigger('titleAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        animate('1200ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    
    trigger('messageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px) scale(0.9)' }),
        animate('800ms 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ])
    ]),
    
    trigger('buttonAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('1000ms 1000ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          keyframes([
            style({ opacity: 0, transform: 'translateY(50px)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateY(10px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(-5px)', offset: 0.8 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
          ]))
      ])
    ]),
    
    trigger('loadingAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
  message = "Happy Birthday Lavanya – This one's from your sibling from another soul…";
  displayedText = '';
  fullText = 'Welcome to A Walk Down Memory Lane';
  typingSpeed = 80;
  currentIndex = 0;
  isLoading = false;
  
  private isBrowser: boolean;
  private confettiInterval: any;
  private typewriterTimeout: any;
  private backgroundAudio: HTMLAudioElement | null = null;

  constructor(
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.initializeComponent();
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.launchInitialConfetti();
        this.startContinuousConfetti();
      }, 500);
    }
  }

  ngOnDestroy() {
    // Clean up resources
    if (this.confettiInterval) {
      clearInterval(this.confettiInterval);
    }
    if (this.typewriterTimeout) {
      clearTimeout(this.typewriterTimeout);
    }
    if (this.backgroundAudio) {
      this.backgroundAudio.pause();
      this.backgroundAudio = null;
    }
  }

  private initializeComponent() {
    // Start typing animation with a slight delay
    setTimeout(() => {
      this.typeWriter();
    }, 1200);
    
    // Initialize subtle background music (optional)
    this.initializeBackgroundAudio();
    
    // Add page visibility change listener
    if (this.isBrowser) {
      document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }
  }

  private initializeBackgroundAudio() {
    if (this.isBrowser) {
      try {
        // You can add a subtle background melody here
        // this.backgroundAudio = new Audio('assets/audio/gentle-melody.mp3');
        // this.backgroundAudio.volume = 0.1;
        // this.backgroundAudio.loop = true;
      } catch (error) {
        console.log('Background audio not available');
      }
    }
  }

  private handleVisibilityChange() {
    if (document.hidden) {
      if (this.confettiInterval) {
        clearInterval(this.confettiInterval);
      }
    } else {
      this.startContinuousConfetti();
    }
  }

  typeWriter() {
    if (this.currentIndex < this.fullText.length) {
      this.displayedText += this.fullText.charAt(this.currentIndex);
      this.currentIndex++;
      
      // Add natural typing variation
      const variation = Math.random() * 50;
      this.typewriterTimeout = setTimeout(() => this.typeWriter(), this.typingSpeed + variation);
    } else {
      // Typing complete - trigger any completion effects
      this.onTypingComplete();
    }
  }

  private onTypingComplete() {
    // Add completion particle effect
    if (this.isBrowser) {
      this.launchTypingCompleteEffect();
    }
    
    // Add gentle haptic feedback if supported
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 100, 50]);
    }
  }

  private launchTypingCompleteEffect() {
    const count = 30;
    const defaults = {
      origin: { y: 0.4 },
      spread: 50,
      ticks: 100,
      gravity: 0.8,
      decay: 0.94,
      startVelocity: 20,
      colors: ['#ff9a9e', '#fecfef', '#a8edea', '#667eea', '#764ba2']
    };

    confetti({
      ...defaults,
      particleCount: count,
      origin: { x: 0.5, y: 0.4 }
    });
  }

  launchInitialConfetti() {
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 30, 
      spread: 360, 
      ticks: 60, 
      zIndex: 1000,
      colors: ['#ff9a9e', '#fecfef', '#a8edea', '#667eea', '#764ba2', '#ffd89b']
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 40 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      });
    }, 200);
  }

  private startContinuousConfetti() {
    // Gentle continuous confetti effect
    this.confettiInterval = setInterval(() => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#ff9a9e', '#fecfef', '#a8edea']
      });
      
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#667eea', '#764ba2', '#ffd89b']
      });
    }, 3000);
  }

  onButtonHover() {
    // Launch confetti on button hover
    if (this.isBrowser) {
      confetti({
        particleCount: 15,
        spread: 40,
        origin: { y: 0.7 },
        colors: ['#667eea', '#764ba2']
      });
    }
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  }

  onButtonLeave() {
    // Optional: Add any button leave animations
  }

  startJourney() {
    this.isLoading = true;
    
    // Launch celebration confetti
    this.launchJourneyConfetti();
    
    // Play success sound if available
    this.playSuccessSound();
    
    // Add haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
    
    // Navigate after a brief delay for better UX
    setTimeout(() => {
      this.router.navigate(['/journey']).then(() => {
        this.isLoading = false;
      });
    }, 1500);
  }

  private launchJourneyConfetti() {
    const count = 100;
    const defaults = {
      origin: { y: 0.7 },
      spread: 120,
      ticks: 200,
      gravity: 1.2,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#ff9a9e', '#fecfef', '#a8edea', '#667eea', '#764ba2', '#ffd89b']
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }

  private playSuccessSound() {
    if (this.isBrowser) {
      try {
        // You can add a success sound here
        // const audio = new Audio('assets/audio/success.mp3');
        // audio.volume = 0.3;
        // audio.play().catch(() => {});
      } catch (error) {
        console.log('Success sound not available');
      }
    }
  }

  // Optional: Method to handle keyboard navigation
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.startJourney();
    }
  }

  // Helper method for accessibility
  getFocusableElements(): NodeListOf<HTMLElement> {
    return document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  }
}