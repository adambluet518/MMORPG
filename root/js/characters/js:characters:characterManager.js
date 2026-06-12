// js/characters/characterManager.js
import { Warrior } from './warrior.js';
import { Mage } from './mage.js';
import { Ranger } from './ranger.js';
import { Villager } from './villager.js';
import { Merchant } from './merchant.js';
import { King } from './king.js';
import { Guard } from './guard.js';
import { Paladin } from './paladin.js';
import { Assassin } from './assassin.js';
import { Necromancer } from './necromancer.js';
import { Druid } from './druid.js';
import { Monk } from './monk.js';
import { Summoner } from './summoner.js';
import { Races } from '../species/races.js';

export class CharacterManager {
  constructor(worldManager) {
    this.worldManager = worldManager;
    this.npcs = [];
    this.classRegistry = {
      warrior: Warrior,
      mage: Mage,
      ranger: Ranger,
      paladin: Paladin,
      assassin: Assassin,
      necromancer: Necromancer,
      druid: Druid,
      monk: Monk,
      summoner: Summoner,
      villager: Villager,
      merchant: Merchant,
      king: King,
      guard: Guard
    };
  }

  createNPC(name, raceKey, className, position) {
    const race = Races[raceKey.toUpperCase()] || Races.HUMAN;
    const CharClass = this.classRegistry[className.toLowerCase()] || Villager;
    const npc = new CharClass(name, race, position);
    this.npcs.push(npc);
    return npc;
  }

  spawnTownNPCs(townCenter) {
    // spawn a set of villagers, guards, merchants
    this.createNPC('Guard_1', 'human', 'guard', townCenter.clone().add(new THREE.Vector3(5,0,5)));
    this.createNPC('Blacksmith', 'dwarf', 'merchant', townCenter.clone().add(new THREE.Vector3(-3,0,4)));
    this.createNPC('Innkeeper', 'human', 'villager', townCenter.clone().add(new THREE.Vector3(2,0,-3)));
  }

  update(deltaTime, playerPosition) {
    for (let npc of this.npcs) {
      if (npc.update) npc.update(deltaTime, playerPosition);
    }
  }
}