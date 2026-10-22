// 3 Esperimenti: collage + scritta gigante che scorre.
export const esperimenti = {
	portale: ['70%', '60%'],
	build(s, { $, wipe, chars }) {
		s.fromTo($('#mq'), { x: '8%' }, { x: '-62%', duration: .9 }, 0);
		[['.p3 .fr.a', .1], ['.p3 .fr.b', .22], ['.p3 .fr.c', .34]].forEach(([sel, at]) => {
			wipe(s, $(`${sel} .frame`), 1, at, .14);
			s.fromTo($(sel), { yPercent: 14 }, { yPercent: 0, duration: .22, ease: 'power3.out' }, at);
			wipe(s, $(`${sel} .frame`), 0, .84, .05);
		});
		s.fromTo(chars('.p3'), { yPercent: 105 }, { yPercent: 0, stagger: .008, duration: .08, ease: 'power3.out' }, .1);
	},
};
