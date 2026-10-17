import Link from 'next/link';
import { FOOTER_LINKS, SITE } from '@/data/site';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-teal-900 text-sand-100">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl">{SITE.name}</p>
          <p className="mt-2 max-w-xs text-sm text-teal-100">{SITE.tagline}</p>
          <dl className="mt-6 space-y-2 text-sm text-teal-100">
            <div>
              <dt className="font-semibold text-white">UAN</dt>
              <dd>
                <a className="underline decoration-teal-200 underline-offset-4" href={SITE.uanHref}>
                  {SITE.uan}
                </a>{' '}
                <span className="text-teal-200">· Tel {SITE.tel}</span>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Email</dt>
              <dd>
                <a
                  className="underline decoration-teal-200 underline-offset-4"
                  href={`mailto:${SITE.email}`}
                >
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Sales centre</dt>
              <dd>{SITE.address}</dd>
            </div>
          </dl>
        </div>

        {FOOTER_LINKS.map((group) => (
          <nav key={group.heading} aria-label={group.heading}>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-200">
              {group.heading}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded text-sand-100 underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label="Official channels">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-200">Official</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded underline-offset-4 hover:underline"
              >
                Facebook page
              </a>
            </li>
            <li>
              <a
                href={SITE.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded underline-offset-4 hover:underline"
              >
                nayanazimabad.com
              </a>
            </li>
            <li>
              <Link href="/privacy" className="rounded underline-offset-4 hover:underline">
                Privacy &amp; disclaimer
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-teal-100 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. Project information reproduced from
            nayanazimabad.com.
          </p>
          <p>
            The 3D masterplan is illustrative and not a survey or legal plot plan. Verify all
            details with the sales centre.
          </p>
        </div>
      </div>
    </footer>
  );
}
