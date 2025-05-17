# Memory Adventure - Comprehensive Documentation 📚

---

## **1. Project Overview 🎮**

**Memory Adventure** is a memory card-matching game designed to test and improve your memory skills. The game features three difficulty levels:
- **Easy**: 4x4 grid (16 cards)
- **Medium**: 6x6 grid (36 cards)
- **Hard**: 8x8 grid (64 cards)

The game includes interactive gameplay, a hint system, high-score tracking, and immersive sound effects and music. It is fully responsive and works on all devices.

---

## **2. Directory Structure 📂**

The project is organized as follows:

```
memory-adventure/
│
├── assets/                  # Contains all game assets (images, audio, icons)
│   ├── easy/                # Assets for the Easy level
│   │   ├── audio/           # Audio files for Easy level
│   │   └── images/          # Image files for Easy level
│   ├── medium/              # Assets for the Medium level
│   │   ├── audio/           # Audio files for Medium level
│   │   └── images/          # Image files for Medium level
│   ├── hard/                # Assets for the Hard level
│   │   ├── audio/           # Audio files for Hard level
│   │   └── images/          # Image files for Hard level
│   └── global/              # Shared assets across all levels
│       ├── audio/           # Global audio files
│       ├── icons/           # Icons for buttons and UI
│       └── images/          # Global images (backgrounds, placeholders)
│
├── css/                     # CSS files for styling
│   ├── easy.css             # Styles for the Easy level
│   ├── medium.css           # Styles for the Medium level
│   ├── hard.css             # Styles for the Hard level
│   ├── main.css             # Shared styles across all levels
│   └── popup.css            # Styles for popup modals
│
├── js/                      # JavaScript files for game logic
│   ├── modules/             # Modular JavaScript files
│   │   ├── gameLogic.js     # Core game logic
│   │   ├── gameSound.js     # Sound management
│   │   ├── hint.js          # Hint functionality
│   │   ├── preload.js       # Asset preloading
│   │   ├── settings.js      # Game settings (sound, volume)
│   │   ├── storage.js       # High-score storage
│   │   └── utils.js         # Utility functions
│   └── start.js             # Main JavaScript file
│
├── index.html               # Main page (home screen)
├── easy.html                # Easy level page
├── medium.html              # Medium level page
├── hard.html                # Hard level page
├── assets.json              # Asset manifest (paths to images and audio)
└── README.md                # Project documentation
```

---

## **3. Technologies Used 💻**

- **HTML5**: Used for structuring the game pages and elements.
- **CSS3**: Used for styling, animations, and responsive design.
- **JavaScript**: Used for game logic, interactivity, and dynamic content updates.
- **Web Audio API**: Used for playing sound effects and background music.
- **LocalStorage**: Used for saving and retrieving high scores.
- **Responsive Design**: Ensures the game works on all screen sizes (desktop, tablet, mobile).

---

## **4. Game Logic and Flow 🧠**

### **Game Flow**
1. **Start Screen**: Players choose a difficulty level (Easy, Medium, Hard).
2. **Gameplay**:
   - Players flip two cards at a time to find matching pairs.
   - The game tracks the number of moves and time taken.
   - Players can use hints to reveal unmatched cards temporarily.
3. **Game Over**:
   - When all pairs are matched, the game ends.
   - Players can save their score and view high scores.

### **Core Logic**
- **Card Matching**: Cards are shuffled and displayed in a grid. Players flip cards to find matching pairs.
- **Hint System**: Players can use hints to reveal unmatched cards for a limited time.
- **Timer**: A timer tracks the time taken to complete the level.
- **High Scores**: Scores are saved in `localStorage` and displayed in a high-score table.

---

## **5. JavaScript Concepts and Methods 🛠️**

### **Key JavaScript Concepts**
1. **Object-Oriented Programming (OOP)**:
   - The game logic is encapsulated in the `GameLogic` class.
   - Methods like `start()`, `generateCards()`, and `checkForMatch()` handle game functionality.

2. **Event Handling**:
   - Event listeners are used for card clicks, button clicks, and user interactions.
   - Example: `card.addEventListener('click', () => this.handleCardClick(card));`

