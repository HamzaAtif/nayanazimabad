import { SITE } from '@/data/site';

/**
 * Lazy Google Maps embed for the community centroid.
 * Individual plot coordinates have not been published, so the map shows the
 * Naya Nazimabad locality rather than a pin for a specific tower.
 */
export function MapEmbed({ height = 320 }: { height?: number }) {
  const { lat, lng } = SITE.coordinates;
  const embed = `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;
  const link = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-sand-200">
      <iframe
        title="Map of Naya Nazimabad, Manghopir Road, Karachi"
        src={embed}
        width="100%"
        height={height}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block w-full border-0"
      />
      <p className="flex flex-wrap items-center justify-between gap-2 bg-white px-4 py-3 text-xs text-ink-soft">
        <span>
          Showing the Naya Nazimabad locality ({lat}, {lng}). Exact plot coordinates have not been
          published by the developer.
        </span>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-teal-700 hover:underline"
        >
          Open in Google Maps
        </a>
      </p>
    </div>
  );
}
