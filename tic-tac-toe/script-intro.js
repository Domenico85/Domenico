document.addEventListener("DOMContentLoaded", function () {
  var counter = 3;
  var delay = 2500;
  var displayTime = 6000;
  var redirectDelay = 2500;

  document.querySelector(".container-countdown").style.opacity = 0;

  setTimeout(function () {
    var timer = setInterval(function () {
      var countdown = document.getElementById("countdown");
      if (countdown) {
        countdown.remove();
      }

      countdown = document.createElement("span");
      countdown.id = "countdown";
      countdown.textContent = counter === 0 ? "Let's Start!" : counter;
      document.querySelector(".container-countdown").appendChild(countdown);

      setTimeout(function () {
        if (counter > -1) {
          countdown.style.fontSize = "40vw";
          countdown.style.opacity = 0;
        } else {
          countdown.style.fontSize = "10vw";
          countdown.style.opacity = 0.5;
        }
      }, 20);

      counter--;
      if (counter === -1) {
        clearInterval(timer);

        
        setTimeout(function() {
          window.location.href = "game.html";
        }, redirectDelay);
      }
    }, 1000);

    document.querySelector(".container-countdown").style.opacity = 1; // Changed to 1 for full opacity

    setTimeout(function () {
      document.querySelector(".container-countdown").style.opacity = 0;
    }, displayTime);
  }, delay);
});
