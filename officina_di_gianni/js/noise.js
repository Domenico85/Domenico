// noise.js — grain texture overlay
(function () {
  const canvas = document.getElementById('noise-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let frame = 0;
  let animId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function drawNoise() {
    const w = canvas.width;
    const h = canvas.height;
    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
    frame++;
    // Update noise every 3 frames for performance
    if (frame % 3 === 0) {
      animId = requestAnimationFrame(drawNoise);
    } else {
      animId = requestAnimationFrame(drawNoise);
    }
  }

  window.addEventListener('resize', resize);
  resize();
  drawNoise();
})();
