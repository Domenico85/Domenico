// Le repo della costellazione. Date = createdAt reali di GitHub (Domenico85).
// Si vedono a gruppi (GRUPPI): ogni gruppo ha una "temperatura" di stella.
// Non compaiono: Incanto, Incanto_Astro (scelta dell'utente) e Laravel (cancellata).
// `url` solo per le repo pubbliche; le private compaiono senza link.
import { capitoloDi } from './capitoli';

export type Gruppo = { nome: string; periodo: string; tech: string; colore: [number, number, number] };

// Colori come la temperatura delle stelle: blu, rosso, arancio, giallo, bianco, azzurro.
export const GRUPPI: Gruppo[] = [
	{ nome: 'Primi passi', periodo: '2024', tech: 'base', colore: [0.45, 0.62, 1.0] }, // blu
	{ nome: 'Il corso e Laravel', periodo: '2025', tech: 'laravel', colore: [1.0, 0.36, 0.28] }, // rosso
	{ nome: 'React, inverno', periodo: '2025', tech: 'react', colore: [1.0, 0.68, 0.38] }, // arancio
	{ nome: 'React, primavera', periodo: '2025', tech: 'react', colore: [1.0, 0.92, 0.62] }, // giallo
	{ nome: 'React, estate', periodo: '2025', tech: 'react', colore: [0.96, 0.97, 1.0] }, // bianco
	{ nome: 'Siti veri', periodo: '2025-26', tech: 'siti', colore: [0.62, 0.84, 1.0] }, // azzurro
];

// `cap` forza il capitolo quando la data da sola lo assegna male (Presto e Laravel sono del corso, Ananda e' un sito vero).
type Voce = { d: string; name: string; g: number; pubblica?: boolean; link?: string; cap?: number };

const VOCI: Voce[] = [
	{ d: '2024-02-08', name: 'Java', g: 0 },
	{ d: '2024-02-14', name: 'hello-world', g: 0 },
	{ d: '2024-04-03', name: 'Domenico', g: 0 },
	{ d: '2024-04-10', name: 'javascript-exercises', g: 0 },
	{ d: '2024-04-16', name: 'JavaScript30', g: 0 },
	{ d: '2025-01-13', name: 'portfolio', g: 2 },
	{ d: '2025-01-30', name: 'workout-app', g: 2, pubblica: true },
	{ d: '2025-01-31', name: 'react-movie_finder', g: 2, pubblica: true },
	{ d: '2025-02-02', name: 'recipe-finder', g: 2 },
	{ d: '2025-02-05', name: 'laravel-mail', g: 1, cap: 1 },
	{ d: '2025-02-08', name: 'react-weather-app', g: 2 },
	{ d: '2025-02-10', name: 'react-music-player', g: 2, pubblica: true },
	{ d: '2025-02-12', name: 'Laravel-Posts-Project', g: 1, cap: 1 },
	{ d: '2025-02-13', name: 'react-translate-app', g: 2 },
	{ d: '2025-02-19', name: 'react-finance-tracker', g: 2 },
	{ d: '2025-02-26', name: 'Icarus', g: 1, cap: 1 },
	{ d: '2025-02-27', name: 'Presto', g: 1, pubblica: true, cap: 1 },
	{ d: '2025-03-10', name: 'laravel_post2', g: 1, cap: 1 },
	{ d: '2025-04-11', name: 'Ai-Chatbot', g: 3 },
	{ d: '2025-04-14', name: 'React-Digital-Journal', g: 3 },
	{ d: '2025-04-17', name: 'Meal-Planner', g: 3, pubblica: true },
	{ d: '2025-05-03', name: 'React-Rhythm-Sync', g: 3, pubblica: true },
	{ d: '2025-05-23', name: 'Image-Recognition', g: 3 },
	{ d: '2025-05-25', name: 'task-manager-react', g: 4 },
	{ d: '2025-05-29', name: 'Event-Scheduler', g: 4 },
	{ d: '2025-05-30', name: 'job-board', g: 4 },
	{ d: '2025-06-01', name: 'Social-Media-Dashboard', g: 4 },
	{ d: '2025-06-10', name: 'react-portfolio', g: 4, pubblica: true },
	{ d: '2025-07-02', name: 'flashcard_learning_app', g: 4 },
	{ d: '2025-09-16', name: 'Emerald_Pub', g: 5 },
	{ d: '2026-02-23', name: 'villa-repaci', g: 5, pubblica: true },
	{ d: '2026-04-10', name: 'officina_di_gianni', g: 5, pubblica: true },
	{ d: '2026-04-11', name: 'gg', g: 5, pubblica: true },
	{ d: '2026-04-26', name: 'avogados_bilbao', g: 5, pubblica: true },
	{ d: '2026-07-19', name: 'Ananda', g: 5, link: 'https://anandagrejo.netlify.app/', cap: 4 },
];

export const REPOS = VOCI.map((v) => ({
	...v,
	cap: v.cap ?? capitoloDi(v.d),
	url: v.link ?? (v.pubblica ? `https://github.com/Domenico85/${v.name}` : null),
}));
