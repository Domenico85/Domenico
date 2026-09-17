/**
 * GIUSEPPE GIORDANO — SITO VETRINA POLITICO
 * Reggio Calabria · Elezioni Comunali 2025
 * script.js — Interazioni e animazioni
 */

/* ============================================
   LOADER
   ============================================ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = 'visible';
    triggerHeroAnimations();
  }, 1200);
});

document.body.style.overflow = 'hidden';

/* ============================================
   CUSTOM CURSOR
   ============================================ */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Effetto hover sugli elementi interattivi
const hoverTargets = document.querySelectorAll('a, button, input, textarea, .pillar-card, .media-card');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ============================================
   NAVBAR — SCROLL EFFECT
   ============================================ */
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = current;
}, { passive: true });

/* ============================================
   HAMBURGER / MOBILE MENU
   ============================================ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Chiudi il menu quando si clicca su un link
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ============================================
   SCROLL REVEAL
   ============================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================
   HERO ANIMATIONS — trigger al caricamento
   ============================================ */
function triggerHeroAnimations() {
  const heroReveals = document.querySelectorAll('#hero .reveal');
  heroReveals.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, i * 180);
  });
}

/* ============================================
   CONTATORE STATISTICHE (hero)
   ============================================ */
function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  const startVal = 0;

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Easing ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(startVal + (target - startVal) * eased);
    el.textContent = current.toLocaleString('it-IT');
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString('it-IT');
  }
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-num[data-target]');
      counters.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target, 2200);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ============================================
   SMOOTH SCROLL — link ancora
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = navbar.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ============================================
   BACK TO TOP
   ============================================ */
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 600) {
    backTop.classList.add('visible');
  } else {
    backTop.classList.remove('visible');
  }
}, { passive: true });

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   ACTIVE NAV LINK — Intersection Observer
   ============================================ */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinkEls.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, {
  threshold: 0.35,
  rootMargin: '-80px 0px 0px 0px'
});

sections.forEach(s => sectionObserver.observe(s));

// Stile active via JS dinamico
const activeStyle = document.createElement('style');
activeStyle.textContent = `.nav-links a.active { color: var(--gold-light) !important; }`;
document.head.appendChild(activeStyle);

/* ============================================
   FORM CONTATTI — Invio (placeholder)
   ============================================ */
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Invio in corso…';

    // Simulazione invio (da sostituire con API reale)
    setTimeout(() => {
      form.style.display = 'none';
      formSuccess.classList.add('show');
    }, 1200);
  });
}

/* ============================================
   PARALLAX LEGGERO — hero photo accent
   ============================================ */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const bgPattern = document.querySelector('.hero-bg-pattern');
  if (bgPattern) {
    bgPattern.style.transform = `translateY(${scrollY * 0.15}px)`;
  }
}, { passive: true });

/* ============================================
   PILLAR CARDS — effetto tilt leggero
   ============================================ */
document.querySelectorAll('.pillar-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.25,0.8,0.25,1), box-shadow 0.4s';
  });
});

/* ============================================
   TITLE LINES — animazione staggered
   ============================================ */
document.querySelectorAll('.title-line').forEach((line, i) => {
  line.style.opacity = '0';
  line.style.transform = 'translateY(20px)';
  line.style.transition = `opacity 0.7s ease ${0.3 + i * 0.15}s, transform 0.7s ease ${0.3 + i * 0.15}s`;
});

function revealTitleLines() {
  document.querySelectorAll('.title-line').forEach(line => {
    line.style.opacity = '1';
    line.style.transform = 'translateY(0)';
  });
}

// Attiva dopo il loader
setTimeout(revealTitleLines, 1400);

/* ============================================
   MANIFESTO — effetto glow sul tricolore
   ============================================ */
const flagEl = document.querySelector('.flag-tricolor');
if (flagEl) {
  const manifestoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        flagEl.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
        flagEl.style.opacity = '1';
        flagEl.style.transform = 'scaleY(1)';
      }
    });
  }, { threshold: 0.5 });

  flagEl.style.opacity = '0';
  flagEl.style.transform = 'scaleY(0.3)';
  flagEl.style.transformOrigin = 'bottom';
  manifestoObserver.observe(flagEl);
}

/* ============================================
   INPUT FLOAT LABELS — effetto focus
   ============================================ */
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });
  input.addEventListener('blur', () => {
    input.parentElement.classList.remove('focused');
  });
});

/* ============================================
   LOG DI BENVENUTO (DEV)
   ============================================ */
console.log(
  '%c Giuseppe Giordano — Candidato Sindaco 2025\n%c Reggio Calabria · Città Metropolitana',
  'color: #B8963E; font-size: 1.1rem; font-weight: bold;',
  'color: #5A6478; font-size: 0.85rem;'
);
