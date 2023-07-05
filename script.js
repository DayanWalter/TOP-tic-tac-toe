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