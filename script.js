// function for cell creation
function Cell()  {
  let value = ""

  const addToken = (player) => {
    value = player
  }

  const getValue = () => value

  return {
    addToken,
    getValue
  }
}

// Module for Gameboard
const Gameboard = (()=>{
  let board = []
  let rows = 3
  let columns = 3

for (let i = 0; i < rows; i++) {
  board[i] = []
  for (let j = 0; j < columns; j++) {
    board[i].push(Cell())
  }
}

  // method for rendering the board to html
  const renderBoard = () => {
    let table = document.getElementById("boardArray")
    table.innerHTML = ""
    for (let i = 0; i < board.length; i++) {
      let row = document.createElement("tr")

      for (let j = 0; j < board[i].length; j++) {
          let cell = document.createElement("td")
          cell.textContent = board[i][j].getValue()
          cell.setAttribute("onclick", `GameController.playRound(${i}, ${j})`)
          row.appendChild(cell)
      }
      table.appendChild(row)
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
})()

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
  ]
  // define the active player
  let activePlayer = players[0]

  // method for switching every round the player
  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0]
  }

  // method for getting the active player
  const getActivePlayer = () => activePlayer

  let gameLog = document.getElementById("gameStatus")

  // method for starting a new round
  const printNewRound = () => {
    Gameboard.renderBoard()
    gameLog.innerHTML = `${getActivePlayer().name}'s turn.`
    console.log(`${getActivePlayer().name}'s turn.`)
  }

  // method for playing a round
  const playRound = (row, column) => {
    if(board[row][column].getValue() === ""){
      console.log(`Dropping ${getActivePlayer().name}'s token into row: ${row} and column: ${column}...`)
      board[row][column].addToken(getActivePlayer().token)
      if (winner()) {
        gameLog.innerHTML = `${getActivePlayer().name}, with ${getActivePlayer().token} won!`
        Gameboard.renderBoard()
        return; // Stop the code execution
      }
      switchPlayer()
      printNewRound()
    }else{
      console.log("Choose another field")
    }
  };

  // method for checking for winner
  const winner = ()=>{
    if(checkEquality() === true){
      return true
    };
  };

  // method for checking equality
  const checkEquality = () => {
    const boardToCheck = Gameboard.board

    // check horizontal equality
    for (let row of boardToCheck) {
      if (
        row[0].getValue() !== "" &&
        row.every(cell => cell.getValue() === row[0].getValue())
        ) {
        return true
      }
    }

    // check vertical equality
    for (let col = 0; col < 3; col++) {
      if (
        boardToCheck[0][col].getValue() !== "" &&
        boardToCheck[0][col].getValue() === boardToCheck[1][col].getValue() &&
        boardToCheck[1][col].getValue() === boardToCheck[2][col].getValue()
      ) {
        return true
      }
    }

    // check diagonal equality
    if (
      boardToCheck[1][1].getValue() !== "" &&
      ((boardToCheck[0][0].getValue() === boardToCheck[1][1].getValue() &&
        boardToCheck[1][1].getValue() === boardToCheck[2][2].getValue()) ||
        (boardToCheck[0][2].getValue() === boardToCheck[1][1].getValue() &&
          boardToCheck[1][1].getValue() === boardToCheck[2][0].getValue()))
    ) {
      return true
    }
    return false
  }

  return{
    printNewRound,
    playRound,
  }

})()



// example
GameController.printNewRound()
// Gameboard.renderBoard()
// GameController.playRound(0,0)
// GameController.playRound(1,0)
// GameController.playRound(0,2)






