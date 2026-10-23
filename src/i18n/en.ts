// English version. Same shape as it.ts (the `Testi` type enforces it). First person, same tone as the Italian.
import type { Testi } from './it';

export const en: Testi = {
	lang: 'en',
	locale: 'en_GB',
	descrizione: 'Domenico, web developer. A map of what I\'ve built, one repo at a time.',
	ui: {
		ingresso: 'Entrance', caricamento: 'Loading', conMusica: 'Enter with music', senzaMusica: 'Without music',
		suonoOn: 'sound: on', suonoOff: 'sound: off', percorso: 'Journey', capitoli: 'Chapters', ilPercorso: 'The journey',
		gruppiRepo: 'Repo groups', stadio: 'stage',
		repo: 'REPOS', capitoliTag: 'CHAPTERS', dal: 'SINCE',
		costellazione: 'My repos as stars, in groups: tap a star to jump to its chapter',
		ciao: 'Hi, I\'m', ruolo: 'I build websites. At Loop Studio I work, here I play.',
		sotto: 'Every “star” is a project. They light up in groups, by period. Click one and I\'ll take you to the right chapter.',
		foto: 'photo: Greg Rakozy, Unsplash', scorri: 'scroll ↓',
	},
	capitoli: {
		hello: { titolo: 'Hello World', quando: 'February 2024', stadio: 'bare HTML',
			testo: 'One line of Java and a hello-world. I didn\'t know yet that I\'d like it.' },
		corso: { titolo: 'The course', quando: 'April 2024 – April 2025', stadio: 'terminal and JS',
			testo: 'I took a Full Stack Developer course. Almost everything stayed on my machine: exercises, mistakes, the odd moment of glory. The final project, Presto, we built as a team.' },
		esperimenti: { titolo: 'Experiments', quando: '2025, and still today', stadio: 'CSS and collage',
			testo: 'Vanilla JS, sliders, effects. The period when I broke things to understand how they worked. I still do, now in the studio\'s Lab.' },
		react: { titolo: 'React', quando: 'January – July 2025', stadio: 'React',
			testo: 'One widget at a time, and a little shame about the names. I kept only a few: Meal-Planner is the one I\'m still fond of.' },
		siti: { titolo: 'Real sites', quando: 'since September 2025', stadio: 'Astro and WebGL',
			testo: 'Clients, Astro, one eye always on the Lighthouse scores. This is where things start going live for real.' },
		oggi: { titolo: 'The studio', quando: 'today', stadio: 'today',
			testo: 'This page is where I keep playing. If you need a real website, I build that with the studio.' },
	},
	gruppi: ['First steps', 'The course and Laravel', 'React, winter', 'React, spring', 'React, summer', 'Real sites'],
	hello: { documento: 'This is my first website. It has no style.', link: 'Unvisited link' },
	corso: {
		righe: ['$ course --start', '> April 2024: full stack, 400 hours', '> html, css, bootstrap, javascript', '> php, laravel, agile methods', '> almost everything stays local', '> first button that changes color', '> errors: too many', '> 17 April 2025: certificate', '$ ./experiments.sh'],
		alt: 'Presto.it, the final project of the course, built as a team',
	},
	esperimenti: {
		marquee: 'SLIDER · CARD · HOVER · GRADIENT · SHADOW · SLIDER · CARD · HOVER ·',
		alt: ['Slider with an image effect', '3D scroll animation', 'Coffee carousel', 'Animal-themed slider', 'Slider with a can and an avocado', 'Weather forecast with a thunderstorm'],
	},
	react: { repoIn: (m: number) => `repos in ${m} ${m === 1 ? 'month' : 'months'}` },
	siti: {
		etichetta: 'Astro, Lighthouse, clients', passa: 'hover: the colour comes back', tocco: 'drag your finger: the colour comes back',
		lavori: [
			{ riga: 'Osteopathy practice · WordPress, PHP', alt: 'Website of the Osteomed osteopathy practice' },
			{ riga: 'Car dealership · WordPress, PHP', alt: 'GF Motori website' },
			{ riga: 'Paintball field · Astro, online booking', alt: 'Axpro Paintball website' },
			{ riga: 'Photographer · Astro, Sanity', alt: 'Photography website of Ananda Grejo' },
		],
	},
	oggi: {
		titolo: 'Today:', vaiAlloStudio: 'Go to the studio', ilMioGithub: 'My GitHub', ricomincia: '↑ Start over',
		crediti: 'sky photo: Greg Rakozy, Unsplash · music: Pixabay',
	},
};
