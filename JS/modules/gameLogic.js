// import { assets, preloadAssets } from "./preload.js"; // Import assets and preloadAssets
// import { saveScore, getSavedScores } from "./storage.js";

export const startGame = (cards, level) => {};

// export class GameLogic {
//   constructor(totalCards, level) {
//     this.totalCards = totalCards;
//     this.level = level;
//     this.cards = [];
//     this.flippedCards = [];
//     this.moves = 0;
//     this.time = 0;
//     this.timerInterval = null;
//     this.isGameStarted = false;
//     this.isGameOver = false;
//     this.cardFlipping = false;
//   }

//   async start() {
//     await preloadAssets(this.level); // Ensure assets are loaded before proceeding
//     await this.generateCards();
//     this.renderCards();
//     this.addEventListeners();
//     this.startLevel();
//     initializeHint(this);
//   }

//   async generateCards() {
//     const cardValues = Array.from(
//       { length: this.totalCards / 2 },
//       (_, i) => i + 1
//     );
//     const cards = [...cardValues, ...cardValues];
//     this.cards = this.shuffleArray(cards);
//   }

//   shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   }

//   renderCards() {
//     const cardGrid = document.querySelector(".card-grid");
//     if (cardGrid) {
//       cardGrid.innerHTML = "";

//       // Check if assets for the current level exist
//       if (!assets[this.level] || !assets[this.level].images) {
//         console.error(
//           `Assets for level "${this.level}" are missing or improperly loaded.`
//         );
//         return;
//       }

//       this.cards.forEach((value, index) => {
//         const card = document.createElement("div");
//         card.classList.add("card"); // Removed 'flipped' class
//         card.dataset.value = value;
//         card.dataset.index = index;

//         // Use dynamic asset paths from assets.json
//         const cardImage = assets[this.level].images.cards[value - 1];
//         const cardBackImage =
//           assets[this.level].images.cardBack ||
//           "assets/global/images/default/card-back.png";

//         card.innerHTML = `
//           <div class="card-front">
//             <img src="${cardImage}" alt="Card ${value}" onerror="this.src='assets/global/images/default/card-placeholder.png'">
//           </div>
//           <div class="card-back" style="background-image: url('${cardBackImage}');"></div>
//         `;
//         cardGrid.appendChild(card);
//       });
//     }
//   }

//   startLevel() {
//     const startRestartButton = document.getElementById("start-restart-btn");
//     const cards = document.querySelectorAll(".card");
//     let gameStarted = false;

//     startRestartButton.addEventListener("click", () => {
//       if (!gameStarted) {
//         gameStarted = true;
//         startRestartButton.textContent = "Restart"; // Change text to "Restart"
//         this.showCountdownAndStart(cards);
//       } else {
//         this.resetGame(startRestartButton); // Reset game and change button back to "Start"
//         gameStarted = false;
//       }
//     });
//   }

//   updateProgressBar(elapsedTime, totalTime) {
//     const progressBar = document.getElementById("progress-bar");
//     if (progressBar) {
//       const progress = (elapsedTime / totalTime) * 100; // Calculate progress percentage
//       progressBar.style.width = `${progress}%`; // Update the progress bar width
//     }
//   }

//   resetGame(button) {
//     // Reset all game variables
//     this.cards = [];
//     this.flippedCards = [];
//     this.moves = 0;
//     this.time = 0;
//     this.isGameStarted = false;
//     this.isGameOver = false;
//     this.cardFlipping = false;

//     // Clear the timer interval if it exists
//     if (this.timerInterval) {
//       clearInterval(this.timerInterval);
//       this.timerInterval = null;
//     }

//     // Reset the timer display
//     const timerElement = document.getElementById("timer");
//     if (timerElement) {
//       timerElement.textContent = this.formatTime(this.time);
//     }

//     // Reset the moves display
//     const movesElement = document.getElementById("moves");
//     if (movesElement) {
//       movesElement.textContent = this.moves;
//     }

//     // Reset the progress bar
//     const progressBar = document.getElementById("progress-bar");
//     if (progressBar) {
//       progressBar.style.width = "0%";
//     }

//     // Restart the game
//     this.start();

