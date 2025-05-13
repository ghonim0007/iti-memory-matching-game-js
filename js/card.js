export class Card {
    constructor(id, content) {
      this.id = id;
      this.content = content;
      this.matched = false;
      this.element = this.createElement();
    }
  
    createElement() {
      const div = document.createElement('div');
      div.classList.add('card');
      div.dataset.id = this.id;
      div.textContent = '?';
      return div;
    }
  
    reveal() {
      if (!this.matched) {
        this.element.classList.add('revealed');
        this.element.textContent = this.content;
      }
    }
  
    hide() {
      if (!this.matched) {
        this.element.classList.remove('revealed');
        this.element.textContent = '?';
      }
    }
  
    markMatched() {
      this.matched = true;
      this.element.classList.add('matched');
    }
  }
  