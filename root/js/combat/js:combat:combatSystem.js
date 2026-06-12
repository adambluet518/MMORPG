// js/combat/combatSystem.js
export class CombatSystem {
  constructor(worldManager) {
    this.worldManager = worldManager;
  }

  executeAttack(attacker, target, skillName) {
    const skill = attacker.skills.get(skillName);
    if (!skill) return;
    if (attacker.mana < skill.cost) return;
    
    attacker.mana -= skill.cost;
    let damage = skill.damage + (attacker.getStat('strength') * 0.5);
    // Elemental modifiers
    if (skill.element === 'fire') damage *= 1.2;
    // Critical hit
    if (Math.random() < attacker.getStat('luck') / 100) {
      damage *= 2;
      // add message
    }
    target.takeDamage(damage);
    // Apply status effects
    if (skill.stun) target.stunTimer = skill.stun;
    if (skill.slow) target.slowTimer = skill.slow;
  }

  getThreat(attacker, target) {
    return attacker.level * 10;
  }
}