const cell = [...document.getElementsByTagName('li')];
const body = document.getElementsByTagName('body')[0];
body.style.background = 'black';
body.style.color = 'white';
const board = document.querySelector('.board');
const startBtn = document.querySelector('.start-btn');

const reStart = document.createElement('button');
reStart.innerHTML = 'Restart Game';
reStart.classList.add('hide');

reStart.addEventListener('click', () => location.reload());

const player01 = document.getElementById('player1');
let p1Name;

player01.addEventListener('keyup', (e) => {
  p1Name = e.target.value;
});

const player02 = document.getElementById('player2');
let p2Name;

player02.addEventListener('keyup', (e) => {
  p2Name = e.target.value;
});

let player1;

let player2;

const warning = document.querySelector('.warning');

const startGame = (e) => {
  e.preventDefault();
  if (p1Name && p2Name) {
    warning.innerHTML = '';
    player1 = Player(p1Name, 'X');
    player2 = Player(p2Name, 'O');
    board.classList.toggle('hide');
    startBtn.classList.toggle('hide');
    switchTurn();
  }
  warning.innerHTML = 'Please enter players';
};

startBtn.addEventListener('click', (e) => startGame(e));

const Player = (name, mark) => {
  return { name, mark };
};

let turn;

const switchTurn = () => {
  if (turn == player1) {
    turn = player2;
  } else {
    turn = player1;
  }
};

const game = () => {
  let gameBoard = [];
  let placements = [];
  const winCells = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  let p1 = [];
  let p2 = [];
  const updateGameBoard = (cell) => {
    gameBoard.push(cell.cell);
    placements.push(cell);
    if (cell.player === player1.name) {
      p1.push(parseInt(cell.cell));
      p1 = p1.sort();
    } else {
      p2.push(parseInt(cell.cell));
      p2.sort();
    }

    winCells.forEach((wins) => {
      let p1Cell = [];
      let p2Cell = [];
      for (let i = 0; i < p1.length; i++) {
        if (wins.includes(p1[i])) {
          p1Cell.push(p1[i]);
        }
      }
      for (let j = 0; j < p2.length; j++) {
        if (wins.includes(p2[j])) {
          p2Cell.push(p2[j]);
        }
      }
      if (p1Cell.length == 3) {
        body.innerHTML = 'Winner is ' + player1.name;
        reStart.classList.toggle('hide');
        body.appendChild(reStart);
      } else if (p2Cell.length == 3) {
        body.innerHTML = 'Winner is ' + player2.name;
        reStart.classList.toggle('hide');
        body.appendChild(reStart);
      } else if (gameBoard.length == 9) {
        body.innerHTML = 'Its a Draw';
        reStart.classList.toggle('hide');
        body.appendChild(reStart);
      }
    });
  };

  return { updateGameBoard, gameBoard };
};

const newGame = game();

const placeMark = (turn, cellId) => {
  if (newGame.gameBoard.indexOf(cellId) == -1) {
    cell[cellId - 1].innerHTML = turn.mark;
    newGame.updateGameBoard({ player: turn.name, cell: cellId });
    switchTurn();
  }
};

cell.forEach((element) => {
  element.addEventListener('click', () => placeMark(turn, element.id));
});
