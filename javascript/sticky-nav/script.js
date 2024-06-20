const navElement = document.querySelector("nav");
const navbarLinks = navElement.querySelectorAll("a");

const navPosition = navElement.getBoundingClientRect().top;

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  navElement.style.top = scrollPosition + "px";
});
