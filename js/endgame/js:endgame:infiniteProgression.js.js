// js/endgame/infiniteProgression.js
export class InfiniteProgression {
  constructor(player) {
    this.player = player;
    this.reincarnationLevel = 0;
  }

  reincarnate() {
    this.reincarnationLevel++;
    this.player.level = 1;
    this.player.stats.strength += 1 * this.reincarnationLevel;
    // permanent stat bonuses
  }
}