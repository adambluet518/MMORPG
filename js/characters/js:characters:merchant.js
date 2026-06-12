// js/characters/merchant.js
import { Villager } from './villager.js';
export class Merchant extends Villager {
  constructor(name, race, position) {
    super(name, race, position);
    this.role = 'merchant';
    this.shopInventory = []; // items for sale
    this.gold = 1000;
  }
}