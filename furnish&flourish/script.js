document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { title: "Royal Reign", price: 525 },
    { title: "White Bliss", price: 642 },
    { title: "Natural Gold", price: 259 },
    { title: "Aqua Leads", price: 422 },
    { title: "Virgin Whites", price: 623 },
    { title: "Maroon Peace", price: 295 },
    { title: "Benjamin Bee", price: 458 },
    { title: "Black Marvel", price: 456 },
    { title: "Gold Grain", price: 509 },
  ];

  let productContainer = document.querySelector(".products-container");

  //   localStorage.setItem("products", JSON.stringify(products));

  // console.log(slideShow[i]);

  // let productTitle = JSON.parse(localStorage.getItem("products"))[i]["title"];
  // let productPrice = JSON.parse(localStorage.getItem("products"))[i]["price"];

  //1: calcular ancho disponible
  //2: calcular numeros imagenes
  //3: cuantas imgs ensenar
  //4: aplicar translateY para index

  products.forEach((product, index) => {
    let productTitle = product.title;
    let productPrice = product.price;
    let productTemplate = `
          <div class="product-list">
            <div class="product slideshow">
              <div class="product-img"><img src="img/products/${
                index + 1
              }.jpg"></div>
              <div class="product-section-1">
                <div class="product-title">${productTitle}</div>
                <div class="stars"></div>
              </div>
              <div class="product-section-2">
                <div class="box-p">Price:€ ${productPrice}.00</div>
                <div>
                  <button class="cart-btn">ADD TO CART</button>
                </div>
              </div>
            </div>
          </div>`;
    const newDiv = document.createElement("div");
    newDiv.innerHTML = productTemplate;
    productContainer.appendChild(newDiv);
  });

  let num = 0;
  let screenWidth = screen.width;
  let cardsDisplayed = parseInt(screenWidth / (300 + 100));
  let productLength = products.length;
  console.log(cardsDisplayed, productLength);
});
