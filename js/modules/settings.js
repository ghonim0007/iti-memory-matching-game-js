const backgroundMusic = new Audio("./assets/easy/audio/background-music.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;
backgroundMusic.play();
const mute = document.getElementById("mute-button");
const unmute = document.getElementById("unmute-button");
const settingsBtn = document.querySelector(".settings-button");
const settingsModal = document.getElementById("settings-modal");
const closeModal = document.getElementById("close-modal");

if (backgroundMusic.muted == false) {
  unmute.style.display = "none";
}

mute.addEventListener("click", () => {
  backgroundMusic.muted = true;
  unmute.style.display = "block";
  mute.style.display = "none";
});

unmute.addEventListener("click", () => {
  backgroundMusic.muted = false;
  unmute.style.display = "none";
  mute.style.display = "block";
});

settingsBtn.addEventListener("click", () => {
  settingsModal.classList.toggle("show");
});
closeModal.addEventListener("click", () => {
  settingsModal.classList.remove("show");
});
