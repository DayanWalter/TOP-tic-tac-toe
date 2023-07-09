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
  // function for rendering the board to html
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
  let value = 0;

  // Accept a player's token to change the value of the cell
  const addToken = (player) => {
    value = player;
  };

  // How we will retrieve the current value of this cell through closure
  const getValue = () => value;

  return {
    addToken,
    getValue
  };
};

// // function for player creation
// const Player = (name, token) => {
//   const getName = () => name;
//   const getToken = () => token;

//   return {
//     getName,
//     getToken,
//   }
// }
// // 2 Players created
// let playerOne = Player("Player One", "X");
// let playerTwo = Player("Player Two", "O");

// Module for controlling the flow of the game
const GameController = ((
  playerOneName = "Player One",
  playerTwoName = "Player Two") => {

    const board = Gameboard.board;

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

    let activePlayer = players[0];

    const switchPlayer = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
      Gameboard.renderBoard();
      console.log(`${getActivePlayer().name}'s turn.`);
    }
  // function for marking the board
  // const markBoard = (player, row, column) => {
  //   Gameboard.board[row][column] = player.getToken();
  // }
  
  // Initialize first round
  // PlayerOne chooses one field
  // after choosing, PlayerTwo's turn
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
Gameboard.renderBoard()
GameController.playRound(0,0)
GameController.playRound(1,0)
GameController.playRound(0,2)






