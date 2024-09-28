/* 
I'll start by creating the board. It's basically a 2d array. An array of arrays.
Primary focus is to play this in the console for now. So, I'll be writing with that in mind.

Using an IIFE because I only need the board one!
*/

const cell = (function(){
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {addToken, getValue};
})();

const board = (function (){
    const rows = 3;
    const columns = rows;

    const gameBoard = [];

    for (let i = 0; i < rows; i++){
        gameBoard[i] = [];
        for (let j = 0; j < columns; j++){
            gameBoard[i].push(cell);
        }
    }

    const printBoard = () => {
        const printedBoard = gameBoard.map(row => row.map(colCell => colCell.getValue()));
        console.log(printedBoard);
    }

    const dropToken = (row, column, player) => {
        const colCell = gameBoard[row][column];

        if (colCell.getValue() === 'X' || colCell.getValue() === 'O') {
            return;
        } else colCell.addToken(player);
    }

    return {
        printBoard,
        dropToken
    };
})();