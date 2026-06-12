// js/world/secretBosses.js
export class SecretBossManager {
  constructor(worldManager, player) {
    this.worldManager = worldManager;
    this.player = player;
    this.bosses = [];
  }

  spawnSecretBoss(name, position, triggerCondition) {
    const boss = {
      name,
      position: position.clone(),
      condition: triggerCondition, // e.g., 'kill_100_goblins'
      health: 5000,
      active: false,
      defeated: false
    };
    this.bosses.push(boss);
  }

  checkConditions() {
    for (let boss of this.bosses) {
      if (!boss.active && !boss.defeated && boss.condition()) {
        boss.active = true;
        // spawn boss in world
      }
    }
  }
}