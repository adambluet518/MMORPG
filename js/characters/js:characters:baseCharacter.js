// js/characters/baseCharacter.js
export class BaseCharacter {
  constructor(name, race, className, position) {
    this.name = name;
    this.race = race;
    this.className = className;
    this.position = position.clone();
    this.health = 100;
    this.maxHealth = 100;
    this.mana = 50;
    this.maxMana = 50;
    this.level = 1;
    this.experience = 0;
    this.stats = {
      strength: 10,
      agility: 10,
      intelligence: 10,
      vitality: 10,
      wisdom: 10,
      luck: 5
    };
    this.equipment = {
      head: null,
      chest: null,
      legs: null,
      weapon: null,
      offhand: null,
      cloak: null
    };
    this.inventory = []; // will be populated with item references
    this.reputation = new Map(); // faction -> value
    this.skills = new Map();
    this.quests = [];
    this.mesh = null;
  }

  takeDamage(amount) {
    this.health = Math.max(0, this.health - amount);
    if (this.health <= 0) this.onDeath();
  }

  heal(amount) {
    this.health = Math.min(this.maxHealth, this.health + amount);
  }

  onDeath() {
    // override
  }

  getStat(stat) {
    return this.stats[stat] || 0;
  }
}