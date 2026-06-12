// js/characters/mage.js
import { BaseCharacter } from './baseCharacter.js';
export class Mage extends BaseCharacter {
  constructor(name, race, position) {
    super(name, race, 'Mage', position);
    this.stats.intelligence += 5;
    this.stats.wisdom += 3;
    this.maxMana += 30;
    this.mana = this.maxMana;
    this.skills.set('fireball', { damage: 25, cost: 20, element: 'fire' });
    this.skills.set('frost_nova', { damage: 15, slow: 3, cost: 15 });
  }
}