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
