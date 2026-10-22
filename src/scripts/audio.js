// Audio con Web Audio: più tracce mp3 con dissolvenza incrociata (una per capitolo) e filtro che segue il mouse.
// createAudio({ tracks: { a: 'audio/a.mp3', b: 'audio/b.mp3' } }); audio.play('b') passa a "b" con un crossfade.
// Parte solo dopo un clic (regola dei browser). Se non ci sono tracce, ambient generativo di riserva.
const CHORDS = [[110, 164.8, 220, 261.6, 329.6], [87.3, 130.8, 174.6, 220, 261.6], [130.8, 196, 261.6, 329.6, 392], [98, 146.8, 196, 246.9, 293.7]];

export function createAudio({ tracks = {} } = {}) {
	let ctx, master, filter, timer, step = 0, on = false, current = null;
	const chans = {}; // nome -> { el, gain }
	const has = Object.keys(tracks).length > 0;
	const impulse = (c, sec = 3) => { const n = c.sampleRate * sec, b = c.createBuffer(2, n, c.sampleRate);
		for (let ch = 0; ch < 2; ch++) { const d = b.getChannelData(ch); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2.6); } return b; };
	const playChord = () => { const t = ctx.currentTime, dur = 9;
		for (const f of CHORDS[step++ % CHORDS.length]) for (const det of [-7, 6]) { const o = ctx.createOscillator(), g = ctx.createGain();
			o.type = f < 150 ? 'sine' : 'triangle'; o.frequency.value = f; o.detune.value = det;
			g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.09, t + 3.5); g.gain.linearRampToValueAtTime(0, t + dur);
			o.connect(g).connect(filter); o.start(t); o.stop(t + dur + .1); } };
	const init = () => {
		ctx = new (window.AudioContext || window.webkitAudioContext)();
		master = ctx.createGain(); master.gain.value = 0;
		filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = has ? 4000 : 900; filter.Q.value = .6;
		const rev = ctx.createConvolver(); rev.buffer = impulse(ctx); const wet = ctx.createGain(); wet.gain.value = has ? .12 : .55;
		filter.connect(master); filter.connect(rev); rev.connect(wet).connect(master); master.connect(ctx.destination);
		for (const [name, src] of Object.entries(tracks)) { const el = new Audio(src); el.loop = true; el.crossOrigin = 'anonymous'; el.preload = 'none';
			const gain = ctx.createGain(); gain.gain.value = 0; ctx.createMediaElementSource(el).connect(gain).connect(filter); chans[name] = { el, gain }; }
		if (!has) { playChord(); timer = setInterval(playChord, 7000); }
	};
	const fade = (name, to, sec = 2.5) => { const c = chans[name]; if (!c) return; const t = ctx.currentTime; c.gain.gain.cancelScheduledValues(t); c.gain.gain.setValueAtTime(c.gain.gain.value, t); c.gain.gain.linearRampToValueAtTime(to, t + sec);
		if (to > 0) c.el.play().catch(() => {}); else setTimeout(() => chans[name] && c.gain.gain.value < .01 && c.el.pause(), sec * 1000 + 100); };
	return {
		get on() { return on; },
		start(first) { if (!ctx) init(); ctx.resume(); on = true; master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(.8, ctx.currentTime + 1.5); this.play(first || current || Object.keys(tracks)[0]); },
		stop() { if (!ctx) return; on = false; master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(0, ctx.currentTime + .8); },
		toggle() { on ? this.stop() : this.start(); return on; },
		// passa a un'altra traccia con dissolvenza incrociata (se la musica è spenta ricorda solo la scelta)
		play(name) { if (!name || name === current && on) { current = name || current; return; } const prev = current; current = name; if (!ctx || !on) return; if (prev && prev !== name) fade(prev, 0); fade(name, 1); },
		energy(x) { if (ctx && on) filter.frequency.setTargetAtTime((has ? 4000 : 700) + Math.min(1, x) * (has ? 14000 : 1600), ctx.currentTime, .4); },
	};
}
