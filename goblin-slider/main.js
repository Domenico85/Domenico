const listInfo = document.querySelector(".content-info");
const nextBtn = document.querySelector(".next-btn");
const listImg = document.querySelector(".slider-img");
const prevBtn = document.querySelector(".prev-btn");
const bgs = document.querySelectorAll(".bg");

let index = 0;
const totalSlides = 4;

function updateSlide() {
  listInfo.style.transform = `translateY(${index * -25}%)`;
  listImg.style.transform = `translateY(${index * -100}%)`;

  bgs.forEach((bg, idx) => {
    if (idx === index) {
      bg.classList.add("active");
    } else {
      bg.classList.remove("active");
    }
  });
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % totalSlides;
  updateSlide();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + totalSlides) % totalSlides;
  updateSlide();
});
