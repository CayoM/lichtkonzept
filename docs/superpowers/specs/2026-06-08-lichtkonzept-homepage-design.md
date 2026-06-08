# Licht Konzept — Homepage Design Spec

**Status:** Design — wartet auf Review
**Datum:** 2026-06-08
**Auftraggeber:** Boden Konzept GmbH (Marke: Licht Konzept)
**Ziel:** Neue Homepage als Premium-Web-Erlebnis, das Beratungs- und Konzept-Expertise verkauft.

---

## 1. Kontext & Positionierung

### Was Licht Konzept verkauft
Maßgeschneiderte Beleuchtungs-**Beratung und Konzepte** für Gewerbe- und Privaträume. Das Produkt ist die Denkweise, nicht das Leuchtmittel. Hochwertige Hersteller (Flos, Artemide, Vibia o. ä.) kommen als Werkzeuge zum Einsatz, sind aber Mittel — nicht Story.

### Zielgruppe
- Privatkunden mit hochwertigem Wohnraum (Villa, Penthouse, Restaurant-Eigentümer)
- Gewerbekunden im Premium-Segment (Hotels, Boutiquen, Restaurants, Praxen)
- Architekten und Innenarchitekten als Partnerkanal
- Anspruchsdenken: Qualität > Preis, Erlebnis > Effizienz

### Wettbewerbsabgrenzung
Die Site verkauft kein Lampen-Sortiment. Sie verkauft Vertrauen in eine Beratungsbeziehung. Inhalts-Schwerpunkt liegt daher auf:
1. Methodik (Wie wir denken)
2. Referenzen (Was dabei entsteht)
3. Köpfe (Wer berät dich)

### Markenelemente, die übernommen werden
- Logo & Wortmarke „Licht Konzept"
- Display-Schrift **EB Garamond** (Italic für die Kopfzeilen-Stimmung)
- Adresse: Sindelfinger Str. 39, 71032 Böblingen
- Telefon: 07031 6130390, 01522 7744085
- E-Mail: info@licht-konzept.net
- Tagline-Idee: „Wir machen aus Räumen Erlebnisse" (Stand-in, Wording wird im Copy-Pass geschärft)

---

## 2. Designsprache

### Tonalität
Committed dunkel + warm. **Eine** Designhaltung, kein Theme-Toggle. Reduziert, magazinhaft, präzise. Wie ein gut geschnittenes Editorial — Wallpaper*, B&O, Hermès. Bewusst gegen den SaaS-Helligkeits-Standard, weil Licht ein dunkles Medium ist (es zeigt sich erst gegen Dunkelheit).

### Farbsystem
CSS-Variablen-basiert, oklch-Farbraum (Tailwind v4 Standard):

| Token | Wert (Tag) | Wert (Abend) | Verwendung |
|-------|-----------|---------------|------------|
| `--lk-bg` | `oklch(8% 0.003 60)` | `oklch(6% 0.003 50)` | Seitenhintergrund |
| `--lk-bg-elev` | `oklch(12% 0.005 60)` | `oklch(10% 0.005 50)` | Sektions-Erhöhung |
| `--lk-fg` | `oklch(96% 0.01 80)` | `oklch(94% 0.015 75)` | Primärtext |
| `--lk-fg-muted` | `oklch(70% 0.01 80)` | `oklch(68% 0.015 75)` | Sekundärtext |
| `--lk-accent` | `oklch(78% 0.12 75)` | `oklch(74% 0.15 65)` | Champagner-Gold (CTAs, Lichtflächen) |
| `--lk-line` | `oklch(20% 0.005 60)` | `oklch(18% 0.005 50)` | Trennlinien |

**Tageszeit-Layer:** Die Tag-/Abend-Variante wird über `prefers-color-scheme` plus eine clientseitige Uhrzeit-Detection (lokale Zeit des Besuchers) aktiviert. Wechsel zwischen 6–17 Uhr (Tag) und 17–6 Uhr (Abend) via CSS-Custom-Property-Swap mit Übergang über 1.2 s. Subtil — nicht Show.

### Typografie
- **Display:** EB Garamond Variable (lokal eingebunden, Subset auf Latin-Extended)
- **Body / UI:** **Inter Tight Variable** (kostenlos, modern, exzellente Lesbarkeit, ersetzt Avenir-Anmutung)
- **Mono (Annotations, Labels):** JetBrains Mono Variable

