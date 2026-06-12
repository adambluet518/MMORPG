// js/ai/aiEconomy.js
export class AIEconomy {
  constructor(economyManager) {
    this.economyManager = economyManager;
  }

  simulateTrade() {
    // AI merchants adjust prices regionally
    for (let [itemId, data] of this.economyManager.marketData) {
      data.supply += Math.floor(Math.random() * 5 - 2);
      data.demand += Math.floor(Math.random() * 5 - 2);
      data.supply = Math.max(0, data.supply);
      data.demand = Math.max(0, data.demand);
    }
  }
}