//---global varialbles below 
const gameBoardCellDom=document.querySelector("#gameboard").children; 


//---global variable above
const gameBoard=(()=>{

    let board=[
        ["X","O","X"],
        ["X","O","X"],
        ["X","0","X"],
    ]

    return {board}

})();


const player=()=>{

    
}

//-----code below  for manuplating the dom----
const _gameBoardCellDom=document.querySelector("#gameboard").children; 

const displayController=(()=>{
    const fillGameboard=()=>{
        let column=0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                console.log(gameBoard.board[i][j]);
                gameBoardCellDom[column].textContent=gameBoard.board[i][j];
                column++;                
            }    
            
        }
    }

    return {fillGameboard}
})();
    

//-----above code for dom manuplation-----



// --- executed codes below---

displayController.fillGameboard();

// --- executed codes above---