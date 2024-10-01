let ArrProducts = [
  {
    id: 1,
    name: "HTML",
    image: "html.png",
    price: "100",
    rating: 5,
  },
  {
    id: 2,
    name: "CSS",
    image: "css.png",
    price: "100",
    rating: 4,
  },
  {
    id: 3,
    name: "JavaScript",
    image: "js.png",
    price: "500",
    rating: 5,
  },
  {
    id: 4,
    name: "jQUERY",
    image: "jquery2.png",
    price: "200",
    rating: 3,
  },
  {
    id: 5,
    name: "React",
    image: "react.png",
    price: "800",
    rating: 5,
  },
  {
    id: 6,
    name: "Angular",
    image: "angular.png",
    price: "650",
    rating: 5,
  },
];

const body = document.querySelector("body");
let products = document.querySelector(".products");
let shoppingBasket = document.querySelector(".shopping-basket");
const close = document.querySelector(".close");
let productList = document.querySelector(".product-list");
let quantity = document.querySelector(".quantity");
let total = document.querySelector(".total");
let cart = document.querySelector(".cart");

let checkOutList = [];

shoppingBasket.addEventListener("click", () => {
  body.classList.add("active");
});

close.addEventListener("click", () => {
  body.classList.remove("active");
});

document.addEventListener("click", (event) => {
  if (
    !cart.contains(event.target) &&
    !shoppingBasket.contains(event.target) &&
    body.classList.contains("active")
  ) {
    if (!event.target.classList.contains("quantity-btn")) {
      body.classList.remove("active");
    }
  }
});

function addItems() {
  ArrProducts.forEach((item, key) => {
    // console.log(item);
    let div = document.createElement("div");
    div.classList.add("item");

    let star = "";
    for (i = 0; i < item.rating; i++) {
      //   console.log(i);
      star += `<i class="fa-solid fa-star"></i>`;
    }

    div.innerHTML = `<img src="img/${item.image}" />
    <div class="name">${item.name}</div>
    <div class="stars">${star}
    <div class="price">${item.price}<small>€</small></div>
    <button onclick="addToCart(${key})"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
    `;

    products.appendChild(div);
  });
}
addItems();

function addToCart(Id) {
  //   console.log(ArrProducts[Id]);
  if (checkOutList[Id] == null) {
    checkOutList[Id] = ArrProducts[Id];
    checkOutList[Id].quantity = 1;
  } else {
    checkOutList[Id].quantity += 1;
  }
  reloadCart();
}

function reloadCart() {
  productList.innerHTML = "";
  let count = 0;
  let totalPrice = 0;

  checkOutList.forEach((item, key) => {
    totalPrice += parseInt(item.price * item.quantity);
    count += item.quantity;

    // console.log(item);
    let li = document.createElement("li");
    li.innerHTML = `
    <img src="img/${item.image}" />
      <div>${item.name}</div>
      <div>${item.price}</div>
      <div>
      <button class="quantity-btn" onclick="changeQuantity(${key},${
      item.quantity - 1
    })">-</button>
      <div class="count">${item.quantity}</div>
      <button class="quantity-btn" onclick="changeQuantity(${key},${
      item.quantity + 1
    })">+</button>
      </div>
    `;

    productList.appendChild(li);
  });

  total.innerHTML =
    `<small>Subtotal <br> (${count} items)</small>€` + totalPrice;
  quantity.innerHTML = count;

  document.querySelectorAll(".quantity-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
}

function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete checkOutList[key];
  } else {
    checkOutList[key].quantity = quantity;
  }
  reloadCart();
}
