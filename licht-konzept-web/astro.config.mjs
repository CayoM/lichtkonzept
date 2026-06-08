// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// CHANGE THIS: deine GitHub Pages URL nach dem ersten Push.
// Beispiele:
//   User/Org-Page: https://<user>.github.io
//   Project-Page:  https://<user>.github.io/<repo>
const SITE = process.env.PUBLIC_SITE_URL ?? 'https://example.github.io';
const BASE = process.env.PUBLIC_BASE_PATH ?? '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  compressHTML: true,
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
  image: {
    // Sharp ist Astro 5+ Default — explizit für Klarheit
    responsiveStyles: true,
  },
});
