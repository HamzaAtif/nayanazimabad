'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS, SITE } from '@/data/site';

function Logo() {
  return (
    <span className="flex items-center gap-3">
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="h-9 w-9 shrink-0"
        role="presentation"
      >
        <rect width="40" height="40" rx="10" fill="#0f5c5c" />
        <path d="M9 29V18l6-6 6 6v11" stroke="#f6f1e7" strokeWidth="2.2" fill="none" />
        <path d="M22 29V13l4.5-3.5L31 13v16" stroke="#d9a94b" strokeWidth="2.2" fill="none" />
        <path d="M6 29h28" stroke="#f6f1e7" strokeWidth="2.2" />
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-lg font-semibold text-ink">Naya Nazimabad</span>
        <span className="text-[11px] uppercase tracking-[0.16em] text-teal-600">
          A piece of heaven on earth
        </span>
      </span>
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes the menu, and focus moves into the panel when it opens.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-sand-100/90 backdrop-blur">
      <div className="container-page flex h-[var(--header-height)] items-center justify-between gap-4">
        <Link href="/" className="rounded-lg" aria-label="Naya Nazimabad — home">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-teal-600 text-white'
                      : 'text-ink-soft hover:bg-teal-50 hover:text-teal-700'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.uanHref}
            className="hidden rounded-full border border-teal-600/30 px-4 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-50 sm:inline-flex"
          >
            {SITE.uan}
          </a>
          <Link href="/contact" className="btn-primary hidden sm:inline-flex">
            Enquire
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="border-t border-ink/10 bg-sand-50 lg:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="container-page flex flex-col py-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-teal-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="px-3 pt-2">
                <a href={SITE.uanHref} className="btn-secondary w-full">
                  Call {SITE.uan}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
