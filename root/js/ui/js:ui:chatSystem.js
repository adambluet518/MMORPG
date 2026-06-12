// js/ui/chatSystem.js
export class ChatSystem {
  constructor(aiSimulation) {
    this.aiSimulation = aiSimulation;
    this.chatBox = document.getElementById('chat-box');
    this.messages = [];
  }

  addMessage(text, sender = 'system') {
    this.messages.push({ text, sender, time: Date.now() });
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    msgDiv.textContent = text;
    this.chatBox.appendChild(msgDiv);
    this.chatBox.scrollTop = this.chatBox.scrollHeight;
    // keep only last 50 messages
    if (this.messages.length > 50) {
      this.messages.shift();
      this.chatBox.removeChild(this.chatBox.firstChild);
    }
  }

  update() {
    // inject AI chatter periodically
    if (Math.random() < 0.01) {
      const aiMessages = [
        "AI Adventurer: Anyone seen the Goblin King?",
        "Merchant: Selling health potions, 15 gold each!",
        "Guard: Keep the peace!"
      ];
      this.addMessage(aiMessages[Math.floor(Math.random() * aiMessages.length)], 'ai');
    }
  }
}