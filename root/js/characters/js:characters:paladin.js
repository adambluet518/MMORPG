// js/characters/paladin.js
import { BaseCharacter } from './baseCharacter.js';
export class Paladin extends BaseCharacter {
  constructor(name, race, position) {
    super(name, race, 'Paladin', position);
    this.stats.strength += 3;
    this.stats.vitality += 4;
    this.stats.wisdom += 2;
    this.maxHealth += 30;
    this.health = this.maxHealth;
    this.skills.set('holy_strike', { damage: 20, cost: 12, element: 'holy' });
    this.skills.set('divine_shield', { block: 100, cost: 20, duration: 5 });
  }
}