let numberOfRows = 6,
  numberOfCols = 7,
  i,
  j,
  turn = 1,
  pieceNr = 0;
let board, hCol;

let gameOver = false;

function GameStart() {
  //   document.getElementsByClassName("layer")[0].style.display = "none";
  //   document.getElementsByClassName("menu")[0].style.display = "none";

  board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  hCol = [5, 5, 5, 5, 5, 5, 5];

  for (i = 0; i < numberOfCols; ++i) {
    let col = document.createElement("div");
    col.classList.add("col");
    for (j = 0; j < numberOfRows; ++j) {
      let circle = document.createElement("div");
      circle.classList.add("circle");
      circle.id = j.toString() + "-" + i.toString();
      circle.addEventListener("click", setPiece);
      col.appendChild(circle);
    }
    document.getElementById("board").appendChild(col);
  }
}

function setPiece() {
  if (gameOver) return;

  let coord = this.id.split("-");
  let r = parseInt(coord[0]);
  let c = parseInt(coord[1]);

  r = hCol[c];
  if (r < 0) return; // coloana este deja plina
  if (turn == 1)
    document.getElementById("playerTurn").innerText = "Player 2's turn!";
  else document.getElementById("playerTurn").innerText = "Player 1's turn!";

  // board[r][c] = turn;
  let tile = document.getElementById(r.toString() + "-" + c.toString());
  if (turn == 1) {
    tile.classList.add("redPiece");
    board[r][c] = 1;
  } else {
    tile.classList.add("yellowPiece");
    board[r][c] = 2;
  }
  turn = 1 - turn;
  hCol[c]--;
  pieceNr++;
  checkWin(r, c);
  if (pieceNr == 42) {
    document.getElementById("playerTurn").innerText = "It's a tie!";
    gameOver = true;
    return;
  }
}

function Inside(row, col) {
  return row >= 0 && row <= 5 && col >= 0 && col <= 6;
}

function checkWin(row, col) {
  let cnt = 1,
    copyRow = row,
    copyCol = col;

  // verticala
  copyRow++;
  while (
    Inside(copyRow, copyCol) &&
    board[copyRow][copyCol] === board[copyRow - 1][copyCol]
  ) {
    cnt++;
    copyRow++;
  }
  copyRow = row - 1;
  while (
    Inside(copyRow, copyCol) &&
    board[copyRow][copyCol] === board[copyRow + 1][copyCol]
  ) {
    cnt++;
    copyRow--;
  }
  if (cnt >= 4) setWinner(board[row][col], 1, row, col);

  // orizontala
  (cnt = 1), (copyRow = row), (copyCol = col);
  copyCol++;
  while (
    Inside(copyRow, copyCol) &&
    board[copyRow][copyCol] === board[copyRow][copyCol - 1]
  ) {
    cnt++;
    copyCol++;
  }
  copyCol = col - 1;
  while (
    Inside(copyRow, copyCol) &&
    board[copyRow][copyCol] === board[copyRow][copyCol + 1]
  ) {
    cnt++;
    copyCol--;
  }
  if (cnt >= 4) setWinner(board[row][col], 2, row, col);

  // diagonala SD
  (cnt = 1), (copyRow = row + 1), (copyCol = col + 1);
  while (
    Inside(copyRow, copyCol) &&
    board[copyRow][copyCol] === board[copyRow - 1][copyCol - 1]
  ) {
    cnt++;
    copyCol++;
    copyRow++;
  }
  (copyRow = row - 1), (copyCol = col - 1);
  while (
    Inside(copyRow, copyCol) &&
    board[copyRow][copyCol] === board[copyRow + 1][copyCol + 1]
  ) {
    cnt++;
    copyCol--;
    copyRow--;
  }
  if (cnt >= 4) setWinner(board[row][col], 3, row, col);

  // diagonala DS
  (cnt = 1), (copyRow = row + 1), (copyCol = col - 1);
  while (
    Inside(copyRow, copyCol) &&
    board[copyRow][copyCol] === board[copyRow - 1][copyCol + 1]
  ) {
    cnt++;
    copyCol--;
    copyRow++;
  }
  (copyRow = row - 1), (copyCol = col + 1);
  while (
    Inside(copyRow, copyCol) &&
    board[copyRow][copyCol] === board[copyRow + 1][copyCol - 1]
  ) {
    cnt++;
    copyCol++;
    copyRow--;
  }
  if (cnt >= 4) setWinner(board[row][col], 4, row, col);
}

