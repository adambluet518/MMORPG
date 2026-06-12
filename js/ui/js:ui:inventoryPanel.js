// js/ui/inventoryPanel.js
export class InventoryPanel {
  constructor(player) {
    this.player = player;
    this.panel = document.getElementById('inventory-panel');
    this.buildUI();
  }

  buildUI() {
    this.panel.innerHTML = `<h3>Inventory</h3><div id="inventory-grid"></div>`;
    this.grid = document.getElementById('inventory-grid');
    this.grid.style.display = 'grid';
    this.grid.style.gridTemplateColumns = 'repeat(6, 1fr)';
    this.grid.style.gap = '5px';
  }

  update() {
    this.grid.innerHTML = '';
    for (let item of this.player.inventory) {
      const slot = document.createElement('div');
      slot.className = 'item-slot';
      slot.style.background = '#333';
      slot.style.padding = '5px';
      slot.style.borderRadius = '4px';
      slot.textContent = item.name;
      this.grid.appendChild(slot);
    }
  }
}