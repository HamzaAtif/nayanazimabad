import * as THREE from 'three';
import { mulberry32 } from '@/data/masterplan';

/**
 * Procedural façade textures — the site ships no photography, so every surface
 * in the 3D masterplan is generated at runtime on a 2D canvas. No network
 * requests, no binary assets, and the look is easy to re-skin.
 */

const FACADE_SIZE = 256;

export interface FacadeOptions {
  floors: number;
  night: boolean;
  seed?: number;
  baseColor?: string;
}

export function createFacadeTexture({
  floors,
  night,
  seed = 1,
  baseColor,
}: FacadeOptions): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = FACADE_SIZE;
  canvas.height = FACADE_SIZE;
  const ctx = canvas.getContext('2d')!;
  const random = mulberry32(Math.floor(seed * 1000) + 7);

  const base = baseColor ?? (night ? '#2a3a42' : '#e8e0cf');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, FACADE_SIZE, FACADE_SIZE);

  // Horizontal floor bands give the tower readable scale.
  const rows = 8;
  const cols = 6;
  const cellW = FACADE_SIZE / cols;
  const cellH = FACADE_SIZE / rows;

  ctx.fillStyle = night ? 'rgba(0,0,0,0.22)' : 'rgba(15,43,46,0.08)';
  for (let r = 0; r < rows; r += 1) {
    ctx.fillRect(0, r * cellH + cellH * 0.82, FACADE_SIZE, cellH * 0.18);
  }

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const w = cellW * 0.56;
      const h = cellH * 0.46;
      const x = c * cellW + (cellW - w) / 2;
      const y = r * cellH + (cellH - h) / 2 - cellH * 0.06;

      if (night) {
        const lit = random() > 0.42;
        ctx.fillStyle = lit ? '#ffd79a' : '#16242c';
      } else {
        const tint = 0.55 + random() * 0.25;
        ctx.fillStyle = `rgba(94, 133, 141, ${tint.toFixed(2)})`;
      }
      ctx.fillRect(x, y, w, h);

      // Slim balcony shadow under each window.
      ctx.fillStyle = night ? 'rgba(0,0,0,0.35)' : 'rgba(15,43,46,0.16)';
      ctx.fillRect(x - cellW * 0.04, y + h, w + cellW * 0.08, cellH * 0.08);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, Math.max(1, Math.round(floors / rows)));
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

/** Road surface: asphalt with a dashed centre line, tiled along the road. */
export function createRoadTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#4a4b48';
  ctx.fillRect(0, 0, 64, 256);
  ctx.fillStyle = '#d9d2c5';
  for (let y = 12; y < 256; y += 48) {
    ctx.fillRect(29, y, 6, 26);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

/** Mown-grass tint used for parks, the Gymkhana lawn and sports fields. */
export function createGrassTexture(night: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const random = mulberry32(4242);
  ctx.fillStyle = night ? '#1f3a2c' : '#4e8a55';
  ctx.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 900; i += 1) {
    ctx.fillStyle = random() > 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)';
    ctx.fillRect(random() * 128, random() * 128, 2, 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}
