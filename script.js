//---global varialbles below 
const gameBoardCellDom=Array.from(document.querySelector("#gameboard").children); 


//---global variable above
const gameBoard=(()=>{

    let board=[
        ["X","O","X"],
        ["X","O","X"],
        ["X","0","X"],
    ]

    return {board}

})();


function player(choice){
    
    const _playerChoice=(cell)=>{
        row=cell.getAttribute("data-row");
        column=cell.getAttribute("data-column");
        gameBoard.board[column][row]=choice;
        displayController.fillGameboard();
                  
    }


    gameBoardCellDom.forEach(cell => {
        cell.addEventListener("click",_playerChoice.bind("",cell))
    });


    

    return {}
}




//-----code below  for manuplating the dom----
const displayController=(()=>{
    const fillGameboard=()=>{
        let column=0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
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
const player1=player("X")

// --- executed codes above---