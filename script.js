// create an object and call it Gameboard
// create the object as a module
const gameBoard = (() => {
// Put an array as property in the object
// fill it with an example
    let board = ["x","o","x","o","x","o","x","o","x"];
    const add = (a) => board.push(a)
    
    return {
        board,
        add,
    };
})();