let options = ["rock", "paper", "scissors"];


function getComputerChoice() {
    let randomNumber = Math.random();
    let randomArrNumber = randomNumber * options.length;
    let index = Math.floor(randomArrNumber);
    let randomElement = options[index];
    return randomElement
}

function playerChoise() {
    // let userImput = prompt("").toLowerCase();
    return userImput;
}

function whoWins(playerSelection, computerSelection) {
    console.log(playerSelection); 
    console.log(computerSelection);

    if (playerSelection == computerSelection) {
        let result = undefined
        return result

    } else if ((playerSelection == "rock" && computerSelection == "scissors") ||
        (playerSelection == "paper" && computerSelection == "rock") ||
        (playerSelection == "scissors" && computerSelection == "paper")) {
        let result = "player"
        return result

    } else {

        let result = "computer"
        return result

    }
}

function playGame() {

    let playerWins = 0;
    let computerWins = 0;

    for (let i = 0; i < 5; i++) {
        let playerSelection = playerChoise();
        let computerSelection = getComputerChoice();
        let roundWinner = whoWins(playerSelection, computerSelection);
        console.log(`Marcador. Player ${playerWins} - Computer ${computerWins}`);
        if (roundWinner == "player") {
            playerWins++
            console.log("You win")
        }
        else if (roundWinner == "computer") {
            computerWins++
            console.log("You Loose")

        } else {
            i--;
        }

    }
    if (playerWins > computerWins) {
        return "You Win the game"
    }
    else if (playerWins < computerWins) {

        return "You Lost the game"
    }
    else {
        return "It's a Tie"
    }


}

console.log(playGame());