const hourElement = document.querySelector("#hour");
const minuteElement = document.querySelector("#minutes");
const secondElement = document.querySelector("#seconds");
const ampmElement = document.querySelector("#am-pm");

function updateClock() {
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  let second = new Date().getSeconds();
  let ampm = "AM";

  if (hour >= 12) {
    ampm = "PM";
    if (hour > 12) {
      hour -= 12;
    }
  }

  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;

  hourElement.innerText = hour;
  minuteElement.innerText = minute;
  secondElement.innerText = second;
  ampmElement.innerText = ampm;
  setTimeout(() => {
    updateClock();
  }, 1000);
}

updateClock();
