let productContainerWidth = document.querySelector(
  ".product-card-container"
).offsetWidth;
let productCardWidth = 260;
let productCardPerRow = Math.floor(productContainerWidth / productCardWidth);
let marginSpacing =
  (productContainerWidth - productCardPerRow * productCardWidth) /
  (productCardPerRow - 1);

let lastElement = productCardPerRow - 1;

let productSections = document.querySelectorAll(".product-section");
productSections.forEach((section) => {
  let productCards = section.querySelectorAll(".product-card");

  for (let i = 0; i < productCardPerRow && i < productCards.length; i++) {
    productCards[i].classList.add("active");

    if (i === lastElement) {
      productCards[i].style.marginRight = "0px";
    } else {
      productCards[i].style.marginRight = `${marginSpacing}px`;
    }
  }
});
