const body = document.querySelector("body");

function setColor(name) {
  body.style.backgroundColor = name;
}
const greenButton = document.querySelector("#green");
const redButton = document.querySelector("#red");
const blueButton = document.querySelector("#blue");
const randomButton = document.querySelector("#random");

greenButton.addEventListener("click", () => setColor("green"));
redButton.addEventListener("click", () => setColor("red"));
blueButton.addEventListener("click", () => setColor("blue"));
randomButton.addEventListener("click", () => {
  const randomColor = getRandomColor();
  setColor(randomColor);
});

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
