document.addEventListener("DOMContentLoaded", () => {
  const allCards = [
    '🐟', '🐠', '🦈', '🐡', '🦑', '🐙', '🦞', '🦀',
    '🦐', '🐚', '🐬', '🐳', '🐋', '🦭', '🦦', '🌊',
    '🌴', '🏝️', '🪸', '🪼', '🦪', '⚓', '🚤', '🛥️',
    '🚢', '🏊‍♀️', '🤿', '🏖️', '🗺️', '🔱', '💧', '🌅'
  ];

  // عناصر DOM حسب HTML الخاص بك
  const gameBoard = document.getElementById('game-board');
  const startButton = document.getElementById('startGame');
  const resetButton = document.getElementById('reset-game');
  const movesDisplay = document.getElementById('moves');
  const matchesDisplay = document.getElementById('matches');
  const timeDisplay = document.getElementById('time');
  const finalMoves = document.getElementById('final-moves');
  const finalTime = document.getElementById('final-time');
  const winMessage = document.getElementById('win-message');
  const playerNameDisplay = document.getElementById('player-name');

  // بيانات اللاعب والمستوى
  const playerName = localStorage.getItem("playerName") || "Player";
  const level = localStorage.getItem("gameLevel") || "easy";
  playerNameDisplay.textContent = `Welcome, ${playerName}!`;

  // عدد الكروت حسب المستوى
  let gridSize = 4;
  if (level === "medium") gridSize = 6;
  else if (level === "hard") gridSize = 8;
  const totalCards = gridSize * gridSize;

  // متغيرات اللعبة
  let gameCards = [];
  let flippedCards = [];
  let matchedPairs = 0;
  let moves = 0;
  let timer = null;
  let seconds = 0;
  let gameStarted = false;

  // دالة إنشاء الكروت
  function createCards() {
    const pairs = totalCards / 2;
    const selected = allCards.slice(0, pairs);
    gameCards = shuffle([...selected, ...selected]);

    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    gameCards.forEach(symbol => {
      const cardContainer = document.createElement('div');
      cardContainer.className = 'game-card';

      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-symbol', symbol);

      const front = document.createElement('div');
front.className = 'card-face card-front';
// خلي الظهر هنا صورة الغطاء (كانت في الـ back)
front.innerHTML = '<img src="asssets/card cover.jpeg" alt="back" style="width: 70%; height: 70%;">';

const back = document.createElement('div');
back.className = 'card-face card-back';
// خلي الوش هنا هو رمز الإيموجي (كان في الـ front)
back.textContent = symbol;



      card.appendChild(front);
      card.appendChild(back);
      cardContainer.appendChild(card);
      gameBoard.appendChild(cardContainer);

      card.addEventListener('click', handleFlip);
    });
  }

  // دالة تقليب الكارت
  function handleFlip() {
    if (!gameStarted || this.classList.contains('flipped') || flippedCards.length >= 2) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      moves++;
      updateDisplay();

      const [card1, card2] = flippedCards;
      const sym1 = card1.getAttribute("data-symbol");
      const sym2 = card2.getAttribute("data-symbol");

      if (sym1 === sym2) {
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === totalCards / 2) endGame();
      } else {
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          flippedCards = [];
        }, 1000);
      }
    }
  }

  // دالة بدء اللعبة
  function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    resetStats();
    startTimer();

    // عرض الكروت ثم إخفاؤها بعد ثانية
    document.querySelectorAll('.card').forEach(card => card.classList.add('flipped'));
    setTimeout(() => {
      document.querySelectorAll('.card').forEach(card => card.classList.remove('flipped'));
    }, 1000);
  }

  // إعادة تعيين اللعبة
  function resetGame() {
    clearInterval(timer);
    gameStarted = false;
    resetStats();
    createCards();
  }

  // تحديث العرض
  function updateDisplay() {
    movesDisplay.textContent = moves;
    matchesDisplay.textContent = matchedPairs;
  }

  // ضبط الإحصائيات
  function resetStats() {
    matchedPairs = 0;
    moves = 0;
    seconds = 0;
    flippedCards = [];
    updateDisplay();
    timeDisplay.textContent = "00:00";
    winMessage.classList.add('d-none');
  }

  // المؤقت
  function startTimer() {
    timer = setInterval(() => {
      seconds++;
      timeDisplay.textContent = formatTime(seconds);
    }, 1000);
  }

  // تنسيق الوقت
  function formatTime(sec) {
    const mins = String(Math.floor(sec / 60)).padStart(2, '0');
    const secs = String(sec % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  }

  // إنهاء اللعبة
  function endGame() {
    clearInterval(timer);
    gameStarted = false;
    finalMoves.textContent = moves;
    finalTime.textContent = formatTime(seconds);
    winMessage.classList.remove('d-none');
  }

  // خلط مصفوفة
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // بدء أولي
  createCards();
  startButton.addEventListener('click', startGame);
  resetButton.addEventListener('click', resetGame);
});
