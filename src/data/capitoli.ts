// I capitoli della storia. Aggiungerne uno = una riga qui + una scena in
// src/components/scene/ + il suo builder in src/scripts/scene/ (registro in
// scene/index.js). Il resto (righello, musica, scroll) si adegua da solo.
// I testi sono la prima bozza (docs/testi-bozza.md): le frasi con [?] vanno confermate.
export type Capitolo = {
	id: string; // chiave della scena
	titolo: string;
	anno: string; // mostrato nel righello
	quando: string; // etichetta piccola nella scena
	stadio: string; // etichetta tecnica nel righello
	testo: string; // didascalia in prima persona
	musica: string; // chiave della traccia in TRACCE
	peso: number; // quanto scroll occupa rispetto al normale (1)
	dal: string; // data da cui le repo appartengono a questo capitolo
	chiaro?: boolean; // la scena ha sfondo chiaro: header e righello passano a testo nero (marchio rosso e nero)
};

export const CAPITOLI: Capitolo[] = [
	{ id: 'hello', titolo: 'Hello World', anno: '2024', quando: 'febbraio 2024', stadio: 'HTML nudo', musica: 'reggae', peso: 1, dal: '2024-02-01', chiaro: true,
		testo: 'Una riga di Java e un hello-world. Non sapevo ancora che mi sarebbe piaciuto.' },
	{ id: 'corso', titolo: 'Il corso', anno: '2024', quando: 'aprile 2024 – gennaio 2025', stadio: 'terminale e JS', musica: 'reggae', peso: 1, dal: '2024-04-01',
		testo: 'Ho fatto un corso Full Stack Developer. Quasi tutto è rimasto in locale: esercizi, errori, qualche momento di gloria. Il progetto finale, Presto, l\'abbiamo fatto in squadra.' },
	{ id: 'esperimenti', titolo: 'Esperimenti', anno: '2025', quando: 'inizio 2025', stadio: 'CSS e collage', musica: 'stylish', peso: 1, dal: '2025-01-01',
		testo: 'Vanilla JS, slider, effetti. Il periodo in cui rompevo le cose per capire come funzionavano.' },
	{ id: 'react', titolo: 'React', anno: '2025', quando: 'primavera 2025', stadio: 'React', musica: 'joyful', peso: 1, dal: '2025-01-30',
		testo: 'Un widget per volta, e un po\' di vergogna per i nomi. Ne ho tenute poche: Meal-Planner è quella a cui voglio ancora bene.' },
	{ id: 'siti', titolo: 'Siti veri', anno: '2026', quando: '2026', stadio: 'Astro e WebGL', musica: 'odyssey', peso: 2, dal: '2025-09-01',
		testo: 'Clienti, Astro, un occhio fisso ai punteggi di Lighthouse. Qui le cose iniziano a stare online davvero.' },
	{ id: 'oggi', titolo: 'Lo studio', anno: '2026', quando: 'oggi', stadio: 'oggi', musica: 'odyssey', peso: 1, dal: '2026-07-19',
		testo: 'Questa pagina è il posto dove continuo a giocare. Se ti serve un sito vero, quello lo faccio con lo studio.' },
];

// Una traccia può servire più capitoli: se la chiave è uguale, la musica continua senza stacchi.
export const TRACCE: Record<string, string> = {
	reggae: 'audio/reggae.mp3',
	stylish: 'audio/stylish-funk.mp3',
	joyful: 'audio/joyful-funk.mp3',
	// travel: 'audio/travel.mp3', // messa da parte (22/10): il capitolo "Siti veri" usa odyssey
	odyssey: 'audio/odyssey.mp3',
};

// La musica segue il capitolo che si vede: cambia solo se ci si ferma almeno questi secondi (scorrendo veloce non scatta),
// poi la traccia attuale scende a zero e quella nuova sale (fade-out, fade-in, senza incrocio).
export const MUSICA_ATTESA = 1.5;

export const capitoloDi = (data: string): number => {
	let idx = 0;
	CAPITOLI.forEach((c, i) => { if (data >= c.dal) idx = i; });
	return idx;
};
