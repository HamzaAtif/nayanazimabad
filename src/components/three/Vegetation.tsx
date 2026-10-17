'use client';

import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { ProceduralBuilding, ProceduralTree } from '@/data/masterplan';

function useInstanceMatrices(
  meshRef: React.RefObject<THREE.InstancedMesh>,
  apply: (dummy: THREE.Object3D, index: number, color?: THREE.Color) => void,
  count: number,
) {
  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    for (let i = 0; i < count; i += 1) {
      apply(dummy, i, color);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      if (color) mesh.setColorAt(i, color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [apply, count, meshRef]);
}

/** Instanced low-rise housing — hundreds of homes in three draw calls. */
export function Bungalows({ items, night }: { items: ProceduralBuilding[]; night: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ roughness: 0.9, metalness: 0 }),
    [],
  );

  const apply = useMemo(
    () => (dummy: THREE.Object3D, index: number, color?: THREE.Color) => {
      const item = items[index];
      dummy.position.set(item.position[0], item.height / 2, item.position[1]);
      dummy.scale.set(item.size[0], item.height, item.size[1]);
      if (color) {
        if (night) color.setHSL(0.08 + item.tone * 0.05, 0.18, 0.24 + item.tone * 0.12);
        else color.setHSL(0.09 + item.tone * 0.04, 0.3, 0.72 - item.tone * 0.12);
      }
    },
    [items, night],
  );

  useInstanceMatrices(meshRef, apply, items.length);

  useLayoutEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, items.length]}
      castShadow
      receiveShadow
    />
  );
}

/** Instanced street + lakeside planting. */
export function Trees({ items, night }: { items: ProceduralTree[]; night: boolean }) {
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const canopyRef = useRef<THREE.InstancedMesh>(null);

  const trunkGeometry = useMemo(() => new THREE.CylinderGeometry(0.28, 0.36, 3, 5), []);
  const trunkMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: night ? '#3b3128' : '#6b5340', roughness: 1 }),
    [night],
  );
  const canopyGeometry = useMemo(() => new THREE.ConeGeometry(2.1, 5.4, 7), []);
  const canopyMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: night ? '#1f3a2c' : '#4f8b58', roughness: 1 }),
    [night],
  );

  const applyTrunk = useMemo(
    () => (dummy: THREE.Object3D, index: number) => {
      const item = items[index];
      dummy.position.set(item.position[0], 1.5 * item.scale, item.position[1]);
      dummy.scale.setScalar(item.scale);
      dummy.rotation.set(0, (index % 7) * 0.4, 0);
    },
    [items],
  );

  const applyCanopy = useMemo(
    () => (dummy: THREE.Object3D, index: number) => {
      const item = items[index];
      dummy.position.set(item.position[0], (1.5 + 2.7) * item.scale, item.position[1]);
      dummy.scale.setScalar(item.scale);
      dummy.rotation.set(0, (index % 5) * 0.5, 0);
    },
    [items],
  );

  useInstanceMatrices(trunkRef, applyTrunk, items.length);
  useInstanceMatrices(canopyRef, applyCanopy, items.length);

  useLayoutEffect(
    () => () => {
      trunkGeometry.dispose();
      trunkMaterial.dispose();
      canopyGeometry.dispose();
      canopyMaterial.dispose();
    },
    [trunkGeometry, trunkMaterial, canopyGeometry, canopyMaterial],
  );

  return (
    <group>
      <instancedMesh
        ref={trunkRef}
        args={[trunkGeometry, trunkMaterial, items.length]}
        castShadow
      />
      <instancedMesh
        ref={canopyRef}
        args={[canopyGeometry, canopyMaterial, items.length]}
        castShadow
      />
    </group>
  );
}
