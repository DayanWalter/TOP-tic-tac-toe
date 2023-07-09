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
})()

const Player = (name, token){
  const getName = () => name;
  const getToken = () => token;

  return {
    getName,
    getToken,
  }
}
let playerOne = Player("Player One", "X");
let playerTwo = Player("Player Two", "O");
