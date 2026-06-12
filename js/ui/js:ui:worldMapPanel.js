// js/ui/worldMapPanel.js
export class WorldMapPanel {
  constructor(worldManager) {
    this.worldManager = worldManager;
    this.panel = document.getElementById('world-map-panel');
    this.canvas = document.createElement('canvas');
    this.canvas.width = 500;
    this.canvas.height = 400;
    this.ctx = this.canvas.getContext('2d');
    this.panel.appendChild(this.canvas);
  }

  update() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 500, 400);
    // draw simplified world map from chunk data
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, 500, 400);
    ctx.fillStyle = 'white';
    ctx.font = '16px Cinzel';
    ctx.fillText('World Map', 180, 30);
    // ... render markers for player, towns
  }
}