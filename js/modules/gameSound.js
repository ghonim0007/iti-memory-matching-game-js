import { startBackgroundMusic, playSound } from './sound.js';
const startButton = document.getElementById('start-restart-btn');
const hintButton = document.getElementById('hint-button');
const nextButton = document.getElementById('next-level');
const saveButton = document.getElementById('save-score');
const cards = document.querySelectorAll('.card');
const clickSound = document.getElementById('click-sound');

let musicStarted = false;

// Function to start background music on user interaction
function handleUserInteraction() {
    if (!musicStarted) {
        startBackgroundMusic();
        musicStarted = true;
    }
}

// Event listeners for user interaction
document.addEventListener('click', handleUserInteraction, { once: true });
document.addEventListener('keydown', handleUserInteraction, { once: true });

startButton.addEventListener('click', () => {
    playSound(clickSound);
});

hintButton.addEventListener('click', () => {
    playSound(clickSound);
});

nextButton.addEventListener('click', () => {
    playSound(clickSound);
});

saveButton.addEventListener('click', () => {
    playSound(clickSound);
});

cards.forEach(card => {
    card.addEventListener('click', () => {
        playSound(clickSound);
    });
});