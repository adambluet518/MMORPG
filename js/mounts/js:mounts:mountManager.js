// js/mounts/mountManager.js
export class MountManager {
  constructor() {
    this.mounts = new Map(); // player -> mount
  }

  summonMount(player, mountType) {
    const mount = {
      type: mountType,
      speedMultiplier: mountType === 'dragon' ? 2.5 : 1.8,
      flying: mountType === 'dragon' || mountType === 'airship',
      health: 200
    };
    this.mounts.set(player.name, mount);
    return mount;
  }
}