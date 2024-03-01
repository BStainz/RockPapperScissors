const resultText = document.getElementById('result-text');
const choices = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;
const playerScoreText= document.getElementById('player-score');
const computerScoreText = document.getElementById('computer-score');
const roundText = document.getElementById('round-text');
let roundNumber = 1;
const totalRounds = 5;
let playerRoundWins = 0;
let computerRoundWins = 0;
let playerRoundWinsText = document.getElementById('player-round-wins');
let computerRoundWinsText = document.getElementById('computer-round-wins');
const overlay = document.getElementById('countdown-overlay');

const updateScore = () => {
    playerScoreText.textContent = playerScore
    computerScoreText.textContent = computerScore
};

const startCountdown = (callback) => {
    let countdown = 3;
    const message = document.getElementById('countdown-message');
    overlay.style.visibility = 'visible';
    message.textContent = `Next round in ${countdown}...`;
    const interval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            message.textContent = `Next round in ${countdown}...`;
        } else {
            clearInterval(interval);
            overlay.style.visibility = 'hidden';
            callback();
        }
    }, 1000);
};

const resetScores = () => {
    playerScore = 0;
    computerScore = 0;
    updateScore();
    document.getElementById('player-fist').src = "images/rockPlayer.png";
    document.getElementById('computer-fist').src = "images/rockBot.png";
};

const playRound = (playerChoice) => {
    const playerFist = document.getElementById('player-fist');
    const computerFist = document.getElementById('computer-fist');
    const buttons = document.querySelectorAll('.choice');

    buttons.forEach(button => {
        button.style.pointerEvents = 'none';
    });

    playerFist.src = "images/rockPlayer.png";
    computerFist.src = "images/rockBot.png";

    playerFist.classList.add('shaking');
    computerFist.classList.add('shaking');

    setTimeout(() => {
        playerFist.classList.remove('shaking');
        computerFist.classList.remove('shaking');
        playerFist.src = `images/${playerChoice}Player.png`;
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        computerFist.src = `images/${computerChoice}Bot.png`;

        if (playerChoice === computerChoice) {
            resultText.textContent = `It's a draw! Both chose ${playerChoice}.`;
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            resultText.textContent = `You win! ${playerChoice} beats ${computerChoice}.`;
            playerScore++;
        } else {
            resultText.textContent = `You lose! ${computerChoice} beats ${playerChoice}.`;
            computerScore++;
        }
        updateScore();

        if (playerScore === 2 || computerScore === 2) {
            if (playerScore === 2) {
                playerRoundWins++;
                playerRoundWinsText.textContent = `${playerRoundWins}`;
            } else {
                computerRoundWins++;
                computerRoundWinsText.textContent = `${computerRoundWins}`;
            }
            // Check if the game is won
            if (playerRoundWins === 3 || computerRoundWins === 3) {
                const winner = playerRoundWins > computerRoundWins ? 'Player' : 'Computer';
                const gameOverMessage = document.getElementById('game-over-message');
                overlay.style.visibility = 'visible';
                document.getElementById('countdown-message').style.display = 'none'; // Hide the countdown message
                gameOverMessage.style.display = 'block';
                gameOverMessage.innerHTML = `${winner} wins the game!<br>Final Score:<br>Player ${playerRoundWins} - Computer ${computerRoundWins}<br><button onclick="resetGame()">Reset Game</button>`;
            } else {
                roundNumber++;
                roundText.textContent = `Round ${roundNumber}`;
                resetScores();
                startCountdown(() => {
                    buttons.forEach(button => button.style.pointerEvents = 'auto');
                    resultText.textContent = 'Choose an option to start the game';
                });
            }
        } else {
            buttons.forEach(button => button.style.pointerEvents = 'auto');
        }
    }, 1500);
};
const resetGame = () => {
    resetScores(); // Reset player and computer scores
    roundNumber = 1;
    playerRoundWins = 0;
    computerRoundWins = 0;
    playerRoundWinsText.textContent = '0';
    computerRoundWinsText.textContent = '0';
    roundText.textContent = 'Round 1';
    resultText.textContent = 'Choose an option to start the game';
    const buttons = document.querySelectorAll('.choice');
    buttons.forEach(button => button.style.pointerEvents = 'auto');
    const overlay = document.getElementById('countdown-overlay');
    document.getElementById('countdown-message').style.display = 'block'; // Show the countdown message
    document.getElementById('game-over-message').style.display = 'none'; // Hide the game over message
    overlay.style.visibility = 'hidden';
    playerFist.src = "images/rockPlayer.png";
    computerFist.src = "images/rockBot.png";
};