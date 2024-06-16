const target = Math.round(Math.random() * 100);
let guesses = 0;

const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
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
  }
});
