const textChanger = document.querySelector(".text-changer");
const texts = ["Hochwertig.", "Schnell.", "Unkompliziert."];
const colors = ["#f2c037", "#21ba45", "#1976d2"];
let index = 0;

function changeText() {
  textChanger.style.animation = "textSlide 1s forwards";

  setTimeout(() => {
    textChanger.textContent = texts[index];
    textChanger.style.color = colors[index];

    textChanger.style.animation = "";

    index = (index + 1) % texts.length;
  }, 1000);
}

setInterval(changeText, 3000);
