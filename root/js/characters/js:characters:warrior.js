// js/characters/warrior.js
import { BaseCharacter } from './baseCharacter.js';
export class Warrior extends BaseCharacter {
  constructor(name, race, position) {
    super(name, race, 'Warrior', position);
    this.stats.strength += 5;
    this.stats.vitality += 3;
    this.maxHealth += 20;
    this.health = this.maxHealth;
    // Warrior skills
    this.skills.set('slash', { damage: 15, cost: 0 });
    this.skills.set('shield_bash', { damage: 10, stun: 2, cost: 10 });
  }
}