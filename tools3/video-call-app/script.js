document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("button.mode-switch")
    .addEventListener("click", function () {
      document.body.classList.toggle("dark");
    });

  document
    .querySelector(".btn-close-right")
    .addEventListener("click", function () {
      document.querySelector(".right-side").classList.remove("show");
      document.querySelector(".expand-btn").classList.add("show");
    });

  document.querySelector(".expand-btn").addEventListener("click", function () {
    document.querySelector(".right-side").classList.add("show");
    this.classList.remove("show");
  });
});

const micOffButtons = document.querySelectorAll(".btn-mute");
const micOnButtons = document.querySelectorAll(".mic-on");

micOffButtons.forEach((micOff, index) => {
  const micOn = micOnButtons[index];

  micOff.addEventListener("click", () => {
    micOff.style.display = "none";
    micOn.style.display = "block";
  });

  micOn.addEventListener("click", () => {
    micOff.style.display = "block";
    micOn.style.display = "none";
  });
});

const cameraOffButtons = document.querySelectorAll(".btn-camera");
const cameraOnButtons = document.querySelectorAll(".btn-camera-on");

cameraOffButtons.forEach((cameraOff, index) => {
  const cameraOn = cameraOnButtons[index];

  if (cameraOn) {
    cameraOff.addEventListener("click", () => {
      cameraOff.style.display = "none";
      cameraOn.style.display = "block";
    });

    cameraOn.addEventListener("click", () => {
      cameraOff.style.display = "block";
      cameraOn.style.display = "none";
    });
  } else {
    console.error(`Camera on button not found for index ${index}`);
  }
});