3. **DOM Manipulation**:
   - The game dynamically updates the DOM to reflect card flips, moves, and timer.
   - Example: `document.getElementById('moves').textContent = this.moves;`

4. **LocalStorage**:
   - High scores are saved and retrieved using `localStorage`.
   - Example: `localStorage.setItem('highScores_easy', JSON.stringify(scores));`

5. **Asynchronous Programming**:
   - Assets are preloaded asynchronously using `fetch` and `Promise`.
   - Example: `await preloadAssets(selectedDifficulty);`

6. **Animations**:
   - CSS animations are triggered using JavaScript for card flips, shuffling, and hints.
   - Example: `card.classList.add('flipped');`

### **Key Methods**
- **`GameLogic.start()`**: Initializes the game, generates cards, and starts the timer.
- **`GameLogic.generateCards()`**: Creates a shuffled array of card values.
- **`GameLogic.checkForMatch()`**: Checks if two flipped cards match.
- **`GameLogic.endGame()`**: Handles game-over logic, saves scores, and displays results.
- **`initializeHint()`**: Manages the hint system and updates the hint counter.
- **`preloadAssets()`**: Preloads all assets (images, audio) before starting the game.

---

## **6. HTML Structure 🏗️**

### **Main Page (`index.html`)**
- Contains the start screen with difficulty selection and high-score viewing.
- Uses popup modals for "How to Play" and "High Scores".

### **Level Pages (`easy.html`, `medium.html`, `hard.html`)**
- Each page has a grid of cards, a timer, a moves counter, and a hint button.
- The grid size varies based on the difficulty level.

### **Popup Modals**
- Used for displaying instructions, high scores, and game-over messages.

---

## **7. CSS Styling and Animations 🎨**

### **Key CSS Features**
1. **Responsive Design**:
   - Media queries ensure the game works on all screen sizes.
   - Example:
     ```css
     @media (max-width: 768px) {
       .card-grid {
         grid-template-columns: repeat(4, 100px);
       }
     }
     ```

2. **Animations**:
   - Card flips, shuffling, and hint animations are implemented using CSS keyframes.
   - Example:
     ```css
     @keyframes flip {
       0% { transform: rotateY(0deg); }
       100% { transform: rotateY(180deg); }
     }
     ```

3. **Retro Styling**:
   - The game uses pixelated fonts and retro-inspired buttons.
   - Example:
     ```css
     .eightbit-btn {
       font-family: 'Press Start 2P', cursive;
       background: #fda032;
       box-shadow: inset -4px -4px 0px 0px #632607;
     }
     ```

4. **Progress Bar**:
   - A progress bar shows the time remaining for hints.
   - Example:
     ```css
     .progress-bar {
       width: 0%;
       height: 100%;
       background: linear-gradient(90deg, #ffc400, #ff3c00);
     }
     ```

---

## **8. Asset Management 📦**

### **Asset Preloading**
- Assets (images, audio) are preloaded before the game starts to ensure smooth gameplay.
- The `preload.js` module handles asset preloading using `fetch` and `Promise`.

### **Asset Manifest (`assets.json`)**
- Contains paths to all assets (images, audio) for each level.
- Example:
  ```json
  {
    "easy": {
      "audio": {
        "backgroundMusic": "assets/easy/audio/background-music.mp3"
      },
      "images": {
        "cards": [
          "assets/easy/images/card1.png",
          "assets/easy/images/card2.png"
        ]
      }
    }
  }
  ```

---

## **9. Sound and Music 🎵**

### **Sound Effects**
- Click sounds, match sounds, and wrong sounds are played during gameplay.
- The `gameSound.js` module manages sound playback.

### **Background Music**
- Background music plays during gameplay and can be toggled on/off in the settings.

---

## **10. High Score System 🏆**

### **Saving Scores**
- Scores are saved in `localStorage` and include the number of moves and time taken.
- Example:
  ```javascript
  localStorage.setItem('highScores_easy', JSON.stringify(scores));
  ```

### **Retrieving Scores**
- High scores are retrieved and displayed in a table on the high-scores popup.

---

## **11. Responsive Design 📱**

