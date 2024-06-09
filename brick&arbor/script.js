document.addEventListener("DOMContentLoaded", function () {
  let headerElem = document.querySelector("header");
  let logo = document.getElementById("logo");
  let navMenu = document.getElementById("nav-menu");
  let navToggle = document.getElementById("nav-toggle");

  // Assuming you have included the slick carousel library and the slick function is available globally
  $("#properties-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<a href="#" class="slick-arrow slick-prev">previous</a>',
    nextArrow: '<a href="#" class="slick-arrow slick-next">next</a>',
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  });

  $("#testimonials-slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<a href="#" class="slick-arrow slick-prev"><</a>',
    nextArrow: '<a href="#" class="slick-arrow slick-next">></a>',
  });

  navToggle.addEventListener("click", function () {
    navMenu.style.right = "0";
  });

  document
    .getElementById("close-flyout")
    .addEventListener("click", function () {
      navMenu.style.right = "-100%";
    });

  document.addEventListener("click", function (e) {
    if (!e.target.closest("#nav-toggle") && !e.target.closest("#nav-menu")) {
      navMenu.style.right = "-100%";
    }
  });

  document.addEventListener("scroll", function () {
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollTop > 0) {
      navMenu.classList.add("is-sticky");
      logo.style.color = "#000";
      headerElem.style.background = "#fff";
      navToggle.style.borderColor = "#000";
      navToggle.querySelectorAll(".strip").forEach(function (strip) {
        strip.style.backgroundColor = "#000";
      });
    } else {
      navMenu.classList.remove("is-sticky");
      logo.style.color = "#fff";
      headerElem.style.background = "transparent";
      navToggle.style.borderColor = "#fff";
      navToggle.querySelectorAll(".strip").forEach(function (strip) {
        strip.style.backgroundColor = "#fff";
      });
    }

    if (scrollTop >= 200) {
      headerElem.style.padding = "0.5rem";
      headerElem.style.boxShadow = "0 -4px 10px 1px #999";
    } else {
      headerElem.style.padding = "1rem 0";
      headerElem.style.boxShadow = "none";
    }
  });

  // Trigger the scroll event manually
  let scrollEvent = new Event("scroll");
  document.dispatchEvent(scrollEvent);
});
