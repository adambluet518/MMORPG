// js/core/assetManager.js
export class AssetManager {
  constructor() {
    this.textures = new Map();
    this.models = new Map();
    this.sounds = new Map();
    this.totalAssets = 0;
    this.loadedAssets = 0;
  }

  async loadEssentials(loadingScreen) {
    // placeholder: load basic textures and models
    this.totalAssets = 10;
    // Simulate async loads
    for (let i = 0; i < this.totalAssets; i++) {
      await this.delay(20);
      this.loadedAssets++;
      loadingScreen.setProgress(Math.floor((this.loadedAssets / this.totalAssets) * 100));
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getTexture(key) { return this.textures.get(key); }
  getModel(key) { return this.models.get(key); }
}