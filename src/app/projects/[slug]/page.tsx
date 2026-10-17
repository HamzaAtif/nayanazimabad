import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FeatureList } from '@/components/FeatureList';
import { JsonLd } from '@/components/JsonLd';
import { MapEmbed } from '@/components/MapEmbed';
import { PageHeader } from '@/components/PageHeader';
import { PlaceholderTile } from '@/components/PlaceholderTile';
import { ProjectElevation } from '@/components/ProjectElevation';
import { PROJECTS, getProject } from '@/data/projects';
import { SITE } from '@/data/site';
import { absoluteUrl, buildMetadata, projectJsonLd } from '@/lib/seo';
import type { ProjectStatus } from '@/types/content';

const STATUS_LABEL: Record<ProjectStatus, string> = {
  delivered: 'Delivered',
  'under-construction': 'Under construction',
  upcoming: 'Upcoming',
};

const LINK_LABEL: Record<string, string> = {
  brochure: 'Brochure',
  'virtual-tour': 'Virtual tour',
  'payment-plan': 'Payment plan',
  'floor-plan': 'Floor plan',
  external: 'Official page',
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: 'Project not found' };
  return buildMetadata({
    title: `${project.name} — ${project.headline}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const index = PROJECTS.findIndex((entry) => entry.slug === project.slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <>
      <PageHeader
        eyebrow={project.block}
        title={project.name}
        lede={project.headline}
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/projects', label: 'Projects' },
          { href: `/projects/${project.slug}`, label: project.name },
        ]}
      />

      <section className="container-page mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="overflow-hidden rounded-2xl border border-ink/10 bg-sand-200">
            <ProjectElevation project={project} className="h-auto w-full" />
          </div>

          <div className="mt-8 space-y-4">
            {project.description.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="prose-page">
                {paragraph}
              </p>
            ))}
          </div>

          {project.highlights?.length ? (
            <div className="mt-8 space-y-4">
              {project.highlights.map((highlight) => (
                <div key={highlight.title} className="rounded-2xl bg-sand-50 p-5">
                  <h2 className="text-lg font-semibold">{highlight.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{highlight.body}</p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-10 space-y-8">
            <FeatureList title="Features" items={project.features} />
            {project.amenityFeatures?.length ? (
              <FeatureList
                title="Amenities & recreation"
                items={project.amenityFeatures}
                accent="gold"
              />
            ) : null}
          </div>

          <section className="mt-10" aria-labelledby="gallery-heading">
            <h2 id="gallery-heading" className="text-lg font-semibold">
              Gallery
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              Slots for the client’s photography. Each tile captions the shot it is waiting for.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {project.gallery.map((image) => (
                <PlaceholderTile key={image.caption} caption={image.caption} />
              ))}
            </div>
          </section>

          {project.notes?.length ? (
            <div className="mt-8 rounded-2xl border border-gold-400/50 bg-gold-400/10 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-500">
                Notes
              </h2>
              <ul className="mt-2 space-y-2 text-sm text-ink-soft">
                {project.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <h2 className="text-lg font-semibold">At a glance</h2>
            <dl className="mt-4 divide-y divide-ink/10 text-sm">
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="text-ink-soft">Status</dt>
                <dd className="text-right font-medium">{STATUS_LABEL[project.status]}</dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="text-ink-soft">Location</dt>
                <dd className="text-right font-medium">{project.block}</dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="text-ink-soft">Configuration</dt>
                <dd className="text-right font-medium">{project.unitTypes.join(', ')}</dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="text-ink-soft">Towers</dt>
                <dd className="text-right font-medium">{project.massing.towers}</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-ink-soft">{project.statusNote}</p>
          </div>

          {project.links.length ? (
            <div className="card p-5">
              <h2 className="text-lg font-semibold">Downloads &amp; links</h2>
              <ul className="mt-3 space-y-2">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.kind === 'external' || link.kind === 'brochure' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm text-teal-700 hover:bg-teal-50"
                    >
                      <span>{link.label}</span>
                      <span className="chip shrink-0">{LINK_LABEL[link.kind] ?? 'Link'}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="card p-5">
            <h2 className="text-lg font-semibold">Enquire</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Availability and payment plans change. Confirm current inventory with the sales centre.
            </p>
            <a href={SITE.uanHref} className="btn-primary mt-4 w-full">
              {SITE.uan}
            </a>
            <Link href="/contact" className="btn-secondary mt-2 w-full">
              Send an enquiry
            </Link>
          </div>
        </aside>
      </section>

      <section className="container-page mt-16" aria-labelledby="location-heading">
        <h2 id="location-heading" className="text-2xl font-semibold">
          Location
        </h2>
        <p className="prose-page mt-2">
          {SITE.address}. Exact plot coordinates for {project.name} have not been published by the
          developer, so the map shows the community.
        </p>
        <div className="mt-6">
          <MapEmbed />
        </div>
      </section>

      <section className="container-page mt-16 mb-4">
        <Link
          href={`/projects/${next.slug}`}
          className="card flex items-center justify-between gap-4 p-6 transition-shadow hover:shadow-panel"
        >
          <span>
            <span className="eyebrow">Next project</span>
            <span className="mt-1 block text-lg font-semibold">{next.name}</span>
            <span className="text-sm text-ink-soft">{next.headline}</span>
          </span>
          <span aria-hidden="true" className="text-2xl text-teal-600">
            →
          </span>
        </Link>
      </section>

      <JsonLd data={projectJsonLd(project)} />
    </>
  );
}
