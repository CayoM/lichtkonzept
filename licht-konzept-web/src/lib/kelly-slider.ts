/**
 * Kelly-Slider — drei Lichtarten am gleichen Raumfoto.
 * Drag-Handle ON-IMAGE: vertikale Linie mit Greifer-Punkt, die der Nutzer horizontal über
 * das Frame zieht. Drei Snap-Positionen (Schicht 01/02/03) und smoother Crossfade dazwischen.
 *
 * Steuerung:
 *   - Maus drag, Touch drag, Klick auf Position-Marker, Pfeil-Tasten (mit Handle im Fokus)
 * A11y:
 *   - ARIA slider role mit aria-valuenow / aria-valuetext / valuemin / valuemax
 *   - Tastatur: ←/→ ±0.5 Schritt, Home/End auf Extreme
 */

const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);

const computeOpacities = (pos: number): [number, number, number] => {
  // pos: 0..2 — 0 = Grundlicht voll, 1 = Akzent voll, 2 = Schmuck voll
  const o: [number, number, number] = [0, 0, 0];
  if (pos <= 1) {
    const t = easeOut(pos);
    o[0] = 1 - t;
    o[1] = t;
  } else {
    const t = easeOut(pos - 1);
    o[1] = 1 - t;
    o[2] = t;
  }
  return o;
};

const clamp = (v: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, v));

export function initKellySlider(root: HTMLElement): void {
  const frame = root.querySelector<HTMLElement>('[data-kelly-frame]');
  const layers = Array.from(root.querySelectorAll<HTMLElement>('[data-kelly-layer]'));
  const handle = root.querySelector<HTMLElement>('[data-kelly-handle]');
  const stops = Array.from(root.querySelectorAll<HTMLElement>('[data-kelly-stop]'));
  const labels = Array.from(root.querySelectorAll<HTMLElement>('[data-kelly-label]'));
  const hint = root.querySelector<HTMLElement>('[data-kelly-hint]');

  if (!frame || !handle || layers.length !== 3) return;

  let current = 0; // 0..2
  let dragging = false;
  let interacted = false;

  const setPosition = (pos: number, snap = false): void => {
    const next = snap ? Math.round(pos) : pos;
    current = clamp(next, 0, 2);

    // Frame CSS-Variable: 0..100 percent für Handle-Position
    const pct = (current / 2) * 100;
    frame.style.setProperty('--kelly-pos', `${pct}`);

    // Layer-Opazitäten
    const [a, b, c] = computeOpacities(current);
    layers[0]!.style.opacity = String(a);
    layers[1]!.style.opacity = String(b);
    layers[2]!.style.opacity = String(c);

    // Active stop + label
    const activeIdx = Math.round(current);
    stops.forEach((s, i) => {
      s.dataset.active = i === activeIdx ? 'true' : 'false';
    });
    labels.forEach((l, i) => {
      l.dataset.active = i === activeIdx ? 'true' : 'false';
    });

    // ARIA
    handle.setAttribute('aria-valuenow', String(activeIdx));
    const valueText = labels[activeIdx]?.dataset.kellyName ?? `Stufe ${activeIdx + 1}`;
    handle.setAttribute('aria-valuetext', valueText);
  };

  const positionFromClientX = (clientX: number): number => {
    const rect = frame.getBoundingClientRect();
    const x = clamp(clientX - rect.left, 0, rect.width);
    return (x / rect.width) * 2;
  };

  const markInteracted = (): void => {
    if (interacted) return;
    interacted = true;
    if (hint) hint.dataset.faded = 'true';
  };

  // Drag handlers
  const onPointerDown = (e: PointerEvent): void => {
    e.preventDefault();
    dragging = true;
    markInteracted();
    handle.setPointerCapture(e.pointerId);
    handle.dataset.dragging = 'true';
    setPosition(positionFromClientX(e.clientX));
  };

  const onPointerMove = (e: PointerEvent): void => {
    if (!dragging) return;
    setPosition(positionFromClientX(e.clientX));
  };

  const onPointerUp = (e: PointerEvent): void => {
    if (!dragging) return;
    dragging = false;
    handle.releasePointerCapture(e.pointerId);
    handle.dataset.dragging = 'false';
    setPosition(current, true);
  };

  handle.addEventListener('pointerdown', onPointerDown);
  handle.addEventListener('pointermove', onPointerMove);
  handle.addEventListener('pointerup', onPointerUp);
  handle.addEventListener('pointercancel', onPointerUp);

  // Klick auf Frame außerhalb des Handle → setze Position
  frame.addEventListener('click', (e: MouseEvent) => {
    if (e.target === handle || handle.contains(e.target as Node)) return;
    markInteracted();
    setPosition(positionFromClientX(e.clientX), true);
  });

  // Stop-Buttons (auch falls vorhanden)
  stops.forEach((stop, i) => {
    stop.addEventListener('click', (e) => {
      e.stopPropagation();
      markInteracted();
      setPosition(i);
    });
  });

  // Tastatur
  handle.tabIndex = 0;
  handle.addEventListener('keydown', (e) => {
    let delta = 0;
    let snap = true;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') delta = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') delta = 1;
    if (e.key === 'Home') {
      e.preventDefault();
      markInteracted();
      setPosition(0, true);
      return;
    }
    if (e.key === 'End') {
      e.preventDefault();
      markInteracted();
      setPosition(2, true);
      return;
    }
    if (delta !== 0) {
      e.preventDefault();
      markInteracted();
      setPosition(Math.round(current) + delta, snap);
    }
  });

  // Initial render
  setPosition(0, true);
}

export function initAllKellySliders(): void {
  document.querySelectorAll<HTMLElement>('[data-kelly-root]').forEach(initKellySlider);
}

initAllKellySliders();
