# Villa Repaci — Landing Page

Pagina web di presentazione per **Villa Repaci**, museo e giardino sul Tirreno a Palmi (RC), già dimora del poeta e artista calabrese Leonida Repaci.

---

## Struttura del progetto

```
villa-repaci/
├── index.html       # Struttura e contenuto della pagina
├── style.css        # Stili, animazioni e layout
└── README.md        # Questo file
```

---

## Sezioni della pagina

| Sezione                 | Descrizione                                                          |
| ----------------------- | -------------------------------------------------------------------- |
| **Hero**                | Schermata iniziale a tutta altezza con scena marina notturna animata |
| **Citazione**           | Banner con una citazione di Leonida Repaci                           |
| **La Storia**           | Biografia dell'artista e dati chiave della villa                     |
| **La Collezione**       | Griglia delle aree espositive del museo                              |
| **Giardino & Panorama** | Illustrazione CSS del promontorio e descrizione del parco            |
| **Pianifica la Visita** | Schede prezzi, orari e informazioni pratiche                         |
| **Footer**              | Navigazione secondaria e contatti                                    |

---

## Tecnologie utilizzate

- **HTML5** — struttura semantica, nessuna dipendenza esterna
- **CSS3** — variabili CSS, Grid, Flexbox, animazioni `@keyframes`
- **JavaScript vanilla** — effetto scroll sulla navbar e animazioni di rivelazione con `IntersectionObserver`
- **Google Fonts** — Cormorant Garamond (display) + Raleway (corpo testo)

Nessun framework, nessuna libreria, nessun bundler richiesto.

---

## Come avviare il progetto

Essendo un progetto statico, è sufficiente aprire `index.html` nel browser:

```bash
# Opzione 1 — apertura diretta
open index.html

# Opzione 2 — server locale con Python
python3 -m http.server 8080
# poi vai su http://localhost:8080

# Opzione 3 — server locale con Node.js (npx)
npx serve .
```

---

## Personalizzazione

### Colori

Tutte le variabili cromatiche sono definite nel blocco `:root` all'inizio di `style.css`:

```css
:root {
  --ivory: #f7f3ec;
  --terracotta: #c5673a;
  --deep-sea: #1a2e3b;
  --gold: #c9a84c;
  /* ... */
}
```

### Contenuti

I testi, gli orari e i prezzi si trovano direttamente in `index.html` e possono essere modificati senza toccare i fogli di stile.

### Immagini

Il segnaposto del ritratto di Repaci nella sezione _La Storia_ può essere sostituito con un vero tag `<img>` all'interno del div `.about__img-placeholder`. Analogamente, la scena marina nella sezione _Giardino_ è realizzata in CSS puro e può essere sostituita con una fotografia reale.

---

## Compatibilità browser

| Browser           | Supporto          |
| ----------------- | ----------------- |
| Chrome / Edge 90+ | ✅ Completo       |
| Firefox 90+       | ✅ Completo       |
| Safari 14+        | ✅ Completo       |
| Internet Explorer | ❌ Non supportato |

---

## Licenza

Progetto realizzato a scopo dimostrativo per la **Fondazione Villa Repaci**, Palmi (RC), Calabria.  
Tutti i diritti sui contenuti relativi a Leonida Repaci appartengono ai rispettivi aventi diritto.
