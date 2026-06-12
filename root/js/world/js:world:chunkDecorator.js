// js/world/chunkDecorator.js
export class ChunkDecorator {
  constructor(scene, worldManager) {
    this.scene = scene;
    this.worldManager = worldManager;
  }

  decorateChunk(chunkMesh, cx, cz) {
    // Add trees, rocks, grass based on biome
    const biome = this.worldManager.getBiomeColor(cx, cz);
    // simple decorative objects
    for (let i = 0; i < 10; i++) {
      const x = cx * this.worldManager.chunkSize + Math.random() * this.worldManager.chunkSize;
      const z = cz * this.worldManager.chunkSize + Math.random() * this.worldManager.chunkSize;
      const y = this.worldManager.getHeightAt(x, z);
      if (biome === 0x6b8e23) { // forest
        this.createTree(x, y, z);
      } else if (biome === 0xc2b280) { // desert
        this.createCactus(x, y, z);
      }
    }
  }

  createTree(x, y, z) {
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.3, 2),
      new THREE.MeshStandardMaterial({ color: 0x8B4513 })
    );
    trunk.position.set(x, y+1, z);
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    this.scene.add(trunk);
    const leaves = new THREE.Mesh(
      new THREE.ConeGeometry(0.8, 1.5, 8),
      new THREE.MeshStandardMaterial({ color: 0x2d5a27 })
    );
    leaves.position.set(x, y+2.5, z);
    leaves.castShadow = true;
    leaves.receiveShadow = true;
    this.scene.add(leaves);
  }

  createCactus(x, y, z) {
    const cactus = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.4, 1.5),
      new THREE.MeshStandardMaterial({ color: 0x4a7c2e })
    );
    cactus.position.set(x, y+0.75, z);
    cactus.castShadow = true;
    this.scene.add(cactus);
  }
}