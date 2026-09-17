// portrait.js — generative portrait placeholder with wood/iron texture
(function () {
  const canvas = document.getElementById('portrait-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function draw() {
    const W = canvas.width = canvas.offsetWidth || 300;
    const H = canvas.height = canvas.offsetHeight || 400;
    if (W === 0 || H === 0) return;

    // Background — aged paper
    ctx.fillStyle = '#e8e0d0';
    ctx.fillRect(0, 0, W, H);

    // Paper texture grain
    for (let i = 0; i < 3000; i++) {
      const v = 180 + Math.random() * 40;
      ctx.fillStyle = `rgba(${v},${v - 10},${v - 20},0.15)`;
      ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
    }

    // Silhouette — abstract human figure (bust)
    ctx.save();
    ctx.globalAlpha = 1;

    // Shoulders / torso
    const cx = W * 0.5;
    const cy = H * 0.82;
    ctx.beginPath();
    ctx.moveTo(cx - W * 0.4, H);
    ctx.bezierCurveTo(
      cx - W * 0.35, H * 0.72,
      cx - W * 0.2, H * 0.65,
      cx, H * 0.62
    );
    ctx.bezierCurveTo(
      cx + W * 0.2, H * 0.65,
      cx + W * 0.35, H * 0.72,
      cx + W * 0.4, H
    );
    ctx.fillStyle = '#2a1f14';
    ctx.fill();

    // Neck
    ctx.beginPath();
    ctx.moveTo(cx - W * 0.07, H * 0.62);
    ctx.bezierCurveTo(
      cx - W * 0.07, H * 0.52,
      cx + W * 0.07, H * 0.52,
      cx + W * 0.07, H * 0.62
    );
    ctx.fillStyle = '#3a2a1c';
    ctx.fill();

    // Head
    ctx.beginPath();
    ctx.ellipse(cx, H * 0.38, W * 0.18, H * 0.18, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#3a2a1c';
    ctx.fill();

    // Hair suggestion
    ctx.beginPath();
    ctx.ellipse(cx, H * 0.28, W * 0.19, H * 0.10, -0.1, Math.PI, Math.PI * 2);
    ctx.fillStyle = '#1a1008';
    ctx.fill();

    ctx.restore();

    // Cross-hatching overlay on figure for texture
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 0.5;
    for (let i = -H; i < W + H; i += 6) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + H, H);
      ctx.stroke();
    }
    for (let i = W + H; i > -H; i -= 6) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i - H, H);
      ctx.stroke();
    }
    ctx.restore();

    // Decorative corner marks (like old photo borders)
    const cornerLen = 20;
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.lineWidth = 1;

    [[0, 0, 1, 1], [W, 0, -1, 1], [0, H, 1, -1], [W, H, -1, -1]].forEach(([x, y, dx, dy]) => {
      ctx.beginPath();
      ctx.moveTo(x + dx * 8, y);
      ctx.lineTo(x + dx * 8, y + dy * cornerLen);
      ctx.moveTo(x, y + dy * 8);
      ctx.lineTo(x + dx * cornerLen, y + dy * 8);
      ctx.stroke();
    });

    // Label at bottom
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.font = `italic 11px 'Playfair Display', serif`;
    ctx.textAlign = 'center';
    ctx.fillText('sostituire con foto', W / 2, H - 16);
  }

  const ro = new ResizeObserver(draw);
  ro.observe(canvas);
  draw();
})();
