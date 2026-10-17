'use client';

import { Html } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import type { Project } from '@/types/content';
import { createFacadeTexture } from './textures';

/** Rendered height of one storey in masterplan units (1 unit ≈ 6 m). */
export const STOREY_HEIGHT = 1.15;
const PODIUM_HEIGHT = 2.4;

export function towerHeight(project: Project): number {
  return PODIUM_HEIGHT + project.massing.floors * STOREY_HEIGHT;
}

/** Camera framing used when a project is selected in the masterplan. */
export function towerFocus(project: Project): {
  position: [number, number, number];
  target: [number, number, number];
} {
  const [x, z] = project.massing.position;
  const h = towerHeight(project);
  const span = Math.max(...project.massing.footprint);
  return {
    position: [x + span * 1.5, h * 0.85 + 16, z + span * 1.9 + 18],
    target: [x, h * 0.45, z],
  };
}

export interface TowerProps {
  project: Project;
  night: boolean;
  selected: boolean;
  showLabel: boolean;
  onSelect: (slug: string) => void;
  onHover: (slug: string | null) => void;
}

export function Tower({ project, night, selected, showLabel, onSelect, onHover }: TowerProps) {
  const { massing, slug, name } = project;
  const [x, z] = massing.position;
  const [w, d] = massing.footprint;
  const height = massing.floors * STOREY_HEIGHT;

  const facade = useMemo(
    () =>
      createFacadeTexture({
        floors: massing.floors,
        night,
        seed: slug.length + massing.floors,
      }),
    [massing.floors, night, slug],
  );

  useEffect(() => () => facade.dispose(), [facade]);

  const towers = Array.from({ length: massing.towers }, (_, i) => i);
  const slotWidth = w / massing.towers;
  const towerWidth = massing.towers > 1 ? slotWidth * 0.82 : w;

  const accent = selected ? '#d9a94b' : night ? '#7fd8cf' : '#0f5c5c';

  if (massing.unbuilt) {
    return (
      <group position={[x, 0, z]}>
        <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[w, d]} />
          <meshStandardMaterial
            color={night ? '#2c3b32' : '#cbbfa4'}
            roughness={0.95}
            transparent
            opacity={0.75}
          />
        </mesh>
        <mesh position={[0, 1.6, 0]}>
          <boxGeometry args={[w, 3.2, d]} />
          <meshStandardMaterial
            color={accent}
            transparent
            opacity={0.18}
            roughness={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
        {showLabel ? (
          <Html position={[0, 6.5, 0]} center zIndexRange={[30, 0]}>
            <button
              type="button"
              onClick={() => onSelect(slug)}
              className="whitespace-nowrap rounded-full border border-dashed border-teal-700/60 bg-white/90 px-3 py-1 text-xs font-semibold text-teal-700 shadow-sm hover:bg-white"
            >
              {name} — upcoming
            </button>
          </Html>
        ) : null}
      </group>
    );
  }

  return (
    <group position={[x, 0, z]} rotation={[0, massing.rotation ?? 0, 0]}>
      {/* Podium / parking decks */}
      <mesh position={[0, PODIUM_HEIGHT / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w + 3, PODIUM_HEIGHT, d + 3]} />
        <meshStandardMaterial color={night ? '#3a4a52' : '#d8cdb4'} roughness={0.9} />
      </mesh>

      {towers.map((index) => {
        const offset =
          massing.towers > 1 ? (index - (massing.towers - 1) / 2) * slotWidth : 0;
        return (
          <group key={index} position={[offset, 0, 0]}>
            <mesh
              position={[0, PODIUM_HEIGHT + height / 2, 0]}
              castShadow
              receiveShadow
              onClick={(event) => {
                event.stopPropagation();
                onSelect(slug);
              }}
              onPointerOver={(event) => {
                event.stopPropagation();
                onHover(slug);
              }}
              onPointerOut={() => onHover(null)}
            >
              <boxGeometry args={[towerWidth, height, d * 0.78]} />
              <meshStandardMaterial
                map={facade}
                emissiveMap={facade}
                emissive={new THREE.Color('#ffd79a')}
                emissiveIntensity={night ? 0.85 : 0.05}
                roughness={0.78}
                metalness={0.04}
              />
            </mesh>

            {/* Roof slab hides the window texture on the top face. */}
            <mesh position={[0, PODIUM_HEIGHT + height + 0.35, 0]} castShadow>
              <boxGeometry args={[towerWidth + 1.4, 0.7, d * 0.78 + 1.4]} />
              <meshStandardMaterial color={night ? '#243139' : '#c6bca5'} roughness={0.85} />
            </mesh>

            {/* Roof-top mast gives the taller towers a skyline silhouette. */}
            {massing.floors >= 16 ? (
              <mesh position={[0, PODIUM_HEIGHT + height + 3, 0]}>
                <cylinderGeometry args={[0.18, 0.18, 5, 6]} />
                <meshStandardMaterial color={night ? '#8fa4ad' : '#9aa7ad'} />
              </mesh>
            ) : null}
          </group>
        );
      })}

      {selected ? (
        <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[Math.max(w, d) * 0.72, Math.max(w, d) * 0.8, 56]} />
          <meshBasicMaterial color="#d9a94b" side={THREE.DoubleSide} transparent opacity={0.95} />
        </mesh>
      ) : null}

      {showLabel ? (
        <Html position={[0, PODIUM_HEIGHT + height + 8, 0]} center zIndexRange={[30, 0]}>
          <button
            type="button"
            onClick={() => onSelect(slug)}
            onMouseEnter={() => onHover(slug)}
            onMouseLeave={() => onHover(null)}
            aria-pressed={selected}
            className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold shadow-sm transition-colors ${
              selected
                ? 'border-gold-500 bg-gold-400 text-ink'
                : 'border-ink/10 bg-white/95 text-ink hover:border-teal-600 hover:text-teal-700'
            }`}
          >
            {name}
          </button>
        </Html>
      ) : null}
    </group>
  );
}
