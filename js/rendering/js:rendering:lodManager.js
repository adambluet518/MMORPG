// js/rendering/lodManager.js
import * as THREE from 'three';

export class LODManager {
  constructor(camera) {
    this.camera = camera;
    this.lodLevels = new Map();
  }

  registerObject(object, levels) {
    // levels: array of { distance, detail }
    this.lodLevels.set(object, levels);
  }

  update() {
    for (let [object, levels] of this.lodLevels) {
      const dist = this.camera.position.distanceTo(object.position);
      let activeDetail = levels[0].detail;
      for (let level of levels) {
        if (dist <= level.distance) {
          activeDetail = level.detail;
          break;
        }
      }
      // switch geometry/material accordingly
    }
  }
}