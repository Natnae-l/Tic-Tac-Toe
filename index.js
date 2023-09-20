(function(){
    `use strict`
let gameBoard;
const player1 = `O`;
const player2 = `X`;

const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6 ], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [6, 4, 2]
]

const cells = document.querySelectorAll(`div`);
startGame();
document.querySelector(`.reset`).addEventListener(`click`, startGame)

function startGame(){
    document.querySelector(`.endgame`).style.display = `none`;
    gameBoard = Array.from(Array(9).keys());
    Array.from(cells).forEach(divs => {
        divs.innerText = ``;
        divs.style.removeProperty(`background-color`);
        divs.addEventListener(`click`, turnClick, false);
    })
}

function turnClick(square){
    if (typeof(gameBoard[square.target.id]) == `number`){
         turn(square.target.id, player1)
        if (!checkTie()) turn(bestSpot(), player2)
    } 
}

function turn (squreId, player){
    gameBoard[squreId] = player;
    document.getElementById(squreId).innerText = player;
    let gameWon = checkWin(gameBoard, player);
    if (gameWon) gameOver(gameWon)
}

function checkWin(board, player){
    let plays = board.reduce((a, e, i) => 
        (e === player) ? a.concat(i) : a, [] );
    let gameWon = null;

    for (let [index, win] of winCombos.entries()){
        if (win.every(elem => plays.indexOf(elem) > -1)){
            gameWon = {index: index, player: player};
            break
        }
    }
    return gameWon
}

function gameOver(gameWon){
    for (let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor = 
        (gameWon.player == player1) ? `white` : `red`;
    }
    cells.forEach(item => {
        item.removeEventListener(`click`, turnClick, false)
    })

    declareWinner(gameWon.player == player1 ? `You win` : `You lose`)
}

function declareWinner(who){
    document.querySelector(`.endgame`).style.display = `block`;
    document.querySelector(`.endgame`).innerText = who;
}

function emptySquares(){
    return gameBoard.filter(s => typeof(s) == `number`);
}

function bestSpot(){
    return emptySquares()[0]
}

function checkTie(){
    if (emptySquares().length == 0){
        for (let i = 0; i < cells.length; i++){
            cells[i].removeEventListener(`click`, turnClick, false);
        }
        declareWinner(`Tie Game!`)
        return true
    }
    return false
}


})()