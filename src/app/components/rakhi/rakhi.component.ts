import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { trigger, style, animate, transition, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-rakhi',
  templateUrl: './rakhi.component.html',
  styleUrls: ['./rakhi.component.scss'],
  animations: [
    trigger('pageEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('800ms cubic-bezier(0.25, 0.8, 0.25, 1)', 
          style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('headerAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-30px)' }),
        animate('600ms 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('galleryAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('800ms 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('imageTransition', [
      transition('* => *', [
        style({ opacity: 0, transform: 'scale(1.1)' }),
        animate('500ms cubic-bezier(0.25, 0.8, 0.25, 1)', 
          keyframes([
            style({ opacity: 0, transform: 'scale(1.1)', offset: 0 }),
            style({ opacity: 0.5, transform: 'scale(1.05)', offset: 0.3 }),
            style({ opacity: 1, transform: 'scale(1)', offset: 1 })
          ]))
      ])
    ]),
    trigger('thumbnailAnimation', [
      transition(':enter', [
        query('.thumbnail-item', [
          style({ opacity: 0, transform: 'scale(0.8)' }),
          stagger(50, [
            animate('400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
              style({ opacity: 1, transform: 'scale(1)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('thumbnailHover', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    trigger('buttonHover', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('200ms ease-out', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    trigger('controlsAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('statsAnimation', [
      transition(':enter', [
        query('.stat-card', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(100, [
            animate('500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('backNavAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('500ms 800ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class RakhiComponent implements OnInit, OnDestroy {
  @ViewChild('thumbnailTrack', { static: false }) thumbnailTrack!: ElementRef;

  images = [
    'assets/Rakhi/IMG-20250724-WA0010.jpg',
    'assets/Rakhi/IMG-20250724-WA0012.jpg',
    'assets/Rakhi/IMG-20250724-WA0013.jpg',
    'assets/Rakhi/IMG-20250724-WA0014.jpg',
    'assets/Rakhi/IMG-20250724-WA0015.jpg',
    'assets/Rakhi/IMG-20250724-WA0017.jpg',
    'assets/Rakhi/IMG-20250724-WA0018.jpg',
    'assets/Rakhi/IMG-20250724-WA0019.jpg',
    'assets/Rakhi/IMG-20250724-WA0020.jpg',
    'assets/Rakhi/IMG-20250724-WA0023.jpg',
    'assets/Rakhi/IMG-20250724-WA0024.jpg',
    'assets/Rakhi/IMG-20250724-WA0025.jpg',
    'assets/Rakhi/IMG-20250724-WA0026.jpg',
    'assets/Rakhi/IMG-20250724-WA0028.jpg'
  ];

  imageCaptions = [
    'The Sacred Bond',
    'Moments of Joy',
    'Sibling Love',
    'Precious Memories',
    'Rakhi Celebration',
    'Happy Together',
    'Beautiful Tradition',
    'Love and Laughter',
    'Sacred Thread',
    'Cherished Moments',
    'Pure Happiness',
    'Bonding Time',
    'Festival of Love',
    'Eternal Connection'
  ];

  imageDescriptions = [
    'The moment that started our beautiful sibling journey',
    'Pure joy captured in this precious moment',
    'A bond that transcends blood relations',
    'Creating memories that will last forever',
    'Celebrating the festival of sibling love',
    'Happiness shared between two hearts',
    'Honoring the beautiful tradition of Rakhi',
    'Laughter and love filling the air',
    'The sacred thread that binds our hearts',
    'Every moment with you is a treasure',
    'Radiating happiness and love',
    'Time spent together is time well spent',
    'Celebrating the festival that brought us closer',
    'A connection that will last forever'
  ];

  playbackSpeeds = [
    { label: 'Slow', value: 5000 },
    { label: 'Normal', value: 3000 },
    { label: 'Fast', value: 1500 }
  ];

  currentIndex = 0;
  isTransitioning = false;
  isAutoPlaying = false;
  autoplayInterval = 3000;
  canScrollLeft = false;
  canScrollRight = true;

  private autoplayTimer: any;
  private transitionTimeout: any;

  private touchStartX = 0;
  private touchEndX = 0;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateScrollButtons();
      this.preloadImages();
      document.addEventListener('keydown', this.handleKeyPress.bind(this));
    }
  }

  private preloadImages() {
    this.images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.autoplayTimer) {
        clearInterval(this.autoplayTimer);
      }
      if (this.transitionTimeout) {
        clearTimeout(this.transitionTimeout);
      }
      document.removeEventListener('keydown', this.handleKeyPress.bind(this));
    }
  }

  nextImage() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateScrollButtons();
    this.scrollToActiveThumbnail();
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(30);
    }
    this.transitionTimeout = setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  prevImage() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateScrollButtons();
    this.scrollToActiveThumbnail();
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(30);
    }
    this.transitionTimeout = setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  goToImage(index: number) {
    if (this.isTransitioning || index === this.currentIndex) return;
    this.isTransitioning = true;
    this.currentIndex = index;
    this.updateScrollButtons();
    this.scrollToActiveThumbnail();
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(20);
    }
    this.transitionTimeout = setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  toggleAutoplay() {
    this.isAutoPlaying = !this.isAutoPlaying;
    if (this.isAutoPlaying) {
      this.startAutoplay();
    } else {
      this.stopAutoplay();
    }
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }

  private startAutoplay() {
    this.autoplayTimer = setInterval(() => {
      this.nextImage();
    }, this.autoplayInterval);
  }

  private stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  setPlaybackSpeed(interval: number) {
    this.autoplayInterval = interval;
    if (this.isAutoPlaying) {
      this.stopAutoplay();
      this.startAutoplay();
    }
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(30);
    }
  }

  scrollThumbnails(direction: 'left' | 'right') {
    if (!this.thumbnailTrack) return;
    const scrollAmount = 200;
    const currentScroll = this.thumbnailTrack.nativeElement.scrollLeft;
    if (direction === 'left') {
      this.thumbnailTrack.nativeElement.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: 'smooth'
      });
    } else {
      this.thumbnailTrack.nativeElement.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
    setTimeout(() => this.updateScrollButtons(), 300);
  }

  private scrollToActiveThumbnail() {
    if (!this.thumbnailTrack) return;
    const thumbnailWidth = 96; // 80px + 16px gap
    const targetScroll = this.currentIndex * thumbnailWidth - 200;
    this.thumbnailTrack.nativeElement.scrollTo({
      left: Math.max(0, targetScroll),
      behavior: 'smooth'
    });
  }

  private updateScrollButtons() {
    if (!this.thumbnailTrack) return;
    setTimeout(() => {
      const element = this.thumbnailTrack.nativeElement;
      this.canScrollLeft = element.scrollLeft > 0;
      this.canScrollRight = element.scrollLeft < (element.scrollWidth - element.clientWidth);
    }, 100);
  }

  getProgressPercentage(): number {
    return ((this.currentIndex + 1) / this.images.length) * 100;
  }

  getImageCaption(index: number): string {
    return this.imageCaptions[index] || `Memory ${index + 1}`;
  }

  getImageDescription(index: number): string {
    return this.imageDescriptions[index] || 'A precious moment from our Rakhi celebration';
  }

  getImagePosition(index: number): string {
    return 'center';
  }

  onImageLoad() {
    console.log('Image loaded successfully');
  }

  onImageError() {
    console.error('Failed to load image');
  }

  private handleKeyPress(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.prevImage();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextImage();
        break;
      case ' ':
        event.preventDefault();
        this.toggleAutoplay();
        break;
      case 'Escape':
        if (this.isAutoPlaying) {
          this.toggleAutoplay();
        }
        break;
    }
  }

  goBack() {
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
    this.router.navigate(['/journey']);
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = this.touchStartX - this.touchEndX;
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        this.nextImage();
      } else {
        this.prevImage();
      }
    }
  }

  shareImage() {
    if (navigator.share) {
      navigator.share({
        title: 'Rakhi Memories',
        text: `Check out this beautiful Rakhi moment: ${this.getImageCaption(this.currentIndex)}`,
        url: window.location.href
      }).catch(err => console.log('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        console.log('Link copied to clipboard');
      });
    }
  }
}
