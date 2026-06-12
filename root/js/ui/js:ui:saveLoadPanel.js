// js/ui/saveLoadPanel.js
export class SaveLoadPanel {
  constructor(saveManager) {
    this.saveManager = saveManager;
    this.panel = document.createElement('div');
    this.panel.id = 'save-load-panel';
    this.panel.classList.add('hidden');
    this.panel.innerHTML = `
      <h3>Save / Load</h3>
      <div id="save-slots"></div>
      <button id="new-save">Save Game</button>
      <button id="load-save">Load Game</button>
      <button id="export-save">Export Save</button>
      <input type="file" id="import-save" accept=".json">
    `;
    document.getElementById('ui-layer').appendChild(this.panel);
    this.setupEvents();
  }

  setupEvents() {
    document.getElementById('new-save').addEventListener('click', () => this.saveManager.save(0));
    document.getElementById('load-save').addEventListener('click', () => this.saveManager.load(0));
    document.getElementById('export-save').addEventListener('click', () => this.saveManager.exportSave());
    document.getElementById('import-save').addEventListener('change', (e) => this.saveManager.importSave(e.target.files[0]));
  }

  toggle() {
    this.panel.classList.toggle('hidden');
  }
}