//     // Change the button text back to "Start"
//     if (button) {
//       button.textContent = "Start";
//     }
//   }

//   // showCountdownAndStart(cards) {
//   //   // Show cards initially
//   //   cards.forEach(card => card.classList.add('flipped'));

//   //   // Determine the delay before flipping cards back based on the level
//   //   let flipBackDelay;
//   //   switch (this.level) {
//   //     case 'easy':
//   //       flipBackDelay = 3000; // 3 seconds for easy level
//   //       break;
//   //     case 'medium':
//   //       flipBackDelay = 5000; // 5 seconds for medium level
//   //       break;
//   //     case 'hard':
//   //       flipBackDelay = 7000; // 7 seconds for hard level
//   //       break;
//   //     default:
//   //       flipBackDelay = 3000; // Default to 3 seconds
//   //   }

//   //   // Create the countdown overlay
//   //   const countdownOverlay = document.createElement('div');
//   //   countdownOverlay.id = 'countdown-overlay';
//   //   countdownOverlay.innerHTML = '<span>3</span>'; // Initial countdown number
//   //   document.body.appendChild(countdownOverlay);

//   //   let count = 3;
//   //   const countdownInterval = setInterval(() => {
//   //     count--;
//   //     if (count > 0) {
//   //       countdownOverlay.innerHTML = `<span>${count}</span>`; // Update the number
//   //     } else {
//   //       clearInterval(countdownInterval);
//   //       countdownOverlay.remove(); // Remove the overlay

//   //       // Start tracking the progress bar after the countdown ends
//   //       const startTime = Date.now(); // Record the start time
//   //       const progressInterval = setInterval(() => {
//   //         const elapsedTime = Date.now() - startTime; // Calculate elapsed time
//   //         this.updateProgressBar(elapsedTime, flipBackDelay); // Update progress bar

//   //         // Stop the progress bar when the delay is over
//   //         if (elapsedTime >= flipBackDelay) {
//   //           clearInterval(progressInterval);
//   //         }
//   //       }, 100); // Update every 100ms for smooth animation

//   //       // Wait for the level-specific delay before flipping cards back
//   //       setTimeout(() => {
//   //         cards.forEach(card => card.classList.remove('flipped')); // Flip cards back
//   //         this.isGameStarted = true; // Start the game
//   //         this.time = 0;
//   //         this.startTimer(); // Start the main game timer
//   //       }, flipBackDelay); // Use the level-specific delay
//   //     }
//   //   }, 1000); // Update every second
//   // }

//   startTimer() {
//     // Clear any existing timer interval
//     if (this.timerInterval) {
//       clearInterval(this.timerInterval);
//       this.timerInterval = null;
//     }

//     // Start a new timer interval
//     this.timerInterval = setInterval(() => {
//       this.time++;
//       const timerElement = document.getElementById("timer");
//       if (timerElement) {
//         timerElement.textContent = this.formatTime(this.time);
//       }
//     }, 1000);
//   }

//   formatTime(seconds) {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   }

//   addEventListeners() {
//     const cards = document.querySelectorAll(".card");
//     cards.forEach((card) => {
//       card.addEventListener("click", () => this.handleCardClick(card));
//     });
//   }

//   handleCardClick(card) {
//     if (
//       !this.isGameStarted ||
//       this.flippedCards.length === 2 ||
//       card.classList.contains("flipped") ||
//       this.cardFlipping
//     )
//       return;

//     this.flipCard(card);
//   }

//   flipCard(card) {
//     this.cardFlipping = true;
//     card.classList.add("flipped");
//     this.flippedCards.push(card);

//     if (this.flippedCards.length === 2) {
//       this.moves++;
//       const movesElement = document.getElementById("moves");
//       if (movesElement) {
//         movesElement.textContent = this.moves;
//       }
//       this.checkForMatch();
//     } else {
//       this.cardFlipping = false;
//     }
//   }

//   checkForMatch() {
//     const [card1, card2] = this.flippedCards;

//     if (card1.dataset.value === card2.dataset.value) {
//       card1.classList.add("matched");
//       card2.classList.add("matched");
//       this.flippedCards = [];
//       this.cardFlipping = false;

