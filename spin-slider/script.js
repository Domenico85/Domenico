document.addEventListener("DOMContentLoaded", function () {
  // When all images are loaded
  const slideshow = document.querySelector(".slideshow");
  const loader = document.querySelector(".loader");

  // Check if slideshow and loader exist
  console.log("Slideshow:", slideshow); // Should not be null
  console.log("Loader:", loader); // Should not be null

  imagesLoaded(slideshow, { background: true }, function () {
    // Hide loader
    if (loader) {
      loader.classList.add("is-loaded");
    } else {
      console.error("Loader element not found");
    }

    const navigation = document.querySelector(".navigation");
    const navigationItems = document.querySelectorAll(".navigation-item");
    const detailItems = document.querySelectorAll(".detail-item");

    // Check if navigation and detail items exist
    console.log("Navigation:", navigation);
    console.log("Navigation Items:", navigationItems);
    console.log("Detail Items:", detailItems);

    let rotation;
    let type = "_short"; // You can modify this for different rotation types

    // Prepare letters in headlines
    document.querySelectorAll(".headline").forEach(function (headline) {
      headline.innerHTML = headline.textContent.replace(
        /([^x00-x80]|\w)/g,
        "<span class='letter'>$&</span>"
      );
    });

    // Prepare navigation and set navigation items in the correct position
    navigationItems.forEach(function (elem, index) {
      TweenMax.set(elem, {
        left: navigation.offsetWidth / 2 - elem.offsetWidth / 2 - 10,
        rotation: 90 + (index * 360) / navigationItems.length,
        transformOrigin: "50% " + navigation.offsetWidth / 2 + "px",
      });

      const rotateHolder = elem.querySelector(".rotate-holder");
      const backgroundHolder = elem.querySelector(".background-holder");

      // Check for null targets
      if (rotateHolder) {
        TweenMax.set(rotateHolder, {
          text: String((index * 360) / navigationItems.length),
        });
      } else {
        console.error("Rotate holder not found for item", index);
      }

      if (backgroundHolder) {
        TweenMax.set(backgroundHolder, {
          rotation: -90 - (index * 360) / navigationItems.length,
        });
      } else {
        console.error("Background holder not found for item", index);
      }
    });

    // Set tween values on hover
    function setTweenValues(event) {
      rotation = Number(
        event.currentTarget.querySelector(".rotate-holder").textContent
      );
    }

    // Perform the tween animation
    function doTween(target) {
      const targetIndex = Array.from(navigationItems).indexOf(target);
      const timeline = new TimelineMax();

      // Add/remove "active" class from navigation and detail items
      navigationItems.forEach(function (item) {
        item.classList.remove("active");
        if (Array.from(navigationItems).indexOf(item) === targetIndex) {
          item.classList.add("active");
        }
      });

      detailItems.forEach(function (item) {
        item.classList.remove("active");
        if (Array.from(detailItems).indexOf(item) === targetIndex) {
          item.classList.add("active");
        }
      });

      const activeBackground = document.querySelector(".active .background");
      const activeLetters = document.querySelectorAll(".active .letter");

      if (!activeBackground) {
        console.error("Active background not found");
        return; // Prevent further execution
      }

      if (activeLetters.length === 0) {
        console.error("No letters found in the active item");
        return; // Prevent further execution
      }

      timeline
        .to(navigation, 0.6, {
          rotation: -rotation + type,
          transformOrigin: "50% 50%",
          ease: Sine.easeInOut,
        })
        .staggerTo(
          document.querySelectorAll(".background-holder"),
          0.6,
          {
            cycle: {
              rotation: function (index, element) {
                return (
                  -90 -
                  Number(element.previousElementSibling.textContent) +
                  rotation +
                  type
                );
              },
            },
            transformOrigin: "50% 50%",
            ease: Sine.easeInOut,
          },
          0,
          "-=0.6"
        )
        .staggerFromTo(
          activeLetters,
          0.3,
          { autoAlpha: 0, y: -100 },
          { autoAlpha: 1, y: 0, ease: Sine.easeInOut },
          0.025,
          "-=0.3"
        )
        .fromTo(
          activeBackground,
          0.9,
          { autoAlpha: 0, y: -100 },
          { autoAlpha: 1, y: 0, ease: Sine.easeInOut },
          0.05,
          "+=0.3"
        );
    }

    // Add event listeners for hover and click on navigation items
    navigationItems.forEach(function (item) {
      item.addEventListener("mouseenter", setTweenValues);
      item.addEventListener("click", function () {
        doTween(item);
      });
    });

    // On load, show the slideshow and the first "active" item
    TweenMax.to(slideshow, 1, { autoAlpha: 1 });
    TweenMax.to(
      document.querySelector(".active").querySelectorAll(".letter"),
      0.7,
      { autoAlpha: 1, y: 0 }
    );
    TweenMax.to(
      document.querySelector(".active").querySelector(".background"),
      0.7,
      { autoAlpha: 1, y: 0 }
    );
  });

  // Fast fix for resize window and refresh view (for demo purposes, not for production)
  let width = window.innerWidth;
  window.addEventListener("resize", function () {
    if (window.innerWidth !== width) {
      window.location.reload(true);
    }
  });
});
