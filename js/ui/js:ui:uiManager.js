// js/ui/uiManager.js
export class UIManager {
  constructor(player, worldManager, aiSimulation, saveManager) {
    this.player = player;
    this.worldManager = worldManager;
    this.aiSimulation = aiSimulation;
    this.saveManager = saveManager;
    this.fpsDisplay = document.createElement('div');
    this.fpsDisplay.style.cssText = 'position:absolute; top:5px; right:5px; color:#fff; font-size:12px;';
    document.getElementById('ui-layer').appendChild(this.fpsDisplay);
    
    this.chatBox = document.getElementById('chat-box');
    this.actionBar = document.getElementById('action-bar');
    this.playerStatus = document.getElementById('player-status');
    this.questTracker = document.getElementById('quest-tracker');
    
    this.setupActionBar();
    this.setupKeyboardShortcuts();
  }

  setupActionBar() {
    // slots for abilities
    for (let i = 0; i < 6; i++) {
      const slot = document.createElement('div');
      slot.className = 'action-slot';
      slot.textContent = i+1;
      this.actionBar.appendChild(slot);
    }
  }

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'i') {
        document.getElementById('inventory-panel').classList.toggle('hidden');
      }
      if (e.key === 'k') {
        document.getElementById('skill-tree-panel').classList.toggle('hidden');
      }
      if (e.key === 'm') {
        document.getElementById('world-map-panel').classList.toggle('hidden');
      }
    });
  }

  update(deltaTime) {
    this.updateStatusBars();
    this.updateQuestTracker();
    this.updateChat();
  }

  updateStatusBars() {
    if (!this.player) return;
    const hp = this.player.health / this.player.maxHealth * 100;
    const mp = this.player.mana / this.player.maxMana * 100;
    const energy = this.player.energy / this.player.maxEnergy * 100;
    this.playerStatus.innerHTML = `
      <div>Health</div>
      <div class="status-bar"><div class="status-fill health-fill" style="width:${hp}%"></div></div>
      <div>Mana</div>
      <div class="status-bar"><div class="status-fill mana-fill" style="width:${mp}%"></div></div>
      <div>Energy</div>
      <div class="status-bar"><div class="status-fill energy-fill" style="width:${energy}%"></div></div>
    `;
  }

  updateQuestTracker() {
    // placeholders
    this.questTracker.innerHTML = `<div style="color:var(--color-accent);">Quests</div>
      <div>• Explore the starting zone</div>
      <div class="quest-objective">Defeat 5 goblins (0/5)</div>`;
  }

  updateChat() {
    // add messages from AI simulation
  }

  updateFPS(fps) {
    this.fpsDisplay.textContent = `FPS: ${fps}`;
  }
}