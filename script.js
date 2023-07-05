// create an object and call it Gameboard
// create the object as a module
const gameBoard = (() => {
// Put an array as property in the object
// fill it with an example
    const board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    // add add function
    const add = (row, column, player) => board[row][column] = player;
    
    return {
        board,
        add,
    };
})();
// add  a factory function for player creation
const Player = (name, token) => {
    const method = () => console.log(name, token);
    const getName = () => name;
    const getToken = () => token;

    return{
        method,
    };
}
const player1 = Player("Player 1", "1");
const player2 = Player("Player 2", "2");