### **Media Queries**
- The game uses media queries to adjust the layout for different screen sizes.
- Example:
  ```css
  @media (max-width: 480px) {
    .card-grid {
      grid-template-columns: repeat(4, 90px);
    }
  }
  ```

---

## **12. Future Improvements 🚀**

1. **Multiplayer Mode**: Add a multiplayer mode where players can compete in real-time.
2. **Themes**: Allow players to choose different themes (e.g., space, animals, sports).
3. **Leaderboard**: Implement an online leaderboard to track global high scores.
4. **More Levels**: Add additional levels with unique challenges.

---

## **13. Demo Video 🎥**

Watch the demo video to see the game in action:

[![Memory Adventure Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

*(Replace `YOUR_VIDEO_ID` with the actual YouTube video ID of your demo.)*

---

## **14. Detailed Explanation of All Concepts and Terms**

### **A. JavaScript Concepts**
1. **Classes**: Blueprints for creating objects with shared properties and methods.
2. **Promises**: Objects representing the eventual completion of asynchronous operations.
3. **Async/Await**: Syntactic sugar for working with Promises.
4. **Event Listeners**: Functions that respond to user interactions.
5. **Local Storage**: Browser API for storing data locally.
6. **DOM Manipulation**: Using JavaScript to interact with and modify the HTML document.
7. **Array Methods**: Built-in functions for working with arrays (e.g., `map`, `forEach`, `sort`).

### **B. Game-Specific Concepts**
1. **Card Matching**: Core gameplay mechanic where players flip cards to find matching pairs.
2. **Timer**: Tracks the time taken to complete the level.
3. **Moves Counter**: Tracks the number of card flips made by the player.
4. **Hint System**: Helps players by temporarily revealing unmatched cards.
5. **High Scores**: Records the best performances for each level.

### **C. Technical Terms**
1. **Fisher-Yates Shuffle**: Algorithm for randomly shuffling an array.
2. **Modularization**: Breaking code into smaller, reusable modules.
3. **Asynchronous Programming**: Writing code that doesn’t block the main thread.
4. **Event Loop**: Mechanism in JavaScript that handles asynchronous operations.
5. **Callback Functions**: Functions passed as arguments to other functions.

### **D. HTML and CSS Concepts**
1. **Semantic HTML**: Using HTML elements that convey meaning.
2. **CSS Grid**: Layout system for creating responsive, grid-based designs.
3. **CSS Animations**: Using CSS to create animations.
4. **Responsive Design**: Designing websites to work well on different screen sizes.

### **E. Debugging and Testing Concepts**
1. **Console Logging**: Using `console.log()` to print messages for debugging.
2. **Error Handling**: Using `try/catch` blocks to handle errors gracefully.
3. **Browser Developer Tools**: Built-in tools for debugging and inspecting web pages.

---

## **15. Why These Concepts Are Used**

### **A. Modularity**
- Breaking the code into modules (e.g., `gameLogic.js`, `storage.js`) makes it easier to maintain, debug, and extend.

### **B. Asynchronous Programming**
- Ensures the game remains responsive while loading assets or performing other tasks.

### **C. User Interaction**
- Event listeners and DOM manipulation allow players to interact with the game and receive feedback.

### **D. Persistence**
- Local storage allows high scores to persist across sessions, encouraging replayability.

### **E. Visual Feedback**
- CSS animations and dynamic updates (e.g., timer, moves counter) make the game more engaging.

---

## **16. Summary of Key Concepts**

| **Concept**               | **Purpose**                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| **Classes**               | Encapsulate game logic and state.                                           |
| **Promises/Async-Await**  | Handle asynchronous operations like asset loading.                          |
| **Event Listeners**       | Respond to user interactions (e.g., card clicks, button presses).           |
| **Local Storage**         | Save and retrieve high scores.                                              |
| **DOM Manipulation**      | Dynamically update the game interface (e.g., render cards, update timer).   |
| **Fisher-Yates Shuffle**  | Randomize card positions for each game.                                     |
| **CSS Grid/Animations**   | Create responsive layouts and visual effects.                               |
| **Console Logging**       | Debug and track code execution.                                             |
| **Error Handling**        | Prevent crashes and handle issues gracefully.                               |

