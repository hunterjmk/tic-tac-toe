/* 
I'll start by creating the board. It's basically a 2d array. An array of arrays.
Primary focus is to play this in the console for now. So, I'll be writing with that in mind.

Using an IIFE because I only need the board one!
*/

function Cell() {
    let value = '';

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {addToken, getValue};
};

// Board

const board = (function (){

    const createBoard = () => {
        const rows = 3;
        const columns = rows;

        const createdBoard = [];

        for (let i = 0; i < rows; i++){
            createdBoard[i] = [];
            for (let j = 0; j < columns; j++){
                createdBoard[i].push(Cell());
            }
        }

        return createdBoard;  
    }

    let gameBoard = createBoard();
    
    const getboard = () => gameBoard;

    const setBoard = (board) => gameBoard = board;

    const printBoard = () => {
        const printedBoard = gameBoard.map(row => row.map(cell => cell.getValue()));
        console.log(printedBoard);
    }

    const dropToken = (row, column, player) => {
        const cell = gameBoard[row][column];

        if (cell.getValue() === 'X' || cell.getValue() === 'O') {
            throw new Error('Spot already taken');
        } else cell.addToken(player);
    }

    return {
        printBoard,
        dropToken,
        getboard,
        createBoard,
        setBoard
    };
})();


// Game Object

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
    ];

    let activePlayer = player[0];
    let endGame = false;
    let won = false;
    let tied = false;

    const getActivePlayer = () => activePlayer;
    const getWinStatus = () => won;
    const getTieStatus = () => tied;
    const getPlayers = () => player;

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
        if (!endGame) {
            switchPlayerTurn();
            printNewRound();
        } else if (endGame) {
            board.printBoard();
        }
    };

    const checkWinner = () => {
        const boardCheck = board.getboard();
       // columns

       for (let i = 0; i < 3; i++) {  // i = 1
            const cell1 = boardCheck[0][i].getValue();
            const cell2 = boardCheck[1][i].getValue();
            const cell3 = boardCheck[2][i].getValue();

            if (cell1 !== '' && cell1 === cell2 && cell1 === cell3){
                console.log(`${activePlayer.name} won! Congratulations`)
                endGame = true;
                won = true;
            }
       }
        // Rows

        for (let i = 0; i < 3; i++) {  // i = 1
            const cell1 = boardCheck[i][0].getValue();
            const cell2 = boardCheck[i][1].getValue();
            const cell3 = boardCheck[i][2].getValue();

            if (cell1 !== '' && cell1 === cell2 && cell1 === cell3){
               console.log(`${activePlayer.name} won! Congratulations`);
               endGame = true;
               won = true;
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

        if ((boardCheck[0][0].getValue() !== '') && (boardCheck[0][0].getValue() === boardCheck[1][1].getValue()) && (boardCheck[0][0].getValue() === boardCheck[2][2].getValue())) {
            console.log(`${activePlayer.name} won! Congratulations`);
            endGame = true;
            won = true;
        }

        if (boardCheck[0][2].getValue() !== '' && boardCheck[0][2].getValue() === boardCheck[1][1].getValue() && boardCheck[0][2].getValue() === boardCheck[2][0].getValue()) {
            console.log(`${activePlayer.name} won! Congratulations`);
            endGame = true;
            won = true;
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

        if (numCells === totalCells && !won) {
            console.log(`It's a tie!`);
            endGame = true;
            tied = true;
        }
    }

    const restart = () => {
        const newBoard = board.createBoard();
        board.setBoard(newBoard);

        if (endGame){
            endGame = false;
            if (won) {
                won = false;
            } else tied = false;
        }
        activePlayer = player[0];
    };


    return {
        printNewRound,
        playRound,
        getActivePlayer,
        restart,
        getPlayers,
        getWinStatus,
        getTieStatus
    }
})();


function screenController() {
    const boardDiv = document.querySelector('.board');
    const turnDiv = document.querySelector('.turn');
    const restartBtn = document.querySelector('.restart');
    const form = document.querySelector('#form');
    const inputs = document.querySelectorAll('input');

    let namesObj = {};
    let submittedNames = false;

    

    const updateScreen = () => {
        boardDiv.textContent = '';

        const gameBoard = board.getboard();
        const activePlayer = game.getActivePlayer();

        let won = game.getWinStatus();
        let tied = game.getTieStatus();
        if (won){
            console.log(won);
            turnDiv.textContent = `${activePlayer.name} won! Congratulations`;
        } else if (tied){
            turnDiv.textContent = `It's a tie!`;
        } else if (!won && !tied){
            turnDiv.textContent = `It is ${activePlayer.name}'s turn`;
        }


        gameBoard.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellBtn = document.createElement('button');

                cellBtn.classList.add('cell');
                cellBtn.textContent = cell.getValue();
                cellBtn.dataset.row = rowIndex;
                cellBtn.dataset.column = colIndex;


                boardDiv.appendChild(cellBtn);
            }) 
        });
    };

    updateScreen();


    const clickHandler = (e) => {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;

        if (!selectedColumn && !selectedRow){
            return;
        } else {
            game.playRound(parseInt(selectedRow), parseInt(selectedColumn));
            updateScreen();
        }
        
    };

    form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    namesObj = Object.fromEntries(formData);

    // Change Player names

    const players = game.getPlayers();

    console.log(players);

    players[0].name = namesObj.playerOne;
    players[1].name = namesObj.playerTwo;
    
    game.restart();
    updateScreen();
    game.printNewRound();


    for (let input of inputs) {
        input.value = '';   
    };
    console.table(namesObj);
    });

    boardDiv.addEventListener('click', clickHandler);
    restartBtn.addEventListener('click', () => {
        game.restart();
        updateScreen();
        game.printNewRound();
    });
}

screenController();