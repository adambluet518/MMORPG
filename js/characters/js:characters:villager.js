// js/characters/villager.js
import { BaseCharacter } from './baseCharacter.js';
export class Villager extends BaseCharacter {
  constructor(name, race, position) {
    super(name, race, 'Villager', position);
    this.health = 50;
    this.maxHealth = 50;
    this.dialogue = [];
    this.role = 'idle'; // farmer, blacksmith, etc.
    this.schedule = []; // AI schedule
  }
}