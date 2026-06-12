// js/characters/ranger.js
import { BaseCharacter } from './baseCharacter.js';
export class Ranger extends BaseCharacter {
  constructor(name, race, position) {
    super(name, race, 'Ranger', position);
    this.stats.agility += 5;
    this.stats.luck += 3;
    this.skills.set('arrow_shot', { damage: 18, cost: 5, range: 20 });
    this.skills.set('trap', { damage: 20, cost: 15, area: true });
  }
}