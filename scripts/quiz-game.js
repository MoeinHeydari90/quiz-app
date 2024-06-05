document.getElementById("start-button").addEventListener("click", quizStarter);

function quizStarter() {
    // Get player names from inputs
    const firstPlayer = document.getElementById("firstPlayer").value;
    const secondPlayer = document.getElementById("secondPlayer").value;

    // Check that the input names are not the same
    if (firstPlayer === secondPlayer) {
        alert("Please enter two different names.");
    }
    // If the names are not the same then display quiz screen
    else if (firstPlayer && secondPlayer) {
        document.getElementById("firstPlayer-name").textContent = firstPlayer;
        document.getElementById("secondPlayer-name").textContent = secondPlayer;

        document.getElementById("start-screen").classList.add("hidden");
        document.getElementById("quiz-screen").classList.remove("hidden");
    }
    // If  the inputs are not filled yet
    else {
        alert("Please enter names for both players.");
    }
}
const firstPlayerPoints = document.getElementById("firstPlayer-points");
const secondPlayerPoints = document.getElementById("secondPlayer-points");

firstPlayerPoints.addEventListener("change", function () {
    const points = parseInt(this.value);
    checkWinner("firstPlayer", points);
});

secondPlayerPoints.addEventListener("change", function () {
    const points = parseInt(this.value);
    checkWinner("secondPlayer", points);
});

function firstPlayerPlus() {
    firstPlayerPoints.value = parseInt(firstPlayerPoints.value) + 1;
    checkWinner("firstPlayer-name", firstPlayerPoints.value);
}

function secondPlayerPlus() {
    secondPlayerPoints.value = parseInt(secondPlayerPoints.value) + 1;
    checkWinner("secondPlayer-name", secondPlayerPoints.value);
}

function checkWinner(player, points) {
    const playerNameElement = document.getElementById(player);
    const playerName = playerNameElement.textContent;

    if (points >= 10) {
        // To play the sound at the end of the game
        const winSound = document.getElementById("win-sound");
        winSound.play();

        const showWinner = document.getElementById("show-winner");

        document.getElementById("quiz-screen").classList.add("hidden");
        showWinner.classList.remove("hidden");
        showWinner.innerHTML = `<h1>${playerName} wins the game </h1>`;

        // Create the reset button
        const button = document.createElement("button");
        button.textContent = "reset game";
        button.classList.add("reset-btn");
        button.onclick = resetGame;
        showWinner.appendChild(button);
    }
}

// To clear every previous data for the next game
function resetGame() {
    firstPlayerPoints.value = 0;
    secondPlayerPoints.value = 0;
    document.getElementById("firstPlayer").value = "";
    document.getElementById("secondPlayer").value = "";
    document.getElementById("start-screen").classList.remove("hidden");
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("show-winner").innerHTML = "";
}
