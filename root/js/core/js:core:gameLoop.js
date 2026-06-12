// js/core/gameLoop.js (refactored, can be merged into game.js)
// This file is optional, but if you want a dedicated loop:
import { Game } from './game.js';
// Usage: new GameLoop(game).start();
export class GameLoop {
  constructor(game) {
    this.game = game;
    this.running = false;
  }
  start() {
    this.running = true;
    this.loop();
  }
  loop() {
    if (!this.running) return;
    requestAnimationFrame(() => this.loop());
    this.game.animate();
  }
}