/** Site-wide constants: contact details, navigation, social links. */

export const SITE = {
  name: 'Naya Nazimabad',
  tagline: 'A piece of heaven on earth',
  legalName: 'Naya Nazimabad (Javedan Corporation Limited)',
  description:
    'Naya Nazimabad is a 1,300-acre gated community on Manghopir Road, Karachi. Explore the masterplan in 3D: Peace Apartments, Globe Residency, Grace Tower, Signature Tower, Rahat Residency and Rahat Residency II.',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nayanazimabad.vercel.app').replace(/\/$/, ''),
  uan: '+92-21-111-511-611',
  uanHref: 'tel:+9221111511611',
  tel: '+92 21 36770001-3',
  email: 'info@nayanazimabad.com',
  address: 'Naya Nazimabad, Manghopir Road, Karachi, Sindh, Pakistan',
  /** Community centroid (Wikipedia), used for the site-wide map. */
  coordinates: { lat: 24.9753, lng: 67.0258 },
  area: '1,300 acres (530 ha)',
  facebook: 'https://www.facebook.com/nayanazimabad',
  officialSite: 'https://nayanazimabad.com/',
} as const;

export const NAV_LINKS = [
  { href: '/', label: 'Masterplan' },
  { href: '/projects', label: 'Projects' },
  { href: '/amenities', label: 'Amenities' },
  { href: '/about', label: 'About' },
  { href: '/media', label: 'Media' },
  { href: '/contact', label: 'Contact' },
] as const;

export const FOOTER_LINKS = [
  {
    heading: 'Projects',
    links: [
      { href: '/projects/peace-apartments', label: 'Peace Apartments' },
      { href: '/projects/globe-residency', label: 'Globe Residency' },
      { href: '/projects/grace-tower', label: 'Grace Tower' },
      { href: '/projects/signature-tower', label: 'Signature Tower' },
      { href: '/projects/rahat-residency', label: 'Rahat Residency' },
      { href: '/projects/rahat-residency-ii', label: 'Rahat Residency II' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { href: '/amenities', label: 'Amenities' },
      { href: '/about', label: 'About us' },
      { href: '/media', label: 'Media centre' },
      { href: '/contact', label: 'Contact us' },
    ],
  },
] as const;
