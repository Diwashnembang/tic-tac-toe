//---global varialbles below
const gameBoardCellDom = Array.from(
    document.querySelector("#gameboard").children
);
const mainDom=document.querySelector(".main");
const gameModesDom=Array.from(document.querySelector("#options").children)
const optionsDom=document.querySelector("#gamemode");
const retryDom=document.querySelector("#retry");
const restartDom=document.querySelector("#restart");
const winnerMessageDom=document.querySelector("#winnerMessage");
let gameMode = "god";



let score={
    X:-10,
    O:10,
    tie:0,
}
let winner=null;
//---global variable above

const minimax=(isMax,depth)=> {
    let _over=gameBoard.checkGameOver();
    if(_over){
        // console.log(winner)
        return score[winner]
    }
    
    if(isMax){
        let _bestScore= -Infinity;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(gameBoard.board[i][j]===""){
                    gameBoard.board[i][j]="O"
                    let score=minimax(false,depth+1);
                    gameBoard.board[i][j]=""
                    _bestScore=Math.max(score,_bestScore);
                }            
            }
            
        }
        return _bestScore - depth;
    }else{
        let _bestScore= Infinity;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(gameBoard.board[i][j]===""){
                    gameBoard.board[i][j]="X"
                    let score=minimax(true,depth+1);
                    gameBoard.board[i][j]=""
                    _bestScore=Math.min(score,_bestScore);
                }            
            }
            
        }
        return _bestScore + depth;

    }

}





const gameBoard = (() => {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    
    
    let gameOver = false;
    // let _winner=null;
  

    const checkGameOver = () => {
        // if (movesMade < 5) return; //5 beeacue game can't be over unless 5 moves are made
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
                        winner=board[i][j]
                        return true;
                    }
                }
            }
        };

        const _leftDiagonalCheck = () => {
            if (board[0][0] ==="" || board[1][1] === ""  || board[2][2]==="") {
                return ;
                
            }
        

            if (
                (board[0][0] === board[1][1] && board[1][1] === board[2][2])
            ) {
                    winner=board[0][0];
                    return true;
                }
                
            }
        

        const _rightDiagonalCheck = () => {
            if (board[0][2] ==="" || board[1][1] === ""  || board[2][0]==="") {
                return false;
                
            }

            if (
                (board[0][2] === board[1][1] && board[1][1] === board[2][0])
            ) {
                    winner=board[0][2];
                    
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
                        winner=board[j][i]
                        return true;
                    }
                }
            }
        };

    
        if (_horizonalCheck() || _rightDiagonalCheck() || _verticalCheck() || _leftDiagonalCheck()) {

            gameOver = true;
            return true;
        }
        let checkDraw=[];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(board[i][j]===""){
                    checkDraw.push(true)
                }
                else{
                    checkDraw.push(false);
                }
            }
        }
     
        if (!checkDraw.includes(true)) {//cant make more than 9 move casue 9 cell
            console.log("it's' a draw !!");
            winner="tie"
            gameOver = true;
    
            
               
            
            return true;
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
            displayController.fillGameboard();
            if(checkGameOver()) {
                displayController.displayWinner();
                displayController.showContent(retryDom,restartDom);
            }
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
            displayController.fillGameboard();
            if(checkGameOver()){
            displayController.displayWinner();
            displayController.showContent(retryDom,restartDom)
                return;
            }
            // if(checkGameOver()) return;
            let _time=0.2;
            bot.sleep(`bot.move()`, _time);//bot.sleep(code,time in second)for delay 

            // bot.sleep(2000);
        }

        function _playWithGod(player) {

            // if(_gameOver) return

            if (
                displayController.avoidMultipleSelection(player.column, player.row) ===
                true
                )
                return;
                if (_turn === "player1") {
                    board[player.column][player.row] = "X";
                }
                displayController.fillGameboard();
                if(checkGameOver()){
                    displayController.displayWinner();
                    displayController.showContent(retryDom,restartDom)
                    return;
                } ;
                let _time=0.2;
                bot.sleep(`godModeMove()`,_time);
               

            

        }
        function play(player) {
            switch (gameMode) {
                case "2player":
                    _2playerLogic(player);

                case "bot":
                    _playWithBotLogic(player);

                case "god":
                    _playWithGod(player);
            }
        }
        return { play };
    })();

    function retry() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j]=""
            }
        }
        displayController.fillGameboard()
        winnerMessageDom.textContent=""
        displayController.showContent(retryDom,restartDom);
    }

    function restart(){
        displayController.showContent(mainDom,optionsDom)
        retry();
    }

    return { board, gamePlay,checkGameOver,retry,restart};
})();

