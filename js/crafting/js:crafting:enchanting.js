// js/crafting/enchanting.js
export class EnchantingSystem {
  constructor() {
    this.enchantments = new Map();
    this.loadEnchantments();
  }

  loadEnchantments() {
    this.enchantments.set('fire_enchant', {
      id: 'fire_enchant',
      name: 'Fire Enchantment',
      materials: ['fire_essence', 'magic_dust'],
      effect: { type: 'fire_damage', value: 10 }
    });
    this.enchantments.set('life_enchant', {
      id: 'life_enchant',
      name: 'Life Enchantment',
      materials: ['life_essence', 'golden_pearl'],
      effect: { type: 'health_steal', value: 2 }
    });
  }

  enchantItem(item, enchantId, playerInventory) {
    const enchant = this.enchantments.get(enchantId);
    if (!enchant) return false;
    // check materials
    for (let mat of enchant.materials) {
      const idx = playerInventory.findIndex(i => i.id === mat);
      if (idx === -1) return false;
      playerInventory.splice(idx, 1);
    }
    item.enchantment = enchant.effect;
    return true;
  }
}