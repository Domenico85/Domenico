const responsiveMenuBtn = document.querySelector("#menu-toggle-btn");

const navBarLinks = document.querySelector(".navbar-links");

responsiveMenuBtn.addEventListener("click", () => {
  navBarLinks.classList.toggle("open");
  responsiveMenuBtn.classList.toggle("open");
});
