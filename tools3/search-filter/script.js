let list = document.getElementById("list");
let filter = document.querySelector(".filter");
let count = document.getElementById("count");
let listProducts = [
  {
    id: 1,
    name: "Name product white-black",
    price: 20.5,
    quantity: 0,
    image: "img/img1.jpg",
    nature: {
      color: ["white", "black"],
      size: ["S", "M", "L"],
      type: "T-shirt",
    },
  },
  {
    id: 2,
    name: "Name product white-black-grey",
    price: 30,
    quantity: 30,
    image: "img/img2.jpg",
    nature: {
      color: ["white", "black", "grey"],
      size: ["S", "M", "L"],
      type: "Polo",
    },
  },
  {
    id: 3,
    name: "Name product black",
    price: 20,
    quantity: 30,
    image: "img/img3.jpg",
    nature: {
      color: ["black"],
      size: ["S", "M", "L"],
      type: "T-shirt",
    },
  },
  {
    id: 4,
    name: "Name product blue-black",
    price: 40,
    quantity: 30,
    image: "img/img4.jpg",
    nature: {
      color: ["black", "blue"],
      size: ["S", "M", "L"],
      type: "T-shirt",
    },
  },
  {
    id: 5,
    name: "Name product brown",
    price: 32,
    quantity: 30,
    image: "img/img5.jpg",
    nature: {
      color: ["brown"],
      size: ["S", "M", "L"],
      type: "Polo",
    },
  },
  {
    id: 6,
    name: "Name product white-black",
    price: 10,
    quantity: 30,
    image: "img/img6.jpg",
    nature: {
      color: ["white", "black"],
      size: ["S", "M", "L"],
      type: "Shirt",
    },
  },
];
let productFilter = listProducts;
showProduct(productFilter);
function showProduct(productFilter) {
  count.innerText = productFilter.length;
  list.innerHTML = "";
  productFilter.forEach((item) => {
    let newItem = document.createElement("div");
    newItem.classList.add("item");

    let newImage = new Image();
    newImage.src = item.image;
    newItem.appendChild(newImage);

    let newTitle = document.createElement("div");
    newTitle.classList.add("title");
    newTitle.innerText = item.name;
    newItem.appendChild(newTitle);

    let newPrice = document.createElement("div");
    newPrice.classList.add("price");
    newPrice.innerText = item.price.toLocaleString() + " €";
    newItem.appendChild(newPrice);

    list.appendChild(newItem);
  });
}
filter.addEventListener("submit", function (event) {
  event.preventDefault();
  let valueFilter = event.target.elements;
  productFilter = listProducts.filter((item) => {
    if (valueFilter.category.value != "") {
      if (item.nature.type != valueFilter.category.value) {
        return false;
      }
    }

    if (valueFilter.color.value != "") {
      if (!item.nature.color.includes(valueFilter.color.value)) {
        return false;
      }
    }

    if (valueFilter.name.value != "") {
      if (!item.name.includes(valueFilter.name.value)) {
        return false;
      }
    }

    if (valueFilter.minPrice.value != "") {
      if (item.price < valueFilter.minPrice.value) {
        return false;
      }
    }

    if (valueFilter.maxPrice.value != "") {
      if (item.price > valueFilter.maxPrice.value) {
        return false;
      }
    }

    return true;
  });
  showProduct(productFilter);
});
