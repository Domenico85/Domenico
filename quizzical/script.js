const easyBtn = document.getElementById("easy");
const mediumBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");
const questionsContainer = document.querySelector(".questions");

async function fetchTrivia(difficulty) {
  const apiUrl = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`;

  try {
    const response = await fetch(apiUrl, { mode: "cors" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayQuestions(data.results);
  } catch (error) {
    console.error("Error fetching the trivia questions:", error);
  }
}

function displayQuestions(questions) {
  questionsContainer.innerHTML = questions
    .map((question) => generateQuestionHTML(question))
    .join("");
}

function generateQuestionHTML(questionObj) {
  const answers = [...questionObj.incorrect_answers];
  answers.splice(
    Math.floor(Math.random() * (answers.length + 1)),
    0,
    questionObj.correct_answer
  );

  return `
    <div class="question">
      <h2>${questionObj.category}</h2>
      <p>${questionObj.question}</p>
      ${answers
        .map((answer) => `<button class="answer">${answer}</button>`)
        .join("")}
    </div>
  `;
}

easyBtn.addEventListener("click", () => fetchTrivia("easy"));
mediumBtn.addEventListener("click", () => fetchTrivia("medium"));
hardBtn.addEventListener("click", () => fetchTrivia("hard"));
