// create an object and call it Gameboard
// create the object as a module
const gameBoard = (() => {
// Put an array as property in the object
// fill it with an example
    const board = ["x","o","x","o","x","o","x","o","x"];
return {
    board,
};

})();
console.log(gameBoard.board);