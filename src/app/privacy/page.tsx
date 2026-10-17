import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { SITE } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy & disclaimer',
  description:
    'How this Naya Nazimabad website handles enquiries, and the disclaimer covering the illustrative 3D masterplan and third-party project information.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy &amp; disclaimer"
        lede="This site is an independent front-end build showcasing Naya Nazimabad. It is not the official developer website."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/privacy', label: 'Privacy' },
        ]}
      />

      <section className="container-page mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold">What we collect</h2>
            <p className="prose-page mt-3">
              The contact form collects your name, email, phone (optional), the project you are
              interested in and your message. That is used only to answer your enquiry. Nothing is
              sold or shared with advertisers.
            </p>
            <p className="prose-page mt-3">
              Enquiries are rate-limited and validated server-side. In the default configuration no
              personal data is written to a database — the submission is logged without your email
              address or message body. If an email provider is configured, your details are sent to
              the sales team only.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Cookies &amp; analytics</h2>
            <p className="prose-page mt-3">
              This build ships without analytics or advertising cookies. Vercel may record standard
              server logs (IP address, user agent) for security and performance.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Disclaimer on project information</h2>
            <p className="prose-page mt-3">
              Project descriptions, features and contact details are reproduced from
              nayanazimabad.com and were captured in September 2026. Availability, prices and
              payment plans change without notice. Always confirm with the sales centre on{' '}
              <a className="text-teal-700 underline" href={SITE.uanHref}>
                {SITE.uan}
              </a>{' '}
              before making a decision.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Disclaimer on the 3D masterplan</h2>
            <p className="prose-page mt-3">
              The interactive masterplan is a schematic visualisation. Block names follow the
              official community, but building positions, heights and amenity locations are
              illustrative and approximate. It is not a survey, a legal plot plan, or a
              representation of plot boundaries, and must not be relied on for purchase decisions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Your rights</h2>
            <p className="prose-page mt-3">
              To ask what we hold about you, or to have an enquiry deleted, email{' '}
              <a className="text-teal-700 underline" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              .
            </p>
          </div>
        </div>

        <aside className="card h-fit p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold">Attribution</h2>
          <ul className="mt-3 space-y-3 text-sm text-ink-soft">
            <li>
              Project text, features and contact details:{' '}
              <a
                className="text-teal-700 underline"
                href={SITE.officialSite}
                target="_blank"
                rel="noopener noreferrer"
              >
                nayanazimabad.com
              </a>
              .
            </li>
            <li>
              Area, coordinates and ownership background: the Naya Nazimabad entry on Wikipedia.
            </li>
            <li>
              3D rendered with three.js and react-three-fiber; all textures generated procedurally
              in the browser, so the site ships no photography.
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
}
