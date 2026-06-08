#!/usr/bin/env bun
/**
 * Bild-Crops für Projekt-Cover.
 * Schneidet die Instagram-FINISHED-PROJECT-Overlays raus und konzentriert
 * sich auf die Bereiche mit echtem Licht/Architektur.
 *
 * Run: bun scripts/crop-projects.mjs
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { mkdir } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(SCRIPT_DIR, '..', 'public', 'images', 'projects');
const OUT = ROOT;

/**
 * Crops in (top, height) absolute pixels of a 1080×1920 source.
 * Result is saved as a horizontal landscape image.
 */
const CROPS = [
  {
    src: 'studio-cardio.jpg',
    dst: 'studio-cardio-pendants.jpg',
    region: { left: 0, top: 0, width: 1080, height: 450 },
    description: 'Top 23% — zwei Pendelleuchten ohne FINISHED-Text',
  },
  {
    src: 'fresh-up-tracks.jpg',
    dst: 'fresh-up-tracks-clean.jpg',
    // Right half — backlit Smith machine area with track lighting on ceiling visible at top
    region: { left: 540, top: 80, width: 540, height: 1200 },
    description: 'Rechter Bildbereich — Smith Machine + Track-Licht an Decke',
  },
  {
    src: 'studio-konzept-green.jpg',
    dst: 'studio-konzept-green-clean.jpg',
    // Top region with the ceiling panel light + window light + indirect cove glow along left wall
    region: { left: 0, top: 0, width: 1080, height: 400 },
    description: 'Oberer Bildbereich — Deckenpanel + indirekte Wandbeleuchtung',
  },
];

const ensureDir = async (p) => {
  const d = dirname(p);
  if (d && d !== '.' && d !== '/' && d.length > 3) {
    await mkdir(d, { recursive: true });
  }
};

for (const c of CROPS) {
  const src = join(ROOT, c.src);
  const dst = join(OUT, c.dst);
  await ensureDir(dst);
  try {
    const meta = await sharp(src).metadata();
    if (!meta.width || !meta.height) {
      console.error(`[skip] ${c.src} — no dimensions`);
      continue;
    }
    if (
      c.region.left < 0 ||
      c.region.top < 0 ||
      c.region.left + c.region.width > meta.width ||
      c.region.top + c.region.height > meta.height
    ) {
      console.error(
        `[skip] ${c.src} — region out of bounds (image is ${meta.width}×${meta.height})`,
      );
      continue;
    }
    await sharp(src)
      .extract(c.region)
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(dst);
    console.log(`[ok]   ${c.src} → ${c.dst} (${c.region.width}×${c.region.height})`);
    console.log(`        ${c.description}`);
  } catch (err) {
    console.error(`[err]  ${c.src}: ${err.message}`);
  }
}
