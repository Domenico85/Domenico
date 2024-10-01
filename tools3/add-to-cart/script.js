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
    image: "jquery.png",
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
products = document.querySelector(".products");

function addItems() {
  ArrProducts.forEach((item, key) => {
    // console.log(item);
    let div = document.createElement("div");
    div.classList.add("item");

    div.innerHTML = `<img src="img/${item.image}" />`;

    products.appendChild(div);
  });
}
addItems();
