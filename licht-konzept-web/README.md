# Licht Konzept — Web

Premium-Homepage für Licht Konzept (Boden Konzept GmbH). Astro 6 + Tailwind v4, statisch exportiert, GitHub-Pages-tauglich.

## Stack

- **Astro 6** Static Site Generator
- **TypeScript** strict
- **Tailwind CSS v4** (CSS-first via `@theme`)
- **EB Garamond** + **Inter Tight** + **JetBrains Mono** (lokal via `@fontsource-variable`)
- **Bun** als Package Manager + Runtime
- **Docker** Multi-Stage (Dev / Build / nginx Serve)

## Lokale Entwicklung

### Native (Bun)

```bash
bun install
bun run dev          # http://localhost:4321
bun run build        # Statisches Bundle in dist/
bun run preview      # Built dist/ lokal vorschauen
bun run check        # TypeScript + Astro Diagnostics
```

### Containerized

```bash
docker compose --profile dev up      # Dev-Server auf :4321
docker compose --profile serve up    # nginx Production auf :8080
```

## Deployment

### GitHub Pages (automatisch)

1. Repository auf GitHub anlegen (öffentlich oder GitHub Pro Privat).
2. In Repo-Settings → Pages → **Source = GitHub Actions** wählen.
3. Push auf `main`. Workflow `.github/workflows/deploy.yml` baut + deployt automatisch.

Site-URL und Base-Path werden im Workflow automatisch aus dem Repo-Namen abgeleitet:
- User-Page Repo (`<user>.github.io`): `https://<user>.github.io`, `base=/`
- Project-Page Repo: `https://<user>.github.io/<repo>/`, `base=/<repo>/`

### Custom Domain (optional, Phase 2)

1. `public/CNAME` mit der Domain anlegen, z. B. `licht-konzept.net`.
2. DNS-Records bei der Domain anpassen (A-Records auf GitHub-Pages-IPs).
3. In `astro.config.mjs` ggf. `base = '/'` setzen.

### Self-Hosting via Docker

```bash
docker build --target serve -t lichtkonzept:latest .
docker run -d -p 80:80 --restart unless-stopped --name lichtkonzept lichtkonzept:latest
```

## Inhalte tauschen

### Projekt-Referenzen

Markdown-Dateien in `src/content/projects/`. Frontmatter folgt dem Zod-Schema in
`src/content.config.ts`. Aktuelle Demo-Projekte sind mit `placeholder: true` markiert.
Echte Inhalte einfach in den gleichen Ordner schreiben, Placeholder löschen.

### Team

`src/content/team/*.md` — `initials` als Fallback zum Porträt.

### Partner-Marken

`src/data/partners.json` — JSON-Array mit Marken-Strings. Bei leerem Array wird die
Sektion automatisch ausgeblendet.

### Site-weite Daten

`src/data/siteConfig.ts` — Adresse, Telefon, E-Mail, Navigation.

### Bilder

SVG-Placeholder in `public/images/placeholders/`. Tausch:

1. Echte Fotos in `public/images/projects/` ablegen.
2. Pfade in den Markdown-Frontmatter aktualisieren.
3. Für den Kelly-Slider drei Aufnahmen desselben Raums mit unterschiedlichen
   Lichtschichten in `public/images/kelly/` ablegen — Pfade in
   `src/components/KellySlider.astro` aktualisieren.

## Architektur-Highlights

- **Tageszeit-Layer**: Site wechselt zwischen Tag- und Abendthema basierend auf der lokalen
  Uhrzeit des Besuchers (6–17 Tag, 17–6 Abend). Implementiert in `src/lib/timeOfDay.ts`.
- **Kelly-Slider**: Drei Lichtarten am selben Raumfoto. Crossfade via CSS-Opacity,
  gesteuert über Range-Input. Tastatur, Touch, Klick auf Stops alle unterstützt.
- **View Transitions**: Sanfte Page-Übergänge zwischen Startseite und Subpages.
- **Zero-Tracking**: Keine Cookies, kein Analytics, keine externen Schriften.

## Performance-Ziele

- Lighthouse Mobile: Performance ≥ 95 / Accessibility = 100 / Best Practices ≥ 95 / SEO = 100
- Bundle JS (excl. images): < 60 KB gzipped
- LCP < 1.8 s auf Fast 3G

## Verzeichnisstruktur

```
licht-konzept-web/
├── src/
│   ├── components/   Hero, Manifest, KellySlider, Prozess, Referenzen, Team, Partner, Kontakt, SiteHeader, SiteFooter
│   ├── content/      projects/, team/ als Content Collections
│   ├── data/         siteConfig.ts, partners.json
│   ├── layouts/      BaseLayout.astro
│   ├── lib/          timeOfDay.ts, kelly-slider.ts, scrollReveal.ts
│   ├── pages/        index.astro, impressum.astro, datenschutz.astro
│   └── styles/       global.css mit @theme
├── public/images/    Placeholders, Favicons
├── astro.config.mjs
├── Dockerfile        Multi-Stage (dev/build/serve)
├── docker-compose.yml
└── .github/workflows/deploy.yml
```

## Spec

Die Design-Spezifikation liegt im Eltern-Verzeichnis:
`../docs/superpowers/specs/2026-06-08-lichtkonzept-homepage-design.md`
