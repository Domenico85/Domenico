// Versión en español. Misma forma que it.ts (el tipo `Testi` lo exige). Primera persona, mismo tono que el italiano.
import type { Testi } from './it';

export const es: Testi = {
	lang: 'es',
	locale: 'es_ES',
	descrizione: 'Domenico, desarrollador web. El mapa de lo que he construido, repo a repo.',
	ui: {
		ingresso: 'Entrada', caricamento: 'Cargando', conMusica: 'Entrar con música', senzaMusica: 'Sin música',
		suonoOn: 'sonido: on', suonoOff: 'sonido: off', percorso: 'Recorrido', capitoli: 'Capítulos', ilPercorso: 'El recorrido',
		gruppiRepo: 'Grupos de repos', stadio: 'etapa',
		repo: 'REPOS', capitoliTag: 'CAPÍTULOS', dal: 'DESDE',
		costellazione: 'Mis repos como estrellas, en grupos: toca una estrella para ir a su capítulo',
		ciao: 'Hola, soy', ruolo: 'Desarrollo webs. Con Loop Studio trabajo, aquí juego.',
		sotto: 'Cada “estrella” es un proyecto. Se encienden en grupos, por época. Haz clic en una y te llevo al capítulo que toca.',
		foto: 'foto: Greg Rakozy, Unsplash', scorri: 'baja ↓',
	},
	capitoli: {
		hello: { titolo: 'Hello World', quando: 'febrero 2024', stadio: 'HTML a pelo',
			testo: 'Una línea de Java y un hello-world. Aún no sabía que me iba a gustar.' },
		corso: { titolo: 'El curso', quando: 'abril 2024 – abril 2025', stadio: 'terminal y JS',
			testo: 'Hice un curso de Full Stack Developer. Casi todo se quedó en local: ejercicios, errores, algún momento de gloria. El proyecto final, Presto, lo hicimos en equipo.' },
		esperimenti: { titolo: 'Experimentos', quando: '2025, y todavía hoy', stadio: 'CSS y collage',
			testo: 'Vanilla JS, sliders, efectos. La época en la que rompía cosas para entender cómo funcionaban. Lo sigo haciendo, ahora en el Lab del estudio.' },
		react: { titolo: 'React', quando: 'enero – julio 2025', stadio: 'React',
			testo: 'Un widget a la vez, y algo de vergüenza por los nombres. Me he quedado con pocas: a Meal-Planner todavía le tengo cariño.' },
		siti: { titolo: 'Webs de verdad', quando: 'desde septiembre 2025', stadio: 'Astro y WebGL',
			testo: 'Clientes, Astro, un ojo siempre puesto en las puntuaciones de Lighthouse. Aquí las cosas empiezan a estar online de verdad.' },
		oggi: { titolo: 'El estudio', quando: 'hoy', stadio: 'hoy',
			testo: 'Esta página es el sitio donde sigo jugando. Si necesitas una web de verdad, esa la hago con el estudio.' },
	},
	gruppi: ['Primeros pasos', 'El curso y Laravel', 'React, invierno', 'React, primavera', 'React, verano', 'Webs de verdad'],
	hello: { documento: 'Esta es mi primera web. No tiene estilo.', link: 'Enlace sin visitar' },
	corso: {
		righe: ['$ curso --iniciar', '> abril 2024: full stack, 400 horas', '> html, css, bootstrap, javascript', '> php, laravel, metodologías ágiles', '> casi todo se queda en local', '> primer botón que cambia de color', '> errores: demasiados', '> 17 abril 2025: certificado', '$ ./experimentos.sh'],
		alt: 'Presto.it, el proyecto final del curso, hecho en equipo',
	},
	esperimenti: {
		marquee: 'SLIDER · CARD · HOVER · DEGRADADO · SOMBRA · SLIDER · CARD · HOVER ·',
		alt: ['Slider con efecto en las imágenes', 'Animación 3D con scroll', 'Carrusel de cafés', 'Slider de animales', 'Slider con una lata y un aguacate', 'Previsión del tiempo con tormenta'],
	},
	react: { repoIn: (m: number) => `repos en ${m} ${m === 1 ? 'mes' : 'meses'}` },
	siti: {
		etichetta: 'Astro, Lighthouse, clientes', passa: 'pasa el ratón: vuelve el color', tocco: 'arrastra el dedo: vuelve el color',
		lavori: [
			{ riga: 'Consulta de osteopatía · WordPress, PHP', alt: 'Web de la consulta de osteopatía Osteomed' },
			{ riga: 'Concesionario · WordPress, PHP', alt: 'Web de GF Motori' },
			{ riga: 'Campo de paintball · Astro, reservas online', alt: 'Web de Axpro Paintball' },
			{ riga: 'Fotógrafa · Astro, Sanity', alt: 'Web de fotografía de Ananda Grejo' },
		],
	},
	oggi: {
		titolo: 'Hoy:', vaiAlloStudio: 'Ir al estudio', ilMioGithub: 'Mi GitHub', ricomincia: '↑ Volver a empezar',
		crediti: 'foto del cielo: Greg Rakozy, Unsplash · música: Pixabay',
	},
};
