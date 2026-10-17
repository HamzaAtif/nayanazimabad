import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/PageHeader';
import { AMENITIES } from '@/data/amenities';
import { SITE } from '@/data/site';
import { absoluteUrl, buildMetadata } from '@/lib/seo';
import type { AmenityKind } from '@/types/content';

export const metadata: Metadata = buildMetadata({
  title: 'Amenities',
  description:
    'Amenities at Naya Nazimabad: Gymkhana, Jama Masjid, cricket and football stadiums with academies, padel and basketball, horse riding club, education complex, vocational training, hospitals and a banquet hall.',
  path: '/amenities',
});

const ICONS: Record<AmenityKind, string> = {
  club: 'M4 20h16M6 20V9l6-4 6 4v11M10 20v-6h4v6',
  masjid: 'M4 20h16M7 20v-8a5 5 0 0110 0v8M12 4v3M17 20v-6h3v6',
  cricket: 'M12 21V9m0 0l-4-5m4 5l4-5M8 21h8M4 21h16',
  football: 'M12 3a9 9 0 100 18 9 9 0 000-18zm0 0l3 5-3 2-3-2 3-5z',
  padel: 'M4 20h16M6 16l12-8M8 4h8v4H8zM6 20l4-4',
  basketball: 'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3 4 3 14 0 18M12 3c-3 4-3 14 0 18',
  hospital: 'M6 21V5a2 2 0 012-2h8a2 2 0 012 2v16M4 21h16M12 8v6M9 11h6',
  clinic: 'M6 21V6h12v15M4 21h16M12 9v6M9 12h6',
  school: 'M3 21h18M5 21V10l7-5 7 5v11M10 21v-6h4v6',
  vocational: 'M4 20h16M6 20V8l6-4 6 4v12M9 20v-5h6v5',
  riding: 'M4 20h16M7 20a5 5 0 0110 0M8 8l4-3 4 3-4 3-4-3z',
  banquet: 'M3 21h18M5 21v-9l7-5 7 5v9M9 21v-5h6v5',
  park: 'M12 21v-7m0 0a5 5 0 100-10 5 5 0 000 10zM4 21h16',
};

export default function AmenitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Amenities"
        title="A community, not just a housing scheme"
        lede="Naya Nazimabad publishes thirteen amenities. Where the developer has not published a description, we say so rather than fill the gap — call the UAN for the current facilities list."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/amenities', label: 'Amenities' },
        ]}
      />

      <section className="container-page mt-12">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((amenity) => (
            <li key={amenity.id} className="card flex gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-600">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
                  <path
                    d={ICONS[amenity.kind]}
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <h2 className="font-semibold leading-snug">{amenity.name}</h2>
                <p className="mt-1 text-xs uppercase tracking-wider text-ink-soft">
                  {amenity.block}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{amenity.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl border border-gold-400/50 bg-gold-400/10 p-6">
          <h2 className="text-lg font-semibold">About this list</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
            Amenity names are reproduced from the navigation of nayanazimabad.com. Most items have
            no published description, which is why the cards above stay short. Facilities are shown
            as landmarks in the 3D masterplan; their positions are illustrative.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={SITE.uanHref} className="btn-primary">
              Confirm with the sales centre
            </a>
            <Link href="/media" className="btn-secondary">
              Media centre &amp; downloads
            </Link>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Naya Nazimabad amenities',
          itemListElement: AMENITIES.map((amenity, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: amenity.name,
            description: amenity.description,
            url: absoluteUrl('/amenities'),
          })),
        }}
      />
    </>
  );
}
