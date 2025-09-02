import { Component } from '@angular/core';

@Component({
  selector: 'app-solo',
  templateUrl: './solo-media.component.html',
  styleUrls: ['./solo-media.component.scss'],
})
export class SoloMediaComponent {
  mediaItems = [
    {
      type: 'image',
      src: 'assets/solo/WhatsApp Image 2025-05-31 at 02.20.57_b55c5785.jpg',
      title: 'Radiant Smile',
      caption: 'Pure joy, captured in a frame 💖',
      strengthTag: 'Confidence',
      momentTag: 'Glow',
      strengthLevel: 85,
    },
    {
      type: 'image',
      src: 'assets/solo/WhatsApp Image 2025-08-22 at 14.27.26_17243de6.jpg',
      title: 'Bold & Beautiful',
      caption: 'Unstoppable energy 🔥',
      strengthTag: 'Power',
      momentTag: 'Charm',
      strengthLevel: 92,
    },
    {
      type: 'image',
      src: 'assets/solo/WhatsApp Image 2025-05-31 at 02.28.57_b66cf230.jpg',
      title: 'Bold & Beautiful',
      caption: 'Always Cool 🔥',
      strengthTag: 'Power',
      momentTag: 'Charm',
      strengthLevel: 92,
    },
    {
      type: 'image',
      src: 'assets/solo/WhatsApp Image 2025-08-22 at 14.28.55_34c106dd.jpg',
      title: 'Bold & Beautiful',
      caption: 'Perfect Inspiration 🔥',
      strengthTag: 'Power',
      momentTag: 'Charm',
      strengthLevel: 92,
    },
    {
      type: 'video',
      src: 'assets/solo/WhatsApp Video 2025-06-09 at 02.04.19_6185c251.mp4',
      title: 'Star of the Show',
      caption: 'Owning every moment 🎬',
      strengthTag: 'Courage',
      momentTag: 'Stage',
      strengthLevel: 95,
    },
  ];

  selectedMedia = this.mediaItems[0];
  isVideoMuted = true;
  isVideoPlaying = false;
  isSlideshowActive = false;

  viewModes = [
    { value: 'calm', emoji: '🌸', label: 'Calm' },
    { value: 'vibrant', emoji: '🎉', label: 'Vibrant' },
    { value: 'dreamy', emoji: '🌙', label: 'Dreamy' },
  ];
  currentViewMode = 'calm';

  motivationalMessages = [
    { text: 'Shine like the star you are.', author: 'Well-Wisher', emoji: '✨' },
    { text: 'Your strength inspires everyone around you.', author: 'Secret Cheerleader', emoji: '💪' },
    { text: 'The world is brighter with you in it.', author: 'True Friend', emoji: '🌍' },
  ];
  currentMotivationIndex = 0;

  growthMilestones = [
    {
      stage: '1',
      title: 'The Beginning',
      description: 'Every step counts, and yours started strong.',
      achievement: '🎯 Confidence born',
      icon: '🌱',
    },
    {
      stage: '2',
      title: 'Finding Your Strength',
      description: 'Overcoming challenges made you unstoppable.',
      achievement: '🏆 Inner strength unlocked',
      icon: '🔥',
    },
    {
      stage: '3',
      title: 'Unstoppable You',
      description: 'Now you shine brighter than ever before.',
      achievement: '🌟 Infinite potential',
      icon: '🚀',
    },
  ];

  // Media logic
  selectMedia(media: any, index: number) {
    this.selectedMedia = media;
    this.isVideoPlaying = media.type === 'video';
  }

  navigateMedia(direction: 'prev' | 'next') {
    const currentIndex = this.mediaItems.indexOf(this.selectedMedia);
    let newIndex =
      direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0) newIndex = this.mediaItems.length - 1;
    if (newIndex >= this.mediaItems.length) newIndex = 0;
    this.selectedMedia = this.mediaItems[newIndex];
  }

  closeFeatured() {
    this.selectedMedia = null!;
  }

  toggleVideoMute() {
    this.isVideoMuted = !this.isVideoMuted;
  }

  toggleVideoFullscreen() {
    const videoElement: any = document.querySelector('.featured-video');
    if (videoElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoElement.requestFullscreen();
      }
    }
  }

  playFeaturedVideo() {
    const video = document.querySelector<HTMLVideoElement>('.featured-video');
    if (video) {
      if (this.isVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      this.isVideoPlaying = !this.isVideoPlaying;
    }
  }

  startSlideshow() {
    this.isSlideshowActive = !this.isSlideshowActive;
    if (this.isSlideshowActive) {
      let index = 0;
      const slideshow = setInterval(() => {
        if (!this.isSlideshowActive) {
          clearInterval(slideshow);
          return;
        }
        index = (index + 1) % this.mediaItems.length;
        this.selectedMedia = this.mediaItems[index];
      }, 3000);
    }
  }

  shuffleMedia() {
    this.mediaItems = [...this.mediaItems].sort(() => Math.random() - 0.5);
  }

  downloadMedia() {
    if (!this.selectedMedia) return;
    const link = document.createElement('a');
    link.href = this.selectedMedia.src;
    link.download = this.selectedMedia.title || 'solo-memory';
    link.click();
  }

  setViewMode(mode: string) {
    this.currentViewMode = mode;
  }

  // Motivation logic
  prevMotivation() {
    this.currentMotivationIndex =
      (this.currentMotivationIndex - 1 + this.motivationalMessages.length) %
      this.motivationalMessages.length;
  }

  nextMotivation() {
    this.currentMotivationIndex =
      (this.currentMotivationIndex + 1) % this.motivationalMessages.length;
  }

  goToMotivation(index: number) {
    this.currentMotivationIndex = index;
  }

  // Stats
  getAverageStrength() {
    const total = this.mediaItems.reduce((acc, m) => acc + m.strengthLevel, 0);
    return Math.round(total / this.mediaItems.length);
  }

  goBack() {
    window.history.back();
  }

  onMediaLoad() {}
  onMediaError() {}
}
