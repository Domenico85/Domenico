const easyBtn = document.getElementById("easy");
const mediumBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");
const questionsContainer = document.querySelector(".questions");
const categorySelect = document.getElementById("categories");
const numberSelect = document.getElementById("number-question");

async function fetchTrivia(difficulty, category, number) {
  const apiUrl = `https://opentdb.com/api.php?amount=${number}&difficulty=${difficulty}&category=${category}`;

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

function generateQuestionHTML(questionObj, index, totalQuestions) {
  const answers = [...questionObj.incorrect_answers];
  answers.splice(
    Math.floor(Math.random() * (answers.length + 1)),
    0,
    questionObj.correct_answer
  );

  const questionNumber = index + 1;
  const questionCountText = `${questionNumber}/${totalQuestions}`;
  return `
  <div class="question" data-index="${index}">
    <h2>${questionObj.category}</h2>
    <p>${questionObj.question}</p>
    <p>${index + 1}/${totalQuestions}</p>
    <div class="answers">
      ${answers
        .map((answer) => `<button class="answer">${answer}</button>`)
        .join("")}
    </div>
  </div>
`;
}

function displayQuestions(questions) {
  let correctAnswersCount = 0;

  const totalQuestions = questions.length;
  questionsContainer.innerHTML = questions
    .map((question, index) =>
      generateQuestionHTML(question, index, totalQuestions)
    )
    .join("");

  const answerButtons = document.querySelectorAll(".answer");
  answerButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const selectedAnswer = event.target.textContent;
      const questionElement = event.target.closest(".question");
      const questionIndex = parseInt(questionElement.dataset.index);
      console.log("Question Index:", questionIndex);
      console.log("Questions:", questions);
      const correctAnswer = questions[questionIndex].correct_answer;
      console.log("Correct Answer:", correctAnswer);
      const feedbackText = document.createElement("p");
      feedbackText.classList.add("feedback");
      if (selectedAnswer === correctAnswer) {
        feedbackText.textContent = "Correct!";
        feedbackText.style.color = "green";
        correctAnswersCount++;
      } else {
        feedbackText.innerHTML = `<span class="incorrect">Incorrect.</span> The correct answer is: <span class="correct"> ${correctAnswer}</span>`;
      }
      questionElement.appendChild(feedbackText);

      const currentQuestionAnswerButtons =
        questionElement.querySelectorAll(".answer");
      currentQuestionAnswerButtons.forEach((btn) => {
        btn.disabled = true;
      });
      updateCorrectAnswersCount(correctAnswersCount);
    });
  });
}
function updateCorrectAnswersCount(count) {
  const correctAnswersCountElement = document.getElementById(
    "correct-answers-count"
  );
  correctAnswersCountElement.textContent = count;
}

function getCategoryList() {
  fetch("https://opentdb.com/api_category.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const categories = data.trivia_categories;
      const select = document.querySelector("#categories");

      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
      });
    })
    .catch((error) =>
      console.error("Error fetching the category list:", error)
    );
}

getCategoryList();

easyBtn.addEventListener("click", () => {
  const category = categorySelect.value;
  const number = numberSelect.value;
  fetchTrivia("easy", category, number);
  toogleButtons();
});

mediumBtn.addEventListener("click", () => {
  const category = categorySelect.value;
  const number = numberSelect.value;
  fetchTrivia("medium", category, number);
  toogleButtons();
});

hardBtn.addEventListener("click", () => {
  const category = categorySelect.value;
  const number = numberSelect.value;
  fetchTrivia("hard", category, number);
  toogleButtons();
});

const restartBtn = document.querySelector("#restartBtn");
restartBtn.addEventListener("click", () => {
  easyBtn.style.display = "block";
  mediumBtn.style.display = "block";
  hardBtn.style.display = "block";

  restartBtn.style.display = "none";

  questionsContainer.innerHTML = "";
});

function toogleButtons() {
  easyBtn.style.display = "none";
  mediumBtn.style.display = "none";
  hardBtn.style.display = "none";

  restartBtn.style.display = "block";
}
