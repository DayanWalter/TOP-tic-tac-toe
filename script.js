// create an object and call it gameBoard
// create the object as a module
const gameBoard = (() => {
// Put an array as property in the object
// fill it with an example
    const board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    return {
        board,
    };
})();

// add  a factory function for player creation
const Player = (name, token) => {
    let _getName = () => name;
    let _getToken = () => token;
    const addChoice = (row, column) => {
        gameBoard.board[row][column] = token;
        console.log(_getName() + " took " + _getToken() + " and made a choice.");
        console.log(gameBoard.board);
    };

    return{
        addChoice,
    };
}

const player1 = Player("Player 1", "1");
const player2 = Player("Player 2", "2");

const displayController = (() => {

})();