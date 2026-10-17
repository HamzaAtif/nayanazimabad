'use client';

import { OrbitControls } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import { AMENITIES } from '@/data/amenities';
import { generateBungalows, generateTrees } from '@/data/masterplan';
import { PROJECTS } from '@/data/projects';
import type { Amenity, Project } from '@/types/content';
import { AmenityMarker } from './AmenityMarker';
import { CameraRig, type CameraTarget } from './CameraRig';
import { SiteGround } from './SiteGround';
import { Tower } from './Tower';
import { Bungalows, Trees } from './Vegetation';

export type OrbitRef = React.ComponentRef<typeof OrbitControls>;

export interface MasterplanSceneProps {
  night: boolean;
  selected: string | null;
  showAmenities: boolean;
  showLabels: boolean;
  goal: CameraTarget | null;
  controlsRef: React.MutableRefObject<OrbitRef | null>;
  reducedMotion: boolean;
  onSelect: (slug: string | null) => void;
  onHover: (slug: string | null) => void;
}

export function MasterplanScene({
  night,
  selected,
  showAmenities,
  showLabels,
  goal,
  controlsRef,
  reducedMotion,
  onSelect,
  onHover,
}: MasterplanSceneProps) {
  const projects: Project[] = PROJECTS;
  const amenities: Amenity[] = AMENITIES;

  // Keep procedural housing clear of the named plots.
  const bungalows = useMemo(
    () =>
      generateBungalows([
        ...projects.map((p) => ({ position: p.massing.position, footprint: p.massing.footprint })),
        ...amenities.map((a) => ({ position: a.position, footprint: a.footprint })),
      ]),
    [projects, amenities],
  );

  const trees = useMemo(() => generateTrees(), []);

  // Pointer feedback for hoverable towers.
  useEffect(() => {
    document.body.style.cursor = selected ? 'grab' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [selected]);

  const sky = night ? '#0a1a24' : '#cfe3e8';

  return (
    <>
      <color attach="background" args={[sky]} />
      <fog attach="fog" args={[sky, 320, 900]} />

      <hemisphereLight
        intensity={night ? 0.28 : 0.85}
        color={night ? '#2b4a63' : '#ffffff'}
        groundColor={night ? '#101d22' : '#c8bfa4'}
      />
      <ambientLight intensity={night ? 0.18 : 0.3} />
      <directionalLight
        position={night ? [-90, 120, 80] : [130, 175, 95]}
        intensity={night ? 0.35 : 1.45}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-camera-near={1}
        shadow-camera-far={600}
        shadow-camera-left={-190}
        shadow-camera-right={190}
        shadow-camera-top={190}
        shadow-camera-bottom={-190}
      />
      {/* Cool bounce light so north-facing façades are not flat black. */}
      <directionalLight
        position={[-120, 60, -110]}
        intensity={night ? 0.12 : 0.35}
        color={night ? '#4d7fa8' : '#dceeff'}
      />

      <SiteGround night={night} />
      <Bungalows items={bungalows} night={night} />
      <Trees items={trees} night={night} />

      {showAmenities
        ? amenities.map((amenity) => (
            <AmenityMarker
              key={amenity.id}
              amenity={amenity}
              night={night}
              showLabel={showLabels}
            />
          ))
        : null}

      {projects.map((project) => (
        <Tower
          key={project.slug}
          project={project}
          night={night}
          selected={selected === project.slug}
          showLabel={showLabels}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}

      <CameraRig
        goal={goal}
        controlsRef={controlsRef}
        reducedMotion={reducedMotion}
      />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan
        enableDamping
        dampingFactor={0.08}
        minDistance={28}
        maxDistance={460}
        maxPolarAngle={Math.PI * 0.485}
        autoRotate={!selected && !reducedMotion}
        autoRotateSpeed={0.22}
        target={[0, 0, -20]}
      />
    </>
  );
}
