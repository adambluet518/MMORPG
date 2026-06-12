// js/weather/weatherSystem.js
import * as THREE from 'three';

export class WeatherSystem {
  constructor(scene) {
    this.scene = scene;
    this.currentWeather = 'clear';
    this.rainParticles = null;
    this.snowParticles = null;
    this.fog = scene.fog || new THREE.Fog(0xcccccc, 50, 200);
    this.windVelocity = new THREE.Vector3();
    this.thunderTimer = 0;
    this.lightningLight = null;
  }

  setWeather(weather) {
    this.clearEffects();
    this.currentWeather = weather;
    switch (weather) {
      case 'rain':
        this.startRain();
        break;
      case 'snow':
        this.startSnow();
        break;
      case 'fog':
        this.fog.color.set(0xcccccc);
        this.fog.near = 30;
        this.fog.far = 80;
        break;
      case 'thunderstorm':
        this.startRain();
        this.thunderTimer = 5;
        break;
      default:
        this.fog.near = 50;
        this.fog.far = 200;
        break;
    }
  }

  startRain() {
    // Create rain particle system (simplified with lines)
    const count = 3000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 80;
      positions[i+1] = Math.random() * 40 + 5;
      positions[i+2] = (Math.random() - 0.5) * 80;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xaaaacc,
      size: 0.2,
      transparent: true,
      opacity: 0.6
    });
    this.rainParticles = new THREE.Points(geometry, material);
    this.scene.add(this.rainParticles);
  }

  startSnow() {
    const count = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 80;
      positions[i+1] = Math.random() * 40 + 5;
      positions[i+2] = (Math.random() - 0.5) * 80;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      transparent: true,
      opacity: 0.8
    });
    this.snowParticles = new THREE.Points(geometry, material);
    this.scene.add(this.snowParticles);
  }

  clearEffects() {
    if (this.rainParticles) {
      this.scene.remove(this.rainParticles);
      this.rainParticles.geometry.dispose();
      this.rainParticles.material.dispose();
      this.rainParticles = null;
    }
    if (this.snowParticles) {
      this.scene.remove(this.snowParticles);
      this.snowParticles.geometry.dispose();
      this.snowParticles.material.dispose();
      this.snowParticles = null;
    }
  }

  update(deltaTime) {
    if (this.rainParticles) {
      const positions = this.rainParticles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i+1] -= 10 * deltaTime;
        if (positions[i+1] < 0) positions[i+1] = 40;
      }
      this.rainParticles.geometry.attributes.position.needsUpdate = true;
    }
    if (this.snowParticles) {
      const positions = this.snowParticles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i+1] -= 2 * deltaTime;
        positions[i] += Math.sin(positions[i+1]*0.1) * deltaTime * 0.5;
        if (positions[i+1] < 0) positions[i+1] = 40;
      }
      this.snowParticles.geometry.attributes.position.needsUpdate = true;
    }
    if (this.thunderTimer > 0) {
      this.thunderTimer -= deltaTime;
      if (Math.random() < 0.05) {
        // flash lightning
      }
    }
  }
}