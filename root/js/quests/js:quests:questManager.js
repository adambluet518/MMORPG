// js/quests/questManager.js
import { QuestTypes } from './questTypes.js';

export class QuestManager {
  constructor(worldManager, player) {
    this.worldManager = worldManager;
    this.player = player;
    this.activeQuests = [];
    this.completedQuests = [];
    this.allTemplates = QuestTypes.getAll();
  }

  acceptQuest(questId) {
    if (this.activeQuests.some(q => q.id === questId)) return;
    const template = this.allTemplates.find(q => q.id === questId);
    if (!template) return;
    const quest = {
      ...template,
      objectives: template.objectives.map(obj => ({ ...obj, current: 0 })),
      active: true
    };
    this.activeQuests.push(quest);
    return quest;
  }

  updateObjectives(event) {
    for (let quest of this.activeQuests) {
      for (let obj of quest.objectives) {
        if (obj.type === event.type && obj.target === event.target) {
          obj.current = Math.min(obj.required, obj.current + event.count);
        }
      }
      if (quest.objectives.every(o => o.current >= o.required)) {
        this.completeQuest(quest.id);
      }
    }
  }

  completeQuest(questId) {
    const index = this.activeQuests.findIndex(q => q.id === questId);
    if (index === -1) return;
    const quest = this.activeQuests.splice(index, 1)[0];
    this.completedQuests.push(quest.id);
    // give rewards
    this.player.experience += quest.rewards.xp || 0;
    this.player.inventory.push(...(quest.rewards.items || []));
  }
}