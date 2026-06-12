// js/ui/mainMenu.js
export class MainMenu {
  constructor(saveManager, gameStartCallback) {
    this.saveManager = saveManager;
    this.gameStartCallback = gameStartCallback;
    this.menuDiv = document.createElement('div');
    this.menuDiv.id = 'main-menu';
    this.menuDiv.innerHTML = `
      <div style="text-align:center; color:#fff; background:rgba(0,0,0,0.8); padding:30px; border-radius:15px;">
        <h1>Aetheria Online</h1>
        <button id="new-game-btn">New Game</button>
        <button id="load-game-btn">Load Game</button>
        <button id="continue-btn" style="display:none;">Continue</button>
        <div id="save-slots-info"></div>
      </div>
    `;
    document.body.appendChild(this.menuDiv);
    this.setupEvents();
  }

  setupEvents() {
    document.getElementById('new-game-btn').addEventListener('click', () => {
      this.gameStartCallback('new');
      this.hide();
    });
    document.getElementById('load-game-btn').addEventListener('click', () => {
      this.gameStartCallback('load');
      this.hide();
    });
    const continueBtn = document.getElementById('continue-btn');
    if (this.saveManager.load(0)) {
      continueBtn.style.display = 'block';
      continueBtn.addEventListener('click', () => {
        this.gameStartCallback('continue');
        this.hide();
      });
    }
  }

  hide() {
    this.menuDiv.style.display = 'none';
  }

  show() {
    this.menuDiv.style.display = 'flex';
  }
}