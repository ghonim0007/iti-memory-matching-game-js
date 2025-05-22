document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.getElementById("start-game");
    const namePopup = document.getElementById("name-popup");
    const submitButton = document.getElementById("submit-name");
    const playerNameInput = document.getElementById("player-name");

    if (startGameButton) {
        startGameButton.addEventListener('click', (event) => {
            event.preventDefault();
            namePopup.style.display = 'flex';
            playerNameInput.focus();
        });
    }

    if (submitButton) {
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            const playerName = playerNameInput.value.trim();
            if (playerName) {

                localStorage.setItem('playerName', playerName);
                namePopup.style.display = 'none';
                window.location.href = './levels.html';
            } else {
                alert('Please enter your name!');
            }
        });
    }

    const easyCard = document.getElementById("easy-level");
    const mediumCard = document.getElementById("medium-level");
    const hardCard = document.getElementById("hard-level");
    let selectedLevel = '';

    if (easyCard) {
        easyCard.addEventListener('click', (event) => {
            event.preventDefault();
            selectedLevel = 'easy';
            window.location.href = './easy.html'; 
        });
    }

    if (mediumCard) {
        mediumCard.addEventListener('click', (event) => {
            event.preventDefault();
            selectedLevel = 'medium';
            window.location.href = './medium.html';
        });
    }

    if (hardCard) {
        hardCard.addEventListener('click', (event) => {
            event.preventDefault();
            selectedLevel = 'hard';
            window.location.href = './hard.html';
        });
    }
});