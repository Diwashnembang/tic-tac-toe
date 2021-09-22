//---global varialbles below
const gameBoardCellDom = Array.from(
    document.querySelector("#gameboard").children
);
let movesMade = 0;
let gameMode = "bot";

//---global variable above

const gameBoard = (() => {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    const checkGameOver = () => {
        if (movesMade < 5) return; //5 beeacue game can't be over unless 5 moves are made
        const _horizonalCheck = () => {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 1; j++) {
                    if (
                        board[i][j] === "" ||
                        board[i][j + 1] === "" ||
                        board[i][j + 2] === ""
                    )
                        continue;

                    if (
                        board[i][j] === board[i][j + 1] &&
                        board[i][j + 1] === board[i][j + 2]
                    ) {
                        return true;
                    }
                }
            }
        };

        const _diagonalCheck = () => {
            if (
                (board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
                (board[0][2] === board[1][1] && board[1][1] === board[2][0])
            ) {
                return true;
            }
        };

        const _verticalCheck = () => {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 1; j++) {
                    if (
                        board[j][i] === "" ||
                        board[j + 1][i] === "" ||
                        board[j + 2][i] === ""
                    ) {
                        continue;
                    }

                    if (
                        board[j][i] === board[j + 1][i] &&
                        board[j + 1][i] === board[j + 2][i]
                    ) {
                        return true;
                    }
                }
            }
        };

        let _gameOver = false;
        if (_horizonalCheck() || _diagonalCheck() || _verticalCheck()) {
            if (_horizonalCheck()) {
                console.log("hotixonal");
            }
            if (_diagonalCheck()) {
                console.log("diagonal check");
            }
            if (_verticalCheck()) {
                console.log("vertical check");
            }
            console.log("gameOver");
            _gameOver = true;
            console.table(board);
        }

        if (movesMade >= 9 && _gameOver === false) {
            console.log("it's' a draw !!");
        }
    };

    const gamePlay = (() => {
        let _turn = "player1";

        function _2playerLogic(player) {
            if (
                displayController.avoidMultipleSelection(player.column, player.row) ===
                true
            )
                return;

            if (_turn === "player1") {
                board[player.column][player.row] = "X";
                _turn = "player2";
            } else {
                board[player.column][player.row] = "O";
                _turn = "player1";
            }
            movesMade++;
            displayController.fillGameboard();
            checkGameOver();
        }

        function _playWithBotLogic(player) {
            if (
                displayController.avoidMultipleSelection(player.column, player.row) ===
                true
            )
                return;
            if (_turn === "player1") {
                board[player.column][player.row] = "X";
            }
            movesMade++;
            displayController.fillGameboard();
            checkGameOver();
            bot.sleep(
                `let _cmp
        let _cmpChoosing = 0
        while(_cmpChoosing<10){ //less than 10 because the are ooly 9 cells otherwise browser will carsh.
            _cmp=bot.choose();
            if (displayController.avoidMultipleSelection(_cmp.column, _cmp.row)){
                _cmpChoosing++;
                continue;
            }
            
            gameBoard.board[_cmp.column][_cmp.row] = "O";
            movesMade++;
            displayController.fillGameboard();
            gameBoard.checkGameOver();
            _cmpChoosing=10;
            
        }`,
                0.5
            );//bot.sleep(code,time in second)for delay 

            // bot.sleep(2000);
        }
        function play(player) {
            switch (gameMode) {
                case "2player":
                    _2playerLogic(player);

                case "bot":
                    _playWithBotLogic(player);
            }
        }
        return { play };
    })();

    return { board, gamePlay, checkGameOver };
})();

const bot = (() => {
    if (gameMode !== "bot") return;

    function sleep(code, time) {
        setTimeout(() => {
            eval(code);
        }, time * 1000);
    }

    function _randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const choose = () => {
        const column = _randomNumber(0, 2);
        const row = _randomNumber(0, 2);
        return { column, row };
    };

    return { sleep, choose };
})();

//-----code below  for manuplating the dom----
const displayController = (() => {
    const fillGameboard = () => {
        let column = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameBoardCellDom[column].textContent = gameBoard.board[i][j];
                column++;
            }
        }
    };

    const avoidMultipleSelection = (column, row) => {
        if (gameBoard.board[column][row] !== "") return true;
    }; //to avoid selction on already selected cell
    return { fillGameboard, avoidMultipleSelection };
})();

//-----above code for dom manuplation-----

// --- executed codes below---
displayController.fillGameboard();
gameBoardCellDom.forEach((cell) => {
    let player = {
        row: cell.getAttribute("data-row"),
        column: cell.getAttribute("data-column"),
    };
    cell.addEventListener("click", gameBoard.gamePlay.play.bind("", player));
});

// --- executed codes above---
