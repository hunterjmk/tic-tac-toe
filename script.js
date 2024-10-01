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

    const getboard = () => gameBoard;

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
        dropToken,
        getboard
    };
})();

const game = (function (playerOneName = 'Player One', playerTwoName = 'Player Two'){

    const player = [
        {
            name: playerOneName,
            token: 'X'
        },
        {
            name: playerTwoName,
            token: 'O'
        }
    ]

    let activePlayer = player[0];

    const switchPlayerTurn = () => {
        activePlayer = (activePlayer === player[0]) ? player[1] : player[0];
    };

    const printNewRound = () => {
        console.log(`It's ${activePlayer.name}'s turn`);

        board.printBoard();
    };

    printNewRound();

    const playRound = (row, column) => {
        console.log(`Placing ${activePlayer.name}'s token in row: ${row}, column: ${column}...`);

        board.dropToken(row, column, activePlayer.token);

        checkWinner();
        switchPlayerTurn();
        printNewRound();
    };

    const checkWinner = () => {
        const boardCheck = board.getboard();
       // columns

       for (let i = 0; i < 3; i++) {  // i = 1
            const cell1 = boardCheck[0][i].getValue();
            const cell2 = boardCheck[1][i].getValue();
            const cell3 = boardCheck[2][i].getValue();

            if (cell1 !== 0 && cell1 === cell2 && cell1 === cell3){
                console.log(`${activePlayer.name} won! Congratulations`)
            }
       }
        // Rows

        for (let i = 0; i < 3; i++) {  // i = 1
            const cell1 = boardCheck[i][0].getValue();
            const cell2 = boardCheck[i][1].getValue();
            const cell3 = boardCheck[i][2].getValue();

            if (cell1 !== 0 && cell1 === cell2 && cell1 === cell3){
               console.log(`${activePlayer.name} won! Congratulations`);
            } 
       }

       // Diagonals 

       /* 
        board = [
        [0, 1, 2], this is row 1 = 0
        [0, 1, 2], row 2 = 1
        [0, 1, 2]  row 3 = 2
        ]
        */ 

        if ((boardCheck[0][0].getValue() !== 0) && (boardCheck[0][0].getValue() === boardCheck[1][1].getValue()) && (boardCheck[0][0].getValue() === boardCheck[2][2].getValue())) {
            console.log(`${activePlayer.name} won! Congratulations`);
        }

        if (boardCheck[0][2].getValue() !== 0 && boardCheck[0][2].getValue() === boardCheck[1][1].getValue() && boardCheck[0][2].getValue() === boardCheck[2][0].getValue()) {
            console.log(`${activePlayer.name} won! Congratulations`);
        }

        // Tie
        let numCells = 0;
        const totalCells = 9; 

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cellValue = boardCheck[i][j].getValue();
                if (cellValue === 'X' || cellValue === 'O') {
                    numCells++;
                }
            }
        }

        if (numCells === totalCells) {
            console.log(`It's a tie!`);
        }
    }


    return {
        printNewRound,
        playRound
    }
})();