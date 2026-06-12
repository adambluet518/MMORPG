// js/characters/necromancer.js
import { BaseCharacter } from './baseCharacter.js';
export class Necromancer extends BaseCharacter {
  constructor(name, race, position) {
    super(name, race, 'Necromancer', position);
    this.stats.intelligence += 5;
    this.stats.wisdom += 3;
    this.maxMana += 40;
    this.mana = this.maxMana;
    this.skills.set('raise_dead', { summons: 1, cost: 25 });
    this.skills.set('life_drain', { damage: 15, heal: 7, cost: 10, element: 'dark' });
  }
}