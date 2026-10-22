// Registro delle scene e costruzione della timeline principale.
// Ogni capitolo (src/data/capitoli.ts) ha una scena con lo stesso `id`: il builder scrive i tempi
// in unità di scena (0-1) dentro una timeline figlia, qui la si allunga per il `peso` del capitolo
// e si mettono in fila le scene. L'altezza dello scroll si calcola dalla somma, quindi aggiungere
// un capitolo non richiede di ritoccare i tempi delle altre.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hello } from './hello.js';
import { corso } from './corso.js';
import { esperimenti } from './esperimenti.js';
import { react } from './react.js';
import { siti } from './siti.js';
import { oggi } from './oggi.js';

const SCENE = { hello, corso, esperimenti, react, siti, oggi };
const VH_PER_UNITA = 1.5; // altezze di schermo di scroll per ogni unità di timeline
const PORTALE = .09; // durata (in unità) del cerchio che si apre tra due scene

export function buildStory({ capitoli, onChapter }) {
	gsap.registerPlugin(ScrollTrigger);
	const $ = (s, r = document) => r.querySelector(s);
	const $$ = (s, r = document) => [...r.querySelectorAll(s)];
	const panes = $$('.pane');
	const caret = Object.assign(document.createElement('span'), { className: 'caret' });
	const wipe = (s, frame, to, at, d = .12) => s.to(frame, { '--rv': to, duration: d, ease: 'power2.inOut' }, at);
	const typed = (s, el, at, d, cursor) => {
		const text = el.textContent, o = { n: 0 }; el.textContent = '';
		s.to(o, { n: text.length, duration: d, onUpdate: () => {
			el.textContent = text.slice(0, Math.round(o.n)) + (typeof cursor === 'string' ? cursor : '');
			if (cursor && typeof cursor !== 'string') el.append(cursor.cloneNode());
		} }, at);
	};

	gsap.set(panes, { autoAlpha: 0 }); gsap.set(panes[0], { autoAlpha: 1 });
	const kids = capitoli.map((c, i) => {
		const s = gsap.timeline({ defaults: { ease: 'none' } }), pane = panes[i];
		s.to({}, { duration: 1 }, 0); // ogni scena dura almeno una unità
		SCENE[c.id].build(s, { $: (q) => $(q, pane), $$: (q) => $$(q, pane), wipe, typed, chars: (q) => $$(q + ' .w > span'), caret });
		const cap = $('.cp', pane);
		if (cap) s.fromTo(cap, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: .08 }, .2);
		const natural = s.duration(); s.duration(natural * c.peso);
		return s;
	});
	const starts = []; let total = 0;
	kids.forEach((k) => { starts.push(total); total += k.duration(); });

	const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
		trigger: '#story', start: 'top top', end: () => '+=' + innerHeight * VH_PER_UNITA * total, scrub: .7, pin: true, anticipatePin: 1,
		onUpdate: (st) => { const t = st.progress * total; let i = 0; starts.forEach((a, k) => { if (t >= a) i = k; }); onChapter?.(i, st.progress, st.isActive); },
	} });
	kids.forEach((k, i) => {
		tl.add(k, starts[i]);
		const portale = SCENE[capitoli[i].id].portale;
		if (i && portale) { // la scena i entra con un cerchio che si apre sopra la precedente
			const at = starts[i] - PORTALE, [cx, cy] = portale;
			tl.set(panes[i], { autoAlpha: 1 }, at).fromTo(panes[i], { clipPath: `circle(0% at ${cx} ${cy})` }, { clipPath: `circle(150% at ${cx} ${cy})`, duration: PORTALE, ease: 'power2.in' }, at)
				.set(panes[i - 1], { autoAlpha: 0 }, at + PORTALE).set(panes[i], { clipPath: 'none' }, at + PORTALE + .01);
		} else if (i) { // senza portale: cambio netto
			tl.set(panes[i], { autoAlpha: 1 }, starts[i]).set(panes[i - 1], { autoAlpha: 0 }, starts[i]);
		}
	});
	const st = tl.scrollTrigger;
	return {
		st,
		// scroll fino al capitolo i (a circa un terzo della sua durata, dove la scena è già leggibile)
		vai(i) { const y = st.start + (st.end - st.start) * (starts[i] + kids[i].duration() * .35) / total; scrollTo({ top: y, behavior: 'smooth' }); },
	};
}
