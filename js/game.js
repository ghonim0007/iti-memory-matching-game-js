import { EMOJIS, shuffleCards, formatTime, calculateScore } from './utils.js';
import { GameTimer } from './timer.js';

export class MemoryGame {
    constructor() {
        // Initialize game elements
        this.board = document.getElementById('game-board');
        this.startBtn = document.getElementById('start-game');
        this.resetBtn = document.getElementById('reset-game');
        this.playAgainBtn = document.getElementById('play-again');
        
        // Game state
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.isPlaying = false;
        
        // Initialize timer with time display update
        this.timer = new GameTimer((time) => {
            document.getElementById('time').textContent = time;
        });
        
        this.setupGame();
    }

    setupGame() {
        this.createBoard();
        this.setupEvents();
    }

    createBoard() {
        // Create pairs and shuffle
        const gameCards = [...EMOJIS, ...EMOJIS];
        this.board.innerHTML = '';
        
        shuffleCards(gameCards).forEach((emoji, index) => {
            const card = document.createElement('div');
            card.className = 'col-3 col-sm-2 col-md-2 col-lg-2';
            card.innerHTML = `
                <div class="card" data-index="${index}">
                    <div class="card-inner">
                        <div class="card-front">${emoji}</div>
                        <div class="card-back"></div>
                    </div>
                </div>
            `;
            this.board.appendChild(card);
        });
    }

    setupEvents() {
        // Card click event
        this.board.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if (card) this.flipCard(card);
        });
        
        // Button events
        this.startBtn.addEventListener('click', () => this.startGame());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.playAgainBtn.addEventListener('click', () => this.resetGame());
    }

    startGame() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.moves = 0;
        this.matchedPairs = 0;
        this.updateStats();
        this.timer.start();
        
        // Briefly show all cards then hide
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('flipped');
        });
        
        setTimeout(() => {
            document.querySelectorAll('.card').forEach(card => {
                card.classList.remove('flipped');
            });
        }, 1500);
    }

    flipCard(card) {
        if (!this.isPlaying || 
            card.classList.contains('flipped') || 
            this.flippedCards.length >= 2) return;
        
        card.classList.add('flipped');
        this.flippedCards.push(card);
        
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.checkMatch();
        }
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;
        const isMatch = card1.querySelector('.card-front').textContent === 
                       card2.querySelector('.card-front').textContent;
        
        if (isMatch) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            this.flippedCards = [];
            this.matchedPairs++;
            this.updateStats();
            
            if (this.matchedPairs === EMOJIS.length) {
                this.endGame();
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                this.flippedCards = [];
            }, 1000);
        }
    }

    updateStats() {
        document.getElementById('moves').textContent = this.moves;
        document.getElementById('score').textContent = 
            calculateScore(this.moves, this.timer.getTime(), this.matchedPairs);
    }

    endGame() {
        this.isPlaying = false;
        this.timer.stop();
        
        // Show win message with final stats
        document.getElementById('final-score').textContent = 
            calculateScore(this.moves, this.timer.getTime());
        document.getElementById('final-time').textContent = 
            this.timer.getFormattedTime();
        document.getElementById('final-moves').textContent = this.moves;
        
        document.getElementById('win-message').classList.remove('d-none');
    }

    resetGame() {
        this.timer.reset();
        this.isPlaying = false;
        this.flippedCards = [];
        this.moves = 0;
        this.matchedPairs = 0;
        this.updateStats();
        this.createBoard();
        document.getElementById('win-message').classList.add('d-none');
    }
}
=======
import { Card } from './card.js';
import { shuffle } from './utils.js';

const contents = ['🍎', '🍌', '🍒', '🍇', '🍓', '🍑', '🍍', '🥝'];

let firstCard = null;
let secondCard = null;
let boardLocked = false;

export function startGame() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  const pairs = [...contents, ...contents]; // duplicate for pairs
  shuffle(pairs);

  const cards = pairs.map((content, index) => new Card(index, content));

  cards.forEach((card) => {
    gameBoard.appendChild(card.element);
    card.element.addEventListener('click', () => handleCardClick(card));
  });
}

function handleCardClick(card) {
  if (boardLocked || card.matched || card === firstCard) return;

  card.reveal();

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    checkMatch();
  }
}

function checkMatch() {
  boardLocked = true;
  if (firstCard.content === secondCard.content) {
    firstCard.markMatched();
    secondCard.markMatched();
    resetTurn();
  } else {
    setTimeout(() => {
      firstCard.hide();
      secondCard.hide();
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  boardLocked = false;
}
