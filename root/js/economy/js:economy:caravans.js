// js/economy/caravans.js
export class CaravanSystem {
  constructor(worldManager) {
    this.worldManager = worldManager;
    this.caravans = [];
  }

  spawnCaravan(origin, destination) {
    const caravan = {
      id: `caravan_${this.caravans.length}`,
      origin: origin.clone(),
      destination: destination.clone(),
      position: origin.clone(),
      goods: [{ id: 'iron_ingot', qty: 20 }, { id: 'silk', qty: 10 }],
      guards: 3,
      speed: 2,
      state: 'traveling'
    };
    this.caravans.push(caravan);
  }

  update(deltaTime) {
    this.caravans.forEach(c => {
      if (c.state === 'traveling') {
        c.position.lerp(c.destination, c.speed * deltaTime * 0.001);
        if (c.position.distanceTo(c.destination) < 1) c.state = 'arrived';
      }
    });
  }
}