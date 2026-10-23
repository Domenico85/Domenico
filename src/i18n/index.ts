// Le tre lingue della pagina. Ogni lingua ha il suo indirizzo: / (italiano), /en/, /es/ (sotto la base di Astro).
import { it, type Testi } from './it';
import { en } from './en';
import { es } from './es';

export type Lingua = 'it' | 'en' | 'es';
export const LINGUE: Lingua[] = ['it', 'en', 'es'];
export const TESTI: Record<Lingua, Testi> = { it, en, es };
export type { Testi };

// Indirizzo della pagina in una lingua (con la barra finale, come li serve Pages).
export const indirizzo = (lingua: Lingua, base: string) => (lingua === 'it' ? base : `${base}${lingua}/`);
