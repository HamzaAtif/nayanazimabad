import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { ProjectCard } from '@/components/ProjectCard';
import { JsonLd } from '@/components/JsonLd';
import { StaticMasterplan } from '@/components/three/StaticMasterplan';
import { PROJECTS } from '@/data/projects';
import { absoluteUrl, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Projects',
  description:
    'Every Naya Nazimabad project: Peace Apartments, Globe Residency, Grace Tower, Signature Tower, Rahat Residency and Rahat Residency II, plus upcoming commercial inventory.',
  path: '/projects',
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Apartments, towers and commercial"
        lede="Six residential and mixed-use projects are published by Naya Nazimabad, with a commercial programme listed as upcoming. Use the 3D masterplan on the home page to see where each one sits."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/projects', label: 'Projects' },
        ]}
      />

      <section className="container-page mt-12 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <h2 className="text-lg font-semibold">Where everything sits</h2>
            <p className="mt-2 text-sm text-ink-soft">
              A schematic plan of the community. Block names follow the official site; positions are
              illustrative, not survey data.
            </p>
            <div className="mt-4 rounded-xl bg-sand-200 p-2">
              <StaticMasterplan className="h-auto w-full" />
            </div>
            <p className="mt-3 text-xs text-ink-soft">
              Tip: each labelled block on the plan links to that project.
            </p>
          </div>
        </aside>
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
