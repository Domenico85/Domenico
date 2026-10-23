// Selettore di lingua (componente Lingue.astro): clic su una sigla o trascinamento della pallina.
// Le sigle sono link veri: qui si anima la pallina e poi si va all'indirizzo della lingua scelta (la pagina riparte dal loader).
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const SLOT = () => parseFloat(getComputedStyle(document.querySelector('.lang')).getPropertyValue('--slot')), PAD = 4; // come in global.css (--slot cambia sotto i 480 px)

export function initLingue() {
	document.querySelectorAll('.lang').forEach((el) => {
		const links = [...el.querySelectorAll('.lang__a')], knob = el.querySelector('.lang__knob');
		const corrente = links.findIndex((a) => a.getAttribute('aria-current') === 'true');
		const set = (i) => { el.style.setProperty('--i', i); el.dataset.cur = Math.round(i); knob.textContent = links[Math.round(i)].textContent; };
		// posizione (0..2) sotto il puntatore; el.offsetWidth e' la misura vera, getBoundingClientRect quella dopo eventuali scale
		const slotDi = (x) => { const r = el.getBoundingClientRect(); const px = (x - r.left) * (el.offsetWidth / r.width); return Math.min(2, Math.max(0, (px - PAD - SLOT() / 2) / SLOT())); };
		const vai = (n) => {
			if (n === corrente) { set(corrente); return; }
			set(n);
			setTimeout(() => { location.href = links[n].href; }, reduced ? 0 : 380);
		};
		let down = false, moved = false, x0 = 0, dalPuntatore = false;
		el.addEventListener('pointerdown', (e) => { if (e.button) return; down = true; moved = false; x0 = e.clientX; el.setPointerCapture(e.pointerId); });
		el.addEventListener('pointermove', (e) => { if (!down) return; if (!moved && Math.abs(e.clientX - x0) > 4) { moved = true; el.classList.add('drag'); } if (moved) set(slotDi(e.clientX)); });
		el.addEventListener('pointerup', (e) => { if (!down) return; down = false; el.classList.remove('drag'); dalPuntatore = true; vai(Math.round(slotDi(e.clientX))); });
		el.addEventListener('pointercancel', () => { down = false; el.classList.remove('drag'); set(corrente); });
		// Invio/spazio da tastiera: il clic arriva senza passare dal puntatore. Clic con Ctrl/Cmd o tasto centrale: link normale (nuova scheda).
		links.forEach((a, n) => a.addEventListener('click', (e) => {
			if (e.ctrlKey || e.metaKey || e.shiftKey || e.button) return;
			e.preventDefault();
			if (dalPuntatore) { dalPuntatore = false; return; }
			vai(n);
		}));
		// tornando indietro dalla cache del browser la pallina deve stare sulla lingua della pagina
		addEventListener('pageshow', (e) => { if (e.persisted) set(corrente); });
	});
}
