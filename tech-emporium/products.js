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

let wishListCount = document.querySelector("#wishlist-link span");
let heartBtn = document.querySelectorAll(".heart-btn");

heartBtn.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");

    wishListCount.innerHTML =
      document.querySelectorAll(".heart-btn.active").length;
  });
});

let cartCount = document.querySelector("#cart-link span");
let cartBtn = document.querySelectorAll(".product-card .add-to-chart");

cartBtn.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");

    if (button.innerHTML === "Add to Cart") {
      button.innerHTML = "Remove";
    } else if (button.innerHTML === "Remove") {
      button.innerHTML = "Add to Cart";
    } else {
      console.log("Error: Adding items to cart failed", button.innerHTML);
    }
    cartCount.innerHTML = document.querySelectorAll(
      ".add-to-chart.active"
    ).length;
  });
});

let slideshowButtons = document.querySelectorAll(".slideshow-buttons");
slideshowButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let slideshowSection = button.parentElement.dataset.slideshow;
    console.log(slideshowSection);

    let slideshowContainer = document.querySelector(
      `#product-section-${slideshowSection}`
    );
    console.log(slideshowContainer);

    let productCards = slideshowContainer.querySelectorAll(".product-card");

    if (button.classList.contains("prev-button")) {
      lastElement--;
    } else if (button.classList.contains("next-button")) {
      lastElement++;
    } else {
      console.log("Slideshow: Error occurred");
    }

    for (let i = 0; i < productCards.length; i++) {
      if (i <= lastElement && i >= lastElement - (productCardPerRow - 1)) {
        productCards[i].classList.add("active");

        if (i === lastElement) {
          productCards[i].style.marginRight = "0px";
        } else {
          productCards[i].style.marginRight = `${marginSpacing}px`;
        }
      } else {
        productCards[i].classList.remove("active");
        productCards[i].style.marginRight = "0px";
      }
    }
  });
});
