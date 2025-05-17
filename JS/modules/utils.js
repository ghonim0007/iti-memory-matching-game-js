// Utility functions for sound management
export function playSound(sound, volume = 1) {
  try {
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play().catch(error => {
      console.error('Failed to play sound:', error);
    });
  } catch (error) {
    console.error('Error playing sound:', error);
  }
}

export function stopSound(sound) {
  try {
    sound.pause();
    sound.currentTime = 0;
  } catch (error) {
    console.error('Error stopping sound:', error);
  }
}