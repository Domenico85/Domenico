let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".close-shopping");
let list = document.querySelector(".list");
let listCart = document.querySelector(".list-cart");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});

closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
  { id: 1, name: "PRODUCT NAME 1", image: "1.PNG", price: 12 },
  { id: 2, name: "PRODUCT NAME 2", image: "2.PNG", price: 13 },
  { id: 3, name: "PRODUCT NAME 3", image: "3.PNG", price: 23 },
  { id: 4, name: "PRODUCT NAME 4", image: "4.PNG", price: 27 },
  { id: 5, name: "PRODUCT NAME 5", image: "5.PNG", price: 15 },
  { id: 6, name: "PRODUCT NAME 6", image: "6.PNG", price: 18 },
];

let listCarts = [];

function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
        <img src="img/${value.image}"/>
        <div class="title">${value.name}</div>
        <div class="price">${value.price.toLocaleString()} €</div>
        <button onclick="addToCart(${key})"> Add to Cart </button>
    `;
    list.appendChild(newDiv);
  });
}
initApp();

function addToCart(key) {
  if (listCarts[key] == null) {
    listCarts[key] = { ...products[key], quantity: 1 };
  }
  reloadCart();
}

function reloadCart() {
  listCart.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCarts.forEach((value, key) => {
    if (value != null) {
      let itemTotalPrice = value.price * value.quantity;
      totalPrice += itemTotalPrice;
      count += value.quantity;

      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
      <div><img src="img/${value.image}"/></div>
      <div>${value.name}</div>
      <div>${itemTotalPrice.toLocaleString()} €</div>
      <div>
          <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
          <div class="count">${value.quantity}</div>
          <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
      </div>    
      `;
      listCart.appendChild(newDiv);
    }
  });
  total.innerText = `${totalPrice.toLocaleString()} €`;
  quantity.innerText = count;
}

function changeQuantity(key, newQuantity) {
  if (newQuantity <= 0) {
    delete listCarts[key];
  } else {
    listCarts[key].quantity = newQuantity;
  }
  reloadCart();
}
