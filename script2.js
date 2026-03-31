let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let vsComputer = false;

const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

// Handle cell click
cells.forEach(cell => {
  cell.addEventListener("click", () => handleCellClick(cell));
});

function handleCellClick(cell) {
  const index = cell.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusDisplay.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusDisplay.textContent = "🤝 It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

  if (vsComputer && currentPlayer === "O" && gameActive) {
    setTimeout(computerMove, 500);
  }
}

// Check Winner
function checkWin() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      document.querySelector(`[data-index='${a}']`).classList.add("winner");
      document.querySelector(`[data-index='${b}']`).classList.add("winner");
      document.querySelector(`[data-index='${c}']`).classList.add("winner");
      return true;
    }
  }
  return false;
}

// Restart Game
function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  vsComputer = false;
  statusDisplay.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
}

// Play vs Computer
function playComputer() {
  restartGame();
  vsComputer = true;
}

// Simple AI Move
function computerMove() {
  let available = board.map((val, i) => val === "" ? i : null).filter(v => v !== null);
  let randomIndex = available[Math.floor(Math.random() * available.length)];

  board[randomIndex] = "O";
  document.querySelector(`[data-index='${randomIndex}']`).textContent = "O";

  if (checkWin()) {
    statusDisplay.textContent = `🤖 Computer Wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusDisplay.textContent = "🤝 It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = "X";
  statusDisplay.textContent = "Player X's turn";
}
