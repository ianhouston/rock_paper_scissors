const RANDMAX = 3;
const CHOICES = ["rock", "paper", "scissors"];

//returns a random integer between 0 and the randMax constant minus 1
function getRandNum() { return Math.floor(Math.random(RANDMAX)); }

//generates a random choice to use for the computer
function getComputerChoice() { return CHOICES[getRandNum()]; }

//prompts the user for a choices until one from the CHOICES array is chosen (not case-sensitive)
function getPlayerChoice() {
    let playerChoice;

    playerChoice = (prompt("Play rock, paper, or scissors?")).toLowerCase();
    while (!(CHOICES.includes(playerChoice))) {
        playerChoice = (prompt("Invalid choice! Please check your spelling and try again.\nPlay rock, paper, or scissors?")).toLowerCase();
    }
    
    return playerChoice;
}

//plays one round of the game and returns the result
function playRound() {
    const playerChoice = getPlayerChoice();
    const compChoice = getComputerChoice();

    console.log(`The computer chose \"${compChoice}\" vs your \"${playerChoice}\"`);

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
//plays as many rounds of the game as is in the above const variable
// and finally returns the score for all the rounds afterwards
function playGame() {
    let score = [0, 0, 0]  //[wins, losses, ties]

    for (let i = 0; i < ROUNDS; i++) {
        console.log(`Starting round ${i+1}!`);
        switch (playRound()) {
            case 1:
                score[0]++;
                break;
            case 0:
                score[2]++;
                break;
            case -1:
                score [1]++;
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