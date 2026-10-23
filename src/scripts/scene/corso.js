// 2 Il corso: terminale, poi un'immagine che si colora.
export const corso = {
	portale: ['30%', '40%'],
	build(s, { $, typed, wipe }) {
		// su telefono l'immagine copre il terminale: il testo finisce prima, poi si abbassa e l'immagine entra
		const telefono = matchMedia('(max-width: 760px)').matches;
		typed(s, $('#term'), .02, telefono ? .4 : .62, '▌');
		s.fromTo($('.p2 .big-n'), { yPercent: 40 }, { yPercent: 0, duration: .5 }, 0);
		if (telefono) s.to($('#term'), { opacity: .1, duration: .06 }, .44).to($('#term'), { opacity: 1, duration: .06 }, .86);
		wipe(s, $('.p2 .frame'), 1, telefono ? .46 : .3, .25);
		wipe(s, $('.p2 .frame'), 0, .86, .06);
	},
};
