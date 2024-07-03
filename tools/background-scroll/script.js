const bgImageElement = document.querySelector("#bg-image");

window.addEventListener("scroll", () => {
  updateImage();
});

function updateImage() {
  bgImageElement.style.opacity = 1 - window.scrollY / 900;
  console.log(window.scrollY / 900);
  bgImageElement.style.backgroundSize = 100 - window.scrollY / 12 + "%";
}
