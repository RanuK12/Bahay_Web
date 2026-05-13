# Bahay Design — Sito Web Ufficiale

> **Architettura d'interni e progettazione del colore**
> Cristina Cocco, Architetto — Vicenza, Italia

Sito web statico (HTML/CSS/JS) per lo studio di architettura d'interni **Bahay Design**, pubblicato su GitHub Pages all'indirizzo [bahaydesign.it](https://bahaydesign.it).

---

## Struttura del Progetto

```
Bahay_Web/
├── index.html                    # Homepage
├── about.html                    # Chi siamo / Cos'e Bahay
├── servizi.html                  # Panoramica servizi
│   ├── servizio-progettazione.html
│   ├── servizio-ristrutturazione.html
│   ├── servizio-restyling.html
│   ├── servizio-rah-colori.html
│   ├── servizio-consulenza-online.html
│   └── servizio-business.html
├── progetti.html                 # Griglia progetti
│   ├── progetto-casa-ea.html
│   ├── progetto-casa-lm.html
│   ├── progetto-casa-mk.html
│   ├── progetto-cucina-me.html
│   └── progetto-stanza-ab.html
├── eventi.html                   # Eventi e collaborazioni
├── news.html                     # Rassegna stampa e interviste
├── contatti.html                 # Contatti e form
├── CNAME                         # Dominio personalizzato GitHub Pages
├── .gitignore
├── assets/
│   ├── css/
│   │   └── style.css            # Foglio di stile principale
│   ├── js/
│   │   └── main.js             # JavaScript principale
│   ├── images/
│   │   ├── branding/           # Logo, moodboard, color wheel
│   │   ├── about/              # Foto sezione Chi Siamo
│   │   ├── projects/           # Render e foto dei progetti
│   │   │   ├── casa-ea/
│   │   │   ├── casa-lm/
│   │   │   ├── casa-mk/
│   │   │   ├── cucina-me/
│   │   │   └── stanza-ab/
│   │   ├── events/             # Locandine eventi
│   │   └── news/               # Immagini rassegna stampa
│   └── videos/
│       └── intervista-story-time.mp4
└── README.md
```

---

## Tecnologie Utilizzate

| Tecnologia | Ruolo |
|---|---|
| **HTML5** | Struttura semantica delle pagine |
| **CSS3** (Custom Properties, Grid, Flexbox) | Layout responsive e design system |
| **JavaScript** (Vanilla ES6+) | Interazioni: lightbox, menu mobile, video modal, scroll effects |
| **Google Fonts** | Tipografia: Marmelad, Quicksand, Lora |
| **GitHub Pages** | Hosting statico con dominio personalizzato |
| **Formspree** | Gestione invio form di contatto |

---

## Design System

### Palette Colori

| Nome | Esadecimale | Utilizzo |
|------|-------------|----------|
| Teal Dark | `#006D77` | Accenti principali |
| Teal Light / Verdino | `#9FC8CA` | Header, titoli sezioni, card |
| Terracotta | `#E3A088` | CTA, keyword, titoli progetti |
| Cream | `#D9CDBD` | Sfondi card |
| Taupe | `#AEA192` | Testo secondario |
| Brown | `#7A6455` | Testo corpo |
| White | `#fef7f2` | Sfondo principale |

### Tipografia

- **Marmelad** — Titoli decorativi (display)
- **Quicksand** — Titoli, corpo testo, navigazione
- **Lora** — Accenti testuali, sottotitoli in corsivo

### Componenti Chiave

- **Archi superiori** — Forma caratteristica delle card (border-radius curvo)
- **Lightbox** — Visualizzazione immagini a schermo intero con navigazione
- **Video Modal** — Riproduzione video inline
- **Grid responsive** — 3 colonne desktop, 2 tablet, 1 mobile

---

## Sviluppo Locale

Il sito e composto da file statici: basta aprire `index.html` in un browser o usare un server locale:

```bash
# Con Python
python3 -m http.server 8000

# Con Node.js (npx)
npx serve .
```

---

## Deployment

Il sito viene pubblicato automaticamente su **GitHub Pages** al push su `main`. Il dominio personalizzato `bahaydesign.it` e configurato tramite il file `CNAME`.

---

## Pagine Principali

| Pagina | Descrizione |
|--------|-------------|
| **Home** | Hero con logo, tagline e freccia scroll |
| **Cos'e Bahay** | Chi siamo, origini, valori, influenze |
| **Servizi** | 6 servizi con card arco (progettazione, ristrutturazione, restyling, RAH colori, consulenza online, business) |
| **Progetti** | Griglia di 5 progetti con dettaglio (render + foto reali) |
| **Eventi** | Grid 3 colonne con locandine eventi passati e futuri |
| **News** | Rassegna stampa con lightbox per immagini e video modal |
| **Contatti** | Cards informative + form Formspree |

---

## Crediti

- **Progetto e sviluppo web**: in collaborazione con Kiro AI
- **Architettura d'interni**: Cristina Cocco — Bahay Design
- **Metodo RAH**: Test colore proprietario di Bahay Design

---

## Licenza

Tutti i contenuti (testi, immagini, render, video) sono proprieta di **Bahay Design / Cristina Cocco** e non possono essere riprodotti senza autorizzazione.

P.IVA 04315700247 — Vicenza, Italia
