// js/ai/aiGuild.js
export class AIGuild {
  constructor(guildManager) {
    this.guildManager = guildManager;
  }

  formAIGuilds() {
    // create AI-run guilds with simulated members
    const guildNames = ['Shadow Ravens', 'Iron Legion', 'Celestial Dawn'];
    guildNames.forEach(name => {
      this.guildManager.createGuild(name, { name: `AI_${name}` });
    });
  }
}