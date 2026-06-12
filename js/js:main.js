// js/main.js
import { Game } from './core/game.js';
import { AssetManager } from './core/assetManager.js';
import { SaveManager } from './core/saveManager.js';
import { UIManager } from './ui/uiManager.js';
import { LoadingScreen } from './ui/loadingScreen.js';
import { PerformanceProfiler } from './core/profiler.js';
import { WorldManager } from './world/worldManager.js';
import { Player } from './characters/player.js';
import { AISimulation } from './ai/aiSimulation.js';

window.addEventListener('DOMContentLoaded', async () => {
  const loadingScreen = new LoadingScreen();
  loadingScreen.setProgress(0);

  const profiler = new PerformanceProfiler();
  const saveManager = new SaveManager();
  const assetManager = new AssetManager();

  // Initialize Three.js and core game
  const game = new Game(profiler);
  await game.initRenderer();

  const worldManager = new WorldManager(game.scene, assetManager, profiler);
  await worldManager.initialize(loadingScreen);

  const player = new Player(game.camera, worldManager);
  const aiSimulation = new AISimulation(worldManager, player);

  const uiManager = new UIManager(player, worldManager, aiSimulation, saveManager);

  game.setWorldManager(worldManager);
  game.setPlayer(player);
  game.setAISimulation(aiSimulation);
  game.setUIManager(uiManager);

  await assetManager.loadEssentials(loadingScreen);
  await player.init(loadingScreen);
  await aiSimulation.init(loadingScreen);

  loadingScreen.setProgress(100);
  loadingScreen.hide();

  game.start();
});