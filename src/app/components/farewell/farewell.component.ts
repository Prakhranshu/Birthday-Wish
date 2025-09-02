import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { trigger, style, animate, transition, keyframes, query, stagger } from '@angular/animations';

interface Memory {
  photo: string;
  title: string;
  caption: string;
  emotion: string;
  theme: string;
  feeling: string;
}

interface Reflection {
  message: string;
  author: string;
  emotion: string;
  ornament: string;
}

interface JourneyMilestone {
  date: string;
  title: string;
  description: string;
  sentiment: string;
  icon: string;
  type: 'past' | 'present' | 'future';
}

@Component({
  selector: 'app-farewell',
  templateUrl: './farewell.component.html',
  styleUrls: ['./farewell.component.scss'],
  animations: [
    trigger('pageEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95) translateY(20px)' }),
        animate('1200ms cubic-bezier(0.25, 0.8, 0.25, 1)', 
          style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ])
    ]),
    trigger('headerAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        animate('1000ms 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('galleryAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(80px)' }),
        animate('1200ms 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('gridAnimation', [
      transition(':enter', [
        query('.memory-card', [
          style({ opacity: 0, transform: 'scale(0.8) translateY(50px)' }),
          stagger(150, [
            animate('800ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
              style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('showcaseAnimation', [
      transition(':enter', [
        style({ 
          opacity: 0, 
          transform: 'scale(0.7) rotate(-5deg)',
          filter: 'blur(15px)'
        }),
        animate('1000ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          keyframes([
            style({ 
              opacity: 0, 
              transform: 'scale(0.7) rotate(-5deg)', 
              filter: 'blur(15px)',
              offset: 0 
            }),
            style({ 
              opacity: 0.7, 
              transform: 'scale(0.9) rotate(-1deg)', 
              filter: 'blur(8px)',
              offset: 0.6 
            }),
            style({ 
              opacity: 1, 
              transform: 'scale(1) rotate(0deg)', 
              filter: 'blur(0px)',
              offset: 1 
            })
          ]))
      ]),
      transition(':leave', [
        animate('500ms ease-in', 
          style({ 
            opacity: 0, 
            transform: 'scale(0.8) rotate(3deg)',
            filter: 'blur(10px)'
          }))
      ])
    ]),
    trigger('memoryCardAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    trigger('buttonHover', [
      transition(':enter', [
        style({ transform: 'scale(0.9)', opacity: 0 }),
        animate('400ms ease-out', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    trigger('controlsAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('800ms 800ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('reflectionAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-60px)' }),
        animate('900ms 1000ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('reflectionItemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px) rotate(-2deg)' }),
        animate('600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateY(0) rotate(0deg)' }))
      ])
    ]),
    trigger('timelineAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(80px)' }),
        animate('1000ms 1200ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('milestoneAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('700ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('statsAnimation', [
      transition(':enter', [
        query('.stat-card', [
          style({ opacity: 0, transform: 'translateY(50px) rotate(-10deg)' }),
          stagger(200, [
            animate('800ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
              style({ opacity: 1, transform: 'translateY(0) rotate(0deg)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('backNavAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('700ms 1400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('formSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px) scale(0.95)' }),
        animate('500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', 
          style({ opacity: 0, transform: 'translateY(-20px) scale(0.95)' }))
      ])
    ])
  ]
})
export class FarewellComponent implements OnInit, OnDestroy {
  photos = [
    'assets/Farewell/WhatsApp Image 2025-05-15 at 14.19.52_4f313f11.jpg',
    'assets/Farewell/WhatsApp Image 2025-05-15 at 14.19.56_28344855.jpg'
  ];

  memories: Memory[] = [
    {
      photo: this.photos[0],
      title: 'The Final Goodbye',
      caption: 'A moment frozen in time, capturing the bittersweet essence of farewell',
      emotion: '😢',
      theme: 'Departure',
      feeling: 'Melancholic'
    },
    {
      photo: this.photos[1],
      title: 'Last Moments Together',
      caption: 'Cherishing every second before the paths diverge',
      emotion: '💝',
      theme: 'Togetherness',
      feeling: 'Grateful'
    }
  ];

  reflections: Reflection[] = [
    {
      message: 'Every ending is a new beginning. Though we part ways, the memories we\'ve created will forever be etched in our hearts.',
      author: 'A Dear Friend',
      emotion: '🌟',
      ornament: '✨'
    },
    {
      message: 'Distance may separate us, but the bond we share transcends all boundaries. Until we meet again.',
      author: 'Someone Special',
      emotion: '💫',
      ornament: '🌈'
    },
    {
      message: 'Thank you for being part of this beautiful journey. May your path ahead be filled with joy and success.',
      author: 'With Love',
      emotion: '💕',
      ornament: '🦋'
    }
  ];

  journeyMilestones: JourneyMilestone[] = [
    {
      date: 'Beginning',
      title: 'First Meeting',
      description: 'The day our paths first crossed, unaware of the beautiful journey ahead.',
      sentiment: '😊',
      icon: '🌱',
      type: 'past'
    },
    {
      date: 'Journey',
      title: 'Shared Adventures',
      description: 'Countless moments of laughter, learning, and growing together.',
      sentiment: '🎉',
      icon: '🌟',
      type: 'past'
    },
    {
      date: 'Today',
      title: 'The Farewell',
      description: 'A difficult but necessary goodbye as we embark on separate paths.',
      sentiment: '😢',
      icon: '🛤️',
      type: 'present'
    },
    {
      date: 'Tomorrow',
      title: 'New Beginnings',
      description: 'Exciting adventures await as we carry forward the lessons learned.',
      sentiment: '🌈',
      icon: '🚀',
      type: 'future'
    },
    {
      date: 'Someday',
      title: 'Reunion',
      description: 'When our paths cross again, we\'ll share stories of growth and achievement.',
      sentiment: '✨',
      icon: '🤗',
      type: 'future'
    }
  ];

  emotionFilters = [
    { label: 'All', value: 'all', emoji: '🌈' },
    { label: 'Sad', value: 'sad', emoji: '😢' },
    { label: 'Grateful', value: 'grateful', emoji: '💝' },
    { label: 'Hopeful', value: 'hopeful', emoji: '🌟' },
    { label: 'Nostalgic', value: 'nostalgic', emoji: '💭' }
  ];

  message = "Goodbyes don't mean the end — they just mark new beginnings.";
  selectedMemory: Memory | null = null;
  currentFilter = 'all';
  isSlideshowActive = false;
  showReflectionForm = false;

  newReflection: Partial<Reflection> = {
    message: '',
    author: '',
    emotion: ''
  };

  private slideshowTimer: any;
  private currentSlideshowIndex = 0;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.preloadImages();
      document.addEventListener('keydown', this.handleKeyPress.bind(this));
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.stopSlideshow();
      document.removeEventListener('keydown', this.handleKeyPress.bind(this));
    }
  }

  private preloadImages() {
    this.photos.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  selectMemory(memory: Memory, index: number) {
    this.selectedMemory = memory;
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(40);
    }
  }

  closeShowcase() {
    this.selectedMemory = null;
    this.stopSlideshow();
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(30);
    }
  }

  navigateMemory(direction: 'prev' | 'next') {
    if (!this.selectedMemory) return;
    
    const currentIndex = this.memories.findIndex(m => m.photo === this.selectedMemory!.photo);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % this.memories.length;
    } else {
      newIndex = (currentIndex - 1 + this.memories.length) % this.memories.length;
    }
    
    this.selectedMemory = this.memories[newIndex];
    
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(25);
    }
  }

  startMemorySlideshow() {
    if (this.isSlideshowActive) {
      this.stopSlideshow();
      return;
    }

    this.isSlideshowActive = true;
    this.currentSlideshowIndex = 0;
    this.selectedMemory = this.memories[0];

    this.slideshowTimer = setInterval(() => {
      this.currentSlideshowIndex = (this.currentSlideshowIndex + 1) % this.memories.length;
      this.selectedMemory = this.memories[this.currentSlideshowIndex];
    }, 4000); // Slower pace for emotional reflection

    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(60);
    }
  }

  stopSlideshow() {
    if (this.slideshowTimer) {
      clearInterval(this.slideshowTimer);
      this.slideshowTimer = null;
    }
    this.isSlideshowActive = false;
  }

  shuffleMemories() {
    // Fisher-Yates shuffle
    const shuffled = [...this.memories];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    this.memories = shuffled;
    
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }

  addReflection() {
    this.showReflectionForm = !this.showReflectionForm;
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(40);
    }
  }

  submitReflection() {
    if (this.newReflection.message && this.newReflection.author && this.newReflection.emotion) {
      const ornaments = ['🌟', '✨', '🌈', '🦋', '💫', '🌸', '🍃'];
      const reflection: Reflection = {
        message: this.newReflection.message,
        author: this.newReflection.author,
        emotion: this.newReflection.emotion,
        ornament: ornaments[Math.floor(Math.random() * ornaments.length)]
      };
      
      this.reflections.unshift(reflection);
      this.resetReflectionForm();
      
      if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
        navigator.vibrate([50, 100, 50]);
      }
    }
  }

  cancelReflection() {
    this.resetReflectionForm();
  }

  private resetReflectionForm() {
    this.showReflectionForm = false;
    this.newReflection = {
      message: '',
      author: '',
      emotion: ''
    };
  }

  filterByEmotion(filter: string) {
    this.currentFilter = filter;
    // Implementation for filtering would go here
    // For now, we'll just update the active filter
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(30);
    }
  }

  onImageLoad() {
    console.log('Farewell image loaded successfully');
  }

  onImageError() {
    console.error('Failed to load farewell image');
  }

  private handleKeyPress(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        if (this.selectedMemory) {
          this.closeShowcase();
        } else if (this.showReflectionForm) {
          this.cancelReflection();
        } else if (this.isSlideshowActive) {
          this.stopSlideshow();
        }
        break;
      case 'ArrowLeft':
        if (this.selectedMemory) {
          event.preventDefault();
          this.navigateMemory('prev');
        }
        break;
      case 'ArrowRight':
        if (this.selectedMemory) {
          event.preventDefault();
          this.navigateMemory('next');
        }
        break;
      case ' ':
        event.preventDefault();
        this.startMemorySlideshow();
        break;
      case 's':
      case 'S':
        if (!this.selectedMemory) {
          this.shuffleMemories();
        }
        break;
      case 'r':
      case 'R':
        if (!this.selectedMemory) {
          this.addReflection();
        }
        break;
      case 'Enter':
        if (this.showReflectionForm) {
          event.preventDefault();
          this.submitReflection();
        }
        break;
    }
  }

  shareMemory() {
    if (!this.selectedMemory) return;
    
    if (navigator.share) {
      navigator.share({
        title: 'Farewell Moments',
        text: `A precious farewell memory: ${this.selectedMemory.title}. ${this.message}`,
        url: window.location.href
      }).catch(err => console.log('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        console.log('Link copied to clipboard');
      });
    }
    
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }

  goBack() {
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
    this.router.navigate(['/journey']); // Adjust route as needed
  }

  // Touch/swipe support for mobile
  onTouchStart(event: TouchEvent) {
    if (!this.selectedMemory) return;
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    if (!this.selectedMemory) return;
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private touchStartX = 0;
  private touchEndX = 0;

  private handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = this.touchStartX - this.touchEndX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        this.navigateMemory('next');
      } else {
        this.navigateMemory('prev');
      }
    }
  }

  // Helper methods for dynamic content
  getFilteredMemories(): Memory[] {
    if (this.currentFilter === 'all') {
      return this.memories;
    }
    return this.memories.filter(memory => 
      memory.feeling.toLowerCase().includes(this.currentFilter) ||
      memory.theme.toLowerCase().includes(this.currentFilter)
    );
  }

  getRandomDelay(): string {
    return (Math.random() * 0.8).toFixed(2) + 's';
  }

  getMemoryIndex(memory: Memory): number {
    return this.memories.indexOf(memory);
  }
}