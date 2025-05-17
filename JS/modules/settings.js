import { playSound } from './sound.js';

// DOM Elements
const settingsPopup = document.getElementById('settings-popup');
const musicToggle = document.getElementById('music-toggle');
const soundIcon = document.getElementById('sound-icon');
const backgroundMusic = document.getElementById('background-music');
const volumeSlider = document.getElementById('volume-slider');
const clickSound = document.getElementById('click-sound');
let musicStarted = false;

// Function to update the volume icon based on the current volume level
function updateVolumeIcon() {
  const volume = backgroundMusic.volume;

  if (volume === 0 || backgroundMusic.paused) {
    soundIcon.src = 'assets/global/icons/sound-off.png'; // Use the sound-off icon
  } else {
    soundIcon.src = 'assets/global/icons/sound-on.png'; // Use the sound-on icon
  }
}

// Function to handle user interaction and start music
function handleUserInteraction() {
  if (!musicStarted) {
    backgroundMusic.volume = volumeSlider.value;
    backgroundMusic.play().catch(error => {
      console.error('Failed to start music:', error);
    });
    musicStarted = true;
    updateVolumeIcon();
  }
}

// Listen for user interaction (click or keypress) to start music
document.addEventListener('click', handleUserInteraction, { once: true });
document.addEventListener('keydown', handleUserInteraction, { once: true });

// Toggle background music (play/pause)
musicToggle.addEventListener('click', () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
  playSound(clickSound);
  updateVolumeIcon(); // Update the icon after toggling
});

// Adjust volume using slider
volumeSlider.addEventListener('input', () => {
  backgroundMusic.volume = volumeSlider.value;
  updateVolumeIcon();
  playSound(clickSound);
});

// Update icon on page load
window.addEventListener('load', () => {
  backgroundMusic.volume = volumeSlider.value; // Set initial volume
  updateVolumeIcon(); // Update the icon to reflect the current state
});

// Open Settings Pop-Up
function openSettingsPopup() {
  settingsPopup.classList.add("visible");
  updateVolumeIcon(); // Ensure the icon reflects the current state
  playSound(clickSound);
}

// Close Settings Pop-Up
function closeSettingsPopup() {
  settingsPopup.classList.remove("visible");
  playSound(clickSound);
}

// Attach to window object to make it globally accessible
window.closeSettingsPopup = closeSettingsPopup;

// Add event listeners to all settings buttons
document.querySelectorAll('.settings-button').forEach(button => {
  button.addEventListener('click', openSettingsPopup);
});