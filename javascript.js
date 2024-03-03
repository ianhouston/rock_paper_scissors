// rps-ui guide
// In our UI, the player should be able to play the game by clicking on buttons rather than typing their answer in a prompt.
// For now, remove the logic that plays exactly five rounds.
// Create three buttons, one for each selection. Add an event listener to the buttons that call your playRound function with the correct playerSelection every time a button is clicked. (you can keep the console.logs for this step)
// Add a div for displaying results and change all of your console.logs into DOM methods.
// Display the running score, and announce a winner of the game once one player reaches 5 points.
// You will likely have to refactor (rework/rewrite) your original code to make it work for this. That’s OK! Reworking old code is an important part of a programmer’s life.

const RANDMAX = 3;
const CHOICES = ["ROCK", "PAPER", "SCISSORS"];
const score = new Map();
score.set('WINS', 0);
score.set('LOSSES', 0);
score.set('TIES', 0);
/* let score = {
    "wins" : 0,
    "losses" : 0,
    "ties" : 0
} */

// DOM MANIPULATION
const body = document.querySelector('body');

//appending container for buttons to body
const buttonContainer = document.createElement('div');
body.appendChild(buttonContainer);
buttonContainer.setAttribute('style', 'margin: auto; margin-top: 30px; gap: 36px; display: flex');

//creating buttons
CHOICES.forEach((choice) => {
    buttonContainer.appendChild(document.createElement('button'));
    buttonContainer.lastElementChild.classList.add('button');
    buttonContainer.lastElementChild.innerText = choice;
});

//appending container for results and running score
const gameInfoContainer = document.createElement('div');
body.appendChild(gameInfoContainer);
gameInfoContainer.setAttribute('style', 'margin: auto; margin-top: 50px; display: flex; flex-direction: column; align-items: center;');

//creating results and running score elements
gameInfoContainer.appendChild(document.createElement('p'));
gameInfoContainer.lastElementChild.innerText = "---ROUND 1---";

const roundResultText = document.createElement('p');
gameInfoContainer.appendChild(roundResultText);

gameInfoContainer.appendChild(document.createElement('p'));
gameInfoContainer.lastElementChild.innerText = "---SCORE---";

const scoreText = document.createElement('p');
gameInfoContainer.appendChild(scoreText);

score.forEach((value, key) => {
    scoreText.appendChild(document.createElement('span'));
    scoreText.lastElementChild.innerText = ` ${key}: `;
    scoreText.appendChild(document.createElement('span'));
    scoreText.lastElementChild.innerText = value;
})



// GAME SCRIPT
//returns a random integer between 0 and the randMax constant minus 1
function getRandNum() { return Math.floor(Math.random(RANDMAX)); }

//generates a random choice to use for the computer
function getComputerChoice() { return CHOICES[getRandNum()]; }

//prompts the user for a choices until one from the CHOICES array is chosen (not case-sensitive)
function getPlayerChoice() {
    let playerChoice;

    playerChoice = (prompt("Play rock, paper, or scissors?")).toUpperCase();
    while (!(CHOICES.includes(playerChoice))) {
        playerChoice = (prompt("Invalid choice! Please check your spelling and try again.\nPlay rock, paper, or scissors?")).toUpperCase();
    }
    
    return playerChoice;
}

//plays one round of the game and returns the result
function playRound() {
    const playerChoice = getPlayerChoice();
    const compChoice = getComputerChoice();

    console.log(`The computer chose \"${compChoice}\" vs your \"${playerChoice}\"`);

    switch (playerChoice) {
        case "ROCK":
            switch (compChoice) {
                case "ROCK":
                    console.log("A Tie.");
                    return 0;
                case "PAPER":
                    console.log("You Win!");
                    return 1;
                case "SCISSORS":
                    console.log("You Lose...");
                    return -1;
            }
        case "PAPER":
            switch (compChoice) {
                case "ROCK":
                    console.log("You Win!");
                    return 1;
                case "PAPER":
                    console.log("A Tie.");
                    return 0;
                case "SCISSORS":
                    console.log("You Lose...");
                    return -1;
            }
        case "SCISSORS":
            switch (compChoice) {
                case "ROCK":
                    console.log("You Lose...");
                    return -1;
                case "PAPER":
                    console.log("You Win!");
                    return 1;
                case "SCISSORS":
                    console.log("A Tie.");
                    return 0;
            }
    }
}

const ROUNDS = 5;
//plays as many rounds of the game as is in the above const variable
// and finally returns the score for all the rounds afterwards
function playGame() {
    for (let i = 0; i < ROUNDS; i++) {
        console.log(`Starting round ${i+1}!`); // DELETE THIS
        gameInfoContainer.childNodes.item(0).innerText = `---ROUND ${i+1}---`;
        switch (playRound()) {
            case 1:
                score.set("WINS", score.get("WINS") + 1);
                scoreText.childNodes.item(1).innerText = score.get("WINS");
                break;
            case 0:
                score.set("LOSSES", score.get("LOSSES") + 1);
                scoreText.childNodes.item(3).innerText = score.get("LOSSES");
                break;
            case -1:
                score.set("TIES", score.get("TIES") + 1);
                scoreText.childNodes.item(5).innerText = score.get("TIES");
                break;
        }
    }

    console.log(`All ${ROUNDS} rounds are finished.\nYour score is ${score.get("WINS")} wins, ${score.get("LOSSES")} losses, and ${score.get("TIES")} ties.`);
    if (score["WINS"] > score["LOSSES"]) {
        console.log("You won the game! Congrats!");
    }
    else if (score["WINS"] < score["LOSSES"]) {
        console.log("You Lost the game... Sorry.");
    }
    else {
        console.log("You both tied for score.");
    }
}