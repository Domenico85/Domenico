// 2 Il corso: terminale, poi un'immagine che si colora.
export const corso = {
	portale: ['30%', '40%'],
	build(s, { $, typed, wipe }) {
		typed(s, $('#term'), .02, .5, '▌');
		s.fromTo($('.p2 .big-n'), { yPercent: 40 }, { yPercent: 0, duration: .5 }, 0);
		wipe(s, $('.p2 .frame'), 1, .24, .25);
		wipe(s, $('.p2 .frame'), 0, .84, .06);
	},
};
