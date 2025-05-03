let player1 = '';
let player2 = '';
let currentPlayer = '';
let symbol = 'X';
let cells;
let isGameOver = false;

function createBoard() {
  const container = document.querySelector('.container');
  container.innerHTML = `
    <h1>Tic Tac Toe</h1>
    <div class="message"></div>
    <div class="board"></div>
  `;

  const board = document.querySelector('.board');
  for (let i = 1; i <= 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('id', i);
    cell.addEventListener('click', handleMove);
    board.appendChild(cell);
  }

  cells = document.querySelectorAll('.cell');
  document.querySelector('.message').innerText = `${currentPlayer}, you're up`;
}

function handleMove(e) {
  if (isGameOver) return;

  const cell = e.target;
  if (cell.innerText !== '') return;

  cell.innerText = symbol;

  if (checkWin(symbol)) {
    document.querySelector('.message').innerText = `${currentPlayer}, congratulations you won!`;
    isGameOver = true;
    highlightWin(symbol);
    return;
  }

  // Switch turn
  if (symbol === 'X') {
    symbol = 'O';
    currentPlayer = player2;
  } else {
    symbol = 'X';
    currentPlayer = player1;
  }

  document.querySelector('.message').innerText = `${currentPlayer}, you're up`;
}

function checkWin(sym) {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],           // diagonals
  ];

  return winCombos.some(combo => {
    return combo.every(i => cells[i].innerText === sym);
  });
}

function highlightWin(sym) {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  winCombos.forEach(combo => {
    if (combo.every(i => cells[i].innerText === sym)) {
      combo.forEach(i => cells[i].classList.add('winner'));
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submit');

  submitBtn.addEventListener('click', () => {
    const p1 = document.getElementById('player-1').value.trim();
    const p2 = document.getElementById('player-2').value.trim();

    if (!p1 || !p2) {
      alert('Please enter names for both players.');
      return;
    }

    player1 = p1;
    player2 = p2;
    currentPlayer = player1;
    symbol = 'X';
    isGameOver = false;

    createBoard();
  });
});