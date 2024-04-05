let options= ["rock", "paper","scissors"];


function getComputerChoice(){
    let randomNumber = Math.random();
    let randomArrNumber = randomNumber*options.length;
    let index = Math.floor(randomArrNumber);
    let randomElement = options[index];
    return randomElement
}
// getComputerChoice();

function playRound (playerSelection, computerSelection) {
    console.log(playerSelection);
    console.log(computerSelection);
    
    if (playerSelection == computerSelection) {
        let tieMessage = "You Tied";
        return tieMessage;
    } else if ((playerSelection == "rock" && computerSelection == "scissors") || 
               (playerSelection == "paper" && computerSelection == "rock") ||
               (playerSelection == "scissors" && computerSelection == "paper")) {
        let winMessage = "You Win! " + playerSelection + " beats " + computerSelection;
        return winMessage;
    } else {
        let looseMessage = "You Lose! " + computerSelection + " beats " + playerSelection;
        return looseMessage;
    }
}
    

const playerSelection = "rock";
const computerSelection = getComputerChoice();
let resultPlayRound = playRound(playerSelection, computerSelection);

console.log(resultPlayRound);