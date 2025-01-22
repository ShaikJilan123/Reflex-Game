const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Purple'];
let score = 0;
let targetColor = getRandomColor(); // Initial random color
let missedClicks = 0;
let gameInterval;
let gameTimeLimit = 30; // Game lasts for 30 seconds
let timeLeft = gameTimeLimit;

const targetColorElement = document.getElementById('target-color');
const scoreElement = document.getElementById('score');
const timeLeftElement = document.getElementById('time-left');
const gameArea = document.getElementById('game-area');
const restartBtn = document.getElementById('restart-btn');
const gameOverElement = document.getElementById('game-over');

// Sound effects
const correctSound = new Audio('correct.mp3');
const incorrectSound = new Audio('incorrect.mp3');

// Function to get a random color from the colors array
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Display the target color
function updateTargetColor() {
    targetColor = getRandomColor(); // Change target color each time
    targetColorElement.textContent = targetColor;
}

// Generate a random shape
function generateShape() {
    const shapeColor = colors[Math.floor(Math.random() * colors.length)];
    const shape = document.createElement('div');
    shape.classList.add('shape');
    shape.style.backgroundColor = shapeColor;

    const maxWidth = gameArea.clientWidth - 50;
    const maxHeight = gameArea.clientHeight - 50;

    shape.style.left = Math.random() * maxWidth + 'px';
    shape.style.top = Math.random() * maxHeight + 'px';

    shape.addEventListener('click', () => {
        if (shapeColor === targetColor) {
            score++;
            correctSound.play();
        } else {
            missedClicks++;
            incorrectSound.play();
        }
        scoreElement.textContent = `Score: ${score}`;
        gameArea.removeChild(shape);

        if (missedClicks >= 3) {
            gameOver();
        }
    });

    gameArea.appendChild(shape);

    // Remove shape after a short duration
    setTimeout(() => {
        if (gameArea.contains(shape)) {
            gameArea.removeChild(shape);
        }
    }, 2000); // Shape disappears after 2 seconds
}

// Game Over logic
function gameOver() {
    clearInterval(gameInterval);
    document.getElementById('game-over').style.display = 'block';
    restartBtn.style.display = 'block';
}

// Start the game timer
function startGameTimer() {
    const timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = `Time: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
}

// Start the game
function startGame() {
    score = 0;
    missedClicks = 0;
    timeLeft = gameTimeLimit;
    gameArea.innerHTML = ''; // Clear any shapes on screen
    scoreElement.textContent = `Score: ${score}`;
    timeLeftElement.textContent = `Time: ${timeLeft}`;
    document.getElementById('game-over').style.display = 'none';
    restartBtn.style.display = 'none';
    
    updateTargetColor(); // Randomize target color at the start of each game

    gameInterval = setInterval(generateShape, 1000); // Generate new shapes every second
    startGameTimer();
}

// Restart the game
restartBtn.addEventListener('click', () => {
    startGame();
});

// Initialize the game
startGame();
