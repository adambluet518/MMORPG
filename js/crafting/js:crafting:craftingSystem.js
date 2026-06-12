// js/crafting/craftingSystem.js
export class CraftingSystem {
  constructor(itemManager) {
    this.itemManager = itemManager;
    this.recipes = new Map();
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipes.set('iron_sword', {
      result: 'iron_sword',
      materials: [ { id: 'iron_ingot', qty: 3 }, { id: 'leather_strip', qty: 1 } ],
      skill: 'smithing',
      level: 5
    });
    this.recipes.set('health_potion', {
      result: 'health_potion',
      materials: [ { id: 'moonleaf', qty: 2 }, { id: 'water_vial', qty: 1 } ],
      skill: 'alchemy',
      level: 3
    });
    // ... hundreds of recipes
  }

  canCraft(recipeId, playerInventory, playerSkills) {
    const recipe = this.recipes.get(recipeId);
    if (!recipe) return false;
    const skillLevel = playerSkills[recipe.skill] || 0;
    if (skillLevel < recipe.level) return false;
    for (let mat of recipe.materials) {
      const count = playerInventory.filter(item => item.id === mat.id).length;
      if (count < mat.qty) return false;
    }
    return true;
  }

  craft(recipeId, player) {
    if (!this.canCraft(recipeId, player.inventory, player.skills)) return null;
    const recipe = this.recipes.get(recipeId);
    // consume materials
    for (let mat of recipe.materials) {
      for (let i = 0; i < mat.qty; i++) {
        const idx = player.inventory.findIndex(item => item.id === mat.id);
        if (idx > -1) player.inventory.splice(idx, 1);
      }
    }
    const newItem = this.itemManager.createItem(recipe.result);
    player.inventory.push(newItem);
    return newItem;
  }
}