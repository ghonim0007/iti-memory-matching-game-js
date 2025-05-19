import { playSound } from './utils.js'; 
const flipSound = new Audio('./assets/easy/audio/click-sound.mp3');
const matchSound = new Audio('./assets/easy/audio/match-sound.mp3');
const mismatchSound = new Audio('./assets/easy/audio/wrong-sound.mp3');
const winSound = new Audio('./assets/easy/audio/win-sound.mp3');
const loseSound = new Audio('assets/sound');
export const backgroundMusic = new Audio('./assets/easy/audio/background-music.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.3; // 

const againBtn =document.querySelector('.againBtn')

let firstCard = null;
let secondCard = null;
let moves = 0;
let lockBoard = true; // Prevent clicking during preview
const flipDelay = 1000; // Time to flip cards back if not matched
const previewTime = 2000; // Time to show preview on start

const cards = document.querySelectorAll('.card');

function flipCard(card) {
  if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;
  flipSound.currentTime = 0;
  flipSound.play(); 
  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    lockBoard = true; // Prevent clicking more cards
    moves++;
    document.getElementById('moves').textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  const isMatch = firstCard.dataset.logo === secondCard.dataset.logo;

  if (isMatch) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
      firstCard.querySelector('.card-front').classList.add('matched');
  secondCard.querySelector('.card-front').classList.add('matched');

  playSound(matchSound); 
    resetTurn();
if (document.querySelectorAll('.card.matched').length === cards.length) {
    playSound(winSound)
  endGame(true);
}
  } else {
       mismatchSound.currentTime = 0;
    mismatchSound.play();
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetTurn();
    }, flipDelay);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

cards.forEach(card => {
  card.addEventListener('click', () => flipCard(card));
});

function previewCards() {
  cards.forEach(card => card.classList.add('flipped'));
  setTimeout(() => {
    cards.forEach(card => {
      if (!card.classList.contains('matched')) {
        card.classList.remove('flipped');
      }
    });
    lockBoard = false;
    startTimer();

  }, previewTime);
}
function endGame(won) {
  const endCard =  document.getElementById('end-message')
  clearInterval(timerInterval);
  document.getElementById('end-div').classList.remove('hidden');
  endCard.innerHTML = won ? '<h3>Congratulations, You Win! 🎉</h3>' : '<h3>Time’s Up! You Lose ⏰</h3>';
 endCard.style.backgroundColor = 'green'
   endCard.style.color = 'white';
   endCard.style.boxShadow ='0 12px 30px rgba(0, 0, 0, 0.4)';
    endCard.style.padding = '40px 10px';
    endCard.style.borderRadius = '10px';

}
function shuffleCards() {
  const cardGrid = document.getElementById('game-board');
  const shuffled = [...cards].sort(() => 0.5 - Math.random());
  shuffled.forEach(card => cardGrid.appendChild(card.parentElement));
}

window.addEventListener('DOMContentLoaded', () => {
  shuffleCards();
  setTimeout(() => {
    previewCards();
  }, 300);

  backgroundMusic.play().catch(e => {
    console.warn("Background music play blocked until user interaction.");
  });
});

document.body.addEventListener('click', () => {
  backgroundMusic.play().catch(() => {});
}, { once: true });

let timeLeft = 180;
let timerInterval = null;

function startTimer() {
  const timeDisplay = document.getElementById('timer');
timerInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame(false); 
    }
  }, 1000);
}

function restartGame() {
  document.getElementById('end-div').classList.add('hidden');
  location.reload(); 
}

againBtn.addEventListener('click', function(){
    restartGame();
})