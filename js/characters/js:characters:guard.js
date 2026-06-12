// js/characters/guard.js
import { BaseCharacter } from './baseCharacter.js';
export class Guard extends BaseCharacter {
  constructor(name, race, position, faction) {
    super(name, race, 'Guard', position);
    this.faction = faction;
    this.aggroRange = 15;
  }
}