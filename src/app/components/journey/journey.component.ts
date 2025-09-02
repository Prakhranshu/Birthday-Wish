import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, animate, transition, query, stagger, keyframes } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(50px) scale(0.8)' }),
          stagger(150, [
            animate('800ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
              style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
          ])
        ], { optional: true })
      ])
    ]),
    
    // Additional animations for enhanced experience
    trigger('cardHover', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    
    trigger('titleAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('1000ms ease-out', 
          keyframes([
            style({ opacity: 0, transform: 'translateY(30px)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateY(15px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
          ]))
      ])
    ])
  ]
})
export class JourneyComponent implements OnInit, OnDestroy {
  // Enhanced memory cards data with more emotional descriptions
  memories = [
    {
      title: 'Rakhi Day',
      message: 'The day you chose me as your brother - a bond that transcends blood, built on love, trust, and countless shared dreams.',
      route: '/rakhi',
      icon: '🎀',
      color: '#ff6b9d'
    },
    {
      title: 'Your 2023 Birthday Meetup',
      message: 'Celebrating another year of your amazing existence with laughter, cake, and promises of many more birthdays together.',
      route: '/birthday-meetup',
      icon: '🎂',
      color: '#4ecdc4'
    },
    {
      title: 'Farewell',
      message: 'Though we said goodbye to one chapter, we opened another - carrying our friendship beyond college walls into forever.',
      route: '/farewell',
      icon: '🎓',
      color: '#45b7d1'
    },
    {
      title: 'Specials',
      message: 'You - always radiant, always inspiring, always the incredible person who lights up every room you enter.',
      route: '/solo-media',
      icon: '✨',
      color: '#f9ca24'
    }
  ];

  musicPlaying = false;
  private audioContext: AudioContext | null = null;
  private backgroundMusic: HTMLAudioElement | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Initialize any background effects or preload resources
    this.initializeComponent();
  }

  ngOnDestroy() {
    // Clean up audio resources
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  private initializeComponent() {
    // Add any initialization logic here
    // For example, preloading images or setting up audio context
    this.setupAudioContext();
    this.addScrollAnimations();
  }

  private setupAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.log('Web Audio API not supported');
    }
  }

  private addScrollAnimations() {
    // Optional: Add scroll-based animations for enhanced user experience
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe memory cards when they come into view
    setTimeout(() => {
      const cards = document.querySelectorAll('.memory-card');
      cards.forEach(card => observer.observe(card));
    }, 1000);
  }

  toggleMusic() {
    this.musicPlaying = !this.musicPlaying;
    
    if (this.musicPlaying) {
      this.playBackgroundMusic();
    } else {
      this.pauseBackgroundMusic();
    }
    
    // Add haptic feedback if supported
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }

  private playBackgroundMusic() {
    // You can add your background music file here
    // For now, this is a placeholder for the music functionality
    try {
      if (!this.backgroundMusic) {
        // Replace with your actual music file path
        this.backgroundMusic = new Audio('assets/audio/birthday-song.mp3');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.3; // Set comfortable volume
      }
      
      this.backgroundMusic.play().catch(error => {
        console.log('Audio playback failed:', error);
        this.musicPlaying = false;
      });
    } catch (error) {
      console.log('Error playing music:', error);
      this.musicPlaying = false;
    }
  }

  private pauseBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
    }
  }

  navigateTo(route: string) {
    // Add a gentle transition effect before navigation
    const clickedCard = event?.target as HTMLElement;
    if (clickedCard) {
      clickedCard.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.router.navigate([route]);
      }, 150);
    } else {
      this.router.navigate([route]);
    }
    
    // Add haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  }

  // Helper method to get memory color (can be used in template if needed)
  getMemoryColor(index: number): string {
    const colors = ['#ff6b9d', '#4ecdc4', '#45b7d1', '#f9ca24'];
    return colors[index % colors.length];
  }

  // Method to add sparkle effect on card interaction
  onCardInteraction(event: MouseEvent, memoryTitle: string) {
    const card = event.currentTarget as HTMLElement;
    
    // Create floating heart effect
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'absolute';
    heart.style.left = event.offsetX + 'px';
    heart.style.top = event.offsetY + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = '20px';
    heart.style.zIndex = '1000';
    heart.style.animation = 'floatHeart 2s ease-out forwards';
    
    card.appendChild(heart);
    
    // Remove the heart after animation
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 2000);
  }

  // Optional: Method to track user interactions for analytics
  trackMemoryClick(memoryTitle: string) {
    // You can implement analytics tracking here
    console.log(`User clicked on memory: ${memoryTitle}`);
  }
}