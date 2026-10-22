// Costellazione delle repo (WebGL2 puro). Un punto = un progetto.
// Le stelle si vedono a GRUPPI: uno alla volta (qualcuna di più durante la dissolvenza), ognuno con la
// sua "temperatura" di colore. Il gruppo cambia da solo ogni tanto, oppure con i puntini in basso.
// Dentro un gruppo le stelle vanno da sinistra a destra in ordine di data, con un rilassamento a molle
// che tiene la distanza minima. Si ferma da sola fuori schermo.
const MAX_G = 8;
const CICLO_MS = 6800;

export function initConstellation({ canvas, labelEl, navEl, repos, gruppi, onPick }) {
	const gl = canvas.getContext('webgl2', { antialias: true, alpha: true, premultipliedAlpha: true });
	if (!gl) return;
	const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
	const hash = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
	const pts = repos.map((r, i) => ({ ...r, date: new Date(r.d), x: 0, y: 0, s: 1, id: i }));
	const dust = Array.from({ length: 260 }, (_, i) => ({ x: hash(i + 1000), y: hash(i + 2000), s: 0, g: -1 }));
	const all = [...dust, ...pts]; // stessi oggetti: il layout li aggiorna sul posto
	const data = new Float32Array(all.length * 5);
	const byG = gruppi.map((_, gi) => pts.filter((p) => p.g === gi));

	const layout = (aspect) => { // distanza minima in unità di altezza schermo, gruppo per gruppo
		byG.forEach((list, gi) => {
			const n = list.length; if (!n) return;
			list.forEach((p, i) => { p.x = (i + .5) / n + (hash(p.id + 3) - .5) * .5 / n; p.y = .12 + hash(p.id * 7 + gi * 31) * .54; });
			const minD = Math.min(.2, .9 / Math.sqrt(n) * .7);
			for (let it = 0; it < 160; it++) for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
				const a = list[i], b = list[j]; let dx = (b.x - a.x) * aspect, dy = b.y - a.y; let d = Math.hypot(dx, dy);
				if (d >= minD) continue; if (d < 1e-4) { dx = hash(i + j) - .5; dy = hash(i * j + 1) - .5; d = Math.hypot(dx, dy) || 1e-3; }
				const k = (minD - d) / 2 / d; a.x -= dx * k / aspect * .7; b.x += dx * k / aspect * .7; a.y -= dy * k; b.y += dy * k;
			}
			list.forEach((p) => { p.x = Math.min(1, Math.max(0, p.x)); p.y = Math.min(.66, Math.max(.06, p.y)); });
		});
		all.forEach((p, i) => data.set([p.x, p.y, p.s, hash(i + 5), p.g], i * 5));
	};

	const vs = `#version 300 es
	in vec4 a; in float aG; uniform vec2 uRes, uM; uniform float uT, uAppear, uVis[${MAX_G}], uSeed[${MAX_G}]; uniform vec3 uCol[${MAX_G}];
	out float vS; out float vG; out vec3 vC; out float vV;
	// la tinta del gruppo, con una variazione lieve per stella (cambia a ogni apparizione e respira piano): resta riconoscibile come nella leggenda
	vec3 tint(vec3 c, float w, float seed) { float h = fract(sin((w + seed) * 91.3 + 7.1) * 43758.5453) - .5, s = sin(uT * .45 + w * 25.) * .5;
		return clamp(c * (1. + h * .3 + s * .08) + vec3(h, 0., -h) * .16 + vec3(s, 0., -s) * .04, 0., 1.4); }
	void main(){
		float vis = aG < 0. ? 1. : uVis[int(aG + .5)];
		vec2 base = vec2(.05 + a.x * .9, .1 + a.y * .76);
		base += vec2(sin(uT * .3 + a.w * 40.), cos(uT * .27 + a.w * 31.)) * (a.z > .5 ? .004 : .01);
		vec2 from = vec2(.5, .5) + (vec2(a.w, fract(a.w * 7.3)) - .5) * .2;
		float k = smoothstep(0., 1., clamp(uAppear * 1.4 - a.x * .4, 0., 1.)); base = mix(from, base, k);
		vec2 px = base * uRes; float d = distance(px, uM); vG = exp(-d * d / (2. * 140. * 140.));
		if (a.z < .5) base += normalize(px - uM + .001) / uRes * 24. * vG;
		gl_Position = vec4(base * 2. - 1., 0., 1.); gl_Position.y *= -1.; vS = a.z * k; vV = vis;
		vC = aG < 0. ? vec3(.6, .66, .8) : tint(uCol[int(aG + .5)], a.w, uSeed[int(aG + .5)]);
		gl_PointSize = (a.z > .5 ? 12. + 8. * vis : 1.4 + a.w * 1.2) * (1. + vG * 1.6 * (a.z > .5 ? vis : 1.)) * min(uRes.x / 900., 1.5); }`;
	const fs = `#version 300 es
	precision highp float; in float vS; in float vG; in vec3 vC; in float vV; out vec4 o;
	void main(){ float d = length(gl_PointCoord - .5) * 2.; if (d > 1.) discard;
	 float core = smoothstep(.45, .15, d), halo = smoothstep(1., .0, d) * .35;
	 vec3 c = mix(vC, vec3(1.), core * .55 * vS); c = mix(c, vec3(1.), vG * .5 * vS);
	 float al = (core + halo) * (vS > .5 ? vV : .55 + vG); o = vec4(c * (.5 + vG * .8 + vS * .5) * al, al); }`;
	const mk = (t, s) => { const x = gl.createShader(t); gl.shaderSource(x, s); gl.compileShader(x); if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(x)); return x; };
	const p = gl.createProgram(); gl.attachShader(p, mk(gl.VERTEX_SHADER, vs)); gl.attachShader(p, mk(gl.FRAGMENT_SHADER, fs));
	gl.bindAttribLocation(p, 0, 'a'); gl.bindAttribLocation(p, 1, 'aG'); gl.linkProgram(p); gl.useProgram(p);
	const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
	gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 20, 0);
	gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 1, gl.FLOAT, false, 20, 16);
	gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	const u = (nm) => gl.getUniformLocation(p, nm);
	const colors = new Float32Array(MAX_G * 3); gruppi.forEach((g, i) => colors.set(g.colore, i * 3)); gl.uniform3fv(u('uCol'), colors);
	const seeds = new Float32Array(MAX_G); const reseed = (i) => { seeds[i] = Math.random() * 50; gl.uniform1fv(u('uSeed'), seeds); }; gruppi.forEach((_, i) => { seeds[i] = i * 7.3; }); gl.uniform1fv(u('uSeed'), seeds);

	// stato dei gruppi: `vis` insegue `target` con una dissolvenza morbida
	let active = 0; const vis = new Float32Array(MAX_G); vis[0] = 1;
	let lastSwitch = performance.now(), pausedUntil = 0, lastNow = 0;
	const dots = gruppi.map((g, i) => {
		const b = document.createElement('button'); b.type = 'button'; b.className = 'gd';
		b.setAttribute('aria-label', `${g.nome}, ${g.periodo}`); b.style.setProperty('--c', `rgb(${g.colore.map((v) => Math.round(v * 255)).join(',')})`);
		b.innerHTML = '<i></i><span></span>'; b.onclick = () => show(i, true); navEl.append(b); return b;
	});
	const show = (i, manual = false) => {
		if (i !== active) reseed(i); // ogni volta che un gruppo ricompare, una variazione di tinta nuova
		active = i; lastSwitch = performance.now(); if (manual) pausedUntil = lastSwitch + 14000;
		dots.forEach((d, k) => { d.classList.toggle('on', k === i); d.setAttribute('aria-pressed', k === i); d.querySelector('span').textContent = k === i ? `${gruppi[k].nome} · ${gruppi[k].periodo}` : ''; });
	}; show(0);

	const dpr = Math.min(devicePixelRatio, 2); let W = 1, H = 1, m = [-999, -999], visible = true, start = null, go = false;
	const screenPos = (q) => [(.05 + q.x * .9) * W, (.1 + q.y * .76) * H];
	const resize = () => { const r = canvas.getBoundingClientRect(); W = r.width; H = r.height; canvas.width = W * dpr; canvas.height = H * dpr; gl.viewport(0, 0, canvas.width, canvas.height);
		layout(W / H); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW); };
	addEventListener('resize', resize); resize();
	canvas.addEventListener('pointermove', (e) => { const r = canvas.getBoundingClientRect(); m = [e.clientX - r.left, e.clientY - r.top]; });
	canvas.addEventListener('pointerleave', () => { m = [-999, -999]; });
	const nearest = (maxD) => { let best = null, bd = maxD; for (const q of pts) { if (vis[q.g] < .5) continue; const [bx, by] = screenPos(q), d = Math.hypot(bx - m[0], by - m[1]); if (d < bd) { bd = d; best = [q, bx, by]; } } return best; };
	canvas.addEventListener('click', (e) => { const r = canvas.getBoundingClientRect(); m = [e.clientX - r.left, e.clientY - r.top]; const b = nearest(40); if (b && onPick) onPick(b[0]); });
	new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { lastNow = 0; requestAnimationFrame(frame); } }).observe(canvas);

	const frame = (now) => {
		if (!visible) return;
		const dt = lastNow ? Math.min(.1, (now - lastNow) / 1000) : .016; lastNow = now;
		if (go) start ??= now; const ap = reduced ? 1 : go ? Math.min(1, (now - start) / 2600) : 0;
		// ciclo automatico: solo con movimento ammesso, a hero visibile e senza interazioni recenti
		if (!reduced && go && ap >= 1 && now > pausedUntil && now - lastSwitch > CICLO_MS) show((active + 1) % gruppi.length);
		for (let g = 0; g < gruppi.length; g++) { const t = g === active ? 1 : 0; vis[g] += (t - vis[g]) * (1 - Math.exp(-dt / (t ? .5 : .32))); }
		gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
		gl.uniform2f(u('uRes'), W * dpr, H * dpr); gl.uniform2f(u('uM'), m[0] * dpr, m[1] * dpr); gl.uniform1f(u('uT'), reduced ? 0 : now / 1000); gl.uniform1f(u('uAppear'), ap);
		gl.uniform1fv(u('uVis'), vis);
		gl.drawArrays(gl.POINTS, 0, all.length);
		const b = nearest(60);
		if (b) { // il nome sta a destra della stella, a sinistra se a destra non c'è posto (stelle vicine al bordo)
			if (labelEl.dataset.id !== String(b[0].id)) { labelEl.dataset.id = b[0].id; labelEl.innerHTML = `<b>${b[0].d}</b>${b[0].name}`; }
			const flip = b[1] + 20 + labelEl.offsetWidth > W - 8;
			labelEl.style.transform = flip ? 'translate(calc(-100% - 14px), -50%)' : 'translate(14px, -50%)';
			labelEl.style.opacity = 1; labelEl.style.left = b[1] + 'px'; labelEl.style.top = b[2] + 'px'; canvas.style.cursor = 'pointer'; } else { labelEl.style.opacity = 0; canvas.style.cursor = ''; }
		requestAnimationFrame(frame);
	};
	requestAnimationFrame(frame);
	return { go() { go = true; start = null; lastSwitch = performance.now(); } };
}
