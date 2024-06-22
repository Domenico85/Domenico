const initialQuestions = [
  {
    label: "Friendliness",
    rating: 0,
  },
];

const storedQuestions = JSON.parse(localStorage.getItem("storedQuestions"));

const questions = storedQuestions || initialQuestions;

const makeStarRating = (question) => {
  const container = document.createElement("div");
  const label = document.createElement("label");
  label.textContent = question.label;
  container.appendChild(label);
  container.appendChild(makeStars(5, question));

  return container;
};

const makeStars = (maxValue, question) => {
  const starContainer = document.createElement("div");

  for (let starPosition = 1; starPosition <= maxValue; starPosition++) {
    const starElement = document.createElement("span");
    starContainer.appendChild(starElement);
    if (starPosition <= question.rating) {
      starElement.classList.add("filled");
    } else {
      starElement.classList.add("empty");
    }
  }

  return starContainer;
};

const ratingsElement = document.querySelector("#ratings");

questions.forEach((question) => {
  ratingsElement.appendChild(makeStarRating(question));
});
