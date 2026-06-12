// js/characters/summoner.js
import { BaseCharacter } from './baseCharacter.js';
export class Summoner extends BaseCharacter {
  constructor(name, race, position) {
    super(name, race, 'Summoner', position);
    this.stats.intelligence += 4;
    this.stats.wisdom += 3;
    this.maxMana += 50;
    this.mana = this.maxMana;
    this.skills.set('summon_spirit_wolf', { pet: 'spirit_wolf', cost: 30 });
    this.skills.set('elemental_burst', { damage: 22, cost: 15, area: true });
  }
}