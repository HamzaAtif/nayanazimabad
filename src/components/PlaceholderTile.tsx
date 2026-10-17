/** Gallery slot used until the client supplies photography. */
export function PlaceholderTile({
  caption,
  ratio = 'aspect-[4/3]',
}: {
  caption: string;
  ratio?: string;
}) {
  return (
    <figure className={`${ratio} placeholder-hatch relative overflow-hidden rounded-xl border border-ink/10`}>
      <svg
        viewBox="0 0 120 90"
        className="absolute inset-0 h-full w-full text-ink/25"
        role="img"
        aria-label={`Placeholder for: ${caption}`}
      >
        <rect x="18" y="30" width="34" height="44" fill="currentColor" opacity="0.25" />
        <rect x="58" y="18" width="42" height="56" fill="currentColor" opacity="0.18" />
        <path d="M6 74h108" stroke="currentColor" strokeWidth="2" opacity="0.35" />
        <circle cx="98" cy="22" r="7" fill="currentColor" opacity="0.3" />
      </svg>
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3 text-xs text-sand-100">
        {caption}
        <span className="ml-1 text-sand-300">· photo pending</span>
      </figcaption>
    </figure>
  );
}
