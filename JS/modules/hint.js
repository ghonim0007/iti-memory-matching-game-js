export function initializeHint(gameLogic) {
    const hintButton = document.getElementById('hint-button');
    const hintsRemaining = document.getElementById('hints-remaining');

    if (hintButton && hintsRemaining) {
        // Disable the hint button initially
        hintButton.disabled = true;

        // Set the initial number of hints based on the level
        let hintCounter = getHintCount(gameLogic.level);
        hintsRemaining.textContent = `${hintCounter}`;

        // Enable the hint button when the game starts
        const startRestartButton = document.getElementById('start-restart-btn');
        if (startRestartButton) {
            startRestartButton.addEventListener('click', () => {
                hintButton.disabled = false;
            });
        }

        hintButton.addEventListener('click', () => {
            if (!gameLogic.isGameStarted) {
                return; 
            }

            if (hintCounter > 0) {
                provideHint(gameLogic, () => {
                    hintCounter--;
                    hintsRemaining.textContent = `${hintCounter}`;

                    // Disable the hint button if no hints are left
                    if (hintCounter === 0) {
                        hintButton.disabled = true;
                    }
                });
            } else {
                hintButton.disabled = true;
            }
        });
    }
}

function provideHint(gameLogic, onHintProvided) {
    const cards = document.querySelectorAll('.card');
    if (!cards || cards.length === 0) return; // Ensure the game has started and there are cards to provide a hint for

    // Find all unflipped and unmatched cards
    const unflippedCards = [...cards].filter(card => 
        !card.classList.contains('flipped') && !card.classList.contains('matched')
    );
    if (unflippedCards.length < 2) return;

    // Shuffle the unflipped cards & reposition the unmatched cards in the grid
    const shuffledCards = shuffleArray(unflippedCards);
    repositionCards(shuffledCards, [...cards]);
    shuffledCards.forEach(card => card.classList.add('shuffling'));

    // Wait for the shuffle animation to complete before showing the unmatched cards
    setTimeout(() => {
        shuffledCards.forEach(card => card.classList.remove('shuffling'));
        showUnmatched(shuffledCards, gameLogic.level);
    }, 500); // Adjust the delay to match the duration of the shuffle animation

    // Call the callback to handle hint counter updates
    if (onHintProvided) onHintProvided(); 
}

// Shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function repositionCards(unflippedCards, allCards) {
    const cardGrid = document.querySelector('.card-grid'); // Get the card grid element
    if (cardGrid) {
        // Create a copy of allCards to avoid mutating the original array
        const updatedCards = [...allCards];

        // Replace unflipped and unmatched cards with shuffled cards
        let shuffledIndex = 0;
        for (let i = 0; i < updatedCards.length; i++) {
            const card = updatedCards[i];
            if (!card.classList.contains('flipped') && !card.classList.contains('matched')) {
                // Replace this card with the next shuffled card
                updatedCards[i] = unflippedCards[shuffledIndex];
                shuffledIndex++;
            }
        }

        // Clear the grid and append cards in the updated order
        cardGrid.innerHTML = '';
        updatedCards.forEach(card => cardGrid.appendChild(card));
    }
}

// Define the number of hints allowed for each level
function getHintCount(level) {
    switch (level) {
        case 'easy': return 2;  
        case 'medium': return 3; 
        case 'hard': return 5;   
    }
}

function timeShown(level){
    let hintTime;
    switch (level) {
        case 'easy': hintTime = 3000; break;
        case 'medium': hintTime = 7000; break;
        case 'hard': hintTime = 9000; break;
    }
    return hintTime;
}

// Temporarily show unmatched cards
function showUnmatched(cards, level) {
    // Get hint button position
    const hintButton = document.getElementById('hint-button');
    const hintButtonRect = hintButton.getBoundingClientRect();

    // Create and add timer
    const timerContainer = document.createElement('div');
    timerContainer.className = 'hint-timer-container';
    timerContainer.innerHTML = `
        <div class="hint-timer">
            <svg class="timer-svg">
                <circle class="timer-circle-bg" cx="20" cy="20" r="18"></circle>
                <circle class="timer-circle" cx="20" cy="20" r="18"></circle>
            </svg>
            <div class="timer-number"></div>
        </div>
    `;

    // Position timer next to hint button
    timerContainer.style.top = `${hintButtonRect.top}px`;
    timerContainer.style.left = `${hintButtonRect.right + 10}px`;
    timerContainer.style.transform = 'none'; // Remove default transform

    document.body.appendChild(timerContainer);

    // Rest of the function remains the same...
    cards.forEach(card => card.classList.add('flipped'));

    const hintTime = timeShown(level) / 1000;
    const timerCircle = timerContainer.querySelector('.timer-circle');
    const timerNumber = timerContainer.querySelector('.timer-number');
    
    timerCircle.style.animation = `timer-countdown ${hintTime}s linear forwards`;
    
    let timeLeft = hintTime;
    const updateTimer = setInterval(() => {
        timeLeft -= 1;
        if (timeLeft >= 0) {
            timerNumber.textContent = timeLeft;
        }
    }, 1000);

    setTimeout(() => {
        cards.forEach(card => card.classList.remove('flipped'));
        timerContainer.remove();
        clearInterval(updateTimer);
    }, hintTime * 1000);
}