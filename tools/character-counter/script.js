const textareaElement = document.querySelector("#textarea");
const totalCounterElement = document.querySelector("#total-counter");
const remainingCounterElement = document.querySelector("#remaining-counter");

textareaElement.addEventListener("keyup", () => {
  //   console.log("key is pressed");
  updateCounter();
});

updateCounter();

function updateCounter() {
  totalCounterElement.innerText = textareaElement.value.length;
  remainingCounterElement.innerText =
    textareaElement.getAttribute("maxLength") - textareaElement.value.length;
}
