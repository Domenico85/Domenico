let target = Math.round(Math.random() * 100);
let guesses = 0;

const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const restartButton = document.getElementById("restartButton");
const feedback = document.getElementById("feedback");
const tries = document.getElementById("tries");

guessButton.addEventListener("click", function () {
  const guess = Number(guessInput.value);
  guesses++;

  if (guess > target) {
    feedback.textContent = "Your guess is too high.";
  } else if (guess < target) {
    feedback.textContent = "Your guess is too low.";
  } else {
    feedback.textContent = "You guessed it!";
    tries.textContent = `You guessed the number in ${guesses} tries!`;
    guessButton.disabled = true;
    guessInput.disabled = true;
    guessButton.style.display = "none";
    restartButton.style.display = "inline-block";
  }
});

restartButton.addEventListener("click", function () {
  target = Math.round(Math.random() * 100);
  guesses = 0;
  guessInput.value = "";
  feedback.textContent = "";
  tries.textContent = "";
  guessButton.disabled = false;
  guessInput.disabled = false;
  guessButton.style.display = "inline-block";
  restartButton.style.display = "none";
});
