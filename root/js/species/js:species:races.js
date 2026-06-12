// js/species/races.js
export const Races = {
  HUMAN: {
    name: 'Human',
    bonuses: { strength: 2, intelligence: 2 },
    ability: 'Diplomat: +10% reputation gain',
    towns: ['Stormwind', 'Briarwood'],
    questline: 'human_main'
  },
  ELF: {
    name: 'Elf',
    bonuses: { agility: 3, wisdom: 2 },
    ability: 'Grace: +5% dodge chance',
    towns: ['Silverleaf', 'Moonshade'],
    questline: 'elf_main'
  },
  DWARF: {
    name: 'Dwarf',
    bonuses: { strength: 3, vitality: 3 },
    ability: 'Stoneskin: 5% physical damage reduction',
    towns: ['Ironforge', 'Deephold'],
    questline: 'dwarf_main'
  },
  ORC: {
    name: 'Orc',
    bonuses: { strength: 4, vitality: 1 },
    ability: 'Blood Fury: +10% damage when below 30% health',
    towns: ['Bloodmaw', 'Skullcrush'],
    questline: 'orc_main'
  },
  GOBLIN: {
    name: 'Goblin',
    bonuses: { intelligence: 2, luck: 3 },
    ability: 'Scavenger: 5% chance to find extra loot',
    towns: ['Gearspark', 'Rustbolt'],
    questline: 'goblin_main'
  },
  DRAGON: {
    name: 'Dragon',
    bonuses: { strength: 5, intelligence: 5, vitality: 2 },
    ability: 'Dragon Breath: AoE fire damage',
    towns: ['Dragonpeak'],
    questline: 'dragon_main'
  },
  UNDEAD: {
    name: 'Undead',
    bonuses: { intelligence: 3, vitality: 2 },
    ability: 'Cannibalize: Regain health from corpses',
    towns: ['Darkrest', 'Shadowfen'],
    questline: 'undead_main'
  },
  BEASTFOLK: {
    name: 'Beastfolk',
    bonuses: { agility: 3, strength: 2 },
    ability: 'Feral Instincts: +15% move speed in wild areas',
    towns: ['Primal Den', 'Thornwood'],
    questline: 'beastfolk_main'
  },
  ANGEL: {
    name: 'Angel',
    bonuses: { wisdom: 4, vitality: 2 },
    ability: 'Holy Radiance: AoE heal',
    towns: ['Celestia'],
    questline: 'angel_main'
  },
  DEMON: {
    name: 'Demon',
    bonuses: { strength: 3, intelligence: 3 },
    ability: 'Hellfire: Fire damage over time aura',
    towns: ['Nethercitadel'],
    questline: 'demon_main'
  }
};