'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MASTERPLAN } from '@/data/masterplan';
import { PROJECTS, getProject } from '@/data/projects';
import { SITE } from '@/data/site';
import type { ProjectStatus } from '@/types/content';
import type { CameraTarget } from './CameraRig';
import { StaticMasterplan } from './StaticMasterplan';
import { towerFocus } from './Tower';

const MasterplanCanvas = dynamic(() => import('./MasterplanCanvas'), {
  ssr: false,
  loading: () => <SceneLoading label="Loading the masterplan…" />,
});

const STATUS_LABEL: Record<ProjectStatus, string> = {
  delivered: 'Delivered',
  'under-construction': 'Under construction',
  upcoming: 'Upcoming',
};

/**
 * If the WebGL scene fails for any reason (driver blocklist, context loss,
 * shader compile error) we fall back to the 2D plan rather than showing a
 * blank rectangle.
 */
class SceneErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Masterplan scene failed, falling back to the 2D plan', error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function PlanFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-sand-200 p-3">
      <StaticMasterplan className="h-full w-full max-w-3xl" />
    </div>
  );
}

function SceneLoading({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-teal-900">
      <div className="flex flex-col items-center gap-3 text-teal-100">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-teal-100/30 border-t-teal-100" />
        <p className="text-sm">{label}</p>
      </div>
    </div>
  );
}

