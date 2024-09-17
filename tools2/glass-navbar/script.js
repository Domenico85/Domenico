let toggle = document.querySelector(".dot-container");
let container = document.querySelector(".container");

toggle.addEventListener("click", () => {
  container.classList.toggle("active");
});
