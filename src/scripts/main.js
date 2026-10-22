// Regia della pagina: loader, musica, hero con costellazione, palco con le scene, cursore.
// I dati arrivano dal file JSON inserito dalla pagina (capitoli, tracce, repo, gruppi).
import { initReveal } from './reveal.js';
import { initConstellation } from './constellation.js';
import { createAudio } from './audio.js';
import { buildStory } from './scene/index.js';

const $ = (s) => document.querySelector(s);
const D = JSON.parse($('#app-data').textContent);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ----- lettere che salgono
const split = (el) => { let i = 0; const walk = (n) => { for (const c of [...n.childNodes]) { if (c.nodeType === 3) { const f = document.createDocumentFragment();
	c.textContent.split(/(\s+)/).forEach((w) => { if (!w.trim()) { f.append(w); return; } const sw = document.createElement('span'); sw.className = 'w'; sw.setAttribute('aria-hidden', 'true');
		[...w].forEach((ch) => { const s = document.createElement('span'); s.textContent = ch; s.style.setProperty('--i', i++); sw.append(s); }); f.append(sw); }); c.replaceWith(f); } else walk(c); } };
	el.setAttribute('aria-label', el.textContent); walk(el); };
document.querySelectorAll('[data-split]').forEach(split);
let ready = false;
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting && ready) { e.target.classList.add('in'); e.target.querySelectorAll('.w').forEach((w) => w.classList.add('in')); } }), { threshold: .25 });

// ----- musica: segue il capitolo visibile. Il cambio parte solo se ci si ferma D.attesa secondi nel capitolo
// (scorrendo veloce non scatta); la dissolvenza incrociata la fa audio.js.
initReveal({ canvas: $('#gl') });
const tracks = Object.fromEntries(Object.entries(D.tracce).map(([k, v]) => [k, D.base + v]));
const audio = createAudio({ tracks });
let corrente = null, voluta = null, timer = 0;
const applica = () => { if (voluta === corrente) return; corrente = voluta; audio.play(corrente); };
const vogliaTraccia = (t) => {
	voluta = t; clearTimeout(timer); if (t === corrente) return;
	timer = setTimeout(applica, D.attesa * 1000);
};

// ----- palco: la timeline principale
let story = null;
const cap = D.capitoli;
if (reduced) document.documentElement.classList.add('no-motion');
else {
	let ultimo = -1;
	story = buildStory({ capitoli: cap, onChapter: (i, _p, attiva) => {
		document.documentElement.dataset.tone = attiva && cap[i].chiaro ? 'light' : 'dark';
		$('#mk').style.left = (100 * (scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight))) + '%';
		if (i === ultimo) return; ultimo = i;
		$('#yr').textContent = cap[i].anno; $('#stage').textContent = `stadio ${i + 1}/${cap.length} · ${cap[i].stadio}`; vogliaTraccia(cap[i].musica); audio.preload(cap[Math.min(i + 1, cap.length - 1)].musica);
	} });
}

// ----- salto a un capitolo (stelle, elenco da tastiera)
const vai = (i) => { if (story) story.vai(i); else document.querySelectorAll('.pane')[i]?.scrollIntoView({ behavior: 'smooth' }); };
document.querySelectorAll('[data-vai]').forEach((b) => (b.onclick = () => vai(+b.dataset.vai)));

// ----- hero: ingresso, zoom del cielo e uscita a scroll
const constellation = initConstellation({ canvas: $('#cc'), labelEl: $('#lbl'), navEl: $('#gnav'), repos: D.repos, gruppi: D.gruppi,
	onPick: (r) => vai(r.cap) });
const hbg = $('#hbg'); let zoom = 1.25;
const heroLoop = () => {
	if (scrollY < innerHeight * 1.2) { if (ready) zoom += (1.02 - zoom) * .015; const sy = Math.min(scrollY, innerHeight); hbg.style.transform = `scale(${zoom + sy / innerHeight * .15}) translateY(${sy * .12}px)`; }
	requestAnimationFrame(heroLoop);
};
heroLoop();
addEventListener('scroll', () => { const p = Math.min(1, scrollY / innerHeight); $('#h1').style.opacity = 1 - p * 1.2; $('#h1').style.transform = `translateY(${-p * 60}px)`; $('#gnav').inert = p > .6; }, { passive: true }); // fuori dal hero i gruppi non si raggiungono con Tab (il focus riporterebbe lassu')

// ----- finche' il loader e' aperto, il resto della pagina non si raggiunge ne' con Tab ne' con il lettore di schermo
const dietro = ['header.top', '.capnav', 'main'].map((q) => $(q)); dietro.forEach((e) => (e.inert = true));

// ----- loader: il contatore sale fino al 90% da solo, poi aspetta caricamento vero (pagina e font)
const gn = $('#gnum'), t0 = performance.now(); let caricato = false, n = 0;
Promise.all([new Promise((r) => (document.readyState === 'complete' ? r() : addEventListener('load', r))), document.fonts.ready]).then(() => { caricato = true; });
const tick = () => {
	n = Math.min(caricato ? 100 : 90, Math.round((performance.now() - t0) / 22)); gn.firstChild.textContent = n;
	if (n < 100) requestAnimationFrame(tick); else $('#ask').classList.add('on');
}; tick();
const snd = $('#snd'); const syncSnd = () => { snd.textContent = 'suono: ' + (audio.on ? 'on' : 'off'); snd.setAttribute('aria-pressed', audio.on); };
document.querySelectorAll('[data-snd]').forEach((b) => b.onclick = () => {
	if (b.dataset.snd === '1') audio.start(D.capitoli[0].musica); syncSnd(); $('#gate').classList.add('open'); $('#gate').inert = true; dietro.forEach((e) => (e.inert = false)); $('#cur').classList.add('on');
	setTimeout(() => { ready = true; document.querySelectorAll('[data-split]:not(.g),.rv').forEach((el) => io.observe(el)); constellation?.go(); $('#rule').classList.add('on'); }, 500); });
snd.onclick = () => { audio.toggle(); syncSnd(); };
let eraAcceso = false; // la musica si ferma se cambi scheda e riparte quando torni
document.addEventListener('visibilitychange', () => { if (document.hidden) { eraAcceso = audio.on; if (eraAcceso) { audio.stop(); syncSnd(); } } else if (eraAcceso) { audio.start(); syncSnd(); } });
$('#top-btn').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

// ----- cursore con infinito, bottoni magnetici, musica che segue il movimento
const cur = $('#cur'); let cx = 0, cy = 0, tx = 0, ty = 0, speed = 0;
addEventListener('pointermove', (e) => { speed = Math.min(1, speed + Math.hypot(e.movementX, e.movementY) / 120); tx = e.clientX; ty = e.clientY; cur.classList.toggle('big', !!e.target.closest('a,button,canvas#cc')); });
(function loop() { cx += (tx - cx) * .18; cy += (ty - cy) * .18; cur.style.transform = `translate(${cx + 10}px,${cy + 10}px)`; speed *= .96; audio.energy(speed); requestAnimationFrame(loop); })();
document.querySelectorAll('.btn').forEach((b) => { b.addEventListener('pointermove', (e) => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .2}px,${(e.clientY - r.top - r.height / 2) * .3}px)`; }); b.addEventListener('pointerleave', () => (b.style.transform = '')); });
