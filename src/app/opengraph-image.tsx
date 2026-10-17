import { ImageResponse } from 'next/og';
import { SITE } from '@/data/site';

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Generated social card: no image assets, just the brand palette and type. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(160deg, #0f5c5c 0%, #052b2b 60%, #0f2b2e 100%)',
          color: '#f6f1e7',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: '#d9a94b',
              display: 'flex',
            }}
          />
          <div style={{ display: 'flex', fontSize: 34, letterSpacing: 4, textTransform: 'uppercase' }}>
            Naya Nazimabad
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 86, fontWeight: 700, lineHeight: 1.05 }}>
            A piece of heaven on earth
          </div>
          <div style={{ display: 'flex', fontSize: 34, color: '#a6d7d1', marginTop: 18 }}>
            {SITE.area} · Manghopir Road, Karachi · Explore the 3D masterplan
          </div>
        </div>

        <div style={{ display: 'flex', gap: 18, fontSize: 28, color: '#d3ebe8' }}>
          <div>Peace Apartments</div>
          <div>·</div>
          <div>Globe Residency</div>
          <div>·</div>
          <div>Grace Tower</div>
          <div>·</div>
          <div>Signature Tower</div>
        </div>
      </div>
    ),
    size,
  );
}
