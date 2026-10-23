# Domenico

La mia pagina personale: una mappa delle cose che ho costruito, una repo alla volta. Ogni "stella" della costellazione è un progetto; cliccando una stella si arriva al capitolo giusto di un percorso a scroll che cambia tecnica a ogni scena (HTML nudo, terminale, collage CSS, React, Astro e WebGL).

Online: https://domenico85.github.io/Domenico/ (italiano), [/en/](https://domenico85.github.io/Domenico/en/) (inglese), [/es/](https://domenico85.github.io/Domenico/es/) (spagnolo).

Qui sperimento, senza limiti di punteggi. I siti veri li faccio con [Loop Studio](https://theloopstudio.org/).

## Come è fatta

- **Astro** (sito statico) con GSAP e ScrollTrigger per il palco a scroll, e WebGL2 scritto a mano per le immagini e la costellazione.
- Nessun framework di interfaccia, niente CMS: i contenuti stanno nei file di dati.
- Font in locale (woff2), musica opzionale (scelta all'ingresso), `prefers-reduced-motion` rispettato.

## Avvio

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 4321   # poi http://127.0.0.1:4321/Domenico/
npm run build
npm run preview
```

Serve Node 22.23.4 o superiore. L'indirizzo ha il prefisso `/Domenico/` (è la base di GitHub Pages): senza, dà 404.

## Dove mettere le mani

| Cosa | Dove |
|---|---|
| Testi di ogni lingua (it, en, es) | `src/i18n/` |
| Capitoli: anno, musica, peso (quanto scroll occupa) | `src/data/capitoli.ts` |
| La pagina (una sola, usata per ogni lingua) e il selettore di lingua | `src/components/Pagina.astro`, `Lingue.astro` (script: `src/scripts/lingue.js`) |
| Le stelle della costellazione (repo, date, gruppi) | `src/data/repos.ts` |
| Markup di una scena | `src/components/scene/` |
| Tempi e animazione di una scena | `src/scripts/scene/` (il registro è in `index.js`) |
| Immagini disegnate dal WebGL | `src/scripts/reveal.js` |
| Costellazione | `src/scripts/constellation.js` |
| Stili | `src/styles/global.css` |
| Fonti e licenze degli asset | `docs/ASSET.md` |

Aggiungere un capitolo = una riga in `capitoli.ts`, i suoi testi in ognuno dei tre file di `src/i18n/`, una scena in `components/scene/` e il suo builder in `scripts/scene/`: righello, musica e scroll si adeguano da soli.

Le lingue hanno un indirizzo ciascuna (`/Domenico/`, `/en/`, `/es/`, pagine in `src/pages/`) e la pagina riparte sempre dal loader: lo scroll non si ricorda, né al ricaricamento né cambiando lingua.

## Crediti

- Foto del cielo: Greg Rakozy, [Unsplash](https://unsplash.com/).
- Font: LT Humor, LT Industry, Grechen Fuemen (licenza OFL).
- Musica: [Pixabay](https://pixabay.com/) (licenza Pixabay).
- Gli screenshot dei lavori sono miei (portfolio di Loop Studio).

## Deploy

GitHub Pages con GitHub Actions (`.github/workflows`). In Settings → Pages la sorgente deve essere "GitHub Actions".
