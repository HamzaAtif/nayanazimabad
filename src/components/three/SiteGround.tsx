'use client';

import { useEffect, useMemo } from 'react';
import { DISTRICTS, MASTERPLAN, mulberry32 } from '@/data/masterplan';
import { createRoadTexture } from './textures';

/** Extent of the built-up area (used for the ring road), slightly inside the ground plane. */
const SITE = { x: 122, z0: -98, z1: 102 };

function useParks() {
  return useMemo(() => {
    const random = mulberry32(99887);
    return DISTRICTS.flatMap((district) => {
      const [x0, z0, x1, z1] = district.rect;
      const count = 1 + (random() > 0.5 ? 1 : 0);
      return Array.from({ length: count }, () => {
        const w = 16 + random() * 16;
        const d = 12 + random() * 12;
        return {
          position: [x0 + 10 + random() * (x1 - x0 - 20 - w), z0 + 10 + random() * (z1 - z0 - 20 - d)] as [
            number,
            number,
          ],
          size: [w, d] as [number, number],
        };
      });
    });
  }, []);
}

/**
 * Ground, block tints, boulevards, ring road, parks and Manghopir Lake.
 * Everything is flat geometry + canvas textures: no external assets.
 */
export function SiteGround({ night }: { night: boolean }) {
  const road = useMemo(() => {
    const texture = createRoadTexture();
    texture.repeat.set(1, 26);
    return texture;
  }, []);
  useEffect(() => () => road.dispose(), [road]);

  const parks = useParks();
  const groundColor = night ? '#26332f' : '#d8cfb6';
  const grassColor = night ? '#22402f' : '#6f9c62';

  return (
    <group>
      {/* Desert base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[MASTERPLAN.bounds.x * 2 + 140, MASTERPLAN.bounds.z * 2 + 160]} />
        <meshStandardMaterial color={groundColor} roughness={1} />
      </mesh>

      {/* Block tints */}
      {DISTRICTS.map((district) => {
        const [x0, z0, x1, z1] = district.rect;
        return (
          <mesh
            key={district.id}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[(x0 + x1) / 2, 0.02, (z0 + z1) / 2]}
            receiveShadow
          >
            <planeGeometry args={[x1 - x0, z1 - z0]} />
            <meshStandardMaterial color={night ? '#25313a' : district.tint} roughness={1} />
          </mesh>
        );
      })}

      {/* Boulevards */}
      {MASTERPLAN.roads.verticals.map((x) => (
        <mesh key={`v-${x}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.04, 0]} receiveShadow>
          <planeGeometry args={[9, MASTERPLAN.bounds.z * 2 - 40]} />
          <meshStandardMaterial map={road} color={night ? '#8d9498' : '#ffffff'} roughness={0.95} />
        </mesh>
      ))}
      {MASTERPLAN.roads.horizontals.map((z) => (
        <mesh key={`h-${z}`} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, 0.04, z]} receiveShadow>
          <planeGeometry args={[9, MASTERPLAN.bounds.x * 2 - 20]} />
          <meshStandardMaterial map={road} color={night ? '#8d9498' : '#ffffff'} roughness={0.95} />
        </mesh>
      ))}

      {/* Ring road */}
      {[
        { position: [0, 0.04, SITE.z0 - 2] as [number, number, number], size: [SITE.x * 2 + 12, 9] as [number, number] },
        { position: [0, 0.04, SITE.z1 + 2] as [number, number, number], size: [SITE.x * 2 + 12, 9] as [number, number] },
      ].map((ring, index) => (
        <mesh key={`rh-${index}`} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={ring.position} receiveShadow>
          <planeGeometry args={[ring.size[1], ring.size[0]]} />
          <meshStandardMaterial map={road} color={night ? '#8d9498' : '#ffffff'} roughness={0.95} />
        </mesh>
      ))}
      {[-1, 1].map((side) => (
        <mesh
          key={`rv-${side}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[side * (SITE.x + 2), 0.04, (SITE.z0 + SITE.z1) / 2]}
          receiveShadow
        >
          <planeGeometry args={[9, SITE.z1 - SITE.z0 + 12]} />
          <meshStandardMaterial map={road} color={night ? '#8d9498' : '#ffffff'} roughness={0.95} />
        </mesh>
      ))}

      {/* Neighbourhood parks */}
      {parks.map((park, index) => (
        <mesh
          key={`park-${index}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[park.position[0] + park.size[0] / 2, 0.03, park.position[1] + park.size[1] / 2]}
          receiveShadow
        >
          <planeGeometry args={park.size} />
          <meshStandardMaterial color={grassColor} roughness={1} />
        </mesh>
      ))}

      {/* Manghopir Lake */}
      <group position={[MASTERPLAN.lake.center[0], 0, MASTERPLAN.lake.center[1]]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} scale={[MASTERPLAN.lake.rx + 4, MASTERPLAN.lake.rz + 4, 1]}>
          <circleGeometry args={[1, 64]} />
          <meshStandardMaterial color={night ? '#3b3a2c' : '#c9bb95'} roughness={1} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, 0]} scale={[MASTERPLAN.lake.rx, MASTERPLAN.lake.rz, 1]}>
          <circleGeometry args={[1, 64]} />
          <meshStandardMaterial
            color={night ? '#123244' : '#2f7f96'}
            roughness={0.18}
            metalness={0.35}
          />
        </mesh>
      </group>
    </group>
  );
}
