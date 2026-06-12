// js/characters/equipmentRenderer.js
export class EquipmentRenderer {
  constructor() {
    this.equipmentMeshes = new Map();
  }

  applyEquipment(baseMesh, equipment) {
    // Clear old equipment meshes
    const attached = this.equipmentMeshes.get(baseMesh) || [];
    attached.forEach(m => baseMesh.remove(m));
    this.equipmentMeshes.set(baseMesh, []);

    if (equipment.head) this.attachHelmet(baseMesh, equipment.head);
    if (equipment.chest) this.attachChest(baseMesh, equipment.chest);
    if (equipment.weapon) this.attachWeapon(baseMesh, equipment.weapon);
    if (equipment.cloak) this.attachCloak(baseMesh, equipment.cloak);
  }

  attachHelmet(baseMesh, item) {
    // placeholder: create helmet mesh and attach to head bone
  }
  attachChest(baseMesh, item) {}
  attachWeapon(baseMesh, item) {}
  attachCloak(baseMesh, item) {}
}