//       const matchSound = document.getElementById("match-sound");
//       if (matchSound) {
//         matchSound
//           .play()
//           .catch((error) =>
//             console.error("Failed to play match sound:", error)
//           );
//       }

//       if (this.isGameWon()) {
//         this.endGame();
//       }
//     } else {
//       // Play mismatch sound
//       const clickSound = document.getElementById("wrong-sound");
//       if (clickSound) {
//         clickSound
//           .play()
//           .catch((error) =>
//             console.error("Failed to play click sound:", error)
//           );
//       }

//       // Add shake animation
//       card1.classList.add("shake");
//       card2.classList.add("shake");

//       setTimeout(() => {
//         // Remove shake animation and flip cards back
//         card1.classList.remove("shake", "flipped");
//         card2.classList.remove("shake", "flipped");
//         this.flippedCards = [];
//         this.cardFlipping = false;
//       }, 1000);
//     }
//   }

//   isGameWon() {
//     const matchedCards = document.querySelectorAll(".card.matched");
//     return matchedCards.length === this.totalCards;
//   }

//   async endGame() {
//     clearInterval(this.timerInterval);
//     this.isGameOver = true;

//     // Save score and check if it's in top 3
//     const isTopScore = await saveScore(this.level, this.moves, this.time);

//     // Show best score popup if it's a top score
//     if (isTopScore) {
//       this.showBestScorePopup();
//     }

//     // Show the game over modal
//     const gameOverModal = document.querySelector(".game-over");
//     if (gameOverModal) {
//       gameOverModal.classList.remove("hidden");
//       gameOverModal.classList.add("visible");
//       document.getElementById("final-time").textContent = this.formatTime(
//         this.time
//       );
//       document.getElementById("final-moves").textContent = this.moves;

//       // Save score button
//       const saveScoreButton = document.getElementById("save-score");
//       if (saveScoreButton) {
//         saveScoreButton.addEventListener("click", () => {
//           window.location.href = "/index.html";
//         });
//       }

//       // Next level button
//       const nextLevelButton = document.getElementById("next-level");
//       if (nextLevelButton) {
//         nextLevelButton.addEventListener("click", () => {
//           let nextLevel;
//           switch (this.level) {
//             case "easy":
//               nextLevel = "medium";
//               break;
//             case "medium":
//               nextLevel = "hard";
//               break;
//             case "hard":
//               nextLevel = "index";
//               break;
//             default:
//               nextLevel = "index";
//           }
//           window.location.href = `/${nextLevel}.html`;
//         });
//       }
//     }

//     const winSound = document.getElementById("win-sound");
//     if (winSound) {
//       winSound
//         .play()
//         .catch((error) => console.error("Failed to play win sound:", error));
//     }
//   }

//   isBestScore(previousScores) {
//     if (!previousScores.length) return true;

//     // Sort by moves first, then by time
//     const sortedScores = [...previousScores].sort((a, b) => {
//       if (a.moves === b.moves) {
//         return a.time - b.time;
//       }
//       return a.moves - b.moves;
//     });

//     // Check if current score is better than the best score
//     return (
//       this.moves < sortedScores[0].moves ||
//       (this.moves === sortedScores[0].moves && this.time < sortedScores[0].time)
//     );
//   }

//   showBestScorePopup() {
//     const bestScorePopup = document.createElement("div");
//     bestScorePopup.className = "best-score-popup";
//     bestScorePopup.innerHTML = `
//       <div class="best-score-content">
//         <h2>🏆 New Best Score! 🏆</h2>
//         <p>Congratulations! You've achieved the best score for ${
//           this.level
//         } level!</p>
//         <p>Moves: ${this.moves}</p>
//         <p>Time: ${this.formatTime(this.time)}</p>
//         <button class="close-best-score">OK</button>
//       </div>
//     `;

//     document.body.appendChild(bestScorePopup);

//     // Add celebration animation
//     this.addConfetti();

//     // Close button functionality
//     const closeButton = bestScorePopup.querySelector(".close-best-score");
//     closeButton.addEventListener("click", () => {
//       bestScorePopup.remove();
//     });
//   }
// }
