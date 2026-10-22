// 1 Hello World: HTML nudo, il testo si scrive da solo. Tempi in unità di scena (0-1).
export const hello = {
	portale: null,
	build(s, { $, typed, caret }) {
		typed(s, $('#t1'), 0, .3, caret);
		typed(s, $('#t1b'), .34, .26);
		s.to($('#t1l'), { opacity: 1, duration: .02 }, .66);
	},
};
