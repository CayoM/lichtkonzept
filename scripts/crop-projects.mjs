#!/usr/bin/env bun
/**
 * Bild-Crops für Projekt-Cover.
 * Schneidet Text-Overlays raus und fokussiert auf den Lichtbereich.
 *
 * Run: bun scripts/crop-projects.mjs
 *
 * Beispiel-Eintrag:
 * { src: 'rohe-aufnahme.jpg', dst: 'projektname.jpg',
 *   region: { left: 0, top: 0, width: 1080, height: 450 } }
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { mkdir } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(SCRIPT_DIR, '..', 'public', 'images', 'projects');

/**
 * Crops in absolute pixel coordinates of the source image.
 * Aktuell aktiv: keine. Bei Bedarf hier eintragen.
 */
const CROPS = [
  // Beispiel:
  // {
  //   src: 'raw-input.jpg',
  //   dst: 'project-feature.jpg',
  //   region: { left: 0, top: 0, width: 1080, height: 450 },
  //   description: 'Top 23% — Lichtfeature ohne Text',
  // },
];

if (CROPS.length === 0) {
  console.log('[info] Keine Crops definiert. Beispiel im Script-Header.');
  process.exit(0);
}

for (const c of CROPS) {
  const src = join(ROOT, c.src);
  const dst = join(ROOT, c.dst);
  try {
    const meta = await sharp(src).metadata();
    if (!meta.width || !meta.height) {
      console.error(`[skip] ${c.src} — keine Dimensionen`);
      continue;
    }
    if (
      c.region.left < 0 ||
      c.region.top < 0 ||
      c.region.left + c.region.width > meta.width ||
      c.region.top + c.region.height > meta.height
    ) {
      console.error(
        `[skip] ${c.src} — region out of bounds (${meta.width}×${meta.height})`,
      );
      continue;
    }
    await sharp(src)
      .extract(c.region)
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(dst);
    console.log(`[ok]   ${c.src} → ${c.dst} (${c.region.width}×${c.region.height})`);
    if (c.description) console.log(`        ${c.description}`);
  } catch (err) {
    console.error(`[err]  ${c.src}: ${err.message}`);
  }
}
