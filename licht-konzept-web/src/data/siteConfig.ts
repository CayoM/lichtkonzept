export const siteConfig = {
  brand: 'Licht Konzept',
  legal: 'Boden Konzept GmbH',
  tagline: 'Wir machen aus Räumen Erlebnisse.',
  description:
    'Maßgeschneiderte Lichtkonzepte für anspruchsvolle Privat- und Gewerberäume. Beratung, Planung, Umsetzung — aus einer Hand.',
  contact: {
    phone: '07031 6130390',
    phoneIntl: '+49 7031 6130390',
    mobile: '01522 7744085',
    mobileIntl: '+49 1522 7744085',
    email: 'info@licht-konzept.net',
  },
  address: {
    street: 'Sindelfinger Str. 39',
    zip: '71032',
    city: 'Böblingen',
    country: 'Deutschland',
  },
  legalEntity: {
    name: 'Boden Konzept GmbH',
    register: 'Amtsgericht Stuttgart',
    registerNumber: 'HRB 771137',
    ceo: 'Angelo Kunovic',
  },
  nav: [
    { label: 'Manifest', href: '#manifest' },
    { label: 'Methodik', href: '#methodik' },
    { label: 'Prozess', href: '#prozess' },
    { label: 'Referenzen', href: '#referenzen' },
    { label: 'Team', href: '#team' },
    { label: 'Kontakt', href: '#kontakt' },
  ],
} as const;
