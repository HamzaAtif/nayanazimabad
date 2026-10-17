'use client';

import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type OrbitRef = React.ComponentRef<typeof OrbitControls>;

export interface CameraTarget {
  position: [number, number, number];
  target: [number, number, number];
}

/**
 * Smoothly flies the camera to a target whenever the selected project or the
 * chosen bookmark changes. Motion is skipped when the user prefers reduced
 * motion (WCAG 2.3.3) — the camera simply cuts to the new framing.
 */
export function CameraRig({
  goal,
  controlsRef,
  reducedMotion,
  onSettled,
}: {
  goal: CameraTarget | null;
  controlsRef: React.MutableRefObject<OrbitRef | null>;
  reducedMotion: boolean;
  onSettled?: () => void;
}) {
  const { camera } = useThree();
  const desired = useRef<{ position: THREE.Vector3; target: THREE.Vector3 } | null>(null);

  useEffect(() => {
    if (!goal) return;
    desired.current = {
      position: new THREE.Vector3(...goal.position),
      target: new THREE.Vector3(...goal.target),
    };
  }, [goal]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!desired.current || !controls) return;

    if (reducedMotion) {
      camera.position.copy(desired.current.position);
      controls.target.copy(desired.current.target);
      controls.update();
      desired.current = null;
      onSettled?.();
      return;
    }

    // Exponential smoothing that is stable across frame rates.
    const k = 1 - Math.pow(0.0025, Math.min(delta, 0.1));
    camera.position.lerp(desired.current.position, k);
    controls.target.lerp(desired.current.target, k);
    controls.update();

    if (camera.position.distanceTo(desired.current.position) < 0.4) {
      camera.position.copy(desired.current.position);
      controls.target.copy(desired.current.target);
      controls.update();
      desired.current = null;
      onSettled?.();
    }
  });

  return null;
}
