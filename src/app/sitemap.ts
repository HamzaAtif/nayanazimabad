import type { MetadataRoute } from 'next';
import { AMENITIES } from '@/data/amenities';
import { PROJECTS } from '@/data/projects';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-09-12');

  const routes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/projects'), lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/amenities'), lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/about'), lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/media'), lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/contact'), lastModified, changeFrequency: 'yearly', priority: 0.8 },
    { url: absoluteUrl('/privacy'), lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const projects: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Amenities live on one page, so expose the anchors as separate entries.
  const amenities: MetadataRoute.Sitemap = AMENITIES.map((amenity) => ({
    url: absoluteUrl(`/amenities#${amenity.id}`),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }));

  return [...routes, ...projects, ...amenities];
}
