let product = {
  name: "T-Shirt LD02",
  description:
    "Comfort meets style with our T-Shirt LD02. Crafted from premium, breathable cotton, this shirt offers a perfect fit for everyday wear. Available in multiple vibrant colors and sizes, it’s designed to keep you looking sharp while staying comfortable all day long. Whether you’re dressing it up or keeping it casual, this T-shirt is a wardrobe essential.",
  image: "image.png",
  price: "100 ~ 200",
  children: [
    { color: "#fff", size: "M", price: 100 },
    { color: "#fff", size: "L", price: 120 },
    { color: "#fff", size: "XL", price: 170 },
    { color: "#810284", size: "M", price: 100 },
    { color: "#810284", size: "L", price: 120 },
    { color: "#810284", size: "XL", price: 170 },
    { color: "#9c2f46", size: "M", price: 140 },
    { color: "#9c2f46", size: "L", price: 120 },
    { color: "#9c2f46", size: "XL", price: 170 },
    { color: "#000", size: "M", price: 100 },
    { color: "#000", size: "L", price: 120 },
    { color: "#000", size: "XL", price: 170 },
    { color: "#07478f", size: "M", price: 100 },
    { color: "#07478f", size: "L", price: 120 },
    { color: "#07478f", size: "XL", price: 170 },
    { color: "#247207", size: "M", price: 100 },
    { color: "#247207", size: "L", price: 120 },
    { color: "#247207", size: "XL", price: 170 },
  ],
};
let title = document.getElementById("title");
let description = document.getElementById("description");
let image = document.getElementById("image");
let price = document.getElementById("price");
let colorHTML = document.getElementById("colors");
let sizeHTML = document.getElementById("sizes");

let option = {
  size: null,
  color: null,
};

const initApp = () => {
  title.innerText = product.name;
  description.innerText = product.description;
  price.innerText = product.price;

  // get colors
  let colors = product.children.map((product) => product.color);
  colors = Array.from(new Set(colors));
  if (colors.length > 0) {
    colors.forEach((color) => {
      let li = document.createElement("li");
      li.style.backgroundColor = color;
      li.setAttribute("data-color", color);
      colorHTML.appendChild(li);
      li.addEventListener("click", () => {
        option.color = option.color !== color ? color : null;
        refreshInfo();
      });
    });
  }
  // get sizes
  let sizes = product.children.map((product) => product.size);
  sizes = Array.from(new Set(sizes));
  if (sizes.length > 0) {
    sizes.forEach((size) => {
      let li = document.createElement("li");
      li.innerText = size;
      li.setAttribute("data-size", size);
      sizeHTML.appendChild(li);
      li.addEventListener("click", () => {
        option.size = option.size !== size ? size : null;
        refreshInfo();
      });
    });
  }
};
initApp();
const refreshInfo = () => {
  // colors
  colorOldActive = colorHTML.querySelector("li.active");
  if (colorOldActive) colorOldActive.classList.remove("active");
  if (option.color !== null) {
    let colorNewActive = colorHTML.querySelector(
      'li[data-color="' + option.color + '"]'
    );
    colorNewActive.classList.add("active");

    image.src = `img/${option.color.replace("#", "")}.jpg`;
  }
  // size
  sizeOldActive = sizeHTML.querySelector("li.active");
  if (sizeOldActive) sizeOldActive.classList.remove("active");
  if (option.size !== null) {
    let sizeNewActive = sizeHTML.querySelector(
      'li[data-size="' + option.size + '"]'
    );
    sizeNewActive.classList.add("active");
  }

  // set price
  if (option.size === null || option.color === null) {
    price.innerText = product.price;
  } else {
    let childFound = product.children.filter((product) => {
      return product.size == option.size && product.color == option.color;
    })[0];
    price.innerText = childFound.price;
  }
};

const sizeFitLink = document.querySelector("#size-fit-link");
const sizeText = document.querySelector("#size-text");
const descText = document.querySelector(".desc-text");

sizeFitLink.addEventListener("click", (event) => {
  event.preventDefault();

  descText.style.display = "none";
  sizeText.style.display = "block";
});

const descriptionLink = document.getElementById("desc-link");
descriptionLink.addEventListener("click", (event) => {
  event.preventDefault();

  descText.style.display = "block";
  sizeText.style.display = "none";
});

const footerLinks = document.querySelectorAll(".desc-footer a");

footerLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    footerLinks.forEach((l) => l.classList.remove("active"));

    this.classList.add("active");
  });
});
