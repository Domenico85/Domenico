const addButtonElement = document.querySelector("#counterAdd");
const subButtonElement = document.querySelector("#counterSub");
const counterDisplayElement = document.querySelector("#counterDisplay");

let total = 0;
const limit = 20;

const updateCounterDisplay = () => {
  if (total > limit) {
    total = limit;
  }

  if (total < 0) {
    total = 0;
  }
  counterDisplayElement.textContent = total;
  document.body.style.setProperty(
    "background-color",
    `rgb(${(total / limit) * 255}, 64, 0)`
  );
};

addButtonElement.addEventListener("click", () => {
  total += 1;
  updateCounterDisplay();
});

subButtonElement.addEventListener("click", () => {
  total -= 1;
  updateCounterDisplay();
});

updateCounterDisplay();