Skala fluid via `clamp()`:
- `--text-display`: clamp(3rem, 8vw, 8rem) — Hero
- `--text-h1`: clamp(2.25rem, 4vw, 4rem)
- `--text-h2`: clamp(1.5rem, 2.5vw, 2.25rem)
- `--text-body`: clamp(1rem, 1.1vw, 1.125rem)
- `--text-small`: 0.875rem
- `--text-label`: 0.75rem (uppercase, letter-spacing 0.18em)

### Layout & Raster
- 12-Spalten-Grid mit `clamp(1rem, 4vw, 3rem)` Gutter
- Sektionen verwenden voll oder ausgewählte Spalten — keine festen Container-Breiten, sondern responsive Kompositionen
- Vertikale Rhythmus über `clamp(6rem, 12vh, 10rem)` Sektionsabstand
- Max-Content-Breite für Lesetext: 65ch

### Motion
- Sparsam, präzise, immer mit Easing `cubic-bezier(0.4, 0.0, 0.2, 1)` (Material-Standard) oder `cubic-bezier(0.16, 1, 0.3, 1)` (für Hero-Reveals)
- Scroll-driven Animations nur, wo sie der Story dienen
- GSAP für Kelly-Slider und komplexe Scroll-Choreografie
- View Transitions API (Astro `ClientRouter`) zwischen One-Pager und Projekt-Detailseiten
- Respektiert `prefers-reduced-motion` strikt — Fallback: statische Schritte ohne Bewegung

---

## 3. Sektionsweise Architektur (One-Pager)

### 3.1 Hero
- **Inhalt:** Eine starke Aussage. Kein Karussell, keine Floskel.
- **Beispieltext:** Display-Headline „Licht ist nicht Beleuchtung." — Subline (Garamond Italic): „Es ist Atmosphäre, Aufmerksamkeit, Erinnerung."
- **Visuelle Komposition:** Vollflächiger Hintergrund mit einem Highend-Innenraumfoto, dem eine subtile Vignette aufliegt. Text linksbündig im unteren Drittel. Oben rechts: kleines Wortmarken-Lockup. Oben links: Navigations-Anchor (Methodik / Prozess / Referenzen / Kontakt).
- **Mikro-Interaktion:** Beim Scroll fadet das Foto leicht und die Headline glidet 8 % nach oben — sehr ruhig.

### 3.2 Manifest
- **Inhalt:** Ein einziger Absatz, 3–4 Sätze, in Garamond. Erzählt wer ihr seid und woran ihr glaubt.
- **Layout:** Zentriert, max-width 50ch, viel Weißraum. Über dem Text ein kleines Label-Tag „Manifest".
- **Beispieltext:** „Wir entwickeln Lichtkonzepte für Räume, die mehr sein wollen als hell. Im Dialog mit Architekten, Bauherren und Bewohnern suchen wir den Moment, in dem Licht zur Atmosphäre wird — und Räume zu Erlebnissen."

### 3.3 Methodik / Kelly-Slider (Wow-Stück)
- **Inhalt:** Die drei Lichtarten nach Richard Kelly: Grundlicht (Licht zum Sehen), Akzentlicht (Licht zum Hinsehen), Schmucklicht (Licht zum Ansehen).
- **Interaktion:** Ein horizontaler Drei-Stopp-Slider unter einem großen Raumfoto. Während der Nutzer den Slider bewegt, wird auf der gleichen Aufnahme die jeweilige Lichtart hervorgehoben — entweder via:
  - **Option A (technisch leichter):** Drei vorab gerenderte Bildvarianten desselben Raums, die per Crossfade ineinander übergehen
  - **Option B (technisch aufwendiger):** WebGL-Komposition mit drei Beleuchtungsmasken auf einem Basisfoto, die je nach Slider-Position dynamisch gemischt werden
- **Empfehlung für Phase 1:** Option A — robust, GH-Pages-kompatibel, schnell, gut accessibility-fähig. Option B als spätere Aufwertung.
- **Begleittext pro Position:**
  - Position 1 (links): „Grundlicht — Orientierung. Das Auge findet seinen Weg."
  - Position 2 (Mitte): „Akzentlicht — Aufmerksamkeit. Das Auge wird geführt."
  - Position 3 (rechts): „Schmucklicht — Emotion. Das Auge bleibt hängen."
