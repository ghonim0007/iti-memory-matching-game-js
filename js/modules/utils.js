// Utility functions for sound management
export function playSound(sound, volume = 1) {
  try {
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play().catch((error) => {
      console.error("Failed to play sound:", error);
    });
  } catch (error) {
    console.error("Error playing sound:", error);
  }
}

export function stopSound(sound) {
  try {
    sound.pause();
    sound.currentTime = 0;
  } catch (error) {
    console.error("Error stopping sound:", error);
  }
}

export const Images = [
  "assets/global/images/Bones.png",
  "assets/global/images/Bat.png",
  "assets/global/images/Eye.png",
  "assets/global/images/Cauldron.png",
  "assets/global/images/Cobweb.png",
  "assets/global/images/Dracula.png",
  "assets/global/images/Ghost.png",
  "assets/global/images/Pumpkin.png",
];

export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
