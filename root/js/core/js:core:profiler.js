// js/core/profiler.js
export class PerformanceProfiler {
  constructor() {
    this.frameStart = 0;
    this.frameTimes = [];
    this.memoryUsage = 0;
  }

  startFrame() {
    this.frameStart = performance.now();
  }

  endFrame() {
    const elapsed = performance.now() - this.frameStart;
    this.frameTimes.push(elapsed);
    if (this.frameTimes.length > 60) this.frameTimes.shift();
  }

  getAverageFrameTime() {
    if (this.frameTimes.length === 0) return 0;
    return this.frameTimes.reduce((a,b) => a+b, 0) / this.frameTimes.length;
  }

  checkMemory() {
    if (performance.memory) {
      this.memoryUsage = performance.memory.usedJSHeapSize / (1024*1024);
    }
  }
}