import { NextResponse } from 'next/server';
import { PROJECTS } from '@/data/projects';
import { AMENITIES } from '@/data/amenities';

export const dynamic = 'force-static';

/** Read-only JSON API over the same content the pages render. */
export function GET() {
  return NextResponse.json(
    {
      count: PROJECTS.length,
      projects: PROJECTS.map((project) => ({
        slug: project.slug,
        name: project.name,
        headline: project.headline,
        category: project.category,
        status: project.status,
        block: project.block,
        summary: project.summary,
        unitTypes: project.unitTypes,
        features: project.features,
        amenityFeatures: project.amenityFeatures ?? [],
        links: project.links,
        url: `/projects/${project.slug}`,
      })),
      amenities: AMENITIES.map(({ id, name, kind, block, description }) => ({
        id,
        name,
        kind,
        block,
        description,
      })),
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      },
    },
  );
}
