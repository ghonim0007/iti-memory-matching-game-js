const settingsButton = document.getElementById('settings-button');
const musicToggle = document.getElementById('music-toggle');
const soundIcon = document.getElementById('sound-icon');
const backgroundMusic = document.getElementById('background-music');
const clickSound = document.getElementById('click-sound');
let musicStarted = false;

// Start background music on user interaction
export function startBackgroundMusic() {
    if (!musicStarted) {
        backgroundMusic.volume = 0.5;
        backgroundMusic.play().catch(error => {
            console.error('Failed to start music:', error);
        });
        musicStarted = true;
    }
}

// Event listeners for user interaction
document.addEventListener('click', startBackgroundMusic, { once: true });
document.addEventListener('keydown', startBackgroundMusic, { once: true });

// Click sound added to each of the elements
settingsButton.addEventListener('click', () => {
    playSound(clickSound);
});

// Play a click sound
export function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}