(function () {
  "use strict";

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

  hoverTargets.forEach(function (target) {
    target.addEventListener("mouseover", addHover);
    target.addEventListener("mouseout", removeHover);
  });

  document.addEventListener("DOMContentLoaded", function () {
    var caseStudyNames = document.querySelectorAll(".case-study-name");

    function showImage(index) {
      var activeName = document.querySelector(".case-study-name.active");
      var activeImage = document.querySelector(".case-study-images li.show");

      if (activeName) {
        activeName.classList.remove("active");
      }
      if (activeImage) {
        activeImage.classList.remove("show");
      }

      caseStudyNames[index].classList.add("active");
      document
        .querySelectorAll(".case-study-images li")
        [index].classList.add("show");
    }

    caseStudyNames.forEach(function (name, index) {
      name.addEventListener("mouseenter", function () {
        showImage(index);
      });
    });

    caseStudyNames[0].dispatchEvent(new Event("mouseenter"));
  });
})();