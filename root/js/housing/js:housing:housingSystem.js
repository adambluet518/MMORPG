// js/housing/housingSystem.js
export class HousingSystem {
  constructor(worldManager, player) {
    this.worldManager = worldManager;
    this.player = player;
    this.houses = new Map(); // ownerId -> houseData
  }

  buildHouse(position, style = 'wooden') {
    const house = {
      owner: this.player.name,
      position: position.clone(),
      style,
      level: 1,
      decorations: [],
      storage: [],
      farm: { plots: 0, crops: [] },
      workshop: false
    };
    this.houses.set(this.player.name, house);
    return house;
  }

  upgradeHouse() {
    const house = this.houses.get(this.player.name);
    if (house && house.level < 5) {
      house.level++;
    }
  }

  placeFurniture(furnitureId) {
    const house = this.houses.get(this.player.name);
    if (house) house.decorations.push(furnitureId);
  }

  addStorage(item) {
    const house = this.houses.get(this.player.name);
    if (house) house.storage.push(item);
  }
}