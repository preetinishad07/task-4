const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations (indices)
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (boardState[index] !== '' || !gameActive) return;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (boardState.every(cell => cell !== '')) {
    statusDisplay.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningCombos.some(combo => {
    return combo.every(index => boardState[index] === currentPlayer);
  });
}

function restartGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  document.querySelectorAll('.cell').forEach(cell => (cell.textContent = ''));
}

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', restartGame);
