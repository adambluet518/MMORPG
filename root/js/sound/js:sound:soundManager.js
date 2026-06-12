// js/sound/soundManager.js
export class SoundManager {
  constructor() {
    this.sounds = new Map();
    this.music = null;
    this.muted = false;
    this.volume = 0.7;
  }

  async loadSound(key, url) {
    try {
      const audio = new Audio(url);
      audio.volume = this.volume;
      this.sounds.set(key, audio);
    } catch (e) {
      console.warn('Sound load failed:', key);
    }
  }

  play(key) {
    if (this.muted) return;
    const audio = this.sounds.get(key);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }

  playMusic(url) {
    if (this.music) {
      this.music.pause();
      this.music = null;
    }
    this.music = new Audio(url);
    this.music.loop = true;
    this.music.volume = this.volume * 0.5;
    if (!this.muted) this.music.play().catch(() => {});
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.music) this.music.muted = this.muted;
  }
}