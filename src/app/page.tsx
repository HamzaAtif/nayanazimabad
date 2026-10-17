import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { ProjectCard } from '@/components/ProjectCard';
import { MasterplanExperience } from '@/components/three/MasterplanExperience';
import { AMENITIES } from '@/data/amenities';
import { ACTIVE_PROJECTS, PROJECTS } from '@/data/projects';
import { SITE } from '@/data/site';
import { absoluteUrl, buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <div className="container-page pt-6">
        <MasterplanExperience />
      </div>

      {/* Server-rendered content: SEO + a plain-language version of the masterplan. */}
      <section className="container-page mt-16 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="eyebrow">A piece of heaven on earth</p>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
            A city within a city, on Manghopir Road
          </h2>
          <p className="prose-page mt-4">
            Naya Nazimabad is a city especially envisioned keeping the progressive middle class in
            mind; built up on the idea of providing lifestyle along the lines of peaceful community
            living. It is the inception of a thought that a house should be a home of serenity,
            respite and repose.
          </p>
          <p className="prose-page mt-4">
            Spread across {SITE.area} around Manghopir Lake, the gated community combines apartment
            towers, bungalow plots, a business enclave and more than a dozen amenities — from the
            Gymkhana and the flagship cricket stadium to schools, clinics and neighbourhood mosques.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/about" className="btn-primary">
              About the community
            </Link>
            <Link href="/amenities" className="btn-secondary">
              Explore amenities
            </Link>
          </div>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          {[
            { label: 'Area', value: SITE.area },
            { label: 'Location', value: 'Manghopir Road, Karachi' },
            { label: 'Projects', value: `${PROJECTS.length} listed` },
            { label: 'Amenities', value: `${AMENITIES.length} facilities` },
          ].map((stat) => (
            <div key={stat.label} className="card p-5">
              <dt className="text-xs uppercase tracking-wider text-ink-soft">{stat.label}</dt>
              <dd className="mt-1 font-display text-2xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-page mt-20" aria-labelledby="featured-projects">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Projects</p>
            <h2 id="featured-projects" className="mt-2 text-3xl font-semibold">
              Apartments and towers
            </h2>
          </div>
          <Link href="/projects" className="text-sm font-semibold text-teal-700 hover:underline">
            All projects →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACTIVE_PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="container-page mt-20" aria-labelledby="amenities-summary">
        <p className="eyebrow">Amenities</p>
        <h2 id="amenities-summary" className="mt-2 text-3xl font-semibold">
          Everything within the gate
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {AMENITIES.map((amenity) => (
            <li key={amenity.id} className="chip">
              {amenity.name}
            </li>
          ))}
        </ul>
        <Link href="/amenities" className="btn-secondary mt-6">
          See all amenities
        </Link>
      </section>

      <section className="container-page mt-20">
        <div className="rounded-3xl bg-teal-600 p-8 text-sand-100 sm:p-12">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Talk to the sales team</h2>
          <p className="mt-3 max-w-2xl text-teal-50">
            Call the UAN, email us, or send an enquiry and we will get back to you with current
            availability and payment plans.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={SITE.uanHref} className="btn bg-white text-teal-700 hover:bg-teal-50">
              {SITE.uan}
            </a>
            <a href={`mailto:${SITE.email}`} className="btn border border-white/50 text-white hover:bg-white/10">
              {SITE.email}
            </a>
            <Link href="/contact" className="btn border border-white/50 text-white hover:bg-white/10">
              Contact form
            </Link>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Naya Nazimabad projects',
          itemListElement: PROJECTS.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: project.name,
            url: absoluteUrl(`/projects/${project.slug}`),
          })),
        }}
      />
    </>
  );
}
