// 3 Esperimenti: scritta gigante che scorre e quattro serie di tre schede (ogni serie esce quando entra la successiva).
export const esperimenti = {
	portale: ['70%', '60%'],
	build(s, { $, $$, wipe, chars }) {
		s.fromTo($('#mq'), { x: '8%' }, { x: '-62%', duration: 1 }, 0);
		// schede in ordine di serie (3 per serie): ingresso e uscita in unita' di scena; l'uscita e' sfalsata cosi' anche la terza resta in vista un po'
		const SERIE = .24, DENTRO = .09;
		$$('.fr').forEach((el, i) => {
			const serie = Math.floor(i / 3), j = i % 3, inizio = serie * SERIE;
			const dentro = inizio + .02 + j * .035, fuori = inizio + .19 + j * .02;
			const frame = el.querySelector('.frame');
			wipe(s, frame, 1, dentro, DENTRO);
			s.fromTo(el, { yPercent: 14 }, { yPercent: 0, duration: .2, ease: 'power3.out' }, dentro);
			wipe(s, frame, 0, fuori, .05);
		});
		s.fromTo(chars('.p3'), { yPercent: 140, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: .008, duration: .08, ease: 'power3.out' }, .04);
	},
};
