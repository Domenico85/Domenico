// main.js — cursor, navigation, scroll reveals, misc interactions
(function () {

  // ===========================
  // CUSTOM CURSOR
  // ===========================
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');

  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth trail
  function animateTrail() {
    trailX += (mouseX - trailX) * 0.14;
    trailY += (mouseY - trailY) * 0.14;
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .card-lavoro, .tag, .filter-btn, .nav-link'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // ===========================
  // NAV SCROLL BEHAVIOR
  // ===========================
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // ===========================
  // MOBILE BURGER MENU
  // ===========================
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    const spans = burger.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  }

  burger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuOpen) toggleMenu();
    });
  });

  // ===========================
  // SCROLL REVEAL
  // ===========================
  const revealEls = document.querySelectorAll('.reveal');

  function checkReveal() {
    const windowH = window.innerHeight;
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      const delay = parseInt(el.dataset.delay || 0);
      if (rect.top < windowH * 0.88) {
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
      }
    });
  }

  window.addEventListener('scroll', checkReveal, { passive: true });
  window.addEventListener('resize', checkReveal);
  // Initial check after page load
  setTimeout(checkReveal, 400);

  // ===========================
  // SMOOTH SCROLL for nav links
  // ===========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  // ===========================
  // HERO BG TEXT PARALLAX
  // ===========================
  const heroBgText = document.querySelector('.hero-bg-text');
  if (heroBgText) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroBgText.style.transform = `translateY(calc(-50% + ${scrolled * 0.3}px))`;
    }, { passive: true });
  }

  // ===========================
  // SECTION TITLE SPLIT TEXT (light touch)
  // ===========================
  // Stagger the section titles on scroll
  const sectionTitles = document.querySelectorAll('.section-title.reveal');
  sectionTitles.forEach(title => {
    title.style.transitionDuration = '1s';
    title.style.transitionTimingFunction = 'cubic-bezier(0.16, 1, 0.3, 1)';
  });

  // ===========================
  // PROCESS STEP LINE ANIMATION
  // ===========================
  const stepLines = document.querySelectorAll('.step-line');
  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'growLine 0.8s ease forwards';
      }
    });
  }, { threshold: 0.5 });

  stepLines.forEach(line => {
    line.style.transformOrigin = 'top';
    line.style.transform = 'scaleY(0)';
    stepObserver.observe(line);
  });

  const growLineStyle = document.createElement('style');
  growLineStyle.textContent = `
    @keyframes growLine {
      from { transform: scaleY(0); }
      to { transform: scaleY(1); }
    }
  `;
  document.head.appendChild(growLineStyle);

  // ===========================
  // HIDE SCROLL HINT ON SCROLL
  // ===========================
  const scrollHint = document.getElementById('scroll-hint');
  if (scrollHint) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        scrollHint.style.opacity = '0';
        scrollHint.style.transition = 'opacity 0.5s';
      }
    }, { passive: true, once: true });
  }

  // ===========================
  // MARQUEE PAUSE ON HOVER
  // ===========================
  const track = document.querySelector('.divider-track');
  if (track) {
    track.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    track.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }

})();
