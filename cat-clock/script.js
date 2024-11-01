let wakeuptime = 7;
let noon = 12;
let lunchtime = 12;
let naptime = lunchtime + 2;
let partytime;
let evening = 18;

let showCurrentTime = function () {
  let clock = document.getElementById("clock");

  let currentTime = new Date();

  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
  let meridian = "AM";

  if (hours >= noon) {
    meridian = "PM";
  }

  if (hours > noon) {
    hours = hours - 12;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  let clockTime = hours + ":" + minutes + ":" + seconds + " " + meridian + "!";

  clock.innerText = clockTime;
};

let updateClock = function () {
  let time = new Date().getHours();
  let messageText;
  let image =
    "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/08/normalTime.jpg";

  let timeEventJS = document.getElementById("timeEvent");
  let lolcatImageJS = document.getElementById("lolcatImage");

  if (time == partytime) {
    image =
      "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/08/partyTime.jpg";
    messageText = "Let's party!";
  } else if (time == wakeuptime) {
    image =
      "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat1.jpg";
    messageText = "Wake up!";
  } else if (time == lunchtime) {
    image =
      "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat2.jpg";
    messageText = "Let's have some lunch!";
  } else if (time == naptime) {
    image =
      "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat3.jpg";
    messageText = "Sleep tight!";
  } else if (time < noon) {
    image =
      "https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg";
    messageText = "Good morning!";
  } else if (time >= evening) {
    image = "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cat_sleep.jpg";
    messageText = "Good evening!";
  } else {
    image =
      "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/08/normalTime.jpg";
    messageText = "Good afternoon!";
  }

  console.log(messageText);
  timeEventJS.innerText = messageText;
  lolcatImage.src = image;

  showCurrentTime();
};
updateClock();

let oneSecond = 1000;
setInterval(updateClock, oneSecond);

let partyButton = document.getElementById("partyTimeButton");

let partyEvent = function () {
  if (partytime < 0) {
    partytime = new Date().getHours();
    partyTimeButton.innerText = "Party Over!";
    partyTimeButton.style.backgroundColor = "#0A8DAB";
  } else {
    partytime = -1;
    partyTimeButton.innerText = "Party Time!";
    partyTimeButton.style.backgroundColor = "#222";
  }
};

partyButton.addEventListener("click", partyEvent);
partyEvent();

let wakeUpTimeSelector = document.getElementById("wakeUpTimeSelector");

let wakeUpEvent = function () {
  wakeuptime = wakeUpTimeSelector.value;
};

wakeUpTimeSelector.addEventListener("change", wakeUpEvent);

let lunchTimeSelector = document.getElementById("lunchTimeSelector");

let lunchEvent = function () {
  lunchtime = lunchTimeSelector.value;
};

lunchTimeSelector.addEventListener("change", lunchEvent);

let napTimeSelector = document.getElementById("napTimeSelector");

let napEvent = function () {
  naptime = napTimeSelector.value;
};

napTimeSelector.addEventListener("change", napEvent);
