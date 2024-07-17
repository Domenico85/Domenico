document.addEventListener("DOMContentLoaded", () => {
  const products = {
    0: { title: "Royal Reign", price: 525 },
    1: { title: "White Bliss", price: 642 },
    2: { title: "Natural Gold", price: 259 },
    3: { title: "Aqua Leads", price: 422 },
    4: { title: "Virgin Whites", price: 623 },
    5: { title: "Maroon Peace", price: 295 },
    6: { title: "Benjamin Bee", price: 458 },
    7: { title: "Black Marvel", price: 456 },
    8: { title: "Gold Grain", price: 509 },
  };

  localStorage.setItem("products", JSON.stringify(products));

  let productBox = document.querySelectorAll(".slideshow");

  for (let i = 0; i < productBox.length; i++) {
    console.log(productBox[i]);

    let productTitle = JSON.parse(localStorage.getItem("products"))[i]["title"];
    let productPrice = JSON.parse(localStorage.getItem("products"))[i]["price"];

    productBox[i].querySelector(".product-title").innerHTML = productTitle;
    productBox[i].querySelector(
      ".box-p"
    ).innerHTML = `Price: €${productPrice}.00`;
    productBox[i].querySelector(
      ".product-img"
    ).innerHTML = `<img src="img/products/${i + 1}.jpg">`;
  }

  let num = 0;
  let screenWidth = screen.width;
  let cardsDisplayed = parseInt(screenWidth / (300 + 100));
  let productList = document.querySelector(".slideshow");
  let productLength = productList.length;

  for (let i = num; i < num + cardsDisplayed; i++) {
    productList[i % productLength].style.display = "flex";
  }

  function nextSlide() {
    for (let i = num; i < num + cardsDisplayed; i++) {
      productList[i % productLength].style.display = "none";
    }

    num = num + cardsDisplayed;

    for (let i = num; i < num + cardsDisplayed; i++) {
      productList[i % productLength].style.display = "flex";
    }
  }
  setInterval(nextSlide, 5000);
});
