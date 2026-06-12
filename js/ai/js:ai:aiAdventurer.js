// js/ai/aiAdventurer.js
export class AIAdventurer {
  constructor(worldManager, player) {
    this.worldManager = worldManager;
    this.player = player;
    this.adventurers = [];
  }

  spawnAdventurer(position) {
    const adv = {
      name: `Adventurer_${Math.floor(Math.random()*1000)}`,
      position: position.clone(),
      health: 100,
      class: ['warrior','mage','ranger'][Math.floor(Math.random()*3)],
      goal: null
    };
    this.adventurers.push(adv);
  }

  update(deltaTime) {
    this.adventurers.forEach(a => {
      // simulate dungeon runs, questing
    });
  }
}