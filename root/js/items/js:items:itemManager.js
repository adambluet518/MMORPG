// js/items/itemManager.js
export class ItemManager {
  constructor() {
    this.itemTemplates = new Map();
    this.generateItems();
  }

  generateItems() {
    this.itemTemplates.set('iron_sword', {
      id: 'iron_sword',
      name: 'Iron Sword',
      type: 'weapon',
      damage: 10,
      value: 50,
      rarity: 'common'
    });
    this.itemTemplates.set('health_potion', {
      id: 'health_potion',
      name: 'Health Potion',
      type: 'consumable',
      heal: 40,
      value: 15,
      rarity: 'common'
    });
    // ... thousands more
  }

  createItem(itemId) {
    const template = this.itemTemplates.get(itemId);
    if (!template) return null;
    return { ...template, instanceId: crypto.randomUUID() };
  }
}