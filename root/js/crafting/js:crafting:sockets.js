// js/crafting/sockets.js
export class SocketSystem {
  constructor() {
    this.runeTypes = {
      ruby: { name: 'Ruby', effect: { fire_damage: 5 } },
      sapphire: { name: 'Sapphire', effect: { mana_regen: 2 } },
      emerald: { name: 'Emerald', effect: { poison_resist: 10 } },
      diamond: { name: 'Diamond', effect: { all_stats: 1 } }
    };
  }

  addSocket(item, socketCount = 1) {
    if (!item.sockets) item.sockets = [];
    for (let i = 0; i < socketCount; i++) {
      item.sockets.push({ filled: false, rune: null });
    }
  }

  insertRune(item, socketIndex, runeId) {
    if (!item.sockets || !item.sockets[socketIndex] || item.sockets[socketIndex].filled) return false;
    const rune = this.runeTypes[runeId];
    if (!rune) return false;
    item.sockets[socketIndex] = { filled: true, rune };
    return true;
  }

  getRuneEffects(item) {
    const effects = {};
    if (item.sockets) {
      item.sockets.forEach(socket => {
        if (socket.filled && socket.rune) {
          for (let [key, val] of Object.entries(socket.rune.effect)) {
            effects[key] = (effects[key] || 0) + val;
          }
        }
      });
    }
    return effects;
  }
}