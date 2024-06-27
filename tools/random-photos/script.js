const imageContainerElement = document.querySelector(".image-container");

const btnElement = document.querySelector(".btn");

btnElement.addEventListener("click", () => {
  imageNumber = 10;
  addNewImages();
});

function addNewImages() {
  for (let index = 0; index < imageNumber; index++) {
    const newImgElement = document.createElement("img");
    newImgElement.src = `https://picsum.photos/300?random=${Math.floor(
      Math.random() * 2000
    )}`;
    imageContainerElement.appendChild(newImgElement);
  }
}
