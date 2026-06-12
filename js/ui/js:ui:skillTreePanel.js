// js/ui/skillTreePanel.js
export class SkillTreePanel {
  constructor(player) {
    this.player = player;
    this.panel = document.getElementById('skill-tree-panel');
    this.buildUI();
  }

  buildUI() {
    this.panel.innerHTML = `<h3>Skills</h3><div id="skills-container"></div>`;
    this.container = document.getElementById('skills-container');
  }

  update() {
    this.container.innerHTML = '';
    const skillCategories = ['Mining', 'Fishing', 'Farming', 'Cooking', 'Crafting', 'Smithing', 'Alchemy', 'Magic', 'Woodcutting', 'Hunting', 'Sailing', 'Trading', 'Leadership'];
    for (let skill of skillCategories) {
      const level = this.player.skills[skill] || 0;
      const div = document.createElement('div');
      div.textContent = `${skill}: Lv. ${level}`;
      div.style.margin = '4px 0';
      this.container.appendChild(div);
    }
  }
}