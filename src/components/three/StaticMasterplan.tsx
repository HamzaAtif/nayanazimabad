import { AMENITIES } from '@/data/amenities';
import { DISTRICTS, MASTERPLAN } from '@/data/masterplan';
import { PROJECTS } from '@/data/projects';

const SCALE = 300 / 130;
const ORIGIN_X = 300;
const ORIGIN_Z = 350;

const sx = (x: number) => ORIGIN_X + x * SCALE;
const sz = (z: number) => ORIGIN_Z + z * SCALE;

/**
 * Server-rendered 2D plan of the same schematic layout. Used when WebGL is
 * unavailable, when JavaScript is off, and as the print/no-JS fallback — it also
 * gives crawlers a text-and-link version of the masterplan.
 */
export function StaticMasterplan({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 640"
      className={className}
      role="img"
      aria-labelledby="static-plan-title static-plan-desc"
    >
      <title id="static-plan-title">Illustrative plan of Naya Nazimabad</title>
      <desc id="static-plan-desc">
        Schematic site plan showing {DISTRICTS.length} blocks, the Business Enclave, Manghopir Lake,{' '}
        {PROJECTS.length} projects and {AMENITIES.length} amenities. Positions are illustrative and
        not survey data.
      </desc>

      <defs>
        <linearGradient id="plan-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4aa3bd" />
          <stop offset="100%" stopColor="#2f7f96" />
        </linearGradient>
      </defs>

      <rect width="600" height="640" fill="#d8cfb6" />

      {/* Blocks */}
      {DISTRICTS.map((district) => {
        const [x0, z0, x1, z1] = district.rect;
        return (
          <g key={district.id}>
            <rect
              x={sx(x0)}
              y={sz(z0)}
              width={(x1 - x0) * SCALE}
              height={(z1 - z0) * SCALE}
              fill={district.tint}
              stroke="rgba(15,43,46,0.18)"
            />
            <text
              x={sx(x0) + 6}
              y={sz(z0) + 14}
              fontSize="9"
              fill="rgba(15,43,46,0.55)"
              fontFamily="system-ui, sans-serif"
            >
              {district.name}
            </text>
          </g>
        );
      })}

      {/* Roads */}
      <g stroke="#4a4b48" strokeWidth={9 * SCALE} opacity={0.85}>
        {MASTERPLAN.roads.verticals.map((x) => (
          <line key={`v-${x}`} x1={sx(x)} y1={sz(-140)} x2={sx(x)} y2={sz(110)} />
        ))}
        {MASTERPLAN.roads.horizontals.map((z) => (
          <line key={`h-${z}`} x1={sx(-125)} y1={sz(z)} x2={sx(125)} y2={sz(z)} />
        ))}
      </g>
      <g stroke="#4a4b48" strokeWidth={9 * SCALE} opacity={0.7}>
        <line x1={sx(-122)} y1={sz(-98)} x2={sx(122)} y2={sz(-98)} />
        <line x1={sx(-122)} y1={sz(102)} x2={sx(122)} y2={sz(102)} />
        <line x1={sx(-122)} y1={sz(-98)} x2={sx(-122)} y2={sz(102)} />
        <line x1={sx(122)} y1={sz(-98)} x2={sx(122)} y2={sz(102)} />
      </g>

      {/* Lake */}
      <ellipse
        cx={sx(MASTERPLAN.lake.center[0])}
        cy={sz(MASTERPLAN.lake.center[1])}
        rx={MASTERPLAN.lake.rx * SCALE}
        ry={MASTERPLAN.lake.rz * SCALE}
        fill="url(#plan-water)"
      />

      {/* Amenities */}
      {AMENITIES.map((amenity) => (
        <g key={amenity.id}>
          <rect
            x={sx(amenity.position[0] - amenity.footprint[0] / 2)}
            y={sz(amenity.position[1] - amenity.footprint[1] / 2)}
            width={amenity.footprint[0] * SCALE}
            height={amenity.footprint[1] * SCALE}
            rx={3}
            fill="rgba(79,139,88,0.45)"
            stroke="rgba(15,92,92,0.5)"
          />
          <circle cx={sx(amenity.position[0])} cy={sz(amenity.position[1])} r={2} fill="#0f5c5c" />
        </g>
      ))}

      {/* Projects */}
      {PROJECTS.map((project) => {
        const [x, z] = project.massing.position;
        const [w, d] = project.massing.footprint;
        const cx = sx(x);
        const cy = sz(z);
        return (
          <a
            key={project.slug}
            href={`/projects/${project.slug}`}
            aria-label={`${project.name} — ${project.headline}`}
          >
            <rect
              x={cx - (w * SCALE) / 2}
              y={cy - (d * SCALE) / 2}
              width={w * SCALE}
              height={d * SCALE}
              rx={4}
              fill={project.massing.unbuilt ? 'rgba(15,92,92,0.18)' : '#0f5c5c'}
              stroke="#d9a94b"
              strokeWidth={project.massing.unbuilt ? 1 : 1.5}
              strokeDasharray={project.massing.unbuilt ? '4 3' : undefined}
            />
            <text
              x={cx}
              y={cy - (d * SCALE) / 2 - 5}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill="#0f2b2e"
              fontFamily="system-ui, sans-serif"
            >
              {project.name}
            </text>
          </a>
        );
      })}
    </svg>
  );
}
