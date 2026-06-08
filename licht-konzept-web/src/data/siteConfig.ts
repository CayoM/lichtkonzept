export const siteConfig = {
  brand: 'Licht Konzept',
  legal: 'Boden Konzept GmbH',
  tagline: 'We light up your vision.',
  description:
    'Maßgeschneiderte Lichtkonzepte für Fitnessstudios, Gewerberäume und Premium-Privatkunden. Beratung, Planung, eigene Kollektion, Umsetzung — aus einer Hand.',
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
  social: {
    instagram: 'https://www.instagram.com/licht_konzept/',
  },
  nav: [
    { label: 'Manifest', href: '#manifest' },
    { label: 'Methodik', href: '#methodik' },
    { label: 'Kollektion', href: '#kollektion' },
    { label: 'Referenzen', href: '#referenzen' },
    { label: 'Prozess', href: '#prozess' },
    { label: 'Kontakt', href: '#kontakt' },
  ],
} as const;
