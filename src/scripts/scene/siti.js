// 5 Siti veri: i lavori veri si aprono uno dopo l'altro davanti al titolo.
export const siti = {
	portale: ['50%', '50%'],
	build(s, { $, $$, wipe }) {
		const frs = $$('#fr5 .fr'), caps = $$('.c5'), n = frs.length, win = .62 / n;
		s.fromTo($('#t5'), { scale: .6, opacity: 0 }, { scale: 1, opacity: 1, duration: .15, ease: 'power3.out' }, .05);
		s.fromTo($('#t5'), { xPercent: 0 }, { xPercent: -12, duration: .7 }, .2);
		s.fromTo($('#fr5'), { scale: 1.2 }, { scale: 1, duration: .5, ease: 'power2.out' }, .2);
		frs.forEach((f, k) => {
			const frame = f.querySelector('.frame'), at = .2 + k * win, out = k === n - 1 ? .86 : at + win - .02;
			wipe(s, frame, 1, at, .12);
			s.fromTo(caps[k], { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .06 }, at + .04);
			wipe(s, frame, 0, out, .05);
			s.to(caps[k], { autoAlpha: 0, duration: .04 }, out);
		});
		const lh = { n: 0 };
		s.fromTo($('#lh'), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: .08 }, .55)
			.to(lh, { n: 100, duration: .2, onUpdate: () => { $('#lh').textContent = Math.round(lh.n); } }, .55);
	},
};
