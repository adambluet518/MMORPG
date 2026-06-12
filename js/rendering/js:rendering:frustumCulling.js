// js/rendering/frustumCulling.js
import * as THREE from 'three';

export class FrustumCuller {
  constructor(camera) {
    this.frustum = new THREE.Frustum();
    this.projectionMatrix = new THREE.Matrix4();
  }

  update(camera) {
    this.projectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    this.frustum.setFromProjectionMatrix(this.projectionMatrix);
  }

  isVisible(object) {
    return this.frustum.intersectsObject(object);
  }
}