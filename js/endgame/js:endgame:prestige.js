// js/endgame/prestige.js
export class PrestigeSystem {
  constructor(player) {
    this.player = player;
    this.prestigeLevel = 0;
    this.prestigeRewards = [];
  }

  canPrestige() {
    return this.player.level >= 50;
  }

  performPrestige() {
    if (!this.canPrestige()) return false;
    this.prestigeLevel++;
    this.player.level = 1;
    this.player.experience = 0;
    // keep some perks
    this.player.maxHealth += 10 * this.prestigeLevel;
    // reset inventory, etc.
    return true;
  }
}