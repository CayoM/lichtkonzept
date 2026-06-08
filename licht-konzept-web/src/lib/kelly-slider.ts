/**
 * Kelly-Slider — drei Lichtarten am gleichen Raumfoto.
 * Crossfade zwischen drei Bildvarianten, gesteuert über horizontalen Range-Slider.
 * A11y: ARIA-Slider mit Pfeil-Tasten-Steuerung; mobile Tap auf Step-Indikatoren.
 */
type StepConfig = {
  layer: HTMLElement;
  label: HTMLElement;
};

const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);

/**
 * Berechnet die Opazitäten der drei Schichten basierend auf der aktuellen Slider-Position 0..2.
 * Zwischen den Stops sanfter Übergang, sonst klare Schicht aktiv.
 */
const computeOpacities = (pos: number): [number, number, number] => {
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

export function initKellySlider(root: HTMLElement): void {
  const layers = Array.from(root.querySelectorAll<HTMLElement>('[data-kelly-layer]'));
  const labels = Array.from(root.querySelectorAll<HTMLElement>('[data-kelly-label]'));
  const slider = root.querySelector<HTMLInputElement>('[data-kelly-input]');
  const stops = Array.from(root.querySelectorAll<HTMLElement>('[data-kelly-stop]'));
  const progress = root.querySelector<HTMLElement>('[data-kelly-progress]');

  if (layers.length !== 3 || !slider) return;

  const steps: StepConfig[] = layers.map((layer, i) => ({
    layer,
    label: labels[i] ?? labels[0]!,
  }));

  let current = Number(slider.value);

  const render = (pos: number, animate = true): void => {
    const [a, b, c] = computeOpacities(pos);
    steps[0]!.layer.style.opacity = String(a);
    steps[1]!.layer.style.opacity = String(b);
    steps[2]!.layer.style.opacity = String(c);

    // Active step bestimmen (closest)
    const active = Math.round(pos);
    labels.forEach((l, i) => {
      const isActive = i === active;
      l.dataset.active = isActive ? 'true' : 'false';
    });
    stops.forEach((s, i) => {
      s.dataset.active = i === active ? 'true' : 'false';
    });

    if (progress) {
      progress.style.transform = `scaleX(${pos / 2})`;
    }

    // ARIA value
    slider.setAttribute('aria-valuenow', String(active));
    slider.setAttribute(
      'aria-valuetext',
      labels[active]?.dataset.kellyName ?? `Stufe ${active + 1}`,
    );

    if (!animate) {
      slider.value = String(pos);
    }
  };

  slider.addEventListener('input', () => {
    current = Number(slider.value);
    render(current);
  });

  // Klick auf Step-Indikatoren snapped zu Wert
  stops.forEach((stop, i) => {
    stop.addEventListener('click', () => {
      current = i;
      slider.value = String(i);
      render(i);
    });
  });

  // Tastatur: Pfeile bewegen in Schritten
  slider.addEventListener('keydown', (event) => {
    let delta = 0;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') delta = -1;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') delta = 1;
    if (event.key === 'Home') {
      event.preventDefault();
      current = 0;
      slider.value = '0';
      render(0);
      return;
    }
    if (event.key === 'End') {
      event.preventDefault();
      current = 2;
      slider.value = '2';
      render(2);
      return;
    }
    if (delta !== 0) {
      event.preventDefault();
      current = Math.max(0, Math.min(2, Math.round(current) + delta));
      slider.value = String(current);
      render(current);
    }
  });

  // Initial render
  render(current, false);

  // Reduzierte Bewegung: snappen zu nächstem Integer
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    slider.step = '1';
    current = Math.round(current);
    slider.value = String(current);
    render(current);
  }
}

export function initAllKellySliders(): void {
  document.querySelectorAll<HTMLElement>('[data-kelly-root]').forEach(initKellySlider);
}

initAllKellySliders();
