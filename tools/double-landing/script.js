const containerElement = document.querySelector(".container");
const leftElement = document.querySelector(".left");
const rightElement = document.querySelector(".right");

leftElement.addEventListener("mouseover", () => {
  containerElement.classList.add("active-left");
});

leftElement.addEventListener("mouseleave", () => {
  containerElement.classList.remove("active-left");
});

rightElement.addEventListener("mouseover", () => {
  containerElement.classList.add("active-right");
});

rightElement.addEventListener("mouseleave", () => {
  containerElement.classList.remove("active-right");
});
