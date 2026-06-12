// js/weather/seasons.js
export class Seasons {
  constructor() {
    this.currentSeason = 'spring';
    this.seasonTimer = 0;
    this.seasonLength = 300; // in-game days
  }

  update(deltaTime) {
    this.seasonTimer += deltaTime;
    // change season after cycle
  }

  getSeasonEffects() {
    const effects = {
      spring: { treeColor: 0x77aa44, weatherBias: 'rain' },
      summer: { treeColor: 0x44aa22, weatherBias: 'clear' },
      autumn: { treeColor: 0xcc8844, weatherBias: 'fog' },
      winter: { treeColor: 0x99aaaa, weatherBias: 'snow' }
    };
    return effects[this.currentSeason];
  }
}