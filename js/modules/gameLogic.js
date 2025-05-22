import { playSound } from "./utils.js";

const playerNameDisplay = document.getElementById("player-name-display");
const playerName = localStorage.getItem("playerName");

if (playerNameDisplay && playerName) {
  playerNameDisplay.textContent = playerName;
}

const flipSound = new Audio("./assets/easy/audio/click-sound.mp3");
const matchSound = new Audio("./assets/easy/audio/match-sound.mp3");
const mismatchSound = new Audio("./assets/easy/audio/wrong-sound.mp3");
const winSound = new Audio("./assets/easy/audio/win-sound.mp3");
const resetBtn = document.getElementById('reset-game');


let firstCard = null;
let secondCard = null;
let moves = 0;
let lockBoard = true; 
const flipDelay = 1000; 
const previewTime = 2000;
const currentLevel = 'easy'; 

const cards = document.querySelectorAll(".card");
let timeLeft = 0;
let timerInterval = null;

function flipCard(card) {
  if (
    lockBoard ||
    card.classList.contains("flipped") ||
    card.classList.contains("matched")
  )
    return;
  
  flipSound.currentTime = 0;
  flipSound.play();
  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    lockBoard = true;
    moves++;
    document.getElementById("moves").textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  const isMatch = firstCard.dataset.logo === secondCard.dataset.logo;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    firstCard.querySelector(".card-front").classList.add("matched");
    secondCard.querySelector(".card-front").classList.add("matched");

    playSound(matchSound);
    resetTurn();
    
    const allMatched = document.querySelectorAll('.card.matched').length === cards.length;
    if (allMatched) {
      setTimeout(() => {
        playSound(winSound);
        endGame(true);
      }, 500);
    }
  } else {
    mismatchSound.currentTime = 0;
    mismatchSound.play();
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, flipDelay);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function previewCards() {
  cards.forEach((card) => card.classList.add("flipped"));
  setTimeout(() => {
    cards.forEach((card) => {
      if (!card.classList.contains("matched")) {
        card.classList.remove("flipped");
      }
    });
    lockBoard = false;
    startTimer();
  }, previewTime);
}

function endGame(won) {
  const endCard = document.getElementById("end-message");
  clearInterval(timerInterval);
  document.getElementById("end-div").classList.remove("hidden");

  if (won) {
    const finalTime = formatTime(timeLeft);
    const timeInSeconds = timeLeft;
    const playerName = localStorage.getItem('playerName') || 'Guest';
    
const gameResults = JSON.parse(localStorage.getItem('memoryGameScores') || '[]');

gameResults.push({
  player: playerName,
  time: timeInSeconds,
  moves: moves,
  level: currentLevel,
  date: new Date().toLocaleDateString()
});
localStorage.setItem('memoryGameScores', JSON.stringify(gameResults));


    localStorage.setItem('gameResults', JSON.stringify(gameResults));

   endCard.innerHTML = `
<h3>Congratulations, you won! 🎉</h3>
<p>You completed the game in <strong>${finalTime}</strong></p>
<p>Number of moves: <strong>${moves}</strong></p>
`;

    endCard.style.backgroundColor = "#4CAF50";
    endCard.style.color = "white";
    endCard.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.4)";
    endCard.style.padding = "40px 15px";
    endCard.style.borderRadius = "10px";
    endCard.style.textAlign = "center";
    endCard.style.fontFamily = "Arial, sans-serif";

    const showScoreBtn = document.getElementById('show-score');
    if (showScoreBtn) {
      const last = gameResults[gameResults.length - 1];
      showScoreBtn.textContent = `آخر نتيجة: ${last.player}, ${formatTime(last.time)}, ${last.moves} حركات`;
    }
  }
}

function shuffleCards() {
  const cardGrid = document.getElementById("game-board");
  const shuffled = [...cards].sort(() => 0.5 - Math.random());
  shuffled.forEach((card) => cardGrid.appendChild(card.parentElement));
}

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function startTimer() {
  const timeDisplay = document.getElementById("timer");
  timeDisplay.textContent = formatTime(timeLeft); 
  timerInterval = setInterval(() => {
    timeLeft++;
    timeDisplay.textContent = formatTime(timeLeft);
  }, 1000);
}

function restartGame() {
  document.getElementById("end-div").classList.add("hidden");
  // document.getElementById("end-div").style.display = 'none';
  location.reload();
}


const hint = document.getElementById("hint-button");
const hintsRemaining = document.getElementById("hints-remaining");
let hintNum = 3;

function giveHint(duration) {
  const unmatched = Array.from(document.querySelectorAll(".card")).filter(
    (c) => !c.classList.contains("matched")
  );

  const groups = unmatched.reduce((map, card) => {
    const logo = card.dataset.logo;
    map[logo] = map[logo] || [];
    map[logo].push(card);
    return map;
  }, {});

  const pair = Object.values(groups).find((g) => g.length >= 2);
  if (!pair) return;

  if (lockBoard) return;

  const [cardA, cardB] = pair;

  [cardA, cardB].forEach((c) => {
    c.classList.add("flipped");
    hint.style.pointerEvents = "none";
  });

  setTimeout(() => {
    [cardA, cardB].forEach((c) => {
      if (!c.classList.contains("matched")) {
        c.classList.remove("flipped");
      }
    });
    if (hintNum > 0) {
      hint.style.pointerEvents = "auto";
    }
  }, duration);
  
  if (hintNum > 0) {
    hintNum--;
    hintsRemaining.textContent = hintNum;
    if (hintNum === 0) {
      hint.style.pointerEvents = "none";
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  shuffleCards();
  setTimeout(() => {
    previewCards();
  }, 300);
});

cards.forEach((card) => {
  card.addEventListener("click", () => flipCard(card));
});

if (hint) {
  hint.addEventListener("click", () => giveHint(2000));
}

const showScoreBtn = document.getElementById("show-score-btn");
if (showScoreBtn) {
  showScoreBtn.addEventListener("click", displayScores);
}

const againBtn = document.querySelector(".againBtn");
if (againBtn) {
  againBtn.addEventListener("click", restartGame);
}
resetBtn.addEventListener('click',restartGame)