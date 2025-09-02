import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { trigger, style, animate, transition, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-birthday-meetup',
  templateUrl: './birthday-meetup.component.html',
  styleUrls: ['./birthday-meetup.component.scss'],
  animations: [
    trigger('pageEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('1000ms cubic-bezier(0.25, 0.8, 0.25, 1)', 
          style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('headerAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-40px)' }),
        animate('800ms 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('galleryAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(60px)' }),
        animate('1000ms 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('gridAnimation', [
      transition(':enter', [
        query('.photo-card', [
          style({ opacity: 0, transform: 'scale(0.8) translateY(40px)' }),
          stagger(100, [
            animate('600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
              style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('featuredImageAnimation', [
      transition(':enter', [
        style({ 
          opacity: 0, 
          transform: 'scale(0.8) rotate(-10deg)',
          filter: 'blur(10px)'
        }),
        animate('800ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          keyframes([
            style({ 
              opacity: 0, 
              transform: 'scale(0.8) rotate(-10deg)', 
              filter: 'blur(10px)',
              offset: 0 
            }),
            style({ 
              opacity: 0.5, 
              transform: 'scale(0.95) rotate(-2deg)', 
              filter: 'blur(5px)',
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
        animate('400ms ease-in', 
          style({ 
            opacity: 0, 
            transform: 'scale(0.8)',
            filter: 'blur(5px)'
          }))
      ])
    ]),
    trigger('photoHover', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    trigger('buttonHover', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('300ms ease-out', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    trigger('controlsAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('700ms 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('statsAnimation', [
      transition(':enter', [
        query('.stat-card', [
          style({ opacity: 0, transform: 'translateY(40px) rotate(-10deg)' }),
          stagger(150, [
            animate('700ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
              style({ opacity: 1, transform: 'translateY(0) rotate(0deg)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('timelineAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('800ms 900ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('timelineItemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('backNavAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-40px)' }),
        animate('600ms 1000ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class BirthdayMeetupComponent implements OnInit, OnDestroy {
  photos = [
    'assets/20th-birthday/IMG-20250724-WA0011.jpg',
    'assets/20th-birthday/IMG-20250724-WA0016.jpg',
    'assets/20th-birthday/IMG-20250724-WA0021.jpg',
    'assets/20th-birthday/IMG-20250724-WA0022.jpg',
    'assets/20th-birthday/IMG-20250724-WA0027.jpg'
  ];

  originalPhotos = [...this.photos]; // Keep original order for reset

  photoTitles = [
    'Birthday Celebration Begins',
    'Joyful Moments',
    'Sweet Memories',
    'Happy Together',
    'Perfect Day'
  ];

  photoDescriptions = [
    'The perfect start to an amazing birthday celebration',
    'Capturing pure happiness and laughter',
    'Creating memories that will last forever',
    'Surrounded by love and good vibes',
    'A day filled with joy and celebration'
  ];

  timelineMoments = [
    {
      time: '12:00 AM',
      title: "Lavanya's Birthday",
      description: 'Getting ready for the special celebration with excitement and anticipation.',
      emoji: '🎪'
    },
    {
      time: '8:00 AM',
      title: 'Miss Lavanya Arrives to Campus',
      description: "Whole Campus couldn't stop wishing her.",
      emoji: '👥'
    },
    {
      time: '4:00 PM',
      title: 'Planning to meet after college',
      description: 'I probably skipped last few minutes of class cause of course Miss Lavanya would never.',
      emoji: '🎂'
    },
    {
      time: '5:00 PM',
      title: 'Searching for a perfect spot',
      description: 'Here...there....where???',
      emoji: '📸'
    },
    {
      time: '5:30 PM',
      title: 'Photoshoot Begins',
      description: 'Requesting Miss Lavanya to hold on a little before leaving',
      emoji: '💃'
    },
    {
      time: '6:00 PM',
      title: 'Memorable End',
      description: 'A perfect ending to a perfect birthday celebration.',
      emoji: '🌟'
    }
  ];

  viewModes = [
    { label: 'Grid', value: 'grid' },
    { label: 'Masonry', value: 'masonry' },
    { label: 'Carousel', value: 'carousel' }
  ];

  message = 'Celebrating your special day with joy and laughter.';
  selectedPhoto: string | null = null;
  currentViewMode = 'grid';
  isSlideshowActive = false;

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

  selectPhoto(photo: string, index: number) {
    this.selectedPhoto = photo;
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(30);
    }
  }

  closeFeaturedView() {
    this.isSlideshowActive = false;
    this.stopSlideshow();
    this.selectedPhoto = null;
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(20);
    }
  }

  shufflePhotos() {
    // Fisher-Yates shuffle algorithm
    const shuffled = [...this.photos];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    this.photos = shuffled;
    
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }

  resetGallery() {
    this.photos = [...this.originalPhotos];
    this.selectedPhoto = null;
    this.stopSlideshow();
    this.currentViewMode = 'grid';
    
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(40);
    }
  }

  startSlideshow() {
    if (this.isSlideshowActive) {
      this.stopSlideshow();
      return;
    }

    this.isSlideshowActive = true;
    this.currentSlideshowIndex = 0;
    this.selectedPhoto = this.photos[0];

    this.slideshowTimer = setInterval(() => {
      this.currentSlideshowIndex = (this.currentSlideshowIndex + 1) % this.photos.length;
      this.selectedPhoto = this.photos[this.currentSlideshowIndex];
    }, 3000);

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

  setViewMode(mode: string) {
    this.currentViewMode = mode;
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(25);
    }
  }

  getPhotoTitle(index: number): string {
    return this.photoTitles[index] || `Birthday Moment ${index + 1}`;
  }

  getPhotoDescription(index: number): string {
    return this.photoDescriptions[index] || 'A wonderful moment from the birthday celebration';
  }

  getFeaturedCaption(): string {
    if (!this.selectedPhoto) return '';
    const index = this.photos.indexOf(this.selectedPhoto);
    return this.getPhotoTitle(index);
  }

  getFeaturedDescription(): string {
    if (!this.selectedPhoto) return '';
    const index = this.photos.indexOf(this.selectedPhoto);
    return this.getPhotoDescription(index);
  }

  onImageLoad() {
    console.log('Birthday image loaded successfully');
  }

  onImageError() {
    console.error('Failed to load birthday image');
  }

  private handleKeyPress(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        if (this.selectedPhoto) {
          this.closeFeaturedView();
        } else if (this.isSlideshowActive) {
          this.stopSlideshow();
        }
        break;
      case 'ArrowLeft':
        if (this.selectedPhoto) {
          event.preventDefault();
          this.navigateFeatured('prev');
        }
        break;
      case 'ArrowRight':
        if (this.selectedPhoto) {
          event.preventDefault();
          this.navigateFeatured('next');
        }
        break;
      case ' ':
        event.preventDefault();
        this.startSlideshow();
        break;
      case 's':
      case 'S':
        if (!this.selectedPhoto) {
          this.shufflePhotos();
        }
        break;
      case 'r':
      case 'R':
        if (!this.selectedPhoto) {
          this.resetGallery();
        }
        break;
    }
  }

  private navigateFeatured(direction: 'prev' | 'next') {
    if (!this.selectedPhoto) return;
    
    const currentIndex = this.photos.indexOf(this.selectedPhoto);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % this.photos.length;
    } else {
      newIndex = (currentIndex - 1 + this.photos.length) % this.photos.length;
    }
    
    this.selectedPhoto = this.photos[newIndex];
    
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(30);
    }
  }

  sharePhoto() {
    if (!this.selectedPhoto) return;
    
    if (navigator.share) {
      const index = this.photos.indexOf(this.selectedPhoto);
      navigator.share({
        title: 'Birthday Meetup 2023',
        text: `Check out this amazing moment from the birthday celebration: ${this.getPhotoTitle(index)}`,
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
    if (!this.selectedPhoto) return;
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    if (!this.selectedPhoto) return;
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
        this.navigateFeatured('next');
      } else {
        this.navigateFeatured('prev');
      }
    }
  }

  // Auto-resize grid based on view mode
  getGridClass(): string {
    switch (this.currentViewMode) {
      case 'masonry':
        return 'photo-grid masonry-grid';
      case 'carousel':
        return 'photo-grid carousel-grid';
      default:
        return 'photo-grid';
    }
  }

  // Generate random animation delays for variety
  getRandomDelay(): string {
    return (Math.random() * 0.5).toFixed(2) + 's';
  }
}