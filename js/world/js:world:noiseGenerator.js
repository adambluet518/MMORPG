// js/world/noiseGenerator.js
export class NoiseGenerator {
  // Simple value noise for demonstration; replace with Simplex noise for production
  static seed = Math.random() * 1000;

  static noise2D(x, z) {
    const n = Math.sin(x * 12.9898 + z * 78.233 + this.seed) * 43758.5453;
    return n - Math.floor(n);
  }

  static fractal(x, z, octaves = 4, lacunarity = 2.0, persistence = 0.5) {
    let value = 0;
    let amplitude = 1;
    let frequency = 1;
    let maxValue = 0;
    for (let i = 0; i < octaves; i++) {
      value += amplitude * this.noise2D(x * frequency, z * frequency);
      maxValue += amplitude;
      amplitude *= persistence;
      frequency *= lacunarity;
    }
    return value / maxValue;
  }

  static getBiomeValue(x, z) {
    return this.fractal(x * 0.005, z * 0.005, 3) * 0.5 + 0.5; // 0-1
  }
}