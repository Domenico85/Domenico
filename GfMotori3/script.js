/* ============================================
   GF MOTORI SRL — Interazioni
   ============================================ */

// ===== Navbar scroll effect =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== Mobile menu =====
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Chiude il menu al click su un link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ===== Scroll reveal animations =====
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Delay a cascata per effetto più elegante
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  },
);

revealElements.forEach((el) => revealObserver.observe(el));

// ===== Counter animato per le statistiche =====
const counters = document.querySelectorAll(".stat-num");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Easing out-cubic
          const ease = 1 - Math.pow(1 - progress, 3);
          const value = Math.floor(ease * target);

          el.textContent = value.toLocaleString("it-IT");

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = target.toLocaleString("it-IT") + "+";
          }
        };

        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);

counters.forEach((counter) => counterObserver.observe(counter));

// ===== Form contatti =====
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;

  btn.textContent = "Invio in corso...";
  btn.disabled = true;

  // Simulazione invio (sostituire con fetch reale)
  setTimeout(() => {
    btn.textContent = "✓ Richiesta inviata!";
    btn.style.background = "#4ade80";
    contactForm.reset();

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = "";
      btn.disabled = false;
    }, 3000);
  }, 1200);
});

// ===== Smooth scroll con offset per navbar fissa =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ===== Parallax leggero sull'hero =====
const heroBg = document.querySelector(".hero-bg");
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight && heroBg) {
    heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ===== Effetto hover sulle card auto =====
document.querySelectorAll(".car-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

console.log(
  "%c🚗 Gfmotori srl",
  "color: #c9a961; font-size: 20px; font-weight: bold;",
);
console.log(
  "%cEccellenza su quattro ruote",
  "color: #8a8a8a; font-style: italic;",
);
