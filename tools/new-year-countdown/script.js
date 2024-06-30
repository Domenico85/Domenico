const dayElement = document.querySelector("#day");
const hourElement = document.querySelector("#hour");
const minuteElement = document.querySelector("#minute");
const secondElement = document.querySelector("#second");

const newYearTime = new Date("Jan 1, 2025 00:00:00").getTime();

updateCountdown();

function updateCountdown() {
  const now = new Date().getTime();
  const gap = newYearTime - now;
  //   console.log(gap);
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const remainingDay = Math.floor(gap / day);
  //   console.log("Remaining Day:", remainingDay);
  const remainingHour = Math.floor((gap % day) / hour);
  //   console.log("Remaining Hour:", remainingHour);
  const remainingMinute = Math.floor((gap % hour) / minute);
  //   console.log("Remaining Minute:", remainingMinute);
  const remainingSecond = Math.floor((gap % minute) / second);
  //   console.log("Remaining Second:", remainingSecond);

  dayElement.innerText = remainingDay;
  hourElement.innerText = remainingHour;
  minuteElement.innerText = remainingMinute;
  secondElement.innerText = remainingSecond;

  setTimeout(updateCountdown, 1000);
}
