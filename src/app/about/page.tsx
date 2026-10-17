import type { Metadata } from 'next';
import Link from 'next/link';
import { FeatureList } from '@/components/FeatureList';
import { PageHeader } from '@/components/PageHeader';
import { SITE } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About us',
  description:
    'Naya Nazimabad is a 1,300-acre gated community on Manghopir Road, Karachi: clean land ownership, secured documentation, one-window facilitation and planned infrastructure.',
  path: '/about',
});

const TRUST = [
  '100% clean ownership of land',
  'Secured property documentation system to protect your investment',
  'One-window facilitation centre for hassle-free property management',
  'Eligible for housing finance',
  'Installments covered by life insurance',
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="The thinking behind Naya Nazimabad"
        lede="A city envisioned for the progressive middle class, built around the idea of peaceful community living — “a piece of heaven on earth”."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/about', label: 'About' },
        ]}
      />

      <section className="container-page mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="prose-page">
            Naya Nazimabad is a housing project being developed around Manghopir Lake in Karachi,
            Sindh, with a total area of {SITE.area}. It is delivered by Javedan Corporation Limited
            and is frequently described as a city within a city: apartments and bungalow plots, a
            business enclave, schools, clinics, sports academies and mosques, all inside one gated
            perimeter.
          </p>
          <p className="prose-page mt-4">
            The community is especially envisioned keeping the progressive middle class in mind,
            built up on the idea of providing lifestyle along the lines of peaceful community
            living. It is the inception of a thought that a house should be a home of serenity,
            respite and repose.
          </p>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Trustworthiness &amp; convenience</h2>
            <p className="prose-page mt-2">
              As published by Naya Nazimabad:
            </p>
            <div className="mt-4">
              <FeatureList title="What the developer commits to" items={TRUST} />
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Infrastructure</h2>
            <p className="prose-page mt-3">
              A progressive society is characterised by a rising living standard for its population.
              Well-planned roads and a broad corridor, along with a ring road connecting all the
              blocks, give an efficient transportation grid to Naya Nazimabad. An overhead water
              tank was built to revolutionise the way water management has been done in Karachi.
            </p>
            <p className="prose-page mt-3">
              The Naya Nazimabad flyover provides a direct connection from North Nazimabad, cutting
              journey times for residents and improving safety on the roads below.
            </p>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-semibold">Key facts</h2>
            <dl className="mt-4 divide-y divide-ink/10 text-sm">
              {[
                { label: 'Total area', value: SITE.area },
                { label: 'Location', value: 'Manghopir Road, Karachi' },
                { label: 'Setting', value: 'Developed around Manghopir Lake' },
                { label: 'Developer', value: 'Javedan Corporation Limited' },
                { label: 'Coordinates', value: `${SITE.coordinates.lat}, ${SITE.coordinates.lng}` },
              ].map((fact) => (
                <div key={fact.label} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-ink-soft">{fact.label}</dt>
                  <dd className="text-right font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-sand-50 p-6">
            <h2 className="text-lg font-semibold">Want the detail first-hand?</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Speak to the sales centre for current inventory, documentation and financing.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={SITE.uanHref} className="btn-primary">
                {SITE.uan}
              </a>
              <Link href="/contact" className="btn-secondary">
                Contact form
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
