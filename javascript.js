const RANDMAX = 3;
const CHOICES = ["rock", "paper", "scissors"];

//returns a random integer between 0 and the randMax constant minus 1
function getRandNum() { return Math.floor(Math.random(RANDMAX)); }

function getComputerChoice() { return CHOICES[getRandNum()]; }

function getPlayerChoice() {
    let playerChoice;

    playerChoice = (prompt("Play rock, paper, or scissors?")).toLowerCase;
    while (!(playerChoice in CHOICES)) {
        playerChoice = (prompt("Invalid choice! Please check your spelling and try again.\nPlay rock, paper, or scissors?")).toLowerCase;
    }
    
    return playerChoice;
}

function playRound() {
    const playerChoice = getPlayerChoice();
    const compChoice = getComputerChoice();

    switch (playerChoice) {
        case "rock":
            switch (compChoice) {
                case "rock":
                    console.log("A Tie.");
                    return 0;
                case "paper":
                    console.log("You Win!");
                    return 1;
                case "scissors":
                    console.log("You Lose...");
                    return -1;
            }
        case "paper":
            switch (compChoice) {
                case "rock":
                    console.log("You Win!");
                    return 1;
                case "paper":
                    console.log("A Tie.");
                    return 0;
                case "scissors":
                    console.log("You Lose...");
                    return -1;
            }
        case "scissors":
            switch (compChoice) {
                case "rock":
                    console.log("You Lose...");
                    return -1;
                case "paper":
                    console.log("You Win!");
                    return 1;
                case "scissors":
                    console.log("A Tie.");
                    return 0;
            }
    }
}

const ROUNDS = 5;

function playGame() {
    let score = [0, 0, 0]  //[wins, losses, ties]

    for (let i = 0; i < ROUNDS; i++) {
        console.log(`Starting round ${i+1}!`);
        switch (playRound()) {
            case 1:
                score[0]++;
                break;
            case 0:
                score[1]++;
                break;
            case -1:
                score [2]++;
                break;
        }
    }

    console.log(`All ${ROUNDS} rounds are finished.\nYour score is ${score[0]} wins, ${score[1]} losses, and ${score[2]} ties.`);
    if (score[0] > score[1]) {
        console.log("You won the game! Congrats!");
    }
    else if (score[0] < score[1]) {
        console.log("You Lost the game... Sorry.");
    }
    else {
        console.log("You both tied for score.");
    }
}