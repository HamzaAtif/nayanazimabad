import Link from 'next/link';

export function PageHeader({
  eyebrow,
  title,
  lede,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  breadcrumbs?: { href: string; label: string }[];
}) {
  return (
    <header className="border-b border-ink/10 bg-sand-50">
      <div className="container-page py-10 sm:py-14">
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-soft">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-1.5">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  <Link href={crumb.href} className="rounded hover:text-teal-700 hover:underline">
                    {crumb.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h1>
        {lede ? <p className="prose-page mt-4">{lede}</p> : null}
      </div>
    </header>
  );
}
