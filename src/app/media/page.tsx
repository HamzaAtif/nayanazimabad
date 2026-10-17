import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { NEWS } from '@/data/news';
import { SITE } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Media centre',
  description:
    'Newsletters, e-magazine, CSR activity, downloads and sponsorships from Naya Nazimabad, plus press coverage of the project.',
  path: '/media',
});

export default function MediaPage() {
  const official = NEWS.filter((item) => item.source === 'nayanazimabad.com');
  const external = NEWS.filter((item) => item.source !== 'nayanazimabad.com');

  return (
    <>
      <PageHeader
        eyebrow="Media centre"
        title="News, downloads and press"
        lede="The official media centre is hosted by Naya Nazimabad. We link out rather than republish, so you always see the current version."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/media', label: 'Media' },
        ]}
      />

      <section className="container-page mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold">Official channels</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {official.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card block h-full p-5 transition-shadow hover:shadow-panel"
                >
                  <h3 className="font-semibold">
                    {item.title}
                    <span aria-hidden="true" className="ml-1 text-teal-600">
                      ↗
                    </span>
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-ink-soft">
                    {item.source}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.summary}</p>
                </a>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-semibold">Press &amp; social</h2>
          <ul className="mt-5 grid gap-4">
            {external.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card block p-5 transition-shadow hover:shadow-panel"
                >
                  <h3 className="font-semibold">
                    {item.title}
                    <span aria-hidden="true" className="ml-1 text-teal-600">
                      ↗
                    </span>
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-ink-soft">
                    {item.source}
                    {item.date ? ` · ${item.date}` : ''}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.summary}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-semibold">Follow along</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Launch announcements and construction progress are posted on the official Facebook
              page.
            </p>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4 w-full"
            >
              Naya Nazimabad on Facebook
            </a>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-sand-50 p-6">
            <h2 className="text-lg font-semibold">Brochures &amp; plans</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Each project page links to its own brochure and virtual tour, where the developer has
              published one.
            </p>
            <a
              href="https://nayanazimabad.com/downloads/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-4 w-full"
            >
              Developer downloads
            </a>
          </div>
        </aside>
      </section>
    </>
  );
}
