'use client';

import { Html } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import type * as THREE from 'three';
import type { Amenity } from '@/types/content';
import { createGrassTexture } from './textures';

const NIGHT_GRASS = '#1f3a2c';

/**
 * Low-poly stand-ins for the community facilities. They read as landmarks from
 * the aerial view without pretending to be architecture.
 */
export function AmenityMarker({
  amenity,
  night,
  showLabel,
}: {
  amenity: Amenity;
  night: boolean;
  showLabel: boolean;
}) {
  const [x, z] = amenity.position;
  const [w, d] = amenity.footprint;

  const grass = useMemo(() => {
    const texture = createGrassTexture(night);
    texture.repeat.set(Math.max(1, w / 18), Math.max(1, d / 18));
    return texture;
  }, [night, w, d]);

  useEffect(() => () => grass.dispose(), [grass]);

  const concrete = night ? '#3b4750' : '#cfc7b2';
  const wall = night ? '#5b6a72' : '#efe7d6';

  return (
    <group position={[x, 0, z]}>
      {/* Base plate keeps the marker legible against the block tint. */}
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color={concrete} roughness={0.95} />
      </mesh>

      <AmenityBody amenity={amenity} grass={grass} wall={wall} night={night} w={w} d={d} />

      {showLabel ? (
        <Html position={[0, 9, 0]} center zIndexRange={[20, 0]}>
          <span className="pointer-events-none whitespace-nowrap rounded-full bg-white/85 px-2 py-0.5 text-[11px] font-medium text-ink-soft shadow-sm">
            {amenity.name}
          </span>
        </Html>
      ) : null}
    </group>
  );
}

