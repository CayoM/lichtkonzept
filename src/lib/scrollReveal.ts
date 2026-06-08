/**
 * Subtile Scroll-Reveals — opacity + translateY beim In-View kommen.
 * IntersectionObserver-basiert, kein GSAP nötig.
 * Respektiert prefers-reduced-motion.
 */
export function initScrollReveal(): void {
  if (typeof window === 'undefined') return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');

  if (reduce) {
    els.forEach((el) => {
      el.dataset.revealed = 'true';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.revealed = 'true';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  els.forEach((el) => observer.observe(el));
}

initScrollReveal();
