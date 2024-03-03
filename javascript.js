// rps-ui guide
// In our UI, the player should be able to play the game by clicking on buttons rather than typing their answer in a prompt.
// For now, remove the logic that plays exactly five rounds.
// Create three buttons, one for each selection. Add an event listener to the buttons that call your playRound function with the correct playerSelection every time a button is clicked. (you can keep the console.logs for this step)
// Add a div for displaying results and change all of your console.logs into DOM methods.
// Display the running score, and announce a winner of the game once one player reaches 5 points.
// You will likely have to refactor (rework/rewrite) your original code to make it work for this. That’s OK! Reworking old code is an important part of a programmer’s life.

const RANDMAX = 3;
const CHOICES = ["ROCK", "PAPER", "SCISSORS"];
const ROUNDS = 5;
let roundsPlayed = 0;
const score = new Map();
score.set('WINS', 0);
score.set('LOSSES', 0);
score.set('TIES', 0);

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
gameInfoContainer.appendChild(document.createElement('h3'));
gameInfoContainer.lastElementChild.innerText = "---ROUND 1---";

//this will provide an overview for each round
const roundOverviewText = document.createElement('p');
gameInfoContainer.appendChild(roundOverviewText);

//this will show the result for each round
const roundResultText = document.createElement('p');
gameInfoContainer.appendChild(roundResultText);

//this is for a static heading for the score
gameInfoContainer.appendChild(document.createElement('h3'));
gameInfoContainer.lastElementChild.innerText = "---SCORE---";

//this will contain the text for the score
const scoreText = document.createElement('p');
gameInfoContainer.appendChild(scoreText);

//this will present a winner after either the computer or user reaches 5 wins
gameInfoContainer.appendChild(document.createElement('h2'));

//this creates the individual text elements for score to make it easier to modify
score.forEach((value, key) => {
    scoreText.appendChild(document.createElement('span'));
    scoreText.lastElementChild.innerText = ` ${key}: `;
    scoreText.appendChild(document.createElement('span'));
    scoreText.lastElementChild.innerText = value;
})



// GAME SCRIPT
//returns a random integer between 0 and the randMax constant minus 1
function getRandNum() { return Math.floor(Math.random() * RANDMAX); }

//generates a random choice to use for the computer
function getComputerChoice() { return CHOICES[getRandNum()]; }

const incrementWins = () => {
    score.set("WINS", score.get("WINS") + 1);
    scoreText.childNodes.item(1).innerText = score.get("WINS");
    roundResultText.innerText = "You Win!";
}

const incrementLosses = () => {
    score.set("LOSSES", score.get("LOSSES") + 1);
    scoreText.childNodes.item(3).innerText = score.get("LOSSES");
    roundResultText.innerText = "You Lose...";
}

const incrementTies = () => {
    score.set("TIES", score.get("TIES") + 1);
    scoreText.childNodes.item(5).innerText = score.get("TIES");
    roundResultText.innerText = "A Tie.";
}

//plays one round of the game and returns the result
function playRound(playerChoice) {
    const compChoice = getComputerChoice();

    gameInfoContainer.childNodes.item(0).innerText = `---ROUND ${++roundsPlayed}---`;
    roundOverviewText.innerText = `The computer chose \"${compChoice}\" vs your \"${playerChoice}\"`;

    switch (playerChoice) {
        case "ROCK":
            switch (compChoice) {
                case "ROCK":
                    incrementTies();
                    break;
                case "PAPER":
                    incrementWins();
                    break;
                case "SCISSORS":
                    incrementLosses();
                    break;
            }
            break;
        case "PAPER":
            switch (compChoice) {
                case "ROCK":
                    incrementWins();
                    break;
                case "PAPER":
                    incrementTies();
                    break;
                case "SCISSORS":
                    incrementLosses();
                    break;
            }
            break;
        case "SCISSORS":
            switch (compChoice) {
                case "ROCK":
                    incrementLosses();
                    break;
                case "PAPER":
                    incrementWins();
                    break;
                case "SCISSORS":
                    incrementTies();
                    break;
            }
    }
    //present a winner once the user or the computer reaches 5 wins
    if (gameInfoContainer.lastElementChild.innerText == "") {
        if (score.get("WINS") == 5) {
            gameInfoContainer.lastElementChild.innerText = "You won the game! Congratulations!\nYou can keep playing if you want to";
        }
        else if (score.get("LOSSES") == 5) {
            gameInfoContainer.lastElementChild.innerText = "You lost the game... that's too bad.\nYou can keep playing if you want to";
        }
    }
}

// ADDING EVENTS TO BUTTONS

//calls playRound with the choice provided by the button's text content
const playRoundOnClick = (event) => {
    switch(event.srcElement.textContent) {
        case 'ROCK':
            playRound("ROCK");
            break;
        case 'PAPER':
            playRound("PAPER");
            break;
        case 'SCISSORS':
            playRound("SCISSORS");
            break;
        default:
            alert("ERROR: Failed to recognize which button was clicked!");
    }
}

buttonContainer.childNodes.forEach((button) => {
    button.addEventListener('click', playRoundOnClick);
})