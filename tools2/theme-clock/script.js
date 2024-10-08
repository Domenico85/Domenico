const hourElement = document.querySelector(".hour");
const minuteElement = document.querySelector(".minute");
const secondElement = document.querySelector(".second");
const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");
const toggle = document.querySelector(".toggle");
const toggleFormat = document.querySelector(".toggle-format");

let is24HourFormat = false;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

toggle.addEventListener("click", (e) => {
  const html = document.querySelector("html");
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    e.target.innerHTML = "Dark mode";
  } else {
    html.classList.add("dark");
    e.target.innerHTML = "Light mode";
  }
});

toggleFormat.addEventListener("click", (e) => {
  is24HourFormat = !is24HourFormat;
  e.target.innerHTML = is24HourFormat ? "12-hour mode" : "24-hour mode";
});

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

const setTime = () => {
  const time = new Date();
  const date = time.getDate();
  const month = time.getMonth();
  const day = time.getDay();
  let hours = time.getHours();
  const hoursForClock = hours >= 13 ? hours % 12 : hours;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  if (!is24HourFormat) {
    hours = hoursForClock === 0 ? 12 : hoursForClock;
  }

  hourElement.style.transform = `translate(-50%, -100%) rotate(${scale(
    hoursForClock,
    0,
    11,
    0,
    360
  )}deg)`;
  minuteElement.style.transform = `translate(-50%, -100%) rotate(${scale(
    minutes,
    0,
    59,
    0,
    360
  )}deg)`;
  secondElement.style.transform = `translate(-50%, -100%) rotate(${scale(
    seconds,
    0,
    59,
    0,
    360
  )}deg)`;

  timeElement.innerHTML = is24HourFormat
    ? `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`
    : `${hoursForClock === 0 ? 12 : hoursForClock}:${
        minutes < 10 ? `0${minutes}` : minutes
      } ${ampm}`;

  dateElement.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
};

setTime();

setInterval(setTime, 1000);
