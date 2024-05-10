function showMenu() {
  toggle = document.querySelectorAll(".toggle")[0];
  nav = document.querySelectorAll("nav")[0];
  toggle_open_text = "Menu";
  toggle_close_text = "Close";

  toggle.addEventListener(
    "click",
    function () {
      nav.classList.toggle("open");

      if (nav.classList.contains("open")) {
        toggle.innerHTML = toggle_close_text;
      } else {
        toggle.innerHTML = toggle_open_text;
      }
    },
    false
  );

  setTimeout(function () {
    nav.classList.toggle("open");
  }, 800);
}
showMenu();

const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
  if (slides.length > 0) {
    slides[slideIndex].classList.add("displaySlide");
    intervalId = setInterval(nextSlide, 5000);
  }
}

function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  slides.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });
  slides[slideIndex].classList.add("displaySlide");

  const dots = document.querySelectorAll(".carousel-dot");
  dots.forEach((dot) => dot.classList.remove("active"));

  const activeDot = document.querySelector(
    `.carousel-dot[data-index="${slideIndex}"]`
  );
  if (activeDot) {
    activeDot.classList.add("active");
  }
}

function prevSlide() {
  clearInterval(intervalId);
  slideIndex--;
  showSlide(slideIndex);
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

function setupCarouselDots() {
  document.addEventListener("DOMContentLoaded", function () {
    const dotsContainer = document.querySelector(".carousel-dots");
    slides.forEach((slide, index) => {
      const dot = document.createElement("li");
      dot.classList.add("carousel-dot");
      dot.setAttribute("data-index", index);
      dotsContainer.appendChild(dot);
    });
    dotsContainer.addEventListener("click", function (event) {
      if (event.target.classList.contains("carousel-dot")) {
        const index = parseInt(event.target.getAttribute("data-index"));
        goToSlide(index);
      }
    });

    function goToSlide(index) {
      clearInterval(intervalId);
      slideIndex = index;
      showSlide(slideIndex);
      intervalId = setInterval(nextSlide, 5000);
    }
  });
}
setupCarouselDots();
