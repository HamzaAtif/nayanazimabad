'use client';

import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { MASTERPLAN } from '@/data/masterplan';
import { MasterplanScene, type OrbitRef } from './MasterplanScene';
import type { CameraTarget } from './CameraRig';

/**
 * WebGL canvas. Imported dynamically (ssr: false) by MasterplanExperience so the
 * three.js bundle never blocks first paint or the server render.
 */
export default function MasterplanCanvas({
  night,
  selected,
  showAmenities,
  showLabels,
  goal,
  reducedMotion,
  onSelect,
  onHover,
}: {
  night: boolean;
  selected: string | null;
  showAmenities: boolean;
  showLabels: boolean;
  goal: CameraTarget | null;
  reducedMotion: boolean;
  onSelect: (slug: string | null) => void;
  onHover: (slug: string | null) => void;
}) {
  const controlsRef = useRef<OrbitRef | null>(null);
  const start = MASTERPLAN.views[1] ?? MASTERPLAN.views[0];

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: start.position, fov: 42, near: 0.5, far: 1600 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      // Clicking empty space clears the selection.
      onPointerMissed={() => onSelect(null)}
      aria-hidden="true"
    >
      <MasterplanScene
        night={night}
        selected={selected}
        showAmenities={showAmenities}
        showLabels={showLabels}
        goal={goal}
        controlsRef={controlsRef}
        reducedMotion={reducedMotion}
        onSelect={onSelect}
        onHover={onHover}
      />
    </Canvas>
  );
}
