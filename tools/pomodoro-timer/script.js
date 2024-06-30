const startElement = document.querySelector("#start");
const stopElement = document.querySelector("#stop");
const resetElement = document.querySelector("#reset");
const timerElement = document.querySelector("#timer");

let interval;
let timeLeft = 10;

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  timerElement.innerHTML = formattedTime;
}

function startTimer() {
  interval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft === 0) {
      clearInterval(interval);
      playAlertSound();
      alert("Time's up!");
      timeLeft = 1500;
      updateTimer();
    }
  }, 1000);
}

function playAlertSound() {
  const alertSound = document.querySelector("#alert");
  alertSound.play();
}

const alertSound = document.querySelector("#alert");
alertSound.addEventListener("ended", () => {
  alertSound.currentTime = 0;
});

function stopTimer() {
  clearInterval(interval);
}
function resetTimer() {
  clearInterval(interval);
  timeLeft = 1500;
  updateTimer();
}

startElement.addEventListener("click", startTimer);
stopElement.addEventListener("click", stopTimer);
resetElement.addEventListener("click", resetTimer);

updateTimer();
