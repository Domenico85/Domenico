document.addEventListener("DOMContentLoaded", () => {
  function animateReveal(mediaInner, duration) {
    const imageEl = mediaInner.querySelector(".media-image");

    if (imageEl) {
      const revealerEl = document.createElement("div");
      revealerEl.className = "block-revealer";
      mediaInner.appendChild(revealerEl);

      anime({
        targets: revealerEl,
        scaleY: 1,
        duration: duration,
        easing: "easeInOutCirc",
        begin: function () {
          imageEl.classList.add("reveal");
        },
        complete: function () {
          setTimeout(() => {
            mediaInner.removeChild(revealerEl);
          }, 500);
        },
      });
    } else {
      console.error("media-image not found in element:", mediaInner);
    }
  }

  const elements = document.querySelectorAll(".media");

  elements.forEach((element) => {
    const mediaInner = element.querySelector(".media-inner");
    if (mediaInner) {
      const watcher = scrollMonitor.create(element, -element.offsetHeight);

      watcher.enterViewport(function () {
        animateReveal(mediaInner, 1000);
        watcher.destroy();
      });
    } else {
      console.error("media-inner not found in element:", element);
    }
  });
});
