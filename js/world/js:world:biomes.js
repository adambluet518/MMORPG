// js/world/biomes.js
export const Biomes = {
  PLAINS: { name: 'Plains', color: 0x3cb371, heightRange: [0, 3], trees: 0.1 },
  FOREST: { name: 'Forest', color: 0x228b22, heightRange: [2, 8], trees: 0.8 },
  DESERT: { name: 'Desert', color: 0xc2b280, heightRange: [-2, 2], trees: 0.01 },
  MOUNTAIN: { name: 'Mountain', color: 0x8b8682, heightRange: [8, 25], trees: 0.05 },
  SWAMP: { name: 'Swamp', color: 0x4a5d23, heightRange: [-1, 2], trees: 0.4 },
  TUNDRA: { name: 'Tundra', color: 0xb0c4de, heightRange: [-5, 2], trees: 0.02 },
  JUNGLE: { name: 'Jungle', color: 0x0a5a2a, heightRange: [2, 6], trees: 0.95 },
  VOLCANO: { name: 'Volcano', color: 0x4a2e1e, heightRange: [5, 20], trees: 0 },
};