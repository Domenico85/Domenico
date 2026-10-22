// 4 React: contatore e nuvola di repo (i nomi veri, dal file dei dati).
export const react = {
	portale: ['50%', '90%'],
	build(s, { $, $$, chars }) {
		const fine = +$('#cnt').textContent, o = { n: 0 }, chips = $$('.chip');
		$('#cnt').textContent = '0';
		s.fromTo(chars('.p4'), { yPercent: 105 }, { yPercent: 0, stagger: .01, duration: .08, ease: 'power3.out' }, .05);
		s.to(o, { n: fine, duration: .55, onUpdate: () => { $('#cnt').textContent = Math.round(o.n); } }, .1);
		s.fromTo(chips, { scale: .4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: { each: .012, from: 'random' }, duration: .05, ease: 'back.out(2)' }, .12);
		s.to(chips, { y: (i) => (i % 2 ? -1 : 1) * (40 + (i % 5) * 18), duration: .6 }, .2);
		s.to($('#cnt'), { scale: 1.25, duration: .08 }, .84);
	},
};
