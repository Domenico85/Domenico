// Aspetta che il DOM sia completamente caricato
console.log("Script.js caricato correttamente!");

window.addEventListener("DOMContentLoaded", function () {
  console.log("DOM pronto, inizializzo...");

  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    console.log("Menu toggle trovato");
    menuToggle.addEventListener("click", function () {
      console.log("Click sul menu toggle");
      mainNav.classList.toggle("active");
      const icon = menuToggle.querySelector("i");
      if (icon) {
        if (mainNav.classList.contains("active")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-times");
        } else {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });
  } else {
    console.error("Menu toggle o mainNav non trovati!");
  }

  // 2. Smooth Scrolling
  const anchors = document.querySelectorAll('a[href^="#"]');
  console.log("Trovati " + anchors.length + " link interni");

  anchors.forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      console.log("Click su link: " + targetId);

      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        console.log("Scrolling verso: " + targetId);
        target.scrollIntoView({ behavior: "smooth", block: "start" });

        // Chiudi menu mobile
        if (mainNav && mainNav.classList.contains("active")) {
          mainNav.classList.remove("active");
          const icon = menuToggle.querySelector("i");
          if (icon) {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
          }
        }
      }
    });
  });

  // 3. Animazioni allo scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".animate-fade, .car-card, .testimonial-card, .feature",
  );
  console.log("Elementi da animare: " + animatedElements.length);

  animatedElements.forEach(function (el) {
    if (!el.classList.contains("animate-fade")) {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    }
    observer.observe(el);
  });

  // 4. Form di ricerca
  const searchForm = document.querySelector(".search-form");
  if (searchForm) {
    console.log("Form di ricerca trovato");
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Submit del form intercettato");
      alert(
        "Stiamo lavorando per collegare questo form al database delle auto. Presto disponibile!",
      );
    });
  }

  console.log("Inizializzazione completata!");
});
