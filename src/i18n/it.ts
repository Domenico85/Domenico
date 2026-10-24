// Tutti i testi della pagina in italiano (lingua di partenza). en.ts ed es.ts hanno la stessa forma:
// aggiungere o cambiare una chiave qui = farlo anche negli altri due (il tipo `Testi` lo ricorda).
export const it = {
	lang: 'it',
	locale: 'it_IT',
	descrizione: 'Domenico, sviluppatore web. La mappa di quello che ho costruito, una repo alla volta.',
	ui: {
		ingresso: 'Ingresso', caricamento: 'Caricamento in corso', conMusica: 'Entra con musica', senzaMusica: 'Senza musica',
		suonoOn: 'suono: on', suonoOff: 'suono: off', percorso: 'Percorso', capitoli: 'Capitoli', ilPercorso: 'Il percorso',
		gruppiRepo: 'Gruppi di repo', stadio: 'stadio',
		repo: 'REPO', capitoliTag: 'CAPITOLI', dal: 'DAL',
		costellazione: 'Le mie repo come stelle, a gruppi: tocca una stella per andare al capitolo',
		ciao: 'Ciao, sono', ruolo: 'Sviluppo siti web. Con Loop Studio lavoro, qui gioco.',
		sotto: 'Ogni “stella” è un progetto. Si accendono a gruppi, per periodo. Clicca su uno: ti porto nel capitolo giusto.',
		foto: 'foto: Greg Rakozy, Unsplash', scorri: 'scorri ↓',
	},
	capitoli: {
		hello: { titolo: 'Hello World', quando: 'febbraio 2024', stadio: 'HTML nudo',
			testo: 'Una riga di Java e un hello-world. Non sapevo ancora che mi sarebbe piaciuto.' },
		corso: { titolo: 'Il corso', quando: 'aprile 2024 – aprile 2025', stadio: 'terminale e JS',
			testo: 'Ho fatto un corso Full Stack Developer. Quasi tutto è rimasto in locale: esercizi, errori, qualche momento di gloria. Il progetto finale, Presto, l\'abbiamo fatto in squadra.' },
		esperimenti: { titolo: 'Esperimenti', quando: '2025, e ancora oggi', stadio: 'CSS e collage',
			testo: 'Vanilla JS, slider, effetti. Il periodo in cui rompevo le cose per capire come funzionavano. Lo faccio ancora, adesso nel Lab dello studio.' },
		react: { titolo: 'React', quando: 'gennaio – luglio 2025', stadio: 'React',
			testo: 'Un widget per volta, e un po\' di vergogna per i nomi. Ne ho tenute poche: Meal-Planner è quella a cui voglio ancora bene.' },
		siti: { titolo: 'Siti veri', quando: 'da settembre 2025', stadio: 'Astro e WebGL',
			testo: 'Clienti, Astro, un occhio fisso ai punteggi di Lighthouse. Qui le cose iniziano a stare online davvero.' },
		oggi: { titolo: 'Lo studio', quando: 'oggi', stadio: 'oggi',
			testo: 'Questa pagina è il posto dove continuo a giocare. Se ti serve un sito vero, quello lo faccio con lo studio.' },
	},
	gruppi: ['Primi passi', 'Il corso e Laravel', 'React, inverno', 'React, primavera', 'React, estate', 'Siti veri'],
	hello: { documento: 'Questo è il mio primo sito. Non ha stile.', link: 'Link non visitato' },
	corso: {
		righe: ['$ corso --avvia', '> aprile 2024: full stack, 400 ore', '> html, css, bootstrap, javascript', '> php, laravel, metodologie agili', '> quasi tutto resta in locale', '> primo bottone che cambia colore', '> errori: troppi', '> 17 aprile 2025: attestato', '$ ./esperimenti.sh'],
		alt: 'Presto.it, il progetto finale del corso, fatto in squadra',
	},
	esperimenti: {
		marquee: 'SLIDER · CARD · HOVER · 3D · SCROLL · GALLERIA · GRADIENTE · OMBRA · SLIDER · CARD · HOVER ·',
		alt: ['Slider con effetto sulle immagini', 'Animazione 3D a scroll', 'Carosello di caffè', 'Slider a tema animali', 'Slider con lattina e avocado', 'Previsioni del tempo con temporale', 'Il logo dello studio in 3D, a scorrimento', 'Il viaggio dell’acqua raccontato in solo CSS', 'Galleria di foto da trascinare', 'Medusa 3D che nuota seguendo lo scroll', 'Farfalla 3D che segue il puntatore', 'Galleria di foto da riordinare'],
	},
	react: { repoIn: (m: number) => `repo in ${m} ${m === 1 ? 'mese' : 'mesi'}` },
	siti: {
		etichetta: 'Astro, Lighthouse, clienti', passa: 'passa sopra: torna a colori', tocco: 'trascina il dito: torna a colori',
		lavori: [
			{ riga: 'Studio di osteopatia · WordPress, PHP', alt: 'Sito dello studio di osteopatia Osteomed' },
			{ riga: 'Concessionaria · WordPress, PHP', alt: 'Sito di GF Motori' },
			{ riga: 'Campo di paintball · Astro, prenotazioni online', alt: 'Sito di Axpro Paintball' },
			{ riga: 'Fotografa · Astro, Sanity', alt: 'Sito fotografico di Ananda Grejo' },
		],
	},
	oggi: {
		titolo: 'Oggi:', vaiAlloStudio: 'Vai allo studio', ilMioGithub: 'Il mio GitHub', ricomincia: '↑ Ricomincia',
		crediti: 'foto del cielo: Greg Rakozy, Unsplash · musica: Pixabay',
	},
};

export type Testi = typeof it;
