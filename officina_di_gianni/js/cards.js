// cards.js — generative art thumbnails for project cards
(function () {

  const CARD_STYLES = [
    // 0 — Teatro / scenografia: draped curtains with light beams
    function (ctx, W, H) {
      ctx.fillStyle = '#0d0b09';
      ctx.fillRect(0, 0, W, H);

      // Curtain texture
      for (let x = 0; x < W; x += 8) {
        const wave = Math.sin(x * 0.05) * 6;
        const grad = ctx.createLinearGradient(x, 0, x + 8, 0);
        grad.addColorStop(0, 'rgba(30,22,14,0.9)');
        grad.addColorStop(0.5, 'rgba(55,40,22,0.7)');
        grad.addColorStop(1, 'rgba(30,22,14,0.9)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(x + wave, 0);
        for (let y = 0; y < H; y += 10) {
          ctx.lineTo(x + Math.sin(y * 0.08 + x * 0.02) * 5 + wave, y);
        }
        ctx.lineTo(x + 8, H);
        ctx.lineTo(x, H);
        ctx.closePath();
        ctx.fill();
      }

      // Light beam from above
      const beamGrad = ctx.createRadialGradient(W * 0.5, 0, 0, W * 0.5, H * 0.3, W * 0.5);
      beamGrad.addColorStop(0, 'rgba(255,240,200,0.25)');
      beamGrad.addColorStop(0.4, 'rgba(255,220,150,0.08)');
      beamGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, 0, W, H);

      // Fine grain
      for (let i = 0; i < 800; i++) {
        ctx.fillStyle = `rgba(255,220,180,${Math.random() * 0.04})`;
        ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
      }
    },

    // 1 — Armadio / wood grain
    function (ctx, W, H) {
      ctx.fillStyle = '#2a1f14';
      ctx.fillRect(0, 0, W, H);

      // Wood grain lines
      for (let i = 0; i < 60; i++) {
        const y = (H / 60) * i;
        const alpha = 0.05 + Math.random() * 0.12;
        const thick = Math.random() * 2 + 0.3;

        ctx.beginPath();
        ctx.moveTo(0, y);
        let px = 0;
        while (px < W) {
          px += 8 + Math.random() * 20;
          const deviation = (Math.random() - 0.5) * 8;
          ctx.lineTo(px, y + deviation);
        }
        ctx.strokeStyle = `rgba(${180 + Math.random() * 60}, ${120 + Math.random() * 40}, ${60 + Math.random() * 30}, ${alpha})`;
        ctx.lineWidth = thick;
        ctx.stroke();
      }

      // Knot
      const kx = W * 0.4, ky = H * 0.35;
      for (let r = 30; r > 0; r -= 3) {
        ctx.beginPath();
        ctx.ellipse(kx, ky, r * 1.3, r, 0.2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100, 60, 20, ${0.1 + (30 - r) / 200})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Warm overlay
      const warmGrad = ctx.createLinearGradient(0, 0, W, H);
      warmGrad.addColorStop(0, 'rgba(200,140,60,0.08)');
      warmGrad.addColorStop(1, 'rgba(80,40,10,0.1)');
      ctx.fillStyle = warmGrad;
      ctx.fillRect(0, 0, W, H);
    },

    // 2 — Muro stratigrafico: layers of paint
    function (ctx, W, H) {
      // Base intonaco
      ctx.fillStyle = '#c8bfb0';
      ctx.fillRect(0, 0, W, H);

      // Layers
      const layers = [
        { color: '#8a7d6e', y: H * 0.2, h: H * 0.6 },
        { color: '#6b5d4f', y: H * 0.35, h: H * 0.4 },
        { color: '#3d2e22', y: H * 0.55, h: H * 0.3 },
        { color: '#1a1210', y: H * 0.72, h: H * 0.28 },
      ];

      layers.forEach(l => {
        ctx.fillStyle = l.color;
        // Ragged edge
        ctx.beginPath();
        ctx.moveTo(0, l.y);
        for (let x = 0; x <= W; x += 6) {
          ctx.lineTo(x, l.y + (Math.random() - 0.5) * 20);
        }
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fill();
      });

      // Iron stain
      const stainGrad = ctx.createRadialGradient(W * 0.6, H * 0.4, 0, W * 0.6, H * 0.4, W * 0.35);
      stainGrad.addColorStop(0, 'rgba(120,60,20,0.5)');
      stainGrad.addColorStop(0.5, 'rgba(80,40,10,0.2)');
      stainGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = stainGrad;
      ctx.fillRect(0, 0, W, H);

      // Grain
      for (let i = 0; i < 1500; i++) {
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.06})`;
        ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
      }
    },

    // 3 — Tavolo / welded metal surface
    function (ctx, W, H) {
      ctx.fillStyle = '#1c1c1c';
      ctx.fillRect(0, 0, W, H);

      // Metal brushed texture
      for (let i = 0; i < 200; i++) {
        const y = Math.random() * H;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y + (Math.random() - 0.5) * 3);
        ctx.strokeStyle = `rgba(80,80,80,${Math.random() * 0.07})`;
        ctx.lineWidth = Math.random() * 1.5;
        ctx.stroke();
      }

      // Weld seam
      const seamY = H * 0.45;
      ctx.beginPath();
      ctx.moveTo(0, seamY);
      for (let x = 0; x <= W; x += 4) {
        ctx.lineTo(x, seamY + Math.sin(x * 0.3) * 3 + (Math.random() - 0.5) * 2);
      }
      ctx.strokeStyle = 'rgba(180,130,60,0.6)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Glow along seam
      const seamGrad = ctx.createLinearGradient(0, seamY - 20, 0, seamY + 20);
      seamGrad.addColorStop(0, 'rgba(0,0,0,0)');
      seamGrad.addColorStop(0.5, 'rgba(200,140,50,0.12)');
      seamGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = seamGrad;
      ctx.fillRect(0, seamY - 20, W, 40);

      // Rust spots
      for (let i = 0; i < 30; i++) {
        const rx = Math.random() * W, ry = Math.random() * H;
        const rr = Math.random() * 12 + 2;
        const rg = ctx.createRadialGradient(rx, ry, 0, rx, ry, rr);
        rg.addColorStop(0, `rgba(160,80,20,${Math.random() * 0.5 + 0.2})`);
        rg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(rx, ry, rr, 0, Math.PI * 2);
        ctx.fill();
      }
    },

    // 4 — Spazio Nudo: hanging iron elements
    function (ctx, W, H) {
      ctx.fillStyle = '#f0ede6';
      ctx.fillRect(0, 0, W, H);

      // Fine grid in background
      ctx.strokeStyle = 'rgba(0,0,0,0.04)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 20) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Hanging iron rods
      const rods = [
        { x: W * 0.25, len: H * 0.6 },
        { x: W * 0.5,  len: H * 0.42 },
        { x: W * 0.72, len: H * 0.7 },
        { x: W * 0.85, len: H * 0.35 },
      ];

      rods.forEach(rod => {
        // Wire
        ctx.beginPath();
        ctx.moveTo(rod.x, 0);
        ctx.lineTo(rod.x + Math.sin(rod.len * 0.01) * 4, rod.len);
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Iron piece
        ctx.save();
        ctx.translate(rod.x, rod.len);
        ctx.rotate(Math.sin(rod.x) * 0.1);
        const pw = 6 + Math.random() * 10;
        const ph = 40 + Math.random() * 30;
        ctx.fillStyle = '#3a3028';
        ctx.fillRect(-pw / 2, 0, pw, ph);

        // Rust on rod
        for (let i = 0; i < 8; i++) {
          const rrg = ctx.createRadialGradient(
            (Math.random() - 0.5) * pw, Math.random() * ph, 0,
            (Math.random() - 0.5) * pw, Math.random() * ph, 5
          );
          rrg.addColorStop(0, 'rgba(160,80,20,0.6)');
          rrg.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = rrg;
          ctx.fillRect(-pw / 2, 0, pw, ph);
        }
        ctx.restore();
      });
    },

    // 5 — Ossidazione: copper oxidation gradients
    function (ctx, W, H) {
      ctx.fillStyle = '#1a0f08';
      ctx.fillRect(0, 0, W, H);

      // Copper base
      const copperGrad = ctx.createLinearGradient(0, 0, W, H);
      copperGrad.addColorStop(0, 'rgba(180,100,40,0.7)');
      copperGrad.addColorStop(0.4, 'rgba(140,80,30,0.5)');
      copperGrad.addColorStop(1, 'rgba(60,30,10,0.8)');
      ctx.fillStyle = copperGrad;
      ctx.fillRect(0, 0, W, H);

      // Oxidation patches — teal/green
      for (let i = 0; i < 25; i++) {
        const ox = Math.random() * W, oy = Math.random() * H;
        const or = 20 + Math.random() * 60;
        const og = ctx.createRadialGradient(ox, oy, 0, ox, oy, or);
        og.addColorStop(0, `rgba(80,140,120,${0.4 + Math.random() * 0.3})`);
        og.addColorStop(0.6, `rgba(40,100,80,${0.2 + Math.random() * 0.2})`);
        og.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = og;
        ctx.beginPath();
        ctx.ellipse(ox, oy, or, or * (0.5 + Math.random() * 0.8), Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.fill();
      }

      // Dark drips
      for (let i = 0; i < 8; i++) {
        const dx = Math.random() * W;
        const dy = Math.random() * H * 0.5;
        ctx.beginPath();
        ctx.moveTo(dx, dy);
        ctx.bezierCurveTo(
          dx + (Math.random() - 0.5) * 10, dy + H * 0.15,
          dx + (Math.random() - 0.5) * 10, dy + H * 0.3,
          dx + (Math.random() - 0.5) * 6, dy + H * (0.4 + Math.random() * 0.4)
        );
        ctx.strokeStyle = `rgba(20,60,50,${0.4 + Math.random() * 0.3})`;
        ctx.lineWidth = 1 + Math.random() * 2;
        ctx.stroke();
      }

      // Crystal-like highlights
      for (let i = 0; i < 40; i++) {
        ctx.fillStyle = `rgba(180,220,200,${Math.random() * 0.08})`;
        ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
      }
    },
  ];

  function initCards() {
    const cards = document.querySelectorAll('.card-lavoro');
    cards.forEach((card, i) => {
      const canvas = card.querySelector('.card-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      function draw() {
        const W = canvas.width = canvas.offsetWidth;
        const H = canvas.height = canvas.offsetHeight;
        if (W === 0 || H === 0) return;
        const styleFn = CARD_STYLES[i % CARD_STYLES.length];
        styleFn(ctx, W, H);
      }

      // Draw on load and on resize
      draw();
      const ro = new ResizeObserver(draw);
      ro.observe(canvas);

      // Parallax on hover
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = (e.clientX - rect.left) / rect.width - 0.5;
        const cy = (e.clientY - rect.top) / rect.height - 0.5;
        canvas.style.transform = `scale(1.06) translate(${cx * -12}px, ${cy * -12}px)`;
      });

      card.addEventListener('mouseleave', () => {
        canvas.style.transform = 'scale(1) translate(0,0)';
      });

      canvas.style.transition = 'transform 0.5s ease';
    });
  }

  // Filter functionality
  function initFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card-lavoro');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.cat === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCards();
    initFilter();
  });
})();
