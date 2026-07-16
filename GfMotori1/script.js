/* =========================================================
   GF MOTORI — script.js (vanilla JS, nessuna dipendenza)
   ========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. HEADER: ombra quando si scrolla + menu mobile
  --------------------------------------------------------- */
  var header = document.getElementById("site-header");
  var navToggle = document.getElementById("nav-toggle");
  var primaryNav = document.getElementById("primary-nav");

  function onScrollHeader() {
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  function closeNav() {
    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
  function toggleNav() {
    var isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  }
  if (navToggle) {
    navToggle.addEventListener("click", toggleNav);
  }
  // Chiude il menu mobile quando si clicca un link
  primaryNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });
  // Chiude il menu con il tasto Esc
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  /* ---------------------------------------------------------
     2. INVENTARIO: filtro auto (marca, condizione, prezzo)
  --------------------------------------------------------- */
  var carGrid = document.getElementById("car-grid");
  var carCards = Array.prototype.slice.call(carGrid.querySelectorAll(".car-card"));
  var noResults = document.getElementById("no-results");
  var inventoryStatus = document.getElementById("inventory-status");
  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip"));
  var searchForm = document.getElementById("search-form");
  var resetBtn = document.getElementById("reset-filters");

  var state = { brand: "", condition: "", maxPrice: "" };

  function applyFilters() {
    var visibleCount = 0;

    carCards.forEach(function (card) {
      var matchesBrand = !state.brand || card.dataset.brand === state.brand;
      var matchesCondition = !state.condition || card.dataset.condition === state.condition;
      var matchesPrice = !state.maxPrice || Number(card.dataset.price) <= Number(state.maxPrice);
      var visible = matchesBrand && matchesCondition && matchesPrice;

      card.hidden = !visible;
      if (visible) visibleCount++;
    });

    noResults.hidden = visibleCount !== 0;
    inventoryStatus.textContent =
      visibleCount === carCards.length
        ? "Stai visualizzando tutte le " + carCards.length + " auto disponibili."
        : "Stai visualizzando " + visibleCount + " auto su " + carCards.length + " disponibili.";

    // Sincronizza lo stato visuale dei chip "Tutte / Nuove / Usate"
    chips.forEach(function (chip) {
      chip.classList.toggle("is-active", chip.dataset.condition === state.condition);
    });
  }

  // Chip di filtro rapido (Tutte / Nuove / Usate)
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      state.condition = chip.dataset.condition;
      applyFilters();
    });
  });

  // Pannello di ricerca nell'hero
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      state.brand = document.getElementById("search-brand").value;
      state.condition = document.getElementById("search-condition").value;
      state.maxPrice = document.getElementById("search-price").value;
      applyFilters();

      var target = document.getElementById("auto");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // Azzera i filtri
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      state = { brand: "", condition: "", maxPrice: "" };
      if (searchForm) {
        document.getElementById("search-brand").value = "";
        document.getElementById("search-condition").value = "";
        document.getElementById("search-price").value = "";
      }
      applyFilters();
    });
  }

  applyFilters();

  /* ---------------------------------------------------------
     3. DASHBOARD: gauge animati (contatore + lancetta + arco)
  --------------------------------------------------------- */
  var gauges = Array.prototype.slice.call(document.querySelectorAll(".gauge"));

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateGauge(gauge) {
    var targetValue = Number(gauge.dataset.value);
    var maxValue = Number(gauge.dataset.max);
    var numberEl = gauge.querySelector(".gauge-number");
    var needleEl = gauge.querySelector(".gauge-needle");
    var fillEl = gauge.querySelector(".gauge-fill");

    var percentage = Math.min(targetValue / maxValue, 1);
    var arcLength = fillEl.getTotalLength();

    // Stato iniziale dell'arco (nascosto)
    fillEl.style.strokeDasharray = arcLength;
    fillEl.style.strokeDashoffset = arcLength;

    // La lancetta ruota da -90deg (zero) a +90deg (massimo)
    needleEl.style.transform = "rotate(" + (-90 + percentage * 180) + "deg)";

    var duration = 1200;
    var startTime = null;

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = easeOutCubic(progress);

      numberEl.textContent = Math.round(eased * targetValue);
      fillEl.style.strokeDashoffset = arcLength - eased * percentage * arcLength;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        numberEl.textContent = targetValue;
      }
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var gaugeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateGauge(entry.target);
            gaugeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    gauges.forEach(function (g) {
      gaugeObserver.observe(g);
    });
  } else {
    // Fallback: anima subito se IntersectionObserver non è disponibile
    gauges.forEach(animateGauge);
  }

  /* ---------------------------------------------------------
     4. CAROSELLO TESTIMONIANZE
  --------------------------------------------------------- */
  var track = document.getElementById("carousel-track");
  var slides = Array.prototype.slice.call(track.children);
  var prevBtn = document.getElementById("carousel-prev");
  var nextBtn = document.getElementById("carousel-next");
  var dotsWrap = document.getElementById("carousel-dots");
  var carouselEl = document.getElementById("carousel");
  var currentSlide = 0;
  var autoplayId = null;
  var AUTOPLAY_DELAY = 6000;

  // Crea i puntini di navigazione
  slides.forEach(function (_, index) {
    var dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", "Vai alla testimonianza " + (index + 1));
    dot.addEventListener("click", function () {
      goToSlide(index);
      restartAutoplay();
    });
    dotsWrap.appendChild(dot);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function updateCarousel() {
    track.style.transform = "translateX(-" + currentSlide * 100 + "%)";
    dots.forEach(function (dot, index) {
      dot.classList.toggle("is-active", index === currentSlide);
    });
  }

  function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    updateCarousel();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoplay() {
    autoplayId = window.setInterval(nextSlide, AUTOPLAY_DELAY);
  }
  function stopAutoplay() {
    if (autoplayId) {
      window.clearInterval(autoplayId);
      autoplayId = null;
    }
  }
  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", function () {
      nextSlide();
      restartAutoplay();
    });
    prevBtn.addEventListener("click", function () {
      prevSlide();
      restartAutoplay();
    });
  }

  // Pausa l'autoplay quando l'utente interagisce o passa il mouse
  [carouselEl].forEach(function (el) {
    el.addEventListener("mouseenter", stopAutoplay);
    el.addEventListener("mouseleave", startAutoplay);
    el.addEventListener("focusin", stopAutoplay);
    el.addEventListener("focusout", startAutoplay);
  });

  // Supporto swipe su touch screen
  var touchStartX = 0;
  track.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.touches[0].clientX;
      stopAutoplay();
    },
    { passive: true }
  );
  track.addEventListener(
    "touchend",
    function (e) {
      var deltaX = e.changedTouches[0].clientX - touchStartX;
      if (deltaX > 40) prevSlide();
      if (deltaX < -40) nextSlide();
      startAutoplay();
    },
    { passive: true }
  );

  updateCarousel();
  startAutoplay();

  /* ---------------------------------------------------------
     5. TORNA IN CIMA
  --------------------------------------------------------- */
  var backToTop = document.getElementById("back-to-top");
  function onScrollBackToTop() {
    backToTop.style.opacity = window.scrollY > 480 ? "1" : "0";
    backToTop.style.pointerEvents = window.scrollY > 480 ? "auto" : "none";
  }
  backToTop.style.transition = "opacity .25s ease";
  window.addEventListener("scroll", onScrollBackToTop, { passive: true });
  onScrollBackToTop();

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------------------------------------------------------
     6. ANNO CORRENTE NEL FOOTER
  --------------------------------------------------------- */
  var yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
