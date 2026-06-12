// js/core/saveManager.js
export class SaveManager {
  constructor() {
    this.slots = 3;
    this.currentSlot = 0;
    this.autoSaveInterval = 300000; // 5 min
    this.autoSaveTimer = null;
  }

  save(slot) {
    const data = {
      player: { /* position, stats */ },
      world: { /* discovered chunks */ },
      timestamp: Date.now()
    };
    localStorage.setItem(`aetheria_save_${slot}`, JSON.stringify(data));
  }

  load(slot) {
    const raw = localStorage.getItem(`aetheria_save_${slot}`);
    if (raw) return JSON.parse(raw);
    return null;
  }

  exportSave() {
    const data = this.load(this.currentSlot);
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aetheria_save.json';
    a.click();
  }

  importSave(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      this.currentSlot = 0;
      localStorage.setItem('aetheria_save_0', JSON.stringify(data));
      location.reload();
    };
    reader.readAsText(file);
  }
}