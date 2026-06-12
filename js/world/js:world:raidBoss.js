// js/world/raidBoss.js
export class RaidBoss {
  constructor(name, position, worldManager) {
    this.name = name;
    this.position = position.clone();
    this.worldManager = worldManager;
    this.health = 10000;
    this.maxHealth = 10000;
    this.damage = 80;
    this.phase = 1;
    this.mechanics = [];
  }

  update(deltaTime) {
    // boss AI
  }

  onPhaseChange() {
    if (this.health < this.maxHealth * 0.5) this.phase = 2;
  }
}