/** Shared content types for the Naya Nazimabad site. */

export type ProjectStatus = 'delivered' | 'under-construction' | 'upcoming';

export type ProjectCategory = 'apartments' | 'mixed-use' | 'commercial';

export type LinkKind = 'brochure' | 'virtual-tour' | 'payment-plan' | 'floor-plan' | 'external';

export interface ProjectLink {
  label: string;
  href: string;
  kind: LinkKind;
}

/** Placement + massing used by the 3D masterplan (illustrative, not survey data). */
export interface ProjectMassing {
  /** [x, z] on the masterplan grid. */
  position: [number, number];
  /** [width, depth] footprint in masterplan units. */
  footprint: [number, number];
  /** Number of towers rendered inside the footprint. */
  towers: number;
  /** Storeys used to derive the rendered height. */
  floors: number;
  rotation?: number;
  /** Rendered as a hoarded, un-built plot. */
  unbuilt?: boolean;
}

export interface Project {
  slug: string;
  name: string;
  /** Short line that sits under the project title, e.g. "2 | 3 | 4 Bed Executive Apartments". */
  headline: string;
  category: ProjectCategory;
  status: ProjectStatus;
  /** Where the status comes from, so the claim is traceable. */
  statusNote: string;
  /** Block / district as published by Naya Nazimabad. */
  block: string;
  /** One-liner used on cards and in meta descriptions. */
  summary: string;
  /** Detail-page paragraphs, verbatim from nayanazimabad.com where marked. */
  description: string[];
  unitTypes: string[];
  /** Project features as published on the official project page. */
  features: string[];
  /** On-site amenities/recreation where the project publishes them separately. */
  amenityFeatures?: string[];
  highlights?: { title: string; body: string }[];
  links: ProjectLink[];
  /** Gallery slots. `null` means "client photo pending" and renders as a placeholder tile. */
  gallery: { caption: string; src: string | null }[];
  massing: ProjectMassing;
  /** Placed in the scene but has no published detail page section. */
  notes?: string[];
}

export type AmenityKind =
  | 'club'
  | 'masjid'
  | 'cricket'
  | 'football'
  | 'padel'
  | 'basketball'
  | 'hospital'
  | 'clinic'
  | 'school'
  | 'vocational'
  | 'riding'
  | 'banquet'
  | 'park';

export interface Amenity {
  id: string;
  name: string;
  kind: AmenityKind;
  /** Short description; `unspecified` where the official site publishes no detail. */
  description: string;
  /** True when nayanazimabad.com publishes no description for this facility. */
  detailUnspecified: boolean;
  block: string;
  /** [x, z] on the masterplan grid. */
  position: [number, number];
  /** [width, depth] footprint used for the 3D marker. */
  footprint: [number, number];
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  href: string;
  date?: string;
  summary: string;
}

export interface MasterplanDistrict {
  id: string;
  name: string;
  /** [x0, z0, x1, z1] */
  rect: [number, number, number, number];
  tint: string;
}
