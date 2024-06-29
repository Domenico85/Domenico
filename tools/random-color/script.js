const containerElement = document.querySelector(".container");

for (let index = 0; index < 30; index++) {
  const colorContainerElement = document.createElement("div");
  colorContainerElement.classList.add("color-container");
  containerElement.appendChild(colorContainerElement);
}

const allColorContainerElement = document.querySelectorAll(".color-container");
console.log(allColorContainerElement);

generateColors();

function generateColors() {
  allColorContainerElement.forEach((colorContainerElement) => {
    const newColorCode = randomColor();
    // console.log(newColorCode);
    colorContainerElement.style.backgroundColor = "#" + newColorCode;
    colorContainerElement.innerText = "#" + newColorCode;
  });
}

function randomColor() {
  const characters = "0123456789abcdef";
  const colorCodeLength = 6;
  let colorCode = "";

  for (let index = 0; index < colorCodeLength; index++) {
    const randomNumber = Math.floor(Math.random() * characters.length);
    // console.log(randomNumber);
    colorCode += characters.substring(randomNumber, randomNumber + 1);
    // console.log(colorCode, randomNumber);
  }
  return colorCode;
}

randomColor();
