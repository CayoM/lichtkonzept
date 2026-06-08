/**
 * Setzt data-daypart="day" oder "evening" am <html> abhängig von lokaler Uhrzeit.
 * Tag: 6–17 Uhr. Abend: 17–6 Uhr.
 * Aktualisiert bei Sichtbarkeitswechsel (Tab wieder im Fokus).
 */
export function initDaypart(): void {
  if (typeof document === 'undefined') return;

  const apply = (): void => {
    const hour = new Date().getHours();
    const daypart = hour >= 6 && hour < 17 ? 'day' : 'evening';
    if (document.documentElement.dataset.daypart !== daypart) {
      document.documentElement.dataset.daypart = daypart;
    }
  };

  apply();

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') apply();
  });

  // sanfter Auto-Check alle 5 Minuten (für offene Tabs über die Schwelle 17:00 hinweg)
  window.setInterval(apply, 5 * 60 * 1000);
}

// Auto-run beim Import als Module-Script
initDaypart();
