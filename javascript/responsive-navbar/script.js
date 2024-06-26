const responsiveMenuBtn = document.querySelector("#menu-toggle-btn");

const navBarLinks = document.querySelector(".navbar-links");

responsiveMenuBtn.addEventListener("click", () => {
  navBarLinks.classList.toggle("open");
  responsiveMenuBtn.classList.toggle("open");
});

const allNavLinks = document.querySelectorAll(".navbar-links li");

allNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navBarLinks.classList.remove("open");
    responsiveMenuBtn.classList.remove("open");
  });
});
