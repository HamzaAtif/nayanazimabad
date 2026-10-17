import type { Project } from '@/types/content';

const PALETTES = [
  { sky: ['#cfe3e8', '#f6f1e7'], tower: '#e2d8c2', glass: '#5e858f', accent: '#0f5c5c' },
  { sky: ['#dbe7ee', '#f3ece0'], tower: '#dcd2bb', glass: '#4f7f8c', accent: '#14504f' },
  { sky: ['#e6dfd0', '#f8f4ea'], tower: '#e7ddc7', glass: '#6b8f94', accent: '#0f5c5c' },
];

/**
 * Deterministic SVG elevation generated from the project's massing data.
 * Stands in for photography until the client's renders are available.
 */
export function ProjectElevation({
  project,
  className = '',
}: {
  project: Project;
  className?: string;
}) {
  const palette = PALETTES[project.slug.length % PALETTES.length];
  const { massing } = project;
  const wide = Math.max(...massing.footprint);
  const tall = massing.floors;
  const towers = massing.towers;
  const towerWidth = 44;
  const gap = 10;
  const totalWidth = towers * towerWidth + (towers - 1) * gap;
  const maxHeight = 118;
  const scale = Math.min(1, 132 / (totalWidth + 30));
  const height = Math.min(maxHeight, 26 + tall * 3.6);

  return (
    <svg
      viewBox="0 0 320 180"
      className={className}
      role="img"
      aria-label={`Illustrative elevation of ${project.name}`}
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id={`sky-${project.slug}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.sky[0]} />
          <stop offset="100%" stopColor={palette.sky[1]} />
        </linearGradient>
        <pattern
          id={`windows-${project.slug}`}
          width="8"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <rect width="8" height="10" fill={palette.tower} />
          <rect x="1.5" y="2" width="5" height="4.5" fill={palette.glass} opacity="0.75" />
        </pattern>
      </defs>

      <rect width="320" height="180" fill={`url(#sky-${project.slug})`} />

      {/* Distant skyline hint */}
      <g opacity="0.18" fill={palette.accent}>
        <rect x="10" y="112" width="26" height="68" />
        <rect x="44" y="126" width="18" height="54" />
        <rect x="252" y="120" width="22" height="60" />
        <rect x="284" y="132" width="26" height="48" />
      </g>

      <g transform={`translate(${160 - (totalWidth * scale) / 2}, 180)`}>
        <g transform={`scale(${scale})`}>
          {Array.from({ length: towers }, (_, index) => {
            const x = index * (towerWidth + gap);
            return (
              <g key={index}>
                <rect
                  x={x}
                  y={-height}
                  width={towerWidth}
                  height={height}
                  fill={`url(#windows-${project.slug})`}
                  stroke={palette.accent}
                  strokeOpacity="0.25"
                />
                <rect x={x - 3} y={-height - 5} width={towerWidth + 6} height="6" fill={palette.tower} />
                {massing.unbuilt ? (
                  <rect
                    x={x}
                    y={-height}
                    width={towerWidth}
                    height={height}
                    fill={palette.accent}
                    opacity="0.25"
                  />
                ) : null}
              </g>
            );
          })}
          {/* Podium */}
          <rect
            x={-12}
            y={-14}
            width={totalWidth + 24}
            height="14"
            fill={palette.tower}
            stroke={palette.accent}
            strokeOpacity="0.2"
          />
        </g>
      </g>

      <rect y="172" width="320" height="8" fill={palette.accent} opacity="0.85" />
      {wide > 30 ? (
        <g fill={palette.accent} opacity="0.5">
          <circle cx="34" cy="164" r="7" />
          <circle cx="288" cy="162" r="9" />
        </g>
      ) : null}
    </svg>
  );
}
