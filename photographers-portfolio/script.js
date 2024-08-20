document.body.addEventListener("mousemove", function (event) {
  var cursor = document.getElementById("cursor");
  var cursor2 = document.getElementById("cursor2");
  var cursor3 = document.getElementById("cursor3");

  cursor.style.left = event.clientX + "px";
  cursor.style.top = event.clientY + "px";
  cursor2.style.left = event.clientX + "px";
  cursor2.style.top = event.clientY + "px";
  cursor3.style.left = event.clientX + "px";
  cursor3.style.top = event.clientY + "px";
});

var cursor = document.getElementById("cursor");
var cursor2 = document.getElementById("cursor2");
var cursor3 = document.getElementById("cursor3");

function addHover() {
  cursor2.classList.add("hover");
  cursor3.classList.add("hover");
}

function removeHover() {
  cursor2.classList.remove("hover");
  cursor3.classList.remove("hover");
}

removeHover();

var hoverTargets = document.querySelectorAll(".hover-target");
for (var a = hoverTargets.length - 1; a >= 0; a--) {
  addHoverListener(hoverTargets[a]);
}

function addHoverListener(target) {
  target.addEventListener("mouseover", addHover);
  target.addEventListener("mouseout", removeHover);
}

document.querySelectorAll(".about-text").forEach(function (element) {
  element.addEventListener("click", function () {
    document.body.classList.add("about-on");
  });
});

document.querySelectorAll(".about-close").forEach(function (element) {
  element.addEventListener("click", function () {
    document.body.classList.remove("about-on");
  });
});

document.querySelectorAll(".contact-text").forEach(function (element) {
  element.addEventListener("click", function () {
    document.body.classList.add("contact-on");
  });
});

document.querySelectorAll(".contact-close").forEach(function (element) {
  element.addEventListener("click", function () {
    document.body.classList.remove("contact-on");
  });
});
document.querySelectorAll(".travel").forEach(function (element) {
  element.addEventListener("click", function () {
    document.body.classList.add("travel-on");
  });
});

document.querySelectorAll(".travel-close").forEach(function (element) {
  element.addEventListener("click", function () {
    document.body.classList.remove("travel-on");
  });
});
document.querySelectorAll(".wildlife").forEach(function (element) {
  element.addEventListener("click", function () {
    document.body.classList.add("wildlife-on");
  });
});

document.querySelectorAll(".wildlife-close").forEach(function (element) {
  element.addEventListener("click", function () {
    document.body.classList.remove("wildlife-on");
  });
});
document.querySelectorAll(".nature").forEach(function (element) {
  element.addEventListener("click", function () {
    document.body.classList.add("nature-on");
  });
});

document.querySelectorAll(".nature-close").forEach(function (element) {
  element.addEventListener("click", function () {
    document.body.classList.remove("nature-on");
  });
});
