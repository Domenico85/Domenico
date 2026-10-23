// I capitoli della storia. Aggiungerne uno = una riga qui + una scena in
// src/components/scene/ + il suo builder in src/scripts/scene/ (registro in
// scene/index.js) + i suoi testi in src/i18n/<lingua>.ts. Il resto (righello, musica, scroll) si adegua da solo.
// I testi (titolo, quando, stadio, didascalia) stanno in src/i18n: `capitoliIn(t)` li unisce a questi dati.
import type { Testi } from '../i18n/it';

export type CapitoloBase = {
	id: string; // chiave della scena e dei testi in i18n
	anno: string; // mostrato nel righello
	musica: string; // chiave della traccia in TRACCE
	peso: number; // quanto scroll occupa rispetto al normale (1)
	dal: string; // data da cui le repo appartengono a questo capitolo
	chiaro?: boolean; // la scena ha sfondo chiaro: header e righello passano a testo nero (marchio rosso e nero)
};

export type Capitolo = CapitoloBase & {
	titolo: string; // grande, nella scena
	quando: string; // etichetta piccola nella scena
	stadio: string; // etichetta tecnica nel righello
	testo: string; // didascalia in prima persona
};

export const CAPITOLI: CapitoloBase[] = [
	{ id: 'hello', anno: '2024', musica: 'reggae', peso: .75, dal: '2024-02-01', chiaro: true },
	{ id: 'corso', anno: '2024', musica: 'reggae', peso: .85, dal: '2024-04-01' },
	{ id: 'esperimenti', anno: '2025', musica: 'stylish', peso: 1.8, dal: '2025-01-01' },
	{ id: 'react', anno: '2025', musica: 'joyful', peso: 1, dal: '2025-01-30' },
	{ id: 'siti', anno: '2026', musica: 'odyssey', peso: 2, dal: '2025-09-01' },
	{ id: 'oggi', anno: '2026', musica: 'odyssey', peso: .6, dal: '2026-07-19' },
];

export const capitoliIn = (t: Testi): Capitolo[] => CAPITOLI.map((c) => ({ ...c, ...t.capitoli[c.id as keyof Testi['capitoli']] }));

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