function setWinner(player, formatie, lin, col) {
  if (player == 1)
    document.getElementById("playerTurn").innerText = "Player 1 won!";
  else document.getElementById("playerTurn").innerText = "Player 2 won!";

  console.log(board);
  gameOver = true;

  let copyRow, copyCol;
  if (formatie === 1) {
    (copyRow = lin), (copyCol = col);
    document
      .getElementById(lin.toString() + "-" + col.toString())
      .classList.add("shiningPiece");
    copyRow = lin + 1;
    while (
      Inside(copyRow, copyCol) &&
      board[copyRow][copyCol] === board[copyRow - 1][copyCol]
    ) {
      document
        .getElementById(copyRow.toString() + "-" + copyCol.toString())
        .classList.add("shiningPiece");
      copyRow++;
    }
    copyRow = lin - 1;
    while (
      Inside(copyRow, copyCol) &&
      board[copyRow][copyCol] === board[copyRow + 1][copyCol]
    ) {
      document
        .getElementById(copyRow.toString() + "-" + copyCol.toString())
        .classList.add("shiningPiece");
      copyRow--;
    }
    setTimeout(ShowMenu, 3000);
    return;
  }
  if (formatie === 2) {
    (copyRow = lin), (copyCol = col);
    document
      .getElementById(lin.toString() + "-" + col.toString())
      .classList.add("shiningPiece");
    copyCol++;
    while (
      Inside(copyRow, copyCol) &&
      board[copyRow][copyCol] === board[copyRow][copyCol - 1]
    ) {
      document
        .getElementById(copyRow.toString() + "-" + copyCol.toString())
        .classList.add("shiningPiece");
      copyCol++;
    }
    copyCol = col - 1;
    while (
      Inside(copyRow, copyCol) &&
      board[copyRow][copyCol] === board[copyRow][copyCol + 1]
    ) {
      document
        .getElementById(copyRow.toString() + "-" + copyCol.toString())
        .classList.add("shiningPiece");
      copyCol--;
    }
    setTimeout(ShowMenu, 3000);
    return;
  }
  if (formatie === 3) {
    (copyRow = lin + 1), (copyCol = col + 1);
    document
      .getElementById(lin.toString() + "-" + col.toString())
      .classList.add("shiningPiece");
    while (
      Inside(copyRow, copyCol) &&
      board[copyRow][copyCol] === board[copyRow - 1][copyCol - 1]
    ) {
      document
        .getElementById(copyRow.toString() + "-" + copyCol.toString())
        .classList.add("shiningPiece");
      copyCol++;
      copyRow++;
    }
    (copyRow = lin - 1), (copyCol = col - 1);
    while (
      Inside(copyRow, copyCol) &&
      board[copyRow][copyCol] === board[copyRow + 1][copyCol + 1]
    ) {
      document
        .getElementById(copyRow.toString() + "-" + copyCol.toString())
        .classList.add("shiningPiece");
      copyCol--;
      copyRow--;
    }
    setTimeout(ShowMenu, 3000);
    return;
  }
  if (formatie === 4) {
    (copyRow = lin + 1), (copyCol = col - 1);
    document
      .getElementById(lin.toString() + "-" + col.toString())
      .classList.add("shiningPiece");
    while (
      Inside(copyRow, copyCol) &&
      board[copyRow][copyCol] === board[copyRow - 1][copyCol + 1]
    ) {
      document
        .getElementById(copyRow.toString() + "-" + copyCol.toString())
        .classList.add("shiningPiece");
      copyCol--;
      copyRow++;
    }
    (copyRow = lin - 1), (copyCol = col + 1);
    while (
      Inside(copyRow, copyCol) &&
      board[copyRow][copyCol] === board[copyRow + 1][copyCol - 1]
    ) {
      document
        .getElementById(copyRow.toString() + "-" + copyCol.toString())
        .classList.add("shiningPiece");
      copyCol++;
      copyRow--;
    }
    setTimeout(ShowMenu, 3000);
    return;
  }
}

// document.getElementById('restart').addEventListener('click', () => {
//     const mainDiv = document.getElementsByTagName('main')[0];
//     while(mainDiv.firstChild) mainDiv.removeChild(mainDiv.firstChild);

//     gameOver = false;
//     turn = 1;
//     document.getElementById('playerTurn').innerText = "Player 1's turn!";
//     GameStart();
// })

// function ShowMenu() {
//     document.getElementsByClassName('layer')[0].style.display = "block";
//     document.getElementsByClassName('menu')[0].style.display = "flex";
// }

// document.getElementById('back').addEventListener('click', () => {
//     window.print();
// })

GameStart();
