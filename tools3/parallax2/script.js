let items = document.querySelectorAll(".allowActive");
let containerFluid = document.querySelector(".container-fluid");

containerFluid.addEventListener("scroll", () => {
  items.forEach((item) => {
    if (
      item.offsetTop - containerFluid.scrollTop <
      window.innerHeight * (3 / 4)
    ) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
});
