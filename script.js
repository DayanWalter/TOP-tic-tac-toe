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

return{
  board
}
})();

// function for player creation
const Player = (name, token) => {
  const getName = () => name;
  const getToken = () => token;

  return {
    getName,
    getToken,
  }
}
// 2 Players created
let playerOne = Player("Player One", "X");
let playerTwo = Player("Player Two", "O");

// Module for controlling the flow of the game
const GameController = (() => {
  // function for marking the board
  const markBoard = (player, row, column) => {
    Gameboard.board[row][column] = player.getToken();
  }

  return{
    markBoard,
  }
})()