// Module for Gameboard
const Gameboard = (()=>{
  let board = [];
  let rows = 3;
  let columns = 3;

for (let i = 0; i < rows; i++) {
  board[i] = [];
  for (let j = 0; j < columns; j++) {
    board[i].push(Cell());
  }
}
  // method for rendering the board to html
  const renderBoard = () => {
    let table = document.getElementById("boardArray")
    table.innerHTML = "";
    for (let i = 0; i < board.length; i++) {
      let row = document.createElement("tr");

      for (let j = 0; j < board[i].length; j++) {
          let cell = document.createElement("td");
          cell.textContent = board[i][j].getValue();
          row.appendChild(cell);
      }
      table.appendChild(row);
    }
  }
  // method for "dropping" a token
  const dropToken = (row, column, player) => {
    board[row][column].addToken(player)
  }

return{
  board,
  renderBoard,
  dropToken,
}
})();

function Cell()  {
  let value = "i";

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue
  };
};

// Module for controlling the flow of the game
const GameController = ((
  playerOneName = "Player One",
  playerTwoName = "Player Two") => {

  const board = Gameboard.board;

  // Array for players
  const players = [
    {
      name: playerOneName,
      token: "X"
    },
    {
      name: playerTwoName,
      token: "O"
    }
  ];
  // define the active player
  let activePlayer = players[0];

  // method for switching every round the player
  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  // method for getting the active player
  const getActivePlayer = () => activePlayer;

  // method for starting a new round
  const printNewRound = () => {
    Gameboard.renderBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };
  // method for playing a round
  const playRound = (row, column) => {
    console.log(`Dropping ${getActivePlayer().name}'s token into row: ${row} and column: ${column}...`);
    board[row][column].addToken(getActivePlayer().token)
    switchPlayer();
    printNewRound();
  }

  return{
    printNewRound,
    playRound,
  }

})()

// example
Gameboard.renderBoard()
GameController.playRound(0,0)
GameController.playRound(1,0)
GameController.playRound(0,2)






