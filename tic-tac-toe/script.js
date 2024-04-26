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

    return {
        createPlayer: Player,
        createGameboard: Gameboard
    };

})();

const player1 = TicTacToeGame.createPlayer('Player 1', 'X');
// console.log (player1);
const player2 = TicTacToeGame.createPlayer('Player 2', 'O');
// console.log(player2);
const gameboard = TicTacToeGame.createGameboard();
// console.log(gameboard);

// console.log(TicTacToeGame);

const displayBoard = () => {
    const board = gameboard.getBoard();
    console.log(`
    ${board[0]} | ${board[1]} | ${board[2]}
    ---------
    ${board[3]} | ${board[4]} | ${board[5]}
    ---------
    ${board[6]} | ${board[7]} | ${board[8]}
  `
    );
};

const startGame = () => {
    let currentPlayer = player1;
  
    while (true) {
      displayBoard();
      console.log(`${currentPlayer.name}'s turn (${currentPlayer.marker})`);
      let move = parseInt(prompt('Enter your move (1-9):'));
  
      if (isNaN(move) || move < 1 || move > 9) {
        console.log('Invalid move! Please enter a number between 1 and 9.');
        continue;
      }
  
      move--;
  
      if (!gameboard.markCell(move, currentPlayer.marker)) {
        console.log('That cell is already occupied! Try again.');
        continue;
      }
  
      const winner = gameboard.checkWinner();
      if (winner) {
        displayBoard();
        if (winner === 'tie') {
          console.log('It\'s a tie!');
        } else {
          console.log(`${currentPlayer.name} wins!`);
        }
        break;
      }
  
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
  };
  
  startGame();