function AmenityBody({
  amenity,
  grass,
  wall,
  night,
  w,
  d,
}: {
  amenity: Amenity;
  grass: THREE.Texture;
  wall: string;
  night: boolean;
  w: number;
  d: number;
}) {
  const field = (
    <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[1, 40]} />
      <meshStandardMaterial map={grass} color={night ? NIGHT_GRASS : '#ffffff'} roughness={1} />
    </mesh>
  );

  switch (amenity.kind) {
    case 'cricket':
    case 'football':
      return (
        <group>
          <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[w / 2, d / 2, 1]}>
            <circleGeometry args={[1, 48]} />
            <meshStandardMaterial map={grass} color={night ? NIGHT_GRASS : '#ffffff'} roughness={1} />
          </mesh>
          {/* Pitch */}
          <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[w * 0.42, d * 0.6]} />
            <meshStandardMaterial
              color={amenity.kind === 'cricket' ? '#c9a86a' : '#5f9d5f'}
              roughness={0.95}
            />
          </mesh>
          {/* Stand */}
          <mesh position={[0, 1.6, -d * 0.42]} castShadow>
            <boxGeometry args={[w * 0.5, 3.2, 4]} />
            <meshStandardMaterial color={wall} roughness={0.85} />
          </mesh>
        </group>
      );

    case 'club':
      return (
        <group>
          <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[w / 2, d / 2, 1]}>
            <circleGeometry args={[1, 40]} />
            <meshStandardMaterial map={grass} color={night ? NIGHT_GRASS : '#ffffff'} roughness={1} />
          </mesh>
          {/* Clubhouse */}
          <mesh position={[-w * 0.18, 2.4, -d * 0.1]} castShadow>
            <boxGeometry args={[w * 0.46, 4.8, d * 0.42]} />
            <meshStandardMaterial color={wall} roughness={0.8} />
          </mesh>
          <mesh position={[-w * 0.18, 5.1, -d * 0.1]} castShadow>
            <coneGeometry args={[w * 0.36, 2.4, 4]} />
            <meshStandardMaterial color={night ? '#7a4a3c' : '#a4604a'} roughness={0.9} />
          </mesh>
          {/* Pool */}
          <mesh position={[w * 0.24, 0.16, d * 0.16]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[w * 0.3, d * 0.34]} />
            <meshStandardMaterial color="#2f8f9e" roughness={0.2} metalness={0.25} />
          </mesh>
        </group>
      );

    case 'masjid':
      return (
        <group>
          <mesh position={[0, 1.6, 0]} castShadow>
            <boxGeometry args={[w * 0.7, 3.2, d * 0.7]} />
            <meshStandardMaterial color={wall} roughness={0.85} />
          </mesh>
          <mesh position={[0, 4.4, 0]} castShadow>
            <sphereGeometry args={[w * 0.3, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={night ? '#c8b98a' : '#e6dcc0'} roughness={0.7} />
          </mesh>
          <mesh position={[w * 0.42, 4, -d * 0.36]} castShadow>
            <cylinderGeometry args={[1.1, 1.4, 8, 10]} />
            <meshStandardMaterial color={wall} roughness={0.85} />
          </mesh>
        </group>
      );

    case 'padel':
    case 'basketball':
      return (
        <group>
          <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[w * 0.78, d * 0.78]} />
            <meshStandardMaterial
              color={amenity.kind === 'padel' ? '#2f6f8f' : '#8a6b4a'}
              roughness={0.9}
            />
          </mesh>
          {/* Court enclosure */}
          <mesh position={[0, 1.4, 0]}>
            <boxGeometry args={[w * 0.82, 2.8, d * 0.82]} />
            <meshStandardMaterial
              color={night ? '#8fa4ad' : '#b9c3c7'}
              transparent
              opacity={0.28}
              roughness={0.5}
            />
          </mesh>
        </group>
      );

    case 'hospital':
    case 'clinic':
      return (
        <group>
          <mesh position={[0, 2.6, 0]} castShadow>
            <boxGeometry args={[w * 0.66, 5.2, d * 0.66]} />
            <meshStandardMaterial color="#f2f0ea" roughness={0.8} />
          </mesh>
          {/* Red cross on the roof reads from the aerial view. */}
          <mesh position={[0, 5.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[w * 0.34, w * 0.1]} />
            <meshBasicMaterial color="#c0392b" />
          </mesh>
          <mesh position={[0, 5.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[w * 0.1, d * 0.34]} />
            <meshBasicMaterial color="#c0392b" />
          </mesh>
        </group>
      );

    case 'school':
    case 'vocational':
      return (
        <group>
          <mesh position={[-w * 0.18, 2.2, 0]} castShadow>
            <boxGeometry args={[w * 0.4, 4.4, d * 0.55]} />
            <meshStandardMaterial color={wall} roughness={0.85} />
          </mesh>
          <mesh position={[w * 0.24, 1.6, d * 0.08]} castShadow>
            <boxGeometry args={[w * 0.34, 3.2, d * 0.4]} />
            <meshStandardMaterial color={night ? '#4d5c64' : '#e3dac6'} roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.1, -d * 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[w * 0.8, d * 0.24]} />
            <meshStandardMaterial map={grass} color={night ? NIGHT_GRASS : '#ffffff'} roughness={1} />
          </mesh>
        </group>
      );

    case 'riding':
      return (
        <group>
          <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[w / 2, d / 2, 1]}>
            <ringGeometry args={[0.62, 1, 40]} />
            <meshStandardMaterial color="#a9814f" roughness={1} />
          </mesh>
          <mesh position={[-w * 0.2, 1.8, -d * 0.2]} castShadow>
            <boxGeometry args={[w * 0.3, 3.6, d * 0.3]} />
            <meshStandardMaterial color={night ? '#6b5844' : '#b99b74'} roughness={0.9} />
          </mesh>
        </group>
      );

    case 'banquet':
      return (
        <group>
          <mesh position={[-w * 0.16, 2.8, 0]} castShadow>
            <boxGeometry args={[w * 0.52, 5.6, d * 0.6]} />
            <meshStandardMaterial color={wall} roughness={0.85} />
          </mesh>
          <mesh position={[w * 0.26, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[w * 0.36, d * 0.78]} />
            <meshStandardMaterial map={grass} color={night ? NIGHT_GRASS : '#ffffff'} roughness={1} />
          </mesh>
        </group>
      );

    case 'park':
    default:
      return (
        <group>
          {field}
          <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[w * 0.9, d * 0.9]} />
            <meshStandardMaterial map={grass} color={night ? NIGHT_GRASS : '#ffffff'} roughness={1} />
          </mesh>
        </group>
      );
  }
}
