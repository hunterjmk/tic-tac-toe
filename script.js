/* 
I'll start by creating the board. It's basically a 2d array. An array of arrays.
Primary focus is to play this in the console for now. So, I'll be writing with that in mind.

Using an IIFE because I only need the board one!
*/

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {addToken, getValue};
};

const board = (function (){
    const rows = 3;
    const columns = rows;

    const gameBoard = [];

    for (let i = 0; i < rows; i++){
        gameBoard[i] = [];
        for (let j = 0; j < columns; j++){
            gameBoard[i].push(Cell());
        }
    }

    const printBoard = () => {
        const printedBoard = gameBoard.map(row => row.map(cell => cell.getValue()));
        console.log(printedBoard);
    }

    const dropToken = (row, column, player) => {
        const cell = gameBoard[row][column];

        if (cell.getValue() === 'X' || cell.getValue() === 'O') {
            return;
        } else cell.addToken(player);
    }

    return {
        printBoard,
        dropToken
    };
})();

const game = (function (playerOneName = 'Player One', playerTwoName = 'Player Two'){

    const player = [
        {
            playerName: playerOneName,
            token: 'X'
        },
        {
            playerName: playerTwoName,
            token: 'O'
        }
    ]

    let activePlayer = player[0];

    const switchPlayerTurn = () => {
        activePlayer = (activePlayer === player[0]) ? player[1] : player[0];
    };

    const printNewRound = () => {
        console.log(`It's ${activePlayer.playerName}'s turn`);

        board.printBoard();
    };

    printNewRound();

    const playRound = (row, column) => {
        console.log(`Placing ${activePlayer.playerName}'s token in row: ${row}, column: ${column}...`);

        board.dropToken(row, column, activePlayer.token);

        switchPlayerTurn();
        printNewRound();
    };


    return {
        printNewRound,
        playRound
    }
})();