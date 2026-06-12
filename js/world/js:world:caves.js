// js/world/caves.js
export class CaveSystem {
  constructor(worldManager) {
    this.worldManager = worldManager;
    this.caves = [];
  }

  generateCaveEntrance(position) {
    // create a hidden cave entrance object
    const cave = {
      id: `cave_${this.caves.length}`,
      entrance: position.clone(),
      levels: [],
      discovered: false
    };
    for (let i = 0; i < 3; i++) {
      cave.levels.push({
        name: `Level ${i+1}`,
        enemies: [],
        boss: i === 2 ? 'Cave Troll' : null,
        treasure: []
      });
    }
    this.caves.push(cave);
    return cave;
  }
}