export function MasterplanExperience() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [night, setNight] = useState(false);
  const [showAmenities, setShowAmenities] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [view, setView] = useState<string>('overview');
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Feature-detect WebGL once on mount so non-WebGL clients get the 2D plan.
    try {
      const canvas = document.createElement('canvas');
      const ok = Boolean(
        window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')),
      );
      setWebgl(ok);
    } catch {
      setWebgl(false);
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const onMotionChange = () => setReducedMotion(motionQuery.matches);
    motionQuery.addEventListener('change', onMotionChange);
    return () => motionQuery.removeEventListener('change', onMotionChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const select = useCallback((slug: string | null) => {
    setSelected(slug);
    setHovered(null);
  }, []);

  const goal = useMemo<CameraTarget | null>(() => {
    if (selected) {
      const project = getProject(selected);
      return project ? towerFocus(project) : null;
    }
    const preset = MASTERPLAN.views.find((entry) => entry.id === view);
    return preset ? { position: preset.position, target: preset.target } : null;
  }, [selected, view]);

  const activeProject = selected ? getProject(selected) : undefined;
  const hoveredProject = hovered ? getProject(hovered) : undefined;

  return (
    <section
      aria-labelledby="masterplan-heading"
      className="relative isolate h-[76vh] min-h-[540px] w-full overflow-hidden rounded-3xl border border-ink/10 bg-teal-900 shadow-panel"
    >
      {/* Layer 1 — the scene (or its fallback). */}
      <div className="absolute inset-0">
        {webgl === null ? (
          <SceneLoading label="Preparing the masterplan…" />
        ) : webgl ? (
          <SceneErrorBoundary fallback={<PlanFallback />}>
            <MasterplanCanvas
              night={night}
              selected={selected}
              showAmenities={showAmenities}
              showLabels={showLabels}
              goal={goal}
              reducedMotion={reducedMotion}
              onSelect={select}
              onHover={setHovered}
            />
          </SceneErrorBoundary>
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-sand-200 p-3">
            <StaticMasterplan className="h-full w-full max-w-3xl" />
          </div>
        )}
      </div>

      <noscript>
        <div className="absolute inset-0 bg-sand-200 p-3">
          <StaticMasterplan className="h-full w-full" />
        </div>
      </noscript>

      {/* Layer 2 — HUD. The wrapper is click-through; panels opt back in. */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="pointer-events-auto max-w-md rounded-2xl bg-sand-100/95 p-5 shadow-card backdrop-blur">
            <p className="eyebrow">Interactive masterplan</p>
            <h1 id="masterplan-heading" className="mt-1 text-3xl font-semibold sm:text-4xl">
              Naya Nazimabad
            </h1>
            <p className="mt-1 text-sm text-ink-soft">
              {SITE.area} · Manghopir Road, Karachi · {SITE.tagline}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/projects" className="btn-primary">
                Browse projects
              </Link>
              <a href={SITE.uanHref} className="btn-secondary">
                {SITE.uan}
              </a>
            </div>
          </div>

          {/* Selected project card */}
          {activeProject ? (
            <div className="pointer-events-auto hidden w-80 animate-fade-up rounded-2xl bg-sand-100/96 p-5 shadow-card backdrop-blur md:block">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold leading-snug">{activeProject.name}</h2>
                  <p className="mt-0.5 text-xs text-ink-soft">{activeProject.headline}</p>
                </div>
                <button
                  type="button"
                  onClick={() => select(null)}
                  className="rounded-full p-1 text-ink-soft hover:bg-sand-200"
                >
                  <span className="sr-only">Clear selection</span>
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              </div>
              <p className="mt-3 text-sm text-ink-soft">{activeProject.summary}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                <li className="chip">{STATUS_LABEL[activeProject.status]}</li>
                <li className="chip">{activeProject.block}</li>
              </ul>
              <Link href={`/projects/${activeProject.slug}`} className="btn-primary mt-4 w-full">
                View project details
              </Link>
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap items-end justify-between gap-3">
          {/* View bookmarks + accessible project selector */}
          <div className="pointer-events-auto max-w-full rounded-2xl bg-sand-100/95 p-3 shadow-card backdrop-blur">
            <div className="flex flex-wrap items-center gap-1.5">
              {MASTERPLAN.views.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setSelected(null);
                    setView(preset.id);
                  }}
                  aria-pressed={!selected && view === preset.id}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    !selected && view === preset.id
                      ? 'bg-teal-600 text-white'
                      : 'text-ink-soft hover:bg-teal-50 hover:text-teal-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="mt-2 border-t border-ink/10 pt-2">
              <p className="px-1 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                Jump to project
              </p>
              <ul className="mt-1.5 flex max-w-[70vw] flex-wrap gap-1.5 overflow-x-auto pb-1 sm:max-w-md">
                {PROJECTS.map((project) => (
                  <li key={project.slug}>
                    <button
                      type="button"
                      onClick={() => select(selected === project.slug ? null : project.slug)}
                      aria-pressed={selected === project.slug}
                      className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                        selected === project.slug
                          ? 'border-gold-500 bg-gold-400 text-ink'
                          : 'border-ink/15 bg-white text-ink-soft hover:border-teal-600 hover:text-teal-700'
                      }`}
                    >
                      {project.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Layer toggles + hint */}
          <div className="pointer-events-auto flex flex-col items-end gap-2">
            <div className="flex flex-wrap justify-end gap-1.5 rounded-2xl bg-sand-100/95 p-2 shadow-card backdrop-blur">
              <ToggleButton active={showAmenities} onClick={() => setShowAmenities((v) => !v)}>
                Amenities
              </ToggleButton>
              <ToggleButton active={showLabels} onClick={() => setShowLabels((v) => !v)}>
                Labels
              </ToggleButton>
              <ToggleButton active={night} onClick={() => setNight((v) => !v)}>
                {night ? 'Night' : 'Day'}
              </ToggleButton>
            </div>
            <p className="hidden max-w-[16rem] rounded-xl bg-ink/80 px-3 py-2 text-right text-[11px] leading-snug text-sand-100 sm:block">
              {hoveredProject
                ? `${hoveredProject.name} — click to focus`
                : 'Drag to orbit · scroll to zoom · click a tower for details'}
              <br />
              Schematic plan, not a survey.
            </p>
          </div>
        </div>

        {/* Mobile sheet for the selected project */}
        {activeProject ? (
          <div className="pointer-events-auto animate-fade-up rounded-2xl bg-sand-100/97 p-4 shadow-card backdrop-blur md:hidden">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold leading-snug">{activeProject.name}</h2>
                <p className="text-xs text-ink-soft">{activeProject.headline}</p>
              </div>
              <button
                type="button"
                onClick={() => select(null)}
                className="rounded-full p-1 text-ink-soft hover:bg-sand-200"
              >
                <span className="sr-only">Clear selection</span>
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <Link href={`/projects/${activeProject.slug}`} className="btn-primary mt-3 w-full">
              View project details
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
        active ? 'bg-teal-600 text-white' : 'text-ink-soft hover:bg-teal-50 hover:text-teal-700'
      }`}
    >
      {children}
    </button>
  );
}
