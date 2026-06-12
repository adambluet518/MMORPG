// js/world/floatingIslands.js
export class FloatingIslandSystem {
  constructor(worldManager) {
    this.worldManager = worldManager;
    this.islands = [];
  }

  createIsland(position, size) {
    const island = {
      id: `island_${this.islands.length}`,
      position: position.clone().add(new THREE.Vector3(0, 50 + Math.random() * 30, 0)),
      size,
      features: ['wind_elementals', 'sky_temple'],
      accessible: false // requires flying mount
    };
    this.islands.push(island);
    return island;
  }
}