- **Quote-Treatment:** Darunter Richard-Kelly-Zitat in Garamond Italic, kleine Schrift, sehr ruhig: „Variety is the spice of light."
- **Mobile:** Slider wird zu drei vertikalen Karten mit Tap-zum-Wechseln. Foto skaliert.

### 3.4 Prozess
- **Inhalt:** Vier Schritte als horizontale Sequenz auf Desktop, vertikal auf Mobile:
  1. Beratung (Erstgespräch, Raumaufnahme, Vision verstehen)
  2. Konzept (Lichtphilosophie für den Raum)
  3. Planung (Technische Detailplanung, Produktauswahl)
  4. Umsetzung (Installation durch erfahrene Installateure, bundesweit)
- **Visuell:** Jeder Schritt eine Karte mit kleinem Index-Label (001/004 etc.), Garamond-Titel, kurzem Beschreibungstext (3 Zeilen max). Verbindungslinien zwischen Karten.
- **Mikro-Interaktion:** Karten fade-in mit Staggered Delay beim In-View-Scroll.

### 3.5 Referenzen / Projekte
- **Inhalt:** 3–6 Projekt-Cases, jedes mit:
  - Großem Foto (Vorher-/Nachher-Konzept als optionale Erweiterung)
  - Projektname + Ort
  - Kurze Kuratorenzeile (1–2 Sätze: „Im 1920er-Altbau ersetzten wir die zentrale Deckenflut durch ein dreischichtiges Konzept mit Tageslicht-Simulation und Akzenten auf Familienporträts.")
  - Tag-Liste: Gewerbe/Privat, Stilrichtung, eingesetzte Marken
  - Click-Through zu Projekt-Detailseite (Phase 2)
- **Layout:** Alternierendes Zweispalt-Layout (Foto links/rechts wechselnd). Auf Mobile: einspaltig.
- **Phase-1-Stand:** Drei Placeholder-Cases mit hochwertigen Unsplash-Bildern + Lorem-ähnlichen DE-Texten als Demo. Klar markiert in `src/content/projects/_placeholder.md`.

### 3.6 Team / Über uns
- **Inhalt:** Persönliche Vorstellung. Foto pro Person, Name, Rolle, ein Satz „Was mich an Licht fasziniert".
- **Phase-1-Stand:** 1–2 Platzhalter-Profile mit Hinweis im Code (`// PLACEHOLDER`). Layout funktioniert mit 1, 2 oder 4 Personen.
- **Layout:** Zentriertes Grid, viel Weißraum, Schwarzweiß-Porträts, warme Akzentfarbe nur in Hover-State.

### 3.7 Partner
- **Inhalt:** Diskrete, alphabetische Liste der Premium-Marken, mit denen ihr arbeitet. Keine Logos auf Schwarz, sondern Wortmarken in Garamond — wirkt edler.
- **Phase-1-Stand:** Konfigurierbar via `src/data/partners.json` (Array von Marken-Strings). Bei leerer Liste: Sektion wird ausgeblendet.

### 3.8 Kontakt / CTA
- **Inhalt:**
  - Großzügiger Headline: „Erstgespräch buchen"
  - Drei Kontaktwege groß und tap-tauglich: Telefon (07031 6130390), Mobil (01522 7744085), E-Mail (info@licht-konzept.net)
  - Adresse darunter
  - Mikrocopy: „Unverbindliches Lichtgespräch — 30 Min vor Ort oder per Video."
- **Mailto-Link** mit vorbereitetem Betreff: `Anfrage Lichtgespräch — [Name]`
- **Telefon-Links:** `tel:+497031...` für Mobile-Tap-to-Call

### 3.9 Footer
- Impressum (Pflichtinhalt aus aktueller Site)
- Datenschutz-Seite (Pflicht, separate `/datenschutz/` Subpage)
- Social-Link (Instagram/falls vorhanden — sonst weglassen)
- Kleine Wortmarke
- Copyright-Zeile

---

## 4. Technische Architektur

### Stack-Entscheidungen
- **Astro 5.x** als Static Site Generator
  - Begründung: Bestes Performance-zu-Komfort-Verhältnis für content-getriebene Sites, Zero-JS-by-Default, native View Transitions, Sharp-Image-Optimization
- **TypeScript** strict mode
- **Tailwind CSS v4** via offiziellem Vite-Plugin
  - CSS-first Config in `src/styles/theme.css` mit `@theme` Direktive
  - Kein `tailwind.config.js`
- **GSAP 3.x** für Kelly-Slider + Scroll-Choreografie (kommerzielle Lizenz seit 2024 frei)
- **Bun** als Package Manager + Runtime (bereits installiert beim Auftraggeber)

### Verzeichnisstruktur
```
licht-konzept-web/
├── src/
│   ├── pages/
│   │   ├── index.astro              # One-Pager
│   │   ├── projekte/[slug].astro    # Projekt-Detail (Content Collection-getrieben)
│   │   ├── datenschutz.astro
│   │   └── impressum.astro
│   ├── layouts/
│   │   └── BaseLayout.astro         # <ClientRouter />, Meta, Theme-Bootstrap
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Manifest.astro
│   │   ├── KellySlider.astro        # GSAP-driven
│   │   ├── Prozess.astro
│   │   ├── ReferenceCard.astro
│   │   ├── TeamGrid.astro
│   │   ├── PartnerList.astro
│   │   ├── ContactBlock.astro
│   │   ├── SiteHeader.astro
│   │   └── SiteFooter.astro
│   ├── content/
│   │   ├── config.ts                # Zod-Schemas
│   │   ├── projects/
│   │   │   ├── _placeholder-1.md
│   │   │   ├── _placeholder-2.md
│   │   │   └── _placeholder-3.md
│   │   └── team/
│   │       └── _placeholder.md
│   ├── data/
│   │   ├── partners.json
│   │   └── siteConfig.ts            # Telefon, Mail, Adresse, Slogans zentral
│   ├── styles/
│   │   ├── theme.css                # @theme tokens, oklch
│   │   ├── reset.css
│   │   └── global.css
│   ├── assets/
│   │   ├── fonts/                   # EB Garamond, Inter Tight, JetBrains Mono (selbst gehostet)
│   │   ├── images/
│   │   │   └── _placeholders/       # Stock-Bilder mit README zum späteren Tausch
│   │   └── kelly/                   # Die drei Lichtart-Renderings desselben Raums
│   └── lib/
│       ├── timeOfDay.ts             # Tageszeit-Detection für Theme-Layer
│       └── kelly-slider.ts          # GSAP-Choreografie
├── public/
│   ├── favicon.svg
│   └── og-image.jpg
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── bun.lockb
├── Dockerfile
├── docker-compose.yml
├── .github/
│   └── workflows/
│       └── deploy.yml               # GitHub Pages Workflow
├── .dockerignore
├── .gitignore
├── README.md
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-06-08-lichtkonzept-homepage-design.md  # dieses Dokument
```

### Inhalts-Schemas (Content Collections)

`src/content/config.ts`:
```typescript
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    location: z.string(),
    kind: z.enum(['privat', 'gewerbe']),
    year: z.number().int().min(1990).max(2100),
    summary: z.string().max(280),
    cover: z.string(), // relativer Pfad zu src/assets
    tags: z.array(z.string()).default([]),
    partners: z.array(z.string()).default([]), // referenziert partners.json Einträge
    draft: z.boolean().default(false),
    placeholder: z.boolean().default(false), // markiert Phase-1-Demo-Inhalte
  }),
});

const team = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    portrait: z.string(),
    statement: z.string().max(140),
    placeholder: z.boolean().default(false),
  }),
});

export const collections = { projects, team };
```

### Tageszeit-Layer
- Implementation in `src/lib/timeOfDay.ts`: liest `new Date().getHours()` clientseitig, setzt Attribut `data-daypart="day" | "evening"` auf `<html>`
- Theme-Switch via CSS-Custom-Properties unter `[data-daypart="evening"]` Selektor — keine Klassen-Toggle, sondern Variablen-Override
- Respektiert manuelle Override-Klasse (falls Nutzer-Toggle später hinzukommt)
- Astro `client:load` Direktive auf einem winzigen Script-Component, das nur diesen Setup macht

### Performance-Budget
- Lighthouse Performance Score: ≥ 95 auf Mobile
- LCP < 1.8 s auf Fast 3G
- Total JS Payload (excl. images): < 60 KB gzipped
- Initial CSS: Critical Path inline, Rest async
- Font Loading: `font-display: swap` für Body-Schrift, Display-Schrift `font-display: optional` (verhindert Layout-Shift)
- Bilder: AVIF + WebP via Astro `<Image />`, eager nur für Hero

### Accessibility (Pflicht, nicht optional)
- WCAG 2.2 AA als Minimum
- Kelly-Slider: ARIA-Slider-Role mit `aria-valuenow`, Pfeil-Tasten-Steuerung, Screenreader-Labels für die drei Positionen
- Skip-Link „Zum Inhalt springen" im Header
- Focus-States deutlich sichtbar (Champagner-Gold Outline)
- `prefers-reduced-motion`: deaktiviert alle Scroll-Choreografien, GSAP-Animationen, Tageszeit-Crossfade
- `prefers-contrast: more` Override
- Semantic HTML — `<section>` mit `aria-labelledby`, `<nav>` mit `aria-label`
- Alt-Texte für alle Bilder, leerer Alt für rein dekorative
- Kontrast: Body-Text muss 7:1 erreichen (AAA-empfohlen für Premium-Marken)

### SEO
- `<title>` und `<meta description>` per Sektion-Schema in Astro
- OpenGraph + Twitter Card mit eigenem `og-image.jpg`
- JSON-LD Schema.org `LocalBusiness` mit Adresse, Telefon, Geo
- Sitemap via `@astrojs/sitemap` Integration
- robots.txt mit GH-Pages-URL als Sitemap-Hint
- Vorrendering: alle Seiten statisch (Astro Standard mit `output: 'static'`)

---

## 5. Containerisierung & Deployment

### Docker — Development
`docker-compose.yml`:
```yaml
services:
  web:
    build:
      context: .
      target: dev
    ports:
      - "4321:4321"
    volumes:
      - ./src:/app/src
      - ./public:/app/public
      - ./astro.config.mjs:/app/astro.config.mjs
    command: bun run dev --host 0.0.0.0
```

### Docker — Production Build
Multi-Stage `Dockerfile`:
```dockerfile
# Stage 1: dev
FROM oven/bun:1.3 AS dev
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
EXPOSE 4321
CMD ["bun", "run", "dev"]

# Stage 2: build
FROM oven/bun:1.3 AS build
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# Stage 3: serve (für Self-Hosting via nginx)
FROM nginx:alpine AS serve
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

Drei Targets erlauben:
- `docker compose up` → Dev-Server
- `docker build --target build` → erzeugt statisches `dist/` für GH Pages
- `docker build --target serve` → Production nginx Container für Self-Hosting

### GitHub Pages — Workflow
`.github/workflows/deploy.yml`:
- Trigger: Push auf `main`
- Steps: Bun-Setup → Install → `bun run build` → Upload Artifact → Deploy auf `gh-pages` Environment
- Verwendet die offizielle `actions/deploy-pages@v4`
- Concurrency-Group, damit nur ein Deploy gleichzeitig läuft

`astro.config.mjs` setzt:
- `site: 'https://<username>.github.io'` (oder Custom-Domain falls verfügbar)
- `base: '/licht-konzept-web/'` (falls Project-Pages; wenn User/Org-Page: `base: '/'`)
- `output: 'static'`
- `compressHTML: true`

### Custom Domain (Phase 2)
Wenn `licht-konzept.net` über GH Pages serviert werden soll:
- `CNAME` Datei in `public/CNAME` mit `licht-konzept.net`
- DNS A-Records für GitHub Pages IPs
- `base: '/'` in Astro-Config
- HTTPS via GH-Pages-Standard-Zertifikat

---

## 6. Phasen-Aufteilung

### Phase 1 — MVP (dieser Spec-Scope)
- Komplette One-Pager-Site mit allen Sektionen
- Drei Placeholder-Projekte (kuratierte Unsplash-Bilder, klar markiert)
- 1–2 Placeholder-Team-Profile
- Partner-Sektion leer/ausblendbar
- Kelly-Slider mit Option A (drei vorgerenderte Lichtvarianten desselben Stock-Raumfotos)
- Tageszeit-Layer aktiv
- Docker-Setup
- GitHub-Pages-Deploy
- Impressum + Datenschutz Subpages
- Lighthouse ≥ 95 Mobile

### Phase 2 — Nach Inhalts-Bereitstellung
- Echte Projektfotos einsetzen (Tausch in `src/assets/images/projects/`)
- Echte Team-Profile mit Porträts
- Partner-Liste mit echten Marken
- Erweiterte Projekt-Detailseiten mit mehr Bildern, Kontext, Prozess
- Custom Domain anbinden

### Phase 3 — Optionale Aufwertungen (nicht Spec-Scope)
- WebGL-basierter Kelly-Slider (Option B)
- Mehrsprachigkeit (EN) falls Architektur-Partner international
- Newsletter / Lead-Magnet (z. B. „Lichtgrundlagen PDF")
- Calendly-Integration für Direkt-Buchung

---

## 7. Was bewusst NICHT gemacht wird (YAGNI)

- Kein CMS (kein Strapi, Sanity, Storyblok) — Content stabil, Astro Content Collections reichen
- Keine Internationalisierung in Phase 1 (DACH-Markt, DE only)
- Kein Blog
- Kein Newsletter-Signup
- Keine Login-/User-Funktionalität
- Keine Live-Chat-Integration
- Kein Cookie-Banner für Tracking — Phase 1 ohne Analytics. Falls Tracking nötig: Plausible Self-Hosted (DSGVO-freundlich) in Phase 2
- Kein Design-Theme-Toggle (siehe Begründung in Brainstorming: verdünnt Markenstimme)

---

## 8. Risiken & Annahmen

### Risiken
- **Placeholder-Fotos** wirken nicht so kraftvoll wie echte Projektfotos. Mitigation: Sehr sorgfältige Stock-Auswahl, einheitliche Farbgrading-Behandlung im Build via Sharp.
- **Tageszeit-Layer** könnte Nutzer irritieren wenn nicht subtil genug. Mitigation: Übergang über 1.2 s, Variablen-Wechsel nur in Akzentfarbe und Background, nicht im Lese-Kontrast.
- **Kelly-Slider Performance** auf älteren Mobilgeräten. Mitigation: Bildvarianten als AVIF + WebP mit fallback JPEG, vorab-Decode der drei Varianten beim In-View-Eintreten.
- **GitHub-Pages `base` Path** kann bei späterer Custom-Domain-Umstellung lokale URL-Brechungen auslösen. Mitigation: `base` zentral aus `astro.config.mjs` lesen, alle Links über `Astro.url.pathname` oder `BASE_URL` Env.

### Annahmen
- Bun ist auf der Build-Maschine verfügbar (lokal ja, GH Actions installiert via `oven-sh/setup-bun`)
- Der GitHub-Account des Nutzers erlaubt öffentliche Repos und Pages
- Der vorhandene Content der aktuellen Site darf wortgetreu übernommen werden (Tagline „We light up your vision", Richard-Kelly-Zitat, etc.)
- Inhaltliche Schärfung der Texte erfolgt im Copy-Pass nach Design-Approval (Phase 1.5 zwischen Implementation und Launch)

---

## 9. Erfolgs-Kriterien

Die Phase 1 ist erfolgreich, wenn:

1. Site responsiv funktioniert auf iPhone 13 Pro Safari, Pixel 7 Chrome, MacBook Air 13" Safari, 27" Display Chrome
2. Lighthouse Mobile: Performance ≥ 95, Accessibility ≥ 100, Best Practices ≥ 95, SEO ≥ 100
3. Kelly-Slider funktioniert mit Maus, Touch und Tastatur (Pfeiltasten)
4. Tageszeit-Layer wechselt automatisch zwischen 6 Uhr und 17 Uhr lokaler Zeit
5. `docker compose up` startet auf einer frischen Maschine ohne weitere Konfiguration den Dev-Server auf `:4321`
6. Pull-Request auf `main` triggert erfolgreichen GH-Pages-Deploy
7. Mit `prefers-reduced-motion: reduce` ist die Site ohne Animation vollständig nutzbar
8. Alle Platzhalter-Inhalte sind im Code klar als solche markiert (`placeholder: true` in Frontmatter, Kommentare im Code, README mit Tausch-Anleitung)

---

## 10. Offene Fragen für Implementierungs-Plan-Phase

Diese kommen im writing-plans Schritt zur Sprache:
- Konkrete Wahl der Stock-Bilder (Unsplash-IDs)
- Exakte Headline-Wordings (Copy-Pass)
- Repository-Name auf GitHub
- Initialer Branch-Name (`main` vs `master`)
- Erste GitHub-Username/Org für `site` URL
