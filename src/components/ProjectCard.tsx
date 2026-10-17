import Link from 'next/link';
import type { ProjectStatus } from '@/types/content';
import type { Project } from '@/types/content';
import { ProjectElevation } from './ProjectElevation';

const STATUS_LABEL: Record<ProjectStatus, string> = {
  delivered: 'Delivered',
  'under-construction': 'Under construction',
  upcoming: 'Upcoming',
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card group overflow-hidden transition-shadow hover:shadow-panel">
      <div className="aspect-[16/9] w-full overflow-hidden bg-sand-200">
        <ProjectElevation
          project={project}
          className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="chip">{STATUS_LABEL[project.status]}</span>
          <span className="chip">{project.block}</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold">
          <Link href={`/projects/${project.slug}`} className="rounded hover:text-teal-700">
            {project.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-teal-600">{project.headline}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{project.summary}</p>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:gap-2.5"
        >
          View project
          <span aria-hidden="true">→</span>
          <span className="sr-only"> {project.name}</span>
        </Link>
      </div>
    </article>
  );
}
