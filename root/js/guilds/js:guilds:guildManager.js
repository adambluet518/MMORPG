// js/guilds/guildManager.js
export class GuildManager {
  constructor() {
    this.guilds = new Map(); // name -> guild
  }

  createGuild(name, founder) {
    if (this.guilds.has(name)) return null;
    const guild = {
      name,
      leader: founder.name,
      members: [founder.name],
      level: 1,
      reputation: 0,
      hall: null,
      wars: [],
      upgrades: {}
    };
    this.guilds.set(name, guild);
    return guild;
  }

  joinGuild(guildName, playerName) {
    const guild = this.guilds.get(guildName);
    if (guild && !guild.members.includes(playerName)) {
      guild.members.push(playerName);
    }
  }

  declareWar(guildA, guildB) {
    const gA = this.guilds.get(guildA);
    const gB = this.guilds.get(guildB);
    if (gA && gB) {
      gA.wars.push(guildB);
      gB.wars.push(guildA);
    }
  }
}