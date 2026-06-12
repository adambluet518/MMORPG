// js/animation/animationManager.js
export class AnimationManager {
  constructor() {
    this.animations = new Map(); // mesh -> array of clips
  }

  registerMesh(mesh, clips) {
    this.animations.set(mesh, clips);
  }

  playAnimation(mesh, clipName, loop = false) {
    const clips = this.animations.get(mesh);
    if (!clips) return;
    const clip = clips.find(c => c.name === clipName);
    if (!clip) return;
    clip.reset();
    clip.loop = loop;
    clip.play();
  }

  update(deltaTime) {
    // update all animations manually if using custom blending
    for (let clips of this.animations.values()) {
      clips.forEach(clip => {
        if (clip.isPlaying) clip.update(deltaTime);
      });
    }
  }
}