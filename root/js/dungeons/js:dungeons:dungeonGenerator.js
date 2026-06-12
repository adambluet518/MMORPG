// js/dungeons/dungeonGenerator.js
export class DungeonGenerator {
  static generateDungeon(seed, difficulty) {
    const rooms = [];
    const roomCount = 5 + Math.floor(Math.random() * 5) + difficulty * 2;
    for (let i = 0; i < roomCount; i++) {
      rooms.push({
        id: i,
        type: Math.random() < 0.3 ? 'boss' : 'monster',
        enemies: [],
        loot: [],
        puzzle: null
      });
    }
    return {
      name: `Dungeon_${seed}`,
      rooms,
      difficulty,
      boss: { health: 500 * difficulty, damage: 25 * difficulty }
    };
  }
}