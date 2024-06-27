const inputElement = document.querySelector(".input");

const bodyElement = document.querySelector("body");

inputElement.checked = true;

updateBody();

function updateBody() {
  if (inputElement.checked) {
    bodyElement.style.background = "black";
  } else {
    bodyElement.style.background = "white";
  }
}

inputElement.addEventListener("input", () => {
  updateBody();
});
