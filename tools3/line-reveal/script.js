(function () {
  // Wait for the DOM to fully load
  setTimeout(init, 0);

  function init() {
    // Remove any loading state from the body
    document.body.classList.remove("loading");

    // Array of elements to watch for scroll entry
    const elements = [
      { id: "rev-1", color: "#07d89d" },
      { id: "rev-2", color: "#f8ae2c" },
      { id: "rev-3", color: "#3a3d98" },
      { id: "rev-4", color: "#f19872" },
    ];

    // Loop through each element, attach scroll monitor logic
    elements.forEach(({ id }) => {
      const element = document.getElementById(id); // Get the element by ID
      const watcher = scrollMonitor.create(element, -element.offsetHeight); // Create ScrollMonitor watcher

      watcher.enterViewport(() => {
        // Add 'reveal' class to media-image when the element enters the viewport
        const image = element.querySelector(".media-image");
        if (image) {
          image.classList.add("reveal");
        }

        // Optional: reveal block element if applicable
        const revealer = element.querySelector(".block-revealer__element");
        if (revealer) {
          revealer.classList.add("reveal");
        }

        // Destroy watcher after animation is triggered (if you only want it to run once)
        watcher.destroy();
      });
    });
  }
})();
