// js/ui/loadingScreen.js
export class LoadingScreen {
  constructor() {
    this.element = document.getElementById('loading-screen');
    this.bar = document.getElementById('loading-bar');
    this.text = document.getElementById('loading-text');
  }

  setProgress(percent) {
    this.bar.style.width = `${percent}%`;
    this.text.textContent = `Loading assets... ${percent}%`;
  }

  hide() {
    this.element.style.opacity = '0';
    setTimeout(() => {
      this.element.style.display = 'none';
    }, 500);
  }
}