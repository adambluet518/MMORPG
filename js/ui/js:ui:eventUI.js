// js/ui/eventUI.js
export class EventUI {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.panel = document.createElement('div');
    this.panel.id = 'event-popup';
    this.panel.style.cssText = 'position:absolute; top:30%; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.9); color:#ffd700; padding:15px; border-radius:8px; display:none; z-index:20;';
    document.getElementById('ui-layer').appendChild(this.panel);
    this.eventManager.on('event_start', (data) => this.showEvent(data));
  }

  showEvent(data) {
    this.panel.style.display = 'block';
    this.panel.innerHTML = `<h3>${data.title}</h3><p>${data.description}</p><button id="event-accept">Accept</button>`;
    document.getElementById('event-accept').addEventListener('click', () => {
      this.panel.style.display = 'none';
      if (data.onAccept) data.onAccept();
    });
  }
}