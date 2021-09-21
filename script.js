//---global varialbles below
const gameBoardCellDom = Array.from(
    document.querySelector("#gameboard").children
);
let movesMade = 0;

//---global variable above

const gameBoard = (() => {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    const checkGmaeOver = () => {
        const _horizonalCheck = () => {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 1; j++) {
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
                for (let j = 0; j < 3; j++) {
                    if (
                        board[j][i] === board[j + 1][i] &&
                        board[j + 1][i] === board[j + 2][i]
                    ) {
                        return true;
                    } else {
                        console.log("no");
                    }
                }
            }
        };

        if (movesMade < 5) return;
        if (_horizonalCheck() || _diagonalCheck() || _verticalCheck()) {
            console.log("gameOver");
        }
    };

    return { board, checkGmaeOver };
})();

function player() {
    let _turn = "player1";

    const _playerChoice = (cell) => {
        row = cell.getAttribute("data-row");
        column = cell.getAttribute("data-column");

        if (displayController.avoidMultipleSelection(column, row) === true) return;

        if (_turn === "player1") {
            gameBoard.board[column][row] = "X";
            _turn = "player2";
        } else {
            gameBoard.board[column][row] = "O";
            _turn = "player1";
        }
        movesMade++;
        displayController.fillGameboard();
        gameBoard.checkGmaeOver();
    };

    gameBoardCellDom.forEach((cell) => {
        cell.addEventListener("click", _playerChoice.bind("", cell));
    });

    return {};
}

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
const user = player();
// const player2=player("O");

// --- executed codes above---
