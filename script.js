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
        console.log("winner = true");
        Gameboard.renderBoard()
        return // Stop the code execution
      
      } else if (isDraw()) {
        gameLog.innerHTML = "Draw, nobody won!"
        console.log("DRAW!!!");
        Gameboard.renderBoard()
        return
      }
      switchPlayer()
      printNewRound()
    }else{
      console.log("Choose another field")
      gameLog.innerHTML = "Choose another field"
    }
  };

  const winner = () => {
    const winConditions = [
      // horizontal win conditions
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // vertical win conditions
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // diagonal win conditions
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (
        board[a[0]][a[1]].getValue() !== "" &&
        board[a[0]][a[1]].getValue() === board[b[0]][b[1]].getValue() &&
        board[a[0]][a[1]].getValue() === board[c[0]][c[1]].getValue()
      ) {
        return true;
      }
    }

    return false;
  }
  const isDraw = () => {
    const emptyCells = board.flat().filter(cell => cell.getValue() === "");
    return emptyCells.length === 0;
  }

  return{
    printNewRound,
    playRound,
  }

})()



// example
GameController.printNewRound()