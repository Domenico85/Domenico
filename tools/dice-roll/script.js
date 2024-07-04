const btnElement = document.querySelector("#roll-btn");
const diceElement = document.querySelector("#dice");
const rollHistoryElement = document.querySelector("#roll-history");

let historyList = [];

function rollDice() {
  const rollResult = Math.floor(Math.random() * 6) + 1;
  console.log(rollResult);
  const diceFace = getDiceFace(rollResult);
  diceElement.innerHTML = diceFace;
  historyList.push(rollResult);
  updateRollHistory();
}

function updateRollHistory() {
  rollHistoryElement.innerHTML = "";
  for (let i = 0; i < historyList.length; i++) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `Roll ${i + 1}: <span>${getDiceFace(
      historyList[i]
    )}</span>`;
    rollHistoryElement.appendChild(listItem);
  }
}

function getDiceFace(rollResult) {
  switch (rollResult) {
    case 1:
      return "&#9856;";
    case 2:
      return "&#9857;";
    case 3:
      return "&#9858;";
    case 4:
      return "&#9859;";
    case 5:
      return "&#9860;";
    case 6:
      return "&#9861;";
    default:
      return "";
  }
}

btnElement.addEventListener("click", () => {
  //   console.log("clicked");
  diceElement.classList.add("roll-animation");
  setTimeout(() => {
    diceElement.classList.remove("roll-animation");
    rollDice();
  }, 1000);
});
