import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { MapEmbed } from '@/components/MapEmbed';
import { PageHeader } from '@/components/PageHeader';
import { SITE } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact us',
  description:
    'Contact Naya Nazimabad: UAN +92-21-111-511-611, info@nayanazimabad.com, main sales centre on Manghopir Road, Karachi. Send an enquiry and the sales team will call back.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title="Get in touch"
        lede="Call the UAN, email the team, or send an enquiry below. The main sales centre is on Manghopir Road, Karachi."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/contact', label: 'Contact' },
        ]}
      />

      <section className="container-page mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-semibold">Call</h2>
            <a href={SITE.uanHref} className="mt-2 block font-display text-2xl text-teal-700">
              {SITE.uan}
            </a>
            <p className="mt-1 text-sm text-ink-soft">Tel: {SITE.tel}</p>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold">Email</h2>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-2 block break-all font-display text-2xl text-teal-700"
            >
              {SITE.email}
            </a>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold">Sales centre</h2>
            <address className="mt-2 not-italic text-ink-soft">{SITE.address}</address>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold">Social</h2>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-teal-700 hover:underline"
            >
              Naya Nazimabad on Facebook ↗
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Send an enquiry</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Tell us which project and apartment size you are interested in, and the team will call
            you back with current availability.
          </p>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="container-page mt-16" aria-labelledby="map-heading">
        <h2 id="map-heading" className="text-2xl font-semibold">
          Find us
        </h2>
        <div className="mt-6">
          <MapEmbed height={380} />
        </div>
      </section>
    </>
  );
}
