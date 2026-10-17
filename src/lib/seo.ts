import type { Metadata } from 'next';
import { SITE } from '@/data/site';

export function absoluteUrl(path = '/'): string {
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Builds consistent, per-page metadata (title, description, Open Graph, Twitter). */
export function buildMetadata({
  title,
  description,
  path = '/',
  image,
  type = 'website',
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? absoluteUrl('/opengraph-image');

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: SITE.name,
      locale: 'en_PK',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

/** LocalBusiness + RealEstateListing JSON-LD for the site root. */
export function organisationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: SITE.legalName,
    url: SITE.url,
    telephone: SITE.uan,
    email: SITE.email,
    image: absoluteUrl('/opengraph-image'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Naya Nazimabad, Manghopir Road',
      addressLocality: 'Karachi',
      addressRegion: 'Sindh',
      addressCountry: 'PK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.coordinates.lat,
      longitude: SITE.coordinates.lng,
    },
    sameAs: [SITE.facebook, SITE.officialSite],
  };
}

/** Residence JSON-LD for a single project detail page. */
export function projectJsonLd(project: {
  slug: string;
  name: string;
  summary: string;
  headline: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Residence',
    name: `${SITE.name} — ${project.name}`,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.slug}`),
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'Configuration',
      value: project.headline,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Karachi',
      addressRegion: 'Sindh',
      addressCountry: 'PK',
    },
  };
}
