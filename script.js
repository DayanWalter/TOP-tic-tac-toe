  function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
  
    // Create a 2d array that will represent the state of the game board
    // For this 2d array, row 0 will represent the top row and
    // column 0 will represent the left-most column.
    // This nested-loop technique is a simple and common way to create a 2d array.
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      }
    }
  
    // This will be the method of getting the entire board that our
    // UI will eventually need to render it.
    const getBoard = () => board;
  
    // In order to drop a token, we need to find what the lowest point of the
    // selected column is, *then* change that cell's value to the player number
    const dropToken = (row, column, player) => {
      if(board[row][column].getValue() === 0){
        board[row][column].addToken(player);
      }else{
        console.log("Field was already choosen!");
        return;
      }
      // // If no cells make it through the filter, 
      // // the move is invalid. Stop execution.
      // if (!availableCells.length) return;
  
      // // Otherwise, I have a valid cell, the last one in the filtered array
      // const lowestRow = availableCells.length - 1;
    };
  
    // This method will be used to print our board to the console.
    // It is helpful to see what the board looks like after each turn as we play,
    // but we won't need it after we build our UI
    const printBoard = () => {
      const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
      console.log(boardWithCellValues);
    };
  
    // Here, we provide an interface for the rest of our
    // application to interact with the board
    return { getBoard, dropToken, printBoard };
  }
  
  /*
  ** A Cell represents one "square" on the board and can have one of
  ** 0: no token is in the square,
  ** 1: Player One's token,
  ** 2: Player 2's token
  */
  
  function Cell() {
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
  }
  
  /* 
  ** The GameController will be responsible for controlling the 
  ** flow and state of the game's turns, as well as whether
  ** anybody has won the game
  */
  function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
  ) {
    const board = Gameboard();
  
    const players = [
      {
        name: playerOneName,
        token: 1
      },
      {
        name: playerTwoName,
        token: 2
      }
    ];
  
    let activePlayer = players[0];
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;
  
    const printNewRound = () => {
      board.printBoard();
      console.log(`${getActivePlayer().name}'s turn.`);
    };
  
    const playRound = (row, column) => {
      // Drop a token for the current player
      console.log(
        `Putting ${getActivePlayer().name}'s token into row: ${row} and column: ${column}...`
      );
      board.dropToken(row, column, getActivePlayer().token);
  
      /*  This is where we would check for a winner and handle that logic,
          such as a win message. */
  
      // Switch player turn
      switchPlayerTurn();
      printNewRound();
  };
  
    // Initial play game message
    printNewRound();
  
    // For the console version, we will only use playRound, but we will need
    // getActivePlayer for the UI version, so I'm revealing it now
    return {
      playRound,
      getActivePlayer
    };
  }
  
  const game = GameController();

  function generateGrid() {
    // Das 2D-Array aus der Gameboard-Funktion
    const board = Gameboard();
  
    // Erstellen des HTML-Grids
    const grid = document.createElement('table');
  
    // Schleife über die Zeilen des Arrays
    for (let i = 0; i < board.getBoard().length; i++) {
      const row = document.createElement('tr');
  
      // Schleife über die Spalten des Arrays
      for (let j = 0; j < board.getBoard()[i].length; j++) {
        const cell = document.createElement('td');
        const cellText = document.createTextNode(board.getBoard()[i][j].getValue()); // Wert der Zelle im Array abrufen
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
  
      // Hinzufügen der Zeile zum Grid
      grid.appendChild(row);
    }
  
    // Hinzufügen des Grids zum DOM (z.B. zum Body des Dokuments)
    document.body.appendChild(grid);
  }
  
  generateGrid();