let secretNumber;
let attempts;
const gameContainer = document.querySelector(".container");

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function initGame() {
    secretNumber = getRandomNumber(1, 100);
    attempts = 10;
    updateAttemptsDisplay();
}

function checkGuess() {
    const userGuessInput = document.getElementById("userGuess");
    const userGuess = parseInt(userGuessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        showMessage("Inserisci un numero valido tra 1 e 100.", "red");
        return;
    }

    attempts--;

    if (userGuess === secretNumber) {
        showMessage("Congratulazioni! Hai indovinato il numero!", "green");
    } else {
        const message = userGuess < secretNumber ? "Troppo basso!" : "Troppo alto!";
        showMessage(message, "red");
    }

    updateAttemptsDisplay();

    if (attempts === 0) {
        showMessage(`Hai esaurito tutti i tentativi. Il numero segreto era ${secretNumber}.`, "red");
        //disableInputAndButtons('check');
        //resetGame();
    }
}

function updateAttemptsDisplay() {
    document.getElementById("remainingAttempts").textContent = attempts;
}

function showMessage(message, color) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.style.color = color;
}

function disableInputAndButtons() {
    document.getElementById("userGuess").disabled = true;
    document.getElementById("check").disabled = true;
    document.getElementById("new").disabled = true;
}

function resetGame() {
    const userGuessInput = document.getElementById("userGuess");
    userGuessInput.value = "";
    userGuessInput.disabled = false;

    document.getElementById("check").disabled = false;
    document.getElementById("new").disabled = false;

    initGame();
    showMessage("", "black");
}

document.getElementById("check").addEventListener("click", checkGuess);
document.getElementById("new").addEventListener("click", resetGame);

window.onload = initGame;

