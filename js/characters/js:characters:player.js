// js/characters/player.js
import * as THREE from 'three';

export class Player {
  constructor(camera, worldManager) {
    this.camera = camera;
    this.worldManager = worldManager;
    this.position = new THREE.Vector3(0, 5, 0);
    this.velocity = new THREE.Vector3();
    this.speed = 8;
    this.jumpPower = 10;
    this.gravity = -20;
    this.isGrounded = true;
    this.health = 100;
    this.maxHealth = 100;
    this.mana = 50;
    this.maxMana = 50;
    this.energy = 100;
    this.maxEnergy = 100;
    this.mesh = null;
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.jumpRequested = false;
    this.keys = {};
    this.setupInput();
  }

  async init(loadingScreen) {
    // Create player representation (simple capsule)
    const geometry = new THREE.CapsuleGeometry(0.5, 1.5, 4, 8);
    const material = new THREE.MeshStandardMaterial({ color: 0x3366cc });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.position.copy(this.position);
    this.worldManager.scene.add(this.mesh);
  }

  setupInput() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (e.code === 'Space') this.jumpRequested = true;
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
  }

  update(deltaTime, worldManager) {
    this.handleMovement(deltaTime);
    this.applyGravity(deltaTime);
    this.updateMesh();
    // ground check
    const terrainHeight = worldManager.getHeightAt(this.position.x, this.position.z);
    if (this.position.y <= terrainHeight + 1) {
      this.position.y = terrainHeight + 1;
      this.velocity.y = 0;
      this.isGrounded = true;
    }
  }

  handleMovement(dt) {
    const moveSpeed = this.speed * dt;
    const forward = new THREE.Vector3(0,0,-1).applyQuaternion(this.camera.quaternion);
    forward.y = 0;
    forward.normalize();
    const right = new THREE.Vector3(1,0,0).applyQuaternion(this.camera.quaternion);
    right.y = 0;
    right.normalize();

    if (this.keys['KeyW']) this.position.addScaledVector(forward, moveSpeed);
    if (this.keys['KeyS']) this.position.addScaledVector(forward, -moveSpeed);
    if (this.keys['KeyA']) this.position.addScaledVector(right, -moveSpeed);
    if (this.keys['KeyD']) this.position.addScaledVector(right, moveSpeed);

    if (this.jumpRequested && this.isGrounded) {
      this.velocity.y = this.jumpPower;
      this.isGrounded = false;
      this.jumpRequested = false;
    }
  }

  applyGravity(dt) {
    this.velocity.y += this.gravity * dt;
    this.position.y += this.velocity.y * dt;
  }

  updateMesh() {
    if (this.mesh) {
      this.mesh.position.copy(this.position);
      this.mesh.position.y -= 1; // center
    }
  }
}