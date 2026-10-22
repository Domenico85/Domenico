// Effetto condiviso: immagini in "ricordo" (bn / seppia / carta) che si colorano dove passa il cursore.
// Uso: initReveal({ canvas, selector: '.frame' }). Ogni .frame contiene un <img> e un data-look opzionale.
export const LOOKS = {
	bn: [[.03, .03, .03], [.88, .88, .88]],
	seppia: [[.07, .045, .025], [.95, .82, .62]],
	carta: [[.17, .14, .11], [.93, .89, .80]],
};

export function initReveal({ canvas, selector = '.frame', params = {} }) {
	const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
	const gl = canvas.getContext('webgl2', { antialias: false, alpha: true, premultipliedAlpha: true });
	const P = { radius: 0.09, decay: 0.975, strength: 1.0, grain: 0.08, edge: 0.6, dim: 0.9, ...params };
	if (!gl) { document.documentElement.classList.add('no-gl'); return { P }; }

	const vs = `#version 300 es
	in vec2 p; uniform vec4 uRect; out vec2 vUv; out vec2 vScreen;
	void main() { vUv = p * .5 + .5; vUv.y = 1. - vUv.y; vec2 px = uRect.xy + vUv * uRect.zw; vScreen = px; gl_Position = vec4(px * 2. - 1., 0., 1.) * vec4(1., -1., 1., 1.); }`;
	const trailFs = `#version 300 es
	precision highp float; in vec2 vUv; out vec4 o;
	uniform sampler2D uPrev; uniform vec2 uA, uB; uniform float uR, uDecay, uStr, uAspect;
	float seg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0., 1.); return length(pa - ba * h); }
	void main() {
		float prev = texture(uPrev, vec2(vUv.x, 1. - vUv.y)).r; prev = max(prev * uDecay - 0.0025, 0.);
		vec2 s = vec2(uAspect, 1.); float d = seg(vUv * s, uA * s, uB * s);
		o = vec4(max(prev, (1. - smoothstep(0., uR, d)) * uStr), 0., 0., 1.);
	}`;
	const imgFs = `#version 300 es
	precision highp float; in vec2 vUv; in vec2 vScreen; out vec4 o;
	uniform sampler2D uTex, uTrail; uniform vec3 uShadow, uLight; uniform vec2 uImgAspect; uniform float uTime, uGrain, uEdge, uBoxAspect, uDim, uAlpha, uClip;
	float h(vec2 p) { p = fract(p * vec2(443.8975, 397.2973)); p += dot(p, p.yx + 19.19); return fract((p.x + p.y) * p.x); }
	float vn(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + 1.), f.x), f.y); }
	void main() {
		if (vUv.x > uClip) discard;
		vec2 uv = vUv; float r = uBoxAspect / (uImgAspect.x / uImgAspect.y);
		uv = r > 1. ? vec2(uv.x, (uv.y - .5) / r + .5) : vec2((uv.x - .5) * r + .5, uv.y);
		vec3 c = texture(uTex, uv).rgb; float lum = dot(c, vec3(.299, .587, .114));
		float g = h(gl_FragCoord.xy + floor(uTime * 24.) * 13.7) - .5;
		float t = texture(uTrail, vec2(vScreen.x, 1. - vScreen.y)).r;
		t += (vn(gl_FragCoord.xy * .03 + uTime * .2) - .5) * .35 * uEdge * smoothstep(0., .3, t);
		float reveal = smoothstep(.03, .3, t); float edge = 1. - abs(reveal * 2. - 1.);
		vec3 duo = mix(uShadow, uLight, clamp(lum + g * uGrain * .25, 0., 1.)) * uDim;
		vec3 live = mix(vec3(lum), c, 1.18);
		o = vec4(mix(duo, live + g * uGrain * .12 * edge, reveal), 1.) * uAlpha;
	}`;
	const mk = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
	const prog = (f) => { const p = gl.createProgram(); gl.attachShader(p, mk(gl.VERTEX_SHADER, vs)); gl.attachShader(p, mk(gl.FRAGMENT_SHADER, f)); gl.bindAttribLocation(p, 0, 'p'); gl.linkProgram(p); return { p, u: (n) => gl.getUniformLocation(p, n) }; };
	const trailP = prog(trailFs), imgP = prog(imgFs);
	gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
	gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

	const TS = 256;
	const mkTrail = () => { const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, TS, TS, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
		for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, k, v);
		const f = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, f); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0); return { t, f }; };
	const trail = [mkTrail(), mkTrail()]; let ping = 0;

	const imgs = [...document.querySelectorAll(`${selector} img`)].map((el) => {
		const frame = el.closest(selector), tex = gl.createTexture(), o = { frame, el, tex, ok: false, w: 1, h: 1 };
		const up = () => { gl.bindTexture(gl.TEXTURE_2D, tex); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, el);
			for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, k, v);
			o.w = el.naturalWidth; o.h = el.naturalHeight; o.ok = true; };
		el.complete && el.naturalWidth ? up() : el.addEventListener('load', up); return o; });

	let cur = [.5, .5], prev = [.5, .5], active = false, lastMove = 0;
	const set = (x, y) => { prev = active ? cur : [x / innerWidth, y / innerHeight]; cur = [x / innerWidth, y / innerHeight]; active = true; lastMove = performance.now(); };
	addEventListener('pointermove', (e) => set(e.clientX, e.clientY), { passive: true });
	addEventListener('touchmove', (e) => set(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
	addEventListener('touchend', () => (active = false)); addEventListener('pointerleave', () => (active = false));
	const resize = () => { const d = Math.min(devicePixelRatio, 2); canvas.width = innerWidth * d; canvas.height = innerHeight * d; };
	addEventListener('resize', resize); resize();

	const t0 = performance.now();
	const frame = (now) => {
		if (!reduced) {
			gl.bindFramebuffer(gl.FRAMEBUFFER, trail[1 - ping].f); gl.viewport(0, 0, TS, TS); gl.useProgram(trailP.p);
			gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, trail[ping].t); gl.uniform1i(trailP.u('uPrev'), 0); gl.uniform4f(trailP.u('uRect'), 0, 0, 1, 1);
			gl.uniform2f(trailP.u('uA'), prev[0], prev[1]); gl.uniform2f(trailP.u('uB'), cur[0], cur[1]);
			gl.uniform1f(trailP.u('uR'), P.radius); gl.uniform1f(trailP.u('uDecay'), P.decay);
			gl.uniform1f(trailP.u('uStr'), active && now - lastMove < 120 ? P.strength : 0); gl.uniform1f(trailP.u('uAspect'), innerWidth / innerHeight);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); prev = cur; ping = 1 - ping;
		}
		gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, canvas.width, canvas.height); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
		gl.useProgram(imgP.p); gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, trail[ping].t); gl.uniform1i(imgP.u('uTrail'), 1);
		gl.uniform1f(imgP.u('uTime'), reduced ? 0 : (now - t0) / 1000); gl.uniform1f(imgP.u('uGrain'), P.grain); gl.uniform1f(imgP.u('uEdge'), P.edge); gl.uniform1f(imgP.u('uDim'), P.dim);
		for (const im of imgs) {
			if (!im.ok) continue; const r = im.frame.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight || r.width === 0) continue;
			const cs = getComputedStyle(im.frame); if (cs.visibility === 'hidden') continue; const rv = cs.getPropertyValue('--rv').trim();
			const look = LOOKS[im.frame.dataset.look] || LOOKS.bn; const a = +cs.opacity; gl.uniform1f(imgP.u('uClip'), rv === '' ? 1 : +rv);
			gl.uniform3fv(imgP.u('uShadow'), look[0]); gl.uniform3fv(imgP.u('uLight'), look[1]); gl.uniform1f(imgP.u('uAlpha'), a);
			gl.uniform4f(imgP.u('uRect'), r.left / innerWidth, r.top / innerHeight, r.width / innerWidth, r.height / innerHeight);
			gl.uniform2f(imgP.u('uImgAspect'), im.w, im.h); gl.uniform1f(imgP.u('uBoxAspect'), r.width / r.height);
			gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, im.tex); gl.uniform1i(imgP.u('uTex'), 0); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
		}
		requestAnimationFrame(frame);
	};
	requestAnimationFrame(frame);
	return { P };
}
