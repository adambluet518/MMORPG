// js/core/game.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // for debug
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

export class Game {
  constructor(profiler) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.5, 1000);
    this.renderer = null;
    this.labelRenderer = null;
    this.clock = new THREE.Clock();
    this.deltaTime = 0;
    this.worldManager = null;
    this.player = null;
    this.aiSimulation = null;
    this.uiManager = null;
    this.profiler = profiler;
    this.isRunning = false;
    this.frameCount = 0;
    this.lastFpsUpdate = performance.now();
    this.fps = 0;
  }

  async initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: document.getElementById('game-canvas'),
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.labelRenderer.domElement.style.left = '0px';
    this.labelRenderer.domElement.style.pointerEvents = 'none';
    document.getElementById('game-container').appendChild(this.labelRenderer.domElement);

    // basic lighting for initial scene
    const ambient = new THREE.AmbientLight(0x404066);
    this.scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xffeedd, 1.2);
    sun.position.set(100, 150, 50);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 500;
    sun.shadow.camera.left = -100;
    sun.shadow.camera.right = 100;
    sun.shadow.camera.top = 100;
    sun.shadow.camera.bottom = -100;
    this.scene.add(sun);
    
    window.addEventListener('resize', () => this.onResize());
  }

  setWorldManager(wm) { this.worldManager = wm; }
  setPlayer(p) { this.player = p; }
  setAISimulation(ai) { this.aiSimulation = ai; }
  setUIManager(ui) { this.uiManager = ui; }

  start() {
    this.isRunning = true;
    this.lastFpsUpdate = performance.now();
    this.animate();
  }

  animate() {
    if (!this.isRunning) return;
    requestAnimationFrame(() => this.animate());

    this.deltaTime = Math.min(this.clock.getDelta(), 0.1);
    this.profiler.startFrame();

    // Update systems
    if (this.worldManager) this.worldManager.update(this.deltaTime, this.player.position);
    if (this.player) this.player.update(this.deltaTime, this.worldManager);
    if (this.aiSimulation) this.aiSimulation.update(this.deltaTime, this.player.position);
    if (this.uiManager) this.uiManager.update(this.deltaTime);

    // Camera follow
    if (this.player && this.camera) {
      const targetPos = this.player.position.clone();
      this.camera.position.lerp(
        new THREE.Vector3(targetPos.x + 5, targetPos.y + 8, targetPos.z + 10), 
        0.1
      );
      this.camera.lookAt(targetPos.x, targetPos.y + 1, targetPos.z);
    }

    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);

    this.profiler.endFrame();
    this.updateFPS();
  }

  updateFPS() {
    this.frameCount++;
    const now = performance.now();
    if (now - this.lastFpsUpdate >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastFpsUpdate = now;
      if (this.uiManager) this.uiManager.updateFPS(this.fps);
    }
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
  }
}