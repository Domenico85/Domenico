const TicTacToeGame = (function(){

    const Player = (name, marker) => {
        return {name, marker };
    };

    const Gameboard = () => {
        let board = ['','','','','','','','','',];

        const getBoard = () => board;

        const emptyCell = (index) => {
            return board[index] === '';
        };

        const markCell = (index, marker) => {
            if (emptyCell(index)){
                board[index] = marker;
                return true;
            }
            return false;
        };

        const checkWinner = () => {
            const winConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

            for (let condition of winConditions){
                const [a, b, c] = condition;
                if (board[a] !== '' && board[a] === board[b] && board[a] === board [c]){
                    return board[a];
                }
            }

            if (board.every(cell => cell !== '')){
                return 'tie';
            }
            return null;
        };

        const resetBoard = () => {
            board = ['','','','','','','','','',];
        };

        return {getBoard, markCell, checkWinner, resetBoard}
    };

    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const computerMove = (board) => {
        const emptyCells = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                emptyCells.push(i);
            }
        }
        if (emptyCells.length === 0) {
            return null;
        }
        const randomIndex = getRandomInt(0, emptyCells.length - 1);
        return emptyCells[randomIndex];
    };

    return {
        createPlayer: Player,
        createGameboard: Gameboard,
        computerMove: computerMove
    };

})();

const container = document.querySelector('.container');
const modal = document.querySelector('.modal');
const message = document.querySelector('.message');
const restartBtn = document.getElementById('restart-btn');
const boxes = document.querySelectorAll('.box');
const modeButtons = document.querySelectorAll('.mode');

const player1 = TicTacToeGame.createPlayer('Player 1', 'X');
const player2 = TicTacToeGame.createPlayer('Player 2', 'O');
const gameboard = TicTacToeGame.createGameboard();

let currentPlayer = player1;
let isPlayerVsBot = true; // Default mode is Player Vs Bot
let isBotTurn = false; // Variable to track whether it's the bot's turn

const displayBoard = () => {
    const board = gameboard.getBoard();
    for (let i = 0; i < board.length; i++) {
        boxes[i].textContent = board[i];
    }
};

const handleCellClick = (event) => {
    if (isBotTurn) {
        return;
    }
    
    const index = parseInt(event.target.id);
    if (gameboard.markCell(index, currentPlayer.marker)) {
        displayBoard();
        const winner = gameboard.checkWinner();
        if (winner) {
            showModal(winner);
            return;
        }
        if (isPlayerVsBot && currentPlayer === player1) {
            disableBoxClicks();
            setTimeout(() => {
                const botMoveIndex = TicTacToeGame.computerMove(gameboard.getBoard());
                if (botMoveIndex !== null) {
                    gameboard.markCell(botMoveIndex, player2.marker);
                    displayBoard();
                    const winner = gameboard.checkWinner();
                    if (winner) {
                        showModal(winner);
                        return;
                    }
                }
                currentPlayer = player1;
                enableBoxClicks();
            }, 500);
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
    }
};

const showModal = (result) => {
    if (result === 'tie') {
        message.innerHTML = 'It\'s a <span class="tie">tie</span>!';
    } else {
        message.innerHTML = `Congratulations Player <span class="winner">${result}</span>! You've won the game <span class="smile">:)</span>`;
    }
    modal.style.display = 'block';
};

const restartGame = () => {
    gameboard.resetBoard();
    currentPlayer = player1;
    displayBoard();
    modal.style.display = 'none';
    showModeSelectionDiv();
};

const hideModeSelectionDiv = () => {
    const modeSelectionDiv = document.querySelector('.choose');
    modeSelectionDiv.style.display = 'none';
    modeButtons.forEach(button => {
        button.style.display = 'none';
    });
};

const showModeSelectionDiv = () => {
    const modeSelectionDiv = document.querySelector('.choose');
    modeSelectionDiv.style.display = 'block';
    modeButtons.forEach(button => {
        button.style.display = 'block';
    });
};

const disableBoxClicks = () => {
    boxes.forEach(box => {
        box.removeEventListener('click', handleCellClick);
    });
    isBotTurn = true;
};

const enableBoxClicks = () => {
    boxes.forEach(box => {
        box.addEventListener('click', handleCellClick);
    });
    isBotTurn = false;
};

restartBtn.addEventListener('click', restartGame);
boxes.forEach(box => {
    box.addEventListener('click', handleCellClick);
});

modeButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        if (event.target.value === 'bot') {
            isPlayerVsBot = true;
        } else if (event.target.value === 'player') {
            isPlayerVsBot = false;
        }
        hideModeSelectionDiv();
    });
});
