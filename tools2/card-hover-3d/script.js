let items = document.querySelectorAll(".item");

items.forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    let rect = item.getBoundingClientRect();

    let positionPx = e.clientX - rect.left;
    let positionX = (positionPx / rect.width) * 100;

    let positionPy = e.clientY - rect.top;
    let positionY = (positionPy / rect.height) * 100;

    item.style.setProperty("--rX", 0.5 * (50 - positionY) + "deg");
    item.style.setProperty("--rY", -0.5 * (50 - positionX) + "deg");
  });

  item.addEventListener("mouseout", () => {
    item.style.setProperty("--rX", "0deg");
    item.style.setProperty("--rY", "0deg");
  });
});
