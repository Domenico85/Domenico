// 6 Oggi: ingresso dell'infinito e uscita (nessuna didascalia: il testo fa parte della scena).
export const oggi = {
	portale: ['50%', '50%'],
	build(s, { $, chars }) {
		s.fromTo($('#inf'), { scale: .3, rotate: -90, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: .25, ease: 'power3.out' }, .05);
		s.fromTo(chars('.p6'), { yPercent: 105 }, { yPercent: 0, stagger: .008, duration: .08, ease: 'power3.out' }, .25);
		s.fromTo($('#sig'), { autoAlpha: 0, rotate: -4, y: 20 }, { autoAlpha: 1, rotate: -3, y: 0, duration: .1 }, .4);
		s.fromTo('.p6 p, .p6 .links, .p6 .fine', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, stagger: .03, duration: .08 }, .5);
		s.to({}, { duration: .5 }, .6); // pausa finale prima dell'uscita
		s.to($('#inf'), { rotate: 360, duration: .6 }, 0);
	},
};
