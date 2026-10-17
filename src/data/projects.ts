import type { Project } from '@/types/content';

/**
 * Canonical project data for Naya Nazimabad.
 *
 * Prose marked "official" is taken verbatim from the project pages on
 * nayanazimabad.com (fetched September 2026). Anything the official site does
 * not publish is left blank or flagged rather than invented.
 */
export const PROJECTS: Project[] = [
  {
    slug: 'peace-apartments',
    name: 'Peace Apartments',
    headline: '2, 3 & 4 Bedroom Apartments',
    category: 'apartments',
    status: 'under-construction',
    statusNote: 'Listed under Projects on nayanazimabad.com; construction updates are published in the Developments section.',
    block: 'Naya Nazimabad (block not published)',
    summary:
      'High-rise towers with bright, cross-ventilated apartments, dedicated and guest parking, and a whole floor given over to amenities.',
    description: [
      'Discover the perfect blend of convenience and comfort at Naya Nazimabad Peace Apartments. Our high-rise towers offer luxurious 2, 3, and 4-bedroom apartments. Each unit is thoughtfully designed to be bright and airy with plenty of natural light and ventilation. Enjoy dedicated and guest parking, plus a whole floor of amenities for a comfortable and modern lifestyle.',
    ],
    unitTypes: ['2 bedroom', '3 bedroom', '4 bedroom'],
    features: [
      'Reserved car parking',
      'Ventilated corridor',
      'Advanced security surveillance',
      'Reception & waiting area',
      'Passenger lifts',
      'Cargo lifts',
      'Standby generator',
      'Grey water recycling',
      'Emergency fire exit',
      'Fire fighting system',
    ],
    amenityFeatures: [
      'Community hall',
      'Gaming room',
      'Senior citizen lounge',
      'Male & female gym',
      'Co-working space',
      'High speed internet',
      'Library',
      'Landscape areas',
      'Community garden',
      "Children's play area",
    ],
    highlights: [
      {
        title: 'Flyover — travel without a hassle',
        body: 'The inauguration of the flyover was a much-anticipated event. The newly constructed flyover stands tall over the busy intersection, providing a seamless connection from North Nazimabad to Naya Nazimabad, and is expected to significantly reduce travel time for commuters as well as improve safety on the roads.',
      },
    ],
    links: [
      {
        label: 'Download brochure (PDF)',
        href: 'https://nayanazimabad.com/wp-content/uploads/2026/03/peace_brochure.pdf',
        kind: 'brochure',
      },
      {
        label: 'Virtual tour — 2 bed',
        href: 'https://nayanazimabad.com/wp-content/Marketing/2Bed',
        kind: 'virtual-tour',
      },
      {
        label: 'Virtual tour — 3 bed DD',
        href: 'https://nayanazimabad.com/wp-content/Marketing/3BedDDNew/',
        kind: 'virtual-tour',
      },
      {
        label: 'Peace Apartments on nayanazimabad.com',
        href: 'https://nayanazimabad.com/peace-apartments/',
        kind: 'external',
      },
    ],
    gallery: [
      { caption: 'Peace Apartments — tower elevation', src: null },
      { caption: 'Entrance & reception', src: null },
      { caption: 'Typical 3-bed lounge', src: null },
      { caption: 'Amenities floor', src: null },
    ],
    massing: { position: [0, -62], footprint: [46, 20], towers: 2, floors: 20 },
  },
  {
    slug: 'globe-residency',
    name: 'Globe Residency Apartments',
    headline: '4 & 5 Room Luxury Apartments',
    category: 'apartments',
    status: 'under-construction',
    statusNote: 'Listed under Projects and under Developments › Construction of Globe Residency.',
    block: 'Naya Nazimabad (block not published)',
    summary:
      'Spacious rooms, sizeable lounges and terraces with splendid views, in the heart of the city with a dedicated parking spot for every apartment.',
    description: [
      "We're living up to the promise of a serene and tranquil lifestyle by giving you the apartments that offer spacious rooms, sizeable lounges, modern bathrooms with contemporary fittings, terraces with the most splendid views along with a dedicated parking spot.",
      'A serene and peaceful environment that encapsulates an urban lifestyle with high class facilities along with 4 and 5 room luxury apartments located in the heart of the city.',
    ],
    unitTypes: ['4 room', '5 room'],
    features: [
      'Spacious rooms',
      'Sizeable lounges',
      'Modern bathrooms with contemporary fittings',
      'Terraces with splendid views',
      'Dedicated parking spot',
    ],
    highlights: [
      {
        title: 'See it before you visit',
        body: 'A 360° virtual tour of the 2-bed and 3-bed DD layouts is published by Naya Nazimabad, and Meezan Bank home-financing options are available on the project page.',
      },
    ],
    links: [
      {
        label: 'Download brochure (PDF)',
        href: 'https://nayanazimabad.com/wp-content/uploads/2025/10/brochure-nn-apartment.pdf',
        kind: 'brochure',
      },
      {
        label: 'Virtual tour — 2 bed',
        href: 'https://nayanazimabad.com/wp-content/Marketing/2Bed',
        kind: 'virtual-tour',
      },
      {
        label: 'Virtual tour — 3 bed DD',
        href: 'https://nayanazimabad.com/wp-content/Marketing/3BedDDNew/',
        kind: 'virtual-tour',
      },
      {
        label: 'Globe Residency on nayanazimabad.com',
        href: 'https://nayanazimabad.com/apartments/',
        kind: 'external',
      },
    ],
    gallery: [
      { caption: 'Globe Residency — elevation', src: null },
      { caption: 'Masterplan aerial view', src: null },
      { caption: 'Typical lounge', src: null },
      { caption: 'Terrace view', src: null },
    ],
    massing: { position: [80, -62], footprint: [40, 20], towers: 2, floors: 13 },
  },
  {
    slug: 'grace-tower',
    name: 'Grace Tower',
    headline: 'Apartments & Premium Retail',
    category: 'mixed-use',
    status: 'under-construction',
    statusNote: 'Latest addition to the Projects list on nayanazimabad.com (Grace Tower, 2026).',
    block: 'Business Enclave',
    summary:
      'A contemporary mixed-use development in the Business Enclave: apartments above premium retail, rising four floors.',
    description: [
      'Grace Tower is a contemporary mixed-use development offering elegantly designed apartments and premium retail spaces in the heart of the Business Enclave. Rising up to four floors, the project features thoughtfully planned apartment alongside the commercial shops on the ground floor. With world-class fixtures.',
    ],
    unitTypes: ['Apartments (sizes not published)', 'Ground-floor retail'],
    features: [
      'Modern architecture',
      'A prime business-center location',
      'A refined lifestyle where comfort, convenience, and connectivity come together seamlessly',
    ],
    notes: [
      'Floor plans, payment plan and brochure had not been published on the official page at the time this data was captured; use the contact form or UAN for the current price list.',
    ],
    links: [
      {
        label: 'Grace Tower on nayanazimabad.com',
        href: 'https://nayanazimabad.com/grace-tower/',
        kind: 'external',
      },
    ],
    gallery: [
      { caption: 'Grace Tower — street elevation', src: null },
      { caption: 'Retail frontage', src: null },
      { caption: 'Typical bedroom', src: null },
      { caption: 'Lounge', src: null },
    ],
    massing: { position: [8, -6], footprint: [30, 22], towers: 1, floors: 4 },
  },
  {
    slug: 'signature-tower',
    name: 'Signature Tower',
    headline: '2 | 3 | 4 Bed Executive Apartments & Duplexes',
    category: 'apartments',
    status: 'under-construction',
    statusNote: 'Listed under Projects and under Developments › Construction of Signature Tower.',
    block: 'Block A — adjacent to the Gymkhana',
    summary:
      'The tallest address in Naya Nazimabad: a four-sides-open tower in Block A, next to the Gymkhana and the cricket stadium, with family parks on two sides.',
    description: [
      'Being developed at the finest location at Naya Nazimabad, Signature Tower echoes the magnificence that is Naya Nazimabad. Adjacent to the Gymkhana and our flagship Cricket Stadium, Signature’s intricate design and opulence exudes majesty.',
      'Take in Naya Nazimabad’s unobstructed and breath-taking views from our highest point as you enjoy a lifestyle of peace and calm.',
    ],
    unitTypes: ['2 bed', '3 bed', '4 bed', 'Duplexes'],
    features: [
      'Most prime location in Block A',
      'Adjacent to Gymkhana',
      '4 sides open tower',
      'All corner apartments',
      '2 sides large family parks',
      '3 floors reserved parking',
      'Reception & waiting area',
      'Dedicated floor for amenities',
      'Passenger lifts',
      'Cargo lift',
      'Standby generators',
      'Emergency fire exit',
    ],
    links: [
      {
        label: 'Download brochure (PDF)',
        href: 'https://nayanazimabad.com/wp-content/uploads/2025/05/signature_brochure_small.pdf',
        kind: 'brochure',
      },
      {
        label: 'Signature Tower on nayanazimabad.com',
        href: 'https://nayanazimabad.com/signature/',
        kind: 'external',
      },
    ],
    gallery: [
      { caption: 'Signature Tower — elevation', src: null },
      { caption: 'Masterplan view towards the Gymkhana', src: null },
      { caption: 'Typical lounge', src: null },
      { caption: 'Duplex interior', src: null },
    ],
    massing: { position: [-75, -55], footprint: [18, 18], towers: 1, floors: 32 },
  },
  {
    slug: 'rahat-residency',
    name: 'Rahat Residency',
    headline: '2 Bed DD Apartments',
    category: 'apartments',
    status: 'under-construction',
    statusNote: 'Listed under Projects and under Developments › Construction of Rahat Residency.',
    block: 'Central Naya Nazimabad',
    summary:
      'A single tower of single-sided, park-facing 2-bed DD apartments, planned so every unit gets maximum natural light and ventilation.',
    description: [
      'Located very centrally in Naya Nazimabad, Rahat Residency is another remarkable project that offers unmatched luxuries with simplicity. A single tower project comprising of single sided 2 bedroom apartment, designed aesthetically and thoughtfully that every unit would receive maximum natural light and ventilation.',
    ],
    unitTypes: ['2 bed DD'],
    features: [
      'Central location in Naya Nazimabad',
      'All apartments are single sided & park facing',
      'Natural ventilation due to single corridor',
      '01 dedicated floor for amenities',
      'Dedicated car and bike parking for each apartment',
      'Reception & waiting area',
      '02 high-speed passenger lifts',
      '01 cargo lift',
      'Standby generators',
    ],
    links: [
      {
        label: 'Download brochure (PDF)',
        href: 'https://nayanazimabad.com/wp-content/uploads/2025/04/rahat_brochure.pdf',
        kind: 'brochure',
      },
      {
        label: 'Rahat Residency on nayanazimabad.com',
        href: 'https://nayanazimabad.com/rahat/',
        kind: 'external',
      },
    ],
    gallery: [
      { caption: 'Rahat Residency — elevation', src: null },
      { caption: 'Park-facing façade', src: null },
      { caption: 'Typical lounge', src: null },
      { caption: 'Bedroom', src: null },
    ],
    massing: { position: [-16, 16], footprint: [18, 16], towers: 1, floors: 16 },
  },
  {
    slug: 'rahat-residency-ii',
    name: 'Rahat Residency II',
    headline: '2 & 3 Bed, Drawing & Dining Apartments',
    category: 'apartments',
    status: 'under-construction',
    statusNote: 'Listed under Projects on nayanazimabad.com.',
    block: 'Block D',
    summary:
      'A single tower in Block D: four-sides-open, all-corner 2 & 3 bed drawing-and-dining apartments with dedicated parking floors.',
    description: [
      'Rahat Residency II is a uniquely designed single tower project centrally located in Block D, offering 2 & 3 bed, drawing & dining apartments.',
    ],
    unitTypes: ['2 bed DD', '3 bed DD'],
    features: [
      'Central location in Naya Nazimabad',
      'Natural ventilation due to four side open',
      'All corner apartments',
      'Dedicated floors for parking',
      'Reception & waiting area',
      'High-speed passenger lifts',
      'Cargo lift',
      'Standby generators',
    ],
    links: [
      {
        label: 'Download brochure (PDF)',
        href: 'https://nayanazimabad.com/wp-content/uploads/2025/04/rahat2_brochure.pdf',
        kind: 'brochure',
      },
      {
        label: 'Rahat Residency II on nayanazimabad.com',
        href: 'https://nayanazimabad.com/rahat-residency-ii/',
        kind: 'external',
      },
    ],
    gallery: [
      { caption: 'Rahat Residency II — elevation', src: null },
      { caption: 'Entrance & reception', src: null },
      { caption: 'Typical lounge', src: null },
      { caption: 'Bedroom', src: null },
    ],
    massing: { position: [72, 0], footprint: [20, 18], towers: 1, floors: 16 },
  },
  {
    slug: 'commercial',
    name: 'Commercial',
    headline: 'Upcoming Projects',
    category: 'commercial',
    status: 'upcoming',
    statusNote: 'Published on nayanazimabad.com as “Commercial (Upcoming projects)”, with no detail page yet.',
    block: 'Business Enclave (indicative)',
    summary:
      'The commercial programme for Naya Nazimabad is announced as “upcoming”. No unit mix, pricing or handover date has been published yet.',
    description: [
      'Naya Nazimabad lists a commercial component under “Upcoming projects”. Details — unit mix, floor plates, payment plan and launch date — have not been published on the official site.',
    ],
    unitTypes: ['Unspecified'],
    features: ['Details not published yet — register your interest for launch updates'],
    notes: [
      'Everything on this page is unspecified by design. Call the UAN or send the contact form to be notified when the commercial inventory is released.',
    ],
    links: [
      {
        label: 'Commercial projects on nayanazimabad.com',
        href: 'https://nayanazimabad.com/commercial',
        kind: 'external',
      },
    ],
    gallery: [{ caption: 'Commercial plot — hoarding (illustrative)', src: null }],
    massing: {
      position: [28, -14],
      footprint: [30, 22],
      towers: 1,
      floors: 3,
      unbuilt: true,
    },
  },
];

export const PROJECT_SLUGS = PROJECTS.map((p) => p.slug);

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Projects that have a published building programme (everything except "upcoming"). */
export const ACTIVE_PROJECTS = PROJECTS.filter((p) => p.status !== 'upcoming');
