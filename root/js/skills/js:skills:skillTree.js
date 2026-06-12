// js/skills/skillTree.js
export class SkillTree {
  constructor() {
    this.trees = {
      Mining: [
        { name: 'Efficient Pick', level: 1, effect: '+10% mining speed' },
        { name: 'Prospector', level: 5, effect: 'Chance to find gems' },
        { name: 'Master Miner', level: 15, effect: 'Double ore yield' }
      ],
      Fishing: [
        { name: 'Bait Crafting', level: 1, effect: 'Faster bites' },
        { name: 'Deep Sea Fisher', level: 10, effect: 'Rare fish chance' }
      ],
      // ... many more skills
      Combat: [
        { name: 'Critical Strikes', level: 1, effect: '+2% crit' },
        { name: 'Armor Penetration', level: 5, effect: 'Ignore 5% armor' },
        { name: 'Adrenaline', level: 10, effect: '+10% damage after kill' }
      ]
    };
  }

  getUnlockedSkills(category, playerLevel) {
    return this.trees[category].filter(skill => playerLevel >= skill.level);
  }

  applySkill(player, skillName) {
    // apply passive bonuses
  }
}