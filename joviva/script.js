const textChanger = document.querySelector(".text-changer");
const texts = ["Hochwertig.", "Schnell.", "Unkompliziert."];
const colors = ["#f2c037", "#21ba45", "#1976d2"];
let index = 0;

function changeText() {
  textChanger.style.animation = "textSlide 1s forwards";

  setTimeout(() => {
    index = (index + 1) % texts.length;
    textChanger.textContent = texts[index];
    textChanger.style.color = colors[index];

    textChanger.style.animation = "none";
    void textChanger.offsetWidth;
    textChanger.style.animation = "textSlide 1s forwards";
  }, 1000);
}

setInterval(changeText, 3000);

const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 10);

const countdownFunction = setInterval(() => {
  const now = new Date();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");

  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("timer").innerHTML = "Wir sind live!";
  }
}, 1000);
