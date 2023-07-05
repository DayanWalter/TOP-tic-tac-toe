// create an object and call it Gameboard
// create the object as a module
const gameBoard = (() => {
// Put an array as property in the object
// fill it with an example
    let board = ["0-1row", "1-1row", "2-1row", "3-2row", "4-2row", "5-2row", "6-3row", "7-3row", "8-3row"];
    // add add function
    const add = (index, element) => board.splice(index, 0, element)
    
    return {
        board,
        add,
    };
})();