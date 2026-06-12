// js/integration/bootstrap.js
import { Game } from '../core/game.js';
import { AssetManager } from '../core/assetManager.js';
import { SaveManager } from '../core/saveManager.js';
import { UIManager } from '../ui/uiManager.js';
import { LoadingScreen } from '../ui/loadingScreen.js';
import { PerformanceProfiler } from '../core/profiler.js';
import { WorldManager } from '../world/worldManager.js';
import { Player } from '../characters/player.js';
import { AISimulation } from '../ai/aiSimulation.js';
import { CharacterManager } from '../characters/characterManager.js';
import { QuestManager } from '../quests/questManager.js';
import { EconomyManager } from '../economy/economyManager.js';
import { CraftingSystem } from '../crafting/craftingSystem.js';
import { HousingSystem } from '../housing/housingSystem.js';
import { GuildManager } from '../guilds/guildManager.js';
import { PetManager } from '../pets/petManager.js';
import { MountManager } from '../mounts/mountManager.js';
import { WeatherSystem } from '../weather/weatherSystem.js';
import { Seasons } from '../weather/seasons.js';
import { LODManager } from '../rendering/lodManager.js';
import { FrustumCuller } from '../rendering/frustumCulling.js';
import { ObjectPool } from '../rendering/objectPool.js';
import { SoundManager } from '../sound/soundManager.js';
import { AnimationManager } from '../animation/animationManager.js';
import { EventManager } from '../core/eventManager.js';
import { LazyLoader } from '../core/lazyLoader.js';
import { ChatSystem } from '../ui/chatSystem.js';
import { MinimapRenderer } from '../ui/minimapRenderer.js';
import { InventoryPanel } from '../ui/inventoryPanel.js';
import { SkillTreePanel } from '../ui/skillTreePanel.js';
import { WorldMapPanel } from '../ui/worldMapPanel.js';
import { SettingsPanel } from '../ui/settingsPanel.js';
import { SaveLoadPanel } from '../ui/saveLoadPanel.js';
import { EventUI } from '../ui/eventUI.js';
import { MainMenu } from '../ui/mainMenu.js';
import { ItemManager } from '../items/itemManager.js';
import { CombatSystem } from '../combat/combatSystem.js';
import { EnchantingSystem } from '../crafting/enchanting.js';
import { SocketSystem } from '../crafting/sockets.js';
import { SkillTree } from '../skills/skillTree.js';
import { PrestigeSystem } from '../endgame/prestige.js';
import { InfiniteProgression } from '../endgame/infiniteProgression.js';
import { CaveSystem } from '../world/caves.js';
import { FloatingIslandSystem } from '../world/floatingIslands.js';
import { SkyRealm } from '../world/skyRealm.js';
import { SecretBossManager } from '../world/secretBosses.js';
import { AuctionHouse } from '../economy/auctionHouse.js';
import { CaravanSystem } from '../economy/caravans.js';
import { AIEconomy } from '../ai/aiEconomy.js';
import { AIGuild } from '../ai/aiGuild.js';
import { AIAdventurer } from '../ai/aiAdventurer.js';
import { AIBackgroundSimulation } from '../ai/aiBackgroundSim.js';
import { ChunkDecorator } from '../world/chunkDecorator.js';

