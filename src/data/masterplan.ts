import type { MasterplanDistrict } from '@/types/content';

/**
 * Illustrative masterplan layout used by the 3D scene and the static SVG map.
 *
 * IMPORTANT: this is a *schematic* site plan — block names match the official
 * community (Blocks A–F, Business Enclave) but positions are laid out for
 * legibility, not taken from a survey. Never present it as a legal plot plan.
 */
export const MASTERPLAN = {
  /** Half-extents of the ground plane in scene units (1 unit ≈ 6 m). */
  bounds: { x: 128, z: 150 },
  /** Manghopir Lake sits along the northern edge of the community. */
  lake: { center: [-55, -118] as [number, number], rx: 62, rz: 19 },
  /** Boulevards drawn between block rows/columns. */
  roads: {
    verticals: [-32.5, 40],
    horizontals: [-32.5, 27.5],
    ringInset: 10,
  },
  /** Camera bookmarks for the “jump to view” buttons. */
  views: [
    { id: 'aerial', label: 'Aerial', position: [0, 190, 165] as [number, number, number], target: [0, 0, -10] as [number, number, number] },
    { id: 'overview', label: 'Overview', position: [120, 95, 150] as [number, number, number], target: [-10, 0, -20] as [number, number, number] },
    { id: 'block-a', label: 'Block A', position: [-70, 45, -5] as [number, number, number], target: [-75, 12, -55] as [number, number, number] },
    { id: 'business-enclave', label: 'Business Enclave', position: [10, 30, 60] as [number, number, number], target: [8, 4, -8] as [number, number, number] },
    { id: 'street', label: 'Street level', position: [15, 7, 45] as [number, number, number], target: [-6, 6, -14] as [number, number, number] },
  ],
} as const;

/**
 * Block grid. Rect is [x0, z0, x1, z1].
 * Zones that are not named blocks on the official site are labelled
 * “Bungalow zone” / “Block D south” so the plan stays readable.
 */
export const DISTRICTS: MasterplanDistrict[] = [
  { id: 'block-a', name: 'Block A', rect: [-115, -90, -35, -35], tint: '#e7dfca' },
  { id: 'block-b', name: 'Block B', rect: [-30, -90, 35, -35], tint: '#ece4d0' },
  { id: 'block-c', name: 'Block C', rect: [45, -90, 115, -35], tint: '#eae1cb' },
  { id: 'business-enclave', name: 'Business Enclave', rect: [-30, -30, 35, 25], tint: '#e4dcc4' },
  { id: 'block-d', name: 'Block D', rect: [45, -30, 115, 25], tint: '#ece4d0' },
  { id: 'block-f', name: 'Block F', rect: [-115, -30, -35, 25], tint: '#e7dfca' },
  { id: 'bungalow-west', name: 'Bungalow zone (west)', rect: [-115, 30, -35, 95], tint: '#eee7d4' },
  { id: 'block-e', name: 'Block E', rect: [-30, 30, 35, 95], tint: '#ece4d0' },
  { id: 'block-d-south', name: 'Block D south', rect: [45, 30, 115, 95], tint: '#eae1cb' },
];

/** Deterministic PRNG so the procedural city is identical on every render. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function random() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface ProceduralBuilding {
  position: [number, number];
  size: [number, number];
  height: number;
  tone: number;
}

/**
 * Scatters low-rise bungalows inside every district, skipping the footprints of
 * named projects and amenities so nothing intersects.
 */
export function generateBungalows(
  exclusions: { position: [number, number]; footprint: [number, number]; pad?: number }[],
  perDistrict = 34,
  seed = 20260912,
): ProceduralBuilding[] {
  const random = mulberry32(seed);
  const out: ProceduralBuilding[] = [];

  for (const district of DISTRICTS) {
    const [x0, z0, x1, z1] = district.rect;
    let placed = 0;
    let attempts = 0;
    while (placed < perDistrict && attempts < perDistrict * 12) {
      attempts += 1;
      const w = 6 + random() * 7;
      const d = 6 + random() * 7;
      const x = x0 + 6 + random() * (x1 - x0 - 12 - w);
      const z = z0 + 6 + random() * (z1 - z0 - 12 - d);
      const cx = x + w / 2;
      const cz = z + d / 2;

      const blocked = exclusions.some(({ position, footprint, pad = 6 }) => {
        const [px, pz] = position;
        const [pw, pd] = footprint;
        return (
          Math.abs(cx - px) < (pw + pad) / 2 + w / 2 && Math.abs(cz - pz) < (pd + pad) / 2 + d / 2
        );
      });
      if (blocked) continue;

      // Keep the lake shoreline clear.
      const lakeDx = (cx - MASTERPLAN.lake.center[0]) / MASTERPLAN.lake.rx;
      const lakeDz = (cz - MASTERPLAN.lake.center[1]) / MASTERPLAN.lake.rz;
      if (lakeDx * lakeDx + lakeDz * lakeDz < 1.15) continue;

      out.push({
        position: [cx, cz],
        size: [w, d],
        height: 4 + random() * 5,
        tone: random(),
      });
      placed += 1;
    }
  }

  return out;
}

export interface ProceduralTree {
  position: [number, number];
  scale: number;
}

/** Trees along boulevards and around the lake. */
export function generateTrees(seed = 7717): ProceduralTree[] {
  const random = mulberry32(seed);
  const trees: ProceduralTree[] = [];
  const push = (x: number, z: number) =>
    trees.push({ position: [x, z], scale: 0.8 + random() * 0.9 });

  // Boulevard planting: two rows either side of every road.
  for (const vx of MASTERPLAN.roads.verticals) {
    for (let z = -95; z <= 100; z += 11) {
      push(vx - 4.5 + random() * 2, z + random() * 3);
      push(vx + 4.5 - random() * 2, z + random() * 3);
    }
  }
  for (const hz of MASTERPLAN.roads.horizontals) {
    for (let x = -118; x <= 118; x += 11) {
      push(x + random() * 3, hz - 4.5 + random() * 2);
      push(x + random() * 3, hz + 4.5 - random() * 2);
    }
  }

  // Lake shoreline planting.
  for (let i = 0; i < 90; i += 1) {
    const angle = random() * Math.PI * 2;
    const r = 1.02 + random() * 0.22;
    push(
      MASTERPLAN.lake.center[0] + Math.cos(angle) * MASTERPLAN.lake.rx * r,
      MASTERPLAN.lake.center[1] + Math.sin(angle) * MASTERPLAN.lake.rz * r,
    );
  }

  return trees;
}
