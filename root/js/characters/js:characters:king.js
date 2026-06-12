// js/characters/king.js
import { BaseCharacter } from './baseCharacter.js';
export class King extends BaseCharacter {
  constructor(name, race, position) {
    super(name, race, 'King', position);
    this.maxHealth = 500;
    this.health = 500;
    this.faction = 'royalty';
    this.guards = [];
  }
}