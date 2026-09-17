// rust.js — animated rust/oxidation canvas for the dark section
(function () {
  const canvas = document.getElementById('rust-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  let time = 0;
  let particles = [];
  let animId;
  let isVisible = false;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    if (W > 0 && H > 0) {
      initParticles();
    }
  }

  // Rust "spore" particles
  class RustSpore {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.radius = Math.random() * 60 + 20;
      this.targetRadius = this.radius;
      this.alpha = 0;
      this.targetAlpha = Math.random() * 0.4 + 0.1;
      this.r = 120 + Math.random() * 60;
      this.g = 50 + Math.random() * 40;
      this.b = 10 + Math.random() * 20;
      this.growthSpeed = Math.random() * 0.002 + 0.001;
      this.phase = Math.random() * Math.PI * 2;
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.floor((W * H) / 18000) + 8;
    for (let i = 0; i < count; i++) {
      particles.push(new RustSpore());
    }
  }

  // Draw the static base texture once
  let baseTexture = null;

  function drawBase() {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = W;
    offCanvas.height = H;
    const off = offCanvas.getContext('2d');

    // Black metal background
    off.fillStyle = '#0a0a0a';
    off.fillRect(0, 0, W, H);

    // Brushed metal lines
    for (let i = 0; i < 300; i++) {
      const y = Math.random() * H;
      off.beginPath();
      off.moveTo(0, y);
      off.lineTo(W, y + (Math.random() - 0.5) * 2);
      off.strokeStyle = `rgba(50,50,50,${Math.random() * 0.1})`;
      off.lineWidth = Math.random() * 1.5;
      off.stroke();
    }

    // Scratches
    for (let i = 0; i < 12; i++) {
      const sx = Math.random() * W;
      const sy = Math.random() * H;
      off.beginPath();
      off.moveTo(sx, sy);
      off.lineTo(sx + (Math.random() - 0.5) * 200, sy + (Math.random() - 0.5) * 20);
      off.strokeStyle = `rgba(80,80,80,${Math.random() * 0.15})`;
      off.lineWidth = 0.5;
      off.stroke();
    }

    // Iron crack network
    function drawCrack(x, y, angle, length, depth) {
      if (depth === 0 || length < 10) return;
      const ex = x + Math.cos(angle) * length;
      const ey = y + Math.sin(angle) * length;
      off.beginPath();
      off.moveTo(x, y);
      off.lineTo(ex, ey);
      off.strokeStyle = `rgba(40,20,5,${0.3 + (4 - depth) * 0.1})`;
      off.lineWidth = depth * 0.4;
      off.stroke();
      const branches = depth > 2 ? 2 : 1;
      for (let b = 0; b < branches; b++) {
        const newAngle = angle + (Math.random() - 0.5) * 1.2;
        drawCrack(ex, ey, newAngle, length * (0.5 + Math.random() * 0.3), depth - 1);
      }
    }

    for (let i = 0; i < 6; i++) {
      const cx = Math.random() * W;
      const cy = Math.random() * H;
      drawCrack(cx, cy, Math.random() * Math.PI * 2, 40 + Math.random() * 60, 4);
    }

    baseTexture = offCanvas;
  }

  function animate() {
    if (!isVisible) {
      animId = requestAnimationFrame(animate);
      return;
    }
    time += 0.008;

    ctx.clearRect(0, 0, W, H);

    // Draw base
    if (baseTexture) {
      ctx.drawImage(baseTexture, 0, 0);
    }

    // Animate rust spores
    particles.forEach((p) => {
      p.alpha += (p.targetAlpha - p.alpha) * p.growthSpeed * 20;
      const pulse = Math.sin(time + p.phase) * 0.05;

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * (1 + pulse));
      grad.addColorStop(0, `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha})`);
      grad.addColorStop(0.4, `rgba(${p.r * 0.7}, ${p.g * 0.6}, ${p.b * 0.4}, ${p.alpha * 0.6})`);
      grad.addColorStop(1, `rgba(0, 0, 0, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(
        p.x + Math.sin(time * 0.3 + p.phase) * 3,
        p.y + Math.cos(time * 0.2 + p.phase) * 3,
        p.radius * (1 + pulse),
        p.radius * (0.7 + pulse),
        p.phase,
        0, Math.PI * 2
      );
      ctx.fill();
    });

    // Oxidation veil: slow shifting teal patches
    const veilX = W * 0.5 + Math.sin(time * 0.4) * W * 0.2;
    const veilY = H * 0.5 + Math.cos(time * 0.3) * H * 0.2;
    const veil = ctx.createRadialGradient(veilX, veilY, 0, veilX, veilY, W * 0.5);
    veil.addColorStop(0, `rgba(40, 100, 80, ${0.08 + Math.sin(time) * 0.03})`);
    veil.addColorStop(0.5, `rgba(20, 60, 50, ${0.04})`);
    veil.addColorStop(1, `rgba(0, 0, 0, 0)`);
    ctx.fillStyle = veil;
    ctx.fillRect(0, 0, W, H);

    // Noise grain on top
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.08})`;
      ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
    }

    animId = requestAnimationFrame(animate);
  }

  // Intersection Observer to pause when off screen
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.1 });

  observer.observe(canvas);

  window.addEventListener('resize', () => {
    resize();
    drawBase();
  });

  // Init
  function init() {
    if (canvas.offsetWidth === 0) {
      setTimeout(init, 100);
      return;
    }
    resize();
    drawBase();
    animate();
  }

  init();
})();
