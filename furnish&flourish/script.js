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
  x = JSON.parse(localStorage.getItem("products"));

  console.log(x);
});
