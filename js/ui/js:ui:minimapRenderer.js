// js/ui/minimapRenderer.js
export class MinimapRenderer {
  constructor(worldManager, player) {
    this.worldManager = worldManager;
    this.player = player;
    this.canvas = document.createElement('canvas');
    this.canvas.width = 180;
    this.canvas.height = 180;
    this.ctx = this.canvas.getContext('2d');
    document.getElementById('minimap').appendChild(this.canvas);
  }

  update() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 180, 180);
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, 180, 180);
    // draw simple terrain dots based on nearby chunks
    const chunkSize = this.worldManager.chunkSize;
    const playerCX = Math.floor(this.player.position.x / chunkSize);
    const playerCZ = Math.floor(this.player.position.z / chunkSize);
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        const key = this.worldManager.getChunkKey(playerCX + dx, playerCZ + dz);
        if (this.worldManager.chunks.has(key)) {
          ctx.fillStyle = '#3cb371';
          const mapX = 90 + dx * 35 + (this.player.position.x % chunkSize) / chunkSize * 35;
          const mapY = 90 + dz * 35 + (this.player.position.z % chunkSize) / chunkSize * 35;
          ctx.fillRect(mapX - 2, mapY - 2, 4, 4);
        }
      }
    }
    // player dot
    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(90, 90, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}