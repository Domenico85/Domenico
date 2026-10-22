// 6 Oggi: ingresso dell'infinito e uscita (nessuna didascalia: il testo fa parte della scena).
export const oggi = {
	portale: ['50%', '50%'],
	build(s, { $, chars }) {
		s.fromTo($('#inf'), { scale: .3, rotate: -90, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: .2, ease: 'power3.out' }, 0);
		s.fromTo(chars('.p6'), { yPercent: 140, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: .008, duration: .08, ease: 'power3.out' }, .06);
		s.fromTo($('#sig'), { autoAlpha: 0, rotate: -4, y: 20 }, { autoAlpha: 1, rotate: -3, y: 0, duration: .1 }, .22);
		s.fromTo('.p6 p, .p6 .links, .p6 .fine', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, stagger: .03, duration: .08 }, .3);
		s.to($('#inf'), { rotate: 360, duration: .6 }, 0);
	},
};
