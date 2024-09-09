document.getElementById("switch").addEventListener("click", function () {
  var body = document.body;
  var switchElement = document.getElementById("switch");

  if (body.classList.contains("fire-off")) {
    body.classList.remove("fire-off");
    switchElement.classList.remove("switched");
  } else {
    body.classList.add("fire-off");
    switchElement.classList.add("switched");
  }
});
