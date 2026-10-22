// 1 Hello World: HTML nudo, il testo si scrive da solo. Tempi in unità di scena (0-1).
export const hello = {
	portale: null,
	build(s, { $, typed, caret }) {
		typed(s, $('#t1'), 0, .3, caret);
		typed(s, $('#t1b'), .34, .26);
		s.to($('#t1l'), { opacity: 1, duration: .02 }, .66);
		for (let k = 0; k < 6; k++) s.to($('.p1 .doc'), { x: k % 2 ? 22 : -26, skewX: k % 2 ? 6 : -8, filter: k % 3 ? 'invert(1)' : 'none', duration: .012 }, .86 + k * .012);
		s.set($('.p1 .doc'), { x: 0, skewX: 0, filter: 'none' }, .95);
	},
};
