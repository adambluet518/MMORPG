<!-- README.md -->
# Aetheria Online - Browser MMORPG

## How to Run
1. Clone repo to GitHub Pages (or any static server).
2. Open index.html.
3. Use WASD to move, I for inventory, K for skills, M for map.
4. Enjoy the massive open world!

## Features
- Procedural infinite world with 10+ biomes.
- 10 playable races, 11 classes.
- Real-time combat, AI simulation, guilds, housing, pets, mounts.
- Day/night cycle, dynamic weather, seasons.
- Crafting, enchanting, socketing, economy.
- Dungeons, raids, secret bosses, prestige system.
- Save/Load to browser storage.

## Performance
- Chunk loading, LOD, frustum culling, object pooling.
- Background AI simulation for distant areas.
- Stable 60 FPS target.

## File Structure
/css    - Stylesheets
/js     - JavaScript modules
  /core   - Game engine, save, assets, profiler
  /characters - Player and class files
  /ai     - AI systems
  /world  - Terrain, biomes, caves, sky realms
  /combat - Combat system
  /items  - Item manager
  /quests - Quest manager
  /economy - Trading, auction house, caravans
  /crafting - Crafting, enchanting, sockets
  /housing - Player housing
  /guilds - Guilds and wars
  /pets   - Pet system
  /mounts - Mounts and flying creatures
  /weather - Weather and seasons
  /rendering - LOD, culling, object pool
  /sound  - Audio manager
  /animation - Animation handling
  /ui     - All user interface panels
  /skills - Skill tree
  /endgame - Prestige, infinite progression
  /dungeons - Dungeon generation
  /species - Race definitions