const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedCellIndex] !== '' || checkWinner()) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} has won!`;
  } else if (gameState.includes('')) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `It's ${currentPlayer}'s turn`;
  } else {
    statusText.textContent = "It's a draw!";
  }
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  return roundWon;
}

function restartGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  cells.forEach(cell => cell.textContent = '');
  statusText.textContent = `It's ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

statusText.textContent = `It's ${currentPlayer}'s turn`;
