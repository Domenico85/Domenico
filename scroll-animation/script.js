const elements = document.querySelectorAll(".autoShow, .autoRotate, .autoBlur");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.5 }
);

elements.forEach((el) => observer.observe(el));
