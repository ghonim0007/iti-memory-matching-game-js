import { shuffleArray } from './utils.js';

export class Game {
  constructor(totalPairs) {
    this.moves = 0;
    this.matchedPairs = 0;
    this.flippedCards = [];
    this.isFlipping = false;
    this.timer = null;
    this.seconds = 0;
    this.totalPairs = totalPairs;
    this.elements = {
      gameBoard: document.getElementById('game-board'),
      movesDisplay: document.getElementById('moves'),
      timerDisplay: document.getElementById('timer'),
    };
  }

  shuffleCards() {
    const cardContainers = Array.from(this.elements.gameBoard.querySelectorAll('.card-container'));
    const shuffled = shuffleArray(cardContainers);
    this.elements.gameBoard.innerHTML = '';
    shuffled.forEach(container => this.elements.gameBoard.appendChild(container));
  }

  updateMoves() {
    this.moves++;
    this.elements.movesDisplay.textContent = this.moves;
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.seconds++;
      const minutes = Math.floor(this.seconds / 60);
      const secs = this.seconds % 60;
      this.elements.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
  }

  checkGameOver() {
    if (this.matchedPairs === this.totalPairs) {
      clearInterval(this.timer);
      alert(`Game Over! Time: ${this.elements.timerDisplay.textContent}, Moves: ${this.moves}`);
    }
  }

  handleCardClick(cardContainer) {
    if (
      this.isFlipping ||
      cardContainer.querySelector('.card').classList.contains('flipped') ||
      this.flippedCards.length >= 2
    ) {
      return;
    }

    const card = cardContainer.querySelector('.card');
    card.classList.add('flipped');
    this.flippedCards.push(cardContainer);
    this.updateMoves();

    if (this.flippedCards.length === 2) {
      this.isFlipping = true;
      const [firstCard, secondCard] = this.flippedCards;
      const firstLogo = firstCard.querySelector('.card').getAttribute('data-logo');
      const secondLogo = secondCard.querySelector('.card').getAttribute('data-logo');

      if (firstLogo === secondLogo) {
        this.matchedPairs++;
        this.flippedCards = [];
        this.isFlipping = false;
        this.checkGameOver();
      } else {
        setTimeout(() => {
          firstCard.querySelector('.card').classList.remove('flipped');
          secondCard.querySelector('.card').classList.remove('flipped');
          this.flippedCards = [];
          this.isFlipping = false;
        }, 1000);
      }
    }
  }

  init() {
    this.shuffleCards();
    this.startTimer();
    this.elements.gameBoard.querySelectorAll('.card-container').forEach(block => {
      block.addEventListener('click', () => this.handleCardClick(block));
    });
  }
}