document.addEventListener("DOMContentLoaded", () => {
  const startGameButton = document.getElementById("start-game");
  const namePopup = document.getElementById("name-popup");
  const submitButton = document.getElementById("submit-name");
  const playerNameInput = document.getElementById("player-name");

  if (startGameButton) {
    startGameButton.addEventListener("click", (event) => {
      event.preventDefault();
      namePopup.style.display = "flex";
      playerNameInput.focus();
    });
  }

  if (submitButton) {
    submitButton.addEventListener("keydown", (event) => {
      event.preventDefault();
      if (event.key === "Enter") {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
          localStorage.setItem("playerName", playerName);
          namePopup.style.display = "none";
          window.location.href = "./levels.html";
        } else {
          alert("Please enter your name!");
        }
      }
    });
  }

  if (playerNameInput) {
    // Handle button click
    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      const playerName = playerNameInput.value.trim();
      if (playerName) {
        localStorage.setItem("playerName", playerName);
        namePopup.style.display = "none";
        window.location.href = "./levels.html";
      } else {
        alert("Please enter your name!");
      }
    });

    // Handle Enter key
    playerNameInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        submitButton.click();
      }
    });
  }

  const easyCard = document.getElementById("easy-level");
  const mediumCard = document.getElementById("medium-level");
  const hardCard = document.getElementById("hard-level");
  let selectedLevel = "";

  if (easyCard) {
    easyCard.addEventListener("click", (event) => {
      event.preventDefault();
      selectedLevel = "easy";
      window.location.href = "./easy.html";
    });
  }

  if (mediumCard) {
    mediumCard.addEventListener("click", (event) => {
      event.preventDefault();
      selectedLevel = "medium";
      window.location.href = "./medium.html";
    });
  }

  if (hardCard) {
    hardCard.addEventListener("click", (event) => {
      event.preventDefault();
      selectedLevel = "hard";
      window.location.href = "./hard.html";
    });
  }
});

document.getElementById("show-score").addEventListener("click", function () {
  const scoresPopup = document.getElementById("score-popup");
  const scoresContainer = document.getElementById("scores-container");

  scoresContainer.innerHTML = "";

  const playersData =
    JSON.parse(localStorage.getItem("memoryGameScores")) || [];

  if (playersData.length === 0) {
    scoresContainer.innerHTML = "<p>No scores recorded yet!</p>";
  } else {
    // فرز حسب الوقت (الأسرع أولاً)
    playersData.sort((a, b) => a.time - b.time);

    const table = document.createElement("table");
    table.className = "table table-striped";

    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>Time</th>
        <th>Moves</th>
        <th>Level</th>
      </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    playersData.forEach((player, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${player.player}</td>
        <td>${formatTime(player.time)}</td>
        <td>${player.moves}</td>
        <td>${player.level}</td>
      `;
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    scoresContainer.appendChild(table);
  }

  scoresPopup.style.display = "flex";
});

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

document.getElementById("close-score").addEventListener("click", function () {
  document.getElementById("score-popup").style.display = "none";
});
