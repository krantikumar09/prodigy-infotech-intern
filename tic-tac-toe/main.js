const gameContainer = document.getElementById("game");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset");
const friendModeButton = document.getElementById("friendModeBtn");
const computerModeButton = document.getElementById("computerModeBtn");
const allBoxes = document.querySelectorAll(".box");
const selectPlayer = document.getElementById("selectPlayer");
const gameBox = document.getElementById("gameBox");
const resultBox = document.getElementById("resultBox");
const wonText = document.getElementById("wonText");

let currentPlayer = "X";
let gameActive = false; // Game is inactive until a mode is selected
let mode = ""; // Mode is initially empty (no mode selected)

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to start/reset the game
const startGame = () => {
  if (resultBox.classList.contains("show")) {
    resultBox.classList.remove("show");
    selectPlayer.classList.add("show");
  }
  gameActive = true;
  currentPlayer = "X";
  statusDisplay.textContent = `Player X's turn`;
  allBoxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("X", "O");
    box.addEventListener("click", handleCellClick, { once: true });
  });
};

// Handle cell click
function handleCellClick(event) {
  const box = event.target;

  if (!gameActive || box.textContent !== "") return;

  box.textContent = currentPlayer;
  box.classList.add(currentPlayer);

  if (checkWinner()) {
    gameBox.classList.remove("show");
    resultBox.classList.add("show");

    wonText.textContent = `Player '${currentPlayer}' wins!`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    statusDisplay.textContent = `It's a draw!`;
    gameActive = false;
    return;
  }

  // Switch players
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

  if (mode === "computer" && currentPlayer === "O") {
    setTimeout(computerMove, 500); // Small delay to simulate thinking time
  }
}

// Check for a winner
function checkWinner() {
  return winningConditions.some((condition) => {
    return condition.every((index) => {
      return allBoxes[index].textContent === currentPlayer;
    });
  });
}

// Check for a draw
function isDraw() {
  return [...allBoxes].every((box) => {
    return box.textContent !== "";
  });
}

// Computer makes a move (random)
function computerMove() {
  let availableBoxes = [...allBoxes].filter((box) => box.textContent === "");
  if (availableBoxes.length > 0) {
    let randomBox =
      availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
    randomBox.textContent = "O";
    randomBox.classList.add("O");

    if (checkWinner()) {
      statusDisplay.textContent = `Player O wins!`;
      gameActive = false;
    } else if (isDraw()) {
      statusDisplay.textContent = `It's a draw!`;
      gameActive = false;
    } else {
      currentPlayer = "X";
      statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

// Reset the game
resetButton.addEventListener("click", startGame);

// Mode selection buttons
friendModeButton.addEventListener("click", () => {
  mode = "friend";
  statusDisplay.textContent = "Player X's turn";
  selectPlayer.classList.remove("show");
  gameBox.classList.add("show");
  startGame(); // Start the game when mode is selected
});

computerModeButton.addEventListener("click", () => {
  mode = "computer";
  statusDisplay.textContent = "Player X's turn";
  selectPlayer.classList.remove("show");
  gameBox.classList.add("show");
  startGame(); // Start the game when mode is selected
});

// Initialize the game status message without starting the game
statusDisplay.textContent = "Select a mode to start the game!";
