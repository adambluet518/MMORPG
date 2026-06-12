// js/characters/druid.js
import { BaseCharacter } from './baseCharacter.js';
export class Druid extends BaseCharacter {
  constructor(name, race, position) {
    super(name, race, 'Druid', position);
    this.stats.wisdom += 4;
    this.stats.intelligence += 3;
    this.stats.vitality += 2;
    this.skills.set('entangling_roots', { root: 4, damage: 8, cost: 12 });
    this.skills.set('bear_form', { transform: 'bear', bonus: { health: 50, strength: 10 }, cost: 20 });
  }
}