export async function bootstrap() {
  const loadingScreen = new LoadingScreen();
  loadingScreen.setProgress(0);

  const profiler = new PerformanceProfiler();
  const saveManager = new SaveManager();
  const assetManager = new AssetManager();
  const eventManager = new EventManager();
  const lazyLoader = new LazyLoader();

  const game = new Game(profiler);
  await game.initRenderer();

  const worldManager = new WorldManager(game.scene, assetManager, profiler);
  await worldManager.initialize(loadingScreen);

  const player = new Player(game.camera, worldManager);
  const characterManager = new CharacterManager(worldManager);
  const aiSimulation = new AISimulation(worldManager, player);
  const questManager = new QuestManager(worldManager, player);
  const economyManager = new EconomyManager(worldManager);
  const itemManager = new ItemManager();
  const craftingSystem = new CraftingSystem(itemManager);
  const housingSystem = new HousingSystem(worldManager, player);
  const guildManager = new GuildManager();
  const petManager = new PetManager();
  const mountManager = new MountManager();
  const weatherSystem = new WeatherSystem(game.scene);
  const seasons = new Seasons();
  const lodManager = new LODManager(game.camera);
  const frustumCuller = new FrustumCuller(game.camera);
  const objectPool = new ObjectPool(() => new THREE.Vector3(), 100);
  const soundManager = new SoundManager();
  const animationManager = new AnimationManager();
  const chatSystem = new ChatSystem(aiSimulation);
  const combatSystem = new CombatSystem(worldManager);
  const enchantingSystem = new EnchantingSystem();
  const socketSystem = new SocketSystem();
  const skillTree = new SkillTree();
  const prestigeSystem = new PrestigeSystem(player);
  const infiniteProgression = new InfiniteProgression(player);
  const caveSystem = new CaveSystem(worldManager);
  const floatingIslandSystem = new FloatingIslandSystem(worldManager);
  const skyRealm = new SkyRealm(worldManager);
  const secretBossManager = new SecretBossManager(worldManager, player);
  const auctionHouse = new AuctionHouse(economyManager);
  const caravanSystem = new CaravanSystem(worldManager);
  const aiEconomy = new AIEconomy(economyManager);
  const aiGuild = new AIGuild(guildManager);
  const aiAdventurer = new AIAdventurer(worldManager, player);
  const aiBackgroundSim = new AIBackgroundSimulation(worldManager);
  const chunkDecorator = new ChunkDecorator(game.scene, worldManager);

  const uiManager = new UIManager(player, worldManager, aiSimulation, saveManager);
  const minimapRenderer = new MinimapRenderer(worldManager, player);
  const inventoryPanel = new InventoryPanel(player);
  const skillTreePanel = new SkillTreePanel(player);
  const worldMapPanel = new WorldMapPanel(worldManager);
  const settingsPanel = new SettingsPanel(game);
  const saveLoadPanel = new SaveLoadPanel(saveManager);
  const eventUI = new EventUI(eventManager);

  // Connect all systems to game
  game.worldManager = worldManager;
  game.player = player;
  game.aiSimulation = aiSimulation;
  game.uiManager = uiManager;
  game.weatherSystem = weatherSystem;
  game.characterManager = characterManager;
  game.questManager = questManager;
  game.economyManager = economyManager;
  game.combatSystem = combatSystem;
  game.craftingSystem = craftingSystem;
  game.housingSystem = housingSystem;
  game.guildManager = guildManager;
  game.petManager = petManager;
  game.mountManager = mountManager;
  game.soundManager = soundManager;
  game.eventManager = eventManager;
  game.animationManager = animationManager;
  game.seasons = seasons;
  game.prestigeSystem = prestigeSystem;
  game.infiniteProgression = infiniteProgression;
  game.caveSystem = caveSystem;
  game.floatingIslandSystem = floatingIslandSystem;
  game.skyRealm = skyRealm;
  game.secretBossManager = secretBossManager;
  game.auctionHouse = auctionHouse;
  game.caravanSystem = caravanSystem;
  game.chunkDecorator = chunkDecorator;
  game.skillTree = skillTree;
  game.enchantingSystem = enchantingSystem;
  game.socketSystem = socketSystem;

  // Finalize loading
  await assetManager.loadEssentials(loadingScreen);
  await player.init(loadingScreen);
  await aiSimulation.init(loadingScreen);
  loadingScreen.setProgress(100);
  loadingScreen.hide();

  // Show main menu or start directly
  const mainMenu = new MainMenu(saveManager, (action) => {
    if (action === 'new') {
      game.start();
    } else if (action === 'load') {
      // load game state and then start
      const save = saveManager.load(0);
      if (save) {
        // apply save data to systems
        game.start();
      }
    } else if (action === 'continue') {
      const save = saveManager.load(0);
      if (save) game.start();
    }
  });
}