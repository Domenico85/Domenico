document.getElementById("switch").addEventListener("click", function () {
  let body = document.body;
  let switchElement = document.getElementById("switch");

  if (body.classList.contains("slow-wind")) {
    body.classList.remove("slow-wind");
    switchElement.classList.remove("switched");
  } else {
    body.classList.add("slow-wind");
    switchElement.classList.add("switched");
  }
});
