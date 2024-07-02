const hourElement = document.querySelector(".hour");
const minuteElement = document.querySelector(".minute");
const secondElement = document.querySelector(".second");

function updateClock() {
  const currentDate = new Date();
  //   setTimeout(updateClock, 1000);
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const second = currentDate.getSeconds();
  const hourDegree = (hour / 12) * 360 + (minute / 60) * 30;
  hourElement.style.transform = `rotate(${hourDegree}deg)`;
  const minuteDegree = (minute / 60) * 360 + (second / 60) * 6;
  minuteElement.style.transform = `rotate(${minuteDegree}deg)`;
  const secondDegree = (second / 60) * 360;
  secondElement.style.transform = `rotate(${secondDegree}deg)`;
}

setInterval(updateClock, 1000);
updateClock();
