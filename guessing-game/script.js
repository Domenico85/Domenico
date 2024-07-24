const words = [
  "java",
  "javascript",
  "python",
  "pascal",
  "ruby",
  "perl",
  "swift",
  "kotlin",
];

let randomIndex = Math.floor(Math.random() * words.length);
let selectedWord = words[randomIndex];
console.log(selectedWord);

let guessedList = [];

let displayWord = "";
for (let i = 0; i < selectedWord.length; i++) {
  displayWord += "_ ";
}
document.getElementById("displayWord").textContent = displayWord;

function guessLetter() {
  let inputElement = document.getElementById("letter-input");

  if (!inputElement.value) {
    alert("Empty Input box. Please add input letter");
    return;
  }

  let letter = inputElement.value.toLowerCase();

  inputElement.value = "";

  if (guessedList.includes(letter)) {
    alert("You have already guessed that letter!");
    return;
  }

  guessedList.push(letter);

  let updatedDisplay = "";
  let allLettersGuessed = true;
  for (let i = 0; i < selectedWord.length; i++) {
    if (guessedList.includes(selectedWord[i])) {
      updatedDisplay += selectedWord[i] + " ";
    } else {
      updatedDisplay += "_ ";
      allLettersGuessed = false;
    }
  }
  document.getElementById("displayWord").textContent = updatedDisplay;

  if (allLettersGuessed) {
    alert("Congratulations! You guessed the word correctly!");
  }
}
