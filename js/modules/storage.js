// Function to save the score to local storage
export function saveScore(level, moves, time) {
  const score = {
      moves: moves,
      time: time,
      timestamp: Date.now() // Changed to timestamp for easier sorting
  };

  // Get existing scores
  let scores = JSON.parse(localStorage.getItem(`highScores_${level}`)) || [];
  
  // Add new score
  scores.push(score);

  // Sort scores first by moves, then by time
  scores.sort((a, b) => {
      if (a.moves === b.moves) {
          return a.time - b.time;
      }
      return a.moves - b.moves;
  });

  // Keep only top 3 scores
  scores = scores.slice(0, 3);

  // Save to localStorage
  localStorage.setItem(`highScores_${level}`, JSON.stringify(scores));
  
  // Return true if this score made it to top 3
  return scores.some(s => s.moves === score.moves && s.time === score.time);
}

// Function to retrieve the saved scores for a specific level
export function getSavedScores(level) {
  const scores = JSON.parse(localStorage.getItem(`highScores_${level}`)) || [];
  return scores;
}

// Function to clear all scores (optional, for debugging or resetting)
export function clearScores() {
  localStorage.removeItem('highScores_easy');
  localStorage.removeItem('highScores_medium');
  localStorage.removeItem('highScores_hard');
}
