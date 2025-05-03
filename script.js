const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitBtn = document.getElementById("submit");
const board = document.getElementById("board");
const message = document.getElementById("message");
const inputArea = document.getElementById("input-area");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "";
let gameOver = false;
let boardState = Array(9).fill("");

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (!player1 || !player2) {
    alert("Please enter both player names");
    return;
  }

  currentPlayer = player1;
  currentSymbol = "X";
  message.textContent = `${currentPlayer}, you're up`;

  inputArea.classList.add("hidden");
  board.classList.remove("hidden");
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.textContent || gameOver) return;

    cell.textContent = currentSymbol;
    boardState[index] = currentSymbol;

    if (checkWinner(currentSymbol)) {
      message.textContent = `${currentPlayer}, congratulations you won!`;
      highlightWinningCells(currentSymbol);
      gameOver = true;
      return;
    }

    // Switch turns
    if (currentSymbol === "X") {
      currentSymbol = "O";
      currentPlayer = player2;
    } else {
      currentSymbol = "X";
      currentPlayer = player1;
    }

    message.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWinner(symbol) {
  return winPatterns.some(pattern => 
    pattern.every(index => boardState[index] === symbol)
  );
}

function highlightWinningCells(symbol) {
  winPatterns.forEach(pattern => {
    if (pattern.every(index => boardState[index] === symbol)) {
      pattern.forEach(index => {
        cells[index].classList.add("winner");
      });
    }
  });
}
