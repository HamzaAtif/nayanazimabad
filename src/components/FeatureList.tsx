export function FeatureList({
  title,
  items,
  accent = 'teal',
}: {
  title: string;
  items: string[];
  accent?: 'teal' | 'gold';
}) {
  return (
    <section aria-labelledby={`features-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <h3
        id={`features-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className="text-lg font-semibold"
      >
        {title}
      </h3>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                accent === 'gold' ? 'text-gold-500' : 'text-teal-600'
              }`}
              fill="none"
            >
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
              <path
                d="M6 10.5l2.5 2.5L14 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
