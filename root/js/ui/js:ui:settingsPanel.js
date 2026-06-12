// js/ui/settingsPanel.js
export class SettingsPanel {
  constructor(game) {
    this.game = game;
    this.panel = document.createElement('div');
    this.panel.id = 'settings-panel';
    this.panel.classList.add('hidden');
    this.panel.innerHTML = `
      <h3>Settings</h3>
      <label>Graphics Quality
        <select id="gfx-quality">
          <option>Low</option>
          <option selected>Medium</option>
          <option>High</option>
        </select>
      </label>
      <label>Render Distance
        <input type="range" min="1" max="5" value="3" id="render-distance">
      </label>
      <button id="save-settings">Apply</button>
    `;
    document.getElementById('ui-layer').appendChild(this.panel);
    document.getElementById('save-settings').addEventListener('click', () => this.applySettings());
  }

  applySettings() {
    const quality = document.getElementById('gfx-quality').value;
    const dist = document.getElementById('render-distance').value;
    this.game.worldManager.renderDistance = parseInt(dist);
    // apply quality changes
  }

  toggle() {
    this.panel.classList.toggle('hidden');
  }
}