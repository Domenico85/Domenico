// 5 Siti veri: i lavori veri si aprono uno dopo l'altro davanti al titolo.
export const siti = {
	portale: ['50%', '50%'],
	build(s, { $, $$, wipe }) {
		const frs = $$('#fr5 .fr'), caps = $$('.c5'), n = frs.length, win = .7 / n;
		s.fromTo($('#t5'), { scale: .6, opacity: 0 }, { scale: 1, opacity: 1, duration: .1, ease: 'power3.out' }, 0);
		s.fromTo($('#t5'), { xPercent: 0 }, { xPercent: -12, duration: .7 }, .1);
		s.fromTo($('#fr5'), { scale: 1.2 }, { scale: 1, duration: .5, ease: 'power2.out' }, .1);
		frs.forEach((f, k) => {
			const frame = f.querySelector('.frame'), shot = f.querySelector('.shot'), at = .1 + k * win, out = k === n - 1 ? .86 : at + win - .02;
			wipe(s, frame, 1, at, .12);
			s.fromTo(caps[k], { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .06 }, at + .04);
			wipe(s, frame, 0, out, .05);
			s.set(shot, { pointerEvents: 'auto' }, at + .02).set(shot, { pointerEvents: 'none' }, out); // solo il sito in scena si apre al clic
			s.to(caps[k], { autoAlpha: 0, duration: .04 }, out);
		});
	},
};
