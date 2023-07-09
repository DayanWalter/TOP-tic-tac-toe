// Module for Gameboard
const Gameboard = (()=>{
  let board = [];
  let rows = 3;
  let columns = 3;

for (let i = 0; i < rows; i++) {
  board[i] = [];
  for (let j = 0; j < columns; j++) {
    board[i].push(0);
  }
}
  const renderBoard = () => {
    let table = document.getElementById("boardArray")
    table.innerHTML = "";
    for (let i = 0; i < board.length; i++) {
      let row = document.createElement("tr");

      for (let j = 0; j < board[i].length; j++) {
          let cell = document.createElement("td");
          cell.textContent = board[i][j];
          row.appendChild(cell);
      }
      table.appendChild(row);
    }
  }

return{
  board,
  renderBoard,
}
})();

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
    const board = Gameboard;
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
      activePlayer = activePlayer === players[0] ? players[1] : players[0]
    };

    const getActivePlayer = () => activePlayer;

  // function for marking the board
  const markBoard = (player, row, column) => {
    Gameboard.board[row][column] = player.getToken();
  }
  // function for rendering the board to html
  
  // Initialize first round
  // PlayerOne chooses one field
  // after choosing, PlayerTwo's turn
  const playRound = () => {
    console.log("");
  }
  const playerChoose = () => {

  }

  return{
    markBoard,
  }

})()
Gameboard.renderBoard()
// GameController.markBoard(playerOne,0,0)
// GameController.renderBoard()