const bot = (() => {
    // if (gameMode !== "bot") return;

    function sleep(code, time) {
        setTimeout(() => {
            eval(code);
        }, time * 1000);
    }

    function _randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const _choose = () => {
        const column = _randomNumber(0, 2);
        const row = _randomNumber(0, 2);
        return { column, row };
    };

    const move =()=>{
        let _cmp
        let _cmpChoosing = 0
        while(_cmpChoosing<10){ //less than 10 because the are ooly 9 cells otherwise browser will carsh.
            _cmp=_choose();
            if (displayController.avoidMultipleSelection(_cmp.column, _cmp.row)){
                _cmpChoosing++;
                continue;
            }
            
            gameBoard.board[_cmp.column][_cmp.row] = "O";
            displayController.fillGameboard();
         if(gameBoard.checkGameOver()) displayController.displayWinner();
            _cmpChoosing=10;
            
        }
    }

    const godModeMove =()=>{
        let _bestScore= -Infinity;
        let _move;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(gameBoard.board[i][j]===""){
                    gameBoard.board[i][j]="O";
                    // gameBoard.checkGameOver();
                    let _score=minimax(false,0);
                    gameBoard.board[i][j]="";
                    if(_score > _bestScore){
                         _move={i ,j}
                        _bestScore=_score;
                    }
                }
                
            }
            
        }
        if(_move!==undefined){

            gameBoard.board[_move.i][_move.j] = "O";
        }
        displayController.fillGameboard();
        if(gameBoard.checkGameOver()){
            displayController.displayWinner();
            displayController.showContent(retryDom,restartDom)
            return;
        };
    }


    

    return { sleep,move,godModeMove};
})();

//-----code below  for manuplating the dom----
const displayController = (() => {
    const fillGameboard = () => {
        let column = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                switch (gameBoard.board[i][j]) {
                    case 'X':
                        gameBoardCellDom[column].setAttribute("style",`background:center url("assets/x.png"); background-size:cover;`)
                       
                        break;
                
                    case 'O': 
                    gameBoardCellDom[column].setAttribute("style",`background:center url("assets/o.png"); background-size:cover; `)
                        break;
                    default:
                        gameBoardCellDom[column].setAttribute("style",`background:none `)
                }
                column++;
            }
        }
    };

    const avoidMultipleSelection = (column, row) => {
        if (gameBoard.board[column][row] !== "") return true;
    }; //to avoid selction on already selected cell


    const showContent=(...nodes)=>{
        nodes.forEach(node=>{
            node.classList.toggle("hidden");
        });
    }

    function displayWinner() {
        if(winner==="X"){
            winnerMessageDom.textContent='X WIN!!'
        }else if(winner==="O"){
                winnerMessageDom.textContent='O WINS!!'
        }else if(winner==="tie"){
            winnerMessageDom.textContent="IT'S A DRAW!!"
        }else{
            winnerMessageDom.textContent=""
        }
        winnerMessageDom.classList.add("title")
        winnerMessageDom.setAttribute("style","top:1rem;")
    } 
    return { fillGameboard, avoidMultipleSelection,showContent,displayWinner };
})();

//-----above code for dom manuplation-----

// --- mainexecuted codes below---
gameBoardCellDom.forEach((cell) => {
    let player = {
        row: cell.getAttribute("data-row"),
        column: cell.getAttribute("data-column"),
    };
    cell.addEventListener("click", ()=>{
        if(gameBoard.checkGameOver()) return;
        gameBoard.gamePlay.play(player)
        ;

    
});
});

gameModesDom.forEach(mode=>{
    mode.addEventListener("click",()=>{
        selected=mode.textContent.trim().toLocaleLowerCase();
        switch(selected){
            case "2 player":
                gameMode="2player";
                break;
            
            case "bot-easy":
                gameMode="bot";
                break;

            case "bot-hard":
                gameMode="god";
                break;

            default:
                return "ERROR WHILE CHOOSING GAMEMODE"

        }
        displayController.showContent(mainDom,optionsDom);
    })
    // console.log(mode)
})

retryDom.addEventListener("click",()=>{
    gameBoard.retry();
})

restartDom.addEventListener("click",()=>{
    gameBoard.restart();
})


// --- main executed codes above---
 