// js/characters/assassin.js
import { BaseCharacter } from './baseCharacter.js';
export class Assassin extends BaseCharacter {
  constructor(name, race, position) {
    super(name, race, 'Assassin', position);
    this.stats.agility += 5;
    this.stats.luck += 3;
    this.skills.set('backstab', { damage: 30, cost: 10, condition: 'behind' });
    this.skills.set('vanish', { stealth: true, cost: 15, duration: 8 });
  }
}