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
      <div class="answers">
        ${answers
          .map((answer) => `<button class="answer">${answer}</button>`)
          .join("")}
      </div>
    </div>
  `;
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
});

mediumBtn.addEventListener("click", () => {
  const category = categorySelect.value;
  const number = numberSelect.value;
  fetchTrivia("medium", category, number);
});

hardBtn.addEventListener("click", () => {
  const category = categorySelect.value;
  const number = numberSelect.value;
  fetchTrivia("hard", category, number);
});
