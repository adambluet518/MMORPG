// js/ai/aiSimulation.js
export class AISimulation {
  constructor(worldManager, player) {
    this.worldManager = worldManager;
    this.player = player;
    this.entities = []; // AI players, NPCs
    this.spawnRadius = 50;
    this.despawnRadius = 80;
    this.maxEntities = 500;
    this.simulationTimer = 0;
    this.backgroundSim = new Map(); // for unloaded chunks
  }

  async init(loadingScreen) {
    // initial spawn
    this.spawnInitialNPCs();
  }

  spawnInitialNPCs() {
    // Create some wandering AI adventurers
    for (let i = 0; i < 30; i++) {
      this.entities.push(this.createAIEntity('adventurer'));
    }
    for (let i = 0; i < 10; i++) {
      this.entities.push(this.createAIEntity('merchant'));
    }
    // etc.
  }

  createAIEntity(type) {
    const pos = new THREE.Vector3(
      (Math.random() - 0.5) * 40,
      0,
      (Math.random() - 0.5) * 40
    );
    pos.y = this.worldManager.getHeightAt(pos.x, pos.z) + 1;
    return {
      type,
      position: pos,
      target: pos.clone(),
      health: 100,
      state: 'idle',
      timer: Math.random() * 5,
      mesh: null // would be created in worldManager or elsewhere
    };
  }

  update(deltaTime, playerPos) {
    this.simulationTimer += deltaTime;
    // Update AI entities
    for (let entity of this.entities) {
      this.updateEntity(entity, deltaTime, playerPos);
    }
    // Background simulation for far chunks
    if (this.simulationTimer > 2) {
      this.simulationTimer = 0;
      this.runBackgroundSimulation();
    }
    // Manage spawn/despawn based on player distance
    this.managePopulation(playerPos);
  }

  updateEntity(entity, dt, playerPos) {
    const dist = entity.position.distanceTo(playerPos);
    if (dist > this.despawnRadius) {
      entity.mesh?.visible && (entity.mesh.visible = false);
      // still run simplified logic
      entity.timer -= dt;
      if (entity.timer <= 0) {
        entity.state = entity.state === 'idle' ? 'wander' : 'idle';
        entity.timer = Math.random() * 5 + 2;
      }
      return;
    }
    // Simple wandering
    entity.timer -= dt;
    if (entity.timer <= 0) {
      if (entity.state === 'idle') {
        entity.state = 'wander';
        const angle = Math.random() * Math.PI * 2;
        entity.target = entity.position.clone().add(
          new THREE.Vector3(Math.cos(angle)*5, 0, Math.sin(angle)*5)
        );
        entity.target.y = this.worldManager.getHeightAt(entity.target.x, entity.target.z) + 1;
      } else {
        entity.state = 'idle';
      }
      entity.timer = Math.random() * 3 + 1;
    }
    if (entity.state === 'wander') {
      entity.position.lerp(entity.target, 0.02);
    }
    // keep on ground
    entity.position.y = this.worldManager.getHeightAt(entity.position.x, entity.position.z) + 1;
  }

  managePopulation(playerPos) {
    // simple: remove far, add near
    // would use object pooling
  }

  runBackgroundSimulation() {
    // simulate economy, wars, etc. for distant areas
    // placeholder
  }
}