// js/characters/monk.js
import { BaseCharacter } from './baseCharacter.js';
export class Monk extends BaseCharacter {
  constructor(name, race, position) {
    super(name, race, 'Monk', position);
    this.stats.agility += 3;
    this.stats.strength += 3;
    this.stats.wisdom += 2;
    this.maxEnergy = 120;
    this.energy = 120;
    this.skills.set('tiger_palm', { damage: 12, cost: 5, combo: true });
    this.skills.set('inner_peace', { heal: 30, cost: 15 });
  }
}