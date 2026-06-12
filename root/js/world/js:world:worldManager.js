// js/world/worldManager.js
import * as THREE from 'three';

export class WorldManager {
  constructor(scene, assetManager, profiler) {
    this.scene = scene;
    this.assetManager = assetManager;
    this.profiler = profiler;
    this.chunks = new Map();
    this.chunkSize = 64;
    this.renderDistance = 3; // chunks
    this.loadedChunks = new Set();
    this.waterPlane = null;
    this.timeOfDay = 0; // 0-24
    this.dayCycleSpeed = 0.01; // hours per second
    this.weather = 'clear';
    this.weatherTimer = 0;
  }

  async initialize(loadingScreen) {
    // Create base terrain, water, sky
    this.createSky();
    this.createOcean();
    // Load initial chunks around spawn
  }

  createSky() {
    // simple sky color from background / fog
    this.scene.background = new THREE.Color(0x87ceeb);
    this.scene.fog = new THREE.Fog(0x87ceeb, 50, 200);
  }

  createOcean() {
    const waterGeometry = new THREE.PlaneGeometry(1000, 1000);
    const waterMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1e90ff, 
      emissive: 0x0, 
      shininess: 100,
      transparent: true,
      opacity: 0.8
    });
    this.waterPlane = new THREE.Mesh(waterGeometry, waterMaterial);
    this.waterPlane.rotation.x = -Math.PI / 2;
    this.waterPlane.position.y = 2; // water level
    this.scene.add(this.waterPlane);
  }

  getChunkKey(cx, cz) {
    return `${cx},${cz}`;
  }

  update(deltaTime, playerPosition) {
    this.updateTimeAndWeather(deltaTime);
    this.updateChunks(playerPosition);
  }

  updateTimeAndWeather(deltaTime) {
    this.timeOfDay = (this.timeOfDay + this.dayCycleSpeed * deltaTime) % 24;
    // Adjust lighting based on timeOfDay
    const sunHeight = Math.sin((this.timeOfDay / 24) * Math.PI * 2);
    this.scene.fog.color.setHSL(0.6, 0.5, Math.max(0.3, sunHeight * 0.5 + 0.3));
    this.scene.background.copy(this.scene.fog.color);
    
    // Simple weather changes
    this.weatherTimer -= deltaTime;
    if (this.weatherTimer <= 0) {
      const r = Math.random();
      if (r < 0.3) this.weather = 'rain';
      else if (r < 0.5) this.weather = 'clear';
      else if (r < 0.6) this.weather = 'fog';
      else this.weather = 'clear';
      this.weatherTimer = 120 + Math.random() * 300;
    }
    // Apply weather effects (simplified)
  }

  updateChunks(playerPos) {
    const chunkX = Math.floor(playerPos.x / this.chunkSize);
    const chunkZ = Math.floor(playerPos.z / this.chunkSize);
    // Load/unload chunks around player
    const needed = new Set();
    for (let dx = -this.renderDistance; dx <= this.renderDistance; dx++) {
      for (let dz = -this.renderDistance; dz <= this.renderDistance; dz++) {
        const cx = chunkX + dx;
        const cz = chunkZ + dz;
        const key = this.getChunkKey(cx, cz);
        needed.add(key);
        if (!this.chunks.has(key)) {
          this.generateChunk(cx, cz);
        }
      }
    }
    // Unload far chunks
    for (let key of this.chunks.keys()) {
      if (!needed.has(key)) {
        this.unloadChunk(key);
      }
    }
  }

  generateChunk(cx, cz) {
    const geometry = new THREE.PlaneGeometry(this.chunkSize, this.chunkSize, 32, 32);
    geometry.rotateX(-Math.PI / 2);
    const positions = geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i] + cx * this.chunkSize;
      const z = positions[i+2] + cz * this.chunkSize;
      // Procedural height based on simplex-like noise (simplified)
      const y = Math.sin(x * 0.05) * Math.cos(z * 0.05) * 5 + Math.sin(x * 0.2) * 2 + 2;
      positions[i+1] = y;
    }
    geometry.computeVertexNormals();
    const material = new THREE.MeshStandardMaterial({ 
      color: this.getBiomeColor(cx, cz),
      roughness: 0.8 
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(cx * this.chunkSize, 0, cz * this.chunkSize);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this.chunks.set(this.getChunkKey(cx, cz), mesh);
  }

  getBiomeColor(cx, cz) {
    const val = Math.sin(cx * 0.1) * Math.cos(cz * 0.1);
    if (val > 0.5) return 0x6b8e23; // forest
    if (val < -0.5) return 0xc2b280; // desert
    return 0x3cb371; // plains
  }

  unloadChunk(key) {
    const mesh = this.chunks.get(key);
    if (mesh) {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      mesh.material.dispose();
      this.chunks.delete(key);
    }
  }

  getHeightAt(x, z) {
    return Math.sin(x * 0.05) * Math.cos(z * 0.05) * 5 + Math.sin(x * 0.2) * 2 + 2;
  }
}