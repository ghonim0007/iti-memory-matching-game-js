// Game emojis and utilities
export const EMOJIS = ['🍎', '🍌', '🍒', '🍓', '🍊', '🍋', '🍐', '🍉'];

// Shuffle cards using Fisher-Yates algorithm
export function shuffleCards(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Format time from seconds to MM:SS
export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

// Calculate score based on moves and time
export function calculateScore(moves, time) {
    const timeBonus = Math.max(0, 300 - time); // Max 5 minutes
    const movesBonus = Math.max(0, 100 - moves);
    return Math.min(100, Math.floor((timeBonus + movesBonus) / 4));
}
=======
export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
