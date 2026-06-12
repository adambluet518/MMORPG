// js/economy/economyManager.js
export class EconomyManager {
  constructor(worldManager) {
    this.worldManager = worldManager;
    this.marketData = new Map(); // itemId -> { supply, demand, price }
    this.merchantCaravans = [];
    this.regionalEconomies = new Map();
    this.init();
  }

  init() {
    this.marketData.set('iron_sword', { supply: 50, demand: 30, basePrice: 50 });
    this.marketData.set('health_potion', { supply: 200, demand: 150, basePrice: 15 });
  }

  update(deltaTime) {
    // dynamic pricing based on supply/demand simulated by AI trading
    for (let [id, data] of this.marketData) {
      data.price = data.basePrice * (1 + (data.demand - data.supply) / (data.supply + 1));
    }
  }

  buyItem(itemId, buyerGold) {
    const data = this.marketData.get(itemId);
    if (!data) return null;
    const price = Math.ceil(data.price);
    if (buyerGold >= price) {
      data.supply--;
      data.demand++;
      return { id: itemId, price };
    }
    return null;
  }
}