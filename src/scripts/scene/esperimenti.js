// 3 Esperimenti: scritta gigante che scorre e due serie di tre schede (la prima esce, entra la seconda).
export const esperimenti = {
	portale: ['70%', '60%'],
	build(s, { $, wipe, chars }) {
		s.fromTo($('#mq'), { x: '8%' }, { x: '-62%', duration: 1 }, 0);
		// [scheda, ingresso, uscita] in unita' di scena
		[['a', .04, .4], ['b', .09, .4], ['c', .14, .4], ['d', .46, .94], ['e', .51, .94], ['f', .56, .94]].forEach(([k, dentro, fuori]) => {
			const sel = `.p3 .fr.${k}`;
			wipe(s, $(`${sel} .frame`), 1, dentro, .12);
			s.fromTo($(sel), { yPercent: 14 }, { yPercent: 0, duration: .2, ease: 'power3.out' }, dentro);
			wipe(s, $(`${sel} .frame`), 0, fuori, .05);
		});
		s.fromTo(chars('.p3'), { yPercent: 140, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: .008, duration: .08, ease: 'power3.out' }, .04);
	},
};
