// particles.js — hero floating iron/rust particle system
(function () {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  let particles = [];
  let mouse = { x: -1000, y: -1000 };

  const PARTICLE_COUNT = 80;

  const COLORS = [
    'rgba(138, 92, 58, ',   // rust
    'rgba(80, 60, 40, ',    // dark wood
    'rgba(160, 140, 120, ', // pale grain
    'rgba(40, 40, 40, ',    // iron dark
    'rgba(200, 184, 154, ', // bone/ivory
  ];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : H + 20;
      this.size = Math.random() * 3 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -(Math.random() * 0.5 + 0.1);
      this.life = 0;
      this.maxLife = Math.random() * 300 + 200;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = (Math.random() - 0.5) * 0.02;
      this.isRect = Math.random() > 0.5;
    }

    update() {
      this.life++;

      // Mouse repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.speedX += (dx / dist) * force * 0.3;
        this.speedY += (dy / dist) * force * 0.3;
      }

      this.speedX *= 0.98;
      this.speedY *= 0.98;

      this.x += this.speedX;
      this.y += this.speedY;
      this.angle += this.angleSpeed;

      const progress = this.life / this.maxLife;
      this.alpha = progress < 0.1
        ? progress / 0.1
        : progress > 0.8
          ? (1 - progress) / 0.2
          : 1;

      if (this.life >= this.maxLife || this.y < -30 || this.x < -30 || this.x > W + 30) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha * 0.7;
      ctx.fillStyle = this.color + this.alpha * 0.7 + ')';
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      if (this.isRect) {
        ctx.fillRect(-this.size / 2, -this.size * 2, this.size, this.size * 4);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    init();
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  resize();
  init();
  animate();
})();
