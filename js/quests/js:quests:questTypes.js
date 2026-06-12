// js/quests/questTypes.js
export class QuestTypes {
  static getAll() {
    return [
      { id: 'starter_kill_goblins', name: 'Clearing the Camp', description: 'Defeat 5 goblins near the village.',
        objectives: [{ type: 'kill', target: 'goblin', required: 5 }],
        rewards: { xp: 100, items: ['health_potion'] } },
      { id: 'gather_herbs', name: 'Herbal Remedy', description: 'Collect 8 moonleaf herbs.',
        objectives: [{ type: 'gather', target: 'moonleaf', required: 8 }],
        rewards: { xp: 80, items: ['mana_potion'] } },
      // ... hundreds more
    ];
  }
}